import type { Calculator } from "../types";
import { num } from "../format";
import { allNumbers, result } from "../helpers";

export const matematikkCalculators: Calculator[] = [
  {
    slug: "pythagoras",
    title: "Pythagoras",
    description:
      "Finn den ukjente siden i en rettvinklet trekant: a² + b² = c².",
    category: "matematikk",
    tags: ["pythagoras", "trekant", "geometri"],
    popular: true,
    fields: [
      {
        id: "a",
        label: "Katet a",
        type: "number",
        defaultValue: 3,
        hint: "La stå tom hvis a er ukjent.",
      },
      {
        id: "b",
        label: "Katet b",
        type: "number",
        defaultValue: 4,
        hint: "La stå tom hvis b er ukjent.",
      },
      {
        id: "c",
        label: "Hypotenus c",
        type: "number",
        hint: "La stå tom hvis c er ukjent.",
      },
    ],
    formula: "a² + b² = c²",
    explanation:
      "I en rettvinklet trekant er hypotenusen den lengste siden, motstående den rette vinkelen. Fyll inn to sider for å få den tredje.",
    compute(input) {
      const a = num(input, "a");
      const b = num(input, "b");
      const c = num(input, "c");
      const filled = [a, b, c].filter(Number.isFinite).length;
      if (filled !== 2) {
        return [
          result("hint", "Fyll inn", "Oppgi nøyaktig to av sidene.", {
            kind: "text",
            primary: true,
          }),
        ];
      }
      if (Number.isFinite(a) && Number.isFinite(b)) {
        const hyp = Math.sqrt(a * a + b * b);
        return [result("c", "Hypotenus c", hyp, { digits: 4, primary: true })];
      }
      if (Number.isFinite(c) && Number.isFinite(a)) {
        if (c <= a)
          return [
            result("feil", "Ugyldig", "Hypotenusen må være lengst.", {
              kind: "text",
              primary: true,
            }),
          ];
        return [
          result("b", "Katet b", Math.sqrt(c * c - a * a), {
            digits: 4,
            primary: true,
          }),
        ];
      }
      if (Number.isFinite(c) && Number.isFinite(b)) {
        if (c <= b)
          return [
            result("feil", "Ugyldig", "Hypotenusen må være lengst.", {
              kind: "text",
              primary: true,
            }),
          ];
        return [
          result("a", "Katet a", Math.sqrt(c * c - b * b), {
            digits: 4,
            primary: true,
          }),
        ];
      }
      return [];
    },
  },
  {
    slug: "areal",
    title: "Areal",
    description:
      "Regn ut areal av rektangel, trekant, sirkel, trapes og parallellogram.",
    category: "matematikk",
    tags: ["areal", "geometri", "arealberegning"],
    popular: true,
    fields: [
      {
        id: "figur",
        label: "Figur",
        type: "select",
        defaultValue: "rektangel",
        options: [
          { value: "rektangel", label: "Rektangel / kvadrat" },
          { value: "trekant", label: "Trekant" },
          { value: "sirkel", label: "Sirkel" },
          { value: "trapes", label: "Trapes" },
          { value: "parallellogram", label: "Parallellogram" },
        ],
      },
      {
        id: "x",
        label: "Side / lengde / radius / grunnlinje 1",
        type: "number",
        defaultValue: 8,
      },
      {
        id: "y",
        label: "Bredde / høyde / grunnlinje 2",
        type: "number",
        defaultValue: 5,
        hint: "Brukes ikke for sirkel.",
      },
      {
        id: "h",
        label: "Høyde (trapes)",
        type: "number",
        defaultValue: 4,
        hint: "Bare trapes.",
      },
    ],
    formula:
      "rektangel = l·b     trekant = (g·h)/2     sirkel = πr²     trapes = (a+b)·h/2",
    explanation:
      "Areal er flateinnhold. Oppgi lengder i samme enhet – svaret får da den enheten i annen potens, for eksempel m².",
    compute(input) {
      const x = num(input, "x");
      const y = num(input, "y");
      const h = num(input, "h");
      let areal: number | null = null;
      let navn = "Areal";
      switch (input.figur) {
        case "rektangel":
          if (!allNumbers([x, y])) return [];
          areal = x * y;
          navn = "Areal rektangel";
          break;
        case "trekant":
          if (!allNumbers([x, y])) return [];
          areal = (x * y) / 2;
          navn = "Areal trekant";
          break;
        case "sirkel":
          if (!Number.isFinite(x)) return [];
          areal = Math.PI * x * x;
          navn = "Areal sirkel";
          break;
        case "trapes":
          if (!allNumbers([x, y, h])) return [];
          areal = ((x + y) * h) / 2;
          navn = "Areal trapes";
          break;
        case "parallellogram":
          if (!allNumbers([x, y])) return [];
          areal = x * y;
          navn = "Areal parallellogram";
          break;
      }
      if (areal == null) return [];
      return [result("areal", navn, areal, { digits: 4, primary: true })];
    },
  },
  {
    slug: "volum",
    title: "Volum",
    description: "Regn ut volum av kube, kasse, sylinder, kule og kjegle.",
    category: "matematikk",
    tags: ["volum", "geometri"],
    fields: [
      {
        id: "figur",
        label: "Legeme",
        type: "select",
        defaultValue: "kasse",
        options: [
          { value: "kasse", label: "Kasse / kube" },
          { value: "sylinder", label: "Sylinder" },
          { value: "kule", label: "Kule" },
          { value: "kjegle", label: "Kjegle" },
        ],
      },
      {
        id: "a",
        label: "Lengde / radius",
        type: "number",
        defaultValue: 3,
      },
      {
        id: "b",
        label: "Bredde (kasse)",
        type: "number",
        defaultValue: 2,
      },
      {
        id: "c",
        label: "Høyde",
        type: "number",
        defaultValue: 4,
        hint: "Brukes ikke for kule.",
      },
    ],
    formula:
      "kasse = l·b·h     sylinder = πr²h     kule = 4/3 πr³     kjegle = 1/3 πr²h",
    explanation:
      "Volum er rominnhold. Hold enhetene like – svaret blir i kubikkenheter, for eksempel liter hvis du regner i dm.",
    compute(input) {
      const a = num(input, "a");
      const b = num(input, "b");
      const c = num(input, "c");
      let volum: number | null = null;
      switch (input.figur) {
        case "kasse":
          if (!allNumbers([a, b, c])) return [];
          volum = a * b * c;
          break;
        case "sylinder":
          if (!allNumbers([a, c])) return [];
          volum = Math.PI * a * a * c;
          break;
        case "kule":
          if (!Number.isFinite(a)) return [];
          volum = (4 / 3) * Math.PI * a * a * a;
          break;
        case "kjegle":
          if (!allNumbers([a, c])) return [];
          volum = (1 / 3) * Math.PI * a * a * c;
          break;
      }
      if (volum == null) return [];
      return [result("volum", "Volum", volum, { digits: 4, primary: true })];
    },
  },
  {
    slug: "omkrets",
    title: "Omkrets",
    description: "Finn omkrets av rektangel, sirkel og trekant.",
    category: "matematikk",
    tags: ["omkrets", "geometri"],
    fields: [
      {
        id: "figur",
        label: "Figur",
        type: "select",
        defaultValue: "sirkel",
        options: [
          { value: "sirkel", label: "Sirkel" },
          { value: "rektangel", label: "Rektangel" },
          { value: "trekant", label: "Trekant (tre sider)" },
        ],
      },
      { id: "a", label: "Radius / lengde / side a", type: "number", defaultValue: 5 },
      { id: "b", label: "Bredde / side b", type: "number", defaultValue: 3 },
      { id: "c", label: "Side c", type: "number", defaultValue: 4 },
    ],
    formula: "sirkel = 2πr     rektangel = 2(l+b)     trekant = a+b+c",
    explanation:
      "Omkrets er summen av sidene, eller den ytre randen av en sirkel.",
    compute(input) {
      const a = num(input, "a");
      const b = num(input, "b");
      const c = num(input, "c");
      if (input.figur === "sirkel") {
        if (!Number.isFinite(a)) return [];
        return [
          result("o", "Omkrets", 2 * Math.PI * a, { digits: 4, primary: true }),
          result("d", "Diameter", 2 * a, { digits: 4 }),
        ];
      }
      if (input.figur === "rektangel") {
        if (!allNumbers([a, b])) return [];
        return [
          result("o", "Omkrets", 2 * (a + b), { digits: 4, primary: true }),
        ];
      }
      if (!allNumbers([a, b, c])) return [];
      return [result("o", "Omkrets", a + b + c, { digits: 4, primary: true })];
    },
  },
  {
    slug: "gjennomsnitt",
    title: "Gjennomsnitt og median",
    description:
      "Lim inn tall skilt med komma eller mellomrom og få snitt, median og sum.",
    category: "matematikk",
    tags: ["snitt", "median", "statistikk"],
    fields: [
      {
        id: "tall",
        label: "Tall",
        type: "text",
        defaultValue: "4, 5, 9, 10, 12",
        hint: "Skill med komma, semikolon eller mellomrom.",
      },
    ],
    formula: "snitt = sum / n     median = midterste verdi når listen er sortert",
    explanation:
      "Gjennomsnitt trekker alle observasjonene likt. Median er mer robust mot ekstremverdier.",
    compute(input) {
      const parts = (input.tall ?? "")
        .split(/[,;\s]+/)
        .map((p) => p.trim())
        .filter(Boolean)
        .map((p) => Number(p.replace(",", ".")))
        .filter((n) => Number.isFinite(n));
      if (parts.length === 0) return [];
      const sum = parts.reduce((a, b) => a + b, 0);
      const sorted = [...parts].sort((a, b) => a - b);
      const mid = Math.floor(sorted.length / 2);
      const median =
        sorted.length % 2 === 0
          ? (sorted[mid - 1] + sorted[mid]) / 2
          : sorted[mid];
      const mean = sum / parts.length;
      const variance =
        parts.reduce((acc, x) => acc + (x - mean) ** 2, 0) / parts.length;
      return [
        result("snitt", "Gjennomsnitt", mean, { digits: 4, primary: true }),
        result("median", "Median", median, { digits: 4 }),
        result("sum", "Sum", sum, { digits: 4 }),
        result("n", "Antall", parts.length, { kind: "integer" }),
        result("std", "Standardavvik (populasjon)", Math.sqrt(variance), {
          digits: 4,
        }),
      ];
    },
  },
  {
    slug: "regel-av-tre",
    title: "Reguladetri",
    shortTitle: "Forhold",
    description: "Hvis A svarer til B, hva svarer C til? Klassisk forholdsregning.",
    category: "matematikk",
    tags: ["forhold", "reguladetri", "proporsjon"],
    popular: true,
    fields: [
      { id: "a", label: "A", type: "number", defaultValue: 2 },
      { id: "b", label: "svarer til B", type: "number", defaultValue: 5 },
      { id: "c", label: "C", type: "number", defaultValue: 8 },
    ],
    formula: "x = C · B / A",
    explanation:
      "Når to størrelser er proporsjonale, holder forholdet. «2 kg koster 5 kr, hva koster 8 kg?» gir x = 8 · 5 / 2.",
    compute(input) {
      const a = num(input, "a");
      const b = num(input, "b");
      const c = num(input, "c");
      if (!allNumbers([a, b, c]) || a === 0) return [];
      return [
        result("x", "C svarer til", (c * b) / a, { digits: 4, primary: true }),
      ];
    },
  },
  {
    slug: "potens-rot",
    title: "Potens og rot",
    description: "Regn ut potenser, kvadratrot og n-te rot.",
    category: "matematikk",
    tags: ["potens", "rot", "kvadratrot"],
    fields: [
      { id: "base", label: "Grunntall", type: "number", defaultValue: 9 },
      {
        id: "eksponent",
        label: "Eksponent",
        type: "number",
        defaultValue: 2,
        hint: "Bruk 0,5 for kvadratrot, 1/3 for kubikkrot.",
      },
    ],
    formula: "aⁿ     ⁿ√a = a^(1/n)",
    explanation:
      "Potens er gjentatt multiplikasjon. Kvadratrot er potens med eksponent 1/2. Negative tall og brøkdeleksponenter kan gi komplekse svar – her vises bare reelle tall.",
    compute(input) {
      const base = num(input, "base");
      const exp = num(input, "eksponent");
      if (!allNumbers([base, exp])) return [];
      const potens = base ** exp;
      const kvadrat = base < 0 ? null : Math.sqrt(base);
      return [
        result("potens", `${base} opphøyd i ${exp}`, potens, {
          digits: 6,
          primary: true,
        }),
        result("rot", "Kvadratrot av grunntallet", kvadrat ?? "Ikke reell", {
          kind: kvadrat == null ? "text" : "number",
          digits: 6,
        }),
      ];
    },
  },
  {
    slug: "brok",
    title: "Brøk",
    description: "Addér, trekk fra, gang og del to brøker, og forkort resultatet.",
    category: "matematikk",
    tags: ["brøk", "forkorting"],
    fields: [
      { id: "a1", label: "Teller 1", type: "number", defaultValue: 1 },
      { id: "a2", label: "Nevner 1", type: "number", defaultValue: 2 },
      {
        id: "op",
        label: "Operasjon",
        type: "select",
        defaultValue: "+",
        options: [
          { value: "+", label: "Pluss" },
          { value: "-", label: "Minus" },
          { value: "*", label: "Gange" },
          { value: "/", label: "Dele" },
        ],
      },
      { id: "b1", label: "Teller 2", type: "number", defaultValue: 1 },
      { id: "b2", label: "Nevner 2", type: "number", defaultValue: 3 },
    ],
    formula: "a/b ± c/d = (ad ± bc) / bd",
    explanation:
      "Felles nevner trengs ved pluss og minus. Resultatet forkortes med største felles divisor (Euclids algoritme).",
    compute(input) {
      const a1 = num(input, "a1");
      const a2 = num(input, "a2");
      const b1 = num(input, "b1");
      const b2 = num(input, "b2");
      if (!allNumbers([a1, a2, b1, b2]) || a2 === 0 || b2 === 0) return [];
      let t = 0;
      let n = 1;
      switch (input.op) {
        case "+":
          t = a1 * b2 + b1 * a2;
          n = a2 * b2;
          break;
        case "-":
          t = a1 * b2 - b1 * a2;
          n = a2 * b2;
          break;
        case "*":
          t = a1 * b1;
          n = a2 * b2;
          break;
        case "/":
          if (b1 === 0) {
            return [
              result("feil", "Ugyldig", "Kan ikke dele på brøken 0.", {
                kind: "text",
                primary: true,
              }),
            ];
          }
          t = a1 * b2;
          n = a2 * b1;
          break;
      }
      const g = gcd(Math.abs(t), Math.abs(n));
      const tt = t / g;
      const nn = n / g;
      const sign = nn < 0 ? -1 : 1;
      const teller = tt * sign;
      const nevner = nn * sign;
      return [
        result("brok", "Forkortet brøk", `${teller} / ${nevner}`, {
          kind: "text",
          primary: true,
        }),
        result("desimal", "Som desimaltall", teller / nevner, { digits: 6 }),
      ];
    },
  },
  {
    slug: "stigningstall",
    title: "Stigningstall",
    description: "Finn stigning og ligning for linjen gjennom to punkter.",
    category: "matematikk",
    tags: ["linje", "stigning", "graf"],
    fields: [
      { id: "x1", label: "x₁", type: "number", defaultValue: 1 },
      { id: "y1", label: "y₁", type: "number", defaultValue: 2 },
      { id: "x2", label: "x₂", type: "number", defaultValue: 4 },
      { id: "y2", label: "y₂", type: "number", defaultValue: 8 },
    ],
    formula: "a = (y₂ − y₁) / (x₂ − x₁)     y = ax + b",
    explanation:
      "Stigningstallet forteller hvor mye y øker når x øker med 1. Konstantleddet b finner du ved å sette inn et punkt.",
    compute(input) {
      const x1 = num(input, "x1");
      const y1 = num(input, "y1");
      const x2 = num(input, "x2");
      const y2 = num(input, "y2");
      if (!allNumbers([x1, y1, x2, y2])) return [];
      if (x1 === x2) {
        return [
          result("linje", "Linje", `x = ${x1} (loddrett)`, {
            kind: "text",
            primary: true,
          }),
        ];
      }
      const a = (y2 - y1) / (x2 - x1);
      const b = y1 - a * x1;
      const ligning = `y = ${round(a)}x ${b >= 0 ? "+" : "−"} ${round(Math.abs(b))}`;
      return [
        result("a", "Stigningstall", a, { digits: 4, primary: true }),
        result("b", "Konstantledd", b, { digits: 4 }),
        result("eq", "Ligning", ligning, { kind: "text" }),
      ];
    },
  },
  {
    slug: "andregrad",
    title: "Andregradsligning",
    description: "Løs ax² + bx + c = 0 med abc-formelen.",
    category: "matematikk",
    tags: ["ligning", "abc-formel", "diskriminant"],
    fields: [
      { id: "a", label: "a", type: "number", defaultValue: 1 },
      { id: "b", label: "b", type: "number", defaultValue: -5 },
      { id: "c", label: "c", type: "number", defaultValue: 6 },
    ],
    formula: "x = (−b ± √(b² − 4ac)) / (2a)",
    explanation:
      "Diskriminanten D = b² − 4ac avgjør antall reelle løsninger: to om D > 0, én om D = 0, ingen om D < 0.",
    compute(input) {
      const a = num(input, "a");
      const b = num(input, "b");
      const c = num(input, "c");
      if (!allNumbers([a, b, c])) return [];
      if (a === 0) {
        if (b === 0) {
          return [
            result("los", "Løsning", c === 0 ? "Alle x" : "Ingen løsning", {
              kind: "text",
              primary: true,
            }),
          ];
        }
        return [
          result("x", "Førstegrad: x", -c / b, { digits: 6, primary: true }),
        ];
      }
      const d = b * b - 4 * a * c;
      if (d < 0) {
        return [
          result("d", "Diskriminant", d, { digits: 4, primary: true }),
          result("los", "Reelle løsninger", "Ingen", { kind: "text" }),
        ];
      }
      const x1 = (-b + Math.sqrt(d)) / (2 * a);
      const x2 = (-b - Math.sqrt(d)) / (2 * a);
      return [
        result("x1", "x₁", x1, { digits: 6, primary: true }),
        result("x2", "x₂", x2, { digits: 6 }),
        result("d", "Diskriminant", d, { digits: 4 }),
      ];
    },
  },
  {
    slug: "fakultet",
    title: "Fakultet og kombinasjoner",
    description: "Regn n!, permutasjoner og kombinasjoner.",
    category: "matematikk",
    tags: ["fakultet", "kombinatorikk"],
    fields: [
      { id: "n", label: "n", type: "number", defaultValue: 10 },
      {
        id: "k",
        label: "k (til C og P)",
        type: "number",
        defaultValue: 3,
      },
    ],
    formula: "n! = 1·2·…·n     C(n,k) = n! / (k!(n−k)!)     P(n,k) = n! / (n−k)!",
    explanation:
      "Fakultet teller måter å ordne n ulike ting på. Kombinasjoner bryr seg ikke om rekkefølge, permutasjoner gjør det.",
    compute(input) {
      const n = num(input, "n");
      const k = num(input, "k");
      if (!allNumbers([n, k]) || n < 0 || k < 0 || !Number.isInteger(n) || !Number.isInteger(k))
        return [
          result("hint", "Heltall", "Bruk ikke-negative hele tall.", {
            kind: "text",
            primary: true,
          }),
        ];
      if (n > 170) {
        return [
          result("feil", "For stort", "n! flyter over over 170.", {
            kind: "text",
            primary: true,
          }),
        ];
      }
      const nf = factorial(n);
      const comb = k > n ? 0 : factorial(n) / (factorial(k) * factorial(n - k));
      const perm = k > n ? 0 : factorial(n) / factorial(n - k);
      return [
        result("fact", `${n}!`, nf, { digits: 0, primary: true }),
        result("c", `C(${n}, ${k})`, comb, { digits: 0 }),
        result("p", `P(${n}, ${k})`, perm, { digits: 0 }),
      ];
    },
  },
  {
    slug: "prosent-av-tall",
    title: "Hva er x prosent av y?",
    description: "Rask prosent av et tall – inkludert påslag og rabatt.",
    category: "matematikk",
    tags: ["prosent", "rabatt"],
    fields: [
      { id: "prosent", label: "Prosent", type: "number", unit: "%", defaultValue: 15 },
      { id: "tall", label: "Tall", type: "number", defaultValue: 2490 },
    ],
    formula: "verdi = p/100 · tall",
    explanation:
      "15 % av 2490 er 0,15 · 2490. Et påslag på 15 % er tallet pluss denne verdien, en rabatt er tallet minus.",
    compute(input) {
      const p = num(input, "prosent");
      const tall = num(input, "tall");
      if (!allNumbers([p, tall])) return [];
      const del = (p / 100) * tall;
      return [
        result("del", `${p} % av tallet`, del, { digits: 2, primary: true }),
        result("paa", "Med påslag", tall + del, { digits: 2 }),
        result("rabatt", "Med rabatt", tall - del, { digits: 2 }),
      ];
    },
  },
];

function gcd(a: number, b: number): number {
  let x = Math.round(a);
  let y = Math.round(b);
  while (y) {
    const t = y;
    y = x % y;
    x = t;
  }
  return x || 1;
}

function factorial(n: number): number {
  let r = 1;
  for (let i = 2; i <= n; i++) r *= i;
  return r;
}

function round(n: number): string {
  return new Intl.NumberFormat("nb-NO", { maximumFractionDigits: 4 }).format(n);
}
