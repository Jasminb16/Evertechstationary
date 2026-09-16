"use client";

import Script from "next/script";

import { gaId, hasAnalytics, plausibleDomain } from "@/lib/analytics";
import { useConsent } from "@/lib/use-consent";

/**
 * Loads the analytics script only after the visitor has accepted.
 *
 * Plausible is cookieless, but it still waits for consent so the banner's
 * promise is literally true. Scripts use `afterInteractive` so they never
 * compete with the first paint.
 */
export function Analytics() {
  const consent = useConsent();

  if (!hasAnalytics || consent !== "granted") return null;

  if (plausibleDomain) {
    return (
      <Script
        defer
        strategy="afterInteractive"
        data-domain={plausibleDomain}
        src="https://plausible.io/js/script.js"
      />
    );
  }

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
      />
      <Script id="ga-init" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}
gtag('js',new Date());
gtag('config','${gaId}',{anonymize_ip:true});`}
      </Script>
    </>
  );
}
