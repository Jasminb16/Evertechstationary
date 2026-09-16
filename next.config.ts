import type { NextConfig } from "next";

/**
 * Content Security Policy.
 *
 * `unsafe-inline` on style-src is required: Next.js inlines critical CSS and
 * this project sets CSS custom properties via inline `style` attributes.
 * `unsafe-inline` on script-src covers Next's bootstrap and the GA init
 * snippet; tighten it to a nonce if the client ever drops analytics.
 *
 * Trim the analytics and maps entries if those features aren't used — every
 * host left in the policy is a host that's allowed to run code on the site.
 */
const csp = [
  "default-src 'self'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "object-src 'none'",
  "img-src 'self' data: blob: https://*.googleapis.com https://*.gstatic.com",
  "font-src 'self' data:",
  "style-src 'self' 'unsafe-inline'",
  "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://plausible.io",
  "connect-src 'self' https://www.google-analytics.com https://plausible.io",
  // Google Maps embed on the contact page.
  "frame-src https://www.google.com https://maps.google.com",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  // Force HTTPS for two years, including subdomains. Only meaningful once the
  // site is actually served over HTTPS — the host must also redirect http→https.
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
  { key: "X-DNS-Prefetch-Control", value: "on" },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // Serves /about rather than /about/ consistently, so there's one canonical URL.
  trailingSlash: false,

  images: {
    formats: ["image/avif", "image/webp"],
  },

  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
      {
        // Fonts and brand assets are content-stable; cache them hard.
        source: "/brand/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
