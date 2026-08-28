import type { Calculator, ResultItem } from "../types";
import { num } from "../format";
import { allNumbers, result } from "../helpers";

function parseList(raw: string | undefined): number[] {
  return (raw ?? "")
    .split(/[,;\s]+/)
    .map((p) => p.trim())
    .filter(Boolean)
    .map((p) => Number(p.replace(",", ".")))
    .filter((n) => Number.isFinite(n));
}

function mean(xs: number[]): number {
  return xs.reduce((a, b) => a + b, 0) / xs.length;
}

function median(xs: number[]): number {
  const s = [...xs].sort((a, b) => a - b);
  const m = Math.floor(s.length / 2);
  return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2;
}

function variance(xs: number[], sample: boolean): number {
  const mu = mean(xs);
  const denom = sample ? xs.length - 1 : xs.length;
  if (denom <= 0) return Number.NaN;
  return xs.reduce((a, x) => a + (x - mu) ** 2, 0) / denom;
}

function quantile(xs: number[], p: number): number {
  const s = [...xs].sort((a, b) => a - b);
  if (s.length === 1) return s[0];
  const idx = (s.length - 1) * p;
  const lo = Math.floor(idx);
  const hi = Math.ceil(idx);
  if (lo === hi) return s[lo];
  return s[lo] * (hi - idx) + s[hi] * (idx - lo);
}

function factorial(n: number): number {
  if (n < 0 || !Number.isInteger(n)) return Number.NaN;
  if (n > 170) return Number.POSITIVE_INFINITY;
  let r = 1;
  for (let i = 2; i <= n; i++) r *= i;
  return r;
}

function permutations(n: number, k: number): number {
  if (k < 0 || n < 0 || k > n || !Number.isInteger(n) || !Number.isInteger(k)) {
    return Number.NaN;
  }
  let r = 1;
  for (let i = 0; i < k; i++) r *= n - i;
  return r;
}

function combinations(n: number, k: number): number {
  if (k < 0 || n < 0 || k > n || !Number.isInteger(n) || !Number.isInteger(k)) {
    return Number.NaN;
  }
  k = Math.min(k, n - k);
  let r = 1;
  for (let i = 1; i <= k; i++) r = (r * (n - k + i)) / i;
  return Math.round(r);
}

/** Approximate Φ(z) for standard normal CDF (Abramowitz & Stegun 26.2.17). */
function normCdf(z: number): number {
  const t = 1 / (1 + 0.2316419 * Math.abs(z));
  const d = 0.3989423 * Math.exp((-z * z) / 2);
  const p =
    d *
    t *
    (0.3193815 +
      t * (-0.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274))));
  return z >= 0 ? 1 - p : p;
}

/** Approximate inverse standard normal (Beasley-Springer/Moro-ish rational). */
function normInv(p: number): number {
  if (p <= 0 || p >= 1) return Number.NaN;
  const a = [
    -3.969683028665376e1, 2.209460984245205e2, -2.759285104469687e2,
    1.38357751867269e2, -3.066479806614736e1, 2.506628277459239,
  ];
  const b = [
    -5.447609879822406e1, 1.615858368580409e2, -1.556989798598866e2,
    6.680131188771972e1, -1.328068155288572e1,
  ];
  const c = [
    -7.784894002430293e-3, -3.223964580411365e-1, -2.400758277161838,
    -2.549732539343734, 4.374664141464968, 2.938163982698783,
  ];
  const d = [
    7.784695709041462e-3, 3.224671290700398e-1, 2.445134137142996,
    3.754408661907416,
  ];
  const plow = 0.02425;
  const phigh = 1 - plow;
  let q: number;
  let r: number;
  if (p < plow) {
    q = Math.sqrt(-2 * Math.log(p));
    return (
      (((((c[0] * q + c[1]) * q + c[2]) * q + c[3]) * q + c[4]) * q + c[5]) /
      ((((d[0] * q + d[1]) * q + d[2]) * q + d[3]) * q + 1)
    );
  }
  if (p > phigh) {
    q = Math.sqrt(-2 * Math.log(1 - p));
    return (
      -(((((c[0] * q + c[1]) * q + c[2]) * q + c[3]) * q + c[4]) * q + c[5]) /
      ((((d[0] * q + d[1]) * q + d[2]) * q + d[3]) * q + 1)
    );
  }
  q = p - 0.5;
  r = q * q;
  return (
    ((((((a[0] * r + a[1]) * r + a[2]) * r + a[3]) * r + a[4]) * r + a[5]) * q) /
    (((((b[0] * r + b[1]) * r + b[2]) * r + b[3]) * r + b[4]) * r + 1)
  );
}

function zCritical(confidencePct: number): number {
  const alpha = 1 - confidencePct / 100;
  return normInv(1 - alpha / 2);
}

export const statistikkCalculators: Calculator[] = [
  {
    slug: "deskriptiv-statistikk",
    title: "Deskriptiv statistikk",
    shortTitle: "Deskriptiv",
    description:
      "Snitt, median, modus, variasjonsbredde, kvartiler, varians og standardavvik fra en talliste.",
    category: "statistikk",
    tags: ["snitt", "median", "standardavvik", "varians", "kvartil", "statistikk"],
    popular: true,
    fields: [
      {
        id: "tall",
        label: "Observasjoner",
        type: "text",
        defaultValue: "12, 15, 14, 10, 18, 15, 11, 16",
        hint: "Skill med komma, semikolon eller mellomrom.",
      },
      {
        id: "type",
        label: "Utvalg eller populasjon",
        type: "select",
        defaultValue: "utvalg",
        options: [
          { value: "utvalg", label: "Utvalg (n − 1 i nevneren)" },
          { value: "populasjon", label: "Populasjon (n i nevneren)" },
        ],
      },
    ],
    formula: "x̄ = Σx / n     s² = Σ(x − x̄)² / (n − 1)",
    explanation:
      "Utvalg bruker n − 1 (korreksjon for skjevhet). Median er midterste verdi. Q1 og Q3 er 25- og 75-persentilene.",
    compute(input) {
      const xs = parseList(input.tall);
      if (xs.length === 0) return [];
      const sample = input.type !== "populasjon";
      if (sample && xs.length < 2) {
        return [
          result("hint", "Trenger mer data", "Utvalg krever minst to observasjoner.", {
            kind: "text",
            primary: true,
          }),
        ];
      }
      const mu = mean(xs);
      const med = median(xs);
      const v = variance(xs, sample);
      const s = Math.sqrt(v);
      const sorted = [...xs].sort((a, b) => a - b);
      const freq = new Map<number, number>();
      for (const x of xs) freq.set(x, (freq.get(x) ?? 0) + 1);
      let maxF = 0;
      for (const f of freq.values()) maxF = Math.max(maxF, f);
      const modes = [...freq.entries()]
        .filter(([, f]) => f === maxF && maxF > 1)
        .map(([x]) => x);
      const out: ResultItem[] = [
        result("snitt", "Gjennomsnitt", mu, { digits: 4, primary: true }),
        result("median", "Median", med, { digits: 4 }),
        result("n", "Antall n", xs.length, { kind: "integer" }),
        result("sum", "Sum", xs.reduce((a, b) => a + b, 0), { digits: 4 }),
        result("min", "Min", sorted[0], { digits: 4 }),
        result("max", "Maks", sorted[sorted.length - 1], { digits: 4 }),
        result("bredde", "Variasjonsbredde", sorted[sorted.length - 1] - sorted[0], {
          digits: 4,
        }),
        result("q1", "1. kvartil (Q1)", quantile(xs, 0.25), { digits: 4 }),
        result("q3", "3. kvartil (Q3)", quantile(xs, 0.75), { digits: 4 }),
        result("iqr", "Kvartilbredde (IQR)", quantile(xs, 0.75) - quantile(xs, 0.25), {
          digits: 4,
        }),
        result("var", sample ? "Utvalgsvarians s²" : "Populasjonsvarians σ²", v, {
          digits: 4,
        }),
        result("sd", sample ? "Standardavvik s" : "Standardavvik σ", s, {
          digits: 4,
        }),
      ];
      if (modes.length) {
        out.splice(
          2,
          0,
          result("modus", "Modus", modes.map(String).join(", "), { kind: "text" }),
        );
      }
      return out;
    },
  },
  {
    slug: "standardavvik",
    title: "Standardavvik",
    description:
      "Regn ut standardavvik og varians for et utvalg eller en populasjon.",
    category: "statistikk",
    tags: ["standardavvik", "varians", "spredning", "statistikk"],
    popular: true,
    fields: [
      {
        id: "tall",
        label: "Tall",
        type: "text",
        defaultValue: "2, 4, 4, 4, 5, 5, 7, 9",
      },
      {
        id: "type",
        label: "Type",
        type: "select",
        defaultValue: "utvalg",
        options: [
          { value: "utvalg", label: "Utvalg (s)" },
          { value: "populasjon", label: "Populasjon (σ)" },
        ],
      },
    ],
    formula: "s = √( Σ(x − x̄)² / (n − 1) )",
    explanation:
      "Standardavviket forteller typisk avvik fra snittet. Variansen er standardavviket i annen.",
    compute(input) {
      const xs = parseList(input.tall);
      const sample = input.type !== "populasjon";
      if (xs.length < (sample ? 2 : 1)) return [];
      const mu = mean(xs);
      const v = variance(xs, sample);
      return [
        result("sd", sample ? "Standardavvik s" : "Standardavvik σ", Math.sqrt(v), {
          digits: 4,
          primary: true,
        }),
        result("var", sample ? "Varians s²" : "Varians σ²", v, { digits: 4 }),
        result("snitt", "Gjennomsnitt", mu, { digits: 4 }),
        result("cv", "Variasjonskoeffisient", mu === 0 ? 0 : (Math.sqrt(v) / Math.abs(mu)) * 100, {
          kind: "percent",
          digits: 2,
        }),
      ];
    },
  },
  {
    slug: "z-verdi",
    title: "z-verdi (standardisering)",
    shortTitle: "z-verdi",
    description:
      "Finn z = (x − μ) / σ, eller finn x fra z. Viser også kumulativ sannsynlighet.",
    category: "statistikk",
    tags: ["z", "normalfordeling", "standardisering", "statistikk"],
    popular: true,
    fields: [
      { id: "x", label: "Observasjon x", type: "number", defaultValue: 115 },
      { id: "mu", label: "Gjennomsnitt μ", type: "number", defaultValue: 100 },
      {
        id: "sigma",
        label: "Standardavvik σ",
        type: "number",
        defaultValue: 15,
      },
    ],
    formula: "z = (x − μ) / σ",
    explanation:
      "z forteller hvor mange standardavvik x ligger fra snittet. z = 0 er snittet, z = 2 er uvanlig høyt i mange sammenhenger.",
    compute(input) {
      const x = num(input, "x");
      const mu = num(input, "mu");
      const sigma = num(input, "sigma");
      if (!allNumbers([x, mu, sigma]) || sigma <= 0) return [];
      const z = (x - mu) / sigma;
      const under = normCdf(z) * 100;
      return [
        result("z", "z-verdi", z, { digits: 3, primary: true }),
        result("under", "P(X ≤ x) ca.", under, { kind: "percent", digits: 2 }),
        result("over", "P(X ≥ x) ca.", 100 - under, { kind: "percent", digits: 2 }),
      ];
    },
  },
  {
    slug: "normalfordeling",
    title: "Normalfordeling",
    description:
      "Finn sannsynlighet mellom to grenser, eller x-verdi fra persentil, under normalfordeling.",
    category: "statistikk",
    tags: ["normalfordeling", "gauss", "persentil", "statistikk"],
    fields: [
      {
        id: "modus",
        label: "Jeg vil",
        type: "select",
        defaultValue: "intervall",
        options: [
          { value: "intervall", label: "Sannsynlighet mellom a og b" },
          { value: "persentil", label: "Finn x fra persentil" },
        ],
      },
      { id: "mu", label: "μ", type: "number", defaultValue: 100 },
      { id: "sigma", label: "σ", type: "number", defaultValue: 15 },
      { id: "a", label: "Nedre grense a", type: "number", defaultValue: 85 },
      { id: "b", label: "Øvre grense b", type: "number", defaultValue: 115 },
      {
        id: "p",
        label: "Persentil",
        type: "number",
        unit: "%",
        defaultValue: 90,
        hint: "F.eks. 90 for 90-persentilen.",
      },
    ],
    formula: "X ~ N(μ, σ²)     z = (x − μ) / σ",
    explanation:
      "Ca. 68 % av dataene ligger innenfor ±1σ, 95 % innenfor ±2σ. Tallene er tilnærminger via standardnormalfordelingen.",
    compute(input) {
      const mu = num(input, "mu");
      const sigma = num(input, "sigma");
      if (!allNumbers([mu, sigma]) || sigma <= 0) return [];
      if (input.modus === "persentil") {
        const p = num(input, "p");
        if (!Number.isFinite(p) || p <= 0 || p >= 100) return [];
        const z = normInv(p / 100);
        const x = mu + z * sigma;
        return [
          result("x", `${p}-persentilen`, x, { digits: 3, primary: true }),
          result("z", "z", z, { digits: 3 }),
        ];
      }
      const a = num(input, "a");
      const b = num(input, "b");
      if (!allNumbers([a, b])) return [];
      const lo = Math.min(a, b);
      const hi = Math.max(a, b);
      const p = (normCdf((hi - mu) / sigma) - normCdf((lo - mu) / sigma)) * 100;
      return [
        result("p", `P(${lo} ≤ X ≤ ${hi})`, p, {
          kind: "percent",
          digits: 2,
          primary: true,
        }),
        result("under", `P(X ≤ ${hi})`, normCdf((hi - mu) / sigma) * 100, {
          kind: "percent",
          digits: 2,
        }),
      ];
    },
  },
  {
    slug: "konfidensintervall",
    title: "Konfidensintervall for snitt",
    shortTitle: "Konfidensintervall",
    description:
      "Estimer et intervall for populasjonssnittet når σ er kjent (z) eller s brukes som tilnærming.",
    category: "statistikk",
    tags: ["konfidensintervall", "snitt", "utvalg", "statistikk"],
    fields: [
      { id: "snitt", label: "Utvalgssnitt x̄", type: "number", defaultValue: 52 },
      {
        id: "s",
        label: "Standardavvik (s eller σ)",
        type: "number",
        defaultValue: 8,
      },
      { id: "n", label: "Utvalgsstørrelse n", type: "number", defaultValue: 40 },
      {
        id: "konf",
        label: "Konfidensnivå",
        type: "select",
        defaultValue: "95",
        options: [
          { value: "90", label: "90 %" },
          { value: "95", label: "95 %" },
          { value: "99", label: "99 %" },
        ],
      },
    ],
    formula: "x̄ ± z · (s / √n)",
    explanation:
      "For store n (tommelfinger ≥ 30) er z-tilnærming grei også når s erstatter σ. Mindre utvalg bør egentlig bruke t-fordeling.",
    disclaimer: "z-basert tilnærming. Bruk t-fordeling for små utvalg når σ er ukjent.",
    compute(input) {
      const xbar = num(input, "snitt");
      const s = num(input, "s");
      const n = num(input, "n");
      const konf = Number(input.konf) || 95;
      if (!allNumbers([xbar, s, n]) || n <= 0 || s < 0) return [];
      const z = zCritical(konf);
      const se = s / Math.sqrt(n);
      const margin = z * se;
      return [
        result(
          "int",
          `${konf} % konfidensintervall`,
          `${(xbar - margin).toFixed(3)} – ${(xbar + margin).toFixed(3)}`,
          { kind: "text", primary: true },
        ),
        result("margin", "Feilmargin", margin, { digits: 4 }),
        result("se", "Standardfeil", se, { digits: 4 }),
        result("z", "z-kritisk", z, { digits: 3 }),
      ];
    },
  },
  {
    slug: "kombinatorikk",
    title: "Kombinatorikk (nCr og nPr)",
    shortTitle: "nCr / nPr",
    description:
      "Finn antall kombinasjoner og permutasjoner, pluss n!.",
    category: "statistikk",
    tags: ["kombinasjoner", "permutasjoner", "fakultet", "nCr", "statistikk"],
    popular: true,
    fields: [
      { id: "n", label: "n", type: "number", defaultValue: 10 },
      { id: "k", label: "k", type: "number", defaultValue: 3 },
    ],
    formula: "nPr = n! / (n−k)!     nCr = n! / (k! · (n−k)!)",
    explanation:
      "Permutasjoner teller rekkefølge (rekkefølge betyr noe). Kombinasjoner teller utvalg der rekkefølge ikke betyr noe.",
    compute(input) {
      const n = num(input, "n");
      const k = num(input, "k");
      if (!allNumbers([n, k])) return [];
      const ni = Math.round(n);
      const ki = Math.round(k);
      const c = combinations(ni, ki);
      const p = permutations(ni, ki);
      const f = factorial(ni);
      if (!Number.isFinite(c) || !Number.isFinite(p)) return [];
      const faktResult = Number.isFinite(f)
        ? result("fakt", "n!", f, { kind: "integer" })
        : result("fakt", "n!", "For stort", { kind: "text" });
      return [
        result("cr", "Kombinasjoner nCr", c, {
          kind: "integer",
          primary: true,
        }),
        result("pr", "Permutasjoner nPr", p, { kind: "integer" }),
        faktResult,
      ];
    },
  },
  {
    slug: "binomialsannsynlighet",
    title: "Binomialsannsynlighet",
    shortTitle: "Binomial",
    description:
      "P(X = k) og kumulativ sannsynlighet for X ~ Bin(n, p).",
    category: "statistikk",
    tags: ["binomial", "sannsynlighet", "statistikk"],
    fields: [
      {
        id: "n",
        label: "Antall forsøk n",
        type: "number",
        defaultValue: 10,
      },
      {
        id: "p",
        label: "Sannsynlighet p per forsøk",
        type: "number",
        defaultValue: 0.5,
        step: 0.01,
        hint: "Mellom 0 og 1, f.eks. 0,5 for myntkast.",
      },
      {
        id: "k",
        label: "Antall treff k",
        type: "number",
        defaultValue: 6,
      },
    ],
    formula: "P(X = k) = C(n,k) · pᵏ · (1−p)ⁿ⁻ᵏ",
    explanation:
      "Uavhengige forsøk med to utfall. Forventning μ = np, varians = np(1−p).",
    compute(input) {
      const n = Math.round(num(input, "n"));
      const p = num(input, "p");
      const k = Math.round(num(input, "k"));
      if (!allNumbers([n, p, k]) || n < 0 || k < 0 || k > n || p < 0 || p > 1) {
        return [];
      }
      const pk = combinations(n, k) * p ** k * (1 - p) ** (n - k);
      let cum = 0;
      for (let i = 0; i <= k; i++) {
        cum += combinations(n, i) * p ** i * (1 - p) ** (n - i);
      }
      return [
        result("pk", `P(X = ${k})`, pk * 100, {
          kind: "percent",
          digits: 3,
          primary: true,
        }),
        result("cum", `P(X ≤ ${k})`, cum * 100, { kind: "percent", digits: 3 }),
        result("over", `P(X ≥ ${k})`, (1 - cum + pk) * 100, {
          kind: "percent",
          digits: 3,
        }),
        result("mu", "Forventning μ = np", n * p, { digits: 3 }),
      ];
    },
  },
  {
    slug: "sannsynlighet-enkel",
    title: "Enkel sannsynlighet",
    shortTitle: "Sannsynlighet",
    description:
      "Klassisk sannsynlighet gunstige/mulige, og produkt/sum for uavhengige hendelser.",
    category: "statistikk",
    tags: ["sannsynlighet", "hendelse", "statistikk"],
    fields: [
      {
        id: "modus",
        label: "Type",
        type: "select",
        defaultValue: "klassisk",
        options: [
          { value: "klassisk", label: "Gunstige / mulige" },
          { value: "og", label: "P(A og B), uavhengige" },
          { value: "eller", label: "P(A eller B), disjunkte" },
        ],
      },
      {
        id: "gunstige",
        label: "Gunstige utfall",
        type: "number",
        defaultValue: 1,
      },
      {
        id: "mulige",
        label: "Mulige utfall",
        type: "number",
        defaultValue: 6,
      },
      {
        id: "pa",
        label: "P(A)",
        type: "number",
        defaultValue: 0.5,
        step: 0.01,
      },
      {
        id: "pb",
        label: "P(B)",
        type: "number",
        defaultValue: 0.3,
        step: 0.01,
      },
    ],
    formula: "P = gunstige / mulige     P(A∩B) = P(A)·P(B)",
    explanation:
      "Klassisk sannsynlighet forutsetter like sannsynlige utfall. «Og» forutsetter uavhengighet, «eller» forutsetter at hendelsene ikke kan skje samtidig.",
    compute(input) {
      if (input.modus === "og" || input.modus === "eller") {
        const pa = num(input, "pa");
        const pb = num(input, "pb");
        if (!allNumbers([pa, pb]) || pa < 0 || pb < 0 || pa > 1 || pb > 1) {
          return [];
        }
        const val = input.modus === "og" ? pa * pb : pa + pb;
        if (val > 1) {
          return [
            result("feil", "Ugyldig", "P(A)+P(B) > 1 – hendelsene kan ikke være disjunkte.", {
              kind: "text",
              primary: true,
            }),
          ];
        }
        return [
          result(
            "p",
            input.modus === "og" ? "P(A og B)" : "P(A eller B)",
            val * 100,
            { kind: "percent", digits: 2, primary: true },
          ),
        ];
      }
      const g = num(input, "gunstige");
      const m = num(input, "mulige");
      if (!allNumbers([g, m]) || m <= 0 || g < 0 || g > m) return [];
      return [
        result("p", "Sannsynlighet", (g / m) * 100, {
          kind: "percent",
          digits: 2,
          primary: true,
        }),
        result("odds", "Odds (for : mot)", `${g} : ${m - g}`, { kind: "text" }),
      ];
    },
  },
  {
    slug: "korrelasjon",
    title: "Korrelasjon (Pearson)",
    shortTitle: "Korrelasjon",
    description:
      "Finn Pearsons r mellom to like lange tallserier.",
    category: "statistikk",
    tags: ["korrelasjon", "pearson", "sammenheng", "statistikk"],
    fields: [
      {
        id: "x",
        label: "x-verdier",
        type: "text",
        defaultValue: "1, 2, 3, 4, 5",
      },
      {
        id: "y",
        label: "y-verdier",
        type: "text",
        defaultValue: "2, 3, 5, 4, 6",
      },
    ],
    formula: "r = Σ((x−x̄)(y−ȳ)) / √(Σ(x−x̄)² · Σ(y−ȳ)²)",
    explanation:
      "r ligger mellom −1 og 1. Nær 1: sterk positiv sammenheng. Nær 0: liten lineær sammenheng. Korrelasjon er ikke årsak.",
    compute(input) {
      const xs = parseList(input.x);
      const ys = parseList(input.y);
      if (xs.length < 2 || xs.length !== ys.length) {
        return [
          result("hint", "Data", "Listene må ha like mange tall, minst to.", {
            kind: "text",
            primary: true,
          }),
        ];
      }
      const mx = mean(xs);
      const my = mean(ys);
      let nume = 0;
      let dx = 0;
      let dy = 0;
      for (let i = 0; i < xs.length; i++) {
        const a = xs[i] - mx;
        const b = ys[i] - my;
        nume += a * b;
        dx += a * a;
        dy += b * b;
      }
      if (dx === 0 || dy === 0) return [];
      const r = nume / Math.sqrt(dx * dy);
      let tolk = "Svak lineær sammenheng";
      if (Math.abs(r) >= 0.7) tolk = "Sterk lineær sammenheng";
      else if (Math.abs(r) >= 0.4) tolk = "Moderat lineær sammenheng";
      return [
        result("r", "Pearsons r", r, { digits: 4, primary: true }),
        result("r2", "r²", r * r, { digits: 4 }),
        result("tolk", "Tolkning", `${tolk} (${r >= 0 ? "positiv" : "negativ"})`, {
          kind: "text",
        }),
      ];
    },
  },
  {
    slug: "lineaer-regresjon",
    title: "Lineær regresjon",
    shortTitle: "Regresjon",
    description: "Finn best tilpassede linje y = a + bx for to tallserier.",
    category: "statistikk",
    tags: ["regresjon", "trendlinje", "minste kvadrater", "statistikk"],
    fields: [
      {
        id: "x",
        label: "x-verdier",
        type: "text",
        defaultValue: "1, 2, 3, 4, 5",
      },
      {
        id: "y",
        label: "y-verdier",
        type: "text",
        defaultValue: "2.1, 2.9, 4.2, 5.0, 5.8",
      },
      {
        id: "pred",
        label: "Prediker y for x =",
        type: "number",
        defaultValue: 6,
      },
    ],
    formula: "b = Σ((x−x̄)(y−ȳ)) / Σ(x−x̄)²     a = ȳ − b·x̄",
    explanation:
      "Minste kvadraters metode. b er stigningstallet, a er skjæringspunktet med y-aksen.",
    compute(input) {
      const xs = parseList(input.x);
      const ys = parseList(input.y);
      const pred = num(input, "pred");
      if (xs.length < 2 || xs.length !== ys.length) return [];
      const mx = mean(xs);
      const my = mean(ys);
      let sxy = 0;
      let sxx = 0;
      for (let i = 0; i < xs.length; i++) {
        sxy += (xs[i] - mx) * (ys[i] - my);
        sxx += (xs[i] - mx) ** 2;
      }
      if (sxx === 0) return [];
      const b = sxy / sxx;
      const a = my - b * mx;
      const out: ResultItem[] = [
        result("eq", "Linje", `y = ${a.toFixed(4)} + ${b.toFixed(4)} · x`, {
          kind: "text",
          primary: true,
        }),
        result("b", "Stigningstall b", b, { digits: 4 }),
        result("a", "Skjæring a", a, { digits: 4 }),
      ];
      if (Number.isFinite(pred)) {
        out.push(
          result("yhat", `Predikert y (${pred})`, a + b * pred, { digits: 4 }),
        );
      }
      return out;
    },
  },
  {
    slug: "relativ-frekvens",
    title: "Relativ frekvens",
    description:
      "Omregn frekvenstabell til relative frekvenser og prosent.",
    category: "statistikk",
    tags: ["frekvens", "prosent", "tabell", "statistikk"],
    fields: [
      {
        id: "frekvenser",
        label: "Frekvenser",
        type: "text",
        defaultValue: "12, 18, 7, 3",
        hint: "Antall i hver kategori, skilt med komma.",
      },
    ],
    formula: "relativ frekvens = f / n",
    explanation:
      "Summen av relative frekvenser er 1 (100 %). Brukes i søylediagram og sektordiagram.",
    compute(input) {
      const fs = parseList(input.frekvenser);
      if (fs.length === 0 || fs.some((f) => f < 0)) return [];
      const n = fs.reduce((a, b) => a + b, 0);
      if (n <= 0) return [];
      const out: ResultItem[] = [
        result("n", "Totalt antall n", n, { kind: "integer", primary: true }),
      ];
      fs.forEach((f, i) => {
        out.push(
          result(`r${i}`, `Kategori ${i + 1}`, (f / n) * 100, {
            kind: "percent",
            digits: 2,
          }),
        );
      });
      return out;
    },
  },
  {
    slug: "utvalgsstorrelse",
    title: "Utvalgsstørrelse",
    shortTitle: "Utvalgsstørrelse",
    description:
      "Estimer nødvendig n for å estimere et snitt med gitt feilmargin (kjent σ).",
    category: "statistikk",
    tags: ["utvalg", "stikkprøve", "feilmargin", "statistikk"],
    fields: [
      {
        id: "sigma",
        label: "Estimert σ",
        type: "number",
        defaultValue: 10,
      },
      {
        id: "margin",
        label: "Ønsket feilmargin E",
        type: "number",
        defaultValue: 2,
      },
      {
        id: "konf",
        label: "Konfidensnivå",
        type: "select",
        defaultValue: "95",
        options: [
          { value: "90", label: "90 %" },
          { value: "95", label: "95 %" },
          { value: "99", label: "99 %" },
        ],
      },
    ],
    formula: "n = (z · σ / E)²",
    explanation:
      "Jo mindre feilmargin eller høyere konfidensnivå, desto større utvalg. Rund alltid opp.",
    compute(input) {
      const sigma = num(input, "sigma");
      const e = num(input, "margin");
      const konf = Number(input.konf) || 95;
      if (!allNumbers([sigma, e]) || e <= 0 || sigma < 0) return [];
      const z = zCritical(konf);
      const n = (z * sigma) / e;
      const n2 = n * n;
      return [
        result("n", "Nødvendig n (avrundet opp)", Math.ceil(n2), {
          kind: "integer",
          primary: true,
        }),
        result("eksakt", "n før avrunding", n2, { digits: 2 }),
        result("z", "z-kritisk", z, { digits: 3 }),
      ];
    },
  },
  {
    slug: "median-percentil",
    title: "Median og percentiler",
    shortTitle: "Percentiler",
    description:
      "Finn median, kvartiler og valgfri percentil fra en talliste.",
    category: "statistikk",
    tags: ["median", "percentil", "kvartil", "statistikk"],
    fields: [
      {
        id: "liste",
        label: "Tall",
        type: "text",
        defaultValue: "12, 15, 18, 21, 22, 25, 30, 35",
        hint: "Skill med komma eller mellomrom.",
      },
      {
        id: "p",
        label: "Percentil",
        type: "number",
        unit: "%",
        defaultValue: 90,
      },
    ],
    formula: "Pₚ = verdi ved posisjon p/100 · (n − 1)",
    explanation:
      "Medianen (P50) deler data i to like store grupper. Percentiler brukes i lønn, tester og vekstkurver.",
    compute(input) {
      const xs = parseList(input.liste);
      if (xs.length === 0) return [];
      const s = [...xs].sort((a, b) => a - b);
      const p = num(input, "p") ?? 50;
      const pct = (q: number) => {
        const pos = (q / 100) * (s.length - 1);
        const lo = Math.floor(pos);
        const hi = Math.ceil(pos);
        if (lo === hi) return s[lo];
        return s[lo] + (s[hi] - s[lo]) * (pos - lo);
      };
      return [
        result("med", "Median (P50)", median(xs), { digits: 4, primary: true }),
        result("q1", "Q1 (P25)", pct(25), { digits: 4 }),
        result("q3", "Q3 (P75)", pct(75), { digits: 4 }),
        result("pp", `P${p}`, pct(p), { digits: 4 }),
        result("n", "Antall", xs.length, { kind: "integer" }),
      ];
    },
  },
  {
    slug: "bayes-enkel",
    title: "Bayes (enkel)",
    shortTitle: "Bayes",
    description:
      "Finn sannsynligheten P(A|B) med Bayes' setning fra P(B|A), P(A) og P(B).",
    category: "statistikk",
    tags: ["bayes", "sannsynlighet", "statistikk", "betinget"],
    fields: [
      {
        id: "pb_a",
        label: "P(B|A)",
        type: "number",
        defaultValue: 0.9,
        hint: "Sannsynlighet for B gitt at A har skjedd.",
      },
      {
        id: "pa",
        label: "P(A)",
        type: "number",
        defaultValue: 0.01,
      },
      {
        id: "pb",
        label: "P(B)",
        type: "number",
        defaultValue: 0.05,
      },
    ],
    formula: "P(A|B) = P(B|A) · P(A) / P(B)",
    explanation:
      "Bayes snur betinget sannsynlighet. Eksempel: sjelden sykdom (lav P(A)) men positiv test (høy P(B|A)) – hva er sjansen for å faktisk være syk?",
    compute(input) {
      const pb_a = num(input, "pb_a");
      const pa = num(input, "pa");
      const pb = num(input, "pb");
      if (!allNumbers([pb_a, pa, pb]) || pb <= 0 || pa < 0 || pb_a < 0 || pb_a > 1)
        return [];
      const pa_b = (pb_a * pa) / pb;
      return [
        result("pa_b", "P(A|B)", pa_b, {
          digits: 4,
          primary: true,
        }),
        result("prosent", "I prosent", pa_b * 100, { kind: "percent", digits: 2 }),
      ];
    },
  },
];
