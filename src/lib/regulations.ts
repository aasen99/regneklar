/** Sentralt register for tidsavhengige satser og regler (én sannhetskilde). */

export type Regulation = {
  key: string;
  value: number;
  unit: string;
  validFrom: string;
  reviewedAt: string;
  sourceUrl: string;
  sourceLabel: string;
  note: string;
};

export const REGULATIONS = {
  mortgage_equity_requirement: {
    key: "mortgage_equity_requirement",
    value: 0.1,
    unit: "andel",
    validFrom: "2024-12-31",
    reviewedAt: "2026-08-28",
    sourceUrl:
      "https://www.regjeringen.no/no/aktuelt/utlansforskriften-senker-kravet-til-egenkapital-for-boliglan/id3077641/",
    sourceLabel: "Regjeringen – utlånsforskriften",
    note: "Hovedregel 10 % egenkapital. Banken kan kreve mer, og tilleggssikkerhet kan påvirke.",
  },
  mortgage_max_ltv: {
    key: "mortgage_max_ltv",
    value: 0.9,
    unit: "andel",
    validFrom: "2024-12-31",
    reviewedAt: "2026-08-28",
    sourceUrl:
      "https://www.regjeringen.no/no/tema/okonomi-og-budsjett/finansmarkedene/utlansforskriften2/id3077676/",
    sourceLabel: "Regjeringen – utlånsforskriften",
    note: "Maksimal belåningsgrad 90 % som hovedregel.",
  },
  debt_income_multiplier: {
    key: "debt_income_multiplier",
    value: 5,
    unit: "ganger",
    validFrom: "2024-12-31",
    reviewedAt: "2026-08-28",
    sourceUrl:
      "https://www.finanstilsynet.no/publikasjoner-og-analyser/boliglansundersokelser/2025/boliglansundersokelsen-2025/informasjon-om-utlansforskriften/",
    sourceLabel: "Finanstilsynet",
    note: "Gjeldsgrad – samlet gjeld mot brutto årsinntekt.",
  },
  document_fee_rate: {
    key: "document_fee_rate",
    value: 0.025,
    unit: "andel",
    validFrom: "2024-01-01",
    reviewedAt: "2026-08-28",
    sourceUrl:
      "https://www.kartverket.no/eiendom/dokumentavgift-og-gebyr/dokumentavgift-ved-overforing-av-fast-eigedom",
    sourceLabel: "Kartverket",
    note: "2,5 % av avgiftsgrunnlaget ved overføring av hjemmel til fast eiendom.",
  },
  mva_standard: {
    key: "mva_standard",
    value: 0.25,
    unit: "andel",
    validFrom: "2024-01-01",
    reviewedAt: "2026-08-28",
    sourceUrl: "https://www.skatteetaten.no/bedrift-og-organisasjon/avgifter/mva/",
    sourceLabel: "Skatteetaten",
    note: "Alminnelig MVA-sats.",
  },
  mva_food: {
    key: "mva_food",
    value: 0.15,
    unit: "andel",
    validFrom: "2024-01-01",
    reviewedAt: "2026-08-28",
    sourceUrl: "https://www.skatteetaten.no/bedrift-og-organisasjon/avgifter/mva/",
    sourceLabel: "Skatteetaten",
    note: "Redusert sats på næringsmidler.",
  },
  mva_transport: {
    key: "mva_transport",
    value: 0.12,
    unit: "andel",
    validFrom: "2024-01-01",
    reviewedAt: "2026-08-28",
    sourceUrl: "https://www.skatteetaten.no/bedrift-og-organisasjon/avgifter/mva/",
    sourceLabel: "Skatteetaten",
    note: "Redusert sats bl.a. persontransport og kinobilletter.",
  },
  bsu_annual_limit: {
    key: "bsu_annual_limit",
    value: 27500,
    unit: "kr",
    validFrom: "2024-01-01",
    reviewedAt: "2026-08-28",
    sourceUrl: "https://www.skatteetaten.no/person/skatt/hjelp-til-riktig-skatt/bolig-og-eiendeler/boligsparing-for-ungdom-bsu/",
    sourceLabel: "Skatteetaten",
    note: "Maksimalt årlig BSU-innskudd.",
  },
  bsu_total_limit: {
    key: "bsu_total_limit",
    value: 300000,
    unit: "kr",
    validFrom: "2024-01-01",
    reviewedAt: "2026-08-28",
    sourceUrl: "https://www.skatteetaten.no/person/skatt/hjelp-til-riktig-skatt/bolig-og-eiendeler/boligsparing-for-ungdom-bsu/",
    sourceLabel: "Skatteetaten",
    note: "Maksimalt totalt BSU-beløp.",
  },
  bsu_tax_deduction: {
    key: "bsu_tax_deduction",
    value: 0.1,
    unit: "andel",
    validFrom: "2024-01-01",
    reviewedAt: "2026-08-28",
    sourceUrl: "https://www.skatteetaten.no/person/skatt/hjelp-til-riktig-skatt/bolig-og-eiendeler/boligsparing-for-ungdom-bsu/",
    sourceLabel: "Skatteetaten",
    note: "Skattefradrag av årets BSU-innskudd.",
  },
} as const satisfies Record<string, Regulation>;

export type RegulationKey = keyof typeof REGULATIONS;

export function reg(key: RegulationKey): Regulation {
  return REGULATIONS[key];
}

export function regPercent(key: RegulationKey): number {
  return REGULATIONS[key].value * 100;
}

export function formatReviewed(key: RegulationKey): string {
  const r = REGULATIONS[key];
  return `Sist faglig kontrollert: ${formatNorwegianDate(r.reviewedAt)}. Kilde: ${r.sourceLabel}.`;
}

function formatNorwegianDate(iso: string): string {
  const [y, m, d] = iso.split("-");
  return `${d}.${m}.${y}`;
}
