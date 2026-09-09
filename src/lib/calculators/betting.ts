import type { Calculator } from "../types";
import { num } from "../format";
import { allNumbers, result } from "../helpers";

function decimalToAmerican(d: number): number {
  if (d >= 2) return (d - 1) * 100;
  return -100 / (d - 1);
}

function gcd(a: number, b: number): number {
  let x = Math.abs(Math.round(a));
  let y = Math.abs(Math.round(b));
  while (y) {
    const t = y;
    y = x % y;
    x = t;
  }
  return x || 1;
}

/** Approximate decimal odds as a reduced fraction for display (e.g. 2.5 → 3/2). */
function decimalToFractional(d: number): string {
  const profit = d - 1;
  if (profit <= 0) return "–";
  const denom = 100;
  const nume = Math.round(profit * denom);
  const g = gcd(nume, denom);
  return `${nume / g}/${denom / g}`;
}

function formatAmerican(a: number): string {
  if (!Number.isFinite(a)) return "–";
  const rounded = Math.round(a);
  return rounded > 0 ? `+${rounded}` : String(rounded);
}

export const bettingCalculators: Calculator[] = [
  {
    slug: "odds-kalkulator",
    title: "Oddskalkulator",
    shortTitle: "Odds",
    description:
      "Regn ut utbetaling og gevinst fra desimalodds og innsats, pluss implisitt sannsynlighet og omregning til amerikanske odds.",
    category: "okonomi",
    tags: [
      "odds",
      "oddskalkulator",
      "betting",
      "tipping",
      "utbetaling",
      "desimalodds",
      "implisitt sannsynlighet",
    ],
    popular: true,
    fields: [
      {
        id: "odds",
        label: "Desimalodds",
        type: "number",
        defaultValue: 2.1,
        step: 0.01,
        hint: "F.eks. 2,10. Odds under 1,01 er ugyldig.",
      },
      {
        id: "innsats",
        label: "Innsats",
        type: "number",
        unit: "kr",
        defaultValue: 100,
      },
    ],
    formula: "utbetaling = innsats · odds     implisitt p = 1 / odds",
    explanation:
      "Desimalodds er standard i Norge. Utbetaling inkluderer innsatsen; nettogevinst er utbetaling minus innsats. Implisitt sannsynlighet er bookmakerens «innebygde» sannsynlighet før margin på tvers av utfall.",
    disclaimer:
      "Spillansvarlig. Kalkulatoren er matematikk, ikke tips. Du må være 18+ for pengespill i Norge.",
    compute(input) {
      const odds = num(input, "odds");
      const innsats = num(input, "innsats");
      if (!allNumbers([odds, innsats]) || odds <= 1 || innsats < 0) return [];
      const utbetaling = innsats * odds;
      const gevinst = utbetaling - innsats;
      const implied = (1 / odds) * 100;
      const american = decimalToAmerican(odds);
      return [
        result("utbetaling", "Utbetaling", utbetaling, {
          kind: "currency",
          digits: 2,
          primary: true,
        }),
        result("gevinst", "Nettogevinst", gevinst, {
          kind: "currency",
          digits: 2,
        }),
        result("implied", "Implisitt sannsynlighet", implied, {
          kind: "percent",
          digits: 2,
        }),
        result("american", "Amerikanske odds", formatAmerican(american), {
          kind: "text",
        }),
        result("fractional", "Brøkodds (ca.)", decimalToFractional(odds), {
          kind: "text",
        }),
      ];
    },
  },
  {
    slug: "verdibett",
    title: "Verdibett og forventet verdi",
    shortTitle: "Verdibett",
    description:
      "Sjekk om et tips har positiv forventet verdi: din sannsynlighet mot bookmakerens odds.",
    category: "okonomi",
    tags: [
      "verdibett",
      "value bet",
      "forventet verdi",
      "ev",
      "betting",
      "edge",
      "odds",
    ],
    fields: [
      {
        id: "odds",
        label: "Desimalodds",
        type: "number",
        defaultValue: 2.5,
        step: 0.01,
      },
      {
        id: "sannsynlighet",
        label: "Din sannsynlighet",
        type: "number",
        unit: "%",
        defaultValue: 45,
        min: 0,
        max: 100,
        step: 0.1,
        hint: "Din egen vurdering av at tipset går inn (0–100 %).",
      },
      {
        id: "innsats",
        label: "Innsats",
        type: "number",
        unit: "kr",
        defaultValue: 100,
      },
    ],
    formula: "EV = innsats · (p · odds − 1)     edge = p − 1/odds",
    explanation:
      "Forventet verdi (EV) er snittet du «tjener» per spill hvis vurderingen din er riktig over tid. Positiv EV betyr verdibett på papiret – men estimatet av p er usikkert, og bookmakeren har margin.",
    disclaimer:
      "Spillansvarlig. Positiv EV er ikke garanti for gevinst. Du må være 18+ for pengespill i Norge.",
    compute(input) {
      const odds = num(input, "odds");
      const pct = num(input, "sannsynlighet");
      const innsats = num(input, "innsats");
      if (
        !allNumbers([odds, pct, innsats]) ||
        odds <= 1 ||
        pct < 0 ||
        pct > 100 ||
        innsats < 0
      ) {
        return [];
      }
      const p = pct / 100;
      const implied = 1 / odds;
      const evPerUnit = p * odds - 1;
      const ev = innsats * evPerUnit;
      const edge = (p - implied) * 100;
      const fairOdds = p > 0 ? 1 / p : Number.NaN;
      const status =
        evPerUnit > 1e-9
          ? "Positiv EV (verdibett på papiret)"
          : evPerUnit < -1e-9
            ? "Negativ EV (ikke verdi)"
            : "Break-even EV";
      return [
        result("ev", "Forventet verdi", ev, {
          kind: "currency",
          digits: 2,
          primary: true,
        }),
        result("evPct", "EV i % av innsats", evPerUnit * 100, {
          kind: "percent",
          digits: 2,
        }),
        result("edge", "Edge vs. implisitt", edge, {
          kind: "percent",
          digits: 2,
        }),
        result("implied", "Implisitt sannsynlighet", implied * 100, {
          kind: "percent",
          digits: 2,
        }),
        result("fair", "Fair odds (fra din p)", fairOdds, { digits: 3 }),
        result("status", "Vurdering", status, { kind: "text" }),
      ];
    },
  },
  {
    slug: "bankroll-kelly",
    title: "Bankroll-kalkulator (Kelly)",
    shortTitle: "Bankroll / Kelly",
    description:
      "Finn anbefalt innsatsandel av bankrollen med Kelly-kriteriet – med valgfri fraksjon for lavere risiko.",
    category: "okonomi",
    tags: [
      "bankroll",
      "kelly",
      "kelly criterion",
      "innsats",
      "staking",
      "betting",
      "risikostyring",
      "spillansvar",
    ],
    popular: true,
    fields: [
      {
        id: "bankroll",
        label: "Bankroll",
        type: "number",
        unit: "kr",
        defaultValue: 5000,
        hint: "Penger satt av til spill – ikke levekostnader.",
      },
      {
        id: "odds",
        label: "Desimalodds",
        type: "number",
        defaultValue: 2.5,
        step: 0.01,
      },
      {
        id: "sannsynlighet",
        label: "Din sannsynlighet",
        type: "number",
        unit: "%",
        defaultValue: 45,
        min: 0,
        max: 100,
        step: 0.1,
        hint: "Overestimerer du p, blir innsatsen for høy. Vær konservativ.",
      },
      {
        id: "fraksjon",
        label: "Risikonivå (Kelly-andel)",
        type: "select",
        defaultValue: "0.5",
        options: [
          { value: "0.25", label: "Lav risiko – ¼ Kelly (anbefalt forsiktig)" },
          { value: "0.5", label: "Moderat – ½ Kelly (vanlig praksis)" },
          { value: "1", label: "Full Kelly (aggressivt, høy svingning)" },
        ],
      },
      {
        id: "tak",
        label: "Maks % av bankroll (valgfritt tak)",
        type: "number",
        unit: "%",
        defaultValue: 5,
        min: 0,
        max: 100,
        step: 0.5,
        hint: "Hardt tak uansett Kelly, f.eks. 5 %. Sett 0 for ingen tak.",
      },
    ],
    formula: "f* = (b·p − q) / b     innsats = fraksjon · f* · bankroll",
    explanation:
      "Kelly-kriteriet maksimerer langsiktig vekst hvis sannsynligheten er riktig. Full Kelly svinger hardt og straffer overoptimisme. De fleste bruker ¼–½ Kelly, pluss et absolutt tak (f.eks. 2–5 % av bankrollen) for å begrense enkelt-tap.",
    disclaimer:
      "Spillansvarlig. Kelly er ikke forsikring mot tap. Feil p → feil innsats. Spill kun med penger du har råd til å tape. 18+ for pengespill i Norge. Trenger du hjelp: hjelpelinjen.no / 800 800 40.",
    compute(input) {
      const bankroll = num(input, "bankroll");
      const odds = num(input, "odds");
      const pct = num(input, "sannsynlighet");
      const fraksjon = num(input, "fraksjon");
      const tak = num(input, "tak");
      if (
        !allNumbers([bankroll, odds, pct, fraksjon]) ||
        bankroll <= 0 ||
        odds <= 1 ||
        pct < 0 ||
        pct > 100 ||
        fraksjon <= 0 ||
        fraksjon > 1
      ) {
        return [];
      }
      const p = pct / 100;
      const q = 1 - p;
      const b = odds - 1;
      const fullKelly = (b * p - q) / b;
      if (fullKelly <= 0) {
        return [
          result(
            "status",
            "Anbefaling",
            "Ingen innsats – negativ eller null edge (ikke verdibett).",
            { kind: "text", primary: true },
          ),
          result("kelly", "Full Kelly", fullKelly * 100, {
            kind: "percent",
            digits: 2,
          }),
          result("implied", "Implisitt sannsynlighet", (1 / odds) * 100, {
            kind: "percent",
            digits: 2,
          }),
        ];
      }

      let andel = fullKelly * fraksjon;
      let capped = false;
      const takPct = Number.isFinite(tak) && tak > 0 ? tak / 100 : null;
      if (takPct != null && andel > takPct) {
        andel = takPct;
        capped = true;
      }
      // Never recommend more than 100% of bankroll
      if (andel > 1) andel = 1;

      const innsats = bankroll * andel;
      const etterTap = bankroll - innsats;
      const etterGevinst = bankroll - innsats + innsats * odds;
      const label =
        fraksjon >= 0.999
          ? "Full Kelly"
          : fraksjon <= 0.26
            ? "¼ Kelly"
            : "½ Kelly";

      return [
        result("innsats", "Anbefalt innsats", innsats, {
          kind: "currency",
          digits: 0,
          primary: true,
        }),
        result("andel", "Andel av bankroll", andel * 100, {
          kind: "percent",
          digits: 2,
        }),
        result("kelly", "Full Kelly (før fraksjon/tak)", fullKelly * 100, {
          kind: "percent",
          digits: 2,
        }),
        result("etterTap", "Bankroll hvis tap", etterTap, {
          kind: "currency",
          digits: 0,
        }),
        result("etterGevinst", "Bankroll hvis gevinst", etterGevinst, {
          kind: "currency",
          digits: 0,
        }),
        result(
          "status",
          "Risiko",
          capped
            ? `${label} ble begrenset av taket – lavere innsats for å begrense tap.`
            : `${label}-andel uten tak. Overestimerer du sannsynligheten, sats mindre.`,
          { kind: "text" },
        ),
      ];
    },
  },
];
