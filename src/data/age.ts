// Age calculator data + computation.

/** Birth years covered by programmatic SEO pages. */
export const ageYears: number[] = [];
for (let y = 1920; y <= 2020; y++) ageYears.push(y);

export interface AgeBreakdown {
  international: number; // 만 나이
  koreanYear: number; // 연 나이 (currentYear - birthYear + 1)
  counting: number; // 세는 나이 (만 나이 + 1)
  daysLived: number;
  monthsLived: number;
  nextBirthdayDays: number;
}

const MS_DAY = 86400000;

function ymd(d: Date) {
  return { y: d.getFullYear(), m: d.getMonth(), day: d.getDate() };
}

/** Exact age breakdown for a birth date as of a reference date. */
export function computeAge(birth: Date, asOf: Date): AgeBreakdown {
  const a = ymd(asOf);
  const b = ymd(birth);

  let international = a.y - b.y;
  const hadBirthdayThisYear = a.m > b.m || (a.m === b.m && a.day >= b.day);
  if (!hadBirthdayThisYear) international -= 1;
  if (international < 0) international = 0;

  const koreanYear = Math.max(0, a.y - b.y + 1);
  const counting = international + 1;

  const daysLived = Math.max(0, Math.floor((asOf.getTime() - birth.getTime()) / MS_DAY));
  const monthsLived = Math.floor(daysLived / 30.4375);

  let next = new Date(a.y, b.m, b.day);
  if (next.getTime() < asOf.getTime()) next = new Date(a.y + 1, b.m, b.day);
  const nextBirthdayDays = Math.max(0, Math.round((next.getTime() - asOf.getTime()) / MS_DAY));

  return { international, koreanYear, counting, daysLived, monthsLived, nextBirthdayDays };
}

/** Age range for someone born in a given year, across that year (for SSR/pSEO). */
export function ageRangeForYear(birthYear: number, asOfYear: number) {
  const diff = asOfYear - birthYear;
  return {
    min: Math.max(0, diff - 1), // birthday not yet passed this year
    max: Math.max(0, diff), // birthday passed
    koreanYear: Math.max(0, diff + 1),
  };
}

/** Static-path entries for the programmatic birth-year pages. */
export function ageYearPaths() {
  return ageYears.map((year) => ({
    params: { year: String(year) },
    props: { year },
  }));
}
