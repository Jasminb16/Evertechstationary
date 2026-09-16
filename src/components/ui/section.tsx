import { cn } from "@/lib/cn";

import { Container } from "./container";
import { Reveal } from "./reveal";

export function Section({
  id,
  className,
  tone = "paper",
  size = "default",
  children,
}: {
  id?: string;
  className?: string;
  tone?: "paper" | "surface" | "navy" | "warm";
  size?: "default" | "narrow" | "wide";
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className={cn(
        "py-16 sm:py-20 lg:py-24",
        tone === "paper" && "bg-paper",
        tone === "surface" && "bg-surface",
        tone === "warm" && "bg-paper-warm",
        tone === "navy" && "bg-navy-900 text-navy-100",
        className,
      )}
    >
      <Container size={size}>{children}</Container>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  lead,
  align = "left",
  tone = "light",
  className,
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
  align?: "left" | "center";
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <Reveal
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow ? (
        <p
          className={cn(
            "eyebrow mb-3",
            tone === "light" ? "text-navy-600" : "text-brass-400",
          )}
        >
          {eyebrow}
        </p>
      ) : null}
      <h2
        className={cn(
          "text-3xl leading-[1.15] font-semibold sm:text-4xl lg:text-[2.75rem]",
          tone === "light" ? "text-ink" : "text-white",
        )}
      >
        {title}
      </h2>
      {lead ? (
        <p
          className={cn(
            "mt-4 text-base leading-relaxed sm:text-lg",
            tone === "light" ? "text-ink-muted" : "text-navy-200",
          )}
        >
          {lead}
        </p>
      ) : null}
    </Reveal>
  );
}
