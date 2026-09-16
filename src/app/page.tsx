import type { Metadata } from "next";
import Link from "next/link";
import {
  ClipboardList,
  Headset,
  PackageCheck,
  ReceiptText,
  Truck,
  Warehouse,
} from "lucide-react";

import { CategoryCard } from "@/components/category-card";
import { Hero } from "@/components/home/hero";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { Section, SectionHeading } from "@/components/ui/section";
import { catalog, categoryCount, featuredGroupSlugs } from "@/lib/catalog";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: `${site.legalName} | ${site.tagline}`,
  description: site.description,
  alternates: { canonical: "/" },
};

const reasons = [
  {
    icon: Warehouse,
    title: "Held in stock, not drop-shipped",
    body: "The lines you reorder every month sit in our warehouse, so a routine order doesn't wait on a supplier three countries away.",
  },
  {
    icon: Truck,
    title: "Free delivery on business orders",
    body: "Orders placed before 2 pm on stocked items are dispatched the same day, delivered free across the city.",
  },
  {
    icon: ReceiptText,
    title: "One supplier, one invoice",
    body: "Paper, toner, furniture fixings and packing tape on a single monthly account instead of nine separate payables.",
  },
  {
    icon: Headset,
    title: "A person who knows your account",
    body: "You get a named contact who already knows which binder you use and how many reams the second floor gets through.",
  },
  {
    icon: ClipboardList,
    title: "Standing orders that run themselves",
    body: "Tell us the cycle once and the recurring items arrive on schedule without anyone raising a requisition.",
  },
  {
    icon: PackageCheck,
    title: "Specialist lines sourced on request",
    body: "If it isn't in the catalogue we'll quote it. Bulk, branded and custom-print items included.",
  },
];

const steps = [
  {
    number: "01",
    title: "Send us your list",
    body: "Email a spreadsheet, send a photo of the stock cupboard, or just tell us what ran out.",
  },
  {
    number: "02",
    title: "We quote it back",
    body: "A line-by-line quote, usually the same working day, with alternatives where they save you money.",
  },
  {
    number: "03",
    title: "It arrives",
    body: "Stocked items dispatch same day. Delivery is free on business orders, invoiced monthly.",
  },
];

export default function HomePage() {
  const featured = featuredGroupSlugs
    .map((slug) => catalog.find((group) => group.slug === slug))
    .filter((group): group is NonNullable<typeof group> => Boolean(group));

  return (
    <>
      <Hero />

      {/* ── Categories ── */}
      <Section id="categories" tone="paper">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="What we supply"
            title="Everything the office gets through"
            lead={`${categoryCount} categories across filing, print, writing, desk essentials, machines and packing. The full working inventory rather than a token selection.`}
          />
          <Reveal>
            <ButtonLink href="/products" variant="secondary">
              All categories
            </ButtonLink>
          </Reveal>
        </div>

        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((group, index) => (
            <Reveal as="li" key={group.slug} delay={index} className="h-full">
              <CategoryCard group={group} />
            </Reveal>
          ))}
        </ul>
      </Section>

      {/* ── Why us ── */}
      <Section tone="surface">
        <SectionHeading
          eyebrow="Why buy from us"
          title="Built around how offices actually reorder"
          lead="Stationery is a small line on the budget and a large one on the admin. We keep both down."
        />

        <ul className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {reasons.map((reason, index) => (
            <Reveal as="li" key={reason.title} delay={index}>
              <span className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl border border-navy-100 bg-navy-50 text-navy-700">
                <reason.icon size={19} aria-hidden />
              </span>
              <h3 className="font-serif text-lg leading-snug font-semibold text-ink">
                {reason.title}
              </h3>
              <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-muted">
                {reason.body}
              </p>
            </Reveal>
          ))}
        </ul>
      </Section>

      {/* ── How it works ── */}
      <Section tone="warm">
        <SectionHeading
          eyebrow="How it works"
          title="Three steps, no account manager roulette"
        />

        <ol className="mt-12 grid gap-6 md:grid-cols-3">
          {steps.map((step, index) => (
            <Reveal as="li" key={step.number} delay={index}>
              <div className="h-full rounded-2xl border border-line bg-surface p-7 shadow-card">
                <span className="eyebrow text-brass-600">Step {step.number}</span>
                <h3 className="mt-3 font-serif text-xl leading-snug font-semibold text-ink">
                  {step.title}
                </h3>
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-muted">
                  {step.body}
                </p>
              </div>
            </Reveal>
          ))}
        </ol>
      </Section>

      {/* ── Single clear call to action ── */}
      <section className="bg-navy-900 py-16 text-navy-100 sm:py-20">
        <Container size="default">
          <Reveal className="text-center">
            <h2 className="font-serif text-3xl leading-tight font-semibold text-white sm:text-4xl">
              Send us your stationery list
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-navy-200 sm:text-lg">
              We&apos;ll quote it line by line, usually the same working day. No
              account needed to ask.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <ButtonLink href="/contact" variant="onDark" size="lg">
                Request a quote
              </ButtonLink>
              <Link
                href={site.contact.phoneHref}
                className="pressable inline-flex min-h-11 items-center rounded-lg px-4 text-base font-medium text-navy-100 hover:text-white"
                data-pressable
              >
                or call {site.contact.phone}
              </Link>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
