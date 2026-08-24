import { byggCalculators } from "./calculators/bygg";
import { enheterCalculators } from "./calculators/enheter";
import { fysikkCalculators } from "./calculators/fysikk";
import { helseCalculators } from "./calculators/helse";
import { hverdagCalculators } from "./calculators/hverdag";
import { matCalculators } from "./calculators/mat";
import { matematikkCalculators } from "./calculators/matematikk";
import { okonomiCalculators } from "./calculators/okonomi";
import { skoleCalculators } from "./calculators/skole";
import { sportCalculators } from "./calculators/sport";
import type { Calculator, CategoryId } from "./types";

export const calculators: Calculator[] = [
  ...okonomiCalculators,
  ...helseCalculators,
  ...sportCalculators,
  ...matematikkCalculators,
  ...enheterCalculators,
  ...hverdagCalculators,
  ...byggCalculators,
  ...matCalculators,
  ...skoleCalculators,
  ...fysikkCalculators,
];

export function getCalculator(slug: string): Calculator | undefined {
  return calculators.find((c) => c.slug === slug);
}

export function calculatorsInCategory(id: CategoryId): Calculator[] {
  return calculators.filter((c) => c.category === id);
}

export function popularCalculators(): Calculator[] {
  return calculators.filter((c) => c.popular);
}

export const featuredCalculators = popularCalculators;
export const calculatorsByCategory = calculatorsInCategory;

export function searchCalculators(query: string): Calculator[] {
  return searchItems(query);
}

export function relatedCalculators(slug: string, limit = 4): Calculator[] {
  const current = getCalculator(slug);
  if (!current) return [];
  return calculators
    .filter((c) => c.slug !== slug && c.category === current.category)
    .slice(0, limit);
}

export function searchItems(query: string): Calculator[] {
  const q = query.trim().toLowerCase();
  if (!q) return calculators;
  return calculators.filter((c) => {
    const hay = [c.title, c.shortTitle, c.description, c.slug, ...c.tags]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();
    return hay.includes(q);
  });
}
