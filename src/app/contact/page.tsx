import type { Metadata } from "next";
import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";

import { ContactForm } from "@/components/contact/contact-form";
import { PageHeader } from "@/components/page-header";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { ogImage, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact Us",
  description: `Get a quote from ${site.legalName}. Call ${site.contact.phone}, email ${site.contact.email}, or send your stationery list through the form.`,
  alternates: { canonical: "/contact" },
  openGraph: {
    title: `Contact · ${site.name}`,
    description: "Send us your stationery list and we'll quote it line by line.",
    url: "/contact",
    images: [ogImage],
  },
};

export default function ContactPage() {
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(site.address.mapQuery)}&output=embed`;

  return (
    <>
      <PageHeader
        eyebrow="Contact us"
        title="Tell us what you need"
        lead="Send your list, ask for a quote, or open an account. Whichever it is, a person reads it, usually the same working day."
      />

      <section className="bg-paper py-16 sm:py-20 lg:py-24">
        <Container size="wide">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
            {/* ── Details ── */}
            <div className="lg:col-span-5">
              <Reveal>
                <h2 className="font-serif text-2xl leading-snug font-semibold text-ink">
                  Reach us directly
                </h2>

                <ul className="mt-7 space-y-3">
                  <li>
                    <a
                      href={site.contact.phoneHref}
                      data-pressable
                      className="pressable flex items-start gap-4 rounded-xl border border-line bg-surface p-5 shadow-card hover:border-navy-200 hover:shadow-lift"
                    >
                      <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-navy-50 text-navy-700">
                        <Phone size={18} aria-hidden />
                      </span>
                      <span>
                        <span className="block text-sm text-ink-muted">Phone</span>
                        <span className="mt-0.5 block font-medium text-ink">
                          {site.contact.phone}
                        </span>
                      </span>
                    </a>
                  </li>

                  <li>
                    <a
                      href={site.contact.whatsappHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-pressable
                      className="pressable flex items-start gap-4 rounded-xl border border-line bg-surface p-5 shadow-card hover:border-navy-200 hover:shadow-lift"
                    >
                      <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-navy-50 text-navy-700">
                        <MessageCircle size={18} aria-hidden />
                      </span>
                      <span>
                        <span className="block text-sm text-ink-muted">WhatsApp</span>
                        <span className="mt-0.5 block font-medium text-ink">
                          {site.contact.whatsapp}
                        </span>
                      </span>
                    </a>
                  </li>

                  <li>
                    <a
                      href={site.contact.emailHref}
                      data-pressable
                      className="pressable flex items-start gap-4 rounded-xl border border-line bg-surface p-5 shadow-card hover:border-navy-200 hover:shadow-lift"
                    >
                      <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-navy-50 text-navy-700">
                        <Mail size={18} aria-hidden />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-sm text-ink-muted">Email</span>
                        <span className="mt-0.5 block break-all font-medium text-ink">
                          {site.contact.email}
                        </span>
                      </span>
                    </a>
                  </li>

                  <li className="flex items-start gap-4 rounded-xl border border-line bg-surface p-5 shadow-card">
                    <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-navy-50 text-navy-700">
                      <MapPin size={18} aria-hidden />
                    </span>
                    <span>
                      <span className="block text-sm text-ink-muted">Address</span>
                      <address className="mt-0.5 font-medium text-ink not-italic">
                        {site.address.lines.map((line) => (
                          <span key={line} className="block">
                            {line}
                          </span>
                        ))}
                        {site.address.city}, {site.address.country}
                      </address>
                    </span>
                  </li>

                  <li className="flex items-start gap-4 rounded-xl border border-line bg-surface p-5 shadow-card">
                    <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-navy-50 text-navy-700">
                      <Clock size={18} aria-hidden />
                    </span>
                    <span className="flex-1">
                      <span className="block text-sm text-ink-muted">
                        Opening hours
                      </span>
                      <dl className="mt-1.5 space-y-1 text-sm">
                        {site.hours.map((entry) => (
                          <div
                            key={entry.days}
                            className="flex justify-between gap-4"
                          >
                            <dt className="text-ink-muted">{entry.days}</dt>
                            <dd className="font-medium text-ink">{entry.time}</dd>
                          </div>
                        ))}
                      </dl>
                    </span>
                  </li>
                </ul>
              </Reveal>
            </div>

            {/* ── Form ── */}
            <div className="lg:col-span-7">
              <Reveal delay={1}>
                <h2 className="font-serif text-2xl leading-snug font-semibold text-ink">
                  Or send it through here
                </h2>
                <p className="mt-2 text-[0.9375rem] text-ink-muted">
                  The more detail you give, the closer the first quote lands.
                </p>
                <div className="mt-7">
                  <ContactForm />
                </div>
              </Reveal>
            </div>
          </div>
        </Container>
      </section>

      {/* ── Map ── */}
      <section aria-labelledby="map-heading" className="border-t border-line">
        <h2 id="map-heading" className="sr-only">
          Our location on a map
        </h2>
        <iframe
          title={`Map showing ${site.legalName} in ${site.address.city}`}
          src={mapSrc}
          loading="lazy"
          // Stops the map leaking the visitor's referrer to Google.
          referrerPolicy="no-referrer-when-downgrade"
          className="block h-[22rem] w-full border-0 grayscale-[0.25] sm:h-[26rem]"
        />
      </section>
    </>
  );
}
