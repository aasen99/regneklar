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
  {
    slug: "sovn",
    title: "Søvnkalkulator",
    shortTitle: "Søvn",
    description:
      "Finn når du bør legge deg eller stå opp, i 90-minutters søvnsykluser.",
    category: "hverdag",
    tags: ["søvn", "syklus", "legge seg"],
    popular: true,
    fields: [
      {
        id: "klokke",
        label: "Klokkeslett",
        type: "text",
        defaultValue: "07:00",
        placeholder: "07:00",
        hint: "Skriv 7:00 eller 07:00.",
      },
      {
        id: "retning",
        label: "Jeg vil",
        type: "select",
        defaultValue: "opp",
        options: [
          { value: "opp", label: "Stå opp da – når legge meg?" },
          { value: "sovne", label: "Legge meg da – når stå opp?" },
        ],
      },
      {
        id: "innsovning",
        label: "Minutter før du sovner",
        type: "number",
        unit: "min",
        defaultValue: 15,
      },
    ],
    formula: "tid = klokke ± (sykluser · 90 min + innsovning)",
    explanation:
      "En søvnsyklus er grovt 90 minutter. Å våkne mellom sykluser kjennes ofte lettere. Innsovning er ikke søvn, derfor trekkes den fra. Behovet varierer – 4–6 sykluser er vanlige forslag, ikke medisin.",
    compute(input) {
      const start = parseClock(input.klokke);
      const fall = num(input, "innsovning");
      if (start == null || !Number.isFinite(fall) || fall < 0) return [];
      const sign = input.retning === "sovne" ? 1 : -1;
      const out = [4, 5, 6].map((cycles) => {
        const mins = start + sign * (cycles * 90 + fall);
        return formatClock(mins);
      });
      return [
        result("s6", "6 sykluser (9 t)", out[2], { kind: "text", primary: true }),
        result("s5", "5 sykluser (7,5 t)", out[1], { kind: "text" }),
        result("s4", "4 sykluser (6 t)", out[0], { kind: "text" }),
      ];
    },
  },
  {
    slug: "ukenummer",
    title: "Ukenummer",
    description: "Finn ISO-ukenr og ukedag for en dato.",
    category: "hverdag",
    tags: ["uke", "dato", "kalender", "iso"],
    fields: [
      {
        id: "dato",
        label: "Dato",
        type: "date",
        defaultValue: "2026-08-25",
      },
    ],
    formula: "ISO 8601: uke 1 inneholder årets første torsdag",
    explanation:
      "Norge bruker ISO-uker: uken starter mandag, og uke 1 er den første uken med minst fire dager i det nye året. 31. desember kan derfor ligge i uke 1 neste år.",
    compute(input) {
      const d = parseDate(input.dato);
      if (!d) return [];
      const days = ["søndag", "mandag", "tirsdag", "onsdag", "torsdag", "fredag", "lørdag"];
      return [
        result("uke", "Ukenummer", isoWeek(d), {
          kind: "integer",
          primary: true,
        }),
        result("dag", "Ukedag", days[d.getDay()], { kind: "text" }),
        result("isoar", "ISO-år", isoWeekYear(d), { kind: "integer" }),
      ];
    },
  },
  {
    slug: "abonnement",
    title: "Abonnement: måned mot år",
    description: "Sammenlign månedspris og årspris og se hvor mye du sparer.",
    category: "hverdag",
    tags: ["abonnement", "pris", "år", "måned"],
    fields: [
      {
        id: "maaned",
        label: "Månedspris",
        type: "number",
        unit: "kr",
        defaultValue: 149,
      },
      {
        id: "aar",
        label: "Årspris",
        type: "number",
        unit: "kr",
        defaultValue: 1190,
      },
    ],
    formula: "årskostnad månedspris = 12 · M     sparing = 12M − A",
    explanation:
      "Årsavtale lønner seg når 12 ganger månedsprisen er høyere enn årsprisen. Husk bindingstid og om du faktisk bruker tjenesten et helt år.",
    compute(input) {
      const m = num(input, "maaned");
      const a = num(input, "aar");
      if (!allNumbers([m, a])) return [];
      const tolv = m * 12;
      const spar = tolv - a;
      return [
        result("spar", "Du sparer på år", spar, {
          kind: "currency",
          primary: true,
        }),
        result("tolv", "12 × månedspris", tolv, { kind: "currency" }),
        result("prosent", "Rabatt", tolv === 0 ? 0 : (spar / tolv) * 100, {
          kind: "percent",
          digits: 1,
        }),
      ];
    },
  },
  {
    slug: "feriedager",
    title: "Feriedager igjen",
    description: "Se hvor mange feriedager du har igjen etter det du har tatt ut.",
    category: "hverdag",
    tags: ["ferie", "dager", "arbeid"],
    fields: [
      {
        id: "krav",
        label: "Feriedager i år",
        type: "number",
        defaultValue: 25,
        hint: "Ferieloven gir 25 virkedager. Mange har 30 (fem uker + tre dager).",
      },
      {
        id: "brukt",
        label: "Tatt ut",
        type: "number",
        defaultValue: 10,
      },
      {
        id: "planlagt",
        label: "Planlagt fremover",
        type: "number",
        defaultValue: 5,
      },
    ],
    formula: "igjen = krav − brukt − planlagt",
    explanation:
      "Virkedager i ferieloven er mandag–lørdag. Mange arbeidsplasser teller mandag–fredag. Bruk det tallet avtalen din bruker.",
    compute(input) {
      const krav = num(input, "krav");
      const brukt = num(input, "brukt");
      const planlagt = num(input, "planlagt");
      if (!allNumbers([krav, brukt, planlagt])) return [];
      const igjen = krav - brukt - planlagt;
      return [
        result("igjen", "Igjen etter planlagt", igjen, {
          kind: "integer",
          unit: "dager",
          primary: true,
        }),
        result("naa", "Igjen nå", krav - brukt, {
          kind: "integer",
          unit: "dager",
        }),
      ];
    },
  },
];

function parseClock(value: string | undefined): number | null {
  if (!value) return null;
  const m = value.trim().match(/^(\d{1,2})[:.](\d{2})$/);
  if (!m) return null;
  const h = Number(m[1]);
  const min = Number(m[2]);
  if (h > 23 || min > 59) return null;
  return h * 60 + min;
}

function formatClock(mins: number): string {
  const day = 24 * 60;
  const n = ((Math.round(mins) % day) + day) % day;
  const h = Math.floor(n / 60);
  const min = n % 60;
  return `${h}:${String(min).padStart(2, "0")}`;
}

function isoWeek(date: Date): number {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
}

function isoWeekYear(date: Date): number {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  return d.getUTCFullYear();
}
