"use client";

import Link from "next/link";
import { useSyncExternalStore, useState } from "react";

const STORAGE_KEY = "regneklar-cookie-consent";

export type ConsentChoice = "analytics" | "necessary";

export function getStoredConsent(): ConsentChoice | null {
  if (typeof window === "undefined") return null;
  const value = localStorage.getItem(STORAGE_KEY);
  return value === "analytics" || value === "necessary" ? value : null;
}

export function setConsent(choice: ConsentChoice) {
  localStorage.setItem(STORAGE_KEY, choice);
  window.dispatchEvent(new CustomEvent("cookie-consent-changed", { detail: choice }));
  if (typeof window.gtag === "function") {
    window.gtag("consent", "update", {
      analytics_storage: choice === "analytics" ? "granted" : "denied",
      ad_storage: "denied",
    });
  }
}

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

function subscribeConsent(onChange: () => void) {
  window.addEventListener("cookie-consent-changed", onChange);
  return () => window.removeEventListener("cookie-consent-changed", onChange);
}

export function CookieConsent() {
  const needsConsent = useSyncExternalStore(
    subscribeConsent,
    () => getStoredConsent() === null,
    () => false,
  );
  const [settingsOpen, setSettingsOpen] = useState(false);

  if (!needsConsent && !settingsOpen) return null;

  function accept(choice: ConsentChoice) {
    setConsent(choice);
    setSettingsOpen(false);
  }

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-50 border-t border-line bg-paper/95 p-4 shadow-[0_-8px_30px_rgba(0,0,0,0.08)] backdrop-blur sm:p-5"
      role="dialog"
      aria-label="Informasjonskapsler"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-2xl text-sm leading-relaxed text-ink-soft">
          <p className="font-medium text-ink">Informasjonskapsler</p>
          <p className="mt-1">
            Vi bruker nødvendige informasjonskapsler for at siden skal fungere.
            Med ditt samtykke bruker vi også Google Analytics for anonym
            bruksstatistikk.{" "}
            <Link href="/personvern" className="text-pine hover:underline">
              Les mer
            </Link>
            .
          </p>
        </div>
        <div className="flex shrink-0 flex-wrap gap-2">
          <button
            type="button"
            onClick={() => accept("necessary")}
            className="rounded-full border border-line bg-paper px-4 py-2 text-sm text-ink hover:bg-sand"
          >
            Kun nødvendige
          </button>
          <button
            type="button"
            onClick={() => accept("analytics")}
            className="rounded-full bg-pine px-4 py-2 text-sm font-medium text-sand hover:bg-pine-dark"
          >
            Tillat analyse
          </button>
        </div>
      </div>
    </div>
  );
}

export function CookieSettingsButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="text-left hover:text-sand"
      >
        Endre samtykke
      </button>
      {open ? (
        <div
          className="fixed inset-x-0 bottom-0 z-50 border-t border-line bg-paper p-4 shadow-[0_-8px_30px_rgba(0,0,0,0.08)] sm:p-5"
          role="dialog"
          aria-label="Endre samtykke"
        >
          <div className="mx-auto flex max-w-6xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-ink-soft">
              Velg om vi kan bruke Google Analytics.
            </p>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => {
                  setConsent("necessary");
                  setOpen(false);
                }}
                className="rounded-full border border-line px-4 py-2 text-sm hover:bg-sand"
              >
                Kun nødvendige
              </button>
              <button
                type="button"
                onClick={() => {
                  setConsent("analytics");
                  setOpen(false);
                }}
                className="rounded-full bg-pine px-4 py-2 text-sm font-medium text-sand"
              >
                Tillat analyse
              </button>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-full px-4 py-2 text-sm text-ink-soft hover:text-ink"
              >
                Lukk
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
