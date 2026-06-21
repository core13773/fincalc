// Global constants shared across the site.
export const SITE_NAME = 'FinCalc';
export const DEFAULT_SITE_ORIGIN = 'https://fincalc.monster';

/** Contact email shown on the Contact page. Update to your real address. */
export const CONTACT_EMAIL = 'core13773@gmail.com';

/**
 * Google AdSense publisher client id, e.g. 'ca-pub-1234567890123456'.
 * Set via .env: PUBLIC_ADSENSE_CLIENT=ca-pub-...
 * When empty, ad areas show labeled placeholders (no external requests).
 */
export const ADSENSE_CLIENT: string = import.meta.env.PUBLIC_ADSENSE_CLIENT ?? '';

/**
 * Google Search Console verification token (content value of the meta tag).
 * Set via .env: PUBLIC_GSC_VERIFICATION=...
 * When empty, the verification meta tag is omitted.
 */
export const GSC_VERIFICATION: string = import.meta.env.PUBLIC_GSC_VERIFICATION ?? '';

/** Naver Search Advisor verification token (네이버 서치어드바이저 메타태그). */
export const NAVER_VERIFICATION: string = import.meta.env.PUBLIC_NAVER_VERIFICATION ?? '';

/** True when a real AdSense client id is configured. */
export const ADS_ENABLED = ADSENSE_CLIENT !== '';
