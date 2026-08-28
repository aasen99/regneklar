import { calculators, getCalculator } from "./catalog";
import type { Calculator } from "./types";

/** Eksplisitte relasjoner – overstyrer kategoriens første treff. */
export const RELATED_BY_SLUG: Record<string, string[]> = {
  lanekalkulator: [
    "ekstra-innbetaling-lan",
    "annuitet-vs-serie",
    "laneramme",
    "effektiv-rente",
    "serielan",
  ],
  "egenkapital-bolig": [
    "laneramme",
    "lanekalkulator",
    "pris-per-kvm",
    "bsu",
    "nodfond",
  ],
  laneramme: [
    "lanekalkulator",
    "egenkapital-bolig",
    "brutto-netto",
    "effektiv-rente",
    "ekstra-innbetaling-lan",
  ],
  "rentes-rente": ["million-sparing", "regel-72", "bsu", "avkastning", "nodfond"],
  "regel-72": ["rentes-rente", "million-sparing", "cagr", "avkastning"],
  "km-t-min-km": ["maltempo", "sluttid-loping", "split-tider", "rundetid-400m"],
  maltempo: ["km-t-min-km", "sluttid-loping", "predikert-lopsid", "split-tider"],
  bmi: ["kroppsfett-navy", "midje-hoyde", "kaloribehov", "ideell-vekt"],
  maling: ["gulvbelegg", "fliser", "tapet", "gipsplater"],
  karakterkalkulator: ["karakterbehov", "karakterpoeng", "vekttall-snitt", "eksamen-standpunkt"],
  feriepenger: ["lonn-omregning", "brutto-netto", "budsjett-50-30-20"],
  "effektiv-rente": ["lanekalkulator", "serielan", "laneramme", "ekstra-innbetaling-lan"],
  bsu: ["egenkapital-bolig", "rentes-rente", "million-sparing", "nodfond"],
  prosent: ["prosentvis-endring", "mva", "tips", "inflasjon"],
  mva: ["prosent", "prosentvis-endring", "tips", "inflasjon"],
  stromkostnad: ["nettleie", "drivstoff", "abonnement", "vaskemaskin-kostnad"],
  pythagoras: ["areal", "volum-kule", "trekant-vinkler", "trigonometri"],
};

export function relatedCalculators(slug: string, limit = 4): Calculator[] {
  const explicit = RELATED_BY_SLUG[slug];
  if (explicit) {
    return explicit
      .map((s) => getCalculator(s))
      .filter((c): c is Calculator => Boolean(c))
      .slice(0, limit);
  }
  const current = getCalculator(slug);
  if (!current) return [];
  return calculators
    .filter((c) => c.slug !== slug && c.category === current.category)
    .slice(0, limit);
}

/** Diskret lenke til Penger i Fokus på utvalgte økonomisider. */
export const PIF_LINKS: Record<string, { href: string; label: string }> = {
  laneramme: {
    href: "https://pengerifokus.no",
    label: "Les mer om låneramme og gjeldsgrad på Penger i Fokus",
  },
  lanekalkulator: {
    href: "https://pengerifokus.no",
    label: "Guide til nominell og effektiv rente på Penger i Fokus",
  },
  "egenkapital-bolig": {
    href: "https://pengerifokus.no",
    label: "Mer om boligkjøp og egenkapital på Penger i Fokus",
  },
  bsu: {
    href: "https://pengerifokus.no",
    label: "BSU-forklaring og tips på Penger i Fokus",
  },
};
