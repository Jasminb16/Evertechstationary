"use client";

import { useEffect, useRef, useState } from "react";
import { PackageCheck, Phone, Truck } from "lucide-react";

import { groupIcons } from "@/components/icons";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { catalog, categoryCount } from "@/lib/catalog";
import { site } from "@/lib/site";

/**
 * Hero.
 *
 * The headline uses the transitions.dev texts reveal (18): `.is-shown` is added
 * on mount so the lines rise in with the documented stagger. It renders in the
 * hidden state first, which is fine here — the hero is above the fold and the
 * class lands on the first frame after hydration.
 */
/**
 * The category figure is derived from the catalogue so the number in the copy
 * and the number in the stat row can never drift apart.
 */
const heroStats = [
  site.stats[0],
  { value: String(categoryCount), label: "Product categories" },
  site.stats[1],
];

export function Hero() {
  const blockRef = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setShown(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <section className="relative overflow-hidden border-b border-line bg-surface">
      {/* Backdrop: a faint ruled-paper grid fading out toward the bottom. */}
      <div
        aria-hidden
        className="ruled pointer-events-none absolute inset-0 opacity-50 [mask-image:linear-gradient(to_bottom,black,transparent_72%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 -top-40 h-[34rem] w-[34rem] rounded-full bg-navy-50 blur-3xl"
      />

      <Container size="wide" className="relative py-16 sm:py-20 lg:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <p className="eyebrow mb-5 inline-flex items-center gap-2 rounded-full border border-navy-100 bg-navy-50 px-3 py-1.5 text-navy-700">
              <Truck size={13} aria-hidden />
              Free delivery on business orders
            </p>

            <div
              ref={blockRef}
              className={`t-stagger ${shown ? "is-shown" : ""}`}
            >
              <h1 className="text-[2.5rem] leading-[1.06] font-semibold text-balance text-ink sm:text-5xl lg:text-[3.5rem]">
                {/* The spans are display:block, so the line break is visual —
                    but textContent would run the two lines together without
                    this space, which is what a crawler and a screen reader
                    read. */}
                <span className="t-stagger-line t-stagger-line--1">
                  Every office essential,
                </span>{" "}
                <span className="t-stagger-line t-stagger-line--2 text-navy-700">
                  from one supplier.
                </span>
              </h1>
              <p className="t-stagger-line t-stagger-line--3 mt-6 max-w-lg text-lg leading-relaxed text-ink-muted">
                From photocopy paper and lever arch files to binding machines
                and packing tape. {categoryCount} categories, held in stock and
                on your desk the next working day.
              </p>
              {/* flex! because .t-stagger-line sets display:block and transitions.css
                  loads after Tailwind — same specificity, so it would win the tie. */}
              <div className="t-stagger-line t-stagger-line--4 mt-8 flex! flex-col gap-3 sm:flex-row">
                <ButtonLink href="/products" size="lg">
                  Browse the range
                </ButtonLink>
                <ButtonLink
                  href={site.contact.phoneHref}
                  variant="secondary"
                  size="lg"
                >
                  <Phone size={17} aria-hidden />
                  {site.contact.phone}
                </ButtonLink>
              </div>
            </div>

            <dl className="mt-10 grid grid-cols-3 gap-4 border-t border-line pt-7">
              {heroStats.map((stat) => (
                <div key={stat.label}>
                  <dt className="sr-only">{stat.label}</dt>
                  <dd>
                    <span className="block font-serif text-2xl font-semibold text-navy-800 sm:text-[1.75rem]">
                      {stat.value}
                    </span>
                    <span className="mt-1 block text-[0.8125rem] leading-snug text-ink-muted">
                      {stat.label}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Category collage — reads as product without needing photography. */}
          <div className="lg:col-span-6">
            <div className="relative mx-auto grid max-w-lg grid-cols-2 gap-3 sm:gap-4 lg:ml-auto lg:mr-0">
              {catalog.slice(0, 4).map((group, index) => {
                const Icon = groupIcons[group.icon];
                return (
                  <div
                    key={group.slug}
                    className={[
                      "rounded-2xl border border-line bg-paper-warm p-5 shadow-card sm:p-6",
                      // Offset the second column so the block doesn't read as
                      // a plain grid — it steps like stacked paper.
                      index % 2 === 1 ? "translate-y-5 sm:translate-y-8" : "",
                    ].join(" ")}
                  >
                    <span className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-navy-800 text-white">
                      <Icon size={19} aria-hidden />
                    </span>
                    <h2 className="font-serif text-lg leading-snug font-semibold text-ink">
                      {group.name}
                    </h2>
                    <p className="mt-1.5 text-sm text-ink-muted">
                      {group.categories.length} categories
                    </p>
                  </div>
                );
              })}

              <div className="col-span-2 mt-5 flex items-center gap-3 rounded-2xl border border-navy-100 bg-navy-50 px-5 py-4 sm:mt-8">
                <PackageCheck size={20} aria-hidden className="shrink-0 text-navy-700" />
                <p className="text-sm leading-snug text-navy-900">
                  <strong className="font-semibold">Same-day dispatch</strong> on
                  stocked lines ordered before 2 pm.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
