/**
 * Client logo wall.
 *
 * ⚠️ DELIBERATELY EMPTY. Listing companies as customers, or publishing quotes
 * attributed to named people, is a factual claim — inventing either would be
 * a fabricated endorsement, so none are shipped.
 *
 * To populate it: drop each logo in /public/clients/ and add an entry here.
 * The page renders the wall automatically once this array has entries, and
 * falls back to a "logos coming soon" state while it's empty.
 *
 *   export const clients: Client[] = [
 *     { name: "Acme Trading LLC", logo: "/clients/acme.svg" },
 *   ];
 *
 * Same for testimonials — only add ones the customer has actually given you
 * permission to publish.
 */

export type Client = {
  name: string;
  /** Path under /public. Mono/SVG works best against the light background. */
  logo: string;
  href?: string;
};

export type Testimonial = {
  quote: string;
  author: string;
  role: string;
  company: string;
};

export const clients: Client[] = [];

export const testimonials: Testimonial[] = [];

/** Sectors we supply. These describe our own business, so they're safe to ship. */
export const sectors = [
  {
    name: "Professional services",
    body: "Law firms, accountancy practices and consultancies — heavy on filing, binding and premium print.",
  },
  {
    name: "Education",
    body: "Schools, colleges and training centres ordering to a term calendar rather than a monthly one.",
  },
  {
    name: "Healthcare",
    body: "Clinics and medical centres needing registers, labelling and reliable reorder cycles.",
  },
  {
    name: "Logistics & warehousing",
    body: "Packing tape, stretch film, cartons and labels in volume, with pallet delivery.",
  },
  {
    name: "Hospitality & retail",
    body: "Front-of-house consumables, sign holders, visitor books and back-office supplies.",
  },
  {
    name: "Government & public sector",
    body: "Tender-compliant quoting, itemised invoicing and scheduled multi-site delivery.",
  },
];
