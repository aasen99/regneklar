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
];
