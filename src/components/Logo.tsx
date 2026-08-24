import Link from "next/link";

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-2.5 group">
      <span className="flex size-9 items-center justify-center rounded-lg bg-pine text-sand shadow-[inset_0_-1px_0_rgb(0_0_0/0.15)]">
        <svg
          viewBox="0 0 24 24"
          className="size-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          aria-hidden
        >
          <path d="M5 8h14M5 16h14M9 4v4M15 16v4" strokeLinecap="round" />
        </svg>
      </span>
      <span className="leading-none">
        <span className="block font-serif text-lg tracking-tight text-ink group-hover:text-pine">
          REGNEKLAR
        </span>
        {!compact && (
          <span className="block text-[11px] uppercase tracking-[0.18em] text-ink-soft">
            .no
          </span>
        )}
      </span>
    </Link>
  );
}
