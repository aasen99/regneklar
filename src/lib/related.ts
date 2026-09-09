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
  "km-t-min-km": ["maltempo", "opptrapping-loping", "sluttid-loping", "split-tider"],
  maltempo: ["km-t-min-km", "opptrapping-loping", "sluttid-loping", "predikert-lopsid"],
  "opptrapping-loping": [
    "maltempo",
    "km-t-min-km",
    "sluttid-loping",
    "predikert-lopsid",
  ],
  bmi: ["kroppsfett-navy", "midje-hoyde", "kaloribehov", "carbs-kalkulator"],
  "carbs-kalkulator": [
    "sportsdrikk-sukker",
    "kaloribehov",
    "makrofordeling",
    "bmi",
  ],
  "sportsdrikk-sukker": [
    "carbs-kalkulator",
    "kaloribehov",
    "makrofordeling",
    "km-t-min-km",
  ],
  makrofordeling: ["carbs-kalkulator", "sportsdrikk-sukker", "kaloribehov", "bmi"],
  kaloribehov: ["carbs-kalkulator", "sportsdrikk-sukker", "makrofordeling", "bmi"],
  maling: ["gulvbelegg", "fliser", "tapet", "gipsplater"],
  karakterkalkulator: ["karakterbehov", "karakterpoeng", "vekttall-snitt", "eksamen-standpunkt"],
  feriepenger: ["lonn-omregning", "brutto-netto", "budsjett-50-30-20"],
  "effektiv-rente": ["lanekalkulator", "serielan", "laneramme", "ekstra-innbetaling-lan"],
  bsu: ["egenkapital-bolig", "rentes-rente", "million-sparing", "nodfond"],
  prosent: ["prosentvis-endring", "mva", "tips", "inflasjon"],
  mva: ["prosent", "prosentvis-endring", "tips", "inflasjon"],
  stromkostnad: ["nettleie", "drivstoff", "abonnement", "vaskemaskin-kostnad"],
  pythagoras: ["areal", "volum-kule", "trekant-vinkler", "trigonometri"],
  "pe-ratio": ["eps", "peg-ratio", "ev-ebitda", "pb-ratio", "utbytteavkastning"],
  eps: ["pe-ratio", "utbetalingsgrad", "roe", "peg-ratio"],
  utbytteavkastning: ["utbytteinntekt", "utbetalingsgrad", "totalavkastning-aksje", "pe-ratio"],
  utbetalingsgrad: ["utbytteavkastning", "eps", "utbytteinntekt", "roe"],
  markedsverdi: ["enterprise-value", "pe-ratio", "ev-ebitda", "pb-ratio"],
  "pb-ratio": ["pe-ratio", "roe", "markedsverdi", "enterprise-value"],
  roe: ["pb-ratio", "gearing", "eps", "pe-ratio"],
  gearing: ["net-debt-ebitda", "enterprise-value", "roe", "ev-ebitda"],
  "net-debt-ebitda": ["gearing", "enterprise-value", "ev-ebitda", "roe"],
  "enterprise-value": ["ev-ebitda", "markedsverdi", "net-debt-ebitda", "pe-ratio"],
  "ev-ebitda": ["enterprise-value", "pe-ratio", "peg-ratio", "net-debt-ebitda"],
  "peg-ratio": ["pe-ratio", "eps", "ev-ebitda", "cagr-aksje"],
  "totalavkastning-aksje": [
    "cagr-aksje",
    "utbytteavkastning",
    "avkastning",
    "snittkurs-aksje",
  ],
  "snittkurs-aksje": [
    "break-even-kurtasje",
    "totalavkastning-aksje",
    "utbytteinntekt",
    "cagr-aksje",
  ],
  "break-even-kurtasje": [
    "snittkurs-aksje",
    "totalavkastning-aksje",
    "avkastning",
    "cagr-aksje",
  ],
  utbytteinntekt: [
    "utbytteavkastning",
    "utbetalingsgrad",
    "totalavkastning-aksje",
    "snittkurs-aksje",
  ],
  "cagr-aksje": ["cagr", "totalavkastning-aksje", "avkastning", "rentes-rente"],
  cagr: ["cagr-aksje", "rentes-rente", "regel-72", "avkastning"],
  "odds-kalkulator": [
    "verdibett",
    "bankroll-kelly",
    "prosent",
    "sannsynlighet-enkel",
  ],
  verdibett: [
    "bankroll-kelly",
    "odds-kalkulator",
    "prosent",
    "sannsynlighet-enkel",
  ],
  "bankroll-kelly": [
    "verdibett",
    "odds-kalkulator",
    "prosent",
    "sannsynlighet-enkel",
  ],
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
    href: "https://pengerifokus.no/guider/laneramme-for-boligkjop",
    label: "Les mer om låneramme og gjeldsgrad på Penger i Fokus",
  },
  lanekalkulator: {
    href: "https://pengerifokus.no/guider/prosentregning",
    label: "Mer om prosent og rente på Penger i Fokus",
  },
  "egenkapital-bolig": {
    href: "https://pengerifokus.no/guider/eie-eller-leie-bolig",
    label: "Mer om boligkjøp og egenkapital på Penger i Fokus",
  },
  bsu: {
    href: "https://pengerifokus.no/guider/bygg-bufferkonto",
    label: "Tips om sparing og bolig på Penger i Fokus",
  },
};
