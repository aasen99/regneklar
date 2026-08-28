import type { Calculator } from "../types";
import { num } from "../format";
import { allNumbers, result } from "../helpers";

const KAPPA = { cu: 56, al: 35 } as const;

export const elektroCalculators: Calculator[] = [
  {
    slug: "ohms-lov",
    title: "Ohms lov",
    shortTitle: "Ohm",
    description: "U = R · I. Finn spenning, resistans, strøm og effekt.",
    category: "elektro",
    tags: ["ohm", "strøm", "spenning", "resistans", "elektro"],
    popular: true,
    fields: [
      {
        id: "u",
        label: "Spenning U",
        type: "number",
        unit: "V",
        hint: "La feltet stå tomt for å finne U.",
      },
      {
        id: "r",
        label: "Resistans R",
        type: "number",
        unit: "Ω",
        defaultValue: 100,
      },
      {
        id: "i",
        label: "Strøm I",
        type: "number",
        unit: "A",
        defaultValue: 0.12,
      },
    ],
    formula: "U = R · I     P = U · I = R · I² = U² / R",
    explanation:
      "Ohms lov gjelder for ohmske motstander, der strøm og spenning er proporsjonale. Effekten i watt er spenning ganger strøm.",
    compute(input) {
      const u = num(input, "u");
      const r = num(input, "r");
      const i = num(input, "i");
      const filled = [u, r, i].filter(Number.isFinite).length;
      if (filled !== 2) {
        return [
          result("hint", "Fyll inn", "Oppgi nøyaktig to felt.", {
            kind: "text",
            primary: true,
          }),
        ];
      }
      let U = u;
      let R = r;
      let I = i;
      if (!Number.isFinite(U) && Number.isFinite(R) && Number.isFinite(I)) U = R * I;
      if (!Number.isFinite(R) && Number.isFinite(U) && Number.isFinite(I) && I !== 0)
        R = U / I;
      if (!Number.isFinite(I) && Number.isFinite(U) && Number.isFinite(R) && R !== 0)
        I = U / R;
      if (!Number.isFinite(U) || !Number.isFinite(R) || !Number.isFinite(I)) return [];
      return [
        result("u", "Spenning U", U, { digits: 4, unit: "V", primary: true }),
        result("r", "Resistans R", R, { digits: 4, unit: "Ω" }),
        result("i", "Strøm I", I, { digits: 4, unit: "A" }),
        result("p", "Effekt P", U * I, { digits: 4, unit: "W" }),
      ];
    },
  },
  {
    slug: "serie-parallell",
    title: "Serie- og parallellkopling",
    shortTitle: "Serie/parallell",
    description:
      "Finn erstatningsresistans for to eller tre motstander i serie eller parallell.",
    category: "elektro",
    tags: ["motstand", "serie", "parallell", "krets", "elektro"],
    popular: true,
    fields: [
      {
        id: "kopling",
        label: "Kopling",
        type: "select",
        defaultValue: "serie",
        options: [
          { value: "serie", label: "Serie" },
          { value: "parallell", label: "Parallell" },
        ],
      },
      { id: "r1", label: "R1", type: "number", unit: "Ω", defaultValue: 100 },
      { id: "r2", label: "R2", type: "number", unit: "Ω", defaultValue: 220 },
      {
        id: "r3",
        label: "R3 (valgfritt)",
        type: "number",
        unit: "Ω",
        hint: "La feltet stå tomt for å bruke bare R1 og R2.",
      },
    ],
    formula: "serie: R = R₁ + R₂     parallell: 1/R = 1/R₁ + 1/R₂",
    explanation:
      "I serie går all strøm gjennom hver motstand, og resistansene summeres. I parallell er spenningen den samme over alle, og den minste motstanden trekker mest strøm. Erstatningsresistansen i parallell er alltid lavere enn den minste enkeltmotstanden.",
    compute(input) {
      const r1 = num(input, "r1");
      const r2 = num(input, "r2");
      const r3 = num(input, "r3");
      const rs = [r1, r2, ...(Number.isFinite(r3) ? [r3] : [])];
      if (!rs.every((r) => Number.isFinite(r) && r > 0)) return [];
      const serie = rs.reduce((a, b) => a + b, 0);
      const parallell = 1 / rs.reduce((a, b) => a + 1 / b, 0);
      const R = input.kopling === "parallell" ? parallell : serie;
      return [
        result("r", "Erstatningsresistans", R, {
          digits: 2,
          unit: "Ω",
          primary: true,
        }),
        result("serie", "Hvis serie", serie, { digits: 2, unit: "Ω" }),
        result("par", "Hvis parallell", parallell, { digits: 2, unit: "Ω" }),
      ];
    },
  },
  {
    slug: "resistivitet",
    title: "Resistivitet og ledermotstand",
    shortTitle: "Ledermotstand",
    description:
      "Finn resistansen i en leder fra lengde, tverrsnitt og materiale.",
    category: "elektro",
    tags: ["resistivitet", "kabel", "tverrsnitt", "kobber", "elektro"],
    fields: [
      {
        id: "materiale",
        label: "Materiale",
        type: "select",
        defaultValue: "cu",
        options: [
          { value: "cu", label: "Kobber (κ = 56)" },
          { value: "al", label: "Aluminium (κ = 35)" },
        ],
      },
      {
        id: "lengde",
        label: "Lengde",
        type: "number",
        unit: "m",
        defaultValue: 20,
      },
      {
        id: "tverrsnitt",
        label: "Tverrsnitt",
        type: "number",
        unit: "mm²",
        defaultValue: 2.5,
      },
    ],
    formula: "R = ℓ / (κ · A)",
    explanation:
      "κ er ledningsevnen: 56 m/(Ω·mm²) for kobber og 35 for aluminium ved 20 °C (vanlige verdier i el-fag). A er tverrsnittet i mm², ℓ lengden i meter. Tynnere eller lengre leder gir høyere resistans.",
    compute(input) {
      const l = num(input, "lengde");
      const a = num(input, "tverrsnitt");
      const kappa = KAPPA[input.materiale === "al" ? "al" : "cu"];
      if (!allNumbers([l, a]) || a <= 0 || l < 0) return [];
      const R = l / (kappa * a);
      return [
        result("r", "Resistans", R, { digits: 4, unit: "Ω", primary: true }),
        result("kappa", "Ledningsevne κ", kappa, {
          digits: 0,
          unit: "m/(Ω·mm²)",
        }),
      ];
    },
  },
  {
    slug: "spenningsfall",
    title: "Spenningsfall i kabel",
    shortTitle: "Spenningsfall",
    description:
      "Regn ut spenningsfall i en kobber- eller aluminiumskabel, én- eller trefase.",
    category: "elektro",
    tags: ["spenningsfall", "kabel", "installasjon", "elektro"],
    fields: [
      {
        id: "fase",
        label: "System",
        type: "select",
        defaultValue: "1",
        options: [
          { value: "1", label: "Énfase (230 V)" },
          { value: "3", label: "Trefase" },
        ],
      },
      {
        id: "materiale",
        label: "Materiale",
        type: "select",
        defaultValue: "cu",
        options: [
          { value: "cu", label: "Kobber (κ = 56)" },
          { value: "al", label: "Aluminium (κ = 35)" },
        ],
      },
      { id: "i", label: "Strøm", type: "number", unit: "A", defaultValue: 16 },
      {
        id: "lengde",
        label: "Kabellengde (én vei)",
        type: "number",
        unit: "m",
        defaultValue: 25,
      },
      {
        id: "tverrsnitt",
        label: "Tverrsnitt",
        type: "number",
        unit: "mm²",
        defaultValue: 2.5,
      },
      {
        id: "u",
        label: "Spenning",
        type: "number",
        unit: "V",
        defaultValue: 230,
      },
    ],
    formula: "énfase: ΔU = 2 · I · ℓ / (κ · A)     trefase: ΔU = √3 · I · ℓ / (κ · A)",
    explanation:
      "Énfase teller tur og retur (faktoren 2). Trefase bruker √3. NEK 400 har krav til maksimalt spenningsfall – ofte 4 % fram til uttak. Dette er likespenning/resistivt anslag, uten reaktans.",
    disclaimer:
      "Ikke en erstatning for prosjektering. Sjekk NEK 400, belastning og vern.",
    compute(input) {
      const I = num(input, "i");
      const l = num(input, "lengde");
      const a = num(input, "tverrsnitt");
      const U = num(input, "u");
      const kappa = KAPPA[input.materiale === "al" ? "al" : "cu"];
      if (!allNumbers([I, l, a, U]) || a <= 0 || U <= 0) return [];
      const faktor = input.fase === "3" ? Math.sqrt(3) : 2;
      const dU = (faktor * I * l) / (kappa * a);
      return [
        result("du", "Spenningsfall", dU, {
          digits: 2,
          unit: "V",
          primary: true,
        }),
        result("prosent", "Av spenningen", (dU / U) * 100, {
          kind: "percent",
          digits: 2,
        }),
        result("uut", "Spenning ved last", U - dU, { digits: 2, unit: "V" }),
      ];
    },
  },
  {
    slug: "spenningsdeler",
    title: "Spenningsdeler",
    description: "Finn utgangsspenningen over R2 i en seriekoblet spenningsdeler.",
    category: "elektro",
    tags: ["spenningsdeler", "motstand", "krets", "elektro"],
    fields: [
      { id: "uinn", label: "Inngangsspenning", type: "number", unit: "V", defaultValue: 12 },
      { id: "r1", label: "R1", type: "number", unit: "Ω", defaultValue: 10000 },
      { id: "r2", label: "R2 (nedre)", type: "number", unit: "Ω", defaultValue: 4700 },
    ],
    formula: "U_ut = U_inn · R₂ / (R₁ + R₂)",
    explanation:
      "Utgangen tas over R2 mot jord. Formelen gjelder uten last på utgangen. En last parallelt med R2 senker utgangsspenningen.",
    compute(input) {
      const u = num(input, "uinn");
      const r1 = num(input, "r1");
      const r2 = num(input, "r2");
      if (!allNumbers([u, r1, r2]) || r1 + r2 === 0) return [];
      const uut = (u * r2) / (r1 + r2);
      return [
        result("uut", "Utgangsspenning", uut, {
          digits: 3,
          unit: "V",
          primary: true,
        }),
        result("i", "Strøm i deleren", u / (r1 + r2), { digits: 6, unit: "A" }),
      ];
    },
  },
  {
    slug: "transformator",
    title: "Transformator",
    description:
      "Regn om spenning, strøm og vindinger mellom primær og sekundær. Ideell transformator.",
    category: "elektro",
    tags: ["transformator", "vikling", "vekselstrøm", "elektro"],
    fields: [
      { id: "u1", label: "Primærspenning U1", type: "number", unit: "V", defaultValue: 230 },
      { id: "u2", label: "Sekundærspenning U2", type: "number", unit: "V", defaultValue: 24 },
      {
        id: "s",
        label: "Tilsynelatende effekt S",
        type: "number",
        unit: "VA",
        defaultValue: 100,
      },
      {
        id: "n1",
        label: "Vindinger primær (valgfritt)",
        type: "number",
        defaultValue: 1150,
      },
    ],
    formula: "U₁ / U₂ = N₁ / N₂ = I₂ / I₁     S = U · I",
    explanation:
      "I en ideell transformator er effekten den samme på begge sider, sett bort fra tap. Høyere spenning gir lavere strøm. N2 følger av N1 og spenningsforholdet.",
    compute(input) {
      const u1 = num(input, "u1");
      const u2 = num(input, "u2");
      const s = num(input, "s");
      const n1 = num(input, "n1");
      if (!allNumbers([u1, u2, s]) || u1 <= 0 || u2 <= 0) return [];
      const i1 = s / u1;
      const i2 = s / u2;
      const n2 = Number.isFinite(n1) && n1 > 0 ? n1 * (u2 / u1) : Number.NaN;
      const out = [
        result("i2", "Sekundærstrøm I2", i2, {
          digits: 3,
          unit: "A",
          primary: true,
        }),
        result("i1", "Primærstrøm I1", i1, { digits: 3, unit: "A" }),
        result("n", "Omsetningsforhold U1/U2", u1 / u2, { digits: 2 }),
      ];
      if (Number.isFinite(n2)) {
        out.push(result("n2", "Vindinger sekundær N2", n2, { digits: 0 }));
      }
      return out;
    },
  },
  {
    slug: "kondensator",
    title: "Kondensator",
    description: "Finn ladning og lagret energi i en kondensator.",
    category: "elektro",
    tags: ["kondensator", "kapasitans", "energi", "elektro"],
    fields: [
      {
        id: "c",
        label: "Kapasitans",
        type: "number",
        unit: "µF",
        defaultValue: 100,
      },
      { id: "u", label: "Spenning", type: "number", unit: "V", defaultValue: 24 },
    ],
    formula: "Q = C · U     E = ½ C · U²",
    explanation:
      "Oppgi C i mikrofarad. 100 µF er 0,0001 F. Energien vokser med spenningen i annen, derfor kan kondensatorer lagre farlig ladning selv etter at anlegget er slått av.",
    disclaimer: "Ladede kondensatorer kan gi støt. Utlad før arbeid.",
    compute(input) {
      const cuF = num(input, "c");
      const u = num(input, "u");
      if (!allNumbers([cuF, u]) || cuF < 0) return [];
      const C = cuF * 1e-6;
      const Q = C * u;
      const E = 0.5 * C * u * u;
      return [
        result("e", "Energi", E, { digits: 4, unit: "J", primary: true }),
        result("q", "Ladning Q", Q, { digits: 6, unit: "C" }),
        result("emj", "Energi", E * 1000, { digits: 2, unit: "mJ" }),
      ];
    },
  },
  {
    slug: "rc-tidskonstant",
    title: "RC-tidskonstant",
    shortTitle: "RC",
    description:
      "Finn τ = R · C og tiden det tar å lade eller utlade en RC-krets.",
    category: "elektro",
    tags: ["rc", "tidskonstant", "kondensator", "elektro"],
    fields: [
      { id: "r", label: "Resistans", type: "number", unit: "Ω", defaultValue: 10000 },
      {
        id: "c",
        label: "Kapasitans",
        type: "number",
        unit: "µF",
        defaultValue: 100,
      },
    ],
    formula: "τ = R · C     5τ ≈ 99 % av sluttverdien",
    explanation:
      "Etter én tidskonstant er kondensatoren ladet til omtrent 63 %. Etter 5τ er den praktisk talt ferdig. C må være i farad: 100 µF = 10⁻⁴ F, så 10 kΩ · 100 µF gir τ = 1 s.",
    compute(input) {
      const r = num(input, "r");
      const cuF = num(input, "c");
      if (!allNumbers([r, cuF]) || r < 0 || cuF < 0) return [];
      const tau = r * cuF * 1e-6;
      return [
        result("tau", "Tidskonstant τ", tau, {
          digits: 4,
          unit: "s",
          primary: true,
        }),
        result("t63", "Tid til 63 % (1τ)", tau, { digits: 4, unit: "s" }),
        result("t99", "Tid til ca. 99 % (5τ)", 5 * tau, { digits: 4, unit: "s" }),
      ];
    },
  },
  {
    slug: "reaktans-impedans",
    title: "Reaktans og impedans",
    shortTitle: "Impedans",
    description:
      "Finn XL, XC og impedans Z i en RLC-krets ved gitt frekvens.",
    category: "elektro",
    tags: ["impedans", "reaktans", "spole", "kondensator", "elektro"],
    fields: [
      { id: "f", label: "Frekvens", type: "number", unit: "Hz", defaultValue: 50 },
      { id: "r", label: "Resistans R", type: "number", unit: "Ω", defaultValue: 10 },
      {
        id: "l",
        label: "Induktans L",
        type: "number",
        unit: "mH",
        defaultValue: 100,
      },
      {
        id: "c",
        label: "Kapasitans C",
        type: "number",
        unit: "µF",
        defaultValue: 47,
        hint: "La feltet stå tomt hvis kretsen ikke har kondensator.",
      },
    ],
    formula: "X_L = 2πfL     X_C = 1 / (2πfC)     Z = √(R² + (X_L − X_C)²)",
    explanation:
      "Induktiv reaktans øker med frekvensen, kapasitiv synker. L oppgis i millihenry og C i mikrofarad. Nettfrekvensen i Norge er 50 Hz.",
    compute(input) {
      const f = num(input, "f");
      const r = num(input, "r");
      const lmH = num(input, "l");
      const cuF = num(input, "c");
      if (!allNumbers([f, r, lmH]) || f <= 0) return [];
      const L = lmH / 1000;
      const xl = 2 * Math.PI * f * L;
      const xc = Number.isFinite(cuF) && cuF > 0 ? 1 / (2 * Math.PI * f * cuF * 1e-6) : 0;
      const x = xl - xc;
      const z = Math.sqrt(r * r + x * x);
      const phi = (Math.atan2(x, r) * 180) / Math.PI;
      return [
        result("z", "Impedans Z", z, { digits: 2, unit: "Ω", primary: true }),
        result("xl", "Induktiv reaktans XL", xl, { digits: 2, unit: "Ω" }),
        result("xc", "Kapasitiv reaktans XC", xc, { digits: 2, unit: "Ω" }),
        result("phi", "Fasevinkel φ", phi, { digits: 1, unit: "°" }),
      ];
    },
  },
  {
    slug: "rms-verdi",
    title: "Effektivverdi (RMS)",
    shortTitle: "RMS",
    description:
      "Regn om mellom toppverdi og effektivverdi for sinusformet vekselspenning.",
    category: "elektro",
    tags: ["rms", "effektivverdi", "vekselstrøm", "sinus", "elektro"],
    fields: [
      {
        id: "hva",
        label: "Jeg har",
        type: "select",
        defaultValue: "eff",
        options: [
          { value: "eff", label: "Effektivverdi (230 V)" },
          { value: "topp", label: "Toppverdi / amplitude" },
        ],
      },
      {
        id: "verdi",
        label: "Verdi",
        type: "number",
        unit: "V",
        defaultValue: 230,
      },
    ],
    formula: "U_eff = U_maks / √2     U_maks = U_eff · √2",
    explanation:
      "For sinus er effektivverdien toppverdien delt på √2. 230 V i stikkontakten har toppverdi omtrent 325 V. Formelen gjelder sinus, ikke firkant eller vilkårlig bølge.",
    compute(input) {
      const v = num(input, "verdi");
      if (!Number.isFinite(v) || v < 0) return [];
      const topp = input.hva === "topp" ? v : v * Math.SQRT2;
      const eff = input.hva === "topp" ? v / Math.SQRT2 : v;
      return [
        result("eff", "Effektivverdi", eff, {
          digits: 2,
          unit: "V",
          primary: true,
        }),
        result("topp", "Toppverdi", topp, { digits: 2, unit: "V" }),
        result("pp", "Topp-til-topp", 2 * topp, { digits: 2, unit: "V" }),
      ];
    },
  },
  {
    slug: "trefase-effekt",
    title: "Trefaseeffekt",
    shortTitle: "Trefase",
    description:
      "Finn aktiv, reaktiv og tilsynelatende effekt i et symmetrisk trefasenett.",
    category: "elektro",
    tags: ["trefase", "effekt", "cos phi", "elektro"],
    fields: [
      {
        id: "u",
        label: "Hovedspenning U",
        type: "number",
        unit: "V",
        defaultValue: 400,
        hint: "400 V mellom fasene i vanlig norsk fordelingsnett.",
      },
      { id: "i", label: "Linjestrøm I", type: "number", unit: "A", defaultValue: 16 },
      {
        id: "cos",
        label: "Effektfaktor cos φ",
        type: "number",
        defaultValue: 0.85,
        step: 0.01,
      },
    ],
    formula: "P = √3 · U · I · cos φ     S = √3 · U · I     Q = √3 · U · I · sin φ",
    explanation:
      "U er linjespenning (hovedspenning), I er linjestrøm. cos φ er 1 for ren resistiv last. Motorer ligger ofte rundt 0,8–0,9.",
    compute(input) {
      const u = num(input, "u");
      const i = num(input, "i");
      const c = num(input, "cos");
      if (!allNumbers([u, i, c]) || Math.abs(c) > 1) return [];
      const s = Math.sqrt(3) * u * i;
      const p = s * c;
      const q = s * Math.sqrt(Math.max(0, 1 - c * c));
      return [
        result("p", "Aktiv effekt P", p, { digits: 1, unit: "W", primary: true }),
        result("s", "Tilsynelatende S", s, { digits: 1, unit: "VA" }),
        result("q", "Reaktiv Q", q, { digits: 1, unit: "var" }),
        result("kw", "Aktiv effekt", p / 1000, { digits: 3, unit: "kW" }),
      ];
    },
  },
  {
    slug: "frekvens-periode",
    title: "Frekvens og periode",
    shortTitle: "Frekvens",
    description: "Regn om mellom frekvens, periode og vinkelfrekvens.",
    category: "elektro",
    tags: ["frekvens", "periode", "hertz", "elektro"],
    fields: [
      {
        id: "f",
        label: "Frekvens f",
        type: "number",
        unit: "Hz",
        defaultValue: 50,
        hint: "La feltet stå tomt for å finne f fra perioden.",
      },
      {
        id: "t",
        label: "Periode T",
        type: "number",
        unit: "s",
        hint: "La feltet stå tomt for å finne T fra frekvensen.",
      },
    ],
    formula: "f = 1 / T     ω = 2πf",
    explanation:
      "50 Hz i det norske nettet betyr at perioden er 20 ms. Vinkelfrekvens ω brukes i reaktansformlene.",
    compute(input) {
      let f = num(input, "f");
      let t = num(input, "t");
      if (Number.isFinite(f) && f > 0 && !Number.isFinite(t)) t = 1 / f;
      else if (Number.isFinite(t) && t > 0 && !Number.isFinite(f)) f = 1 / t;
      else if (Number.isFinite(f) && f > 0) t = 1 / f;
      if (!Number.isFinite(f) || !Number.isFinite(t) || f <= 0 || t <= 0) return [];
      return [
        result("f", "Frekvens", f, { digits: 4, unit: "Hz", primary: true }),
        result("t", "Periode", t, { digits: 6, unit: "s" }),
        result("ms", "Periode", t * 1000, { digits: 3, unit: "ms" }),
        result("w", "Vinkelfrekvens ω", 2 * Math.PI * f, {
          digits: 2,
          unit: "rad/s",
        }),
      ];
    },
  },
  {
    slug: "joule-varme",
    title: "Joules lov (varme i leder)",
    shortTitle: "Joule",
    description: "Finn varmen som utvikles i en motstand: Q = R · I² · t.",
    category: "elektro",
    tags: ["joule", "varme", "effekt", "elektro"],
    fields: [
      { id: "r", label: "Resistans", type: "number", unit: "Ω", defaultValue: 2 },
      { id: "i", label: "Strøm", type: "number", unit: "A", defaultValue: 10 },
      { id: "t", label: "Tid", type: "number", unit: "s", defaultValue: 60 },
    ],
    formula: "Q = R · I² · t     P = R · I²",
    explanation:
      "Varmen i en leder er effekten ganger tiden. Høy strøm varmer mye fordi I går i annen. Det er derfor tverrsnitt og vern må stemme overens.",
    compute(input) {
      const r = num(input, "r");
      const i = num(input, "i");
      const t = num(input, "t");
      if (!allNumbers([r, i, t]) || t < 0) return [];
      const p = r * i * i;
      const q = p * t;
      return [
        result("q", "Varmeenergi Q", q, { digits: 1, unit: "J", primary: true }),
        result("p", "Effekt P", p, { digits: 2, unit: "W" }),
        result("kwh", "Energi", q / 3.6e6, { digits: 6, unit: "kWh" }),
      ];
    },
  },
  {
    slug: "led-motstand",
    title: "LED-motstand",
    shortTitle: "LED",
    description:
      "Finn seriemotstand for LED fra forsyningsspenning, LED-spenning og strøm.",
    category: "elektro",
    tags: ["led", "motstand", "elektronikk", "elektro"],
    popular: true,
    fields: [
      {
        id: "vs",
        label: "Forsyningsspenning",
        type: "number",
        unit: "V",
        defaultValue: 5,
      },
      {
        id: "vf",
        label: "LED-spenning Vf",
        type: "number",
        unit: "V",
        defaultValue: 2.1,
        hint: "Rød ca. 1,8 V. Hvit ca. 3,0 V.",
      },
      {
        id: "i",
        label: "LED-strøm",
        type: "number",
        unit: "mA",
        defaultValue: 20,
      },
    ],
    formula: "R = (Vs − Vf) / I",
    explanation:
      "Motstanden tar opp restspenningen slik at LED-en får riktig strøm. Uten motstand brenner LED-en ofte ut.",
    compute(input) {
      const vs = num(input, "vs");
      const vf = num(input, "vf");
      const iMa = num(input, "i");
      if (!allNumbers([vs, vf, iMa]) || iMa <= 0 || vs <= vf) return [];
      const i = iMa / 1000;
      const r = (vs - vf) / i;
      const p = (vs - vf) * i;
      return [
        result("r", "Motstand R", r, { digits: 1, unit: "Ω", primary: true }),
        result("p", "Effekt i R", p * 1000, { digits: 1, unit: "mW" }),
        result("e24", "Nærmeste E24", nearestE24(r), { kind: "integer", unit: "Ω" }),
      ];
    },
  },
  {
    slug: "batteri-wh-ah",
    title: "Batteri Wh og Ah",
    shortTitle: "Wh / Ah",
    description: "Omregn mellom Wh, Ah og kapasitet ved gitt spenning.",
    category: "elektro",
    tags: ["batteri", "wh", "ah", "kapasitet", "elektro"],
    fields: [
      {
        id: "modus",
        label: "Regn ut",
        type: "select",
        defaultValue: "wh",
        options: [
          { value: "wh", label: "Wh fra Ah" },
          { value: "ah", label: "Ah fra Wh" },
        ],
      },
      {
        id: "u",
        label: "Spenning",
        type: "number",
        unit: "V",
        defaultValue: 12,
      },
      {
        id: "verdi",
        label: "Ah eller Wh",
        type: "number",
        defaultValue: 100,
      },
    ],
    formula: "Wh = U · Ah     Ah = Wh / U",
    explanation:
      "Wh forteller energimengden. Ah alene sier ikke alt – et 12 V og 24 V batteri med samme Ah har ulik energi.",
    compute(input) {
      const u = num(input, "u");
      const verdi = num(input, "verdi");
      if (!allNumbers([u, verdi]) || u <= 0 || verdi < 0) return [];
      if (input.modus === "ah") {
        const ah = verdi / u;
        return [
          result("ah", "Kapasitet", ah, { digits: 2, unit: "Ah", primary: true }),
          result("wh", "Energi", verdi, { digits: 1, unit: "Wh" }),
        ];
      }
      const wh = u * verdi;
      return [
        result("wh", "Energi", wh, { digits: 1, unit: "Wh", primary: true }),
        result("ah", "Kapasitet", verdi, { digits: 2, unit: "Ah" }),
      ];
    },
  },
];

function nearestE24(r: number): number {
  const e24 = [
    1.0, 1.1, 1.2, 1.3, 1.5, 1.6, 1.8, 2.0, 2.2, 2.4, 2.7, 3.0, 3.3, 3.6, 3.9,
    4.3, 4.7, 5.1, 5.6, 6.2, 6.8, 7.5, 8.2, 9.1,
  ];
  const decade = Math.pow(10, Math.floor(Math.log10(r)));
  const norm = r / decade;
  let best = e24[0];
  let diff = Infinity;
  for (const v of e24) {
    const d = Math.abs(v - norm);
    if (d < diff) {
      diff = d;
      best = v;
    }
  }
  return Math.round(best * decade);
}
