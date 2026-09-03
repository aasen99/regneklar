import type { Calculator } from "../types";
import { num } from "../format";
import { allNumbers, result } from "../helpers";

export const matematikkCalculators: Calculator[] = [
  {
    slug: "pythagoras",
    title: "Pytagoras' setning – kalkulator",
    shortTitle: "Pytagoras",
    description:
      "Pytagoras' setning-kalkulator: finn den ukjente siden i en rettvinklet trekant (a² + b² = c²).",
    category: "matematikk",
    tags: [
      "pytagoras",
      "pythagoras",
      "pytagoras setning",
      "pythagoras setning",
      "trekant",
      "geometri",
    ],
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
    title: "Arealkalkulator",
    shortTitle: "Areal",
    description:
      "Arealkalkulator: regn ut areal av rektangel, trekant, sirkel, trapes og parallellogram.",
    category: "matematikk",
    tags: [
      "areal",
      "arealkalkulator",
      "arealberegning",
      "geometri",
      "kvadratmeter",
    ],
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
    slug: "volum-kule",
    title: "Volum av kule",
    shortTitle: "Kulevolum",
    description:
      "Regn ut volum av en kule når du kjenner radiusen eller diameteren.",
    category: "matematikk",
    tags: ["volum", "kule", "radius", "geometri", "matematikk"],
    popular: true,
    fields: [
      {
        id: "modus",
        label: "Oppgi",
        type: "select",
        defaultValue: "radius",
        options: [
          { value: "radius", label: "Radius" },
          { value: "diameter", label: "Diameter" },
        ],
      },
      {
        id: "verdi",
        label: "Lengde",
        type: "number",
        defaultValue: 5,
        unit: "cm",
      },
    ],
    formula: "V = ⁴⁄₃ πr³",
    explanation:
      "Volumet av en kule er fire tredjedeler av π ganger radius i tredje. Diameter er det dobbelte av radius.",
    compute(input) {
      const verdi = num(input, "verdi");
      if (!Number.isFinite(verdi) || verdi <= 0) return [];
      const r = input.modus === "diameter" ? verdi / 2 : verdi;
      const volum = (4 / 3) * Math.PI * r * r * r;
      return [
        result("volum", "Volum", volum, { digits: 4, primary: true }),
        result("r", "Radius brukt", r, { digits: 4 }),
        result("overflate", "Overflateareal", 4 * Math.PI * r * r, {
          digits: 4,
          hint: "4πr²",
        }),
      ];
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
    title: "Gjennomsnittskalkulator",
    shortTitle: "Gjennomsnitt",
    description:
      "Gjennomsnittskalkulator: lim inn tall og få snitt, median og sum.",
    category: "matematikk",
    tags: ["gjennomsnitt", "gjennomsnittskalkulator", "snitt", "median", "statistikk"],
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
    title: "Brøkkalkulator",
    shortTitle: "Brøk",
    description:
      "Brøkkalkulator: addér, trekk fra, gang og del to brøker, og forkort resultatet.",
    category: "matematikk",
    tags: ["brøk", "brøkkalkulator", "forkorting", "regning"],
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
  {
    slug: "sff-mfm",
    title: "Største felles faktor og minste felles multiplum",
    shortTitle: "SFF og MFM",
    description: "Finn SFF (gcd) og MFM (lcm) for to hele tall.",
    category: "matematikk",
    tags: ["sff", "mfm", "gcd", "lcm", "tallteori"],
    fields: [
      { id: "a", label: "Tall a", type: "number", defaultValue: 24 },
      { id: "b", label: "Tall b", type: "number", defaultValue: 36 },
    ],
    formula: "SFF(a, b) via Euklid     MFM = |a · b| / SFF",
    explanation:
      "Største felles faktor er det største tallet som går opp i begge. Minste felles multiplum er det minste positive tallet begge går opp i – nyttig når du skal finne felles nevner.",
    compute(input) {
      const a = num(input, "a");
      const b = num(input, "b");
      if (!allNumbers([a, b]) || a === 0 || b === 0) return [];
      const g = gcd(Math.abs(a), Math.abs(b));
      const l = Math.abs(a * b) / g;
      return [
        result("sff", "SFF", g, { kind: "integer", primary: true }),
        result("mfm", "MFM", l, { kind: "integer" }),
      ];
    },
  },
  {
    slug: "forstegard",
    title: "Førstegradsligning",
    description: "Løs ax + b = c for x.",
    category: "matematikk",
    tags: ["ligning", "algebra", "x"],
    fields: [
      { id: "a", label: "a (koeffisient foran x)", type: "number", defaultValue: 3 },
      { id: "b", label: "b", type: "number", defaultValue: 5 },
      { id: "c", label: "c", type: "number", defaultValue: 20 },
    ],
    formula: "ax + b = c     x = (c − b) / a",
    explanation:
      "Trekk b fra begge sider og del på a. Hvis a er 0, er det ingen x å løse for – da er det enten aldri sant eller alltid sant.",
    compute(input) {
      const a = num(input, "a");
      const b = num(input, "b");
      const c = num(input, "c");
      if (!allNumbers([a, b, c])) return [];
      if (a === 0) {
        return [
          result("x", "Løsning", b === c ? "Alle x (identitet)" : "Ingen løsning", {
            kind: "text",
            primary: true,
          }),
        ];
      }
      return [
        result("x", "x", (c - b) / a, { digits: 4, primary: true }),
      ];
    },
  },
  {
    slug: "trekant-vinkler",
    title: "Vinkler i en trekant",
    description: "Finn den tredje vinkelen når du kjenner to. Summen er 180°.",
    category: "matematikk",
    tags: ["trekant", "vinkel", "geometri"],
    fields: [
      { id: "a", label: "Vinkel A", type: "number", unit: "°", defaultValue: 50 },
      { id: "b", label: "Vinkel B", type: "number", unit: "°", defaultValue: 60 },
    ],
    formula: "A + B + C = 180°",
    explanation:
      "I et euklidsk plan er vinkelsummen i en trekant alltid 180 grader. Er C null eller negativ, kan ikke A og B danne en trekant.",
    compute(input) {
      const a = num(input, "a");
      const b = num(input, "b");
      if (!allNumbers([a, b])) return [];
      const c = 180 - a - b;
      if (c <= 0 || a <= 0 || b <= 0) {
        return [
          result("c", "Vinkel C", "Ugyldig – vinklene danner ikke en trekant.", {
            kind: "text",
            primary: true,
          }),
        ];
      }
      let type = "Uliksidet";
      if (Math.abs(a - 90) < 1e-9 || Math.abs(b - 90) < 1e-9 || Math.abs(c - 90) < 1e-9) {
        type = "Rettvinklet";
      } else if (a > 90 || b > 90 || c > 90) type = "Stumpvinklet";
      else type = "Spissvinklet";
      return [
        result("c", "Vinkel C", c, { digits: 2, unit: "°", primary: true }),
        result("type", "Type", type, { kind: "text" }),
      ];
    },
  },
  {
    slug: "logaritme",
    title: "Logaritme",
    description: "Regn logaritme med valgfri base, pluss 10-log og naturlig log.",
    category: "matematikk",
    tags: ["log", "ln", "logaritme"],
    fields: [
      { id: "x", label: "Tall x", type: "number", defaultValue: 100 },
      {
        id: "base",
        label: "Base (for log_b x)",
        type: "number",
        defaultValue: 10,
      },
    ],
    formula: "log_b(x) = ln(x) / ln(b)",
    explanation:
      "Logaritmen spør «hvilken eksponent trenger basen for å bli x?». 10-log brukes i desibel og pH, ln i vekst og renter. x og base må være positive, og basen kan ikke være 1.",
    compute(input) {
      const x = num(input, "x");
      const base = num(input, "base");
      if (!allNumbers([x, base]) || x <= 0 || base <= 0 || base === 1) return [];
      return [
        result("custom", `log${base}(${x})`, Math.log(x) / Math.log(base), {
          digits: 6,
          primary: true,
        }),
        result("log10", "log₁₀(x)", Math.log10(x), { digits: 6 }),
        result("ln", "ln(x)", Math.log(x), { digits: 6 }),
      ];
    },
  },
  {
    slug: "trigonometri",
    title: "Trigonometri (sin, cos, tan)",
    shortTitle: "Trigonometri",
    description:
      "Regn sinus, cosinus og tangens, eller finn vinkel fra verdi (invers).",
    category: "matematikk",
    tags: ["sin", "cos", "tan", "vinkel", "trigonometri"],
    popular: true,
    fields: [
      {
        id: "modus",
        label: "Retning",
        type: "select",
        defaultValue: "fra_vinkel",
        options: [
          { value: "fra_vinkel", label: "Vinkel → sin/cos/tan" },
          { value: "arcsin", label: "Tall → arcsin" },
          { value: "arccos", label: "Tall → arccos" },
          { value: "arctan", label: "Tall → arctan" },
        ],
      },
      {
        id: "vinkel",
        label: "Vinkel",
        type: "number",
        unit: "°",
        defaultValue: 30,
      },
      {
        id: "verdi",
        label: "Verdi",
        type: "number",
        defaultValue: 0.5,
        step: 0.01,
      },
    ],
    formula: "sin²θ + cos²θ = 1     tan θ = sin θ / cos θ",
    explanation:
      "Vinkler i grader. Invers funksjon gir hovedverdi (arcsin −90°…90°, arccos 0°…180°).",
    compute(input) {
      if (input.modus === "fra_vinkel") {
        const deg = num(input, "vinkel");
        if (!Number.isFinite(deg)) return [];
        const r = (deg * Math.PI) / 180;
        return [
          result("sin", "sin", Math.sin(r), { digits: 6, primary: true }),
          result("cos", "cos", Math.cos(r), { digits: 6 }),
          result("tan", "tan", Math.tan(r), { digits: 6 }),
        ];
      }
      const v = num(input, "verdi");
      if (!Number.isFinite(v)) return [];
      let rad: number;
      if (input.modus === "arcsin") {
        if (v < -1 || v > 1) return [];
        rad = Math.asin(v);
      } else if (input.modus === "arccos") {
        if (v < -1 || v > 1) return [];
        rad = Math.acos(v);
      } else {
        rad = Math.atan(v);
      }
      return [
        result("deg", "Vinkel", (rad * 180) / Math.PI, {
          digits: 4,
          unit: "°",
          primary: true,
        }),
        result("rad", "Radianer", rad, { digits: 6 }),
      ];
    },
  },
  {
    slug: "prosentpoeng",
    title: "Prosentpoeng vs. prosent",
    shortTitle: "Prosentpoeng",
    description:
      "Skill mellom endring i prosentpoeng og relativ prosentendring.",
    category: "matematikk",
    tags: ["prosentpoeng", "prosent", "endring"],
    popular: true,
    fields: [
      {
        id: "fra",
        label: "Fra",
        type: "number",
        unit: "%",
        defaultValue: 40,
      },
      {
        id: "til",
        label: "Til",
        type: "number",
        unit: "%",
        defaultValue: 50,
      },
    ],
    formula: "pp = til − fra     relativ % = (til − fra) / fra · 100",
    explanation:
      "Fra 40 % til 50 % er +10 prosentpoeng, men +25 % relativ økning. Medier blander ofte begrepene.",
    compute(input) {
      const fra = num(input, "fra");
      const til = num(input, "til");
      if (!allNumbers([fra, til])) return [];
      const pp = til - fra;
      return [
        result("pp", "Prosentpoeng", pp, {
          digits: 2,
          unit: "pp",
          primary: true,
        }),
        ...(fra !== 0
          ? [
              result("rel", "Relativ endring", (pp / fra) * 100, {
                kind: "percent",
                digits: 2,
              }),
            ]
          : []),
      ];
    },
  },
  {
    slug: "sirkelbue",
    title: "Sirkelbue og sektor",
    shortTitle: "Sirkelbue",
    description: "Regn ut buelengde og sektorareal fra radius og vinkel.",
    category: "matematikk",
    tags: ["sirkel", "bue", "sektor", "geometri"],
    popular: true,
    fields: [
      {
        id: "r",
        label: "Radius",
        type: "number",
        defaultValue: 5,
      },
      {
        id: "vinkel",
        label: "Sentrvinkel",
        type: "number",
        unit: "°",
        defaultValue: 60,
      },
    ],
    formula: "bue = 2πr · θ/360     sektor = πr² · θ/360",
    explanation:
      "Hele sirkelen er 360°. En 90° sektor er en fjerdedel av arealet.",
    compute(input) {
      const r = num(input, "r");
      const v = num(input, "vinkel");
      if (!allNumbers([r, v]) || r < 0) return [];
      const andel = v / 360;
      return [
        result("bue", "Buelengde", 2 * Math.PI * r * andel, {
          digits: 4,
          primary: true,
        }),
        result("sektor", "Sektorareal", Math.PI * r * r * andel, {
          digits: 4,
        }),
        result("korda", "Korde", 2 * r * Math.sin((v * Math.PI) / 360), {
          digits: 4,
        }),
      ];
    },
  },
  {
    slug: "vektor-2d",
    title: "Vektorer i planet",
    shortTitle: "Vektorer",
    description:
      "Finn lengde, prikkprodukt, vinkel og sum for to 2D-vektorer.",
    category: "matematikk",
    tags: ["vektor", "prikkprodukt", "geometri"],
    fields: [
      { id: "ax", label: "aₓ", type: "number", defaultValue: 3 },
      { id: "ay", label: "aᵧ", type: "number", defaultValue: 4 },
      { id: "bx", label: "bₓ", type: "number", defaultValue: 1 },
      { id: "by", label: "bᵧ", type: "number", defaultValue: 0 },
    ],
    formula: "|a| = √(aₓ² + aᵧ²)     a·b = aₓbₓ + aᵧbᵧ",
    explanation:
      "Prikkprodukt null betyr ortogonale vektorer. Vinkelen finnes via cos θ = (a·b) / (|a||b|).",
    compute(input) {
      const ax = num(input, "ax");
      const ay = num(input, "ay");
      const bx = num(input, "bx");
      const by = num(input, "by");
      if (!allNumbers([ax, ay, bx, by])) return [];
      const la = Math.hypot(ax, ay);
      const lb = Math.hypot(bx, by);
      const dot = ax * bx + ay * by;
      const out = [
        result("la", "|a|", la, { digits: 4, primary: true }),
        result("lb", "|b|", lb, { digits: 4 }),
        result("dot", "a · b", dot, { digits: 4 }),
        result("sum", "a + b", `(${ax + bx}, ${ay + by})`, { kind: "text" }),
      ];
      if (la > 0 && lb > 0) {
        const cos = Math.min(1, Math.max(-1, dot / (la * lb)));
        out.push(
          result("vinkel", "Vinkel mellom", (Math.acos(cos) * 180) / Math.PI, {
            digits: 2,
            unit: "°",
          }),
        );
      }
      return out;
    },
  },
  {
    slug: "heron",
    title: "Herons formel (trekantareal)",
    shortTitle: "Heron",
    description: "Finn arealet av en trekant når du kjenner alle tre sidene.",
    category: "matematikk",
    tags: ["heron", "areal", "trekant"],
    fields: [
      { id: "a", label: "Side a", type: "number", defaultValue: 5 },
      { id: "b", label: "Side b", type: "number", defaultValue: 6 },
      { id: "c", label: "Side c", type: "number", defaultValue: 7 },
    ],
    formula: "s = (a+b+c)/2     A = √(s(s−a)(s−b)(s−c))",
    explanation:
      "Sidene må oppfylle trekantulikheten. s er semiperimeteret (halve omkretsen).",
    compute(input) {
      const a = num(input, "a");
      const b = num(input, "b");
      const c = num(input, "c");
      if (!allNumbers([a, b, c]) || a <= 0 || b <= 0 || c <= 0) return [];
      if (a + b <= c || a + c <= b || b + c <= a) {
        return [
          result("feil", "Ugyldig", "Sidene danner ikke en trekant.", {
            kind: "text",
            primary: true,
          }),
        ];
      }
      const s = (a + b + c) / 2;
      const A = Math.sqrt(s * (s - a) * (s - b) * (s - c));
      return [
        result("areal", "Areal", A, { digits: 4, primary: true }),
        result("s", "Semiperimeter s", s, { digits: 4 }),
        result("omkrets", "Omkrets", a + b + c, { digits: 4 }),
      ];
    },
  },
  {
    slug: "avstand-punkt",
    title: "Avstand mellom to punkter",
    shortTitle: "Avstand",
    description: "Regn ut avstand i planet mellom (x₁, y₁) og (x₂, y₂).",
    category: "matematikk",
    tags: ["avstand", "koordinater", "geometri"],
    fields: [
      { id: "x1", label: "x₁", type: "number", defaultValue: 0 },
      { id: "y1", label: "y₁", type: "number", defaultValue: 0 },
      { id: "x2", label: "x₂", type: "number", defaultValue: 3 },
      { id: "y2", label: "y₂", type: "number", defaultValue: 4 },
    ],
    formula: "d = √((x₂−x₁)² + (y₂−y₁)²)",
    explanation: "Pythagoras i koordinatsystemet. Midtpunktet er gjennomsnittet av koordinatene.",
    compute(input) {
      const x1 = num(input, "x1");
      const y1 = num(input, "y1");
      const x2 = num(input, "x2");
      const y2 = num(input, "y2");
      if (!allNumbers([x1, y1, x2, y2])) return [];
      const d = Math.hypot(x2 - x1, y2 - y1);
      return [
        result("d", "Avstand", d, { digits: 4, primary: true }),
        result("mid", "Midtpunkt", `((${(x1 + x2) / 2}, ${(y1 + y2) / 2}))`, {
          kind: "text",
        }),
      ];
    },
  },
  {
    slug: "compound-prosent",
    title: "Sammensatt prosentendring",
    shortTitle: "Sammensatt %",
    description:
      "Hva blir total endring etter flere prosentøkninger/-nedganger etter hverandre?",
    category: "matematikk",
    tags: ["prosent", "sammensatt", "faktor"],
    fields: [
      {
        id: "start",
        label: "Startverdi",
        type: "number",
        defaultValue: 100,
      },
      {
        id: "endringer",
        label: "Prosentendringer",
        type: "text",
        defaultValue: "10, -20, 5",
        hint: "Skill med komma. Negativ = nedgang.",
      },
    ],
    formula: "slutt = start · Π (1 + pᵢ/100)",
    explanation:
      "+10 % og deretter −10 % er ikke tilbake til start. Rekkefølgen av relative endringer multipliseres.",
    compute(input) {
      const start = num(input, "start");
      if (!Number.isFinite(start)) return [];
      const ps = (input.endringer ?? "")
        .split(/[,;\s]+/)
        .map((p) => Number(p.replace(",", ".")))
        .filter((n) => Number.isFinite(n));
      if (ps.length === 0) return [];
      let verdi = start;
      for (const p of ps) verdi *= 1 + p / 100;
      return [
        result("slutt", "Sluttverdi", verdi, { digits: 4, primary: true }),
        result("total", "Total endring", ((verdi - start) / start) * 100, {
          kind: "percent",
          digits: 2,
        }),
      ];
    },
  },
  {
    slug: "primtallsfaktorisering",
    title: "Primtallsfaktorisering",
    shortTitle: "Faktorisering",
    description: "Skriv et positivt heltall som produkt av primtall.",
    category: "matematikk",
    tags: ["primtall", "faktorisering", "tallteori"],
    fields: [
      {
        id: "n",
        label: "Tall",
        type: "number",
        defaultValue: 360,
      },
    ],
    formula: "n = p₁^a₁ · p₂^a₂ · …",
    explanation:
      "Hvert heltall > 1 har en unik primtallsfaktorisering (fundamentalsatsen).",
    compute(input) {
      const raw = num(input, "n");
      if (!Number.isFinite(raw) || raw < 2 || !Number.isInteger(raw)) {
        return [
          result("hint", "Krav", "Oppgi et heltall ≥ 2.", {
            kind: "text",
            primary: true,
          }),
        ];
      }
      let n = raw;
      const factors: number[] = [];
      for (let p = 2; p * p <= n; p++) {
        while (n % p === 0) {
          factors.push(p);
          n /= p;
        }
      }
      if (n > 1) factors.push(n);
      const counts = new Map<number, number>();
      for (const f of factors) counts.set(f, (counts.get(f) ?? 0) + 1);
      const pretty = [...counts.entries()]
        .map(([p, a]) => (a === 1 ? `${p}` : `${p}^${a}`))
        .join(" · ");
      return [
        result("fakt", "Faktorisering", pretty, {
          kind: "text",
          primary: true,
        }),
        result("liste", "Primfaktorer", factors.join(" × "), {
          kind: "text",
        }),
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
