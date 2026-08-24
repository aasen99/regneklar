import type { Calculator } from "../types";
import { addDays, daysBetween, formatDate, num, parseDate } from "../format";
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
    slug: "new-bmi",
    title: "New BMI",
    shortTitle: "New BMI",
    description:
      "Trefethens New BMI: vekt delt på høyde opphøyd i 2,5. Mindre skjev for korte og høye enn klassisk BMI.",
    category: "helse",
    tags: ["bmi", "new bmi", "trefethen", "vekt", "helse"],
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
    formula: "New BMI = 1,3 · vekt (kg) / høyde (m)^2,5",
    explanation:
      "Nick Trefethen (Oxford) argumenterte for at klassisk BMI bruker høyde i andre potens, mens friske voksne skalerer nærmere 2,5. Konstanten 1,3 gjør at tallet er uendret ved ca. 169 cm. Korte får da et høyere tall, høye et lavere – på samme WHO-skala som vanlig BMI.",
    disclaimer:
      "New BMI er et forslag, ikke en offisiell WHO-standard. Det erstatter ikke vurdering fra helsepersonell.",
    compute(input) {
      const kg = num(input, "kg");
      const cm = num(input, "cm");
      if (!allNumbers([kg, cm]) || kg <= 0 || cm <= 0) return [];
      const m = cm / 100;
      const classic = kg / (m * m);
      const neu = (1.3 * kg) / m ** 2.5;
      let klasse = "Fedme klasse III";
      if (neu < 18.5) klasse = "Undervekt";
      else if (neu < 25) klasse = "Normalvekt";
      else if (neu < 30) klasse = "Overvekt";
      else if (neu < 35) klasse = "Fedme klasse I";
      else if (neu < 40) klasse = "Fedme klasse II";
      return [
        result("new", "New BMI", neu, { digits: 1, primary: true }),
        result("klassisk", "Klassisk BMI", classic, { digits: 1 }),
        result("diff", "Forskjell", neu - classic, { digits: 1 }),
        result("klasse", "Vektklasse (New BMI)", klasse, { kind: "text" }),
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
  {
    slug: "midje-hoyde",
    title: "Midje-høyde-forhold",
    shortTitle: "Midje/høyde",
    description:
      "Midjemål delt på høyde – et enkelt mål som ofte treffer helserisiko bedre enn BMI alene.",
    category: "helse",
    tags: ["midje", "høyde", "helse", "mage"],
    fields: [
      {
        id: "midje",
        label: "Midjemål",
        type: "number",
        unit: "cm",
        defaultValue: 82,
        hint: "Mål rett over hofteskålene, etter vanlig utpust.",
      },
      {
        id: "hoyde",
        label: "Høyde",
        type: "number",
        unit: "cm",
        defaultValue: 178,
      },
    ],
    formula: "WHtR = midje / høyde",
    explanation:
      "Et forhold under 0,50 brukes ofte som tommelfingerregel for lavere risiko. Målet fanger opp magefett som BMI kan overse. Det er likevel bare ett tall, ikke en diagnose.",
    disclaimer: "Ikke medisinsk vurdering. Snakk med fastlege ved bekymring.",
    compute(input) {
      const midje = num(input, "midje");
      const hoyde = num(input, "hoyde");
      if (!allNumbers([midje, hoyde]) || hoyde <= 0) return [];
      const r = midje / hoyde;
      let vurdering = "Over 0,60 – ta det opp med helsepersonell.";
      if (r < 0.4) vurdering = "Lavt – sjekk at målebåndet sitter riktig.";
      else if (r < 0.5) vurdering = "Under 0,50 – ofte brukt som «grønt» område.";
      else if (r < 0.6) vurdering = "0,50–0,60 – forhøyet, verdt å følge med på.";
      return [
        result("forhold", "Forhold", r, { digits: 2, primary: true }),
        result("vurdering", "Tolkning", vurdering, { kind: "text" }),
      ];
    },
  },
  {
    slug: "makrofordeling",
    title: "Makrofordeling",
    description:
      "Fordel kalorier på protein, karbohydrat og fett i gram og prosent.",
    category: "helse",
    tags: ["makro", "protein", "kalorier", "kosthold"],
    fields: [
      {
        id: "kcal",
        label: "Kalorier per dag",
        type: "number",
        unit: "kcal",
        defaultValue: 2200,
      },
      {
        id: "protein",
        label: "Protein",
        type: "number",
        unit: "%",
        defaultValue: 25,
      },
      {
        id: "karbo",
        label: "Karbohydrat",
        type: "number",
        unit: "%",
        defaultValue: 45,
      },
      {
        id: "fett",
        label: "Fett",
        type: "number",
        unit: "%",
        defaultValue: 30,
      },
    ],
    formula: "gram = (kcal · %) / (4 eller 9)",
    explanation:
      "Protein og karbohydrat gir 4 kcal per gram, fett 9 kcal. Prosentene bør summere til 100. Tallene er et kostholdsverktøy, ikke en diett.",
    compute(input) {
      const kcal = num(input, "kcal");
      const p = num(input, "protein");
      const k = num(input, "karbo");
      const f = num(input, "fett");
      if (!allNumbers([kcal, p, k, f]) || kcal <= 0) return [];
      const sum = p + k + f;
      return [
        result("prot", "Protein", (kcal * p) / 100 / 4, {
          digits: 0,
          unit: "g",
          primary: true,
        }),
        result("karb", "Karbohydrat", (kcal * k) / 100 / 4, {
          digits: 0,
          unit: "g",
        }),
        result("fettg", "Fett", (kcal * f) / 100 / 9, {
          digits: 0,
          unit: "g",
        }),
        result("sum", "Sum prosent", sum, { kind: "percent", digits: 0 }),
      ];
    },
  },
  {
    slug: "graviditetsuke",
    title: "Graviditetsuke",
    description:
      "Finn svangerskapsuke og gjenstående dager fra siste menstruasjons første dag.",
    category: "helse",
    tags: ["gravid", "uke", "termin", "svangerskap"],
    fields: [
      {
        id: "lmp",
        label: "Siste menstruasjons første dag",
        type: "date",
        defaultValue: "2026-01-15",
      },
      {
        id: "dato",
        label: "Dato du vil sjekke",
        type: "date",
        defaultValue: "2026-08-25",
      },
    ],
    formula: "dager = dato − Siste menstruasjon     uke = dager / 7",
    explanation:
      "Svangerskapet telles fra første dag i siste menstruasjon, ikke unnfangelse. Fullgått er 40 uker (280 dager). Terminkalkulatoren bruker samme utgangspunkt.",
    disclaimer: "Ultralyd kan justere terminen. Dette erstatter ikke jordmor eller lege.",
    compute(input) {
      const lmp = parseDate(input.lmp);
      const dato = parseDate(input.dato);
      if (!lmp || !dato) return [];
      const dager = daysBetween(lmp, dato);
      if (dager < 0) {
        return [
          result("status", "Status", "Sjekkdatoen er før siste menstruasjon.", {
            kind: "text",
            primary: true,
          }),
        ];
      }
      const uker = Math.floor(dager / 7);
      const rest = dager % 7;
      const termin = addDays(lmp, 280);
      const igjen = Math.max(0, daysBetween(dato, termin));
      return [
        result("uke", "Svangerskapsuke", `${uker}+${rest}`, {
          kind: "text",
          primary: true,
        }),
        result("dager", "Dager siden LMP", dager, { kind: "integer" }),
        result("termin", "Termin (Naegele)", formatDate(termin), { kind: "text" }),
        result("igjen", "Dager til termin", igjen, { kind: "integer" }),
      ];
    },
  },
];
