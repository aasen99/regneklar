import type { Calculator } from "../types";
import { num } from "../format";
import { allNumbers, result } from "../helpers";

export const skoleCalculators: Calculator[] = [
  {
    slug: "karakterkalkulator",
    title: "Karakterkalkulator og vitnemål-snitt",
    shortTitle: "Karakterkalkulator",
    description:
      "Regn ut snitt på karakterer og vitnemål (1–6), med eller uten vekting av fag.",
    category: "skole",
    tags: [
      "karakterkalkulator",
      "vitnemål",
      "snitt",
      "karakter",
      "vgs",
      "skole",
    ],
    popular: true,
    fields: [
      {
        id: "karakterer",
        label: "Karakterer",
        type: "text",
        defaultValue: "5, 4, 6, 5, 3",
        hint: "Skill med komma. For vekting skriv 5:2 (karakter:vekttall).",
      },
    ],
    formula: "snitt = Σ (karakter · vekt) / Σ vekt",
    explanation:
      "Uten vekting teller hvert fag likt. Med kolon, f.eks. 5:2, teller karakteren dobbelt – nyttig for standpunkt og vitnemål med ulike årstimer.",
    compute(input) {
      const parts = (input.karakterer ?? "")
        .split(/[,;\s]+/)
        .map((p) => p.trim())
        .filter(Boolean);
      const rows: { k: number; v: number }[] = [];
      for (const part of parts) {
        const [ks, vs] = part.split(":");
        const k = Number(ks.replace(",", "."));
        const v = vs ? Number(vs.replace(",", ".")) : 1;
        if (!Number.isFinite(k) || !Number.isFinite(v) || v <= 0) continue;
        rows.push({ k, v });
      }
      if (rows.length === 0) return [];
      const sumV = rows.reduce((a, r) => a + r.v, 0);
      const snitt = rows.reduce((a, r) => a + r.k * r.v, 0) / sumV;
      return [
        result("snitt", "Snitt", snitt, { digits: 2, primary: true }),
        result("fag", "Antall karakterer", rows.length, { kind: "integer" }),
      ];
    },
  },
  {
    slug: "karakterbehov",
    title: "Karakterbehov",
    description: "Hvilken karakter trenger du på siste prøve for å nå et snitt?",
    category: "skole",
    tags: ["karakter", "prøve", "mål"],
    fields: [
      {
        id: "naa",
        label: "Nåværende snitt",
        type: "number",
        defaultValue: 4.2,
        step: 0.1,
      },
      {
        id: "antall",
        label: "Antall karakterer så langt",
        type: "number",
        defaultValue: 4,
      },
      {
        id: "maal",
        label: "Ønsket snitt",
        type: "number",
        defaultValue: 4.5,
        step: 0.1,
      },
    ],
    formula: "x = mål · (n+1) − nåværende snitt · n",
    explanation:
      "x er karakteren du trenger på neste vurdering, gitt at alle teller likt. Over 6 eller under 1 betyr at målet er urealistisk med én prøve.",
    compute(input) {
      const naa = num(input, "naa");
      const antall = num(input, "antall");
      const maal = num(input, "maal");
      if (!allNumbers([naa, antall, maal]) || antall < 0) return [];
      const x = maal * (antall + 1) - naa * antall;
      let kommentar = "Innenfor 1–6.";
      if (x > 6) kommentar = "Trenger mer enn 6 – målet er for høyt med én prøve.";
      if (x < 1) kommentar = "Du kan ligge under 1 og likevel nå målet.";
      return [
        result("x", "Nødvendig karakter", x, { digits: 2, primary: true }),
        result("kom", "Vurdering", kommentar, { kind: "text" }),
      ];
    },
  },
  {
    slug: "prosent-karakter",
    title: "Prosent til karakter",
    description:
      "Et vanlig, uoffisielt omregningsskjema fra prosent til karakter 1–6.",
    category: "skole",
    tags: ["prosent", "karakter", "prøve"],
    fields: [
      {
        id: "prosent",
        label: "Score",
        type: "number",
        unit: "%",
        defaultValue: 78,
      },
    ],
    formula:
      "0–39 → 1    40–55 → 2    56–69 → 3    70–83 → 4    84–92 → 5    93–100 → 6",
    explanation:
      "Skolen og faget bestemmer egne grenser. Dette er et illustrerende skjema, ikke en nasjonal standard.",
    disclaimer: "Bruk lærers vurderingsskjema når det finnes.",
    compute(input) {
      const p = num(input, "prosent");
      if (!Number.isFinite(p)) return [];
      let k = 1;
      if (p >= 93) k = 6;
      else if (p >= 84) k = 5;
      else if (p >= 70) k = 4;
      else if (p >= 56) k = 3;
      else if (p >= 40) k = 2;
      return [
        result("k", "Illustrerende karakter", k, {
          kind: "integer",
          primary: true,
        }),
      ];
    },
  },
  {
    slug: "studiebelastning",
    title: "Studiebelastning",
    description: "Regn om studiepoeng til andel årsenhet og uketimer.",
    category: "skole",
    tags: ["studiepoeng", "universitet", "studie"],
    fields: [
      {
        id: "sp",
        label: "Studiepoeng dette semesteret",
        type: "number",
        defaultValue: 30,
      },
      {
        id: "uker",
        label: "Uker i semesteret",
        type: "number",
        defaultValue: 16,
      },
    ],
    formula: "60 sp = 1 årsenhet ≈ 1500–1800 timer",
    explanation:
      "Fulltid er 30 sp per semester / 60 sp per år. Her brukes 1680 timer per årsenhet som midtverdi, fordelt på semesterets uker.",
    compute(input) {
      const sp = num(input, "sp");
      const uker = num(input, "uker");
      if (!allNumbers([sp, uker]) || uker <= 0) return [];
      const timer = (sp / 60) * 1680;
      return [
        result("andel", "Andel årsenhet", (sp / 60) * 100, {
          kind: "percent",
          digits: 0,
          primary: true,
        }),
        result("uke", "Timer per uke (anslag)", timer / uker, {
          digits: 1,
          unit: "t",
        }),
        result("total", "Timer i semesteret", timer, { kind: "integer", unit: "t" }),
      ];
    },
  },
  {
    slug: "eksamen-standpunkt",
    title: "Eksamen og standpunkt",
    description:
      "Finn samlet karakter når standpunkt og eksamen vektes ulikt.",
    category: "skole",
    tags: ["eksamen", "standpunkt", "karakter", "vekt"],
    fields: [
      {
        id: "standpunkt",
        label: "Standpunkt",
        type: "number",
        defaultValue: 5,
      },
      {
        id: "eksamen",
        label: "Eksamen",
        type: "number",
        defaultValue: 4,
      },
      {
        id: "eksvekt",
        label: "Eksamensvekt",
        type: "number",
        unit: "%",
        defaultValue: 50,
        hint: "Mange fag teller 50/50. Noen teller eksamen mindre.",
      },
    ],
    formula: "samlet = standpunkt · (1 − v) + eksamen · v",
    explanation:
      "v er eksamensandelen som desimal. 50 % eksamen betyr at standpunkt og eksamen teller likt. Skolen kan ha egne regler for avrunding.",
    compute(input) {
      const s = num(input, "standpunkt");
      const e = num(input, "eksamen");
      const v = num(input, "eksvekt");
      if (!allNumbers([s, e, v])) return [];
      const andel = v / 100;
      const samlet = s * (1 - andel) + e * andel;
      return [
        result("samlet", "Samlet karakter", samlet, {
          digits: 2,
          primary: true,
        }),
        result("avr", "Avrundet til heltall", Math.round(samlet), {
          kind: "integer",
        }),
      ];
    },
  },
  {
    slug: "studiepoeng-timer",
    title: "Studiepoeng til arbeidstimer",
    shortTitle: "SP → timer",
    description:
      "Omregn studiepoeng til forventet arbeidsmengde (EU/ECTS-tommelfinger).",
    category: "skole",
    tags: ["studiepoeng", "ects", "arbeidstid", "universitet"],
    popular: true,
    fields: [
      {
        id: "sp",
        label: "Studiepoeng",
        type: "number",
        defaultValue: 10,
      },
      {
        id: "timerPerSp",
        label: "Timer per studiepoeng",
        type: "number",
        defaultValue: 27,
        hint: "ECTS: ofte 25–30 timer per sp. Norge bruker gjerne ca. 26–28.",
      },
    ],
    formula: "timer = sp · timer/sp",
    explanation:
      "1 studiepoeng tilsvarer typisk 25–30 arbeidstimer inkludert undervisning, lesing og eksamen.",
    compute(input) {
      const sp = num(input, "sp");
      const t = num(input, "timerPerSp");
      if (!allNumbers([sp, t]) || sp < 0 || t <= 0) return [];
      return [
        result("timer", "Totalt arbeid", sp * t, {
          digits: 0,
          unit: "t",
          primary: true,
        }),
        result("uker", "Ved 40 t/uke", (sp * t) / 40, {
          digits: 1,
          unit: "uker",
        }),
      ];
    },
  },
  {
    slug: "karakterskala",
    title: "Karakterskala-omregning",
    shortTitle: "Skala",
    description:
      "Grov omregning mellom norsk 1–6, bokstav A–F og amerikansk 4.0-skala.",
    category: "skole",
    tags: ["karakter", "ects", "gpa", "omregning"],
    popular: true,
    fields: [
      {
        id: "fra",
        label: "Jeg har",
        type: "select",
        defaultValue: "norsk",
        options: [
          { value: "norsk", label: "Norsk tallkarakter (1–6)" },
          { value: "bokstav", label: "Bokstav (A–F)" },
          { value: "gpa", label: "GPA / 4.0-skala" },
        ],
      },
      {
        id: "norsk",
        label: "Norsk karakter",
        type: "number",
        defaultValue: 5,
        step: 0.1,
      },
      {
        id: "bokstav",
        label: "Bokstav",
        type: "select",
        defaultValue: "B",
        options: ["A", "B", "C", "D", "E", "F"].map((b) => ({
          value: b,
          label: b,
        })),
      },
      {
        id: "gpa",
        label: "GPA",
        type: "number",
        defaultValue: 3.3,
        step: 0.1,
      },
    ],
    formula: "illustrativ mapping – ikke offisiell konvertering",
    explanation:
      "Ulike universitet og land vekter ulikt. Bruk dette som grovt bilde, ikke til søknader.",
    disclaimer: "Ikke offisiell NOKUT-/universitetsomregning.",
    compute(input) {
      const mapNorskToLetter = (n: number) => {
        if (n >= 5.5) return "A";
        if (n >= 4.5) return "B";
        if (n >= 3.5) return "C";
        if (n >= 2.5) return "D";
        if (n >= 1.5) return "E";
        return "F";
      };
      const letterToNorsk: Record<string, number> = {
        A: 6,
        B: 5,
        C: 4,
        D: 3,
        E: 2,
        F: 1,
      };
      const letterToGpa: Record<string, number> = {
        A: 4.0,
        B: 3.3,
        C: 2.3,
        D: 1.3,
        E: 1.0,
        F: 0,
      };
      if (input.fra === "bokstav") {
        const b = input.bokstav ?? "B";
        return [
          result("norsk", "Norsk (ca.)", letterToNorsk[b] ?? 4, {
            digits: 0,
            primary: true,
          }),
          result("gpa", "GPA (ca.)", letterToGpa[b] ?? 0, { digits: 1 }),
        ];
      }
      if (input.fra === "gpa") {
        const g = num(input, "gpa");
        if (!Number.isFinite(g)) return [];
        let letter = "F";
        if (g >= 3.7) letter = "A";
        else if (g >= 3.0) letter = "B";
        else if (g >= 2.0) letter = "C";
        else if (g >= 1.3) letter = "D";
        else if (g >= 0.7) letter = "E";
        return [
          result("bokstav", "Bokstav (ca.)", letter, {
            kind: "text",
            primary: true,
          }),
          result("norsk", "Norsk (ca.)", letterToNorsk[letter], {
            digits: 0,
          }),
        ];
      }
      const n = num(input, "norsk");
      if (!Number.isFinite(n)) return [];
      const letter = mapNorskToLetter(n);
      return [
        result("bokstav", "Bokstav (ca.)", letter, {
          kind: "text",
          primary: true,
        }),
        result("gpa", "GPA (ca.)", letterToGpa[letter], { digits: 1 }),
      ];
    },
  },
  {
    slug: "fravaer",
    title: "Fraværsprosent",
    shortTitle: "Fravær",
    description: "Regn ut fraværsprosent og hvor mye du kan være borte til en grense.",
    category: "skole",
    tags: ["fravær", "prosent", "skole"],
    fields: [
      {
        id: "timer",
        label: "Timer så langt (undervisning)",
        type: "number",
        defaultValue: 80,
      },
      {
        id: "fravaer",
        label: "Fraværstimer",
        type: "number",
        defaultValue: 6,
      },
      {
        id: "grense",
        label: "Grense",
        type: "number",
        unit: "%",
        defaultValue: 10,
        hint: "Mange skoler har 10 % udokumentert fravær som grense – sjekk egen regel.",
      },
    ],
    formula: "fravær % = fravær / timer · 100",
    explanation:
      "Dokumentert fravær kan regnes annerledes. Her er det rå andel av undervisningstimene.",
    disclaimer: "Skolens reglement gjelder. Dette er ikke juridisk råd.",
    compute(input) {
      const timer = num(input, "timer");
      const fravaer = num(input, "fravaer");
      const grense = num(input, "grense");
      if (!allNumbers([timer, fravaer, grense]) || timer <= 0) return [];
      const p = (fravaer / timer) * 100;
      const maks = (grense / 100) * timer;
      return [
        result("p", "Fraværsprosent", p, {
          kind: "percent",
          digits: 1,
          primary: true,
        }),
        result("maks", "Maks fravær til grensen", maks, {
          digits: 1,
          unit: "t",
        }),
        result("igjen", "Timer igjen til grensen", Math.max(0, maks - fravaer), {
          digits: 1,
          unit: "t",
        }),
      ];
    },
  },
  {
    slug: "lesetid",
    title: "Lesetid / sider",
    shortTitle: "Lesetid",
    description: "Anslå tid til å lese et antall sider, eller sider på gitt tid.",
    category: "skole",
    tags: ["lese", "sider", "studieteknikk"],
    fields: [
      {
        id: "modus",
        label: "Jeg vil",
        type: "select",
        defaultValue: "tid",
        options: [
          { value: "tid", label: "Finne tid" },
          { value: "sider", label: "Finne sider" },
        ],
      },
      {
        id: "sider",
        label: "Antall sider",
        type: "number",
        defaultValue: 40,
      },
      {
        id: "min",
        label: "Minutter",
        type: "number",
        unit: "min",
        defaultValue: 120,
      },
      {
        id: "fart",
        label: "Sider per time",
        type: "number",
        defaultValue: 20,
        hint: "Lærebok ofte 10–25, roman ofte høyere.",
      },
    ],
    formula: "tid (t) = sider / (sider per time)",
    explanation:
      "Fagtekst går tregere enn skjønnlitteratur. Juster farten etter vanskelighetsgrad.",
    compute(input) {
      const fart = num(input, "fart");
      if (!Number.isFinite(fart) || fart <= 0) return [];
      if (input.modus === "sider") {
        const min = num(input, "min");
        if (!Number.isFinite(min) || min < 0) return [];
        return [
          result("sider", "Sider", (min / 60) * fart, {
            digits: 0,
            primary: true,
          }),
        ];
      }
      const sider = num(input, "sider");
      if (!Number.isFinite(sider) || sider < 0) return [];
      const timer = sider / fart;
      return [
        result("tid", "Lesetid", timer * 60, {
          digits: 0,
          unit: "min",
          primary: true,
        }),
        result("t", "I timer", timer, { digits: 1, unit: "t" }),
      ];
    },
  },
  {
    slug: "karakterpoeng",
    title: "Karakterpoeng (enkel)",
    shortTitle: "Karakterpoeng",
    description:
      "Summer karakterpoeng fra standpunkt (1–6) – uten tilleggspoeng.",
    category: "skole",
    tags: ["karakterpoeng", "vgs", "opptak"],
    fields: [
      {
        id: "karakterer",
        label: "Karakterer",
        type: "text",
        defaultValue: "5, 4, 6, 5, 5, 4, 3, 5",
        hint: "Skill med komma. Kun tallkarakterer 1–6.",
      },
    ],
    formula: "karakterpoeng = sum av karakterer",
    explanation:
      "I videregående summeres ofte standpunktkarakterene. Realfagstillegg, språk og kjønnspoeng er ikke med her.",
    disclaimer: "Sjekk Samordna opptak for gjeldende regler og tilleggspoeng.",
    compute(input) {
      const parts = (input.karakterer ?? "")
        .split(/[,;\s]+/)
        .map((p) => Number(p.replace(",", ".")))
        .filter((n) => Number.isFinite(n));
      if (parts.length === 0) return [];
      const sum = parts.reduce((a, b) => a + b, 0);
      return [
        result("sum", "Karakterpoeng", sum, {
          digits: 1,
          primary: true,
        }),
        result("snitt", "Snitt", sum / parts.length, { digits: 2 }),
        result("n", "Antall fag", parts.length, { kind: "integer" }),
      ];
    },
  },
  {
    slug: "vekttall-snitt",
    title: "Snitt med vekttall",
    shortTitle: "Vekttall",
    description:
      "Regn ut snitt når fag har ulike vekttall (studiepoeng eller årstimer).",
    category: "skole",
    tags: ["vekttall", "studiepoeng", "snitt", "universitet"],
    fields: [
      {
        id: "rader",
        label: "Karakter:vekttall",
        type: "text",
        defaultValue: "A:10, B:10, C:5, B:15",
        hint: "Bokstav A–F eller tall 1–6. Eksempel: B:10",
      },
    ],
    formula: "snitt = Σ (karakterverdi · vekt) / Σ vekt",
    explanation:
      "A=5 … F=0 på ECTS-lignende skala her (A beste). Tallkarakterer brukes direkte.",
    compute(input) {
      const letterVal: Record<string, number> = {
        A: 5,
        B: 4,
        C: 3,
        D: 2,
        E: 1,
        F: 0,
      };
      const parts = (input.rader ?? "")
        .split(/[,;]+/)
        .map((p) => p.trim())
        .filter(Boolean);
      let sum = 0;
      let vekt = 0;
      for (const part of parts) {
        const [ks, vs] = part.split(":");
        if (!ks || !vs) continue;
        const key = ks.trim().toUpperCase();
        const k = letterVal[key] ?? Number(key.replace(",", "."));
        const v = Number(vs.replace(",", "."));
        if (!Number.isFinite(k) || !Number.isFinite(v) || v <= 0) continue;
        sum += k * v;
        vekt += v;
      }
      if (vekt === 0) return [];
      return [
        result("snitt", "Vektet snitt", sum / vekt, {
          digits: 2,
          primary: true,
        }),
        result("sp", "Sum vekttall", vekt, { digits: 1 }),
      ];
    },
  },
  {
    slug: "pensum-timer",
    title: "Pensum og studietimer",
    shortTitle: "Studietimer",
    description:
      "Anslå ukentlig studietid fra studiepoeng og semesteruker (ECTS-tommelfinger).",
    category: "skole",
    tags: ["studiepoeng", "pensum", "timer", "universitet", "ects"],
    fields: [
      {
        id: "sp",
        label: "Studiepoeng per semester",
        type: "number",
        defaultValue: 30,
      },
      {
        id: "uker",
        label: "Semesteruker",
        type: "number",
        defaultValue: 15,
      },
      {
        id: "faktor",
        label: "Timer per SP per uke",
        type: "number",
        defaultValue: 1.67,
        hint: "ECTS: 1 SP ≈ 25–30 timer totalt → ca. 1,7 t/uke over 15 uker.",
      },
    ],
    formula: "timer/uke ≈ SP · faktor",
    explanation:
      "1 studiepoeng tilsvarer ca. 25–30 timers arbeid totalt i semesteret. Inkluderer forelesning, øvinger og egenstudium.",
    compute(input) {
      const sp = num(input, "sp");
      const uker = num(input, "uker");
      const faktor = num(input, "faktor");
      if (!allNumbers([sp, uker, faktor]) || uker <= 0) return [];
      const perUke = sp * faktor;
      const totalt = perUke * uker;
      return [
        result("uke", "Timer per uke", perUke, {
          digits: 1,
          unit: "t",
          primary: true,
        }),
        result("tot", "Totalt i semesteret", totalt, { digits: 0, unit: "t" }),
      ];
    },
  },
  {
    slug: "skolestart-alder",
    title: "Skolestart og alder",
    shortTitle: "Skolestart",
    description:
      "Finn hvilket år barnet starter 1. trinn basert på fødselsår (norsk regel).",
    category: "skole",
    tags: ["skolestart", "1. trinn", "alder", "barn", "opptak"],
    fields: [
      {
        id: "fodselsaar",
        label: "Fødselsår",
        type: "number",
        defaultValue: 2019,
      },
    ],
    formula: "1. trinn = året barnet fyller 6 (august)",
    explanation:
      "I Norge starter barn normalt på 1. trinn i august det året de fyller 6. Noen utsetter ett år – det avklares med skolen.",
    disclaimer: "Gjelder ordinær norsk grunnskole. Sjekk kommunen for lokale frister.",
    compute(input) {
      const ar = num(input, "fodselsaar");
      if (!Number.isFinite(ar) || ar < 1990 || ar > 2030) return [];
      const start = ar + 6;
      const alder = new Date().getFullYear() - ar;
      return [
        result("start", "Starter 1. trinn (ca.)", `August ${start}`, {
          kind: "text",
          primary: true,
        }),
        result("alder", "Alder nå", alder, { kind: "integer", unit: "år" }),
      ];
    },
  },
];
