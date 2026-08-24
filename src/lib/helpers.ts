import type { Calculator, CategoryId, Field, ResultItem } from "./types";
import { parseNumber } from "./format";

export function result(
  id: string,
  label: string,
  value: number | string,
  extra: Partial<ResultItem> = {},
): ResultItem {
  return { id, label, value, ...extra };
}

export function allNumbers(values: number[]): boolean {
  return values.every((v) => Number.isFinite(v));
}

type Unit = { id: string; label: string; toBase: number };

export function createConverter(opts: {
  slug: string;
  title: string;
  description: string;
  category: CategoryId;
  units: Unit[];
  tags: string[];
  formula: string;
  explanation: string;
  popular?: boolean;
  defaultFrom?: string;
  defaultTo?: string;
  defaultValue?: number;
}): Calculator {
  const fields: Field[] = [
    {
      id: "value",
      label: "Verdi",
      type: "number",
      defaultValue: opts.defaultValue ?? 1,
    },
    {
      id: "from",
      label: "Fra",
      type: "select",
      options: opts.units.map((u) => ({ value: u.id, label: u.label })),
      defaultValue: opts.defaultFrom ?? opts.units[0]?.id,
    },
    {
      id: "to",
      label: "Til",
      type: "select",
      options: opts.units.map((u) => ({ value: u.id, label: u.label })),
      defaultValue: opts.defaultTo ?? opts.units[1]?.id,
    },
  ];

  return {
    slug: opts.slug,
    title: opts.title,
    description: opts.description,
    category: opts.category,
    tags: opts.tags,
    fields,
    formula: opts.formula,
    explanation: opts.explanation,
    popular: opts.popular,
    compute(input) {
      const value = parseNumber(input.value);
      const from = opts.units.find((u) => u.id === input.from);
      const to = opts.units.find((u) => u.id === input.to);
      if (value == null || !from || !to) return [];
      const converted = (value * from.toBase) / to.toBase;
      return [
        result("resultat", to.label, converted, {
          primary: true,
          digits: converted >= 100 ? 2 : 6,
        }),
      ];
    },
  };
}
