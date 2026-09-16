import type { Metadata } from "next";
import Link from "next/link";

import { PageHeader } from "@/components/page-header";
import { Container } from "@/components/ui/container";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: `The terms governing use of the ${site.legalName} website and the supply of goods.`,
  alternates: { canonical: "/terms" },
};

/**
 * ⚠️ NOT LEGAL ADVICE. A reasonable starting draft for a B2B supplier that
 * quotes rather than sells online. It must be reviewed by a qualified adviser
 * and every ⟨bracketed⟩ value filled in before the site goes live — the
 * payment, delivery and returns terms in particular have to match what the
 * business actually does.
 */
const LAST_UPDATED = "16 September 2026";

export default function TermsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Legal"
        title="Terms & conditions"
        lead={`The terms on which ${site.legalName} provides this website and supplies goods to business customers.`}
      />

      <section className="bg-surface py-14 sm:py-16">
        <Container size="narrow">
          <p className="text-sm text-ink-muted">Last updated: {LAST_UPDATED}</p>

          <div className="mt-8 space-y-10">
            <Block title="1. About these terms">
              <p>
                These terms apply to your use of {site.url} and to any goods we
                supply to you. By using the site you accept them. If you do not
                accept them, please do not use the site.
              </p>
              <p className="rounded-lg border border-brass-200 bg-brass-50 px-4 py-3 text-sm">
                <strong>To complete before launch:</strong> registered company
                name, trade licence number, registered address, and the
                jurisdiction whose law governs these terms.
              </p>
            </Block>

            <Block title="2. The website">
              <p>
                We try to keep the site accurate and available, but we do not
                guarantee it will be uninterrupted or error-free. We may change
                or withdraw any part of it without notice.
              </p>
              <p>
                Product descriptions, specifications, categories and images on
                this site are for general guidance. They are not an offer to
                sell, and they may not reflect current stock. Manufacturers
                change specifications and packaging without notice.
              </p>
            </Block>

            <Block title="3. Quotes and orders">
              <p>
                Nothing on this site can be bought directly. Prices are given by
                written quotation because business pricing depends on volume and
                delivery arrangements.
              </p>
              <p>
                A quotation is an invitation to order, not a binding offer, and
                is valid for the period stated on it (or ⟨30⟩ days if no period
                is stated). A contract is formed only when we confirm your order
                in writing. We may decline an order, for example where an item
                is out of stock or a price was stated in error.
              </p>
            </Block>

            <Block title="4. Prices and payment">
              <p>
                Prices are quoted in ⟨currency⟩ and are exclusive of ⟨VAT / tax⟩
                unless the quotation says otherwise. Payment terms are as stated
                on the quotation or on your account — ⟨for example, 30 days from
                invoice date⟩.
              </p>
              <p>
                We may charge interest on overdue amounts at ⟨rate⟩ and may
                suspend deliveries while an account is in arrears.
              </p>
            </Block>

            <Block title="5. Delivery">
              <p>
                Delivery is free on business orders within ⟨delivery area⟩ above
                ⟨minimum order value⟩. Orders for stocked items placed before
                2 pm on a working day are normally dispatched the same day.
              </p>
              <p>
                Delivery dates are estimates given in good faith, not guarantees.
                We are not liable for delay caused by events outside our
                reasonable control. Risk in the goods passes to you on delivery;
                ownership passes when we have been paid in full.
              </p>
            </Block>

            <Block title="6. Shortages, damage and returns">
              <p>
                Please check deliveries on arrival. Shortages, incorrect items or
                damage in transit must be reported within ⟨3⟩ working days of
                delivery so we can put it right.
              </p>
              <p>
                Unused goods in their original, unopened packaging may be
                returned within ⟨14⟩ days of delivery, subject to our agreement.
                Special-order, custom-printed and bespoke items are not
                returnable unless faulty. Faulty goods are replaced or credited.
              </p>
            </Block>

            <Block title="7. Our liability">
              <p>
                Nothing in these terms excludes liability that cannot lawfully be
                excluded — including for death or personal injury caused by our
                negligence, or for fraud.
              </p>
              <p>
                Subject to that, we are not liable for loss of profit, loss of
                business, loss of contracts or any indirect or consequential
                loss, and our total liability in connection with any order is
                limited to the price paid for the goods giving rise to the
                claim. These terms apply to business customers; nothing here
                affects the statutory rights of a consumer.
              </p>
            </Block>

            <Block title="8. Intellectual property">
              <p>
                The content, design and code of this site belong to us or our
                licensors. You may view and print pages for your own business
                use. You may not copy, republish or reuse any part of the site
                commercially without our written permission. Third-party brand
                names and trade marks referred to on this site belong to their
                respective owners.
              </p>
            </Block>

            <Block title="9. Privacy">
              <p>
                We handle personal information as described in our{" "}
                <Link href="/privacy">privacy policy</Link>.
              </p>
            </Block>

            <Block title="10. Changes, law and contact">
              <p>
                We may update these terms; the version in force is the one
                published here on the date your order is confirmed. These terms
                are governed by the laws of ⟨jurisdiction⟩ and the courts of
                ⟨jurisdiction⟩ have exclusive jurisdiction.
              </p>
              <p>
                Questions about these terms:{" "}
                <a href={site.contact.emailHref}>{site.contact.email}</a> or{" "}
                <a href={site.contact.phoneHref}>{site.contact.phone}</a>.
              </p>
            </Block>
          </div>
        </Container>
      </section>
    </>
  );
}

function Block({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2 className="font-serif text-xl font-semibold text-ink sm:text-2xl">
        {title}
      </h2>
      <div className="mt-3 space-y-4 text-[0.9375rem] leading-relaxed text-ink-soft [&_a]:font-medium [&_a]:text-navy-700 [&_a]:underline [&_a]:underline-offset-2">
        {children}
      </div>
    </section>
  );
}
