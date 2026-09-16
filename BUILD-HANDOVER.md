# Evertech Stationery: build handover

Status as of 16 Sep 2026. **Pushed to GitHub.** HEAD is `7778aae` on `main` of
`https://github.com/Jasminb16/Evertechstationary`.

```
7778aae  Remove em dashes from the README and refresh stale content
966218c  Set real contact details, drop socials, remove em dashes, fix hero button gap
46cd0cd  Fix dev-mode CSP and inert attribute warnings
a59a3ee  Build the Evertech Stationery marketing site
68e5352  Initial commit
```

## What was built

Next.js 16 (App Router) + TypeScript + Tailwind v4. Structure mirrors the
Third Generation reference site; design and copy are original.

Pages: home, about, products, clients, contact, privacy, terms, custom 404.
Plus `sitemap.xml`, `robots.txt`, a generated OG image, and `POST /api/contact`.

- **Brand** derived from the supplied logo: navy `#04326D`, Source Serif 4
  headings to echo the monogram, Inter for UI. Fonts self-hosted (latin variable
  subsets), so no third-party request on first paint and no visitor IPs reach
  Google.
- **Content isolated** in `src/lib/site.ts`, `catalog.ts` (8 groups / 59
  categories) and `clients.ts`. Changing the phone number or adding a category
  is a one-file edit.
- **Motion** from the transitions.dev skill, nine snippets pasted verbatim with
  their reduced-motion guards intact.
- **Contact form** with validation shared client/server, honeypot, timing gate
  and per-IP rate limit.

## Live contact details

Now set in `src/lib/site.ts`, supplied by the client:

- Phone / WhatsApp: **+971 56 931 8022** (stored in full international form,
  trunk `0` dropped after `+971` so `tel:` and `wa.me` dial from abroad)
- Email: **tek@evertechstationery.com**
- Address: **Port Saeed, Dubai, United Arab Emirates**

Footer social links were removed along with the inlined SVGs, since there are no
accounts to link to yet.

## Verified at HEAD `7778aae`

Re-run against a fresh production build after the client's three commits:

| | |
| --- | --- |
| Accessibility | axe-core WCAG 2.1 AA, **0 violations** on all 8 pages |
| Console | no JS errors on any page |
| Responsive | no horizontal overflow at 390 px on any page |
| Links | all internal links resolve |
| SEO | unique title + description per page, all ≤ 160 chars; canonical per page; OG image everywhere; 404 correctly has no canonical |
| Images | every `<img>` has an `alt` attribute |
| Copy | zero em dashes in visitor-facing text across all 8 pages |
| Contact | `tel:+971569318022`, `wa.me/971569318022`, `mailto:tek@…`, Port Saeed all rendering |
| Hero gap fix | row is `display: flex`, 12 px measured between buttons |
| Build | `next build` and `eslint` both clean |

The client's two fixes are both improvements on the original:
`inert={!open}` is the correct React 19 form, and scoping `'unsafe-eval'` to
dev inside `headers()` leaves the production CSP untouched.

## Still open before launch

- **The stats are invented.** "2,500+ products in stock", "500+ businesses
  supplied" in `src/lib/site.ts` are placeholders. Replace with real figures or
  delete them; they are claims about the business.
- **Legal pages need a lawyer.** Both contain `⟨bracketed⟩` values (registered
  name, trade licence, jurisdiction, payment terms, returns window). The privacy
  policy accurately describes what the site does; neither has been reviewed.
- **Email delivery isn't wired.** A valid submission is logged server-side only.
  Needs Resend or SMTP credentials; snippet is in the README.
- **`legalName`** is not yet the registered company name.
- **WhatsApp number** assumes it's the same as the phone; unconfirmed.
- **Building / office line** in the address is blank, only "Port Saeed" is set.
- **HTTPS redirect is the host's job.** The code sends HSTS; the host must do
  the actual `http → https` redirect.
- **Analytics ID**: set `NEXT_PUBLIC_GA_ID` or `NEXT_PUBLIC_PLAUSIBLE_DOMAIN`,
  or accept no analytics (the cookie banner only appears if one is set).

## Deliberately empty

`src/lib/clients.ts` ships with no client logos and no testimonials. Naming
companies as customers or publishing attributed quotes is a factual claim, so
none were invented. The Clients page renders a "logos added once permission is
in writing" state until real entries are added.

## Client's 20-point checklist

Built: privacy policy, terms, meta titles + descriptions, social preview image,
favicon, sitemap + robots, alt text, image compression, load speed, colour
contrast, mobile, custom 404, broken-link check, form validation, spam
protection, one clear CTA per page.

Wiring built, one value needed from client: cookie consent banner, analytics.

Host-side, client owns: force HTTPS, secrets off the frontend (env-var pattern
and security headers are in the code).
