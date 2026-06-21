import type { Locale } from '../i18n/config';

export interface Currency {
  code: string;
  name: { ko: string; en: string };
  symbol: string;
  flag: string; // emoji flag
}

export const currencies: Record<string, Currency> = {
  USD: { code: 'USD', name: { ko: '미국 달러', en: 'US Dollar' }, symbol: '$', flag: '🇺🇸' },
  KRW: { code: 'KRW', name: { ko: '한국 원', en: 'South Korean Won' }, symbol: '₩', flag: '🇰🇷' },
  EUR: { code: 'EUR', name: { ko: '유로', en: 'Euro' }, symbol: '€', flag: '🇪🇺' },
  JPY: { code: 'JPY', name: { ko: '일본 엔', en: 'Japanese Yen' }, symbol: '¥', flag: '🇯🇵' },
  CNY: { code: 'CNY', name: { ko: '중국 위안', en: 'Chinese Yuan' }, symbol: '¥', flag: '🇨🇳' },
  GBP: { code: 'GBP', name: { ko: '영국 파운드', en: 'British Pound' }, symbol: '£', flag: '🇬🇧' },
  AUD: { code: 'AUD', name: { ko: '호주 달러', en: 'Australian Dollar' }, symbol: 'A$', flag: '🇦🇺' },
  CAD: { code: 'CAD', name: { ko: '캐나다 달러', en: 'Canadian Dollar' }, symbol: 'C$', flag: '🇨🇦' },
  CHF: { code: 'CHF', name: { ko: '스위스 프랑', en: 'Swiss Franc' }, symbol: 'CHF', flag: '🇨🇭' },
  HKD: { code: 'HKD', name: { ko: '홍콩 달러', en: 'Hong Kong Dollar' }, symbol: 'HK$', flag: '🇭🇰' },
  SGD: { code: 'SGD', name: { ko: '싱가포르 달러', en: 'Singapore Dollar' }, symbol: 'S$', flag: '🇸🇬' },
  INR: { code: 'INR', name: { ko: '인도 루피', en: 'Indian Rupee' }, symbol: '₹', flag: '🇮🇳' },
  BRL: { code: 'BRL', name: { ko: '브라질 헤알', en: 'Brazilian Real' }, symbol: 'R$', flag: '🇧🇷' },
  RUB: { code: 'RUB', name: { ko: '러시아 루블', en: 'Russian Ruble' }, symbol: '₽', flag: '🇷🇺' },
  MXN: { code: 'MXN', name: { ko: '멕시코 페소', en: 'Mexican Peso' }, symbol: 'MX$', flag: '🇲🇽' },
  THB: { code: 'THB', name: { ko: '태국 바트', en: 'Thai Baht' }, symbol: '฿', flag: '🇹🇭' },
  TWD: { code: 'TWD', name: { ko: '대만 달러', en: 'Taiwan Dollar' }, symbol: 'NT$', flag: '🇹🇼' },
  VND: { code: 'VND', name: { ko: '베트남 동', en: 'Vietnamese Dong' }, symbol: '₫', flag: '🇻🇳' },
};

/** Ordered list of currency codes for the converter dropdowns. */
export const currencyCodes = Object.keys(currencies);

export function currencyName(code: string, lang: Locale): string {
  return currencies[code]?.name[lang] ?? code;
}

/**
 * USD-based reference rates (indicative snapshot).
 * Used for server-side rendering / SEO content and as a client-side fallback
 * when live rates cannot be fetched. Live rates are pulled from open.er-api.com.
 */
export const referenceRatesUSD: Record<string, number> = {
  USD: 1,
  KRW: 1350,
  EUR: 0.92,
  JPY: 150,
  CNY: 7.2,
  GBP: 0.79,
  AUD: 1.52,
  CAD: 1.36,
  CHF: 0.88,
  HKD: 7.8,
  SGD: 1.34,
  INR: 83,
  BRL: 5.0,
  RUB: 92,
  MXN: 17,
  THB: 36,
  TWD: 32,
  VND: 25000,
};

/** Curated, high-intent pairs for programmatic SEO pages. */
export const currencyPairs: Array<[string, string]> = [
  ['USD', 'KRW'], ['KRW', 'USD'],
  ['USD', 'JPY'], ['JPY', 'USD'],
  ['USD', 'EUR'], ['EUR', 'USD'],
  ['USD', 'CNY'], ['CNY', 'USD'],
  ['USD', 'GBP'], ['GBP', 'USD'],
  ['EUR', 'KRW'], ['KRW', 'EUR'],
  ['JPY', 'KRW'], ['KRW', 'JPY'],
  ['CNY', 'KRW'], ['KRW', 'CNY'],
  ['USD', 'AUD'], ['AUD', 'USD'],
  ['USD', 'CAD'], ['CAD', 'USD'],
  ['USD', 'HKD'], ['HKD', 'USD'],
  ['USD', 'SGD'], ['SGD', 'USD'],
  ['USD', 'INR'], ['INR', 'USD'],
  ['USD', 'CHF'], ['CHF', 'USD'],
  ['USD', 'BRL'], ['BRL', 'USD'],
  ['USD', 'RUB'], ['RUB', 'USD'],
  ['USD', 'MXN'], ['MXN', 'USD'],
  ['USD', 'THB'], ['THB', 'USD'],
  ['USD', 'TWD'], ['TWD', 'USD'],
  ['USD', 'VND'], ['VND', 'USD'],
  ['EUR', 'JPY'], ['GBP', 'JPY'],
];

/**
 * Convert an amount from one currency to another using USD-based rates.
 * Falls back to the bundled reference rates if a live rate is missing.
 */
export function convert(
  amount: number,
  rates: Record<string, number>,
  from: string,
  to: string,
): number {
  const fromRate = rates[from] ?? referenceRatesUSD[from];
  const toRate = rates[to] ?? referenceRatesUSD[to];
  if (!fromRate || !toRate) return Number.NaN;
  const usd = amount / fromRate;
  return usd * toRate;
}

/** The exchange rate for 1 unit of `from` in `to`. */
export function rateBetween(
  rates: Record<string, number>,
  from: string,
  to: string,
): number {
  return convert(1, rates, from, to);
}

/**
 * Static-path entries for the programmatic currency pair pages.
 * Pair slug is lowercased, e.g. "usd-krw".
 */
export function currencyPairPaths() {
  return currencyPairs.map(([from, to]) => ({
    params: { pair: `${from.toLowerCase()}-${to.toLowerCase()}` },
    props: { from, to },
  }));
}
