// Progressive income-tax tables and exact marginal computation.
// NOTE: these compute tax on the TAXABLE base (과세표준 / taxable income
// after deductions). They are simplified estimates — credits, other taxes,
// and year-specific changes are not included.

export interface TaxBand {
  /** Upper bound of the band (taxable income). Last band uses a large finite cap. */
  up: number;
  /** Marginal rate applied to the portion within this band. */
  rate: number;
}

export interface TaxTable {
  currency: string;
  /** When true, a 10% local surtax is added to the income tax (Korea 지방소득세). */
  surtax: boolean;
  bands: TaxBand[];
}

const TOP = 1e15; // effectively unbounded, but JSON-safe (Infinity isn't)

export const taxTables: Record<string, TaxTable> = {
  // Korea 종합소득세 과세표준 누진구간
  'ko-KR': {
    currency: 'KRW',
    surtax: true,
    bands: [
      { up: 14000000, rate: 0.06 },
      { up: 50000000, rate: 0.15 },
      { up: 88000000, rate: 0.24 },
      { up: 150000000, rate: 0.35 },
      { up: TOP, rate: 0.38 },
    ],
  },
  // US federal income tax, single filer, 2024 brackets
  'en-US': {
    currency: 'USD',
    surtax: false,
    bands: [
      { up: 11600, rate: 0.1 },
      { up: 47150, rate: 0.12 },
      { up: 100525, rate: 0.22 },
      { up: 191950, rate: 0.24 },
      { up: 243725, rate: 0.32 },
      { up: 609350, rate: 0.35 },
      { up: TOP, rate: 0.37 },
    ],
  },
};

export function getTaxTable(locale: string): TaxTable {
  return taxTables[locale] ?? taxTables['en-US'];
}

export interface TaxResult {
  incomeTax: number;
  localTax: number;
  totalTax: number;
  effectiveRate: number;
  afterTax: number;
}

/** Exact marginal (progressive) tax computation on a taxable amount. */
export function computeIncomeTax(locale: string, amount: number): TaxResult {
  const table = getTaxTable(locale);
  const taxable = Math.max(0, amount);
  let tax = 0;
  let prev = 0;
  for (const b of table.bands) {
    if (taxable > prev) {
      const portion = Math.min(taxable, b.up) - prev;
      tax += portion * b.rate;
      prev = b.up;
    } else {
      break;
    }
  }
  const localTax = table.surtax ? tax * 0.1 : 0;
  const totalTax = tax + localTax;
  const effectiveRate = taxable > 0 ? totalTax / taxable : 0;
  const afterTax = Math.max(0, taxable - totalTax);
  return { incomeTax: tax, localTax, totalTax, effectiveRate, afterTax };
}
