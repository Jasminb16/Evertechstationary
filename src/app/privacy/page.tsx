import type { Metadata } from "next";
import Link from "next/link";

import { PageHeader } from "@/components/page-header";
import { Container } from "@/components/ui/container";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${site.legalName} collects, uses and protects personal information submitted through this website.`,
  alternates: { canonical: "/privacy" },
  robots: { index: true, follow: true },
};

/**
 * ⚠️ NOT LEGAL ADVICE. This is an accurate description of what the site as
 * built actually does, which is the hard part — but it has not been reviewed
 * by a lawyer and does not cover obligations outside the website (CCTV,
 * employee records, CRM, marketing lists). Have a qualified adviser check it
 * against the jurisdictions the business operates in before launch, and fill
 * in every ⟨bracketed⟩ value.
 */
const LAST_UPDATED = "16 September 2026";

export default function PrivacyPage() {
  return (
    <>
      <PageHeader
        eyebrow="Legal"
        title="Privacy policy"
        lead={`How ${site.legalName} handles personal information collected through this website.`}
      />

      <section className="bg-surface py-14 sm:py-16">
        <Container size="narrow">
          <p className="text-sm text-ink-muted">Last updated: {LAST_UPDATED}</p>

          <div className="prose-evertech mt-8 space-y-10">
            <Block title="Who we are">
              <p>
                {site.legalName} (&ldquo;we&rdquo;, &ldquo;us&rdquo;) operates{" "}
                {site.url}. For any question about this policy or about the
                information we hold, contact us at{" "}
                <a href={site.contact.emailHref}>{site.contact.email}</a> or{" "}
                <a href={site.contact.phoneHref}>{site.contact.phone}</a>.
              </p>
              <p className="rounded-lg border border-brass-200 bg-brass-50 px-4 py-3 text-sm">
                <strong>To complete before launch:</strong> registered company
                name, trade licence number, registered address, and the name and
                contact details of the person responsible for data protection.
              </p>
            </Block>

            <Block title="What we collect">
              <p>
                <strong>Information you give us.</strong> When you submit the
                enquiry form we collect your name, company, email address,
                phone number (if you provide one) and the contents of your
                message. Nothing on this site asks for payment details,
                government identification or any special-category information,
                and you should not send them to us through it.
              </p>
              <p>
                <strong>Information collected automatically.</strong> Our
                hosting provider records standard server logs (IP address,
                browser user-agent, requested URL and timestamp) which are used
                to keep the site available and to rate-limit abuse of the
                enquiry form.
              </p>
              <p>
                <strong>Analytics.</strong> If you accept analytics cookies, a
                third-party analytics service records anonymised, aggregated
                information about which pages are visited. If you decline, or
                ignore the banner, no analytics script is loaded and no
                analytics cookie is set.
              </p>
            </Block>

            <Block title="Why we use it">
              <ul>
                <li>To answer your enquiry and prepare a quote.</li>
                <li>
                  To manage your account with us, if you go on to become a
                  customer.
                </li>
                <li>
                  To keep the site secure, available and free of automated
                  abuse.
                </li>
                <li>
                  With your consent, to understand which parts of the site are
                  useful so we can improve them.
                </li>
              </ul>
              <p>
                We do not sell personal information, and we do not use enquiry
                details to send marketing you did not ask for.
              </p>
            </Block>

            <Block title="Cookies">
              <p>
                This site sets no cookies of its own. The only cookies that can
                be set are analytics cookies, and only after you press
                &ldquo;Accept&rdquo; on the banner. Your choice is stored in
                your browser&rsquo;s local storage, not in a cookie, so that
                we do not ask again on every page.
              </p>
              <p>
                Fonts are served from our own domain rather than a third-party
                font service, so loading a page does not disclose your IP
                address to a font provider. The map on the contact page is
                embedded from Google Maps and loads only when you scroll to it;
                Google may set its own cookies at that point, under{" "}
                <a
                  href="https://policies.google.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Google&rsquo;s privacy policy
                </a>
                .
              </p>
            </Block>

            <Block title="Who we share it with">
              <p>
                Enquiry details are visible to our own staff and to the service
                providers that operate this site on our behalf: our hosting
                provider and our email provider. They act on our instructions
                and may not use your information for their own purposes. We
                disclose information to anyone else only where the law requires
                it.
              </p>
              <p className="rounded-lg border border-brass-200 bg-brass-50 px-4 py-3 text-sm">
                <strong>To complete before launch:</strong> name the actual
                hosting and email providers, and say whether any data is stored
                or processed outside the country of operation.
              </p>
            </Block>

            <Block title="How long we keep it">
              <p>
                Enquiries that do not become orders are kept for up to 24 months
                so we can pick up a conversation if you come back to us, then
                deleted. Records relating to actual orders are kept for as long
                as accounting and tax law requires. Server logs are retained for
                a short rolling period by our hosting provider.
              </p>
            </Block>

            <Block title="Your rights">
              <p>
                You can ask us for a copy of the information we hold about you,
                ask us to correct it if it is wrong, ask us to delete it, or
                withdraw your consent to analytics at any time (clear this
                site&rsquo;s data in your browser and the banner will ask
                again). Email{" "}
                <a href={site.contact.emailHref}>{site.contact.email}</a> and we
                will respond within 30 days.
              </p>
            </Block>

            <Block title="Security">
              <p>
                The site is served over HTTPS and the enquiry form is
                rate-limited and protected against automated submissions. No
                system is perfectly secure, but we take reasonable technical and
                organisational measures to protect the information you send us.
              </p>
            </Block>

            <Block title="Changes to this policy">
              <p>
                If we change how we handle personal information we will update
                this page and revise the date at the top. Material changes will
                be flagged on the site.
              </p>
            </Block>

            <Block title="Contact">
              <p>
                Questions, requests or complaints:{" "}
                <a href={site.contact.emailHref}>{site.contact.email}</a>, or
                write to us at {site.address.lines.join(", ")},{" "}
                {site.address.city}, {site.address.country}.
              </p>
              <p>
                See also our{" "}
                <Link href="/terms">terms &amp; conditions</Link>.
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
      <div className="mt-3 space-y-4 text-[0.9375rem] leading-relaxed text-ink-soft">
        {children}
      </div>
    </section>
  );
}
