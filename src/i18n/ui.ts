import type { Locale } from './config';

export const ui = {
  ko: {
    site: {
      name: 'FinCalc',
      tagline: '무료 금융 계산기',
      title: 'FinCalc — 대출·복리·환율·퍼센트 계산기',
      description:
        '대출 이자, 복리 수익, 환율, 퍼센트, 부가세를 정확하고 빠르게 계산하는 무료 금융 계산기. 로그인 없이 바로 사용하세요.',
    },
    nav: {
      home: '홈',
      loan: '대출',
      compound: '복리',
      currency: '환율',
      percentage: '퍼센트',
      vat: '부가세',
      switchLabel: 'EN',
      switchTo: 'English',
    },
    home: {
      heroBadge: '100% 무료 · 로그인 불필요',
      heroTitle: '돈을 계산하는 가장 빠른 방법',
      heroSub:
        '대출 상환액, 복리 투자 결과, 실시간 환율, 퍼센트, 부가세까지. 브라우저에서 즉시 계산하고 결과를 확인하세요.',
      ctaLoan: '대출 이자 계산',
      ctaCompound: '복리 계산',
      ctaCurrency: '환율 변환',
      toolsTitle: '금융 계산 도구',
      featuresTitle: '왜 FinCalc인가요?',
      features: [
        {
          title: '정확한 계산',
          desc: '표준 금융 수식(원리금균등상환, 복리 이자)을 사용해 신뢰할 수 있는 결과를 제공합니다.',
        },
        {
          title: '빠르고 가벼움',
          desc: '가벼운 정적 사이트로 어떤 기기에서도 즉시 로드됩니다. 데이터도 저장하지 않습니다.',
        },
        {
          title: '한국어 · English',
          desc: '한국과 글로벌 모두를 위한 이중언어 지원으로 원하는 언어로 이용하세요.',
        },
      ],
    },
    loan: {
      title: '대출 이자 계산기',
      description:
        '대출 원금, 연이자율, 상환 기간을 입력하면 매월 갚아야 할 금액과 총 이자를 계산합니다. 원리금균등상환 기준입니다.',
      amount: '대출 원금',
      rate: '연이자율 (%)',
      years: '상환 기간 (년)',
      monthlyPayment: '월 상환액',
      totalPayment: '총 상환액',
      totalInterest: '총 이자',
      principal: '원금',
      calc: '계산하기',
      reset: '초기화',
      howToTitle: '이용 방법',
      howTo: ['대출받을 원금을 입력합니다.', '연이자율을 입력합니다 (예: 4.5).', '상환 기간(년)을 입력합니다.', '월 상환액과 총 이자를 확인합니다.'],
      note: '* 원리금균등상환 방식 기준이며 실제와 다를 수 있습니다.',
    },
    compound: {
      title: '복리 계산기',
      description:
        '초기 자본과 매월 적립액, 연 수익률, 투자 기간을 입력하면 최종 자산과 총 수익을 계산합니다. 매월 복리 기준입니다.',
      principal: '초기 자본',
      monthly: '월 적립액',
      rate: '연 수익률 (%)',
      years: '투자 기간 (년)',
      balance: '최종 자산',
      contributed: '총 납입액',
      interest: '총 수익 (이자)',
      calc: '계산하기',
      reset: '초기화',
      howToTitle: '이용 방법',
      howTo: ['초기 투자금을 입력합니다.', '매월 추가로 적립할 금액을 입력합니다.', '기대 연 수익률과 기간을 입력합니다.', '복리 효과로 불어난 최종 자산을 확인합니다.'],
      note: '* 매월 복리(월 복리) 기준의 단순 계산이며 세금·수수료는 반영되지 않습니다.',
    },
    currency: {
      title: '환율 계산기',
      description:
        '주요 통화 간 환율을 실시간으로 계산합니다. 여행, 송금, 해외 쇼핑 금액을 빠르게 환산하세요.',
      amount: '금액',
      from: '보내는 통화',
      to: '받는 통화',
      result: '변환 결과',
      rate: '환율 (1)',
      inverseRate: '역환율 (1)',
      swap: '↔ 교환',
      liveUpdated: '실시간 환율 업데이트',
      fallbackNote: '실시간 환율을 불러오지 못해 참고용 기준 환율을 표시합니다.',
      popularTitle: '인기 환율',
    },
    percentage: {
      title: '퍼센트 계산기',
      description:
        '값의 퍼센트, 비율, 증감률을 한 화면에서 계산하는 무료 퍼센트 계산기. 세 가지 모드로 빠르게 계산하세요.',
      ofTitle: '값의 퍼센트',
      ofWhole: '전체값',
      ofPercent: '퍼센트 (%)',
      ratioTitle: '비율 구하기',
      ratioA: '값 A',
      ratioB: '값 B',
      changeTitle: '증감률',
      changePrev: '이전',
      changeNext: '이후',
      increase: '증가',
      decrease: '감소',
      note: '* 결과는 참고용입니다.',
    },
    vat: {
      title: '부가세 계산기',
      description:
        '공급가액, 부가세, 합계를 빠르게 계산하는 무료 부가세 계산기. 한국 부가세 10% 기본, 비율을 직접 입력할 수 있습니다.',
      rate: '부가세율 (%)',
      amount: '금액',
      type: '금액 유형',
      exclusive: '공급가액 (별도)',
      inclusive: '합계 (포함)',
      supply: '공급가액',
      vatAmount: '부가세',
      total: '합계',
      note: '* 부가세율은 직접 수정 가능합니다 (한국 기본 10%).',
    },
    common: {
      result: '결과',
      currency: '통화',
      langName: '한국어',
      disclaimer: '계산 결과는 참고용이며, 금융 또는 투자 자문이 아닙니다.',
    },
    footer: {
      rights: '모든 권리 보유.',
      about: 'FinCalc는 대출, 복리, 환율, 퍼센트 계산을 위한 무료 웹 도구입니다.',
      legal: {
        privacy: '개인정보처리방침',
        about: '소개',
        contact: '연락처',
      },
    },
  },

  en: {
    site: {
      name: 'FinCalc',
      tagline: 'Free Finance Calculators',
      title: 'FinCalc — Loan, Compound, Currency & Percentage Calculators',
      description:
        'Free finance calculators for loan payments, compound interest, currency, percentages, and VAT. No sign-up, works instantly in your browser.',
    },
    nav: {
      home: 'Home',
      loan: 'Loan',
      compound: 'Compound',
      currency: 'Currency',
      percentage: 'Percent',
      vat: 'VAT',
      switchLabel: 'KO',
      switchTo: '한국어',
    },
    home: {
      heroBadge: '100% Free · No sign-up',
      heroTitle: 'The fastest way to calculate money',
      heroSub:
        'Loan payments, compound growth, live exchange rates, percentages, and VAT — calculated instantly in your browser.',
      ctaLoan: 'Calculate loan interest',
      ctaCompound: 'Compound interest',
      ctaCurrency: 'Convert currency',
      toolsTitle: 'Finance calculation tools',
      featuresTitle: 'Why FinCalc?',
      features: [
        {
          title: 'Accurate math',
          desc: 'Uses standard financial formulas (amortization, compound interest) you can trust.',
        },
        {
          title: 'Fast & lightweight',
          desc: 'A light static site that loads instantly on any device. We never store your data.',
        },
        {
          title: 'English · 한국어',
          desc: 'Bilingual support for both global and Korean users.',
        },
      ],
    },
    loan: {
      title: 'Loan Interest Calculator',
      description:
        'Enter the loan amount, annual interest rate, and term to calculate your monthly payment and total interest. Assumes equal principal-and-interest repayment.',
      amount: 'Loan amount',
      rate: 'Annual interest rate (%)',
      years: 'Loan term (years)',
      monthlyPayment: 'Monthly payment',
      totalPayment: 'Total payment',
      totalInterest: 'Total interest',
      principal: 'Principal',
      calc: 'Calculate',
      reset: 'Reset',
      howToTitle: 'How to use',
      howTo: ['Enter the amount you want to borrow.', 'Enter the annual interest rate (e.g. 4.5).', 'Enter the loan term in years.', 'Review the monthly payment and total interest.'],
      note: '* Assumes equal monthly installments; actual terms may differ.',
    },
    compound: {
      title: 'Compound Interest Calculator',
      description:
        'Enter your initial capital, monthly contribution, annual return, and time horizon to see your final balance and total earnings. Compounded monthly.',
      principal: 'Initial principal',
      monthly: 'Monthly contribution',
      rate: 'Annual return (%)',
      years: 'Investment period (years)',
      balance: 'Final balance',
      contributed: 'Total contributed',
      interest: 'Total earnings (interest)',
      calc: 'Calculate',
      reset: 'Reset',
      howToTitle: 'How to use',
      howTo: ['Enter your initial investment.', 'Enter how much you add each month.', 'Enter the expected annual return and years.', 'See your final balance grown by compounding.'],
      note: '* Simple monthly-compounding estimate; taxes and fees are not included.',
    },
    currency: {
      title: 'Currency Converter',
      description:
        'Convert between major currencies with live exchange rates. Great for travel, remittance, and online shopping.',
      amount: 'Amount',
      from: 'From',
      to: 'To',
      result: 'Conversion result',
      rate: 'Rate (1)',
      inverseRate: 'Inverse (1)',
      swap: '↔ Swap',
      liveUpdated: 'Live rate updated',
      fallbackNote: 'Could not load live rates — showing indicative reference rates.',
      popularTitle: 'Popular rates',
    },
    percentage: {
      title: 'Percentage Calculator',
      description:
        'Free percentage calculator — find a percent of a value, ratios, and percent change, all in one place.',
      ofTitle: 'Percent of a value',
      ofWhole: 'Value',
      ofPercent: 'Percent (%)',
      ratioTitle: 'Ratio',
      ratioA: 'Value A',
      ratioB: 'Value B',
      changeTitle: 'Change',
      changePrev: 'From',
      changeNext: 'To',
      increase: 'increase',
      decrease: 'decrease',
      note: '* Results are for reference only.',
    },
    vat: {
      title: 'VAT / Sales Tax Calculator',
      description:
        'Quickly compute the net amount, VAT, and total. Defaults to 10% (Korea); the rate is editable for any region.',
      rate: 'Rate (%)',
      amount: 'Amount',
      type: 'Amount type',
      exclusive: 'Net (excl. tax)',
      inclusive: 'Gross (incl. tax)',
      supply: 'Net amount',
      vatAmount: 'Tax (VAT)',
      total: 'Total',
      note: '* Edit the rate for your region (Korea default 10%).',
    },
    common: {
      result: 'Result',
      currency: 'Currency',
      langName: 'English',
      disclaimer: 'Results are for reference only and are not financial or investment advice.',
    },
    footer: {
      rights: 'All rights reserved.',
      about: 'FinCalc is a free web tool for loan, compound interest, currency, and percentage calculations.',
      legal: {
        privacy: 'Privacy Policy',
        about: 'About',
        contact: 'Contact',
      },
    },
  },
} as const;

export type UI = (typeof ui)[Locale];

export function t(lang: Locale): UI {
  return ui[lang];
}
