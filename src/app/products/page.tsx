import type { Metadata } from "next";

import { PageHeader } from "@/components/page-header";
import { ProductExplorer } from "@/components/products/product-explorer";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";

import { catalog, categoryCount } from "@/lib/catalog";
import { ogImage, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Products",
  description: `Browse ${categoryCount} categories of office stationery from ${site.legalName} — filing, paper and print, writing, desk essentials, office machines, boards, packing and ID.`,
  alternates: { canonical: "/products" },
  openGraph: {
    title: `Products · ${site.name}`,
    description: `${categoryCount} categories of office stationery, held in stock.`,
    url: "/products",
    images: [ogImage],
  },
};

export default function ProductsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Our range"
        title="Office stationery, A to Z"
        lead={`${categoryCount} categories across ${catalog.length} groups. This is the working catalogue, not a highlights reel — and if something isn't listed, we'll source it.`}
      />

      {/* Less top padding than a standard Section: the filter bar is sticky and
          needs to sit close under the page header, not float in whitespace. */}
      <section className="bg-paper pb-16 pt-6 sm:pb-20 sm:pt-8 lg:pb-24">
        <Container size="wide">
          <ProductExplorer />
        </Container>
      </section>

      <section className="bg-navy-900 py-16 text-navy-100 sm:py-20">
        <Container size="default">
          <Reveal className="text-center">
            <h2 className="font-serif text-3xl leading-tight font-semibold text-white sm:text-4xl">
              Send us your list and we&apos;ll price it
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-navy-200 sm:text-lg">
              No prices are published here because business pricing depends on
              volume. Tell us what you get through and you&apos;ll have a
              line-by-line quote, usually the same working day.
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
