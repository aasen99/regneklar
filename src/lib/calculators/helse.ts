import type { Calculator } from "../types";
import { addDays, daysBetween, formatDate, num, parseDate } from "../format";
import { allNumbers, result } from "../helpers";

export const helseCalculators: Calculator[] = [
  {
    slug: "bmi",
    title: "BMI-kalkulator",
    shortTitle: "BMI",
    description:
      "Gratis BMI-kalkulator: regn ut kroppsmasseindeks fra vekt og høyde, med vanlige vektklasser.",
    category: "sport",
    tags: ["bmi", "bmi-kalkulator", "vekt", "helse", "kroppsmasseindeks"],
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
      "Trefethens New BMI: 1,3 × vekt delt på høyde opphøyd i 2,5. Mindre skjev for korte og høye enn klassisk BMI.",
    category: "sport",
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
    title: "Kalorikalkulator – BMR og TDEE",
    shortTitle: "Kalorier",
    description:
      "Kalorikalkulator: estimer hvileforbrenning (BMR) og daglig kaloribehov (TDEE) med Mifflin–St Jeor.",
    category: "sport",
    tags: [
      "kalorikalkulator",
      "kalorier",
      "kaloribehov",
      "bmr",
      "tdee",
      "forbrenning",
    ],
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
    category: "sport",
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
    slug: "terminkalkulator",
    title: "Terminkalkulator",
    description:
      "Regn ut forventet termin fra siste menstruasjons første dag (Naegele-regelen).",
    category: "sport",
    tags: ["terminkalkulator", "termin", "gravid", "svangerskap", "fødsel"],
    popular: true,
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
    title: "Makspulskalkulator",
    shortTitle: "Makspuls",
    description: "Estimer makspuls og treningssoner fra alder – gratis makspulskalkulator.",
    category: "sport",
    tags: ["makspuls", "makspulskalkulator", "puls", "trening", "hjerte", "pulssoner"],
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
    category: "sport",
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
    category: "sport",
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
    category: "sport",
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
    category: "sport",
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
    category: "sport",
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
    title: "Graviditetskalkulator – uke",
    shortTitle: "Graviditetsuke",
    description:
      "Graviditetskalkulator: finn svangerskapsuke og gjenstående dager fra siste menstruasjons første dag.",
    category: "sport",
    tags: [
      "graviditetskalkulator",
      "graviditetsuke",
      "gravid",
      "uke",
      "termin",
      "svangerskap",
    ],
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
  {
    slug: "kroppsfett-navy",
    title: "Kroppsfett (Navy-metoden)",
    shortTitle: "Kroppsfett %",
    description:
      "Anslå kroppsfettprosent fra midje, nakke og høyde (US Navy).",
    category: "sport",
    tags: ["kroppsfett", "navy", "målebånd", "helse"],
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
      {
        id: "hoyde",
        label: "Høyde",
        type: "number",
        unit: "cm",
        defaultValue: 178,
      },
      {
        id: "nakke",
        label: "Nakkeomkrets",
        type: "number",
        unit: "cm",
        defaultValue: 38,
      },
      {
        id: "midje",
        label: "Midjeomkrets",
        type: "number",
        unit: "cm",
        defaultValue: 84,
      },
      {
        id: "hofte",
        label: "Hofteomkrets",
        type: "number",
        unit: "cm",
        defaultValue: 98,
        hint: "Kun nødvendig for kvinner.",
      },
    ],
    formula:
      "menn: 495/(1,0324−0,19077·log10(midje−nakke)+0,15456·log10(h))−450",
    explanation:
      "US Navy-formelen bruker logaritmer av omkretsmål. Den er et anslag – DEXA og Bod Pod er mer nøyaktige.",
    disclaimer: "Ikke medisinsk diagnose. Mål på samme måte hver gang.",
    compute(input) {
      const h = num(input, "hoyde");
      const nakke = num(input, "nakke");
      const midje = num(input, "midje");
      if (!allNumbers([h, nakke, midje]) || h <= 0 || nakke <= 0 || midje <= 0) {
        return [];
      }
      let bf: number;
      if (input.kjonn === "kvinne") {
        const hofte = num(input, "hofte");
        if (!Number.isFinite(hofte) || hofte <= 0) return [];
        const x = midje + hofte - nakke;
        if (x <= 0) return [];
        bf =
          495 /
            (1.29579 -
              0.35004 * Math.log10(x) +
              0.221 * Math.log10(h)) -
          450;
      } else {
        const x = midje - nakke;
        if (x <= 0) return [];
        bf =
          495 /
            (1.0324 -
              0.19077 * Math.log10(x) +
              0.15456 * Math.log10(h)) -
          450;
      }
      return [
        result("bf", "Kroppsfett", bf, {
          kind: "percent",
          digits: 1,
          primary: true,
        }),
      ];
    },
  },
  {
    slug: "sovnbehov",
    title: "Søvnbehov",
    shortTitle: "Søvn",
    description:
      "Anslå søvnbehov etter alder, med justering for hard trening.",
    category: "sport",
    tags: ["søvn", "restitusjon", "helse"],
    fields: [
      {
        id: "alder",
        label: "Alder",
        type: "number",
        unit: "år",
        defaultValue: 30,
      },
      {
        id: "trening",
        label: "Treningsmengde",
        type: "select",
        defaultValue: "moderat",
        options: [
          { value: "lav", label: "Lav / ingen" },
          { value: "moderat", label: "Moderat" },
          { value: "hoy", label: "Hard / høy volum" },
        ],
      },
    ],
    formula: "voksen ≈ 7–9 t     +0,5–1 t ved hard trening",
    explanation:
      "Basert på vanlige aldersanbefalinger. Hard trening øker ofte behovet litt – individuelt.",
    disclaimer: "Generelt råd, ikke søvnmedisin.",
    compute(input) {
      const alder = num(input, "alder");
      if (!Number.isFinite(alder) || alder < 0) return [];
      let min = 7;
      let max = 9;
      if (alder < 1) {
        min = 12;
        max = 16;
      } else if (alder < 3) {
        min = 11;
        max = 14;
      } else if (alder < 6) {
        min = 10;
        max = 13;
      } else if (alder < 13) {
        min = 9;
        max = 12;
      } else if (alder < 18) {
        min = 8;
        max = 10;
      } else if (alder >= 65) {
        min = 7;
        max = 8;
      }
      const ekstra =
        input.trening === "hoy" ? 1 : input.trening === "moderat" ? 0.5 : 0;
      return [
        result(
          "anbefalt",
          "Anbefalt søvn",
          `${min + ekstra / 2}–${max + ekstra} timer`,
          { kind: "text", primary: true },
        ),
        result("mid", "Midtpunkt", (min + max) / 2 + ekstra / 2, {
          digits: 1,
          unit: "t",
        }),
      ];
    },
  },
  {
    slug: "hviletid-sett",
    title: "Hviletid mellom sett",
    shortTitle: "Hviletid",
    description:
      "Tommelfingerregel for pause mellom sett etter mål (styrke, hypertrofi, utholdenhet).",
    category: "sport",
    tags: ["hvile", "sett", "styrke", "hypertrofi"],
    fields: [
      {
        id: "mal",
        label: "Treningsmål",
        type: "select",
        defaultValue: "hypertrofi",
        options: [
          { value: "styrke", label: "Maksstyrke (lave reps)" },
          { value: "hypertrofi", label: "Muskelvekst" },
          { value: "utholdenhet", label: "Muskulær utholdenhet" },
        ],
      },
      {
        id: "reps",
        label: "Reps i settet",
        type: "number",
        defaultValue: 8,
      },
    ],
    formula: "styrke 3–5 min     hypertrofi 1–2 min     utholdenhet 30–90 s",
    explanation:
      "Tyngre sett og lavere reps trenger lengre pause for å holde kvaliteten. Dette er utgangspunkt, ikke fasit.",
    compute(input) {
      const reps = num(input, "reps");
      const ranges: Record<string, [number, number]> = {
        styrke: [180, 300],
        hypertrofi: [60, 120],
        utholdenhet: [30, 90],
      };
      const [lo, hi] = ranges[input.mal ?? "hypertrofi"] ?? [60, 120];
      let justert = lo;
      if (Number.isFinite(reps) && reps <= 5) justert = Math.max(lo, 180);
      if (Number.isFinite(reps) && reps >= 15) justert = Math.min(hi, 60);
      return [
        result(
          "anbefalt",
          "Anbefalt pause",
          `${Math.round(lo / 60)}–${Math.round(hi / 60)} min (${lo}–${hi} s)`,
          { kind: "text", primary: true },
        ),
        result("hint", "Utgangspunkt", justert, {
          digits: 0,
          unit: "s",
        }),
      ];
    },
  },
  {
    slug: "carbs-kalkulator",
    title: "Karbohydratkalkulator (carbs)",
    shortTitle: "Carbs",
    description:
      "Regn ut daglig karbohydratinntak fra kroppsvekt og aktivitetsnivå, eller fra kalorier og prosentandel. Se også sportsdrikk med husholdningssukker.",
    category: "sport",
    tags: [
      "carbs",
      "carbs kalkulator",
      "karbohydrat",
      "karbohydratkalkulator",
      "karbo",
      "kosthold",
      "makro",
      "løping",
      "trening",
      "sportsdrikk",
    ],
    popular: true,
    fields: [
      {
        id: "metode",
        label: "Metode",
        type: "select",
        defaultValue: "vekt",
        options: [
          { value: "vekt", label: "Ut fra vekt og aktivitet (g/kg)" },
          { value: "kalorier", label: "Ut fra kalorier og prosent" },
        ],
      },
      {
        id: "kg",
        label: "Kroppsvekt",
        type: "number",
        unit: "kg",
        defaultValue: 75,
        hint: "Brukes ved g/kg-metoden.",
      },
      {
        id: "aktivitet",
        label: "Aktivitetsnivå / mål",
        type: "select",
        defaultValue: "moderat",
        options: [
          { value: "lav", label: "Lav aktivitet (ca. 3–5 g/kg)" },
          { value: "moderat", label: "Moderat trening (ca. 5–7 g/kg)" },
          { value: "hoy", label: "Høy utholdenhet (ca. 6–10 g/kg)" },
          { value: "svart_hoy", label: "Svært høy / konkurranse (ca. 8–12 g/kg)" },
          { value: "loading", label: "Karboloading før konkurranse (ca. 10–12 g/kg)" },
        ],
        hint: "Vanlige retningslinjer fra idrettsernæring. Individuelle behov varierer.",
      },
      {
        id: "kcal",
        label: "Kalorier per dag",
        type: "number",
        unit: "kcal",
        defaultValue: 2400,
        hint: "Brukes ved kalori-metoden.",
      },
      {
        id: "prosent",
        label: "Andel karbohydrat",
        type: "number",
        unit: "%",
        defaultValue: 50,
        hint: "Typisk 45–65 % av energi for mange. Brukes ved kalori-metoden.",
      },
    ],
    formula: "karbo (g) = vekt · g/kg     eller     karbo (g) = kcal · % / 4",
    explanation:
      "Ved trening brukes ofte gram karbohydrat per kilo kroppsvekt. Alternativt: karbohydrat gir 4 kcal per gram, så andel av dagskalorier omregnes til gram. Tallene er veiledende – ikke personlig kostholdsveiledning.",
    disclaimer:
      "Anslag for friske voksne. Sykdom, diabetes og spesielle dietter krever råd fra fagfolk.",
    faqs: [
      {
        question: "Hvor mange carbs trenger jeg per dag?",
        answer:
          "Det avhenger av vekt og hvor mye du trener. Lav aktivitet ligger ofte rundt 3–5 g/kg, mens hard utholdenhetstrening kan ligge på 6–10 g/kg eller mer.",
      },
      {
        question: "Hva er karboloading?",
        answer:
          "Økt karbohydratinntak (ofte ca. 10–12 g/kg) i 1–3 dager før en hard konkurranse for å fylle glykogenlagrene. Brukes mest før lange løp.",
      },
      {
        question: "Kan jeg lage sportsdrikk med vanlig sukker?",
        answer:
          "Ja. Bruk sportsdrikk-kalkulatoren for å finne hvor mange gram husholdningssukker du trenger per flaske ut fra treningstid og ønsket karbo per time.",
      },
    ],
    compute(input) {
      const ranges: Record<string, [number, number]> = {
        lav: [3, 5],
        moderat: [5, 7],
        hoy: [6, 10],
        svart_hoy: [8, 12],
        loading: [10, 12],
      };

      if (input.metode === "kalorier") {
        const kcal = num(input, "kcal");
        const prosent = num(input, "prosent");
        if (!allNumbers([kcal, prosent]) || kcal <= 0 || prosent <= 0 || prosent > 100) {
          return [];
        }
        const gram = (kcal * (prosent / 100)) / 4;
        const kg = num(input, "kg");
        const out = [
          result("gram", "Karbohydrat per dag", gram, {
            digits: 0,
            unit: "g",
            primary: true,
          }),
          result("kcal", "Fra karbohydrat", gram * 4, {
            digits: 0,
            unit: "kcal",
          }),
        ];
        if (Number.isFinite(kg) && kg > 0) {
          out.push(
            result("gpk", "Gram per kg", gram / kg, {
              digits: 1,
              unit: "g/kg",
            }),
          );
        }
        return out;
      }

      const kg = num(input, "kg");
      const [lo, hi] = ranges[input.aktivitet ?? "moderat"] ?? [5, 7];
      if (!Number.isFinite(kg) || kg <= 0) return [];
      const mid = ((lo + hi) / 2) * kg;
      const low = lo * kg;
      const high = hi * kg;
      return [
        result("mid", "Anslag midt i området", mid, {
          digits: 0,
          unit: "g",
          primary: true,
          hint: `${lo}–${hi} g/kg`,
        }),
        result(
          "omrade",
          "Anbefalt område",
          `${Math.round(low)}–${Math.round(high)} g`,
          { kind: "text" },
        ),
        result("gpk", "Per kg kroppsvekt", `${lo}–${hi}`, {
          kind: "text",
          unit: "g/kg",
        }),
        result("kcal", "Ca. kcal fra karbo (midt)", mid * 4, {
          digits: 0,
          unit: "kcal",
        }),
      ];
    },
  },
  {
    slug: "sportsdrikk-sukker",
    title: "Sportsdrikk med sukker",
    shortTitle: "Sportsdrikk",
    description:
      "Finn hvor mange gram vanlig husholdningssukker du trenger for å lage din egen sportsdrikk – ut fra treningstid, karbo per time og flaskestørrelse.",
    category: "sport",
    tags: [
      "sportsdrikk",
      "sukker",
      "husholdningssukker",
      "carbs",
      "karbohydrat",
      "løping",
      "sykling",
      "elektrolytter",
      "diy sportsdrikk",
    ],
    popular: true,
    fields: [
      {
        id: "timer",
        label: "Treningstid",
        type: "number",
        unit: "timer",
        defaultValue: 2,
        step: 0.25,
        hint: "F.eks. 1,5 for 90 minutter. Under ca. 1 time trengs ofte lite ekstra karbo.",
      },
      {
        id: "perTime",
        label: "Karbohydrat per time",
        type: "select",
        defaultValue: "60",
        options: [
          { value: "30", label: "30 g/t – lett / nybegynner" },
          { value: "45", label: "45 g/t – moderat" },
          { value: "60", label: "60 g/t – vanlig mål" },
          { value: "90", label: "90 g/t – hardt / vant mage" },
          { value: "egendefinert", label: "Egendefinert" },
        ],
      },
      {
        id: "egendefinert",
        label: "Egen mengde per time",
        type: "number",
        unit: "g/t",
        defaultValue: 60,
        hint: "Brukes når du velger egendefinert.",
      },
      {
        id: "volum",
        label: "Flaskevolum",
        type: "number",
        unit: "ml",
        defaultValue: 500,
      },
      {
        id: "flasker",
        label: "Antall flasker",
        type: "number",
        defaultValue: 2,
        hint: "Hvor mange like flasker du blander totalt for økta.",
      },
      {
        id: "salt",
        label: "Salt per liter (valgfritt)",
        type: "number",
        unit: "g",
        defaultValue: 1,
        hint: "Ca. 0,5–1,5 g salt per liter er vanlig i hjemmelaget sportsdrikk. Sett 0 for uten salt.",
      },
    ],
    formula: "sukker (g) = g/t · timer     % = sukker / liter · 100",
    explanation:
      "Vanlig hvitt sukker (sukrose) er karbohydrat. Mange hjemmelagede sportsdrikker sikter mot ca. 4–8 % løsning (40–80 g sukker per liter). Start lavt hvis magen er uvant. Litt salt kan erstatte natriuminnhold i kjøpt sportsdrikk.",
    disclaimer:
      "Veiledende for trening. Ved varme, lange konkurranser eller mageproblemer: test i trening først. Ikke medisinsk råd.",
    faqs: [
      {
        question: "Hvor mye sukker i 500 ml flaske?",
        answer:
          "Ved 60 g karbo per time og 2 timers økt med to 500 ml-flasker: 120 g totalt → 60 g sukker per flaske (ca. 5 ss).",
      },
      {
        question: "Hva er en god konsentrasjon?",
        answer:
          "Ofte 4–8 %. Over ca. 8–10 % kan enkelte få magebesvær. Da kan du bruke flere flasker eller blande tynnere.",
      },
    ],
    compute(input) {
      const timer = num(input, "timer");
      const volumMl = num(input, "volum");
      const flasker = num(input, "flasker");
      const saltPerL = num(input, "salt");
      let perTime = num(input, "perTime");
      if (input.perTime === "egendefinert") {
        perTime = num(input, "egendefinert");
      }
      if (
        !allNumbers([timer, perTime, volumMl, flasker]) ||
        timer <= 0 ||
        perTime < 0 ||
        volumMl <= 0 ||
        flasker <= 0
      ) {
        return [];
      }

      const totalSukker = perTime * timer;
      const perFlaske = totalSukker / flasker;
      const totalMl = volumMl * flasker;
      const totalLiter = totalMl / 1000;
      // Vekt/volum-prosent: gram per 100 ml (60 g/L = 6 %)
      const konsentrasjon = totalMl > 0 ? (totalSukker / totalMl) * 100 : Number.NaN;
      const ts = perFlaske / 4; // 1 ts ≈ 4 g
      const ss = perFlaske / 12; // 1 ss ≈ 12 g
      const saltTotalt = Number.isFinite(saltPerL)
        ? saltPerL * totalLiter
        : 0;
      const saltPerFlaske = saltTotalt / flasker;

      const out = [
        result("perFlaske", "Sukker per flaske", perFlaske, {
          digits: 0,
          unit: "g",
          primary: true,
          hint: `Ca. ${ss.toFixed(1)} ss eller ${ts.toFixed(0)} ts`,
        }),
        result("total", "Sukker totalt for økta", totalSukker, {
          digits: 0,
          unit: "g",
        }),
        result("pct", "Konsentrasjon", konsentrasjon, {
          kind: "percent",
          digits: 1,
          hint:
            konsentrasjon > 8
              ? "Litt høyt for mange – vurder mer væske eller lavere g/t"
              : konsentrasjon < 4 && totalSukker > 0
                ? "Tynn blanding – greit for magen, mindre karbo per slurk"
                : "Typisk målområde er ca. 4–8 %",
        }),
        result("perTimeVis", "Karbo per time", perTime, {
          digits: 0,
          unit: "g/t",
        }),
      ];

      if (saltTotalt > 0) {
        out.push(
          result("saltFlaske", "Salt per flaske", saltPerFlaske, {
            digits: 2,
            unit: "g",
          }),
          result("saltTotal", "Salt totalt", saltTotalt, {
            digits: 2,
            unit: "g",
          }),
        );
      }

      return out;
    },
  },
];
