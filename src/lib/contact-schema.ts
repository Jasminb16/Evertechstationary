/**
 * Shared validation for the contact form.
 *
 * The same rules run on the client (for instant feedback) and on the server
 * (because client-side validation is a convenience, never a control). Written
 * by hand rather than pulled from a schema library — the form has six fields
 * and this keeps the bundle honest.
 */

export type ContactPayload = {
  name: string;
  company: string;
  email: string;
  phone: string;
  message: string;
  /** Honeypot. Must stay empty — real users never see this field. */
  website: string;
  /** Milliseconds since the form was rendered. Bots submit near-instantly. */
  elapsedMs: number;
};

export type FieldName = "name" | "company" | "email" | "phone" | "message";

export type Errors = Partial<Record<FieldName, string>>;

/**
 * Deliberately permissive: one @, a dot in the domain, no spaces. Stricter
 * regexes reject valid addresses far more often than they catch typos.
 */
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Digits, spaces and the usual punctuation, 7–20 digits. */
const PHONE = /^[+()\-.\s\d]{7,25}$/;

export const LIMITS = {
  name: 80,
  company: 120,
  email: 254,
  phone: 25,
  message: 2000,
} as const;

export function validate(input: Partial<ContactPayload>): Errors {
  const errors: Errors = {};

  const name = (input.name ?? "").trim();
  if (name.length < 2) {
    errors.name = "Please enter your name.";
  } else if (name.length > LIMITS.name) {
    errors.name = `Please keep this under ${LIMITS.name} characters.`;
  }

  const company = (input.company ?? "").trim();
  if (company.length > LIMITS.company) {
    errors.company = `Please keep this under ${LIMITS.company} characters.`;
  }

  const email = (input.email ?? "").trim();
  if (!email) {
    errors.email = "Please enter your email address.";
  } else if (!EMAIL.test(email) || email.length > LIMITS.email) {
    errors.email = "That doesn't look like a valid email address.";
  }

  // Phone is optional, but validated when given.
  const phone = (input.phone ?? "").trim();
  if (phone && !PHONE.test(phone)) {
    errors.phone = "Please enter a valid phone number.";
  }

  const message = (input.message ?? "").trim();
  if (message.length < 10) {
    errors.message = "Please tell us a little more, at least 10 characters.";
  } else if (message.length > LIMITS.message) {
    errors.message = `Please keep this under ${LIMITS.message} characters.`;
  }

  return errors;
}

/** Minimum time a human plausibly needs to fill the form. */
export const MIN_ELAPSED_MS = 2500;
