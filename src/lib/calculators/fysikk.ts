import type { Calculator } from "../types";
import { num } from "../format";
import { allNumbers, result } from "../helpers";

export const fysikkCalculators: Calculator[] = [
  {
    slug: "hastighet-strekning-tid",
    title: "Hastighet, strekning og tid",
    description: "Klassisk s = v · t. Oppgi to størrelser for å finne den tredje.",
    category: "fysikk",
    tags: ["fart", "strekning", "tid", "fysikk"],
    fields: [
      {
        id: "s",
        label: "Strekning (m)",
        type: "number",
        hint: "La stå tom for å finne strekning.",
      },
      {
        id: "v",
        label: "Hastighet (m/s)",
        type: "number",
        defaultValue: 12,
      },
      {
        id: "t",
        label: "Tid (s)",
        type: "number",
        defaultValue: 8,
      },
    ],
    formula: "s = v · t",
    explanation:
      "Ved konstant hastighet er strekningen farten ganger tiden. Bruk SI-enheter: meter, sekund, meter per sekund.",
    compute(input) {
      const s = num(input, "s");
      const v = num(input, "v");
      const t = num(input, "t");
      const filled = [s, v, t].filter(Number.isFinite).length;
      if (filled !== 2) {
        return [
          result("hint", "Fyll inn", "Oppgi nøyaktig to felt.", {
            kind: "text",
            primary: true,
          }),
        ];
      }
      if (Number.isFinite(v) && Number.isFinite(t))
        return [result("s", "Strekning", v * t, { digits: 4, unit: "m", primary: true })];
      if (Number.isFinite(s) && Number.isFinite(t) && t !== 0)
        return [result("v", "Hastighet", s / t, { digits: 4, unit: "m/s", primary: true })];
      if (Number.isFinite(s) && Number.isFinite(v) && v !== 0)
        return [result("t", "Tid", s / v, { digits: 4, unit: "s", primary: true })];
      return [];
    },
  },
  {
    slug: "kraft",
    title: "Kraft (Newtons 2. lov)",
    description: "F = m · a. Finn kraft, masse eller akselerasjon.",
    category: "fysikk",
    tags: ["newton", "kraft", "akselerasjon"],
    fields: [
      { id: "m", label: "Masse m (kg)", type: "number", defaultValue: 70 },
      {
        id: "a",
        label: "Akselerasjon a (m/s²)",
        type: "number",
        defaultValue: 9.81,
        hint: "Tyngdeakselerasjon ≈ 9,81 m/s².",
      },
    ],
    formula: "F = m · a",
    explanation:
      "Kraften i newton er masse ganger akselerasjon. Tyngden av et objekt nær bakken er m · g.",
    compute(input) {
      const m = num(input, "m");
      const a = num(input, "a");
      if (!allNumbers([m, a])) return [];
      return [
        result("f", "Kraft F", m * a, { digits: 2, unit: "N", primary: true }),
      ];
    },
  },
  {
    slug: "kinetisk-energi",
    title: "Kinetisk og potensiell energi",
    description: "Regn ut bevegelsesenergi og stillingsenergi.",
    category: "fysikk",
    tags: ["energi", "joule", "bevegelse"],
    fields: [
      { id: "m", label: "Masse", type: "number", unit: "kg", defaultValue: 2 },
      { id: "v", label: "Hastighet", type: "number", unit: "m/s", defaultValue: 10 },
      { id: "h", label: "Høyde", type: "number", unit: "m", defaultValue: 5 },
    ],
    formula: "Ek = ½mv²     Ep = mgh",
    explanation:
      "Kinetisk energi avhenger av farten i annen. Potensiell energi nær bakken avhenger av høyden. g = 9,81 m/s².",
    compute(input) {
      const m = num(input, "m");
      const v = num(input, "v");
      const h = num(input, "h");
      if (!allNumbers([m, v, h])) return [];
      const g = 9.81;
      return [
        result("ek", "Kinetisk energi", 0.5 * m * v * v, {
          digits: 2,
          unit: "J",
          primary: true,
        }),
        result("ep", "Potensiell energi", m * g * h, { digits: 2, unit: "J" }),
      ];
    },
  },
  {
    slug: "tetthet",
    title: "Tetthet",
    description: "ρ = m / V. Finn tetthet, masse eller volum.",
    category: "fysikk",
    tags: ["tetthet", "masse", "volum"],
    fields: [
      { id: "m", label: "Masse (kg)", type: "number", defaultValue: 1 },
      {
        id: "v",
        label: "Volum (m³)",
        type: "number",
        defaultValue: 0.001,
        hint: "1 liter = 0,001 m³.",
      },
    ],
    formula: "ρ = m / V",
    explanation:
      "Tetthet er masse per volum. Vann er omtrent 1000 kg/m³. Luft er rundt 1,2 kg/m³ ved romtemperatur.",
    compute(input) {
      const m = num(input, "m");
      const v = num(input, "v");
      if (!allNumbers([m, v]) || v === 0) return [];
      const rho = m / v;
      return [
        result("rho", "Tetthet", rho, {
          digits: 3,
          unit: "kg/m³",
          primary: true,
        }),
        result("gml", "I g/ml", rho / 1000, { digits: 4, unit: "g/ml" }),
      ];
    },
  },
  {
    slug: "effekt",
    title: "Effekt og energi",
    description: "P = E / t og E = P · t. Regn mellom watt, timer og kilowattimer.",
    category: "fysikk",
    tags: ["effekt", "watt", "kwh"],
    fields: [
      { id: "watt", label: "Effekt", type: "number", unit: "W", defaultValue: 60 },
      {
        id: "timer",
        label: "Tid",
        type: "number",
        unit: "timer",
        defaultValue: 5,
      },
      {
        id: "pris",
        label: "Strømpris",
        type: "number",
        unit: "kr/kWh",
        defaultValue: 1.5,
      },
    ],
    formula: "E = P · t     kWh = W · timer / 1000",
    explanation:
      "En 60 W-pære i 5 timer bruker 0,3 kWh. Gang med strømprisen for å få kostnaden.",
    compute(input) {
      const watt = num(input, "watt");
      const timer = num(input, "timer");
      const pris = num(input, "pris");
      if (!allNumbers([watt, timer, pris])) return [];
      const kwh = (watt * timer) / 1000;
      return [
        result("kwh", "Energi", kwh, { digits: 4, unit: "kWh", primary: true }),
        result("kost", "Kostnad", kwh * pris, { kind: "currency", digits: 2 }),
      ];
    },
  },
  {
    slug: "trykk",
    title: "Trykk",
    description: "p = F / A. Finn trykk fra kraft og areal.",
    category: "fysikk",
    tags: ["trykk", "pascal", "kraft"],
    fields: [
      { id: "f", label: "Kraft", type: "number", unit: "N", defaultValue: 800 },
      {
        id: "a",
        label: "Areal",
        type: "number",
        unit: "m²",
        defaultValue: 0.02,
      },
    ],
    formula: "p = F / A",
    explanation:
      "Trykk er kraft per areal. 1 pascal = 1 N/m². 1 bar = 100 000 Pa. Atmosfæretrykk er ca. 1013 hPa.",
    compute(input) {
      const f = num(input, "f");
      const a = num(input, "a");
      if (!allNumbers([f, a]) || a === 0) return [];
      const p = f / a;
      return [
        result("pa", "Trykk", p, { digits: 2, unit: "Pa", primary: true }),
        result("bar", "Bar", p / 1e5, { digits: 4, unit: "bar" }),
      ];
    },
  },
  {
    slug: "varmeenergi",
    title: "Varmeenergi (Q = mcΔT)",
    description:
      "Regn ut energien som trengs for å varme eller avkjøle et stoff.",
    category: "fysikk",
    tags: ["varme", "energi", "kalorimetri", "vann"],
    fields: [
      { id: "m", label: "Masse", type: "number", unit: "kg", defaultValue: 1 },
      {
        id: "c",
        label: "Spesifikk varmekapasitet",
        type: "number",
        unit: "J/kg·K",
        defaultValue: 4186,
        hint: "Vann er 4186. Luft ca. 1000, jern ca. 450.",
      },
      {
        id: "dt",
        label: "Temperaturendring",
        type: "number",
        unit: "°C",
        defaultValue: 20,
      },
    ],
    formula: "Q = m · c · ΔT",
    explanation:
      "ΔT i Celsius og kelvin er like store steg. Positivt Q er energi tilført, negativt er avgitt. 1 kWh = 3,6 millioner joule.",
    compute(input) {
      const m = num(input, "m");
      const c = num(input, "c");
      const dt = num(input, "dt");
      if (!allNumbers([m, c, dt])) return [];
      const q = m * c * dt;
      return [
        result("j", "Energi", q, { digits: 0, unit: "J", primary: true }),
        result("kj", "Kilojoule", q / 1000, { digits: 1, unit: "kJ" }),
        result("kwh", "Kilowattimer", q / 3.6e6, { digits: 4, unit: "kWh" }),
      ];
    },
  },
];
