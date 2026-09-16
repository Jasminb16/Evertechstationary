/**
 * ─────────────────────────────────────────────────────────────────────────────
 * SITE CONFIGURATION — edit this file to update company details everywhere.
 * ─────────────────────────────────────────────────────────────────────────────
 * Every phone number, email, address and social link on the site reads from
 * here. Nothing is hard-coded in the pages. Values marked TODO are placeholders
 * supplied by the build team and should be replaced with the client's real
 * details before launch.
 */

export const site = {
  /** Short trading name, used in the logo and nav. */
  name: "Evertech",
  /** Full name, used in titles, schema.org data and the footer. */
  legalName: "Evertech Stationery", // TODO: confirm registered legal name
  tagline: "Office stationery, delivered right",
  /** Kept under 160 characters so search engines don't truncate it. */
  description:
    "Office stationery, filing, printing and desk essentials for businesses: one supplier, one invoice, free delivery and same-day dispatch on stocked lines.",

  /** Canonical production URL. Domain is registered and currently parked. */
  url: "https://evertechstationery.com",

  contact: {
    // Supplied as 0569318022; the trunk 0 is dropped after +971 so the tel:
    // and wa.me links dial correctly from outside the UAE.
    phone: "+971 56 931 8022",
    phoneHref: "tel:+971569318022",
    whatsapp: "+971 56 931 8022", // TODO: confirm WhatsApp is on this same number
    whatsappHref: "https://wa.me/971569318022",
    email: "tek@evertechstationery.com",
    emailHref: "mailto:tek@evertechstationery.com",
  },

  address: {
    /** Street lines above the city. Add the building/office when known. */
    lines: ["Port Saeed"],
    city: "Dubai",
    country: "United Arab Emirates",
    /** Google Maps embed query — swap for the real pin. */
    mapQuery: "Port Saeed, Dubai, United Arab Emirates",
  },

  hours: [
    { days: "Monday – Friday", time: "8:30 am – 6:30 pm" },
    { days: "Saturday", time: "9:00 am – 2:00 pm" },
    { days: "Sunday", time: "Closed" },
  ],

  /**
   * Headline numbers shown on the home and about pages.
   *
   * ⚠️ THESE ARE PLACEHOLDERS AND ARE CLAIMS ABOUT THE BUSINESS.
   * Replace them with real figures or delete the ones you can't substantiate
   * before the site goes live. The product-category count is not listed here
   * because it is computed from the catalogue — see lib/catalog.ts.
   */
  stats: [
    { value: "2,500+", label: "Products in stock" }, // TODO: real figure
    { value: "Same day", label: "Dispatch on stock items" },
    { value: "500+", label: "Businesses supplied" }, // TODO: real figure
  ],
} as const;

/**
 * The generated social card (app/opengraph-image.tsx).
 *
 * Any page that declares its own `openGraph` block replaces the inherited one
 * wholesale, which silently drops the file-based image — so every such page
 * has to spread this back in.
 */
export const ogImage = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: `${site.legalName} | ${site.tagline}`,
};

export const nav = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Products", href: "/products", hasMegaMenu: true },
  { label: "Clients", href: "/clients" },
  { label: "Contact Us", href: "/contact" },
] as const;
