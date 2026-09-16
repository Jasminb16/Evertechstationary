import {
  Archive,
  Boxes,
  FolderOpen,
  Monitor,
  Package,
  PenLine,
  Presentation,
  Printer,
  type LucideIcon,
} from "lucide-react";

import type { IconName } from "@/lib/catalog";

export const groupIcons: Record<IconName, LucideIcon> = {
  filing: FolderOpen,
  paper: Printer,
  writing: PenLine,
  desk: Archive,
  machines: Monitor,
  boards: Presentation,
  packing: Package,
  identity: Boxes,
};

/**
 * Chevron for the transitions.dev "learn more hover" snippet. The two arms are
 * separate paths so they can rotate apart about the apex at (10, 8).
 */
export function LearnChevron({ className }: { className?: string }) {
  return (
    <span className={`t-learn-chevron ${className ?? ""}`}>
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        aria-hidden="true"
      >
        <path className="t-learn-arm t-learn-arm-top" d="M6 4L10 8" />
        <path className="t-learn-arm t-learn-arm-bot" d="M10 8L6 12" />
      </svg>
    </span>
  );
}

/**
 * Accordion chevron. The path is symmetric about the viewBox centre so the
 * scaleY(-1) flip lands exactly on the "^" — see the accordion snippet notes.
 */
export function AccordionChevron() {
  return (
    <span className="t-acc-chevron">
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M4 6.5L8 10.5L12 6.5" />
      </svg>
    </span>
  );
}
