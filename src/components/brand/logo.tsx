import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/cn";
import { site } from "@/lib/site";

import logoDark from "../../../public/brand/logo.png";
import logoLight from "../../../public/brand/logo-light.png";

/**
 * Brand lockup: the supplied ET monogram plus the typeset company name.
 *
 * The monogram carries the name inside it, but at header size that text is
 * only a few pixels tall and unreadable — so the name is set alongside it.
 * The image is marked decorative (empty alt) because the adjacent text already
 * announces the brand; duplicating it would make screen readers say it twice.
 */
export function Logo({
  variant = "dark",
  className,
  href = "/",
}: {
  variant?: "dark" | "light";
  className?: string;
  href?: string | null;
}) {
  const content = (
    <span className={cn("inline-flex items-center gap-2.5 sm:gap-3", className)}>
      <Image
        src={variant === "dark" ? logoDark : logoLight}
        alt=""
        aria-hidden
        priority
        className="h-10 w-auto sm:h-11"
        sizes="52px"
      />
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-serif text-[1.3rem] leading-none font-semibold tracking-tight sm:text-[1.4rem]",
            variant === "dark" ? "text-navy-800" : "text-white",
          )}
        >
          Evertech
        </span>
        <span
          className={cn(
            "eyebrow mt-1 text-[0.5625rem] sm:text-[0.625rem]",
            variant === "dark" ? "text-ink-muted" : "text-navy-200",
          )}
        >
          Stationery
        </span>
      </span>
    </span>
  );

  if (!href) return content;

  return (
    <Link
      href={href}
      aria-label={`${site.legalName} — home`}
      className="pressable rounded-lg"
      data-pressable
    >
      {content}
    </Link>
  );
}
