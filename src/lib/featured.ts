import { calculators, getCalculator } from "./catalog";
import type { Calculator } from "./types";

/** Redaksjonelt utvalg til forsiden (maks 12). Endres her – ikke i komponentkode. */
export const FEATURED_CALCULATOR_SLUGS = [
  "prosent",
  "lanekalkulator",
  "rentes-rente",
  "egenkapital-bolig",
  "bmi",
  "km-t-min-km",
  "maltempo",
  "maling",
  "karakterkalkulator",
  "mva",
  "stromkostnad",
  "alder",
] as const;

export function featuredCalculators(): Calculator[] {
  return FEATURED_CALCULATOR_SLUGS.map((slug) => getCalculator(slug)).filter(
    (c): c is Calculator => Boolean(c),
  );
}

/** Populære søk / snarveier på søkesiden før brukeren skriver. */
export const POPULAR_SEARCHES = [
  { label: "Lån", href: "/kalkulator/lanekalkulator" },
  { label: "BMI", href: "/kalkulator/bmi" },
  { label: "Prosent", href: "/kalkulator/prosent" },
  { label: "Maling", href: "/kalkulator/maling" },
  { label: "Løpetempo", href: "/kalkulator/km-t-min-km" },
  { label: "MVA", href: "/kalkulator/mva" },
  { label: "Karakterkalkulator", href: "/kalkulator/karakterkalkulator" },
  { label: "Strømkostnad", href: "/kalkulator/stromkostnad" },
  { label: "Pytagoras", href: "/kalkulator/pythagoras" },
  { label: "Egenkapital", href: "/kalkulator/egenkapital-bolig" },
] as const;

export const calculatorCount = calculators.length;
