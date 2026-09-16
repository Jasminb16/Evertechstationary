"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronDown, Menu, Phone, X } from "lucide-react";

import { Logo } from "@/components/brand/logo";
import { AccordionChevron, groupIcons } from "@/components/icons";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { catalog } from "@/lib/catalog";
import { cn } from "@/lib/cn";
import { nav, site } from "@/lib/site";

/** Reads a ms custom property off :root, with a fallback. */
function motionMs(name: string, fallback: number) {
  if (typeof window === "undefined") return fallback;
  const value = parseFloat(
    getComputedStyle(document.documentElement).getPropertyValue(name),
  );
  return Number.isFinite(value) ? value : fallback;
}

export function SiteHeader() {
  const pathname = usePathname();

  /**
   * Both menus record the route they were opened on, and "open" is derived by
   * comparing that against the current route. Navigating therefore closes them
   * for free — no effect watching `pathname` and calling setState, which would
   * render the header twice on every navigation.
   */
  const [mega, setMega] = useState({ open: false, path: pathname });
  const [drawer, setDrawer] = useState({ open: false, path: pathname });
  const menuOpen = mega.open && mega.path === pathname;
  const drawerOpen = drawer.open && drawer.path === pathname;

  const [scrolled, setScrolled] = useState(false);

  // transitions.dev menu dropdown (05) needs .is-closing to persist for the
  // close duration, otherwise the next open starts from the closing scale.
  const [closing, setClosing] = useState(false);
  const closeTimer = useRef<number | null>(null);
  const hoverTimer = useRef<number | null>(null);
  const megaRef = useRef<HTMLLIElement>(null);

  const openMega = useCallback(() => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    setClosing(false);
    setMega({ open: true, path: window.location.pathname });
  }, []);

  const closeMega = useCallback(() => {
    setMega((current) => {
      if (!current.open) return current;
      setClosing(true);
      if (closeTimer.current) window.clearTimeout(closeTimer.current);
      closeTimer.current = window.setTimeout(
        () => setClosing(false),
        motionMs("--dropdown-close-dur", 150),
      );
      return { ...current, open: false };
    });
  }, []);

  const setDrawerOpen = useCallback((open: boolean) => {
    setDrawer({ open, path: window.location.pathname });
  }, []);

  // Escape closes, and clicking outside the mega menu closes it.
  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      closeMega();
      setDrawerOpen(false);
    }
    function onPointerDown(event: PointerEvent) {
      if (!megaRef.current) return;
      if (!megaRef.current.contains(event.target as Node)) closeMega();
    }
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [closeMega, setDrawerOpen]);

  // Lock body scroll while the drawer is open.
  useEffect(() => {
    if (!drawerOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [drawerOpen]);

  // Elevate the header once the page has moved — a flat bar over scrolled
  // content reads as a rendering glitch.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    return () => {
      if (closeTimer.current) window.clearTimeout(closeTimer.current);
      if (hoverTimer.current) window.clearTimeout(hoverTimer.current);
    };
  }, []);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b bg-surface/85 backdrop-blur-md",
        "transition-[box-shadow,border-color] duration-300",
        scrolled ? "border-line shadow-card" : "border-transparent",
      )}
    >
      <Container size="wide">
        <div className="flex h-18 items-center justify-between gap-4 sm:h-20">
          <Logo />

          {/* ── Desktop nav ── */}
          <nav aria-label="Main" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {nav.map((item) => {
                if (!("hasMegaMenu" in item && item.hasMegaMenu)) {
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        data-pressable
                        aria-current={isActive(item.href) ? "page" : undefined}
                        className={cn(
                          "pressable inline-flex h-10 items-center rounded-lg px-3.5 text-[0.9375rem] font-medium",
                          isActive(item.href)
                            ? "bg-navy-50 text-navy-800"
                            : "text-ink-soft hover:bg-navy-50 hover:text-navy-800",
                        )}
                      >
                        {item.label}
                      </Link>
                    </li>
                  );
                }

                return (
                  <li
                    key={item.href}
                    ref={megaRef}
                    className="relative"
                    onPointerEnter={(event) => {
                      if (event.pointerType !== "mouse") return;
                      if (hoverTimer.current)
                        window.clearTimeout(hoverTimer.current);
                      openMega();
                    }}
                    onPointerLeave={(event) => {
                      if (event.pointerType !== "mouse") return;
                      // Small grace period so a diagonal mouse path to the
                      // panel doesn't snap the menu shut.
                      hoverTimer.current = window.setTimeout(closeMega, 120);
                    }}
                  >
                    <button
                      type="button"
                      aria-expanded={menuOpen}
                      aria-haspopup="true"
                      onClick={() => (menuOpen ? closeMega() : openMega())}
                      className={cn(
                        "pressable inline-flex h-10 items-center gap-1.5 rounded-lg px-3.5 text-[0.9375rem] font-medium",
                        isActive(item.href) || menuOpen
                          ? "bg-navy-50 text-navy-800"
                          : "text-ink-soft hover:bg-navy-50 hover:text-navy-800",
                      )}
                    >
                      {item.label}
                      <ChevronDown
                        size={15}
                        aria-hidden
                        className={cn(
                          "transition-transform duration-250 ease-[cubic-bezier(0.22,1,0.36,1)]",
                          menuOpen && "rotate-180",
                        )}
                      />
                    </button>

                    <MegaMenu open={menuOpen} closing={closing} />
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            {/* Responsive display lives on these wrappers, not on the buttons.
                ButtonLink's base class sets `inline-flex`, which Tailwind emits
                after `hidden` — so `hidden` on the button itself loses and the
                desktop CTAs stayed laid out at mobile width, pushing the menu
                button off-screen. */}
            <span className="hidden sm:inline-flex">
              <ButtonLink
                href={site.contact.phoneHref}
                variant="secondary"
                size="sm"
              >
                <Phone size={15} aria-hidden />
                <span className="hidden xl:inline">{site.contact.phone}</span>
                <span className="xl:hidden">Call us</span>
              </ButtonLink>
            </span>

            <span className="hidden lg:inline-flex">
              <ButtonLink href="/contact" size="sm">
                Request a quote
              </ButtonLink>
            </span>

            {/* transitions.dev icon swap (09) — hamburger ↔ close */}
            <button
              type="button"
              onClick={() => setDrawerOpen(!drawerOpen)}
              aria-expanded={drawerOpen}
              aria-controls="mobile-nav"
              aria-label={drawerOpen ? "Close menu" : "Open menu"}
              className="pressable -mr-1 inline-flex h-11 w-11 items-center justify-center rounded-lg text-navy-800 hover:bg-navy-50 lg:hidden"
            >
              <span
                className="t-icon-swap"
                data-state={drawerOpen ? "b" : "a"}
                aria-hidden
              >
                <span className="t-icon" data-icon="a">
                  <Menu size={22} />
                </span>
                <span className="t-icon" data-icon="b">
                  <X size={22} />
                </span>
              </span>
            </button>
          </div>
        </div>
      </Container>

      <MobileDrawer
        open={drawerOpen}
        pathname={pathname}
        onNavigate={() => setDrawerOpen(false)}
      />
    </header>
  );
}

/* ─────────────────────────────────────────────────────────────────────────── */

function MegaMenu({ open, closing }: { open: boolean; closing: boolean }) {
  return (
    // The wrapper starts at top-full and carries the 8px gap as padding, so
    // the pointer never crosses dead space between the trigger and the panel
    // on its way down — without that bridge the close timer fires mid-reach.
    <div
      className={cn(
        "t-dropdown absolute left-1/2 top-full z-50 w-[min(74rem,calc(100vw-3rem))] -translate-x-1/2 pt-2",
        open && "is-open",
        closing && "is-closing",
      )}
      data-origin="top-center"
      // Keep it out of the tab order and the a11y tree while shut.
      {...(open ? {} : { inert: "" as unknown as boolean })}
    >
      <div className="rounded-2xl border border-line bg-surface p-6 shadow-menu">
        <div className="grid grid-cols-4 gap-x-6 gap-y-7">
          {catalog.map((group) => {
            const Icon = groupIcons[group.icon];
            return (
              <div key={group.slug}>
                <Link
                  href={`/products#${group.slug}`}
                  className="group mb-3 flex items-center gap-2"
                >
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-navy-50 text-navy-700">
                    <Icon size={15} aria-hidden />
                  </span>
                  <span className="text-[0.9375rem] font-semibold text-ink group-hover:text-navy-700">
                    {group.name}
                  </span>
                </Link>
                <ul className="space-y-0.5">
                  {group.categories.slice(0, 6).map((category) => (
                    <li key={category.slug}>
                      <Link
                        href={`/products#${group.slug}`}
                        className="block rounded-md px-2 py-1 text-sm text-ink-muted transition-colors duration-200 hover:bg-navy-50 hover:text-navy-800"
                      >
                        {category.name}
                      </Link>
                    </li>
                  ))}
                  {group.categories.length > 6 ? (
                    <li>
                      <Link
                        href={`/products#${group.slug}`}
                        className="block rounded-md px-2 py-1 text-sm font-medium text-navy-600 transition-colors duration-200 hover:bg-navy-50"
                      >
                        +{group.categories.length - 6} more
                      </Link>
                    </li>
                  ) : null}
                </ul>
              </div>
            );
          })}
        </div>

        <div className="mt-6 flex items-center justify-between gap-4 border-t border-line pt-5">
          <p className="text-sm text-ink-muted">
            Can&apos;t find it? We source specialist lines on request.
          </p>
          <ButtonLink href="/products" variant="secondary" size="sm">
            Browse all categories
          </ButtonLink>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────── */

function MobileDrawer({
  open,
  pathname,
  onNavigate,
}: {
  open: boolean;
  pathname: string;
  onNavigate: () => void;
}) {
  const [openGroup, setOpenGroup] = useState<string | null>(null);

  return (
    <div
      id="mobile-nav"
      // transitions.dev panel reveal (07). Travel is set to a fraction of the
      // panel height so the slide reads as a full open without a long throw.
      className="t-panel-slide absolute inset-x-0 top-full max-h-[calc(100dvh-4.5rem)] overflow-y-auto overscroll-contain border-b border-line bg-surface shadow-menu lg:hidden"
      data-open={String(open)}
      style={{ "--panel-translate-y": "-24px" } as React.CSSProperties}
      {...(open ? {} : { inert: "" as unknown as boolean })}
    >
      <Container className="py-5">
        <ul className="space-y-1">
          {nav.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);

            if (!("hasMegaMenu" in item && item.hasMegaMenu)) {
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={onNavigate}
                    data-pressable
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "pressable flex min-h-12 items-center rounded-lg px-3 text-base font-medium",
                      active
                        ? "bg-navy-50 text-navy-800"
                        : "text-ink-soft hover:bg-navy-50",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            }

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={onNavigate}
                  className={cn(
                    "pressable flex min-h-12 items-center rounded-lg px-3 text-base font-medium",
                    active ? "bg-navy-50 text-navy-800" : "text-ink-soft",
                  )}
                >
                  {item.label}
                </Link>

                {/* transitions.dev accordion (21) per category group */}
                <ul className="mt-1 space-y-0.5 pl-1">
                  {catalog.map((group) => {
                    const Icon = groupIcons[group.icon];
                    const isOpen = openGroup === group.slug;
                    return (
                      <li
                        key={group.slug}
                        className="t-acc"
                        data-open={String(isOpen)}
                      >
                        <button
                          type="button"
                          className="t-acc-head flex min-h-11 w-full items-center gap-2.5 rounded-lg px-3 text-left text-[0.9375rem] text-ink-soft hover:bg-navy-50"
                          aria-expanded={isOpen}
                          onClick={() =>
                            setOpenGroup(isOpen ? null : group.slug)
                          }
                        >
                          <Icon
                            size={15}
                            aria-hidden
                            className="text-navy-600"
                          />
                          <span className="flex-1">{group.name}</span>
                          <AccordionChevron />
                        </button>
                        <div className="t-acc-panel">
                          <div className="t-acc-panel-inner">
                            <ul className="space-y-0.5 py-1 pl-10 pr-3">
                              {group.categories.map((category) => (
                                <li key={category.slug}>
                                  <Link
                                    href={`/products#${group.slug}`}
                                    onClick={onNavigate}
                                    className="block rounded-md py-2 text-sm text-ink-muted hover:text-navy-800"
                                  >
                                    {category.name}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </li>
            );
          })}
        </ul>

        <div className="mt-5 grid gap-2.5 border-t border-line pt-5">
          <ButtonLink href="/contact" onClick={onNavigate} size="lg">
            Request a quote
          </ButtonLink>
          <ButtonLink
            href={site.contact.phoneHref}
            variant="secondary"
            size="lg"
          >
            <Phone size={16} aria-hidden />
            {site.contact.phone}
          </ButtonLink>
        </div>
      </Container>
    </div>
  );
}
