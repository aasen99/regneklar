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
    slug: "effekt-kalkulator",
    title: "Effektkalkulator",
    shortTitle: "Effekt",
    description:
      "Regn ut effekt, energi og strømkostnad. P = E / t og E = P · t – watt, timer og kWh.",
    category: "fysikk",
    tags: ["effekt", "effektkalkulator", "watt", "kwh", "energi"],
    popular: true,
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
  {
    slug: "bevegelse",
    title: "Bevegelse med konstant akselerasjon",
    shortTitle: "Bevegelse",
    description:
      "Regn ut fart, strekning eller tid med v = v₀ + at og s = v₀t + ½at².",
    category: "fysikk",
    tags: ["akselerasjon", "fart", "strekning", "bevegelse", "naturfag"],
    popular: true,
    fields: [
      {
        id: "v0",
        label: "Startfart v₀",
        type: "number",
        unit: "m/s",
        defaultValue: 0,
      },
      {
        id: "a",
        label: "Akselerasjon a",
        type: "number",
        unit: "m/s²",
        defaultValue: 2,
      },
      {
        id: "t",
        label: "Tid t",
        type: "number",
        unit: "s",
        defaultValue: 5,
      },
    ],
    formula: "v = v₀ + a·t     s = v₀·t + ½a·t²     v² = v₀² + 2as",
    explanation:
      "Gjelder ved konstant akselerasjon. Positiv a øker farten, negativ bremser. g ≈ 9,81 m/s² ved fritt fall.",
    compute(input) {
      const v0 = num(input, "v0");
      const a = num(input, "a");
      const t = num(input, "t");
      if (!allNumbers([v0, a, t]) || t < 0) return [];
      const v = v0 + a * t;
      const s = v0 * t + 0.5 * a * t * t;
      return [
        result("v", "Sluttfart v", v, { digits: 3, unit: "m/s", primary: true }),
        result("s", "Strekning s", s, { digits: 3, unit: "m" }),
        result("kmh", "Sluttfart", v * 3.6, { digits: 2, unit: "km/t" }),
      ];
    },
  },
  {
    slug: "impuls",
    title: "Bevegelsesmengde og impuls",
    shortTitle: "Impuls",
    description: "Finn p = mv og impulsen F·Δt = Δp.",
    category: "fysikk",
    tags: ["impuls", "bevegelsesmengde", "støt", "naturfag"],
    fields: [
      { id: "m", label: "Masse", type: "number", unit: "kg", defaultValue: 0.15 },
      {
        id: "v1",
        label: "Fart før",
        type: "number",
        unit: "m/s",
        defaultValue: 0,
      },
      {
        id: "v2",
        label: "Fart etter",
        type: "number",
        unit: "m/s",
        defaultValue: 40,
      },
      {
        id: "dt",
        label: "Kontakttid",
        type: "number",
        unit: "s",
        defaultValue: 0.01,
        hint: "Tid kraften virker, f.eks. under et slag.",
      },
    ],
    formula: "p = m·v     I = Δp = F·Δt",
    explanation:
      "Impulsen er lik endringen i bevegelsesmengde. Kort kontakttid gir stor kraft for samme Δp.",
    compute(input) {
      const m = num(input, "m");
      const v1 = num(input, "v1");
      const v2 = num(input, "v2");
      const dt = num(input, "dt");
      if (!allNumbers([m, v1, v2, dt]) || dt <= 0) return [];
      const dp = m * (v2 - v1);
      return [
        result("dp", "Impuls Δp", dp, {
          digits: 3,
          unit: "kg·m/s",
          primary: true,
        }),
        result("f", "Gjennomsnittlig kraft", dp / dt, { digits: 1, unit: "N" }),
        result("p2", "Bevegelsesmengde etter", m * v2, {
          digits: 3,
          unit: "kg·m/s",
        }),
      ];
    },
  },
  {
    slug: "arbeid-effekt",
    title: "Arbeid og effekt",
    shortTitle: "Arbeid",
    description: "Regn ut arbeid W = F·s og effekt P = W/t.",
    category: "fysikk",
    tags: ["arbeid", "effekt", "joule", "watt", "naturfag"],
    fields: [
      { id: "f", label: "Kraft", type: "number", unit: "N", defaultValue: 200 },
      { id: "s", label: "Strekning", type: "number", unit: "m", defaultValue: 5 },
      { id: "t", label: "Tid", type: "number", unit: "s", defaultValue: 4 },
      {
        id: "vinkel",
        label: "Vinkel kraft–bevegelse",
        type: "number",
        unit: "°",
        defaultValue: 0,
        hint: "0° betyr kraft parallell med bevegelsen.",
      },
    ],
    formula: "W = F·s·cos θ     P = W / t",
    explanation:
      "Ved 0° er hele kraften nyttig. Ved 90° er arbeidet null. Effekt forteller hvor raskt arbeidet utføres.",
    compute(input) {
      const f = num(input, "f");
      const s = num(input, "s");
      const t = num(input, "t");
      const deg = num(input, "vinkel");
      if (!allNumbers([f, s, t, deg]) || t <= 0) return [];
      const w = f * s * Math.cos((deg * Math.PI) / 180);
      return [
        result("w", "Arbeid W", w, { digits: 2, unit: "J", primary: true }),
        result("p", "Effekt P", w / t, { digits: 2, unit: "W" }),
        result("kw", "Effekt", w / t / 1000, { digits: 4, unit: "kW" }),
      ];
    },
  },
  {
    slug: "friksjon",
    title: "Friksjon",
    description: "Finn friksjonskraft R = μ·N på vannrett eller skrå flate.",
    category: "fysikk",
    tags: ["friksjon", "kraft", "naturfag"],
    fields: [
      { id: "m", label: "Masse", type: "number", unit: "kg", defaultValue: 20 },
      {
        id: "mu",
        label: "Friksjonstall μ",
        type: "number",
        defaultValue: 0.3,
        step: 0.01,
      },
      {
        id: "vinkel",
        label: "Helningsvinkel",
        type: "number",
        unit: "°",
        defaultValue: 0,
        hint: "0° er vannrett. Normalkraften blir da mg·cos θ.",
      },
    ],
    formula: "R = μ · N     N = m·g·cos θ",
    explanation:
      "På vannrett underlag er N = mg. μ er typisk 0,1–0,8 avhengig av materialene.",
    compute(input) {
      const m = num(input, "m");
      const mu = num(input, "mu");
      const deg = num(input, "vinkel");
      if (!allNumbers([m, mu, deg])) return [];
      const g = 9.81;
      const n = m * g * Math.cos((deg * Math.PI) / 180);
      const r = mu * n;
      return [
        result("r", "Friksjonskraft", r, { digits: 2, unit: "N", primary: true }),
        result("n", "Normalkraft", n, { digits: 2, unit: "N" }),
        result("g", "Tyngde", m * g, { digits: 2, unit: "N" }),
      ];
    },
  },
  {
    slug: "hooke",
    title: "Hookes lov (fjær)",
    shortTitle: "Fjær",
    description: "Finn kraft og elastisk energi i en fjær: F = kx.",
    category: "fysikk",
    tags: ["hooke", "fjær", "elastisk", "naturfag"],
    fields: [
      {
        id: "k",
        label: "Fjærkonstant k",
        type: "number",
        unit: "N/m",
        defaultValue: 200,
      },
      {
        id: "x",
        label: "Forskyvning x",
        type: "number",
        unit: "m",
        defaultValue: 0.05,
        hint: "Forlengelse eller sammentrykking i meter.",
      },
    ],
    formula: "F = k · x     E = ½ k · x²",
    explanation:
      "Innenfor det elastiske området er kraften proporsjonal med forskyvningen. Energien lagres i fjæra.",
    compute(input) {
      const k = num(input, "k");
      const x = num(input, "x");
      if (!allNumbers([k, x])) return [];
      return [
        result("f", "Kraft F", k * x, { digits: 2, unit: "N", primary: true }),
        result("e", "Elastisk energi", 0.5 * k * x * x, { digits: 3, unit: "J" }),
        result("t", "Svingetid (1 kg)", 2 * Math.PI * Math.sqrt(1 / k), {
          digits: 3,
          unit: "s",
          hint: "T = 2π√(m/k) med m = 1 kg som eksempel.",
        }),
      ];
    },
  },
  {
    slug: "sentripetal",
    title: "Sentripetalkraft",
    description: "Finn kraften som holder en gjenstand i sirkelbevegelse.",
    category: "fysikk",
    tags: ["sirkelbevegelse", "sentripetal", "naturfag"],
    fields: [
      { id: "m", label: "Masse", type: "number", unit: "kg", defaultValue: 0.2 },
      { id: "v", label: "Banefart", type: "number", unit: "m/s", defaultValue: 8 },
      { id: "r", label: "Radius", type: "number", unit: "m", defaultValue: 1.5 },
    ],
    formula: "F = m · v² / r",
    explanation:
      "Kraften peker inn mot sentrum. Mindre radius eller høyere fart krever mye større kraft.",
    compute(input) {
      const m = num(input, "m");
      const v = num(input, "v");
      const r = num(input, "r");
      if (!allNumbers([m, v, r]) || r <= 0) return [];
      const f = (m * v * v) / r;
      const t = (2 * Math.PI * r) / v;
      return [
        result("f", "Sentripetalkraft", f, {
          digits: 2,
          unit: "N",
          primary: true,
        }),
        result("a", "Sentripetalakselerasjon", (v * v) / r, {
          digits: 2,
          unit: "m/s²",
        }),
        result("periode", "Tid per runde", t, { digits: 3, unit: "s" }),
      ];
    },
  },
  {
    slug: "hydrostatisk",
    title: "Hydrostatisk trykk",
    description: "Finn trykkøkningen med dyp: p = ρgh.",
    category: "fysikk",
    tags: ["trykk", "vann", "dyp", "naturfag"],
    fields: [
      {
        id: "h",
        label: "Dyp",
        type: "number",
        unit: "m",
        defaultValue: 10,
      },
      {
        id: "rho",
        label: "Tetthet",
        type: "number",
        unit: "kg/m³",
        defaultValue: 1000,
        hint: "Ferskvann ≈ 1000, sjøvann ≈ 1025.",
      },
    ],
    formula: "p = ρ · g · h",
    explanation:
      "Omtrent 1 atm ekstra per 10 m vann. Totaltrykk er atmosfæretrykk pluss ρgh.",
    compute(input) {
      const h = num(input, "h");
      const rho = num(input, "rho");
      if (!allNumbers([h, rho]) || h < 0) return [];
      const p = rho * 9.81 * h;
      return [
        result("p", "Trykkøkning", p, { digits: 0, unit: "Pa", primary: true }),
        result("kpa", "Kilopascal", p / 1000, { digits: 1, unit: "kPa" }),
        result("atm", "Atmosfærer", p / 101325, { digits: 2, unit: "atm" }),
      ];
    },
  },
  {
    slug: "oppdrift",
    title: "Oppdrift (Archimedes)",
    shortTitle: "Oppdrift",
    description: "Regn ut oppdrift og sammenlign med tyngden.",
    category: "fysikk",
    tags: ["archimedes", "oppdrift", "flyting", "naturfag"],
    fields: [
      {
        id: "v",
        label: "Fordrengt volum",
        type: "number",
        unit: "m³",
        defaultValue: 0.002,
        hint: "1 liter = 0,001 m³.",
      },
      {
        id: "rho",
        label: "Væsketetthet",
        type: "number",
        unit: "kg/m³",
        defaultValue: 1000,
      },
      {
        id: "m",
        label: "Gjenstandens masse",
        type: "number",
        unit: "kg",
        defaultValue: 1.5,
      },
    ],
    formula: "F_opp = ρ · V · g",
    explanation:
      "Flyter hvis oppdrift ≥ tyngde, synker hvis tyngde er større. For helt nedsenket gjenstand er V gjenstandsvolumet.",
    compute(input) {
      const v = num(input, "v");
      const rho = num(input, "rho");
      const m = num(input, "m");
      if (!allNumbers([v, rho, m]) || v < 0) return [];
      const g = 9.81;
      const opp = rho * v * g;
      const tyngde = m * g;
      let status = "Synker (tyngde > oppdrift)";
      if (Math.abs(opp - tyngde) < 1e-6) status = "Svever / nøytral";
      else if (opp > tyngde) status = "Flyter / stiger";
      return [
        result("opp", "Oppdrift", opp, { digits: 2, unit: "N", primary: true }),
        result("tyngde", "Tyngde", tyngde, { digits: 2, unit: "N" }),
        result("status", "Resultat", status, { kind: "text" }),
      ];
    },
  },
  {
    slug: "bolge",
    title: "Bølgefart og bølgelengde",
    shortTitle: "Bølger",
    description: "Regn om mellom fart, frekvens og bølgelengde: v = fλ.",
    category: "fysikk",
    tags: ["bølge", "lyd", "frekvens", "naturfag"],
    popular: true,
    fields: [
      {
        id: "v",
        label: "Bølgefart v",
        type: "number",
        unit: "m/s",
        defaultValue: 340,
        hint: "Lyd i luft ≈ 340. Lys = 3·10⁸.",
      },
      {
        id: "f",
        label: "Frekvens f",
        type: "number",
        unit: "Hz",
        defaultValue: 440,
      },
    ],
    formula: "v = f · λ     T = 1 / f",
    explanation:
      "Høyere frekvens gir kortere bølgelengde ved samme fart. 440 Hz er kammertonen A.",
    compute(input) {
      const v = num(input, "v");
      const f = num(input, "f");
      if (!allNumbers([v, f]) || f <= 0) return [];
      const lambda = v / f;
      return [
        result("lambda", "Bølgelengde λ", lambda, {
          digits: 4,
          unit: "m",
          primary: true,
        }),
        result("cm", "Bølgelengde", lambda * 100, { digits: 2, unit: "cm" }),
        result("t", "Periode T", 1 / f, { digits: 6, unit: "s" }),
      ];
    },
  },
  {
    slug: "desibel",
    title: "Lydnivå (desibel)",
    shortTitle: "Desibel",
    description: "Regn om mellom intensitet og lydnivå i dB.",
    category: "fysikk",
    tags: ["lyd", "desibel", "intensitet", "naturfag"],
    fields: [
      {
        id: "modus",
        label: "Jeg har",
        type: "select",
        defaultValue: "db",
        options: [
          { value: "db", label: "Lydnivå i dB" },
          { value: "i", label: "Intensitet i W/m²" },
        ],
      },
      {
        id: "verdi",
        label: "Verdi",
        type: "number",
        defaultValue: 60,
        hint: "60 dB er vanlig samtale. Eller intensitet, f.eks. 1e-6.",
      },
    ],
    formula: "L = 10 · log₁₀(I / I₀)     I₀ = 10⁻¹² W/m²",
    explanation:
      "+10 dB er ti ganger intensitet. 0 dB er høreterskel, ca. 120 dB smertegrense.",
    compute(input) {
      const verdi = num(input, "verdi");
      if (!Number.isFinite(verdi)) return [];
      const I0 = 1e-12;
      let L: number;
      let I: number;
      if (input.modus === "i") {
        if (verdi <= 0) return [];
        I = verdi;
        L = 10 * Math.log10(I / I0);
      } else {
        L = verdi;
        I = I0 * 10 ** (L / 10);
      }
      return [
        result("l", "Lydnivå", L, { digits: 1, unit: "dB", primary: true }),
        result("i", "Intensitet", I, { digits: 6, unit: "W/m²" }),
      ];
    },
  },
  {
    slug: "snell",
    title: "Snells lov",
    description: "Finn brytningsvinkel når lys går mellom to medier.",
    category: "fysikk",
    tags: ["lys", "bryting", "optikk", "naturfag"],
    fields: [
      {
        id: "n1",
        label: "n₁ (fra)",
        type: "number",
        defaultValue: 1,
        hint: "Luft ≈ 1,00.",
      },
      {
        id: "n2",
        label: "n₂ (til)",
        type: "number",
        defaultValue: 1.33,
        hint: "Vann ≈ 1,33, glass ≈ 1,5.",
      },
      {
        id: "theta1",
        label: "Innfallsvinkel θ₁",
        type: "number",
        unit: "°",
        defaultValue: 30,
      },
    ],
    formula: "n₁ · sin θ₁ = n₂ · sin θ₂",
    explanation:
      "Vinklene måles mot normalen. Hvis sin θ₂ > 1, oppstår totalrefleksjon.",
    compute(input) {
      const n1 = num(input, "n1");
      const n2 = num(input, "n2");
      const t1 = num(input, "theta1");
      if (!allNumbers([n1, n2, t1]) || n2 === 0) return [];
      const s2 = (n1 / n2) * Math.sin((t1 * Math.PI) / 180);
      if (Math.abs(s2) > 1) {
        return [
          result("status", "Resultat", "Totalrefleksjon (ingen bryting).", {
            kind: "text",
            primary: true,
          }),
        ];
      }
      const t2 = (Math.asin(s2) * 180) / Math.PI;
      const out = [
        result("t2", "Brytningsvinkel θ₂", t2, {
          digits: 2,
          unit: "°",
          primary: true,
        }),
      ];
      if (n1 > n2) {
        out.push(
          result("kritisk", "Kritisk vinkel (tilbake til n₁)", (Math.asin(n2 / n1) * 180) / Math.PI, {
            digits: 2,
            unit: "°",
          }),
        );
      }
      return out;
    },
  },
  {
    slug: "linse",
    title: "Linseformelen",
    shortTitle: "Linse",
    description: "Finn bildavstand eller forstørrelse med 1/f = 1/a + 1/b.",
    category: "fysikk",
    tags: ["linse", "optikk", "brennvidde", "naturfag"],
    fields: [
      {
        id: "f",
        label: "Brennvidde f",
        type: "number",
        unit: "cm",
        defaultValue: 10,
      },
      {
        id: "a",
        label: "Gjenstandsavstand a",
        type: "number",
        unit: "cm",
        defaultValue: 30,
      },
    ],
    formula: "1/f = 1/a + 1/b     m = −b / a",
    explanation:
      "Positiv f for samlelinse. Negativ forstørrelse betyr omvendt bilde. a > 2f gir reelt, forminsket bilde.",
    compute(input) {
      const f = num(input, "f");
      const a = num(input, "a");
      if (!allNumbers([f, a]) || a === 0 || 1 / f - 1 / a === 0) return [];
      const b = 1 / (1 / f - 1 / a);
      const m = -b / a;
      return [
        result("b", "Bildavstand b", b, { digits: 2, unit: "cm", primary: true }),
        result("m", "Forstørrelse m", m, { digits: 3 }),
        result(
          "type",
          "Bilde",
          b > 0 ? "Reelt (kan fanges på skjerm)" : "Virtuelt",
          { kind: "text" },
        ),
      ];
    },
  },
  {
    slug: "ideell-gass",
    title: "Ideell gasslov",
    shortTitle: "Gasslov",
    description: "pV = nRT. Finn trykk, volum, stoffmengde eller temperatur.",
    category: "fysikk",
    tags: ["gass", "trykk", "temperatur", "naturfag", "kjemi"],
    popular: true,
    fields: [
      {
        id: "finn",
        label: "Finn",
        type: "select",
        defaultValue: "p",
        options: [
          { value: "p", label: "Trykk p" },
          { value: "v", label: "Volum V" },
          { value: "n", label: "Stoffmengde n" },
          { value: "t", label: "Temperatur T" },
        ],
      },
      {
        id: "p",
        label: "Trykk",
        type: "number",
        unit: "Pa",
        defaultValue: 101325,
      },
      {
        id: "v",
        label: "Volum",
        type: "number",
        unit: "m³",
        defaultValue: 0.0224,
        hint: "22,4 L = 0,0224 m³.",
      },
      { id: "n", label: "Stoffmengde", type: "number", unit: "mol", defaultValue: 1 },
      {
        id: "tc",
        label: "Temperatur",
        type: "number",
        unit: "°C",
        defaultValue: 0,
      },
    ],
    formula: "p · V = n · R · T     R = 8,314 J/(mol·K)",
    explanation:
      "Oppgi tre størrelser; den du vil finne overstyres. Temperatur regnes om til kelvin.",
    compute(input) {
      const R = 8.314;
      let p = num(input, "p");
      let v = num(input, "v");
      let n = num(input, "n");
      let tc = num(input, "tc");
      let T = tc + 273.15;
      const finn = input.finn ?? "p";
      if (finn === "p" && allNumbers([v, n, T]) && v !== 0) p = (n * R * T) / v;
      else if (finn === "v" && allNumbers([p, n, T]) && p !== 0) v = (n * R * T) / p;
      else if (finn === "n" && allNumbers([p, v, T]) && T !== 0) n = (p * v) / (R * T);
      else if (finn === "t" && allNumbers([p, v, n]) && n !== 0) {
        T = (p * v) / (n * R);
        tc = T - 273.15;
      } else return [];
      return [
        result("hoved", finn === "p" ? "Trykk" : finn === "v" ? "Volum" : finn === "n" ? "Stoffmengde" : "Temperatur",
          finn === "p" ? p : finn === "v" ? v : finn === "n" ? n : tc,
          {
            digits: finn === "n" ? 4 : 2,
            unit: finn === "p" ? "Pa" : finn === "v" ? "m³" : finn === "n" ? "mol" : "°C",
            primary: true,
          }),
        result("k", "Temperatur", T, { digits: 2, unit: "K" }),
        result("liter", "Volum", v * 1000, { digits: 2, unit: "L" }),
      ];
    },
  },
  {
    slug: "faseovergang",
    title: "Smelte- og fordampningsvarme",
    shortTitle: "Faseovergang",
    description: "Finn energien til å smelte eller fordampe et stoff: Q = mL.",
    category: "fysikk",
    tags: ["varme", "smelting", "fordamping", "naturfag"],
    fields: [
      { id: "m", label: "Masse", type: "number", unit: "kg", defaultValue: 1 },
      {
        id: "l",
        label: "Spesifikk varme L",
        type: "number",
        unit: "kJ/kg",
        defaultValue: 334,
        hint: "Vann: smelting 334, fordamping 2260.",
      },
    ],
    formula: "Q = m · L",
    explanation:
      "Temperaturen er konstant under faseovergangen. Oppgi L i kJ/kg.",
    compute(input) {
      const m = num(input, "m");
      const l = num(input, "l");
      if (!allNumbers([m, l])) return [];
      const qkJ = m * l;
      return [
        result("q", "Energi Q", qkJ, { digits: 1, unit: "kJ", primary: true }),
        result("j", "Energi", qkJ * 1000, { digits: 0, unit: "J" }),
        result("kwh", "Kilowattimer", (qkJ * 1000) / 3.6e6, {
          digits: 4,
          unit: "kWh",
        }),
      ];
    },
  },
  {
    slug: "virkningsgrad",
    title: "Virkningsgrad",
    description: "Finn virkningsgrad η = nyttig / tilført energi eller effekt.",
    category: "fysikk",
    tags: ["virkningsgrad", "energi", "effekt", "naturfag"],
    fields: [
      {
        id: "nyttig",
        label: "Nyttig energi/effekt",
        type: "number",
        defaultValue: 800,
      },
      {
        id: "tilfort",
        label: "Tilført energi/effekt",
        type: "number",
        defaultValue: 1000,
      },
    ],
    formula: "η = E_nyttig / E_tilført",
    explanation:
      "Bruk samme enhet i begge felt (J, kWh eller W). Virkningsgraden kan ikke overstige 100 %.",
    compute(input) {
      const nyttig = num(input, "nyttig");
      const tilfort = num(input, "tilfort");
      if (!allNumbers([nyttig, tilfort]) || tilfort <= 0) return [];
      const eta = nyttig / tilfort;
      return [
        result("eta", "Virkningsgrad", eta * 100, {
          kind: "percent",
          digits: 1,
          primary: true,
        }),
        result("tap", "Tap", tilfort - nyttig, { digits: 2 }),
      ];
    },
  },
  {
    slug: "stoffmengde",
    title: "Stoffmengde (mol)",
    shortTitle: "Mol",
    description: "Regn om mellom masse, stoffmengde og antall partikler.",
    category: "fysikk",
    tags: ["mol", "kjemi", "naturfag", "avogadro"],
    popular: true,
    fields: [
      { id: "m", label: "Masse", type: "number", unit: "g", defaultValue: 18 },
      {
        id: "M",
        label: "Molar masse M",
        type: "number",
        unit: "g/mol",
        defaultValue: 18,
        hint: "H₂O = 18, O₂ = 32, CO₂ = 44, NaCl = 58,5.",
      },
    ],
    formula: "n = m / M     N = n · N_A",
    explanation:
      "N_A ≈ 6,022·10²³ mol⁻¹. 18 g vann er 1 mol og inneholder N_A molekyler.",
    compute(input) {
      const m = num(input, "m");
      const M = num(input, "M");
      if (!allNumbers([m, M]) || M <= 0) return [];
      const n = m / M;
      const NA = 6.022e23;
      return [
        result("n", "Stoffmengde n", n, {
          digits: 4,
          unit: "mol",
          primary: true,
        }),
        result("N", "Antall partikler", n * NA, { digits: 3 }),
      ];
    },
  },
  {
    slug: "konsentrasjon",
    title: "Konsentrasjon og fortynning",
    shortTitle: "Konsentrasjon",
    description: "Finn c = n/V eller fortynn med c₁V₁ = c₂V₂.",
    category: "fysikk",
    tags: ["konsentrasjon", "fortynning", "kjemi", "naturfag"],
    fields: [
      {
        id: "modus",
        label: "Modus",
        type: "select",
        defaultValue: "c",
        options: [
          { value: "c", label: "Finn konsentrasjon c = n/V" },
          { value: "fortynn", label: "Fortyynning c₁V₁ = c₂V₂" },
        ],
      },
      { id: "n", label: "Stoffmengde n", type: "number", unit: "mol", defaultValue: 0.1 },
      { id: "v", label: "Volum V", type: "number", unit: "L", defaultValue: 0.5 },
      {
        id: "c1",
        label: "c₁ (før)",
        type: "number",
        unit: "mol/L",
        defaultValue: 1,
      },
      {
        id: "v1",
        label: "V₁ (før)",
        type: "number",
        unit: "L",
        defaultValue: 0.05,
      },
      {
        id: "c2",
        label: "c₂ (ønsket)",
        type: "number",
        unit: "mol/L",
        defaultValue: 0.1,
      },
    ],
    formula: "c = n / V     c₁·V₁ = c₂·V₂",
    explanation:
      "Ved fortynning er stoffmengden konstant. Finn V₂ = c₁V₁/c₂, deretter hvor mye vann du må tilsette.",
    compute(input) {
      if (input.modus === "fortynn") {
        const c1 = num(input, "c1");
        const v1 = num(input, "v1");
        const c2 = num(input, "c2");
        if (!allNumbers([c1, v1, c2]) || c2 <= 0) return [];
        const v2 = (c1 * v1) / c2;
        return [
          result("v2", "Sluttvolum V₂", v2, {
            digits: 4,
            unit: "L",
            primary: true,
          }),
          result("vann", "Tilsett løsemiddel", v2 - v1, {
            digits: 4,
            unit: "L",
          }),
        ];
      }
      const n = num(input, "n");
      const v = num(input, "v");
      if (!allNumbers([n, v]) || v <= 0) return [];
      return [
        result("c", "Konsentrasjon c", n / v, {
          digits: 4,
          unit: "mol/L",
          primary: true,
        }),
      ];
    },
  },
  {
    slug: "foton",
    title: "Fotonenergi",
    description: "Finn energien til et foton fra frekvens eller bølgelengde.",
    category: "fysikk",
    tags: ["foton", "lys", "kvante", "naturfag"],
    fields: [
      {
        id: "modus",
        label: "Oppgi",
        type: "select",
        defaultValue: "lambda",
        options: [
          { value: "lambda", label: "Bølgelengde" },
          { value: "f", label: "Frekvens" },
        ],
      },
      {
        id: "lambda",
        label: "Bølgelengde",
        type: "number",
        unit: "nm",
        defaultValue: 550,
        hint: "Synlig lys ca. 400–700 nm.",
      },
      {
        id: "f",
        label: "Frekvens",
        type: "number",
        unit: "Hz",
        defaultValue: 5e14,
      },
    ],
    formula: "E = h·f = h·c / λ",
    explanation:
      "h = 6,626·10⁻³⁴ J·s. Kortere bølgelengde gir mer energirike fotoner. 1 eV = 1,602·10⁻¹⁹ J.",
    compute(input) {
      const h = 6.626e-34;
      const c = 2.998e8;
      let f: number;
      let lambda: number;
      if (input.modus === "f") {
        f = num(input, "f");
        if (!Number.isFinite(f) || f <= 0) return [];
        lambda = c / f;
      } else {
        const nm = num(input, "lambda");
        if (!Number.isFinite(nm) || nm <= 0) return [];
        lambda = nm * 1e-9;
        f = c / lambda;
      }
      const eJ = h * f;
      const eV = eJ / 1.602e-19;
      return [
        result("ev", "Energi", eV, { digits: 3, unit: "eV", primary: true }),
        result("j", "Energi", eJ, { digits: 4, unit: "J" }),
        result("f", "Frekvens", f, { digits: 4, unit: "Hz" }),
        result("nm", "Bølgelengde", lambda * 1e9, { digits: 2, unit: "nm" }),
      ];
    },
  },
  {
    slug: "halvveringstid",
    title: "Halvveringstid",
    description:
      "Se hvor mye som er igjen etter tid t, eller finn tid fra restmengde.",
    category: "fysikk",
    tags: ["radioaktivitet", "halvveringstid", "naturfag"],
    fields: [
      {
        id: "n0",
        label: "Startmengde N₀",
        type: "number",
        defaultValue: 100,
        hint: "Kan være antall, masse eller prosent.",
      },
      {
        id: "t12",
        label: "Halvveringstid T½",
        type: "number",
        unit: "år",
        defaultValue: 5730,
        hint: "C-14 ≈ 5730 år. Bruk samme tidsenhet overalt.",
      },
      {
        id: "t",
        label: "Tid t",
        type: "number",
        unit: "år",
        defaultValue: 5730,
      },
    ],
    formula: "N = N₀ · (½)^(t / T½)",
    explanation:
      "Etter én T½ er halvparten igjen. Aktiviteten følger samme kurve. Enheten for tid må være den samme for t og T½.",
    compute(input) {
      const n0 = num(input, "n0");
      const t12 = num(input, "t12");
      const t = num(input, "t");
      if (!allNumbers([n0, t12, t]) || t12 <= 0) return [];
      const n = n0 * 0.5 ** (t / t12);
      const andel = (n / n0) * 100;
      return [
        result("n", "Mengde igjen", n, { digits: 4, primary: true }),
        result("andel", "Andel igjen", andel, { kind: "percent", digits: 2 }),
        result("halv", "Antall halvveringer", t / t12, { digits: 3 }),
      ];
    },
  },
];
