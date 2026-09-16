/**
 * Product taxonomy.
 *
 * This is a brochure catalogue — categories only, no prices, no SKUs. Each
 * category renders as a card; `blurb` is the one-line description shown on the
 * Products page. Add or remove entries here and every page updates.
 *
 * `image` is intentionally omitted: the cards are designed to look finished
 * without photography. When the client supplies product shots, add
 * `image: "/products/<slug>.jpg"` to a category and the card will use it.
 */

export type Category = {
  slug: string;
  name: string;
  blurb: string;
  /** Optional photo, relative to /public. Falls back to an icon treatment. */
  image?: string;
};

export type CategoryGroup = {
  slug: string;
  name: string;
  /** Compact label for the segmented filter, where long names overflow. */
  shortName: string;
  /** Short line used on the group header and the home page. */
  summary: string;
  /** lucide-react icon name — see components/icons.tsx for the mapping. */
  icon: IconName;
  categories: Category[];
};

export type IconName =
  | "filing"
  | "paper"
  | "writing"
  | "desk"
  | "machines"
  | "boards"
  | "packing"
  | "identity";

export const catalog: CategoryGroup[] = [
  {
    slug: "filing-organisation",
    name: "Filing & Organisation",
    shortName: "Filing",
    summary: "Keep every document findable — binders, files, trays and storage.",
    icon: "filing",
    categories: [
      { slug: "lever-arch-files", name: "Lever arch files", blurb: "Board and PVC lever arch files in A4 and foolscap." },
      { slug: "ring-binders", name: "Ring binders", blurb: "2-ring, 4-ring and D-ring binders, 25 mm to 65 mm." },
      { slug: "box-files", name: "Rigid box files", blurb: "Hard-board box files with clip closure and spine labels." },
      { slug: "office-files", name: "Office files", blurb: "Clip files, spring files, display books and report covers." },
      { slug: "dividers", name: "Dividers & indexes", blurb: "Numeric, alphabetic and blank tab dividers, plain or laminated." },
      { slug: "transparent-pockets", name: "Transparent pockets", blurb: "Punched sheet protectors and copy-safe pockets by the box." },
      { slug: "filing-trays", name: "Filing trays", blurb: "Mesh and moulded letter trays, stackable and riser-compatible." },
      { slug: "storage-boxes", name: "Storage boxes", blurb: "Archive cartons and lidded storage for long-term records." },
      { slug: "book-ends", name: "Book ends", blurb: "Powder-coated steel book ends in standard and heavy-duty." },
      { slug: "telephone-index", name: "Telephone index", blurb: "Flip-top and spiral telephone and address indexes." },
      { slug: "card-holders", name: "Visiting card holders", blurb: "Desk and pocket card holders, plus filing card books." },
    ],
  },
  {
    slug: "paper-print",
    name: "Paper & Print",
    shortName: "Paper & Print",
    summary: "Everything that goes through the printer, and everything it prints on.",
    icon: "paper",
    categories: [
      { slug: "copy-paper", name: "Photocopy paper", blurb: "A4, A3 and legal multipurpose paper, 70–100 gsm." },
      { slug: "registers", name: "Registers & log books", blurb: "Bound registers, attendance books and visitor logs." },
      { slug: "writing-pads", name: "Writing pads", blurb: "Ruled and plain pads, legal pads and refill sheets." },
      { slug: "labels", name: "Multipurpose labels", blurb: "Laser and inkjet label sheets in every common layout." },
      { slug: "binding-sheets", name: "Binding sheets", blurb: "PVC and PP covers, clear and frosted, plus backing board." },
      { slug: "toner-cartridges", name: "Toner & cartridges", blurb: "Genuine and compatible toner for the major printer brands." },
      { slug: "sticky-notes", name: "Sticky notes", blurb: "Repositionable notes, page flags and index tabs." },
      { slug: "envelopes", name: "Envelopes", blurb: "Window, plain and board-backed envelopes, DL to C3." },
    ],
  },
  {
    slug: "writing-correction",
    name: "Writing & Correction",
    shortName: "Writing",
    summary: "Pens that get borrowed and never come back — so order plenty.",
    icon: "writing",
    categories: [
      { slug: "pens", name: "Pens", blurb: "Ballpoint, gel and rollerball in bulk packs and singles." },
      { slug: "markers", name: "Markers", blurb: "Permanent, whiteboard, flipchart and paint markers." },
      { slug: "highlighters", name: "Highlighters", blurb: "Chisel and bullet tip highlighters, single and assorted." },
      { slug: "pencils", name: "Pencils", blurb: "Graphite, colour and mechanical pencils with leads." },
      { slug: "erasers", name: "Erasers", blurb: "Dust-free, kneadable and pen-style erasers." },
      { slug: "sharpeners", name: "Sharpeners", blurb: "Handheld, canister and desk-mounted sharpeners." },
      { slug: "correction", name: "Correction pens & tape", blurb: "Correction fluid, pens and dry tape roller applicators." },
      { slug: "stamp-pads", name: "Stamp pads & ink", blurb: "Felt and foam pads with matching refill inks." },
    ],
  },
  {
    slug: "desk-essentials",
    name: "Desk Essentials",
    shortName: "Desk",
    summary: "The small things nobody orders until the day they run out.",
    icon: "desk",
    categories: [
      { slug: "staplers", name: "Staplers & staples", blurb: "Half-strip, full-strip and heavy-duty with matching pins." },
      { slug: "punches", name: "Punches", blurb: "2-hole, 4-hole and heavy-duty punches with depth guides." },
      { slug: "clips-pins", name: "Clips, pins & fasteners", blurb: "Paper clips, binder clips, push pins and paper fasteners." },
      { slug: "binding-clips", name: "Binding clips", blurb: "Fold-back clips from 15 mm to 51 mm, black and coloured." },
      { slug: "rubber-bands", name: "Rubber bands", blurb: "Natural rubber bands, boxed by size and weight." },
      { slug: "scissors", name: "Scissors & cutters", blurb: "Office scissors, utility knives and replacement blades." },
      { slug: "cutting-mats", name: "Cutting mats", blurb: "Self-healing mats with grid, A4 through A1." },
      { slug: "rulers", name: "Rulers", blurb: "Steel, acrylic and plastic rulers, 15 cm to 100 cm." },
      { slug: "letter-openers", name: "Letter openers", blurb: "Blade and safety-slit openers for high-volume post." },
      { slug: "calculators", name: "Calculators", blurb: "Desktop, printing and scientific models." },
      { slug: "cash-boxes", name: "Cash boxes", blurb: "Lockable cash tins with coin trays and spare keys." },
      { slug: "key-boxes", name: "Key boxes", blurb: "Wall-mounted key cabinets with tags, 20 to 100 hooks." },
    ],
  },
  {
    slug: "office-machines",
    name: "Office Machines",
    shortName: "Machines",
    summary: "Bind it, laminate it, shred it — with the consumables to match.",
    icon: "machines",
    categories: [
      { slug: "binding-machines", name: "Binding machines", blurb: "Comb, wire and thermal binders plus spines and combs." },
      { slug: "laminators", name: "Laminators", blurb: "A4 and A3 pouch laminators with film in 80–250 micron." },
      { slug: "shredders", name: "Paper shredders", blurb: "Strip, cross-cut and micro-cut for personal to office use." },
      { slug: "label-printers", name: "Label printers", blurb: "Handheld and desktop label makers with tape cassettes." },
      { slug: "trimmers", name: "Paper trimmers", blurb: "Guillotine and rotary trimmers, A4 and A3." },
    ],
  },
  {
    slug: "boards-presentation",
    name: "Boards & Presentation",
    shortName: "Boards",
    summary: "Meeting rooms, reception desks and anywhere information gets shown.",
    icon: "boards",
    categories: [
      { slug: "whiteboards", name: "White boards", blurb: "Magnetic and non-magnetic boards, wall and mobile." },
      { slug: "whiteboard-accessories", name: "White board accessories", blurb: "Erasers, cleaning fluid, magnets and marker sets." },
      { slug: "notice-boards", name: "Notice boards", blurb: "Cork, felt and lockable glass-front notice boards." },
      { slug: "flip-charts", name: "Flip charts", blurb: "Easels and pads, plain and gridded, self-stick options." },
      { slug: "sign-holders", name: "Sign holders", blurb: "Acrylic desk, wall and counter sign holders." },
      { slug: "card-stands", name: "Card & menu stands", blurb: "Angled and T-shape stands in A4, A5 and A6." },
    ],
  },
  {
    slug: "packing-shipping",
    name: "Packing & Shipping",
    shortName: "Packing",
    summary: "Get it out the door intact — tape, wrap, cartons and labels.",
    icon: "packing",
    categories: [
      { slug: "packing-tapes", name: "Packing tapes", blurb: "Clear, brown and printed tape with dispensers." },
      { slug: "stretch-film", name: "Stretch film", blurb: "Hand and machine pallet wrap in clear and black." },
      { slug: "bubble-wrap", name: "Bubble wrap & void fill", blurb: "Rolls, bags and paper void fill for fragile goods." },
      { slug: "cartons", name: "Cartons", blurb: "Single and double-wall cartons in standard sizes." },
      { slug: "strapping", name: "Strapping", blurb: "PP strapping rolls with buckles and tensioners." },
    ],
  },
  {
    slug: "id-events",
    name: "ID & Events",
    shortName: "ID & Events",
    summary: "Badges, lanyards and everything the front desk hands out.",
    icon: "identity",
    categories: [
      { slug: "id-holders", name: "ID card holders", blurb: "Rigid, flexible and retractable badge holders." },
      { slug: "lanyards", name: "Lanyards", blurb: "Plain and printed lanyards with safety breakaways." },
      { slug: "badge-accessories", name: "Badge accessories", blurb: "Clips, reels, pins and blank inserts." },
      { slug: "visitor-books", name: "Visitor books & passes", blurb: "Sign-in books and peel-off visitor pass sheets." },
    ],
  },
];

/** Flat list of every category, useful for search and counts. */
export const allCategories = catalog.flatMap((group) =>
  group.categories.map((category) => ({ ...category, group })),
);

export const categoryCount = allCategories.length;

/** Groups highlighted on the home page. */
export const featuredGroupSlugs = [
  "filing-organisation",
  "paper-print",
  "writing-correction",
  "desk-essentials",
  "office-machines",
  "packing-shipping",
] as const;
