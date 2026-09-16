import { NextResponse } from "next/server";

import {
  MIN_ELAPSED_MS,
  validate,
  type ContactPayload,
} from "@/lib/contact-schema";

export const runtime = "nodejs";
// Never cache a POST endpoint's response.
export const dynamic = "force-dynamic";

/**
 * In-memory rate limiter: 10 requests per IP per 10 minutes.
 *
 * Every request counts, including ones that fail validation — that's what
 * stops a flood. 10 rather than 5 because a real person who mistypes their
 * email a couple of times shouldn't be locked out of their own enquiry.
 *
 * Good enough for a brochure site on a single instance. If the client deploys
 * behind more than one instance (or on a platform that recycles containers
 * aggressively), move this to Upstash Redis or the host's own rate limiting —
 * see README. The map is bounded by eviction on every call so it can't grow
 * without limit.
 */
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 10;
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();

  for (const [key, timestamps] of hits) {
    const live = timestamps.filter((t) => now - t < WINDOW_MS);
    if (live.length === 0) hits.delete(key);
    else hits.set(key, live);
  }

  const mine = hits.get(ip) ?? [];
  if (mine.length >= MAX_PER_WINDOW) return true;

  mine.push(now);
  hits.set(ip, mine);
  return false;
}

function clientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]!.trim();
  return request.headers.get("x-real-ip") ?? "unknown";
}

export async function POST(request: Request) {
  if (rateLimited(clientIp(request))) {
    return NextResponse.json(
      { ok: false, error: "Too many messages. Please try again shortly." },
      { status: 429 },
    );
  }

  let body: Partial<ContactPayload>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Malformed request." },
      { status: 400 },
    );
  }

  // ── Spam gates ──────────────────────────────────────────────────────────
  // Both return 200 with ok:true. Telling a bot exactly which check it failed
  // just teaches it how to pass next time; the submission is simply dropped.
  if (typeof body.website === "string" && body.website.trim() !== "") {
    return NextResponse.json({ ok: true });
  }
  if (typeof body.elapsedMs === "number" && body.elapsedMs < MIN_ELAPSED_MS) {
    return NextResponse.json({ ok: true });
  }

  const errors = validate(body);
  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ ok: false, errors }, { status: 422 });
  }

  // ── Delivery ────────────────────────────────────────────────────────────
  // Not wired up: it needs credentials the client owns. Pick one provider,
  // put its key in the host's environment (NOT a NEXT_PUBLIC_ variable, which
  // would ship it to the browser), and send from here. See README for the
  // Resend and SMTP snippets.
  //
  //   const resend = new Resend(process.env.RESEND_API_KEY);
  //   await resend.emails.send({ … });
  //
  // Until then the submission is logged so nothing is silently lost during
  // staging, with the message body omitted from the log.
  console.info("[contact] enquiry received", {
    name: String(body.name).slice(0, 80),
    email: String(body.email).slice(0, 254),
    company: String(body.company ?? "").slice(0, 120),
    at: new Date().toISOString(),
  });

  return NextResponse.json({ ok: true });
}
