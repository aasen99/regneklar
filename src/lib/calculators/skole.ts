import type { Calculator } from "../types";
import { num } from "../format";
import { allNumbers, result } from "../helpers";

export const skoleCalculators: Calculator[] = [
  {
    slug: "karaktersnitt",
    title: "Karaktersnitt",
    description:
      "Regn ut gjennomsnitt av karakterer 1–6, med eller uten vekting.",
    category: "skole",
    tags: ["karakter", "snitt", "skole"],
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
      "Uten vekting teller hvert fag likt. Med kolon, f.eks. 5:2, teller karakteren dobbelt – nyttig for standpunkt med ulike årstimer.",
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
];
