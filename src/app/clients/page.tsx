import type { Metadata } from "next";
import Image from "next/image";
import { Quote } from "lucide-react";

import { PageHeader } from "@/components/page-header";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { Section, SectionHeading } from "@/components/ui/section";
import { clients, sectors, testimonials } from "@/lib/clients";
import { ogImage, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Clients",
  description: `The sectors ${site.legalName} supplies: professional services, education, healthcare, logistics, hospitality and the public sector.`,
  alternates: { canonical: "/clients" },
  openGraph: {
    title: `Clients · ${site.name}`,
    description: "The sectors we supply and how we work with each.",
    url: "/clients",
    images: [ogImage],
  },
};

export default function ClientsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Clients"
        title="Who we supply"
        lead="Offices of four people and offices of four hundred, across half a dozen sectors. What they have in common is not wanting to think about stationery."
      />

      {/* ── Sectors ── */}
      <Section tone="paper">
        <SectionHeading
          eyebrow="Sectors"
          title="Different offices, different reorder rhythms"
          lead="We set the account up around how you actually buy: termly, monthly, or whenever the cupboard looks empty."
        />

        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {sectors.map((sector, index) => (
            <Reveal as="li" key={sector.name} delay={index} className="h-full">
              <div className="h-full rounded-2xl border border-line bg-surface p-6 shadow-card">
                <h3 className="font-serif text-xl leading-snug font-semibold text-ink">
                  {sector.name}
                </h3>
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-muted">
                  {sector.body}
                </p>
              </div>
            </Reveal>
          ))}
        </ul>
      </Section>

      {/* ── Logo wall (renders only once real logos are added) ── */}
      <Section tone="surface">
        <SectionHeading
          eyebrow="Trusted by"
          title="Companies that buy from us"
          align="center"
        />

        {clients.length > 0 ? (
          <ul className="mt-12 grid grid-cols-2 items-center gap-x-8 gap-y-10 sm:grid-cols-3 lg:grid-cols-5">
            {clients.map((client, index) => (
              <Reveal as="li" key={client.name} delay={index}>
                <Image
                  src={client.logo}
                  alt={client.name}
                  width={160}
                  height={56}
                  className="mx-auto h-10 w-auto object-contain opacity-70 transition-opacity duration-250 hover:opacity-100"
                />
              </Reveal>
            ))}
          </ul>
        ) : (
          <Reveal className="mx-auto mt-12 max-w-xl">
            <div className="rounded-2xl border border-dashed border-line-strong bg-paper px-6 py-12 text-center">
              <p className="text-[0.9375rem] leading-relaxed text-ink-muted">
                Client logos are added here once permission to use them is in
                writing. Ask us for references in your sector and we&apos;ll put
                you in touch directly.
              </p>
              <div className="mt-6">
                <ButtonLink href="/contact" variant="secondary" size="sm">
                  Ask for references
                </ButtonLink>
              </div>
            </div>
          </Reveal>
        )}
      </Section>

      {/* ── Testimonials (renders only once real ones are added) ── */}
      {testimonials.length > 0 ? (
        <Section tone="warm">
          <SectionHeading eyebrow="In their words" title="What clients say" />
          <ul className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <Reveal
                as="li"
                key={testimonial.author}
                delay={index}
                className="h-full"
              >
                <figure className="flex h-full flex-col rounded-2xl border border-line bg-surface p-6 shadow-card">
                  <Quote size={20} aria-hidden className="text-brass-400" />
                  <blockquote className="mt-4 flex-1 text-[0.9375rem] leading-relaxed text-ink-soft">
                    {testimonial.quote}
                  </blockquote>
                  <figcaption className="mt-5 border-t border-line pt-4 text-sm">
                    <span className="block font-semibold text-ink">
                      {testimonial.author}
                    </span>
                    <span className="block text-ink-muted">
                      {testimonial.role}, {testimonial.company}
                    </span>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </ul>
        </Section>
      ) : null}

      <section className="bg-navy-900 py-16 text-navy-100 sm:py-20">
        <Container size="default">
          <Reveal className="text-center">
            <h2 className="font-serif text-3xl leading-tight font-semibold text-white sm:text-4xl">
              Add your office to the list
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-navy-200 sm:text-lg">
              Send us a recent stationery invoice and we&apos;ll show you, line
              by line, what the same order costs with us.
            </p>
            <div className="mt-8">
              <ButtonLink href="/contact" variant="onDark" size="lg">
                Request a quote
              </ButtonLink>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
