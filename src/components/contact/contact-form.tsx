"use client";

import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";
import {
  LIMITS,
  validate,
  type Errors,
  type FieldName,
} from "@/lib/contact-schema";

type Status = "idle" | "submitting" | "sent" | "failed";

const FIELDS: {
  name: FieldName;
  label: string;
  type: string;
  required: boolean;
  autoComplete: string;
  placeholder?: string;
  inputMode?: "text" | "email" | "tel";
}[] = [
  { name: "name", label: "Your name", type: "text", required: true, autoComplete: "name" },
  { name: "company", label: "Company", type: "text", required: false, autoComplete: "organization" },
  { name: "email", label: "Email", type: "email", required: true, autoComplete: "email", inputMode: "email" },
  { name: "phone", label: "Phone", type: "tel", required: false, autoComplete: "tel", inputMode: "tel" },
];

/** Reads a ms custom property off :root, with a fallback. */
function motionMs(name: string, fallback: number) {
  const value = parseFloat(
    getComputedStyle(document.documentElement).getPropertyValue(name),
  );
  return Number.isFinite(value) ? value : fallback;
}

export function ContactForm() {
  const [values, setValues] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    message: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [formError, setFormError] = useState<string | null>(null);

  // Set in an effect, not at render: Date.now() during render is impure and
  // would differ between the server and the client.
  const mountedAt = useRef(0);
  const honeypot = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const checkRef = useRef<HTMLSpanElement>(null);
  const shakeTimers = useRef<number[]>([]);

  useEffect(() => {
    mountedAt.current = Date.now();
    const timers = shakeTimers.current;
    return () => timers.forEach((id) => window.clearTimeout(id));
  }, []);

  /**
   * transitions.dev error state shake (12). `.is-error` and `.is-shaking` stay
   * orthogonal so the shake can replay (remove → reflow → re-add) without
   * flickering the error treatment off and on in the same tick.
   */
  function shake(fieldNames: FieldName[]) {
    const form = formRef.current;
    if (!form) return;

    const duration =
      motionMs("--shake-dur-a", 80) * 2 + motionMs("--shake-dur-b", 60) * 2;

    for (const field of fieldNames) {
      const input = form.querySelector<HTMLElement>(
        `[data-shake="${field}"]`,
      );
      if (!input) continue;

      input.classList.remove("is-shaking");
      void input.offsetWidth; // force reflow so the keyframes restart
      input.classList.add("is-shaking");

      const id = window.setTimeout(
        () => input.classList.remove("is-shaking"),
        duration + 20,
      );
      shakeTimers.current.push(id);
    }
  }

  function update(field: FieldName, value: string) {
    setValues((previous) => ({ ...previous, [field]: value }));
    // Typing clears that field's error — don't keep shouting at someone who
    // is already fixing it.
    setErrors((previous) => {
      if (!previous[field]) return previous;
      const next = { ...previous };
      delete next[field];
      return next;
    });
    setFormError(null);
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "submitting") return;

    const found = validate(values);
    if (Object.keys(found).length > 0) {
      setErrors(found);
      shake(Object.keys(found) as FieldName[]);
      // Move focus to the first problem so keyboard and screen reader users
      // land on it rather than hunting for the red text.
      formRef.current
        ?.querySelector<HTMLElement>(`[name="${Object.keys(found)[0]}"]`)
        ?.focus();
      return;
    }

    setStatus("submitting");
    setFormError(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          website: honeypot.current?.value ?? "",
          elapsedMs: Date.now() - mountedAt.current,
        }),
      });

      const data = (await response.json()) as {
        ok: boolean;
        errors?: Errors;
        error?: string;
      };

      if (!response.ok || !data.ok) {
        if (data.errors) {
          setErrors(data.errors);
          shake(Object.keys(data.errors) as FieldName[]);
        }
        setFormError(
          data.error ?? "We couldn't send that. Please try again, or call us.",
        );
        setStatus("failed");
        return;
      }

      setStatus("sent");
    } catch {
      setFormError(
        "We couldn't reach the server. Please check your connection, or call us.",
      );
      setStatus("failed");
    }
  }

  /**
   * transitions.dev success check (10). The stroke length is measured at mount
   * rather than hardcoded, so the tick draws exactly to the end of its path.
   */
  useEffect(() => {
    if (status !== "sent") return;
    const path = checkRef.current?.querySelector("path");
    if (!path) return;
    const length = Math.ceil(path.getTotalLength()) + 1;
    path.style.strokeDasharray = String(length);
    path.style.strokeDashoffset = String(length);
    checkRef.current?.setAttribute("data-state", "in");
  }, [status]);

  if (status === "sent") {
    return (
      <div
        role="status"
        className="rounded-2xl border border-line bg-surface p-8 text-center shadow-card sm:p-12"
      >
        <span
          ref={checkRef}
          className="t-success-check mx-auto text-navy-700"
          data-state="out"
          aria-hidden
        >
          <svg width="52" height="52" viewBox="0 0 48 48" fill="none">
            <path
              d="M12 25.5L20.5 34L36 15"
              stroke="currentColor"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        <h2 className="mt-6 font-serif text-2xl font-semibold text-ink">
          Thanks — we&apos;ve got it
        </h2>
        <p className="mx-auto mt-3 max-w-sm text-[0.9375rem] leading-relaxed text-ink-muted">
          We&apos;ll come back to you with a quote, usually within one working
          day. If it&apos;s urgent, call us and we&apos;ll pick it up straight
          away.
        </p>
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      onSubmit={onSubmit}
      noValidate
      className="rounded-2xl border border-line bg-surface p-6 shadow-card sm:p-8"
    >
      {/* Honeypot: hidden from people, inviting to bots. Off-screen rather
          than display:none, which some bots detect and skip. */}
      <div aria-hidden className="absolute left-[-9999px] top-0 h-0 w-0 overflow-hidden">
        <label htmlFor="website">Leave this field empty</label>
        <input
          ref={honeypot}
          id="website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        {FIELDS.map((field) => (
          <Field
            key={field.name}
            {...field}
            value={values[field.name]}
            error={errors[field.name]}
            onChange={(value) => update(field.name, value)}
          />
        ))}

        <div className="sm:col-span-2">
          <Field
            name="message"
            label="What do you need?"
            type="textarea"
            required
            autoComplete="off"
            placeholder="Paste your stationery list, or describe what your office gets through."
            value={values.message}
            error={errors.message}
            onChange={(value) => update("message", value)}
          />
        </div>
      </div>

      {formError ? (
        <p
          role="alert"
          className="mt-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800"
        >
          {formError}
        </p>
      ) : null}

      <div className="mt-6 flex flex-col-reverse items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs leading-relaxed text-ink-muted">
          We only use these details to answer your enquiry.
        </p>
        <Button type="submit" size="lg" disabled={status === "submitting"}>
          {status === "submitting" ? "Sending…" : "Send enquiry"}
        </Button>
      </div>
    </form>
  );
}

/* ─────────────────────────────────────────────────────────────────────────── */

function Field({
  name,
  label,
  type,
  required,
  autoComplete,
  placeholder,
  inputMode,
  value,
  error,
  onChange,
}: {
  name: FieldName;
  label: string;
  type: string;
  required: boolean;
  autoComplete: string;
  placeholder?: string;
  inputMode?: "text" | "email" | "tel";
  value: string;
  error?: string;
  onChange: (value: string) => void;
}) {
  const errorId = `${name}-error`;
  const isTextarea = type === "textarea";

  const control = cn(
    "w-full rounded-lg border bg-surface px-3.5 text-base text-ink placeholder:text-ink-muted",
    // 16px (text-base) is what stops iOS Safari zooming the page on focus.
    "focus:outline-none focus:border-navy-400",
    isTextarea ? "min-h-36 py-3 resize-y" : "h-12",
    error ? "border-red-400" : "border-line-strong",
  );

  return (
    // .t-input-wrap / .t-input are the transitions.dev shake hooks.
    <div className={cn("t-input-wrap", error && "is-error")}>
      <label
        htmlFor={name}
        className="mb-1.5 block text-sm font-medium text-ink-soft"
      >
        {label}
        {required ? null : (
          <span className="ml-1.5 font-normal text-ink-muted">(optional)</span>
        )}
      </label>

      <div
        className={cn("t-input rounded-lg border-0", error && "is-error")}
        data-shake={name}
      >
        {isTextarea ? (
          <textarea
            id={name}
            name={name}
            required={required}
            maxLength={LIMITS[name]}
            autoComplete={autoComplete}
            placeholder={placeholder}
            value={value}
            onChange={(event) => onChange(event.target.value)}
            aria-invalid={Boolean(error)}
            aria-describedby={error ? errorId : undefined}
            className={control}
          />
        ) : (
          <input
            id={name}
            name={name}
            type={type}
            required={required}
            maxLength={LIMITS[name]}
            inputMode={inputMode}
            autoComplete={autoComplete}
            placeholder={placeholder}
            value={value}
            onChange={(event) => onChange(event.target.value)}
            aria-invalid={Boolean(error)}
            aria-describedby={error ? errorId : undefined}
            className={control}
          />
        )}
      </div>

      <p id={errorId} className="t-error-msg mt-1.5 text-sm text-red-700">
        {error ?? " "}
      </p>
    </div>
  );
}
