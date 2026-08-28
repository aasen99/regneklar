import type { Calculator } from "../types";
import { num } from "../format";
import { allNumbers, result } from "../helpers";

export const byggCalculators: Calculator[] = [
  {
    slug: "maling",
    title: "Malingskalkulator",
    shortTitle: "Maling",
    description:
      "Finn hvor mange liter maling du trenger ut fra areal, strøk og dekning.",
    category: "bygg",
    tags: ["maling", "oppussing", "vegg"],
    popular: true,
    fields: [
      {
        id: "areal",
        label: "Areal",
        type: "number",
        unit: "m²",
        defaultValue: 42,
      },
      {
        id: "strok",
        label: "Antall strøk",
        type: "number",
        defaultValue: 2,
      },
      {
        id: "dekning",
        label: "Dekning",
        type: "number",
        unit: "m²/l",
        defaultValue: 8,
        hint: "Står ofte på spannet, typisk 6–10 m² per liter.",
      },
      {
        id: "svinn",
        label: "Svinn / reserve",
        type: "number",
        unit: "%",
        defaultValue: 10,
      },
    ],
    formula: "liter = (areal · strøk / dekning) · (1 + svinn)",
    explanation:
      "Porøse underlag og mørke farger sluker mer maling. Det lønner seg å kjøpe litt ekstra av samme batch.",
    compute(input) {
      const areal = num(input, "areal");
      const strok = num(input, "strok");
      const dekning = num(input, "dekning");
      const svinn = num(input, "svinn");
      if (!allNumbers([areal, strok, dekning, svinn]) || dekning <= 0) return [];
      const liter = ((areal * strok) / dekning) * (1 + svinn / 100);
      return [
        result("liter", "Maling", liter, {
          digits: 1,
          unit: "liter",
          primary: true,
        }),
        result("spann", "Typiske 10-liters spann", liter / 10, { digits: 2 }),
      ];
    },
  },
  {
    slug: "fliser",
    title: "Fliskalkulator",
    description: "Regn ut antall fliser og areal med svinn.",
    category: "bygg",
    tags: ["fliser", "bad", "gulv"],
    fields: [
      {
        id: "areal",
        label: "Flate",
        type: "number",
        unit: "m²",
        defaultValue: 12,
      },
      {
        id: "flisB",
        label: "Flisbredde",
        type: "number",
        unit: "cm",
        defaultValue: 30,
      },
      {
        id: "flisH",
        label: "Flishøyde",
        type: "number",
        unit: "cm",
        defaultValue: 60,
      },
      {
        id: "svinn",
        label: "Kapp / svinn",
        type: "number",
        unit: "%",
        defaultValue: 10,
      },
    ],
    formula: "antall = areal / flisareal · (1 + svinn)",
    explanation:
      "10 % ekstra er vanlig på rektangulære rom, mer ved mønsterlegging og skråkapp.",
    compute(input) {
      const areal = num(input, "areal");
      const flisB = num(input, "flisB");
      const flisH = num(input, "flisH");
      const svinn = num(input, "svinn");
      if (!allNumbers([areal, flisB, flisH, svinn]) || flisB <= 0 || flisH <= 0)
        return [];
      const flisM2 = (flisB / 100) * (flisH / 100);
      const antall = (areal / flisM2) * (1 + svinn / 100);
      return [
        result("antall", "Antall fliser", Math.ceil(antall), {
          kind: "integer",
          primary: true,
        }),
        result("pakkeareal", "Areal inkl. svinn", areal * (1 + svinn / 100), {
          digits: 2,
          unit: "m²",
        }),
      ];
    },
  },
  {
    slug: "betong",
    title: "Betongkalkulator",
    description: "Finn volum og antall sekker til plate, støp eller såle.",
    category: "bygg",
    tags: ["betong", "støp", "volum"],
    fields: [
      { id: "l", label: "Lengde", type: "number", unit: "m", defaultValue: 4 },
      { id: "b", label: "Bredde", type: "number", unit: "m", defaultValue: 3 },
      {
        id: "h",
        label: "Tykkelse",
        type: "number",
        unit: "cm",
        defaultValue: 10,
      },
      {
        id: "sekk",
        label: "Sekkstørrelse",
        type: "number",
        unit: "liter",
        defaultValue: 25,
      },
    ],
    formula: "V = lengde · bredde · høyde",
    explanation:
      "Tykkelse i centimeter omregnes til meter. Ferdigbetong oppgis i m³, tørrsekk i liter etter blanding – sjekk sekken.",
    compute(input) {
      const l = num(input, "l");
      const b = num(input, "b");
      const h = num(input, "h");
      const sekk = num(input, "sekk");
      if (!allNumbers([l, b, h, sekk]) || sekk <= 0) return [];
      const m3 = l * b * (h / 100);
      const liter = m3 * 1000;
      return [
        result("m3", "Volum", m3, { digits: 3, unit: "m³", primary: true }),
        result("sekker", "Antall sekker", Math.ceil(liter / sekk), {
          kind: "integer",
        }),
      ];
    },
  },
  {
    slug: "gulvbelegg",
    title: "Gulvbelegg og parkett",
    description: "Regn ut hvor mange kvadratmeter gulv du bør kjøpe.",
    category: "bygg",
    tags: ["gulv", "parkett", "laminat"],
    fields: [
      { id: "l", label: "Romlengde", type: "number", unit: "m", defaultValue: 5.2 },
      { id: "b", label: "Rombredde", type: "number", unit: "m", defaultValue: 3.8 },
      {
        id: "svinn",
        label: "Kapp",
        type: "number",
        unit: "%",
        defaultValue: 8,
      },
    ],
    formula: "behov = l · b · (1 + kapp)",
    explanation:
      "Rettlegging kan klare seg med 5–8 % kapp. Fiskeben og mønster krever mer.",
    compute(input) {
      const l = num(input, "l");
      const b = num(input, "b");
      const svinn = num(input, "svinn");
      if (!allNumbers([l, b, svinn])) return [];
      const areal = l * b;
      return [
        result("behov", "Å kjøpe", areal * (1 + svinn / 100), {
          digits: 2,
          unit: "m²",
          primary: true,
        }),
        result("gulv", "Gulvareal", areal, { digits: 2, unit: "m²" }),
      ];
    },
  },
  {
    slug: "tapet",
    title: "Tapetkalkulator",
    description: "Estimer antall ruller ut fra veggareal og rullestørrelse.",
    category: "bygg",
    tags: ["tapet", "vegg"],
    fields: [
      {
        id: "omkrets",
        label: "Rommets omkrets",
        type: "number",
        unit: "m",
        defaultValue: 16,
      },
      {
        id: "hoyde",
        label: "Takhøyde",
        type: "number",
        unit: "m",
        defaultValue: 2.4,
      },
      {
        id: "dorer",
        label: "Trekk fra dører/vinduer",
        type: "number",
        unit: "m²",
        defaultValue: 4,
      },
      {
        id: "rull",
        label: "Areal per rull",
        type: "number",
        unit: "m²",
        defaultValue: 5.3,
        hint: "En vanlig rull er 10,05 × 0,53 m ≈ 5,3 m².",
      },
    ],
    formula: "ruller = (omkrets · høyde − åpninger) / rullareal",
    explanation:
      "Mønstertilpasning øker forbruket. Rund opp til hele ruller, og kjøp gjerne én ekstra.",
    compute(input) {
      const omkrets = num(input, "omkrets");
      const hoyde = num(input, "hoyde");
      const dorer = num(input, "dorer");
      const rull = num(input, "rull");
      if (!allNumbers([omkrets, hoyde, dorer, rull]) || rull <= 0) return [];
      const areal = Math.max(0, omkrets * hoyde - dorer);
      return [
        result("ruller", "Ruller (avrundet opp)", Math.ceil(areal / rull), {
          kind: "integer",
          primary: true,
        }),
        result("areal", "Veggareal", areal, { digits: 1, unit: "m²" }),
      ];
    },
  },
  {
    slug: "gjerde",
    title: "Gjerdekalkulator",
    description: "Finn stolper og seksjoner til et gjerde.",
    category: "bygg",
    tags: ["gjerde", "hage", "stolper"],
    fields: [
      {
        id: "lengde",
        label: "Gjerdelengde",
        type: "number",
        unit: "m",
        defaultValue: 18,
      },
      {
        id: "seksjon",
        label: "Seksjonslengde",
        type: "number",
        unit: "m",
        defaultValue: 2,
      },
    ],
    formula: "stolper = seksjoner + 1",
    explanation:
      "Et rett gjerde trenger én stolpe mer enn antall seksjoner. Hjørner og porter kommer i tillegg.",
    compute(input) {
      const lengde = num(input, "lengde");
      const seksjon = num(input, "seksjon");
      if (!allNumbers([lengde, seksjon]) || seksjon <= 0) return [];
      const seksjoner = Math.ceil(lengde / seksjon);
      return [
        result("stolper", "Stolper", seksjoner + 1, {
          kind: "integer",
          primary: true,
        }),
        result("seksjoner", "Seksjoner", seksjoner, { kind: "integer" }),
      ];
    },
  },
  {
    slug: "gipsplater",
    title: "Gipsplater",
    description: "Estimer antall gipsplater til vegger, med svinn.",
    category: "bygg",
    tags: ["gips", "vegg", "oppussing"],
    fields: [
      { id: "lengde", label: "Romlengde", type: "number", unit: "m", defaultValue: 5 },
      { id: "bredde", label: "Rombredde", type: "number", unit: "m", defaultValue: 4 },
      { id: "hoyde", label: "Takhøyde", type: "number", unit: "m", defaultValue: 2.4 },
      {
        id: "apninger",
        label: "Dører og vinduer",
        type: "number",
        unit: "m²",
        defaultValue: 4,
      },
      {
        id: "svinn",
        label: "Svinn",
        type: "number",
        unit: "%",
        defaultValue: 10,
      },
    ],
    formula: "plater = veggareal · (1 + svinn) / 2,88",
    explanation:
      "Standard plate 120 × 240 cm dekker 2,88 m². Her kles alle fire vegger. Tak, sjakter og kapping kommer i tillegg – derfor svinn.",
    compute(input) {
      const l = num(input, "lengde");
      const b = num(input, "bredde");
      const h = num(input, "hoyde");
      const ap = num(input, "apninger");
      const svinn = num(input, "svinn");
      if (!allNumbers([l, b, h, ap, svinn])) return [];
      const areal = Math.max(0, 2 * (l + b) * h - ap);
      const medSvinn = areal * (1 + svinn / 100);
      const plater = medSvinn / 2.88;
      return [
        result("plater", "Plater (avrundet opp)", Math.ceil(plater), {
          kind: "integer",
          primary: true,
        }),
        result("areal", "Veggareal", areal, { digits: 1, unit: "m²" }),
      ];
    },
  },
  {
    slug: "grus-sand",
    title: "Grus og sand",
    description: "Finn volum og vekt til gårdsplass, bed eller drenering.",
    category: "bygg",
    tags: ["grus", "sand", "hage", "volum"],
    fields: [
      { id: "lengde", label: "Lengde", type: "number", unit: "m", defaultValue: 8 },
      { id: "bredde", label: "Bredde", type: "number", unit: "m", defaultValue: 3 },
      {
        id: "tykkelse",
        label: "Tykkelse",
        type: "number",
        unit: "cm",
        defaultValue: 10,
      },
      {
        id: "tetthet",
        label: "Tetthet",
        type: "number",
        unit: "t/m³",
        defaultValue: 1.6,
        hint: "Tørr sand ca. 1,5–1,7 t/m³, grus ofte rundt 1,6.",
      },
    ],
    formula: "V = lengde · bredde · tykkelse     masse = V · tetthet",
    explanation:
      "Tykkelse i centimeter omregnes til meter. Bestill gjerne 5–10 % ekstra til komprimering og ujevn bunn.",
    compute(input) {
      const l = num(input, "lengde");
      const b = num(input, "bredde");
      const t = num(input, "tykkelse");
      const dens = num(input, "tetthet");
      if (!allNumbers([l, b, t, dens]) || t < 0) return [];
      const vol = l * b * (t / 100);
      return [
        result("vol", "Volum", vol, { digits: 2, unit: "m³", primary: true }),
        result("tonn", "Vekt", vol * dens, { digits: 2, unit: "t" }),
        result("ekstra", "Med 10 % ekstra", vol * 1.1, { digits: 2, unit: "m³" }),
      ];
    },
  },
  {
    slug: "trestykker",
    title: "Trestykker og reglar",
    shortTitle: "Reglar",
    description:
      "Estimer antall reglar/stendere til en vegg med valgt c/c-mål.",
    category: "bygg",
    tags: ["reglar", "stender", "vegg", "tre", "cc-mål"],
    fields: [
      { id: "lengde", label: "Vegglengde", type: "number", unit: "m", defaultValue: 4.2 },
      { id: "hoyde", label: "Takhøyde", type: "number", unit: "m", defaultValue: 2.4 },
      {
        id: "cc",
        label: "c/c-avstand",
        type: "select",
        defaultValue: "600",
        options: [
          { value: "600", label: "600 mm" },
          { value: "400", label: "400 mm" },
        ],
      },
      {
        id: "dorer",
        label: "Antall dører",
        type: "number",
        defaultValue: 1,
      },
    ],
    formula: "stendere ≈ lengde / c/c + 1     (+ ekstra ved dører)",
    explanation:
      "Standard c/c er 600 mm i innvendige vegger. Legg til ekstra stendere ved dør- og vindusåpninger. Tak- og bunnsvill kommer i tillegg.",
    compute(input) {
      const l = num(input, "lengde");
      const h = num(input, "hoyde");
      const cc = Number(input.cc) / 1000;
      const dorer = num(input, "dorer") ?? 0;
      if (!allNumbers([l, h, cc]) || l <= 0 || h <= 0) return [];
      const stendere = Math.ceil(l / cc) + 1 + dorer * 2;
      const lm = stendere * h;
      return [
        result("stendere", "Stendere", stendere, {
          kind: "integer",
          primary: true,
        }),
        result("lm", "Løpemeter tre", lm, { digits: 1, unit: "m" }),
      ];
    },
  },
  {
    slug: "isolasjon-uverdi",
    title: "Isolasjon og U-verdi",
    shortTitle: "U-verdi",
    description:
      "Anslå U-verdi fra isolasjonstykkelse og λ-verdi, eller nødvendig tykkelse for mål-U.",
    category: "bygg",
    tags: ["isolasjon", "u-verdi", "energi", "oppussing"],
    fields: [
      {
        id: "modus",
        label: "Regn ut",
        type: "select",
        defaultValue: "u",
        options: [
          { value: "u", label: "U-verdi fra tykkelse" },
          { value: "tykkelse", label: "Tykkelse for mål-U" },
        ],
      },
      {
        id: "lambda",
        label: "λ (varmeledningsevne)",
        type: "number",
        unit: "W/(m·K)",
        defaultValue: 0.037,
        hint: "Mineralull ca. 0,035–0,040.",
      },
      {
        id: "tykkelse",
        label: "Isolasjonstykkelse",
        type: "number",
        unit: "mm",
        defaultValue: 200,
      },
      {
        id: "malu",
        label: "Mål-U",
        type: "number",
        unit: "W/(m²·K)",
        defaultValue: 0.18,
        hint: "Brukes når du regner tykkelse.",
      },
      {
        id: "u0",
        label: "U uten isolasjon",
        type: "number",
        unit: "W/(m²·K)",
        defaultValue: 1.2,
        hint: "Kun ved U-beregning – grovt for gammel vegg.",
      },
    ],
    formula: "U ≈ 1 / (1/U₀ + d/λ)",
    explanation:
      "Tykkere isolasjon gir lavere U-verdi (bedre). λ er materialets evne til å lede varme – lavere λ er bedre isolasjon.",
    compute(input) {
      const lambda = num(input, "lambda");
      const tykk = num(input, "tykkelse");
      const malu = num(input, "malu");
      const u0 = num(input, "u0");
      if (!allNumbers([lambda, tykk, malu, u0]) || lambda <= 0) return [];
      const d = tykk / 1000;
      if (input.modus === "tykkelse") {
        if (malu <= 0 || u0 <= malu) return [];
        const needed = lambda * (1 / malu - 1 / u0);
        return [
          result("mm", "Nødvendig isolasjon", needed * 1000, {
            digits: 0,
            unit: "mm",
            primary: true,
          }),
        ];
      }
      const u = 1 / (1 / u0 + d / lambda);
      return [
        result("u", "U-verdi", u, {
          digits: 3,
          unit: "W/(m²·K)",
          primary: true,
        }),
        result("r", "Termisk motstand isolasjon", d / lambda, {
          digits: 3,
          unit: "m²·K/W",
        }),
      ];
    },
  },
  {
    slug: "takstein",
    title: "Takstein og shingel",
    shortTitle: "Takstein",
    description: "Estimer antall takstein fra takflate og helning.",
    category: "bygg",
    tags: ["tak", "stein", "shingel", "taktekking"],
    fields: [
      { id: "areal", label: "Takflate", type: "number", unit: "m²", defaultValue: 120 },
      {
        id: "prstein",
        label: "Dekning per stein",
        type: "number",
        unit: "m²",
        defaultValue: 0.1,
        hint: "Typisk betongstein ca. 0,10 m² effektiv dekning.",
      },
      {
        id: "svinn",
        label: "Svinn",
        type: "number",
        unit: "%",
        defaultValue: 10,
      },
    ],
    formula: "antall = takflate · (1 + svinn) / dekning",
    explanation:
      "Takflaten er lengde × bredde delt på cos(helning). Legg til svinn for kapping, vinkelrenner og feil.",
    compute(input) {
      const areal = num(input, "areal");
      const pr = num(input, "prstein");
      const svinn = num(input, "svinn");
      if (!allNumbers([areal, pr, svinn]) || areal <= 0 || pr <= 0) return [];
      const antall = Math.ceil((areal * (1 + svinn / 100)) / pr);
      return [
        result("antall", "Stein (avrundet opp)", antall, {
          kind: "integer",
          primary: true,
        }),
        result("pakker", "Pakker à 10", Math.ceil(antall / 10), {
          kind: "integer",
        }),
      ];
    },
  },
];
