"use client";

import { useEffect, useRef } from "react";

import { cn } from "@/lib/cn";

/**
 * Fades content up as it scrolls into view.
 *
 * Content renders visible by default. The hidden state is applied imperatively
 * after mount, so the page is fully readable with JavaScript disabled or still
 * loading — no blank sections, ever.
 *
 * The attributes are set on the DOM node rather than held in React state: the
 * effect is synchronising with an external system (the viewport, via
 * IntersectionObserver) and nothing else in the tree needs to re-render when
 * an element becomes visible. That also avoids the cascading render a
 * setState-per-element would cause on a page with thirty of these.
 *
 * Stagger is capped at 6 — past that a long grid animates for over a second
 * and the page feels slow rather than lively.
 */
export function Reveal({
  children,
  delay = 0,
  className,
  as: Tag = "div",
}: {
  children: React.ReactNode;
  /** Index in a group; multiplied by 60ms and capped at 6. */
  delay?: number;
  className?: string;
  as?: "div" | "li" | "section" | "article";
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // No observer, or the visitor has asked for less motion: leave the element
    // in its natural visible state and do nothing.
    if (
      typeof IntersectionObserver === "undefined" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    node.setAttribute("data-reveal", "");
    node.setAttribute("data-shown", "false");

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        node.setAttribute("data-shown", "true");
        observer.disconnect();
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.05 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref as never}
      className={cn(className)}
      style={
        { "--reveal-delay": `${Math.min(delay, 6) * 60}ms` } as React.CSSProperties
      }
    >
      {children}
    </Tag>
  );
}
