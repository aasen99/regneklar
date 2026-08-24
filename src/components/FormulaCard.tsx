import Link from "next/link";
import { getCategory } from "@/lib/categories";
import type { Formula } from "@/lib/types";

export function FormulaCard({ formula }: { formula: Formula }) {
  const category = getCategory(formula.category);
  return (
    <Link
      href={`/formler/${formula.slug}`}
      className="block rounded-2xl border border-line bg-sand p-5 transition hover:border-pine/40"
    >
      <span className="text-[11px] uppercase tracking-[0.16em] text-pine">
        {category?.title}
      </span>
      <h3 className="mt-2 font-serif text-xl text-ink">{formula.title}</h3>
      <p className="mt-3 rounded-lg bg-paper px-3 py-2 font-serif text-sm text-pine-dark">
        {formula.expression}
      </p>
    </Link>
  );
}
