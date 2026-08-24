import Link from "next/link";
import { categories } from "@/lib/categories";

export function CategoryGrid() {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {categories.map((category) => (
        <Link
          key={category.id}
          href={`/kategori/${category.id}`}
          className="rounded-2xl border border-line bg-sand p-5 transition hover:border-pine/40 hover:bg-moss/40"
        >
          <h2 className="font-serif text-2xl text-ink">{category.title}</h2>
          <p className="mt-1 text-sm text-ink-soft">{category.blurb}</p>
        </Link>
      ))}
    </div>
  );
}
