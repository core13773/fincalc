import type { Locale } from '../i18n/config';

export interface UnitDef {
  code: string;
  name: { ko: string; en: string };
  /** Conversion factor to the category base unit (omitted for temperature). */
  factor?: number;
}

export interface UnitCategory {
  code: string;
  name: { ko: string; en: string };
  special?: 'temperature';
  units: UnitDef[];
}

export const unitCategories: UnitCategory[] = [
  {
    code: 'length',
    name: { ko: '길이', en: 'Length' },
    units: [
      { code: 'm', name: { ko: '미터', en: 'Meter' }, factor: 1 },
      { code: 'km', name: { ko: '킬로미터', en: 'Kilometer' }, factor: 1000 },
      { code: 'cm', name: { ko: '센티미터', en: 'Centimeter' }, factor: 0.01 },
      { code: 'mm', name: { ko: '밀리미터', en: 'Millimeter' }, factor: 0.001 },
      { code: 'mi', name: { ko: '마일', en: 'Mile' }, factor: 1609.344 },
      { code: 'yd', name: { ko: '야드', en: 'Yard' }, factor: 0.9144 },
      { code: 'ft', name: { ko: '피트', en: 'Foot' }, factor: 0.3048 },
      { code: 'in', name: { ko: '인치', en: 'Inch' }, factor: 0.0254 },
      { code: 'nmi', name: { ko: '해리', en: 'Nautical mile' }, factor: 1852 },
    ],
  },
  {
    code: 'weight',
    name: { ko: '무게', en: 'Weight' },
    units: [
      { code: 'kg', name: { ko: '킬로그램', en: 'Kilogram' }, factor: 1 },
      { code: 'g', name: { ko: '그램', en: 'Gram' }, factor: 0.001 },
      { code: 'mg', name: { ko: '밀리그램', en: 'Milligram' }, factor: 0.000001 },
      { code: 't', name: { ko: '톤', en: 'Metric ton' }, factor: 1000 },
      { code: 'lb', name: { ko: '파운드', en: 'Pound' }, factor: 0.45359237 },
      { code: 'oz', name: { ko: '온스', en: 'Ounce' }, factor: 0.028349523125 },
    ],
  },
  {
    code: 'temperature',
    name: { ko: '온도', en: 'Temperature' },
    special: 'temperature',
    units: [
      { code: 'C', name: { ko: '섭씨', en: 'Celsius' } },
      { code: 'F', name: { ko: '화씨', en: 'Fahrenheit' } },
      { code: 'K', name: { ko: '켈빈', en: 'Kelvin' } },
    ],
  },
  {
    code: 'area',
    name: { ko: '넓이', en: 'Area' },
    units: [
      { code: 'm2', name: { ko: '제곱미터', en: 'Square meter' }, factor: 1 },
      { code: 'pyeong', name: { ko: '평', en: 'Pyeong' }, factor: 3.305785 },
      { code: 'km2', name: { ko: '제곱킬로미터', en: 'Square kilometer' }, factor: 1e6 },
      { code: 'cm2', name: { ko: '제곱센티미터', en: 'Square centimeter' }, factor: 1e-4 },
      { code: 'ha', name: { ko: '헥타르', en: 'Hectare' }, factor: 10000 },
      { code: 'acre', name: { ko: '에이커', en: 'Acre' }, factor: 4046.8564224 },
      { code: 'ft2', name: { ko: '제곱피트', en: 'Square foot' }, factor: 0.09290304 },
      { code: 'in2', name: { ko: '제곱인치', en: 'Square inch' }, factor: 0.00064516 },
    ],
  },
  {
    code: 'volume',
    name: { ko: '부피', en: 'Volume' },
    units: [
      { code: 'l', name: { ko: '리터', en: 'Liter' }, factor: 1 },
      { code: 'ml', name: { ko: '밀리리터', en: 'Milliliter' }, factor: 0.001 },
      { code: 'm3', name: { ko: '세제곱미터', en: 'Cubic meter' }, factor: 1000 },
      { code: 'galUS', name: { ko: '미국 갤런', en: 'US gallon' }, factor: 3.785411784 },
      { code: 'galUK', name: { ko: '영국 갤런', en: 'UK gallon' }, factor: 4.54609 },
      { code: 'qtUS', name: { ko: '미국 쿼트', en: 'US quart' }, factor: 0.946352946 },
      { code: 'cup', name: { ko: '컵', en: 'Cup' }, factor: 0.2365882365 },
      { code: 'flozUS', name: { ko: '미국 액량 온스', en: 'US fl oz' }, factor: 0.0295735295625 },
    ],
  },
  {
    code: 'speed',
    name: { ko: '속도', en: 'Speed' },
    units: [
      { code: 'mps', name: { ko: '미터/초', en: 'Meter/sec' }, factor: 1 },
      { code: 'kmh', name: { ko: '킬로미터/시', en: 'Kilometer/hour' }, factor: 0.277777778 },
      { code: 'mph', name: { ko: '마일/시', en: 'Mile/hour' }, factor: 0.44704 },
      { code: 'knot', name: { ko: '노트', en: 'Knot' }, factor: 0.514444444 },
      { code: 'fps', name: { ko: '피트/초', en: 'Foot/sec' }, factor: 0.3048 },
    ],
  },
  {
    code: 'data',
    name: { ko: '데이터', en: 'Data' },
    units: [
      { code: 'B', name: { ko: '바이트', en: 'Byte' }, factor: 1 },
      { code: 'KB', name: { ko: '킬로바이트', en: 'Kilobyte' }, factor: 1024 },
      { code: 'MB', name: { ko: '메가바이트', en: 'Megabyte' }, factor: 1048576 },
      { code: 'GB', name: { ko: '기가바이트', en: 'Gigabyte' }, factor: 1073741824 },
      { code: 'TB', name: { ko: '테라바이트', en: 'Terabyte' }, factor: 1099511627776 },
      { code: 'bit', name: { ko: '비트', en: 'Bit' }, factor: 0.125 },
    ],
  },
  {
    code: 'time',
    name: { ko: '시간', en: 'Time' },
    units: [
      { code: 's', name: { ko: '초', en: 'Second' }, factor: 1 },
      { code: 'ms', name: { ko: '밀리초', en: 'Millisecond' }, factor: 0.001 },
      { code: 'min', name: { ko: '분', en: 'Minute' }, factor: 60 },
      { code: 'h', name: { ko: '시간', en: 'Hour' }, factor: 3600 },
      { code: 'day', name: { ko: '일', en: 'Day' }, factor: 86400 },
      { code: 'week', name: { ko: '주', en: 'Week' }, factor: 604800 },
      { code: 'year', name: { ko: '년', en: 'Year' }, factor: 31557600 },
    ],
  },
];

export function getCategory(code: string): UnitCategory | undefined {
  return unitCategories.find((c) => c.code === code);
}

export function getUnit(categoryCode: string, unitCode: string): UnitDef | undefined {
  return getCategory(categoryCode)?.units.find((u) => u.code === unitCode);
}

export function unitName(categoryCode: string, unitCode: string, lang: Locale): string {
  return getUnit(categoryCode, unitCode)?.name[lang] ?? unitCode;
}

export function categoryName(code: string, lang: Locale): string {
  return getCategory(code)?.name[lang] ?? code;
}

function tempToC(code: string, v: number): number {
  if (code === 'F') return ((v - 32) * 5) / 9;
  if (code === 'K') return v - 273.15;
  return v;
}
function tempFromC(code: string, c: number): number {
  if (code === 'F') return (c * 9) / 5 + 32;
  if (code === 'K') return c + 273.15;
  return c;
}

/** Convert a value between two units within a category. */
export function convertUnit(categoryCode: string, value: number, from: string, to: string): number {
  const cat = getCategory(categoryCode);
  if (!cat) return Number.NaN;
  if (cat.special === 'temperature') {
    return tempFromC(to, tempToC(from, value));
  }
  const f = getUnit(categoryCode, from)?.factor;
  const t = getUnit(categoryCode, to)?.factor;
  if (f == null || t == null || t === 0) return Number.NaN;
  return (value * f) / t;
}

/**
 * Priority units per category (the most-searched conversions).
 * All ordered pairs among each list are generated for programmatic SEO pages.
 */
const PRIORITY_UNITS: Record<string, string[]> = {
  length: ['km', 'mi', 'm', 'ft', 'cm', 'in'],
  weight: ['kg', 'lb', 'g', 'oz', 't'],
  temperature: ['C', 'F', 'K'],
  area: ['m2', 'ft2', 'pyeong', 'acre', 'ha'],
  volume: ['l', 'galUS', 'ml', 'cup'],
  speed: ['kmh', 'mph', 'mps', 'knot'],
  data: ['KB', 'MB', 'GB', 'TB'],
  time: ['min', 'h', 's', 'day', 'year'],
};

/** Generated, high-search unit conversions for programmatic SEO pages. */
export const unitPairs: Array<{ category: string; from: string; to: string }> = [];
for (const cat of Object.keys(PRIORITY_UNITS)) {
  for (const from of PRIORITY_UNITS[cat]) {
    for (const to of PRIORITY_UNITS[cat]) {
      if (from !== to) unitPairs.push({ category: cat, from, to });
    }
  }
}

/** Static-path entries for the programmatic unit-pair pages. */
export function unitPairPaths() {
  return unitPairs.map(({ category, from, to }) => ({
    params: { category, pair: `${from}-to-${to}` },
    props: { category, from, to },
  }));
}
