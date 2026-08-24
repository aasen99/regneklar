import type { Calculator } from "../types";
import { addDays, formatDate, num, parseDate } from "../format";
import { allNumbers, result } from "../helpers";

export const helseCalculators: Calculator[] = [
  {
    slug: "bmi",
    title: "BMI-kalkulator",
    shortTitle: "BMI",
    description:
      "Regn ut kroppsmasseindeks fra vekt og høyde, med vanlige vektklasser.",
    category: "helse",
    tags: ["bmi", "vekt", "helse"],
    popular: true,
    fields: [
      {
        id: "kg",
        label: "Vekt",
        type: "number",
        unit: "kg",
        defaultValue: 75,
      },
      {
        id: "cm",
        label: "Høyde",
        type: "number",
        unit: "cm",
        defaultValue: 178,
      },
    ],
    formula: "BMI = vekt (kg) / høyde (m)²",
    explanation:
      "BMI er et grovt mål på forholdet mellom vekt og høyde. Det skiller ikke mellom muskel og fett, og passer dårligere for barn, gravide og svært muskuløse.",
    disclaimer: "BMI erstatter ikke vurdering fra helsepersonell.",
    compute(input) {
      const kg = num(input, "kg");
      const cm = num(input, "cm");
      if (!allNumbers([kg, cm]) || kg <= 0 || cm <= 0) return [];
      const m = cm / 100;
      const bmi = kg / (m * m);
      let klasse = "Fedme klasse III";
      if (bmi < 18.5) klasse = "Undervekt";
      else if (bmi < 25) klasse = "Normalvekt";
      else if (bmi < 30) klasse = "Overvekt";
      else if (bmi < 35) klasse = "Fedme klasse I";
      else if (bmi < 40) klasse = "Fedme klasse II";
      return [
        result("bmi", "BMI", bmi, { digits: 1, primary: true }),
        result("klasse", "Vektklasse", klasse, { kind: "text" }),
      ];
    },
  },
  {
    slug: "kaloribehov",
    title: "Kaloribehov (BMR og TDEE)",
    shortTitle: "Kalorier",
    description:
      "Estimer hvileforbrenning og daglig kaloribehov med Mifflin–St Jeor.",
    category: "helse",
    tags: ["kalorier", "bmr", "tdee", "forbrenning"],
    popular: true,
    fields: [
      {
        id: "kjonn",
        label: "Kjønn",
        type: "select",
        defaultValue: "mann",
        options: [
          { value: "mann", label: "Mann" },
          { value: "kvinne", label: "Kvinne" },
        ],
      },
      { id: "kg", label: "Vekt", type: "number", unit: "kg", defaultValue: 75 },
      {
        id: "cm",
        label: "Høyde",
        type: "number",
        unit: "cm",
        defaultValue: 178,
      },
      { id: "alder", label: "Alder", type: "number", unit: "år", defaultValue: 32 },
      {
        id: "aktivitet",
        label: "Aktivitetsnivå",
        type: "select",
        defaultValue: "1.55",
        options: [
          { value: "1.2", label: "Lite aktiv (stillesittende)" },
          { value: "1.375", label: "Lett aktiv (1–3 økter/uke)" },
          { value: "1.55", label: "Moderat (3–5 økter/uke)" },
          { value: "1.725", label: "Høy (6–7 økter/uke)" },
          { value: "1.9", label: "Svært høy (hard jobb + trening)" },
        ],
      },
    ],
    formula:
      "BMR = 10·kg + 6,25·cm − 5·alder + s     TDEE = BMR · aktivitet",
    explanation:
      "Mifflin–St Jeor er en vanlig formel for basalt energiforbruk. s er +5 for menn og −161 for kvinner. TDEE ganger BMR med et aktivitetsnivå.",
    disclaimer: "Estimat – behovet varierer fra person til person.",
    compute(input) {
      const kg = num(input, "kg");
      const cm = num(input, "cm");
      const alder = num(input, "alder");
      const akt = num(input, "aktivitet");
      if (!allNumbers([kg, cm, alder, akt])) return [];
      const s = input.kjonn === "kvinne" ? -161 : 5;
      const bmr = 10 * kg + 6.25 * cm - 5 * alder + s;
      const tdee = bmr * akt;
      return [
        result("tdee", "Daglig behov (TDEE)", tdee, {
          kind: "integer",
          unit: "kcal",
          primary: true,
        }),
        result("bmr", "Hvileforbrenning (BMR)", bmr, {
          kind: "integer",
          unit: "kcal",
        }),
        result("kutt", "For vekttap (ca. −500 kcal)", tdee - 500, {
          kind: "integer",
          unit: "kcal",
        }),
      ];
    },
  },
  {
    slug: "ideell-vekt",
    title: "Vekt ved gitt BMI",
    description: "Finn vekten som tilsvarer en ønsket BMI for din høyde.",
    category: "helse",
    tags: ["bmi", "vekt"],
    fields: [
      {
        id: "cm",
        label: "Høyde",
        type: "number",
        unit: "cm",
        defaultValue: 178,
      },
      {
        id: "bmi",
        label: "Ønsket BMI",
        type: "number",
        defaultValue: 22,
      },
    ],
    formula: "vekt = BMI · høyde²",
    explanation:
      "Normal BMI-range for voksne er ofte 18,5–24,9. «Ideell vekt» er et grovt anslag, ikke et mål alle skal treffe.",
    compute(input) {
      const cm = num(input, "cm");
      const bmi = num(input, "bmi");
      if (!allNumbers([cm, bmi]) || cm <= 0) return [];
      const m = cm / 100;
      const vekt = bmi * m * m;
      return [
        result("vekt", "Vekt", vekt, { digits: 1, unit: "kg", primary: true }),
        result("lav", "Ved BMI 18,5", 18.5 * m * m, { digits: 1, unit: "kg" }),
        result("hoy", "Ved BMI 24,9", 24.9 * m * m, { digits: 1, unit: "kg" }),
      ];
    },
  },
  {
    slug: "termin",
    title: "Terminkalkulator",
    description:
      "Estimer termin fra siste menstruasjons første dag (Naegele-regelen).",
    category: "helse",
    tags: ["gravid", "termin", "svangerskap"],
    fields: [
      {
        id: "siste",
        label: "Siste menstruasjon (første dag)",
        type: "date",
        defaultValue: "2026-01-15",
      },
      {
        id: "syklus",
        label: "Sykluslengde",
        type: "number",
        unit: "dager",
        defaultValue: 28,
      },
    ],
    formula: "termin = LMP + 280 dager + (syklus − 28)",
    explanation:
      "Naegele-regelen legger til 280 dager (40 uker) fra første dag i siste menstruasjon. Ved annen sykluslengde enn 28 dager justeres datoen.",
    disclaimer: "Ultralyd gir vanligvis mer treffsikker termin.",
    compute(input) {
      const siste = parseDate(input.siste);
      const syklus = num(input, "syklus") ?? 28;
      if (!siste) return [];
      const termin = addDays(siste, 280 + (syklus - 28));
      const idag = new Date();
      idag.setHours(0, 0, 0, 0);
      const dager = Math.round(
        (termin.getTime() - idag.getTime()) / (1000 * 60 * 60 * 24),
      );
      const uke = Math.max(0, Math.min(42, 40 - dager / 7));
      return [
        result("termin", "Forventet termin", formatDate(termin), {
          kind: "text",
          primary: true,
        }),
        result("uker", "Omtrent svangerskapsuke nå", uke, {
          digits: 1,
          hint: "Basert på 40 uker til termin",
        }),
      ];
    },
  },
  {
    slug: "makspuls",
    title: "Makspuls",
    description: "Estimer makspuls og treningssoner fra alder.",
    category: "helse",
    tags: ["puls", "trening", "hjerte"],
    fields: [
      { id: "alder", label: "Alder", type: "number", unit: "år", defaultValue: 32 },
    ],
    formula: "HRmax ≈ 220 − alder",
    explanation:
      "220 minus alder er en grov tommelfingerregel. Faktisk makspuls varierer mye. Sonene er prosent av estimert makspuls.",
    compute(input) {
      const alder = num(input, "alder");
      if (!Number.isFinite(alder) || alder <= 0) return [];
      const max = 220 - alder;
      return [
        result("max", "Estimert makspuls", max, {
          kind: "integer",
          unit: "slag/min",
          primary: true,
        }),
        result("moderat", "Moderat sone (50–70 %)", `${Math.round(max * 0.5)}–${Math.round(max * 0.7)}`, {
          kind: "text",
          unit: "slag/min",
        }),
        result("hoy", "Høy intensitet (70–85 %)", `${Math.round(max * 0.7)}–${Math.round(max * 0.85)}`, {
          kind: "text",
          unit: "slag/min",
        }),
      ];
    },
  },
  {
    slug: "kroppsoverflate",
    title: "Kroppsoverflate (BSA)",
    description: "Regn ut kroppsoverflate med Mosteller-formelen.",
    category: "helse",
    tags: ["bsa", "overflate", "medisin"],
    fields: [
      { id: "kg", label: "Vekt", type: "number", unit: "kg", defaultValue: 75 },
      {
        id: "cm",
        label: "Høyde",
        type: "number",
        unit: "cm",
        defaultValue: 178,
      },
    ],
    formula: "BSA = √(høyde(cm) · vekt(kg) / 3600)",
    explanation:
      "Mosteller-formelen brukes ofte i medisin, for eksempel ved dosering. Dette er ikke en doseringskalkulator.",
    compute(input) {
      const kg = num(input, "kg");
      const cm = num(input, "cm");
      if (!allNumbers([kg, cm]) || kg <= 0 || cm <= 0) return [];
      const bsa = Math.sqrt((cm * kg) / 3600);
      return [
        result("bsa", "Kroppsoverflate", bsa, {
          digits: 2,
          unit: "m²",
          primary: true,
        }),
      ];
    },
  },
  {
    slug: "vanninntak",
    title: "Væskebehov",
    description: "Et grovt anslag på daglig væskebehov ut fra vekt.",
    category: "helse",
    tags: ["vann", "drikke", "væske"],
    fields: [
      { id: "kg", label: "Vekt", type: "number", unit: "kg", defaultValue: 75 },
      {
        id: "aktivitet",
        label: "Ekstra ved trening",
        type: "number",
        unit: "ml",
        defaultValue: 500,
        hint: "Omtrent 400–800 ml ekstra per treningsøkt er vanlig råd.",
      },
    ],
    formula: "behov ≈ 30–35 ml · kg + ekstra",
    explanation:
      "Et vanlig utgangspunkt er rundt 30 ml per kilo kroppsvekt, pluss mer ved varme og trening. Tørste, urin og helse avgjør mer enn formelen.",
    compute(input) {
      const kg = num(input, "kg");
      const extraRaw = num(input, "aktivitet");
      const ekstra = Number.isFinite(extraRaw) ? extraRaw : 0;
      if (!Number.isFinite(kg) || kg <= 0) return [];
      const base = 32.5 * kg;
      return [
        result("behov", "Anslått dagsbehov", (base + ekstra) / 1000, {
          digits: 2,
          unit: "liter",
          primary: true,
        }),
        result("ml", "I milliliter", base + ekstra, {
          kind: "integer",
          unit: "ml",
        }),
      ];
    },
  },
  {
    slug: "vektreduksjon",
    title: "Tid til vektreduksjon",
    description:
      "Se omtrent hvor lang tid et kaloriunderskudd tar for å nå en målvekt.",
    category: "helse",
    tags: ["vekt", "kalorier", "underskudd"],
    fields: [
      {
        id: "naa",
        label: "Vekt nå",
        type: "number",
        unit: "kg",
        defaultValue: 82,
      },
      {
        id: "maal",
        label: "Målvekt",
        type: "number",
        unit: "kg",
        defaultValue: 75,
      },
      {
        id: "underskudd",
        label: "Daglig underskudd",
        type: "number",
        unit: "kcal",
        defaultValue: 500,
      },
    ],
    formula: "dager = (kg-tap · 7700) / daglig underskudd",
    explanation:
      "Ett kilo fettvev tilsvarer grovt 7700 kcal. Kroppen tilpasser seg, så tempoet er sjelden lineært. 0,25–0,75 kg i uken er et vanlig, mer bærekraftig tempo.",
    disclaimer: "Ikke et medisinsk råd. Snakk med helsepersonell ved stort vekttap.",
    compute(input) {
      const naa = num(input, "naa");
      const maal = num(input, "maal");
      const underskudd = num(input, "underskudd");
      if (!allNumbers([naa, maal, underskudd]) || underskudd <= 0) return [];
      const tap = naa - maal;
      if (tap <= 0) {
        return [
          result("status", "Status", "Målvekten er ikke lavere enn nå-vekten.", {
            kind: "text",
            primary: true,
          }),
        ];
      }
      const dager = (tap * 7700) / underskudd;
      return [
        result("uker", "Omtrent tid", dager / 7, {
          digits: 1,
          unit: "uker",
          primary: true,
        }),
        result("kguke", "Tempo", (underskudd * 7) / 7700, {
          digits: 2,
          unit: "kg/uke",
        }),
      ];
    },
  },
];
