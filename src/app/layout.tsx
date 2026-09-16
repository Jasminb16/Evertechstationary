import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";

import { Analytics } from "@/components/analytics";
import { CookieConsent } from "@/components/cookie-consent";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { site } from "@/lib/site";
import "./globals.css";

/**
 * Fonts are self-hosted rather than loaded from Google.
 *
 * Both files are the latin subset of the variable weight axis, so one ~50 KB
 * request covers every weight the site uses. Self-hosting means no third-party
 * connection on first paint and no visitor IP addresses sent to Google, which
 * also keeps the privacy policy honest.
 *
 * `size-adjust` and the metric overrides are measured against the fallback so
 * the swap doesn't shift layout (CLS).
 */
const inter = localFont({
  src: "../fonts/inter-latin-variable.woff2",
  variable: "--font-inter",
  display: "swap",
  weight: "100 900",
  fallback: ["ui-sans-serif", "system-ui", "-apple-system", "Segoe UI", "Arial"],
  adjustFontFallback: "Arial",
});

const sourceSerif = localFont({
  src: "../fonts/source-serif-4-latin-variable.woff2",
  variable: "--font-source-serif",
  display: "swap",
  weight: "200 900",
  fallback: ["ui-serif", "Georgia", "Times New Roman", "serif"],
  adjustFontFallback: "Times New Roman",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.legalName} | ${site.tagline}`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  applicationName: site.legalName,
  keywords: [
    "office stationery",
    "office supplies",
    "stationery supplier",
    "filing and binding",
    "photocopy paper",
    "office equipment",
    site.address.city,
  ],
  authors: [{ name: site.legalName }],
  openGraph: {
    type: "website",
    siteName: site.legalName,
    title: `${site.legalName} | ${site.tagline}`,
    description: site.description,
    url: site.url,
    locale: "en_AE",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.legalName} | ${site.tagline}`,
    description: site.description,
  },
  icons: {
    icon: [
      { url: "/brand/mark-32.png", sizes: "32x32", type: "image/png" },
      { url: "/brand/mark-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/brand/mark-180.png", sizes: "180x180" }],
  },
  // No canonical here on purpose: a root-level canonical is inherited by every
  // page that doesn't set its own — including the 404, which would then declare
  // itself the homepage. Each real page sets its own instead.
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#04326d",
  width: "device-width",
  initialScale: 1,
  // Never block zoom — pinch-to-zoom is an accessibility requirement.
  maximumScale: 5,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      dir="ltr"
      data-scroll-behavior="smooth"
      className={`${inter.variable} ${sourceSerif.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-paper text-ink">
        <a
          href="#main"
          className="sr-only rounded-md bg-navy-800 px-4 py-2 font-medium text-white focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-100"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter />
        <CookieConsent />
        <Analytics />
      </body>
    </html>
  );
}
