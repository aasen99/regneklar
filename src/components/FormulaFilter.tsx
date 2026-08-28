"use client";

import { useMemo, useState } from "react";
import { FormulaCard } from "@/components/FormulaCard";
import { categories } from "@/lib/categories";
import type { Formula } from "@/lib/types";

export function FormulaFilter({ formulas }: { formulas: Formula[] }) {
  const [active, setActive] = useState<string>("alle");

  const counts = useMemo(() => {
    const map = new Map<string, number>();
    for (const f of formulas) {
      map.set(f.category, (map.get(f.category) ?? 0) + 1);
    }
    return map;
  }, [formulas]);

  const visible =
    active === "alle"
      ? formulas
      : formulas.filter((f) => f.category === active);

  const grouped = useMemo(() => {
    if (active !== "alle") return [{ id: active, items: visible }];
    return categories
      .map((c) => ({
        id: c.id,
        title: c.title,
        items: visible.filter((f) => f.category === c.id),
      }))
      .filter((g) => g.items.length > 0);
  }, [active, visible]);

  return (
    <>
      <div className="mt-8 flex flex-wrap gap-2">
        <FilterButton
          active={active === "alle"}
          onClick={() => setActive("alle")}
          label={`Alle (${formulas.length})`}
        />
        {categories.map((c) => {
          const count = counts.get(c.id) ?? 0;
          if (count === 0) return null;
          return (
            <FilterButton
              key={c.id}
              active={active === c.id}
              onClick={() => setActive(c.id)}
              label={`${c.title} (${count})`}
            />
          );
        })}
      </div>

      <div className="mt-10 space-y-12">
        {grouped.map((group) => (
          <section key={group.id}>
            {active === "alle" && "title" in group ? (
              <h2 className="font-serif text-2xl">{group.title}</h2>
            ) : null}
            <div
              className={
                active === "alle" && "title" in group
                  ? "mt-5 grid gap-4 sm:grid-cols-2"
                  : "grid gap-4 sm:grid-cols-2"
              }
            >
              {group.items.map((formula) => (
                <FormulaCard key={formula.slug} formula={formula} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </>
  );
}

function FilterButton({
  active,
  onClick,
  label,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={
        active
          ? "rounded-full bg-pine px-4 py-2 text-sm font-medium text-sand"
          : "rounded-full border border-line bg-paper px-4 py-2 text-sm text-ink-soft hover:border-pine/40 hover:text-ink"
      }
    >
      {label}
    </button>
  );
}
