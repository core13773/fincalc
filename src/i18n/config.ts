export const defaultLocale = 'ko';
export const locales = ['ko', 'en'] as const;
export type Locale = (typeof locales)[number];

/** Korean lives at the site root (`/`), English under `/en`. */
export function localePrefix(lang: Locale): string {
  return lang === defaultLocale ? '' : `/${lang}`;
}

/**
 * Build a localized URL path.
 * localizePath('en', '/loan-calculator') => '/en/loan-calculator'
 * localizePath('ko', '/loan-calculator') => '/loan-calculator'
 * localizePath('ko', '') => '/'
 */
export function localizePath(lang: Locale, path = ''): string {
  const base = localePrefix(lang);
  const suffix = path === '' ? '' : path.startsWith('/') ? path : `/${path}`;
  const joined = `${base}${suffix}`;
  return joined === '' ? '/' : joined;
}

export function otherLocale(lang: Locale): Locale {
  return lang === 'ko' ? 'en' : 'ko';
}

export const htmlLang = (lang: Locale): string => (lang === 'ko' ? 'ko' : 'en');
export const hreflangCode = (lang: Locale): string => (lang === 'ko' ? 'ko-KR' : 'en-US');
