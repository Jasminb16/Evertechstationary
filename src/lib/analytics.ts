/**
 * Analytics configuration.
 *
 * Set ONE of these in the host's environment. Both are NEXT_PUBLIC_ because a
 * measurement ID is a public identifier, not a secret — never put an API key,
 * SMTP password or private token behind a NEXT_PUBLIC_ name, since anything
 * with that prefix is inlined into the browser bundle.
 *
 *   NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX          # Google Analytics 4
 *   NEXT_PUBLIC_PLAUSIBLE_DOMAIN=evertechstationery.com
 *
 * With neither set, no analytics script loads and the cookie banner stays
 * hidden, because the site then sets no cookies at all.
 */

export const gaId = process.env.NEXT_PUBLIC_GA_ID ?? "";
export const plausibleDomain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN ?? "";

export const hasAnalytics = Boolean(gaId || plausibleDomain);
