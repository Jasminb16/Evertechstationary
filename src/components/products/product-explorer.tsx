"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Search, X } from "lucide-react";

import { groupIcons } from "@/components/icons";
import { catalog } from "@/lib/catalog";
import { cn } from "@/lib/cn";

const ALL = "all";

/**
 * Category browser.
 *
 * The filter bar is the transitions.dev sliding tabs snippet (16): JS writes the
 * active tab's offsetLeft / offsetWidth onto the pill and CSS owns the tween.
 * Per the snippet notes, the first paint and every resize write those values
 * with the transition suspended, so the pill never animates in from zero width.
 *
 * Filtering is client-side over a static list — no network, no loading state.
 */
export function ProductExplorer() {
  const [active, setActive] = useState<string>(ALL);
  const [query, setQuery] = useState("");

  const barRef = useRef<HTMLDivElement>(null);
  const pillRef = useRef<HTMLSpanElement>(null);
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  function moveTo(key: string, animate: boolean) {
    const pill = pillRef.current;
    const tab = tabRefs.current[key];
    if (!pill || !tab) return;

    if (!animate) {
      const previous = pill.style.transition;
      pill.style.transition = "none";
      pill.style.transform = `translateX(${tab.offsetLeft}px)`;
      pill.style.width = `${tab.offsetWidth}px`;
      void pill.offsetWidth;
      pill.style.transition = previous;
    } else {
      pill.style.transform = `translateX(${tab.offsetLeft}px)`;
      pill.style.width = `${tab.offsetWidth}px`;
    }
  }

  // First paint + resize: position without animating.
  useEffect(() => {
    const frame = requestAnimationFrame(() => moveTo(active, false));
    const onResize = () => moveTo(active, false);
    window.addEventListener("resize", onResize);

    // Web fonts change the tab widths when they swap in, which would leave the
    // pill sized for the fallback face. Re-measure once they've settled.
    document.fonts?.ready.then(() => moveTo(active, false));

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", onResize);
    };
  }, [active]);

  const normalised = query.trim().toLowerCase();

  const visible = useMemo(() => {
    return catalog
      .filter((group) => active === ALL || group.slug === active)
      .map((group) => ({
        ...group,
        categories: normalised
          ? group.categories.filter(
              (category) =>
                category.name.toLowerCase().includes(normalised) ||
                category.blurb.toLowerCase().includes(normalised),
            )
          : group.categories,
      }))
      .filter((group) => group.categories.length > 0);
  }, [active, normalised]);

  const resultCount = visible.reduce(
    (total, group) => total + group.categories.length,
    0,
  );

  return (
    <div>
      {/* ── Controls ── */}
      <div className="sticky top-18 z-30 -mx-5 mb-10 border-b border-line bg-paper/90 px-5 py-4 backdrop-blur-md sm:top-20 sm:-mx-8 sm:px-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          {/* The bar scrolls rather than wraps, because the sliding pill is
              positioned on a single row. The mask fades the right edge so an
              overflowing bar reads as scrollable instead of cut off. */}
          <div
            ref={barRef}
            role="tablist"
            aria-label="Filter by product group"
            className="t-tabs max-w-full overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden [mask-image:linear-gradient(to_right,black_calc(100%-2.5rem),transparent)] lg:[mask-image:none]"
          >
            <span ref={pillRef} className="t-tabs-pill" aria-hidden="true" />
            <button
              type="button"
              role="tab"
              aria-selected={active === ALL}
              ref={(node) => {
                tabRefs.current[ALL] = node;
              }}
              onClick={() => {
                setActive(ALL);
                moveTo(ALL, true);
              }}
              className="t-tab shrink-0 text-sm font-medium"
            >
              All
            </button>
            {catalog.map((group) => (
              <button
                key={group.slug}
                type="button"
                role="tab"
                aria-selected={active === group.slug}
                ref={(node) => {
                  tabRefs.current[group.slug] = node;
                }}
                onClick={() => {
                  setActive(group.slug);
                  moveTo(group.slug, true);
                }}
                className="t-tab shrink-0 text-sm font-medium"
              >
                {group.shortName}
              </button>
            ))}
          </div>

          <div className="relative lg:w-72">
            <Search
              size={16}
              aria-hidden
              className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-muted"
            />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search categories…"
              aria-label="Search product categories"
              // 16px font size stops iOS Safari zooming the page on focus.
              className="h-11 w-full rounded-lg border border-line-strong bg-surface pl-10 pr-10 text-base text-ink placeholder:text-ink-muted focus:border-navy-400 focus:outline-none"
            />
            {query ? (
              <button
                type="button"
                onClick={() => setQuery("")}
                aria-label="Clear search"
                className="pressable absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-md text-ink-muted hover:bg-paper hover:text-ink"
              >
                <X size={15} aria-hidden />
              </button>
            ) : null}
          </div>
        </div>
      </div>

      <p className="sr-only" role="status" aria-live="polite">
        {resultCount} categories shown
      </p>

      {/* ── Results ── */}
      {visible.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-line-strong bg-surface px-6 py-16 text-center">
          <p className="font-serif text-xl font-semibold text-ink">
            Nothing matches “{query}”
          </p>
          <p className="mx-auto mt-2 max-w-md text-[0.9375rem] text-ink-muted">
            We stock well beyond what&apos;s listed here and source specialist
            lines on request — tell us what you need and we&apos;ll quote it.
          </p>
        </div>
      ) : (
        <div className="space-y-14">
          {visible.map((group) => {
            const Icon = groupIcons[group.icon];
            return (
              <section key={group.slug} id={group.slug} className="scroll-mt-44">
                <div className="mb-6 flex items-start gap-3.5 border-b border-line pb-5">
                  <span className="mt-0.5 inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-navy-800 text-white">
                    <Icon size={20} aria-hidden />
                  </span>
                  <div>
                    <h2 className="font-serif text-2xl leading-snug font-semibold text-ink">
                      {group.name}
                    </h2>
                    <p className="mt-1 text-[0.9375rem] text-ink-muted">
                      {group.summary}
                    </p>
                  </div>
                </div>

                <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {group.categories.map((category) => (
                    <li
                      key={category.slug}
                      className={cn(
                        "rounded-xl border border-line bg-surface p-5 shadow-card",
                        "transition-[border-color,box-shadow] duration-250 ease-[cubic-bezier(0.22,1,0.36,1)]",
                        "hover:border-navy-200 hover:shadow-lift",
                      )}
                    >
                      <h3 className="text-[0.9375rem] font-semibold text-ink">
                        {category.name}
                      </h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">
                        {category.blurb}
                      </p>
                    </li>
                  ))}
                </ul>
              </section>
            );
          })}
        </div>
      )}
    </div>
  );
}
