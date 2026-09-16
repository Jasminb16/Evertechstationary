# Evertech Stationery

Marketing website for Evertech Stationery, an office stationery supplier.
Five public pages plus legals, a browsable product catalogue, and an enquiry
form. Built to be handed over: all content lives in a handful of typed files,
and nothing about the design requires touching component code.

**Deployment is the client's.** This repo is the build only. The
[Before you go live](#before-you-go-live) checklist below lists the things that
must be done on the host, and the placeholders that must be replaced.

---

## Stack

| | |
| --- | --- |
| Framework | Next.js 16 (App Router, Turbopack), React 19 |
| Language | TypeScript, strict |
| Styling | Tailwind CSS v4, design tokens in `src/app/globals.css` |
| Motion | [transitions.dev](https://transitions.dev) snippets, pasted verbatim |
| Icons | `lucide-react` |
| Fonts | Inter + Source Serif 4, **self-hosted** (`src/fonts/`) |

Every page is statically prerendered. The only server route is the enquiry
endpoint.

## Running it

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
npm start       # serve the production build
npx eslint .    # lint
```

Requires Node 20.9+.

---

## Where the content lives

Almost everything the client will want to change is in four files. None of
them require touching a component.

### `src/lib/site.ts`: company details

Phone, WhatsApp, email, address, opening hours, headline stats. Every
appearance of these across the site reads from here, so changing the phone
number is a one-line edit.

Phone, email and address are the client's real details. The phone is stored
in full international form (`+971 56 931 8022`), with the domestic trunk `0`
dropped after `+971` so the `tel:` and `wa.me` links dial from abroad.

> **⚠️ Still to confirm.** `whatsapp` assumes WhatsApp is on the same number
> as the phone, and `legalName` is not yet the registered company name. The
> `stats` block (`2,500+ products`, `500+ businesses`) are **invented
> placeholder claims about the business**. Replace them with real figures or
> delete them before launch.

### `src/lib/catalog.ts`: the product catalogue

Eight groups, 59 categories. Add, remove or rename entries here and the mega
menu, the products page, the footer and the home page all update, including
the counts in the body copy.

Cards are designed to look finished without photography. When product shots
arrive, add `image: "/products/<slug>.jpg"` to a category.

### `src/lib/clients.ts`: logo wall and testimonials

**Deliberately empty.** Naming companies as customers, or publishing quotes
attributed to real people, is a factual claim, so no invented ones are
shipped. The Clients page renders a "logos added once permission is in
writing" state while the arrays are empty, and switches to a real logo wall
and testimonial grid the moment you add entries. Only add clients and quotes
you have written permission to publish.

### `src/app/privacy/page.tsx` and `src/app/terms/page.tsx`

> **⚠️ Not legal advice.** The privacy policy accurately describes what this
> site actually does (which is the hard part), and the terms are a reasonable
> B2B starting draft. Neither has been reviewed by a lawyer. Both contain
> `⟨bracketed⟩` values (registered company name, trade licence, jurisdiction,
> payment terms, returns window) that must be filled in, and both should be
> checked by a qualified adviser before launch.

---

## Design system

Palette is derived from the logo: navy `#04326D` on a light neutral, with a
restrained brass accent. Tokens are declared once in `src/app/globals.css`
under `@theme`.

Headings are set in Source Serif 4 to echo the logo's letterforms; everything
else is Inter. Both are self-hosted as latin-subset variable fonts (~50 KB
each), so there's no third-party request on first paint and no visitor IP
addresses are sent to Google, which is also what lets the privacy policy say
so honestly.

The site is light-only by design (`color-scheme: light`).

### Logo assets

`public/brand/` holds a transparent PNG, a reversed (white) version for dark
backgrounds, and favicon/apple-touch marks, all generated from the supplied
original, which is kept out of `public/` in `design/logo-original.png`.

If a vector version of the logo turns up, replace `public/brand/logo.png` with
an SVG and update the import in `src/components/brand/logo.tsx`. The header
lockup pairs the monogram with the typeset company name, because at header
size the wordmark inside the monogram is only a few pixels tall.

### Motion

All animation comes from the [transitions.dev](https://transitions.dev) skill,
installed via `npx skills add Jakubantalik/transitions.dev`. Nine snippets are
in use:

| Snippet | Where |
| --- | --- |
| Menu dropdown (05) | Products mega menu |
| Panel reveal (07) | Mobile nav drawer, cookie banner |
| Icon swap (09) | Hamburger ↔ close |
| Success check (10) | Enquiry form confirmation |
| Error state shake (12) | Enquiry form validation |
| Tabs sliding (16) | Products category filter |
| Texts reveal (18) | Home hero headline |
| Accordion (21) | Mobile nav category groups |
| Learn more hover (24) | Category card chevrons |

`src/styles/transitions-root.css` is the motion-token scale; `transitions.css`
holds the snippets **pasted verbatim**. Don't rewrite their selectors, collapse
them to shorthand, strip `will-change`, or remove the
`prefers-reduced-motion` guards. They're tuned, and the guards are what keeps
the site passing accessibility audits. Project-specific overrides live in
`globals.css`, below the imports, each with a comment explaining why.

Scroll reveals (`src/components/ui/reveal.tsx`) use the same token scale.
Content renders **visible by default** and is only hidden after JavaScript
mounts, so the page is fully readable if JS fails or is slow.

---

## The enquiry form

`src/components/contact/contact-form.tsx` → `POST /api/contact`.

Validation rules are shared between client and server
(`src/lib/contact-schema.ts`). The client copy is for instant feedback, the
server copy is the one that counts.

Spam protection, in order:

1. **Rate limit**: 10 requests per IP per 10 minutes.
2. **Honeypot**: a `website` field, positioned off-screen rather than
   `display: none`, which some bots detect and skip.
3. **Timing gate**: submissions faster than 2.5 s after render are dropped.

The two bot gates return `200 {ok:true}` rather than an error. Telling a bot
which check it failed just teaches it how to pass next time; the submission is
silently discarded.

### ⚠️ Email delivery is not wired up

It needs credentials the client owns. Right now a valid submission is logged
server-side (without the message body) and the user sees the success state.
**Before launch, send it somewhere.** In `src/app/api/contact/route.ts`, at the
marked spot:

```ts
// npm i resend
import { Resend } from "resend";
const resend = new Resend(process.env.RESEND_API_KEY);

await resend.emails.send({
  from: "website@evertechstationery.com",
  to: "tek@evertechstationery.com",
  replyTo: body.email,
  subject: `Enquiry from ${body.name}${body.company ? ` (${body.company})` : ""}`,
  text: body.message,
});
```

`RESEND_API_KEY` goes in the host's environment, **not** in a `NEXT_PUBLIC_`
variable, and not in the repo. Nodemailer over SMTP works equally well if the
client already has a mailbox.

The rate limiter is in-memory, which is correct for a single instance. On a
platform that runs several instances or recycles containers aggressively, move
it to Upstash Redis or the host's own rate limiting.

---

## Analytics and cookies

No analytics script loads and **no cookie banner appears** unless a
measurement ID is configured. A site that sets no cookies has nothing to ask
about. Set one of these in the host's environment:

```bash
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX              # Google Analytics 4
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=evertechstationery.com   # Plausible
```

With one set, the banner appears and the script loads **only after the visitor
presses Accept**. The choice is stored in `localStorage`, not a cookie, so
declining genuinely stores nothing.

A measurement ID is a public identifier, so `NEXT_PUBLIC_` is correct here.
Never put an API key, SMTP password or private token behind that prefix;
anything so named is inlined into the browser bundle.

---

## Before you go live

Ordered roughly by how much damage it does if missed.

**Content and legal**

- [x] Set the real phone, email and address in `src/lib/site.ts`
- [ ] Confirm WhatsApp is on the same number as the phone, or give a separate one
- [ ] Set `legalName` to the registered company name
- [ ] Replace or delete the invented `stats` figures in `src/lib/site.ts`
- [ ] Fill in every `⟨bracketed⟩` value in `/privacy` and `/terms`
- [ ] Have a qualified adviser review both legal pages
- [ ] Add the building and office number to `site.address.lines` once known
- [ ] Check `site.address.mapQuery` drops the pin on the right Port Saeed unit

**Wiring**

- [ ] Send the enquiry form somewhere (see above) and test it end to end
- [ ] Set `NEXT_PUBLIC_GA_ID` or `NEXT_PUBLIC_PLAUSIBLE_DOMAIN`, or accept no analytics
- [ ] Submit `https://evertechstationery.com/sitemap.xml` to Google Search Console

**Hosting.** These cannot be done in the code and are the deployer's job:

- [ ] **Force HTTPS.** The code sends an HSTS header
      (`max-age=63072000; includeSubDomains; preload`), but the host must do the
      actual `http → https` redirect. HSTS on a site not yet served over HTTPS
      does nothing.
- [ ] **Keep secrets out of the frontend.** Store the mail API key in the host's
      environment variable store. Never commit `.env*`, never prefix a secret
      with `NEXT_PUBLIC_`.
- [ ] Point the apex and `www` at the same place and pick one as canonical
- [ ] Confirm the security headers survive the host's own header handling
      (`curl -I https://evertechstationery.com`)

**Optional**

- [ ] Add product photography (`image:` on catalogue entries)
- [ ] Add client logos and testimonials once permission is in writing

---

## What was verified

Checked against a production build at the time of handover:

| | |
| --- | --- |
| Accessibility | axe-core, WCAG 2.1 AA, **0 violations** on all 8 pages |
| Colour contrast | every text/background pair ≥ 4.5:1 |
| Responsive | no horizontal overflow at 390 px on any page |
| Core Web Vitals | CLS **0**, LCP ~200 ms (local) |
| Links | all internal links resolve, no 404s |
| Images | every `<img>` has an `alt` attribute |
| SEO | unique title + description per page, all ≤ 160 chars; canonical per page; OG image on every page; `sitemap.xml`; `robots.txt` |
| Build | `next build` and `eslint` both clean |
| Interaction | mega menu, mobile drawer, accordion, sliding tabs, category search, form validation, form success, spam gates and rate limit all exercised in a headless browser |

The 404 page is deliberately `noindex` and carries no canonical.

### Known gaps

- Email delivery from the contact form is not connected (see above).
- No automated test suite. Verification was done with one-off scripts against a
  production build, not committed.
- The catalogue is a static list. If the client ever wants to manage it
  themselves, `src/lib/catalog.ts` is the shape a CMS would need to produce.
