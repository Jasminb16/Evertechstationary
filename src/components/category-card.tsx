import Link from "next/link";

import { groupIcons, LearnChevron } from "@/components/icons";
import type { CategoryGroup } from "@/lib/catalog";
import { cn } from "@/lib/cn";

/**
 * Card for a product group.
 *
 * `.t-learn` drives the transitions.dev learn-more-hover chevron (24). The
 * whole card is the link target via the stretched-link pattern, so the hit area
 * is the card, not just the text.
 */
export function CategoryCard({
  group,
  className,
}: {
  group: CategoryGroup;
  className?: string;
}) {
  const Icon = groupIcons[group.icon];

  return (
    <article
      className={cn(
        "t-learn group relative flex h-full flex-col rounded-2xl border border-line bg-surface p-6 shadow-card",
        "transition-[border-color,box-shadow,transform] duration-250 ease-[cubic-bezier(0.22,1,0.36,1)]",
        "hover:border-navy-200 hover:shadow-lift focus-within:border-navy-300",
        // Lift only where a real cursor exists — on touch it just sticks.
        "[@media(hover:hover)_and_(pointer:fine)]:hover:-translate-y-0.5",
        className,
      )}
    >
      <span className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-navy-50 text-navy-700 transition-colors duration-250 group-hover:bg-navy-800 group-hover:text-white">
        <Icon size={20} aria-hidden />
      </span>

      <h3 className="font-serif text-xl leading-snug font-semibold text-ink">
        <Link
          href={`/products#${group.slug}`}
          className="after:absolute after:inset-0 after:rounded-2xl after:content-['']"
        >
          {group.name}
        </Link>
      </h3>

      <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-muted">
        {group.summary}
      </p>

      <ul className="mt-4 flex flex-wrap gap-1.5">
        {group.categories.slice(0, 4).map((category) => (
          <li
            key={category.slug}
            className="rounded-md bg-paper px-2 py-1 text-xs text-ink-muted"
          >
            {category.name}
          </li>
        ))}
        {group.categories.length > 4 ? (
          <li className="rounded-md bg-paper px-2 py-1 text-xs text-ink-muted">
            +{group.categories.length - 4}
          </li>
        ) : null}
      </ul>

      <p className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-navy-700">
        View the range
        <LearnChevron />
      </p>
    </article>
  );
}
