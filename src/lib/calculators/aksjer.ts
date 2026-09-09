import type { Calculator } from "../types";
import { num } from "../format";
import { allNumbers, result } from "../helpers";

/** Parse "antall:kurs" pairs, e.g. "100:150; 50:160,5". */
function parseShareLots(raw: string | undefined): { qty: number; price: number }[] {
  if (!raw?.trim()) return [];
  const useSemi = /[;\n\r]/.test(raw);
  const parts = useSemi ? raw.split(/[;\n\r]+/) : raw.split(/[,]+/);
  const lots: { qty: number; price: number }[] = [];
  for (const part of parts) {
    const t = part.trim();
    if (!t) continue;
    const m = t.match(/^(.+?)\s*[@:x×]\s*(.+)$/i);
    if (!m) continue;
    const qty = Number(m[1].trim().replace(/\s/g, "").replace(",", "."));
    const price = Number(m[2].trim().replace(/\s/g, "").replace(",", "."));
    if (Number.isFinite(qty) && Number.isFinite(price) && qty > 0 && price >= 0) {
      lots.push({ qty, price });
    }
  }
  return lots;
}

export const aksjerCalculators: Calculator[] = [
  {
    slug: "pe-ratio",
    title: "P/E-kalkulator",
    shortTitle: "P/E",
    description:
      "Regn ut P/E (price/earnings): aksjekurs delt på resultat per aksje (EPS).",
    category: "okonomi",
    tags: ["pe", "p/e", "price earnings", "aksje", "verdsettelse", "eps"],
    popular: true,
    fields: [
      {
        id: "kurs",
        label: "Aksjekurs",
        type: "number",
        unit: "kr",
        defaultValue: 150,
      },
      {
        id: "eps",
        label: "EPS (resultat per aksje)",
        type: "number",
        unit: "kr",
        defaultValue: 10,
        step: 0.01,
        allowNegative: true,
        hint: "Trailing eller forward EPS – vær konsekvent.",
      },
    ],
    formula: "P/E = aksjekurs / EPS",
    explanation:
      "Høy P/E kan bety forventet vekst eller dyr aksje; lav kan bety billig eller lav forventning. Ved EPS ≤ 0 er P/E ikke meningsfull og vises som N/A.",
    disclaimer: "Ikke investeringsråd. Sammenlign P/E innen samme bransje.",
    compute(input) {
      const kurs = num(input, "kurs");
      const eps = num(input, "eps");
      if (!allNumbers([kurs, eps]) || kurs <= 0) return [];
      if (eps <= 0) {
        return [
          result("pe", "P/E", "N/A", {
            kind: "text",
            primary: true,
            hint: "P/E krever positiv EPS.",
          }),
        ];
      }
      return [
        result("pe", "P/E", kurs / eps, { digits: 2, primary: true }),
        result("earningsYield", "Earnings yield", (eps / kurs) * 100, {
          kind: "percent",
          digits: 2,
        }),
      ];
    },
  },
  {
    slug: "eps",
    title: "EPS-kalkulator",
    shortTitle: "EPS",
    description:
      "Finn resultat per aksje (EPS): årsresultat delt på antall utestående aksjer.",
    category: "okonomi",
    tags: ["eps", "resultat per aksje", "aksje", "earnings"],
    popular: true,
    fields: [
      {
        id: "resultat",
        label: "Årsresultat (netto)",
        type: "number",
        unit: "kr",
        defaultValue: 2_500_000_000,
        allowNegative: true,
      },
      {
        id: "aksjer",
        label: "Antall aksjer",
        type: "number",
        defaultValue: 250_000_000,
        hint: "Utestående / weighted average shares outstanding.",
      },
    ],
    formula: "EPS = årsresultat / antall aksjer",
    explanation:
      "EPS brukes i P/E og utbetalingsgrad. Bruk samme resultatperiode og aksjeantall som i rapporten (ofte gjennomsnitt over året).",
    disclaimer: "Forenklet. Diluted EPS trekker inn potensielle nye aksjer.",
    compute(input) {
      const resultat = num(input, "resultat");
      const aksjer = num(input, "aksjer");
      if (!allNumbers([resultat, aksjer]) || aksjer <= 0) return [];
      return [
        result("eps", "EPS", resultat / aksjer, {
          digits: 4,
          unit: "kr",
          primary: true,
        }),
      ];
    },
  },
  {
    slug: "utbytteavkastning",
    title: "Utbytteavkastning",
    shortTitle: "Dividend yield",
    description:
      "Regn ut utbytteavkastning: utbytte per aksje delt på aksjekurs.",
    category: "okonomi",
    tags: [
      "utbytte",
      "dividend yield",
      "utbytteavkastning",
      "aksje",
      "dps",
    ],
    popular: true,
    fields: [
      {
        id: "dps",
        label: "Utbytte per aksje (DPS)",
        type: "number",
        unit: "kr",
        defaultValue: 6,
        step: 0.01,
      },
      {
        id: "kurs",
        label: "Aksjekurs",
        type: "number",
        unit: "kr",
        defaultValue: 150,
      },
    ],
    formula: "yield = DPS / aksjekurs · 100 %",
    explanation:
      "Viser kontantutbytte i prosent av kursen. Historisk utbytte er ikke garanti for fremtidig. Noen selskaper bruker tilbakekjøp i stedet for utbytte.",
    disclaimer: "Ikke investeringsråd.",
    compute(input) {
      const dps = num(input, "dps");
      const kurs = num(input, "kurs");
      if (!allNumbers([dps, kurs]) || kurs <= 0) return [];
      return [
        result("yield", "Utbytteavkastning", (dps / kurs) * 100, {
          kind: "percent",
          digits: 2,
          primary: true,
        }),
      ];
    },
  },
  {
    slug: "utbetalingsgrad",
    title: "Utbetalingsgrad (payout ratio)",
    shortTitle: "Payout",
    description:
      "Se hvor stor andel av resultatet som betales som utbytte (DPS / EPS).",
    category: "okonomi",
    tags: ["payout", "utbetalingsgrad", "utbytte", "eps", "dps", "aksje"],
    fields: [
      {
        id: "dps",
        label: "Utbytte per aksje (DPS)",
        type: "number",
        unit: "kr",
        defaultValue: 6,
        step: 0.01,
      },
      {
        id: "eps",
        label: "EPS",
        type: "number",
        unit: "kr",
        defaultValue: 10,
        step: 0.01,
        allowNegative: true,
      },
    ],
    formula: "payout = DPS / EPS · 100 %",
    explanation:
      "Under 100 % betyr at noe resultat beholdes i selskapet. Over 100 % kan bety utbytte finansiert av egenkapital eller engangseffekter. Ved EPS ≤ 0 vises N/A.",
    disclaimer: "Negativ eller null EPS gjør ratioen lite meningsfull.",
    compute(input) {
      const dps = num(input, "dps");
      const eps = num(input, "eps");
      if (!allNumbers([dps, eps])) return [];
      if (eps <= 0) {
        return [
          result("payout", "Utbetalingsgrad", "N/A", {
            kind: "text",
            primary: true,
            hint: "Payout ratio krever positiv EPS.",
          }),
        ];
      }
      return [
        result("payout", "Utbetalingsgrad", (dps / eps) * 100, {
          kind: "percent",
          digits: 1,
          primary: true,
        }),
        result("tilbake", "Tilbakeholdt andel", (1 - dps / eps) * 100, {
          kind: "percent",
          digits: 1,
        }),
      ];
    },
  },
  {
    slug: "markedsverdi",
    title: "Markedsverdi (market cap)",
    shortTitle: "Market cap",
    description: "Regn ut selskapets markedsverdi: aksjekurs × antall aksjer.",
    category: "okonomi",
    tags: ["market cap", "markedsverdi", "aksje", "verdsettelse"],
    popular: true,
    fields: [
      {
        id: "kurs",
        label: "Aksjekurs",
        type: "number",
        unit: "kr",
        defaultValue: 150,
      },
      {
        id: "aksjer",
        label: "Antall aksjer",
        type: "number",
        defaultValue: 250_000_000,
      },
    ],
    formula: "market cap = aksjekurs · antall aksjer",
    explanation:
      "Markedsverdi er egenkapitalens pris i markedet. Enterprise value (EV) legger til netto gjeld og er ofte bedre for sammenligning på tvers av kapitalstruktur.",
    compute(input) {
      const kurs = num(input, "kurs");
      const aksjer = num(input, "aksjer");
      if (!allNumbers([kurs, aksjer]) || kurs < 0 || aksjer <= 0) return [];
      const mcap = kurs * aksjer;
      return [
        result("mcap", "Markedsverdi", mcap, {
          kind: "currency",
          primary: true,
        }),
        result("mrd", "I milliarder", mcap / 1e9, { digits: 2, unit: "mrd kr" }),
      ];
    },
  },
  {
    slug: "pb-ratio",
    title: "P/B-kalkulator",
    shortTitle: "P/B",
    description:
      "Regn ut P/B (price/book): aksjekurs delt på bokført egenkapital per aksje.",
    category: "okonomi",
    tags: ["pb", "p/b", "price to book", "bokført verdi", "aksje"],
    fields: [
      {
        id: "kurs",
        label: "Aksjekurs",
        type: "number",
        unit: "kr",
        defaultValue: 150,
      },
      {
        id: "bvps",
        label: "Bokført EK per aksje",
        type: "number",
        unit: "kr",
        defaultValue: 80,
        step: 0.01,
        hint: "Egenkapital / antall aksjer.",
      },
    ],
    formula: "P/B = aksjekurs / bokført EK per aksje",
    explanation:
      "P/B under 1 kan bety at markedet priser under bokført verdi – eller at balansen er overvurdert. Nyttig for banker og kapitalintensive selskaper.",
    disclaimer: "Immaterielle verdier og IFRS-regler påvirker bokført EK.",
    compute(input) {
      const kurs = num(input, "kurs");
      const bvps = num(input, "bvps");
      if (!allNumbers([kurs, bvps]) || kurs <= 0 || bvps <= 0) return [];
      return [
        result("pb", "P/B", kurs / bvps, { digits: 2, primary: true }),
      ];
    },
  },
  {
    slug: "roe",
    title: "ROE-kalkulator",
    shortTitle: "ROE",
    description:
      "Regn ut egenkapitalrentabilitet (ROE): resultat / gjennomsnittlig egenkapital.",
    category: "okonomi",
    tags: ["roe", "egenkapitalrentabilitet", "aksje", "lønnsomhet"],
    fields: [
      {
        id: "resultat",
        label: "Årsresultat",
        type: "number",
        unit: "kr",
        defaultValue: 2_500_000_000,
        allowNegative: true,
      },
      {
        id: "ekStart",
        label: "Egenkapital ved årets start",
        type: "number",
        unit: "kr",
        defaultValue: 20_000_000_000,
      },
      {
        id: "ekSlutt",
        label: "Egenkapital ved årets slutt",
        type: "number",
        unit: "kr",
        defaultValue: 22_000_000_000,
      },
    ],
    formula: "ROE = resultat / ((EK_start + EK_slutt) / 2) · 100 %",
    explanation:
      "ROE viser avkastning på eiernes kapital. Høy ROE kan komme av god drift eller høy gearing – sjekk også ROA og gjeldsgrad.",
    disclaimer: "Engangsposter kan fordreie ettårs-ROE.",
    compute(input) {
      const resultat = num(input, "resultat");
      const ekStart = num(input, "ekStart");
      const ekSlutt = num(input, "ekSlutt");
      if (!allNumbers([resultat, ekStart, ekSlutt])) return [];
      const snitt = (ekStart + ekSlutt) / 2;
      if (snitt <= 0) return [];
      return [
        result("roe", "ROE", (resultat / snitt) * 100, {
          kind: "percent",
          digits: 2,
          primary: true,
        }),
        result("snittEk", "Gjennomsnittlig EK", snitt, { kind: "currency" }),
      ];
    },
  },
  {
    slug: "gearing",
    title: "Gjeldsgrad / gearing",
    shortTitle: "Gearing",
    description:
      "Regn ut gjeldsgrad: total gjeld i forhold til egenkapital (og eventuelt totalkapital).",
    category: "okonomi",
    tags: ["gearing", "gjeldsgrad", "debt to equity", "aksje", "balanse"],
    fields: [
      {
        id: "gjeld",
        label: "Total gjeld",
        type: "number",
        unit: "kr",
        defaultValue: 15_000_000_000,
      },
      {
        id: "ek",
        label: "Egenkapital",
        type: "number",
        unit: "kr",
        defaultValue: 22_000_000_000,
      },
      {
        id: "eiendeler",
        label: "Totale eiendeler (valgfritt)",
        type: "number",
        unit: "kr",
        defaultValue: 37_000_000_000,
        hint: "Fylles ut for debt / assets.",
      },
    ],
    formula: "D/E = gjeld / EK     debt ratio = gjeld / eiendeler",
    explanation:
      "Debt-to-equity (gearing) viser hvor mye fremmedkapital som står bak hver krone egenkapital. Bransjenormer varierer sterkt.",
    disclaimer: "Definisjoner av «gjeld» varierer (rentebærende vs. total).",
    compute(input) {
      const gjeld = num(input, "gjeld");
      const ek = num(input, "ek");
      const eiendeler = num(input, "eiendeler");
      if (!allNumbers([gjeld, ek]) || ek <= 0) return [];
      const out = [
        result("de", "Gjeldsgrad (D/E)", (gjeld / ek) * 100, {
          kind: "percent",
          digits: 1,
          primary: true,
        }),
        result("deRatio", "D/E som desimal", gjeld / ek, { digits: 2 }),
      ];
      if (Number.isFinite(eiendeler) && eiendeler > 0) {
        out.push(
          result("da", "Debt / assets", (gjeld / eiendeler) * 100, {
            kind: "percent",
            digits: 1,
          }),
        );
      }
      return out;
    },
  },
  {
    slug: "net-debt-ebitda",
    title: "Net debt / EBITDA",
    shortTitle: "Net debt/EBITDA",
    description:
      "Mål belåning relativt til driftsresultat før avskrivninger: netto gjeld / EBITDA.",
    category: "okonomi",
    tags: ["net debt", "ebitda", "gearing", "aksje", "kredittrisiko"],
    fields: [
      {
        id: "gjeld",
        label: "Rentebærende gjeld",
        type: "number",
        unit: "kr",
        defaultValue: 12_000_000_000,
      },
      {
        id: "kontanter",
        label: "Kontanter og likvider",
        type: "number",
        unit: "kr",
        defaultValue: 3_000_000_000,
      },
      {
        id: "ebitda",
        label: "EBITDA",
        type: "number",
        unit: "kr",
        defaultValue: 4_000_000_000,
        allowNegative: true,
      },
    ],
    formula: "netto gjeld = rentebærende gjeld − kontanter     ratio = netto gjeld / EBITDA",
    explanation:
      "Vanlig nøkkeltall for hvor mange år med EBITDA som trengs for å betale netto gjeld. Negativ netto gjeld betyr nettokasse. Ved EBITDA ≤ 0 vises ikke vanlig multippel (N/A).",
    disclaimer: "Leasing (IFRS 16) og definisjon av EBITDA påvirker tallet.",
    compute(input) {
      const gjeld = num(input, "gjeld");
      const kontanter = num(input, "kontanter");
      const ebitda = num(input, "ebitda");
      if (!allNumbers([gjeld, kontanter, ebitda])) return [];
      const netDebt = gjeld - kontanter;
      if (ebitda <= 0) {
        return [
          result("ratio", "Net debt / EBITDA", "N/A", {
            kind: "text",
            primary: true,
            hint: "Multippel krever positiv EBITDA.",
          }),
          result("netDebt", "Netto gjeld", netDebt, { kind: "currency" }),
        ];
      }
      return [
        result("ratio", "Net debt / EBITDA", netDebt / ebitda, {
          digits: 2,
          primary: true,
        }),
        result("netDebt", "Netto gjeld", netDebt, { kind: "currency" }),
      ];
    },
  },
  {
    slug: "enterprise-value",
    title: "Enterprise Value (EV)",
    shortTitle: "EV",
    description:
      "Finn enterprise value: markedsverdi + netto gjeld (markedsverdi av hele driftsvirksomheten).",
    category: "okonomi",
    tags: [
      "enterprise value",
      "ev",
      "markedsverdi",
      "netto gjeld",
      "aksje",
      "verdsettelse",
    ],
    popular: true,
    fields: [
      {
        id: "mcap",
        label: "Markedsverdi (equity)",
        type: "number",
        unit: "kr",
        defaultValue: 37_500_000_000,
      },
      {
        id: "gjeld",
        label: "Rentebærende gjeld",
        type: "number",
        unit: "kr",
        defaultValue: 12_000_000_000,
      },
      {
        id: "kontanter",
        label: "Kontanter og likvider",
        type: "number",
        unit: "kr",
        defaultValue: 3_000_000_000,
      },
    ],
    formula: "EV = market cap + rentebærende gjeld − kontanter",
    explanation:
      "EV er det du i praksis «betaler» for hele virksomheten ved oppkjøp av egenkapital pluss overtakelse av netto gjeld. Brukes i EV/EBITDA.",
    disclaimer: "Minorities, preferanseaksjer og pensjonsforpliktelser kan også inngå i full EV.",
    compute(input) {
      const mcap = num(input, "mcap");
      const gjeld = num(input, "gjeld");
      const kontanter = num(input, "kontanter");
      if (!allNumbers([mcap, gjeld, kontanter])) return [];
      const netDebt = gjeld - kontanter;
      const ev = mcap + netDebt;
      return [
        result("ev", "Enterprise value", ev, {
          kind: "currency",
          primary: true,
        }),
        result("netDebt", "Netto gjeld", netDebt, { kind: "currency" }),
      ];
    },
  },
  {
    slug: "ev-ebitda",
    title: "EV/EBITDA",
    shortTitle: "EV/EBITDA",
    description:
      "Verdsettelsesmultippel: enterprise value delt på EBITDA.",
    category: "okonomi",
    tags: ["ev/ebitda", "enterprise value", "multippel", "aksje", "verdsettelse"],
    popular: true,
    fields: [
      {
        id: "ev",
        label: "Enterprise value",
        type: "number",
        unit: "kr",
        defaultValue: 46_500_000_000,
      },
      {
        id: "ebitda",
        label: "EBITDA",
        type: "number",
        unit: "kr",
        defaultValue: 4_000_000_000,
        allowNegative: true,
      },
    ],
    formula: "EV/EBITDA = EV / EBITDA",
    explanation:
      "Sammenligner selskaper uavhengig av kapitalstruktur bedre enn P/E alene. Ved EBITDA ≤ 0 er multippelen ikke meningsfull og vises som N/A.",
    disclaimer: "Ikke investeringsråd. Bransje og vekst påvirker «normal» multippel.",
    compute(input) {
      const ev = num(input, "ev");
      const ebitda = num(input, "ebitda");
      if (!allNumbers([ev, ebitda])) return [];
      if (ebitda <= 0) {
        return [
          result("mult", "EV/EBITDA", "N/A", {
            kind: "text",
            primary: true,
            hint: "Multippel krever positiv EBITDA.",
          }),
        ];
      }
      return [
        result("mult", "EV/EBITDA", ev / ebitda, { digits: 2, primary: true }),
      ];
    },
  },
  {
    slug: "peg-ratio",
    title: "PEG-ratio",
    shortTitle: "PEG",
    description:
      "Sett P/E i forhold til forventet resultatvekst (PEG = P/E / vekst%).",
    category: "okonomi",
    tags: ["peg", "pe growth", "vekst", "aksje", "verdsettelse"],
    fields: [
      {
        id: "pe",
        label: "P/E",
        type: "number",
        defaultValue: 15,
        step: 0.1,
      },
      {
        id: "vekst",
        label: "Forventet årlig EPS-vekst",
        type: "number",
        unit: "%",
        defaultValue: 12,
        step: 0.1,
        hint: "F.eks. 12 for 12 % årlig vekst (ikke 0,12).",
      },
    ],
    formula: "PEG = (P/E) / vekst%",
    explanation:
      "En PEG nær 1 tolkes ofte som «rimelig» relativ til vekst, men tommelfingerregelen er grov. Krever positiv P/E og positiv forventet EPS-vekst; ellers N/A.",
    disclaimer: "Vekstestimater er usikre. PEG ignorerer risiko og kvalitet.",
    compute(input) {
      const pe = num(input, "pe");
      const vekst = num(input, "vekst");
      if (!allNumbers([pe, vekst])) return [];
      if (pe <= 0 || vekst <= 0) {
        return [
          result("peg", "PEG", "N/A", {
            kind: "text",
            primary: true,
            hint: "PEG krever positiv P/E og positiv EPS-vekst.",
          }),
        ];
      }
      return [
        result("peg", "PEG", pe / vekst, { digits: 2, primary: true }),
      ];
    },
  },
  {
    slug: "totalavkastning-aksje",
    title: "Totalavkastning på aksje",
    shortTitle: "Totalavkastning",
    description:
      "Regn ut totalavkastning: kursgevinst (eller tap) pluss mottatt utbytte.",
    category: "okonomi",
    tags: [
      "totalavkastning",
      "total return",
      "aksje",
      "utbytte",
      "kursgevinst",
    ],
    fields: [
      {
        id: "kjop",
        label: "Kjøpskurs",
        type: "number",
        unit: "kr",
        defaultValue: 120,
      },
      {
        id: "salg",
        label: "Salgs-/nåværende kurs",
        type: "number",
        unit: "kr",
        defaultValue: 150,
      },
      {
        id: "utbytte",
        label: "Utbytte mottatt per aksje",
        type: "number",
        unit: "kr",
        defaultValue: 8,
        step: 0.01,
      },
    ],
    formula: "total = (salg − kjøp + utbytte) / kjøp · 100 %",
    explanation:
      "Totalavkastning inkluderer både prisendring og utbytte. Uten utbytte er det ren kursavkastning (price return).",
    disclaimer: "Kurtasje, skatt og valuta er ikke med.",
    compute(input) {
      const kjop = num(input, "kjop");
      const salg = num(input, "salg");
      const utbytte = num(input, "utbytte");
      if (!allNumbers([kjop, salg, utbytte]) || kjop <= 0) return [];
      const kursGevinst = salg - kjop;
      const totalKr = kursGevinst + utbytte;
      return [
        result("total", "Totalavkastning", (totalKr / kjop) * 100, {
          kind: "percent",
          digits: 2,
          primary: true,
        }),
        result("kurs", "Kursavkastning", (kursGevinst / kjop) * 100, {
          kind: "percent",
          digits: 2,
        }),
        result("kroner", "Gevinst per aksje", totalKr, {
          kind: "currency",
          digits: 2,
        }),
      ];
    },
  },
  {
    slug: "snittkurs-aksje",
    title: "Gjennomsnittlig kjøpspris (aksjer)",
    shortTitle: "Snittkurs",
    description:
      "Finn vektingssnitt av kjøpskurs når du har kjøpt aksjer flere ganger.",
    category: "okonomi",
    tags: [
      "snittkurs",
      "gjennomsnittskurs",
      "cost basis",
      "aksje",
      "portefølje",
    ],
    popular: true,
    fields: [
      {
        id: "kjop",
        label: "Kjøp (antall:kurs)",
        type: "text",
        defaultValue: "100:150; 50:160; 80:140",
        hint: "Skill kjøp med semikolon. Eksempel: 100:150; 50:160,5",
      },
    ],
    formula: "snitt = Σ(antall · kurs) / Σ antall",
    explanation:
      "Volumvektet snittkurs (cost basis) brukes til gevinstberegning. Format: antall:kurs, atskilt med semikolon.",
    disclaimer: "Kurtasje er ikke inkludert – legg den inn i kursen manuelt om ønskelig.",
    compute(input) {
      const lots = parseShareLots(input.kjop);
      if (lots.length === 0) return [];
      const aksjer = lots.reduce((a, l) => a + l.qty, 0);
      const kost = lots.reduce((a, l) => a + l.qty * l.price, 0);
      return [
        result("snitt", "Gjennomsnittlig kjøpspris", kost / aksjer, {
          digits: 4,
          unit: "kr",
          primary: true,
        }),
        result("aksjer", "Totalt antall aksjer", aksjer, { kind: "integer" }),
        result("kost", "Total kostpris", kost, { kind: "currency", digits: 2 }),
      ];
    },
  },
  {
    slug: "break-even-kurtasje",
    title: "Break-even-kurs etter kurtasje",
    shortTitle: "Break-even kurtasje",
    description:
      "Finn salgskursen du trenger for å gå i null etter kjøps- og salgskurtasje.",
    category: "okonomi",
    tags: ["break-even", "kurtasje", "courtage", "aksje", "megler"],
    fields: [
      {
        id: "kjop",
        label: "Kjøpskurs",
        type: "number",
        unit: "kr",
        defaultValue: 150,
      },
      {
        id: "aksjer",
        label: "Antall aksjer",
        type: "number",
        defaultValue: 100,
      },
      {
        id: "kurtasjeKjop",
        label: "Kurtasje ved kjøp",
        type: "number",
        unit: "kr",
        defaultValue: 49,
      },
      {
        id: "kurtasjeSalg",
        label: "Kurtasje ved salg",
        type: "number",
        unit: "kr",
        defaultValue: 49,
      },
    ],
    formula: "break-even = (kjøpskurs · n + kurtasje_kjøp + kurtasje_salg) / n",
    explanation:
      "Du må dekke både inn- og utkurtasje. Ved prosentkurtasje: regn om til kroner først, eller bruk meglerens gebyrkalkulator.",
    disclaimer: "Skatt og valutapåslag er ikke med.",
    compute(input) {
      const kjop = num(input, "kjop");
      const aksjer = num(input, "aksjer");
      const kKjop = num(input, "kurtasjeKjop");
      const kSalg = num(input, "kurtasjeSalg");
      if (
        !allNumbers([kjop, aksjer, kKjop, kSalg]) ||
        aksjer <= 0 ||
        kjop <= 0
      ) {
        return [];
      }
      const be = (kjop * aksjer + kKjop + kSalg) / aksjer;
      return [
        result("be", "Break-even salgskurs", be, {
          digits: 4,
          unit: "kr",
          primary: true,
        }),
        result("spread", "Kursløft nødvendig", be - kjop, {
          digits: 4,
          unit: "kr",
        }),
        result("pct", "I prosent", ((be - kjop) / kjop) * 100, {
          kind: "percent",
          digits: 3,
        }),
      ];
    },
  },
  {
    slug: "utbytteinntekt",
    title: "Utbytteinntekt",
    shortTitle: "Utbytteinntekt",
    description:
      "Se hvor mye utbytte du får med et gitt antall aksjer og DPS.",
    category: "okonomi",
    tags: ["utbytte", "utbytteinntekt", "dps", "passiv inntekt", "aksje"],
    fields: [
      {
        id: "aksjer",
        label: "Antall aksjer",
        type: "number",
        defaultValue: 200,
      },
      {
        id: "dps",
        label: "Utbytte per aksje (årlig)",
        type: "number",
        unit: "kr",
        defaultValue: 6,
        step: 0.01,
      },
      {
        id: "kurs",
        label: "Aksjekurs (valgfritt)",
        type: "number",
        unit: "kr",
        defaultValue: 150,
        hint: "Brukes til yield på porteføljen.",
      },
    ],
    formula: "utbytte = antall aksjer · DPS",
    explanation:
      "Enkel kontantstrøm før skatt. Norske aksjeutbytter beskattes etter gjeldende skjermings- og aksjonærregler.",
    disclaimer: "Ikke skatteråd. Utbytte kan endres eller kuttes.",
    compute(input) {
      const aksjer = num(input, "aksjer");
      const dps = num(input, "dps");
      const kurs = num(input, "kurs");
      if (!allNumbers([aksjer, dps]) || aksjer < 0) return [];
      const arlig = aksjer * dps;
      const out = [
        result("arlig", "Årlig utbytte", arlig, {
          kind: "currency",
          digits: 2,
          primary: true,
        }),
        result("kvartal", "Per kvartal (jevn)", arlig / 4, {
          kind: "currency",
          digits: 2,
        }),
        result("maaned", "Per måned (jevn)", arlig / 12, {
          kind: "currency",
          digits: 2,
        }),
      ];
      if (Number.isFinite(kurs) && kurs > 0 && aksjer > 0) {
        out.push(
          result("yield", "Yield på posisjonen", (dps / kurs) * 100, {
            kind: "percent",
            digits: 2,
          }),
          result("verdi", "Posisjonsverdi", aksjer * kurs, {
            kind: "currency",
          }),
        );
      }
      return out;
    },
  },
  {
    slug: "cagr-aksje",
    title: "CAGR på aksjeinvestering",
    shortTitle: "Aksje-CAGR",
    description:
      "Finn annualisert avkastning (CAGR) mellom kjøpskurs og sluttkurs over tid.",
    category: "okonomi",
    tags: [
      "cagr",
      "aksje",
      "annualisert avkastning",
      "kjøpskurs",
      "sluttkurs",
      "nasdaq",
    ],
    fields: [
      {
        id: "kjop",
        label: "Kjøpskurs",
        type: "number",
        unit: "kr",
        defaultValue: 100,
      },
      {
        id: "salg",
        label: "Sluttkurs / salgskurs",
        type: "number",
        unit: "kr",
        defaultValue: 180,
      },
      {
        id: "aar",
        label: "Antall år",
        type: "number",
        unit: "år",
        defaultValue: 5,
        step: 0.1,
      },
      {
        id: "utbytte",
        label: "Totalt utbytte per aksje (valgfritt)",
        type: "number",
        unit: "kr",
        defaultValue: 0,
        hint: "Sum mottatt utbytte i perioden. Legges til sluttverdien.",
      },
    ],
    formula: "CAGR = (slutt / start)^(1/n) − 1",
    explanation:
      "CAGR er den jevne årlige vekstraten som tar deg fra kjøpskurs til sluttverdi. Nasdaq og andre indeksleverandører bruker samme sammensatte annualisering. Valgfritt utbytte modelleres som om det ble lagt til ved slutten (forenkling).",
    disclaimer: "Reinvestert utbytte underveis gir høyere faktisk CAGR enn engangstillegg.",
    compute(input) {
      const kjop = num(input, "kjop");
      const salg = num(input, "salg");
      const aar = num(input, "aar");
      const utbytte = num(input, "utbytte");
      const div = Number.isFinite(utbytte) ? utbytte : 0;
      if (!allNumbers([kjop, salg, aar]) || kjop <= 0 || aar <= 0) return [];
      const slutt = salg + div;
      if (slutt <= 0) return [];
      const cagr = (Math.pow(slutt / kjop, 1 / aar) - 1) * 100;
      return [
        result("cagr", "CAGR", cagr, {
          kind: "percent",
          digits: 2,
          primary: true,
        }),
        result("total", "Total avkastning", ((slutt - kjop) / kjop) * 100, {
          kind: "percent",
          digits: 2,
        }),
        result("gevinst", "Gevinst per aksje", slutt - kjop, {
          kind: "currency",
          digits: 2,
        }),
      ];
    },
  },
];
