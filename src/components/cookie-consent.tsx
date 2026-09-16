"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { hasAnalytics } from "@/lib/analytics";
import { setConsent, useConsent } from "@/lib/use-consent";

/**
 * Consent banner.
 *
 * Nothing that sets a cookie loads until the visitor accepts: the analytics
 * script is mounted by <Analytics/>, which reads the same consent store. If no
 * analytics ID is configured the banner never renders at all, because a site
 * that sets no cookies has nothing to ask about.
 */
export function CookieConsent() {
  const consent = useConsent();

  if (!hasAnalytics || consent !== null) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Cookie preferences"
      // The bottom padding clears the iOS home indicator so the buttons aren't
      // sitting under it.
      className="fixed inset-x-0 bottom-0 z-90 p-4 pb-[max(1rem,env(safe-area-inset-bottom))]"
    >
      <div
        className="t-panel-slide mx-auto max-w-3xl rounded-2xl border border-line bg-surface p-5 shadow-menu sm:p-6"
        data-open="true"
        style={{ "--panel-translate-y": "16px" } as React.CSSProperties}
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm leading-relaxed text-ink-soft">
            We use analytics cookies to understand how the site is used. Nothing
            is stored until you accept. See our{" "}
            <Link
              href="/privacy"
              className="font-medium text-navy-700 underline underline-offset-2"
            >
              privacy policy
            </Link>
            .
          </p>
          <div className="flex shrink-0 gap-2.5">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setConsent("denied")}
            >
              Decline
            </Button>
            <Button size="sm" onClick={() => setConsent("granted")}>
              Accept
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
