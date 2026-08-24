"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Logo } from "./Logo";

const links = [
  { href: "/", label: "Kalkulatorer" },
  { href: "/formler", label: "Formler" },
  { href: "/om", label: "Om" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-line/80 bg-paper/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Logo />
        <nav className="hidden items-center gap-1 md:flex">
          {links.map((link) => {
            const active =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-full px-3.5 py-1.5 text-sm transition ${
                  active
                    ? "bg-pine text-sand"
                    : "text-ink-soft hover:bg-paper-dark hover:text-ink"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <Link
            href="/sok"
            className="ml-2 rounded-full border border-line bg-sand px-3.5 py-1.5 text-sm text-ink-soft hover:border-pine hover:text-pine"
          >
            Søk
          </Link>
        </nav>
        <button
          type="button"
          className="inline-flex size-10 items-center justify-center rounded-lg border border-line bg-sand md:hidden"
          aria-expanded={open}
          aria-label={open ? "Lukk meny" : "Åpne meny"}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">Meny</span>
          <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2">
            {open ? (
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </div>
      {open && (
        <div className="border-t border-line bg-sand px-4 py-3 md:hidden">
          <nav className="flex flex-col gap-1">
            {[...links, { href: "/sok", label: "Søk" }].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2 text-base hover:bg-paper"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
