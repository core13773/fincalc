// Korean annual net-salary (연봉 실수령액) estimate — 2024/2025 rates.
// Simplified: actual take-home varies with non-taxable allowances, extra
// credits (연금저축·월세·의료 등), and exact insurance caps. Labeled as an estimate.
import { getTaxTable } from './tax';

export const SALARY_CONST = {
  personalDeduction: 1_500_000, // 인적공제 per dependent (incl. self)
  npensionRate: 0.045, // 국민연금 (근로자)
  npensionMonthlyCap: 6_170_000, // 국민연금 월 보수 상한 (2024)
  healthRate: 0.03545, // 건강보험 (근로자)
  longtermRate: 0.1295, // 장기요양 = 건강보험료 × 12.95%
  empRate: 0.009, // 고용보험 (근로자, 실업급여)
  localTaxRate: 0.1, // 지방소득세 = 근로소득세 × 10%
};

/** 근로소득공제 (earned income deduction) by total gross band. */
export function earnedIncomeDeduction(gross: number): number {
  const g = Math.max(0, gross);
  if (g <= 5_000_000) return g * 0.7;
  if (g <= 15_000_000) return 3_500_000 + (g - 5_000_000) * 0.4;
  if (g <= 45_000_000) return 7_500_000 + (g - 15_000_000) * 0.15;
  if (g <= 100_000_000) return 12_000_000 + (g - 45_000_000) * 0.05;
  if (g <= 200_000_000) return 14_750_000 + (g - 100_000_000) * 0.02;
  return Math.min(16_750_000, 20_000_000);
}

/** 근로소득세액공제 (earned income tax credit). */
export function earnedIncomeTaxCredit(computedTax: number): number {
  if (computedTax <= 700_000) return computedTax * 0.55;
  return 385_000 + (computedTax - 700_000) * 0.3;
}

function progressiveTax(base: number): number {
  const bands = getTaxTable('ko-KR').bands;
  let tax = 0;
  let prev = 0;
  for (const b of bands) {
    if (base > prev) {
      tax += (Math.min(base, b.up) - prev) * b.rate;
      prev = b.up;
    } else {
      break;
    }
  }
  return tax;
}

export interface NetSalary {
  totalGross: number; // 과세대상 총급여 (연봉 - 비과세)
  earnedIncome: number; // 근로소득금액 (총급여 - 근로소득공제)
  taxBase: number; // 과세표준
  incomeTax: number; // 근로소득세 (결정세액)
  localTax: number; // 지방소득세
  npension: number;
  health: number;
  longterm: number;
  employment: number;
  insurance: number; // 4대보험 합계
  tax: number; // 세금 합계 (근로소득세 + 지방소득세)
  totalDeduction: number; // 세금 + 4대보험
  netAnnual: number; // 연 실수령액
  netMonthly: number; // 월 실수령액
}

/**
 * @param annualGross 연봉 (총)
 * @param nonTaxable 비과세 급여 (식대·차량유지비 등)
 * @param dependents 부양가족 수 (본인 포함, 기본 1)
 */
export function computeNetSalary(annualGross: number, nonTaxable = 0, dependents = 1): NetSalary {
  const gross = Math.max(0, annualGross);
  const totalGross = Math.max(0, gross - Math.max(0, nonTaxable));

  const deduction = earnedIncomeDeduction(totalGross);
  const earnedIncome = Math.max(0, totalGross - deduction);
  const personal = SALARY_CONST.personalDeduction * Math.max(1, dependents);
  const taxBase = Math.max(0, earnedIncome - personal);

  const computedTax = progressiveTax(taxBase);
  const credit = earnedIncomeTaxCredit(computedTax);
  const incomeTax = Math.max(0, computedTax - credit);
  const localTax = incomeTax * SALARY_CONST.localTaxRate;
  const tax = incomeTax + localTax;

  // 4대보험 (monthly basis, annualized)
  const monthly = totalGross / 12;
  const npensionBase = Math.min(monthly, SALARY_CONST.npensionMonthlyCap);
  const npension = npensionBase * SALARY_CONST.npensionRate * 12;
  const health = monthly * SALARY_CONST.healthRate * 12;
  const longterm = health * SALARY_CONST.longtermRate;
  const employment = monthly * SALARY_CONST.empRate * 12;
  const insurance = npension + health + longterm + employment;

  const totalDeduction = tax + insurance;
  const netAnnual = gross - incomeTax - localTax - insurance; // 비과세는 공제 안 됨 → 유지
  const netMonthly = netAnnual / 12;

  return {
    totalGross, earnedIncome, taxBase, incomeTax, localTax,
    npension, health, longterm, employment, insurance, tax,
    totalDeduction, netAnnual, netMonthly,
  };
}
