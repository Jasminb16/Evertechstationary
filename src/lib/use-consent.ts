"use client";

import { useSyncExternalStore } from "react";

export const CONSENT_KEY = "evertech.consent";
export const CONSENT_EVENT = "evertech:consent";

export type ConsentValue = "granted" | "denied";

/**
 * Cookie consent, read from localStorage.
 *
 * localStorage is external mutable state, so it's exposed through
 * useSyncExternalStore rather than copied into React state inside an effect.
 * That gives a correct server snapshot (always null — the server can't know),
 * a single re-render after hydration, and automatic updates when another tab
 * or another component changes the value.
 */

function subscribe(onChange: () => void) {
  window.addEventListener(CONSENT_EVENT, onChange);
  // Fires when another tab changes the value.
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(CONSENT_EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
}

function getSnapshot(): ConsentValue | null {
  try {
    const stored = window.localStorage.getItem(CONSENT_KEY);
    return stored === "granted" || stored === "denied" ? stored : null;
  } catch {
    // Private mode or blocked storage — behave as if no choice was made.
    return null;
  }
}

/** The server can't read a browser's storage, so it always renders "undecided". */
function getServerSnapshot(): ConsentValue | null {
  return null;
}

export function useConsent(): ConsentValue | null {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export function setConsent(value: ConsentValue) {
  try {
    window.localStorage.setItem(CONSENT_KEY, value);
  } catch {
    // Storage unavailable — the choice applies to this page view only.
  }
  window.dispatchEvent(new Event(CONSENT_EVENT));
}
