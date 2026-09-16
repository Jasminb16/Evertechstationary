import Link from "next/link";

import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { catalog } from "@/lib/catalog";
import { site } from "@/lib/site";

export const metadata = {
  title: "Page not found",
  // A 404 should never be indexed — it has no content worth ranking.
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="relative overflow-hidden bg-surface py-20 sm:py-28">
      <div
        aria-hidden
        className="ruled pointer-events-none absolute inset-0 opacity-40 [mask-image:linear-gradient(to_bottom,black,transparent_80%)]"
      />
      <Container size="narrow" className="relative text-center">
        <p className="eyebrow text-brass-600">Error 404</p>
        <h1 className="mt-4 font-serif text-4xl leading-tight font-semibold text-ink sm:text-5xl">
          That page has gone walkabout
        </h1>
        <p className="mx-auto mt-5 max-w-md text-lg leading-relaxed text-ink-muted">
          Like the good scissors. The link may be out of date, or the page may
          have moved. Here&apos;s the way back.
        </p>

        <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
          <ButtonLink href="/" size="lg">
            Back to home
          </ButtonLink>
          <ButtonLink href="/products" variant="secondary" size="lg">
            Browse products
          </ButtonLink>
        </div>

        <div className="mt-14 border-t border-line pt-9 text-left">
          <h2 className="eyebrow text-center text-ink-muted">
            Or jump to a category
          </h2>
          <ul className="mt-5 flex flex-wrap justify-center gap-2">
            {catalog.map((group) => (
              <li key={group.slug}>
                <Link
                  href={`/products#${group.slug}`}
                  data-pressable
                  className="pressable inline-flex min-h-11 items-center rounded-lg border border-line bg-paper px-4 text-sm font-medium text-ink-soft hover:border-navy-200 hover:text-navy-800"
                >
                  {group.name}
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-8 text-center text-sm text-ink-muted">
            Still stuck? Call us on{" "}
            <a
              href={site.contact.phoneHref}
              className="font-medium text-navy-700 underline underline-offset-2"
            >
              {site.contact.phone}
            </a>
            .
          </p>
        </div>
      </Container>
    </section>
  );
}
