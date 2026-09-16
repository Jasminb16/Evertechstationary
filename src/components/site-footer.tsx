import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";

import { Logo } from "@/components/brand/logo";
import { Container } from "@/components/ui/container";
import { catalog } from "@/lib/catalog";
import { nav, site } from "@/lib/site";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-navy-900 text-navy-100">
      <Container size="wide" className="py-14 sm:py-16">
        <div className="grid gap-10 md:grid-cols-12 md:gap-8">
          {/* Brand + contact */}
          <div className="md:col-span-4">
            <Logo variant="light" />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-navy-200">
              {site.description}
            </p>

            <ul className="mt-6 space-y-3 text-sm">
              <li>
                <a
                  href={site.contact.phoneHref}
                  className="inline-flex items-start gap-2.5 text-navy-100 transition-colors duration-200 hover:text-white"
                >
                  <Phone size={16} aria-hidden className="mt-0.5 shrink-0 text-brass-400" />
                  {site.contact.phone}
                </a>
              </li>
              <li>
                <a
                  href={site.contact.emailHref}
                  className="inline-flex items-start gap-2.5 break-all text-navy-100 transition-colors duration-200 hover:text-white"
                >
                  <Mail size={16} aria-hidden className="mt-0.5 shrink-0 text-brass-400" />
                  {site.contact.email}
                </a>
              </li>
              <li className="flex items-start gap-2.5 text-navy-200">
                <MapPin size={16} aria-hidden className="mt-0.5 shrink-0 text-brass-400" />
                <span>
                  {site.address.lines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                  {site.address.city}, {site.address.country}
                </span>
              </li>
            </ul>
          </div>

          {/* Main links */}
          <nav aria-label="Footer" className="md:col-span-2">
            <h2 className="eyebrow text-brass-400">Site</h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-navy-200 transition-colors duration-200 hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Categories */}
          <div className="md:col-span-3">
            <h2 className="eyebrow text-brass-400">We supply</h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              {catalog.map((group) => (
                <li key={group.slug}>
                  <Link
                    href={`/products#${group.slug}`}
                    className="text-navy-200 transition-colors duration-200 hover:text-white"
                  >
                    {group.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Hours + social */}
          <div className="md:col-span-3">
            <h2 className="eyebrow text-brass-400">Opening hours</h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              {site.hours.map((entry) => (
                <li key={entry.days} className="flex justify-between gap-4">
                  <span className="text-navy-200">{entry.days}</span>
                  <span className="text-navy-100">{entry.time}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-navy-800 pt-7 text-sm text-navy-300 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.legalName}. All rights reserved.
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            <li>
              <Link href="/privacy" className="transition-colors duration-200 hover:text-white">
                Privacy policy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="transition-colors duration-200 hover:text-white">
                Terms &amp; conditions
              </Link>
            </li>
          </ul>
        </div>
      </Container>
    </footer>
  );
}
