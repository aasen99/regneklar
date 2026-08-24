import type { Calculator } from "../types";
import { num } from "../format";
import { allNumbers, createConverter, result } from "../helpers";

export const matCalculators: Calculator[] = [
  {
    slug: "oppskrift",
    title: "Oppskriftsskalering",
    description: "Skaler en oppskrift fra et antall porsjoner til et annet.",
    category: "mat",
    tags: ["oppskrift", "porsjoner", "matlaging"],
    popular: true,
    fields: [
      {
        id: "mengde",
        label: "Mengde i oppskriften",
        type: "number",
        defaultValue: 400,
      },
      {
        id: "fra",
        label: "Porsjoner i oppskriften",
        type: "number",
        defaultValue: 4,
      },
      {
        id: "til",
        label: "Ønskede porsjoner",
        type: "number",
        defaultValue: 6,
      },
    ],
    formula: "ny mengde = gammel · (nye porsjoner / gamle porsjoner)",
    explanation:
      "Alle ingredienser ganges med samme faktor. Krydder og hevemidler kan trenge finjustering – smak og sjekk.",
    compute(input) {
      const mengde = num(input, "mengde");
      const fra = num(input, "fra");
      const til = num(input, "til");
      if (!allNumbers([mengde, fra, til]) || fra === 0) return [];
      const faktor = til / fra;
      return [
        result("ny", "Ny mengde", mengde * faktor, {
          digits: 2,
          primary: true,
        }),
        result("faktor", "Skaleringsfaktor", faktor, { digits: 3 }),
      ];
    },
  },
  createConverter({
    slug: "kokkemal",
    title: "Kjøkkenmål",
    description: "Regn om mellom ts, ss, dl, liter og kopper. Vannbasert (1 ml ≈ 1 g).",
    category: "mat",
    tags: ["ss", "ts", "dl", "mål"],
    defaultFrom: "ss",
    defaultTo: "ml",
    defaultValue: 1,
    formula: "1 ss = 15 ml     1 ts = 5 ml     1 dl = 100 ml",
    explanation:
      "Norske matskjeer er 15 ml og teskjeer 5 ml. En amerikansk cup er 240 ml. For sukker og mel veier 1 ml ikke 1 g.",
    units: [
      { id: "ml", label: "Milliliter (ml)", toBase: 1 },
      { id: "ts", label: "Teskje (ts)", toBase: 5 },
      { id: "ss", label: "Spiseskje (ss)", toBase: 15 },
      { id: "dl", label: "Desiliter (dl)", toBase: 100 },
      { id: "l", label: "Liter (l)", toBase: 1000 },
      { id: "cup", label: "Cup (US)", toBase: 240 },
    ],
  }),
  {
    slug: "gjester",
    title: "Mat til gjester",
    description: "Et grovt anslag på hvor mye mat du trenger til et selskap.",
    category: "mat",
    tags: ["selskap", "porsjoner", "buffet"],
    fields: [
      {
        id: "voksne",
        label: "Voksne",
        type: "number",
        defaultValue: 8,
      },
      {
        id: "barn",
        label: "Barn",
        type: "number",
        defaultValue: 3,
      },
      {
        id: "type",
        label: "Måltid",
        type: "select",
        defaultValue: "middag",
        options: [
          { value: "middag", label: "Middag (varmrett)" },
          { value: "buffet", label: "Buffet / grilling" },
          { value: "kake", label: "Kake og kaffe" },
        ],
      },
    ],
    formula: "porsjoner = voksne + 0,6 · barn, deretter m × porsjonsvekt",
    explanation:
      "Tommelfingerregler: middag ca. 350 g varmrett per voksen, buffet 400 g, kake 120 g. Barn regnes som 60 %.",
    compute(input) {
      const voksne = num(input, "voksne");
      const barn = num(input, "barn");
      if (!allNumbers([voksne, barn])) return [];
      const porsjoner = voksne + 0.6 * barn;
      const per: Record<string, number> = {
        middag: 350,
        buffet: 400,
        kake: 120,
      };
      const gram = porsjoner * (per[input.type] ?? 350);
      return [
        result("gram", "Matmengde", gram / 1000, {
          digits: 2,
          unit: "kg",
          primary: true,
        }),
        result("porsjoner", "Voksenporsjoner", porsjoner, { digits: 1 }),
      ];
    },
  },
  {
    slug: "steketid",
    title: "Steketid kjøtt",
    description: "Grov steketid ut fra vekt og minutter per kilo.",
    category: "mat",
    tags: ["stek", "ovn", "kjøtt"],
    fields: [
      { id: "kg", label: "Vekt", type: "number", unit: "kg", defaultValue: 1.4 },
      {
        id: "min",
        label: "Minutter per kg",
        type: "number",
        defaultValue: 40,
        hint: "Ofte 30–60 min/kg avhengig av stek og ønsket kjerne.",
      },
      {
        id: "hvile",
        label: "Hviletid",
        type: "number",
        unit: "min",
        defaultValue: 15,
      },
    ],
    formula: "tid = vekt · min/kg + hvile",
    explanation:
      "Kjernetemperatur er sikrere enn klokka. Bruk dette som utgangspunkt, og sjekk med steketermometer.",
    compute(input) {
      const kg = num(input, "kg");
      const min = num(input, "min");
      const hvile = num(input, "hvile");
      if (!allNumbers([kg, min, hvile])) return [];
      const stek = kg * min;
      return [
        result("stek", "Steketid", stek, {
          digits: 0,
          unit: "min",
          primary: true,
        }),
        result("total", "Inkl. hvile", stek + hvile, { digits: 0, unit: "min" }),
      ];
    },
  },
];
