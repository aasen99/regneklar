import type { Calculator } from "../types";
import { addDays, daysBetween, formatDate, num, parseDate } from "../format";
import { allNumbers, result } from "../helpers";

export const hverdagCalculators: Calculator[] = [
  {
    slug: "stromkostnad",
    title: "Strømkostnad",
    shortTitle: "Strøm",
    description:
      "Regn ut strømkostnad fra forbruk, spotpris og eventuelle påslag og nettleie.",
    category: "hverdag",
    tags: ["strøm", "kwh", "energi"],
    popular: true,
    fields: [
      {
        id: "kwh",
        label: "Forbruk",
        type: "number",
        unit: "kWh",
        defaultValue: 250,
      },
      {
        id: "pris",
        label: "Strømpris",
        type: "number",
        unit: "kr/kWh",
        defaultValue: 1.2,
        step: 0.01,
      },
      {
        id: "paslag",
        label: "Påslag / nettleie (energi)",
        type: "number",
        unit: "kr/kWh",
        defaultValue: 0.45,
        step: 0.01,
      },
      {
        id: "fast",
        label: "Fastbeløp i perioden",
        type: "number",
        unit: "kr",
        defaultValue: 400,
      },
    ],
    formula: "kostnad = kWh · (spot + påslag) + fastbeløp",
    explanation:
      "Strømregningen består ofte av kraftpris, påslag, nettleie og avgifter. Fyll inn det du kjenner – resten kan settes til 0.",
    compute(input) {
      const kwh = num(input, "kwh");
      const pris = num(input, "pris");
      const paslag = num(input, "paslag");
      const fast = num(input, "fast");
      if (!allNumbers([kwh, pris, paslag, fast])) return [];
      const energi = kwh * (pris + paslag);
      return [
        result("total", "Totalt", energi + fast, {
          kind: "currency",
          digits: 0,
          primary: true,
        }),
        result("energi", "Energiledd", energi, { kind: "currency", digits: 0 }),
        result("snitt", "Snittpris per kWh", (energi + fast) / kwh, {
          kind: "currency",
          digits: 2,
        }),
      ];
    },
  },
  {
    slug: "drivstoff",
    title: "Drivstoffkostnad",
    description: "Regn ut bensin- eller dieselkostnad ut fra distanse og forbruk.",
    category: "hverdag",
    tags: ["bensin", "diesel", "forbruk", "kjøring"],
    popular: true,
    fields: [
      {
        id: "km",
        label: "Distanse",
        type: "number",
        unit: "km",
        defaultValue: 250,
      },
      {
        id: "forbruk",
        label: "Forbruk",
        type: "number",
        unit: "l/100 km",
        defaultValue: 6.5,
        hint: "Elbil: bruk kWh/100 km og strømpris i neste felt.",
      },
      {
        id: "pris",
        label: "Pris per liter (eller kWh)",
        type: "number",
        unit: "kr",
        defaultValue: 20.5,
        step: 0.1,
      },
    ],
    formula: "kostnad = (km / 100) · forbruk · pris",
    explanation:
      "Forbruk oppgis vanligvis som liter per mil (l/10 km) eller l/100 km. Her brukes l/100 km. 0,65 l/mil = 6,5 l/100 km.",
    compute(input) {
      const km = num(input, "km");
      const forbruk = num(input, "forbruk");
      const pris = num(input, "pris");
      if (!allNumbers([km, forbruk, pris])) return [];
      const liter = (km / 100) * forbruk;
      return [
        result("kost", "Kostnad", liter * pris, {
          kind: "currency",
          digits: 0,
          primary: true,
        }),
        result("mengde", "Drivstoff", liter, { digits: 2, unit: "liter" }),
        result("perkm", "Per km", (liter * pris) / km, {
          kind: "currency",
          digits: 2,
        }),
      ];
    },
  },
  {
    slug: "reisetid",
    title: "Reisetid og gjennomsnittsfart",
    description: "Finn tid, distanse eller fart når du kjenner de to andre.",
    category: "hverdag",
    tags: ["reise", "fart", "tid"],
    fields: [
      {
        id: "km",
        label: "Distanse (km)",
        type: "number",
        defaultValue: 180,
        hint: "La stå tom for å finne distanse.",
      },
      {
        id: "kmh",
        label: "Fart (km/t)",
        type: "number",
        defaultValue: 90,
        hint: "La stå tom for å finne fart.",
      },
      {
        id: "timer",
        label: "Tid (timer)",
        type: "number",
        hint: "La stå tom for å finne tid. Bruk desimal, f.eks. 1,5.",
      },
    ],
    formula: "strekning = fart · tid",
    explanation:
      "Oppgi to av tre størrelser. Tid i timer: 1 time og 15 minutter skrives 1,25.",
    compute(input) {
      const km = num(input, "km");
      const kmh = num(input, "kmh");
      const timer = num(input, "timer");
      const filled = [km, kmh, timer].filter(Number.isFinite).length;
      if (filled !== 2) {
        return [
          result("hint", "Fyll inn", "Oppgi nøyaktig to felt.", {
            kind: "text",
            primary: true,
          }),
        ];
      }
      if (Number.isFinite(km) && Number.isFinite(kmh) && kmh !== 0) {
        const t = km / kmh;
        return [
          result("tid", "Tid", t, { digits: 2, unit: "timer", primary: true }),
          result("min", "Minutter", t * 60, { digits: 0, unit: "min" }),
        ];
      }
      if (Number.isFinite(km) && Number.isFinite(timer) && timer !== 0) {
        return [
          result("fart", "Gjennomsnittsfart", km / timer, {
            digits: 1,
            unit: "km/t",
            primary: true,
          }),
        ];
      }
      if (Number.isFinite(kmh) && Number.isFinite(timer)) {
        return [
          result("dist", "Distanse", kmh * timer, {
            digits: 1,
            unit: "km",
            primary: true,
          }),
        ];
      }
      return [];
    },
  },
  {
    slug: "alder",
    title: "Alder",
    description: "Regn ut nøyaktig alder i år, måneder og dager fra fødselsdato.",
    category: "hverdag",
    tags: ["alder", "bursdag", "dato"],
    fields: [
      {
        id: "fodt",
        label: "Fødselsdato",
        type: "date",
        defaultValue: "1994-06-12",
      },
      {
        id: "paa",
        label: "Alder per dato",
        type: "date",
        hint: "Tom = i dag",
      },
    ],
    formula: "alder = referansedato − fødselsdato",
    explanation:
      "År telles som hele år. Resten vises som måneder og dager.",
    compute(input) {
      const fodt = parseDate(input.fodt);
      if (!fodt) return [];
      const paa = parseDate(input.paa) ?? new Date();
      if (paa < fodt) {
        return [
          result("feil", "Ugyldig", "Referansedato er før fødselsdato.", {
            kind: "text",
            primary: true,
          }),
        ];
      }
      let years = paa.getFullYear() - fodt.getFullYear();
      let months = paa.getMonth() - fodt.getMonth();
      let days = paa.getDate() - fodt.getDate();
      if (days < 0) {
        months -= 1;
        const prev = new Date(paa.getFullYear(), paa.getMonth(), 0).getDate();
        days += prev;
      }
      if (months < 0) {
        years -= 1;
        months += 12;
      }
      const totalDays = daysBetween(fodt, paa);
      return [
        result(
          "alder",
          "Alder",
          `${years} år, ${months} md. og ${days} dager`,
          { kind: "text", primary: true },
        ),
        result("dager", "Totalt antall dager", totalDays, { kind: "integer" }),
      ];
    },
  },
  {
    slug: "dager-mellom",
    title: "Dager mellom to datoer",
    description: "Finn antall dager, uker og måneder mellom to datoer.",
    category: "hverdag",
    tags: ["dato", "dager", "periode"],
    fields: [
      { id: "fra", label: "Fra dato", type: "date", defaultValue: "2026-01-01" },
      { id: "til", label: "Til dato", type: "date", defaultValue: "2026-08-24" },
    ],
    formula: "dager = dato₂ − dato₁",
    explanation: "Begge datoer telles i hele døgn. Tidspunkt på døgnet ignoreres.",
    compute(input) {
      const fra = parseDate(input.fra);
      const til = parseDate(input.til);
      if (!fra || !til) return [];
      const dager = daysBetween(fra, til);
      return [
        result("dager", "Dager", Math.abs(dager), {
          kind: "integer",
          primary: true,
        }),
        result("uker", "Uker", Math.abs(dager) / 7, { digits: 2 }),
        result("retning", "Retning", dager >= 0 ? "Fremover" : "Bakover", {
          kind: "text",
        }),
      ];
    },
  },
  {
    slug: "dato-pluss",
    title: "Dato pluss dager",
    description: "Legg til eller trekk fra et antall dager på en dato.",
    category: "hverdag",
    tags: ["dato", "frist", "kalender"],
    fields: [
      { id: "dato", label: "Startdato", type: "date", defaultValue: "2026-08-24" },
      { id: "dager", label: "Dager (+/−)", type: "number", defaultValue: 14 },
    ],
    formula: "ny dato = dato + n dager",
    explanation: "Negativt tall går bakover i tid. Nyttig til frister og varsling.",
    compute(input) {
      const dato = parseDate(input.dato);
      const dager = num(input, "dager");
      if (!dato || !Number.isFinite(dager)) return [];
      const neste = addDays(dato, dager);
      const ukedag = new Intl.DateTimeFormat("nb-NO", { weekday: "long" }).format(
        neste,
      );
      return [
        result("ny", "Ny dato", formatDate(neste), {
          kind: "text",
          primary: true,
        }),
        result("uke", "Ukedag", ukedag, { kind: "text" }),
      ];
    },
  },
  {
    slug: "nedlasting",
    title: "Nedlastingstid",
    description: "Estimer hvor lang tid en fil tar å laste ned.",
    category: "hverdag",
    tags: ["internett", "hastighet", "fil"],
    fields: [
      {
        id: "storrelse",
        label: "Filstørrelse",
        type: "number",
        defaultValue: 5,
      },
      {
        id: "enhet",
        label: "Enhet",
        type: "select",
        defaultValue: "gb",
        options: [
          { value: "mb", label: "MB" },
          { value: "gb", label: "GB" },
        ],
      },
      {
        id: "fart",
        label: "Hastighet",
        type: "number",
        defaultValue: 100,
      },
      {
        id: "fartenhet",
        label: "Hastighetsenhet",
        type: "select",
        defaultValue: "mbps",
        options: [
          { value: "mbps", label: "Mbit/s" },
          { value: "mbs", label: "MB/s" },
        ],
      },
    ],
    formula: "tid = filstørrelse / hastighet",
    explanation:
      "Internettleverandører oppgir ofte Mbit/s. 100 Mbit/s er 12,5 MB/s (delt på 8).",
    compute(input) {
      const storrelse = num(input, "storrelse");
      const fart = num(input, "fart");
      if (!allNumbers([storrelse, fart]) || fart <= 0) return [];
      const bytes = storrelse * (input.enhet === "gb" ? 1e9 : 1e6);
      const bytesPerSec =
        input.fartenhet === "mbs" ? fart * 1e6 : (fart * 1e6) / 8;
      const sek = bytes / bytesPerSec;
      return [
        result("tid", "Tid", sek / 60, {
          digits: 2,
          unit: "minutter",
          primary: true,
        }),
        result("sek", "Sekunder", sek, { digits: 0, unit: "s" }),
      ];
    },
  },
  {
    slug: "arbeidstid",
    title: "Timer til dagsverk",
    description: "Regn om arbeidstimer til dager, uker og årsverk.",
    category: "hverdag",
    tags: ["arbeid", "timer", "prosjekt"],
    fields: [
      {
        id: "timer",
        label: "Timer",
        type: "number",
        defaultValue: 120,
      },
      {
        id: "perdag",
        label: "Timer per dag",
        type: "number",
        defaultValue: 7.5,
      },
    ],
    formula: "dager = timer / timer per dag",
    explanation:
      "Et vanlig dagsverk i Norge er 7,5 timer. Årsverk settes her til 1950 timer (37,5 t · 52 uker).",
    compute(input) {
      const timer = num(input, "timer");
      const perdag = num(input, "perdag");
      if (!allNumbers([timer, perdag]) || perdag <= 0) return [];
      return [
        result("dager", "Dagsverk", timer / perdag, {
          digits: 2,
          primary: true,
        }),
        result("uker", "Uker (5 dager)", timer / (perdag * 5), { digits: 2 }),
        result("aarsverk", "Andel årsverk (1950 t)", timer / 1950, {
          digits: 3,
        }),
      ];
    },
  },
];
