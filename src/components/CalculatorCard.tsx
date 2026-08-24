import Link from "next/link";
import { getCategory } from "@/lib/categories";
import type { Calculator } from "@/lib/types";

export function CalculatorCard({ calculator }: { calculator: Calculator }) {
  const category = getCategory(calculator.category);
  return (
    <Link
      href={`/kalkulator/${calculator.slug}`}
      className="group flex flex-col rounded-2xl border border-line bg-sand p-5 shadow-[0_1px_0_rgb(20_34_31/0.04)] transition hover:-translate-y-0.5 hover:border-pine/40 hover:shadow-md"
    >
      <span className="text-[11px] uppercase tracking-[0.16em] text-pine">
        {category?.title}
      </span>
      <span className="mt-2 font-serif text-xl leading-snug text-ink group-hover:text-pine">
        {calculator.shortTitle ?? calculator.title}
      </span>
      <span className="mt-2 line-clamp-3 text-sm leading-relaxed text-ink-soft">
        {calculator.description}
      </span>
    </Link>
  );
}
