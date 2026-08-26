import type { Calculator } from "../types";
import { num } from "../format";
import { allNumbers, result } from "../helpers";

/** Approximate human-age equivalent for dogs (AAHA-inspired piecewise). */
function dogToHuman(years: number, size: string): number {
  if (years <= 0) return 0;
  if (years <= 1) return 15;
  if (years <= 2) return 15 + 9 * (years - 1);
  const perYear = size === "stor" ? 7 : size === "medium" ? 6 : 5;
  return 24 + (years - 2) * perYear;
}

function catToHuman(years: number): number {
  if (years <= 0) return 0;
  if (years <= 1) return 15;
  if (years <= 2) return 15 + 9 * (years - 1);
  return 24 + (years - 2) * 4;
}

export const dyrCalculators: Calculator[] = [
  {
    slug: "hundealder",
    title: "Hundealder",
    description:
      "Omregn hundens alder til omtrentlig menneskeår – med størrelse.",
    category: "dyr",
    tags: ["hund", "alder", "kjæledyr"],
    popular: true,
    fields: [
      {
        id: "aar",
        label: "Hundens alder",
        type: "number",
        unit: "år",
        defaultValue: 5,
        step: 0.5,
      },
      {
        id: "storrelse",
        label: "Størrelse",
        type: "select",
        defaultValue: "medium",
        options: [
          { value: "liten", label: "Liten (under ca. 10 kg)" },
          { value: "medium", label: "Mellomstor" },
          { value: "stor", label: "Stor / gigant" },
        ],
      },
    ],
    formula: "1. år ≈ 15     2. år ≈ +9     deretter +5–7 per år",
    explanation:
      "Den gamle «×7»-regelen er for grov. Store hunder eldes raskere i voksen alder enn små.",
    disclaimer: "Tommelfingerregel, ikke veterinærmedisinsk vurdering.",
    compute(input) {
      const aar = num(input, "aar");
      if (!Number.isFinite(aar) || aar < 0) return [];
      const human = dogToHuman(aar, input.storrelse ?? "medium");
      return [
        result("human", "Omtrentlig menneskeår", human, {
          digits: 1,
          unit: "år",
          primary: true,
        }),
      ];
    },
  },
  {
    slug: "kattealder",
    title: "Kattealder",
    description: "Omregn kattens alder til omtrentlig menneskeår.",
    category: "dyr",
    tags: ["katt", "alder", "kjæledyr"],
    fields: [
      {
        id: "aar",
        label: "Kattens alder",
        type: "number",
        unit: "år",
        defaultValue: 4,
        step: 0.5,
      },
    ],
    formula: "1. år ≈ 15     2. år ≈ 24     deretter +4 per år",
    explanation:
      "Katter blir «voksne» raskt de første to årene, deretter saktere enn mange hunderaser.",
    disclaimer: "Tommelfingerregel, ikke veterinærmedisinsk vurdering.",
    compute(input) {
      const aar = num(input, "aar");
      if (!Number.isFinite(aar) || aar < 0) return [];
      return [
        result("human", "Omtrentlig menneskeår", catToHuman(aar), {
          digits: 1,
          unit: "år",
          primary: true,
        }),
      ];
    },
  },
  {
    slug: "for-kjaledyr",
    title: "Fôrmengde (enkel)",
    shortTitle: "Fôr",
    description:
      "Anslå daglig tørrfôr fra kroppsvekt og en veiledende gramm per kg.",
    category: "dyr",
    tags: ["fôr", "hund", "katt", "kjæledyr"],
    fields: [
      {
        id: "vekt",
        label: "Kroppsvekt",
        type: "number",
        unit: "kg",
        defaultValue: 12,
      },
      {
        id: "gPerKg",
        label: "Gram fôr per kg kroppsvekt",
        type: "number",
        unit: "g/kg",
        defaultValue: 20,
        hint: "Sjekk fôrsekken. Typisk grovt anslag 15–30 g/kg for mange tørrfôr.",
      },
      {
        id: "maler",
        label: "Antall måltider",
        type: "number",
        defaultValue: 2,
      },
    ],
    formula: "daglig = vekt · g/kg",
    explanation:
      "Produsentens tabell og aktivitetsnivå er viktigere enn en generell formel. Bruk dette som startpunkt.",
    disclaimer: "Ikke erstatning for veterinær eller fôrprodusentens anbefaling.",
    compute(input) {
      const vekt = num(input, "vekt");
      const g = num(input, "gPerKg");
      const maler = num(input, "maler");
      if (!allNumbers([vekt, g, maler]) || vekt <= 0 || g <= 0 || maler <= 0) {
        return [];
      }
      const daglig = vekt * g;
      return [
        result("dag", "Per dag", daglig, {
          digits: 0,
          unit: "g",
          primary: true,
        }),
        result("per", "Per måltid", daglig / maler, { digits: 0, unit: "g" }),
      ];
    },
  },
  {
    slug: "akvarium-volum",
    title: "Akvarievolum",
    description: "Regn ut vannvolum i liter for et rektangulært akvarium.",
    category: "dyr",
    tags: ["akvarium", "liter", "fisk"],
    fields: [
      {
        id: "l",
        label: "Lengde",
        type: "number",
        unit: "cm",
        defaultValue: 100,
      },
      {
        id: "b",
        label: "Bredde",
        type: "number",
        unit: "cm",
        defaultValue: 40,
      },
      {
        id: "h",
        label: "Vannhøyde",
        type: "number",
        unit: "cm",
        defaultValue: 40,
      },
      {
        id: "fyll",
        label: "Fyllingsgrad",
        type: "number",
        unit: "%",
        defaultValue: 90,
        hint: "Trekk fra for dekor, sand og luft under kanten.",
      },
    ],
    formula: "V (L) = L · B · H / 1000",
    explanation:
      "1 liter = 1000 cm³. Oppgi vannhøyde, ikke glasshøyde, hvis du vil ha faktisk vannmengde.",
    compute(input) {
      const l = num(input, "l");
      const b = num(input, "b");
      const h = num(input, "h");
      const fyll = num(input, "fyll");
      if (!allNumbers([l, b, h, fyll]) || l <= 0 || b <= 0 || h <= 0) return [];
      const liter = (l * b * h) / 1000;
      const effektiv = liter * (fyll / 100);
      return [
        result("eff", "Effektivt volum", effektiv, {
          digits: 1,
          unit: "L",
          primary: true,
        }),
        result("full", "Geometrisk volum", liter, { digits: 1, unit: "L" }),
      ];
    },
  },
];
