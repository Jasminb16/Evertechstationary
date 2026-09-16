import type { Metadata } from "next";
import { Building2, HandCoins, Recycle, ShieldCheck } from "lucide-react";

import { PageHeader } from "@/components/page-header";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { Section, SectionHeading } from "@/components/ui/section";
import { catalog, categoryCount } from "@/lib/catalog";
import { ogImage, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Us",
  description: `${site.legalName} supplies businesses with the full range of office stationery — held in stock, delivered free, invoiced monthly.`,
  alternates: { canonical: "/about" },
  openGraph: {
    title: `About · ${site.name}`,
    description: `Who we are and how we supply offices across ${site.address.city}.`,
    url: "/about",
    images: [ogImage],
  },
};

const values = [
  {
    icon: ShieldCheck,
    title: "Stock we can stand behind",
    body: "We carry brands we'd use ourselves and say so plainly when a cheaper alternative does the same job. No substituting a lesser product into an order without telling you.",
  },
  {
    icon: HandCoins,
    title: "Pricing that survives scrutiny",
    body: "Quotes are line by line, so finance can see what moved and why. Volume pricing is applied automatically rather than only when somebody remembers to ask.",
  },
  {
    icon: Building2,
    title: "Built for accounts, not baskets",
    body: "Standing orders, monthly invoicing, delivery to multiple floors or sites, and a named contact who already knows the account.",
  },
  {
    icon: Recycle,
    title: "Less packaging, fewer trips",
    body: "Orders are consolidated into one delivery where we can, with recycled-content options across paper, files and packaging.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About us"
        title="The office supplier that shows up"
        lead="Stationery only matters when it runs out. Our whole business is built so it doesn't — the right stock on the shelf, a quote back the same day, and delivery that arrives when we said it would."
      />

      {/* ── Story ── */}
      <Section tone="paper">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <Reveal>
              <h2 className="font-serif text-3xl leading-tight font-semibold text-ink sm:text-[2.25rem]">
                One supplier instead of nine
              </h2>
              <div className="mt-6 space-y-5 text-base leading-relaxed text-ink-soft sm:text-lg">
                <p>
                  Most offices end up buying stationery from whoever happened to
                  be cheapest that week. Paper from one place, toner from
                  another, packing tape from a third. It works, until somebody
                  has to reconcile nine invoices for what should be one line on
                  the budget.
                </p>
                <p>
                  {site.legalName} exists to collapse that back into a single
                  account. We hold {categoryCount} categories across{" "}
                  {catalog.length} groups — filing and binding, paper and print,
                  writing, desk essentials, office machines, boards, packing and
                  ID — so the routine reorder is one email, one delivery, one
                  invoice at the end of the month.
                </p>
                <p>
                  The lines offices get through constantly sit in our own
                  warehouse rather than a supplier&apos;s. That is the difference
                  between &ldquo;it&apos;ll be with you tomorrow&rdquo; and
                  &ldquo;let me check with our distributor.&rdquo;
                </p>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-5">
            <Reveal delay={1}>
              <div className="rounded-2xl border border-line bg-surface p-7 shadow-card">
                <h3 className="eyebrow text-brass-600">At a glance</h3>
                <dl className="mt-6 space-y-6">
                  {[
                    site.stats[0],
                    { value: String(categoryCount), label: "Product categories" },
                    site.stats[1],
                    site.stats[2],
                  ].map((stat) => (
                    <div key={stat.label} className="border-b border-line pb-5 last:border-0 last:pb-0">
                      <dt className="text-sm text-ink-muted">{stat.label}</dt>
                      <dd className="mt-1 font-serif text-3xl font-semibold text-navy-800">
                        {stat.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* ── Values ── */}
      <Section tone="surface">
        <SectionHeading
          eyebrow="How we work"
          title="Four things we don't compromise on"
        />
        <ul className="mt-12 grid gap-x-10 gap-y-10 sm:grid-cols-2">
          {values.map((value, index) => (
            <Reveal as="li" key={value.title} delay={index}>
              <span className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl border border-navy-100 bg-navy-50 text-navy-700">
                <value.icon size={20} aria-hidden />
              </span>
              <h3 className="font-serif text-xl leading-snug font-semibold text-ink">
                {value.title}
              </h3>
              <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-muted">
                {value.body}
              </p>
            </Reveal>
          ))}
        </ul>
      </Section>

      {/* ── Coverage ── */}
      <Section tone="warm">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <SectionHeading
            eyebrow="Where we deliver"
            title={`Serving businesses across ${site.address.city}`}
            lead="Free delivery on business orders, with same-day dispatch on stocked lines ordered before 2 pm. Outside the city, we ship on next-day courier."
          />
          <Reveal delay={1}>
            <ul className="space-y-4">
              {[
                "Offices, clinics and professional practices",
                "Schools, colleges and training centres",
                "Warehouses, workshops and site offices",
                "Hotels, retail and front-of-house teams",
                "Government and semi-government departments",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 rounded-xl border border-line bg-surface px-5 py-4 text-[0.9375rem] text-ink-soft shadow-card"
                >
                  <span
                    aria-hidden
                    className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brass-500"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Section>

      <section className="bg-navy-900 py-16 text-navy-100 sm:py-20">
        <Container size="default">
          <Reveal className="text-center">
            <h2 className="font-serif text-3xl leading-tight font-semibold text-white sm:text-4xl">
              Open an account with us
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-navy-200 sm:text-lg">
              Tell us roughly what your office gets through and we&apos;ll come
              back with a quote and a delivery schedule.
            </p>
            <div className="mt-8">
              <ButtonLink href="/contact" variant="onDark" size="lg">
                Get in touch
              </ButtonLink>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
