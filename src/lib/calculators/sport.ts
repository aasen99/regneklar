import type { Calculator, ResultItem } from "../types";
import {
  formatHms,
  formatPace,
  num,
  parseNumber,
  parsePaceMinutes,
  parseRaceSeconds,
} from "../format";
import { allNumbers, result } from "../helpers";

function secondsPerKm(minPerKm: number): number {
  return minPerKm * 60;
}

function kmhFromPace(minPerKm: number): number {
  return 60 / minPerKm;
}

function timeForMeters(minPerKm: number, meters: number): number {
  return secondsPerKm(minPerKm) * (meters / 1000);
}

function paceBundle(minPerKm: number): ResultItem[] {
  const kmh = kmhFromPace(minPerKm);
  return [
    result("tempo", "Tempo", `${formatPace(minPerKm)} /km`, {
      kind: "text",
      primary: true,
    }),
    result("kmh", "Fart", kmh, { digits: 2, unit: "km/t" }),
    result("ms", "Meter per sekund", kmh / 3.6, { digits: 2, unit: "m/s" }),
    result("mile", "Tempo per engelsk mil", `${formatPace(minPerKm * 1.609344)} /mi`, {
      kind: "text",
    }),
    result("r400", "400 m-runde", formatHms(timeForMeters(minPerKm, 400)), {
      kind: "text",
    }),
    result("r100", "100 m", formatHms(timeForMeters(minPerKm, 100)), {
      kind: "text",
    }),
    result("r200", "200 m", formatHms(timeForMeters(minPerKm, 200)), {
      kind: "text",
    }),
    result("r800", "800 m", formatHms(timeForMeters(minPerKm, 800)), {
      kind: "text",
    }),
    result("k5", "5 km", formatHms(timeForMeters(minPerKm, 5000)), {
      kind: "text",
    }),
    result("k10", "10 km", formatHms(timeForMeters(minPerKm, 10000)), {
      kind: "text",
    }),
    result("halv", "Halvmaraton (21,1 km)", formatHms(timeForMeters(minPerKm, 21097.5)), {
      kind: "text",
    }),
    result("hel", "Maraton (42,2 km)", formatHms(timeForMeters(minPerKm, 42195)), {
      kind: "text",
    }),
  ];
}

function readPace(input: Record<string, string>): number | null {
  const mode = input.utgangspunkt ?? "kmh";
  if (mode === "tempo") {
    const pace = parsePaceMinutes(input.verdi);
    return pace != null && pace > 0 ? pace : null;
  }
  if (mode === "tid") {
    const km = num(input, "distanse");
    const sec = parseRaceSeconds(input.tid);
    if (!Number.isFinite(km) || km <= 0 || sec == null || sec <= 0) return null;
    return sec / 60 / km;
  }
  const kmh = parseNumber(input.verdi);
  if (kmh == null || kmh <= 0) return null;
  return 60 / kmh;
}

const distances = [
  { value: "1", label: "1 km" },
  { value: "1.5", label: "1500 m" },
  { value: "3", label: "3 km" },
  { value: "5", label: "5 km" },
  { value: "10", label: "10 km" },
  { value: "21.0975", label: "Halvmaraton" },
  { value: "42.195", label: "Maraton" },
  { value: "custom", label: "Egen distanse" },
];

export const sportCalculators: Calculator[] = [
  {
    slug: "km-t-min-km",
    title: "Km/t til min/km",
    shortTitle: "Tempo",
    description:
      "Regn om mellom kilometer i timen og minutter per kilometer – plus 400 m-runde, mil og vanlige løpsdistanser.",
    category: "sport",
    tags: [
      "løping",
      "tempo",
      "km/t",
      "min/km",
      "pace",
      "fart",
      "400m",
    ],
    popular: true,
    fields: [
      {
        id: "utgangspunkt",
        label: "Jeg har",
        type: "select",
        defaultValue: "kmh",
        options: [
          { value: "kmh", label: "Kilometer i timen (km/t)" },
          { value: "tempo", label: "Tempo (min/km)" },
        ],
      },
      {
        id: "verdi",
        label: "Verdi",
        type: "text",
        defaultValue: "12",
        hint: "Km/t som 12 eller 12,5. Tempo som 5:00 eller 4:45.",
      },
    ],
    formula: "min/km = 60 / km/t     km/t = 60 / min/km",
    explanation:
      "Tempo er tiden du bruker på én kilometer. 12 km/t er nøyaktig 5:00 /km, fordi 60 ÷ 12 = 5. 400 m på bane er 0,4 km, så rundetiden er tempo × 0,4.",
    compute(input) {
      const pace = readPace(input);
      if (pace == null) return [];
      return paceBundle(pace);
    },
  },
  {
    slug: "rundetid-400m",
    title: "Rundetid 400 m",
    shortTitle: "400 m",
    description:
      "Finn rundetid på 400 m-bane fra tempo, km/t eller sluttid. Viser også 100 m, 200 m og hvor mange runder distansen er.",
    category: "sport",
    tags: ["400m", "bane", "runde", "løping", "friidrett", "lap"],
    popular: true,
    fields: [
      {
        id: "utgangspunkt",
        label: "Jeg har",
        type: "select",
        defaultValue: "tempo",
        options: [
          { value: "tempo", label: "Tempo (min/km)" },
          { value: "kmh", label: "Fart (km/t)" },
          { value: "tid", label: "Sluttid på en distanse" },
        ],
      },
      {
        id: "verdi",
        label: "Tempo eller km/t",
        type: "text",
        defaultValue: "4:00",
        hint: "Brukes når du har valgt tempo eller km/t. Tempo: 4:00. Fart: 15.",
      },
      {
        id: "distanse",
        label: "Distanse",
        type: "number",
        unit: "km",
        defaultValue: 5,
        hint: "Brukes sammen med sluttid, og til antall runder.",
      },
      {
        id: "tid",
        label: "Sluttid",
        type: "text",
        defaultValue: "20:00",
        hint: "F.eks. 20:00 eller 1:23:45. Brukes når du har valgt sluttid.",
      },
      {
        id: "bane",
        label: "Banelengde",
        type: "select",
        defaultValue: "400",
        options: [
          { value: "400", label: "400 m (utendørs)" },
          { value: "200", label: "200 m (innendørs)" },
          { value: "300", label: "300 m" },
        ],
      },
    ],
    formula: "rundetid = tempo · (banelengde / 1000 km)",
    explanation:
      "En standard løpebane er 400 m i innerste felt. 5 km er 12,5 runder: 12 hele 400 m og en oppløpsside på 200 m. Innendørsbaner er ofte 200 m.",
    compute(input) {
      const pace = readPace(input);
      if (pace == null) return [];
      const track = Number(input.bane) || 400;
      const km = num(input, "distanse");
      const meters = Number.isFinite(km) && km > 0 ? km * 1000 : 5000;
      const laps = meters / track;
      const full = Math.floor(laps);
      const rest = Math.round((laps - full) * track);
      return [
        result(
          "runde",
          `${track} m-runde`,
          formatHms(timeForMeters(pace, track)),
          { kind: "text", primary: true },
        ),
        result("r100", "100 m", formatHms(timeForMeters(pace, 100)), {
          kind: "text",
        }),
        result("r200", "200 m", formatHms(timeForMeters(pace, 200)), {
          kind: "text",
        }),
        result("r800", "800 m (to runder)", formatHms(timeForMeters(pace, 800)), {
          kind: "text",
        }),
        result("r1000", "1000 m", formatHms(timeForMeters(pace, 1000)), {
          kind: "text",
        }),
        result(
          "laps",
          `Runder på ${formatNumberNb(meters / 1000)} km`,
          rest === 0
            ? `${full} hele runder`
            : `${full} runder + ${rest} m`,
          { kind: "text" },
        ),
        result("tempo", "Tempo", `${formatPace(pace)} /km`, { kind: "text" }),
        result("kmh", "Fart", kmhFromPace(pace), { digits: 2, unit: "km/t" }),
      ];
    },
  },
  {
    slug: "maltempo",
    title: "Måltempo fra sluttid",
    shortTitle: "Måltempo",
    description:
      "Hvilket tempo per kilometer trenger du for å løpe en distanse på en gitt sluttid?",
    category: "sport",
    tags: ["løping", "tempo", "mål", "5km", "10km", "maraton"],
    popular: true,
    fields: [
      {
        id: "distansevalg",
        label: "Distanse",
        type: "select",
        defaultValue: "10",
        options: distances,
      },
      {
        id: "egendistanse",
        label: "Egen distanse",
        type: "number",
        unit: "km",
        defaultValue: 8,
        hint: "Brukes når du velger egen distanse.",
      },
      {
        id: "tid",
        label: "Ønsket sluttid",
        type: "text",
        defaultValue: "50:00",
        hint: "F.eks. 22:30, 50:00 eller 1:45:00.",
      },
    ],
    formula: "tempo = sluttid / distanse",
    explanation:
      "Del sluttiden på antall kilometer. Et 10 km-løp på 50 minutter krever 5:00 /km, som er 12 km/t. Hold jevnt tempo, eller se negativ split for å planlegge en raskere andrehalvdel.",
    compute(input) {
      const km = resolveDistance(input);
      const sec = parseRaceSeconds(input.tid);
      if (km == null || km <= 0 || sec == null || sec <= 0) return [];
      const pace = sec / 60 / km;
      return [
        result("tempo", "Nødvendig tempo", `${formatPace(pace)} /km`, {
          kind: "text",
          primary: true,
        }),
        result("kmh", "Fart", kmhFromPace(pace), { digits: 2, unit: "km/t" }),
        result("r400", "400 m-runde", formatHms(timeForMeters(pace, 400)), {
          kind: "text",
        }),
        result("halv", "Halvveis", formatHms(sec / 2), { kind: "text" }),
      ];
    },
  },
  {
    slug: "sluttid-loping",
    title: "Sluttid fra tempo",
    shortTitle: "Sluttid",
    description:
      "Regn ut sluttid når du kjenner tempo eller km/t og distansen du skal løpe.",
    category: "sport",
    tags: ["løping", "sluttid", "tempo", "prediksjon"],
    fields: [
      {
        id: "utgangspunkt",
        label: "Tempo som",
        type: "select",
        defaultValue: "tempo",
        options: [
          { value: "tempo", label: "min/km" },
          { value: "kmh", label: "km/t" },
        ],
      },
      {
        id: "verdi",
        label: "Tempo eller fart",
        type: "text",
        defaultValue: "5:30",
      },
      {
        id: "distansevalg",
        label: "Distanse",
        type: "select",
        defaultValue: "10",
        options: distances,
      },
      {
        id: "egendistanse",
        label: "Egen distanse",
        type: "number",
        unit: "km",
        defaultValue: 8,
      },
    ],
    formula: "sluttid = tempo · distanse",
    explanation:
      "Et jevnt tempo på 5:30 /km på 10 km gir 55 minutter. I konkurranse går det ofte noen sekunder raskere eller saktere per kilometer – bruk splitkalkulatoren for å planlegge.",
    compute(input) {
      const pace = readPace(input);
      const km = resolveDistance(input);
      if (pace == null || km == null || km <= 0) return [];
      const sec = secondsPerKm(pace) * km;
      return [
        result("tid", "Sluttid", formatHms(sec), { kind: "text", primary: true }),
        result("tempo", "Tempo", `${formatPace(pace)} /km`, { kind: "text" }),
        result("kmh", "Fart", kmhFromPace(pace), { digits: 2, unit: "km/t" }),
        result("r400", "400 m-runde", formatHms(timeForMeters(pace, 400)), {
          kind: "text",
        }),
      ];
    },
  },
  {
    slug: "split-tider",
    title: "Split-tider",
    description:
      "Jevne kilometer- og 400 m-splittider mot en mål-sluttid. For 5 km, 10 km, halv og maraton.",
    category: "sport",
    tags: ["split", "mellomtid", "løping", "maraton", "5km"],
    fields: [
      {
        id: "distansevalg",
        label: "Distanse",
        type: "select",
        defaultValue: "10",
        options: distances,
      },
      {
        id: "egendistanse",
        label: "Egen distanse",
        type: "number",
        unit: "km",
        defaultValue: 8,
      },
      {
        id: "tid",
        label: "Mål-sluttid",
        type: "text",
        defaultValue: "50:00",
      },
    ],
    formula: "tid ved d km = sluttid · (d / total)",
    explanation:
      "Jevn split betyr samme tempo hele veien. Mange løper første halvdel litt roligere (negativ split). Her er alle mellomtider jevnt fordelt.",
    compute(input) {
      const km = resolveDistance(input);
      const sec = parseRaceSeconds(input.tid);
      if (km == null || km <= 0 || sec == null || sec <= 0) return [];
      const pace = sec / 60 / km;
      const rows: ResultItem[] = [
        result("tempo", "Jevnt tempo", `${formatPace(pace)} /km`, {
          kind: "text",
          primary: true,
        }),
        result("r400", "Hver 400 m", formatHms(timeForMeters(pace, 400)), {
          kind: "text",
        }),
      ];
      const marks =
        km <= 10
          ? Array.from({ length: Math.floor(km) }, (_, i) => i + 1)
          : [5, 10, 15, 20, km / 2, 25, 30, 35, 40].filter(
              (d) => d > 0 && d < km - 0.05,
            );
      const unique = [...new Set(marks.map((d) => Math.round(d * 1000) / 1000))];
      for (const d of unique) {
        rows.push(
          result(
            `s${d}`,
            `${formatNumberNb(d)} km`,
            formatHms(sec * (d / km)),
            { kind: "text" },
          ),
        );
      }
      rows.push(
        result("finish", "Mål", formatHms(sec), { kind: "text" }),
      );
      return rows;
    },
  },
  {
    slug: "banerunder",
    title: "Banerunder",
    description:
      "Hvor mange 400 m-runder er 5 km, 10 km eller en valgfri distanse – og hva blir restmeterne?",
    category: "sport",
    tags: ["bane", "400m", "runder", "løping"],
    fields: [
      {
        id: "meter",
        label: "Distanse",
        type: "number",
        unit: "m",
        defaultValue: 5000,
      },
      {
        id: "bane",
        label: "Banelengde",
        type: "select",
        defaultValue: "400",
        options: [
          { value: "400", label: "400 m" },
          { value: "200", label: "200 m" },
          { value: "300", label: "300 m" },
        ],
      },
    ],
    formula: "runder = distanse / banelengde",
    explanation:
      "5 000 m på 400 m-bane er 12,5 runder. Du starter ofte ved 200 m-merket for at målet skal bli i måloppløpet. 10 000 m er 25 runder.",
    compute(input) {
      const meters = num(input, "meter");
      const track = Number(input.bane) || 400;
      if (!allNumbers([meters]) || meters <= 0 || track <= 0) return [];
      const laps = meters / track;
      const full = Math.floor(laps + 1e-9);
      const rest = Math.round(meters - full * track);
      return [
        result(
          "laps",
          "Runder",
          rest === 0 ? `${full}` : `${full} + ${rest} m`,
          { kind: "text", primary: true },
        ),
        result("desimal", "Som desimaltall", laps, { digits: 2 }),
        result("km", "Distanse", meters / 1000, { digits: 3, unit: "km" }),
      ];
    },
  },
  {
    slug: "predikert-lopsid",
    title: "Predikert løpstid",
    description:
      "Estimer tid på en ny distanse ut fra et løp du allerede har løpt (Riegels formel).",
    category: "sport",
    tags: ["prediksjon", "riegel", "løping", "maraton", "5km"],
    fields: [
      {
        id: "kjent",
        label: "Kjent distanse",
        type: "number",
        unit: "km",
        defaultValue: 5,
      },
      {
        id: "tid",
        label: "Tid på kjent distanse",
        type: "text",
        defaultValue: "22:00",
      },
      {
        id: "mal",
        label: "Ny distanse",
        type: "number",
        unit: "km",
        defaultValue: 10,
      },
    ],
    formula: "T₂ = T₁ · (D₂ / D₁)^1,06",
    explanation:
      "Pete Riegels formel er et grovt anslag når form og løype er like. Eksponenten 1,06 betyr at lengre distanser går saktere enn ren proporsjon. Den treffer dårligere hvis du ikke har trent på den nye distansen.",
    disclaimer: "Et estimat, ikke et løfte. Form, vær og løype avgjør mer.",
    compute(input) {
      const d1 = num(input, "kjent");
      const d2 = num(input, "mal");
      const t1 = parseRaceSeconds(input.tid);
      if (!allNumbers([d1, d2]) || d1 <= 0 || d2 <= 0 || t1 == null || t1 <= 0)
        return [];
      const t2 = t1 * (d2 / d1) ** 1.06;
      const pace = t2 / 60 / d2;
      return [
        result("tid", "Estimert sluttid", formatHms(t2), {
          kind: "text",
          primary: true,
        }),
        result("tempo", "Estimert tempo", `${formatPace(pace)} /km`, {
          kind: "text",
        }),
        result("kmh", "Fart", kmhFromPace(pace), { digits: 2, unit: "km/t" }),
      ];
    },
  },
  {
    slug: "treningstempo",
    title: "Treningstempo fra 5 km",
    description:
      "Få rolig tur, terskel, intervall og repetisjon ut fra 5 km-tiden din.",
    category: "sport",
    tags: ["trening", "terskel", "intervall", "løping", "5km"],
    fields: [
      {
        id: "tid",
        label: "5 km-tid",
        type: "text",
        defaultValue: "22:30",
        hint: "Nylig konkurranse eller testløp.",
      },
    ],
    formula:
      "rolig ≈ 1,30 · T₅     terskel ≈ 1,07 · T₅     intervall ≈ 0,97 · T₅",
    explanation:
      "T₅ er 5 km-tempo per kilometer. Rolig tur skal kjennes pratbar. Terskel er «komfortabelt anstrengende». Intervall ligger nær 5 km-fart, repetisjoner litt raskere. Dette er tommelfingerregler, ikke Jack Daniels’ fulle VDOT-tabell.",
    compute(input) {
      const t = parseRaceSeconds(input.tid);
      if (t == null || t <= 0) return [];
      const t5 = t / 60 / 5;
      const rows = [
        ["rolig", "Rolig tur", t5 * 1.3],
        ["maraton", "Maratontempo", t5 * 1.15],
        ["terskel", "Terskel / tempoøkt", t5 * 1.07],
        ["fem", "5 km-tempo", t5],
        ["intervall", "Intervall", t5 * 0.97],
        ["rep", "Repetisjoner (200–400 m)", t5 * 0.92],
      ] as const;
      return rows.map(([id, label, pace], i) =>
        result(id, label, `${formatPace(pace)} /km · ${formatHms(timeForMeters(pace, 400))} /400 m`, {
          kind: "text",
          primary: i === 0,
        }),
      );
    },
  },
  {
    slug: "intervallokt",
    title: "Intervalløkt",
    description:
      "Regn ut dragtid, pause og total tid for en intervalløkt på bane eller vei.",
    category: "sport",
    tags: ["intervall", "bane", "trening", "400m"],
    fields: [
      {
        id: "drag",
        label: "Draglengde",
        type: "number",
        unit: "m",
        defaultValue: 400,
      },
      {
        id: "antall",
        label: "Antall drag",
        type: "number",
        defaultValue: 8,
      },
      {
        id: "verdi",
        label: "Tempo på dragene",
        type: "text",
        defaultValue: "4:00",
        hint: "min/km, f.eks. 4:00.",
      },
      {
        id: "pause",
        label: "Pause mellom drag",
        type: "number",
        unit: "s",
        defaultValue: 90,
      },
    ],
    formula: "dragtid = tempo · (meter / 1000)     total = n · drag + (n−1) · pause",
    explanation:
      "Åtte ganger 400 m på 4:00 /km er 1:36 per drag. Med 90 s pause blir økta omtrent 12:48 i løping pluss 10:30 pause.",
    compute(input) {
      const meters = num(input, "drag");
      const n = num(input, "antall");
      const pause = num(input, "pause");
      const pace = parsePaceMinutes(input.verdi);
      if (
        !allNumbers([meters, n, pause]) ||
        meters <= 0 ||
        n <= 0 ||
        pace == null ||
        pace <= 0
      )
        return [];
      const work = timeForMeters(pace, meters);
      const totalWork = work * n;
      const totalRest = pause * Math.max(0, n - 1);
      return [
        result("dragtid", "Tid per drag", formatHms(work), {
          kind: "text",
          primary: true,
        }),
        result("loping", "Tid i løping", formatHms(totalWork), { kind: "text" }),
        result("okt", "Økttid inkl. pause", formatHms(totalWork + totalRest), {
          kind: "text",
        }),
        result("dist", "Løpt distanse", (meters * n) / 1000, {
          digits: 2,
          unit: "km",
        }),
        result("r400", "Tilsvarer 400 m", formatHms(timeForMeters(pace, 400)), {
          kind: "text",
        }),
      ];
    },
  },
  {
    slug: "negativ-split",
    title: "Negativ split",
    description:
      "Planlegg en raskere andrehalvdel: første og andre halvdel får hvert sitt tempo.",
    category: "sport",
    tags: ["split", "negativ split", "løping", "taktikk"],
    fields: [
      {
        id: "distanse",
        label: "Distanse",
        type: "number",
        unit: "km",
        defaultValue: 10,
      },
      {
        id: "tid",
        label: "Mål-sluttid",
        type: "text",
        defaultValue: "50:00",
      },
      {
        id: "delta",
        label: "Andre halvdel raskere med",
        type: "number",
        unit: "s",
        defaultValue: 30,
        hint: "30 s betyr at andre halvdel er 30 sekunder raskere enn første.",
      },
    ],
    formula: "1. halv = (T + δ) / 2     2. halv = (T − δ) / 2",
    explanation:
      "Negativ split er vanlig i godt løpte konkurranser: du starter kontrollert og øker. 30 sekunder på 10 km merkes, men er overkommelig.",
    compute(input) {
      const km = num(input, "distanse");
      const t = parseRaceSeconds(input.tid);
      const delta = num(input, "delta");
      if (!allNumbers([km, delta]) || km <= 0 || t == null || t <= 0) return [];
      if (delta >= t) {
        return [
          result("feil", "Ugyldig", "Forskjellen er større enn sluttiden.", {
            kind: "text",
            primary: true,
          }),
        ];
      }
      const first = (t + delta) / 2;
      const second = (t - delta) / 2;
      const halfKm = km / 2;
      const p1 = first / 60 / halfKm;
      const p2 = second / 60 / halfKm;
      return [
        result("forste", "Første halvdel", `${formatHms(first)} · ${formatPace(p1)} /km`, {
          kind: "text",
          primary: true,
        }),
        result("andre", "Andre halvdel", `${formatHms(second)} · ${formatPace(p2)} /km`, {
          kind: "text",
        }),
        result("snitt", "Snitt-tempo", `${formatPace(t / 60 / km)} /km`, {
          kind: "text",
        }),
      ];
    },
  },
  {
    slug: "kalorier-loping",
    title: "Kalorier løping",
    description:
      "Et grovt anslag på kaloriforbruk ut fra kroppsvekt og løpt distanse.",
    category: "sport",
    tags: ["kalorier", "løping", "forbruk"],
    fields: [
      {
        id: "kg",
        label: "Kroppsvekt",
        type: "number",
        unit: "kg",
        defaultValue: 75,
      },
      {
        id: "km",
        label: "Distanse",
        type: "number",
        unit: "km",
        defaultValue: 10,
      },
    ],
    formula: "kcal ≈ 1,036 · kg · km",
    explanation:
      "Tommelfingerregelen er omtrent 1 kcal per kilo kroppsvekt per kilometer. Tempo påvirker mer over lang tid enn på en enkeltøkt. Tallet er et anslag, ikke laboratoriemåling.",
    disclaimer: "Individuelt forbruk varierer med terreng, vind og løpsøkonomi.",
    compute(input) {
      const kg = num(input, "kg");
      const km = num(input, "km");
      if (!allNumbers([kg, km]) || kg <= 0 || km < 0) return [];
      const kcal = 1.036 * kg * km;
      return [
        result("kcal", "Estimert forbruk", kcal, {
          digits: 0,
          unit: "kcal",
          primary: true,
        }),
        result("perkm", "Per kilometer", kcal / km, { digits: 0, unit: "kcal" }),
      ];
    },
  },
  {
    slug: "kadens-steglengde",
    title: "Kadens og steglengde",
    description:
      "Finn steglengde fra fart og steg i minuttet, eller fart fra kadens og steg.",
    category: "sport",
    tags: ["kadens", "steg", "løping", "teknikk"],
    fields: [
      {
        id: "kmh",
        label: "Fart",
        type: "number",
        unit: "km/t",
        defaultValue: 12,
      },
      {
        id: "kadens",
        label: "Kadens",
        type: "number",
        unit: "steg/min",
        defaultValue: 170,
        hint: "Mange mosjonister ligger på 150–180 steg/min.",
      },
    ],
    formula: "steglengde = fart / (kadens / 60)",
    explanation:
      "Fart er steglengde ganger stegfrekvens. Høyere kadens med kortere steg kan dempe støt. 180 steg/min er en tommelfingerregel, ikke et krav.",
    compute(input) {
      const kmh = num(input, "kmh");
      const kadens = num(input, "kadens");
      if (!allNumbers([kmh, kadens]) || kmh <= 0 || kadens <= 0) return [];
      const ms = kmh / 3.6;
      const stride = ms / (kadens / 60);
      return [
        result("steg", "Steglengde", stride, {
          digits: 2,
          unit: "m",
          primary: true,
        }),
        result("tempo", "Tempo", `${formatPace(60 / kmh)} /km`, { kind: "text" }),
        result("stegkm", "Steg per km", kadens / (kmh / 60), {
          digits: 0,
        }),
      ];
    },
  },
  {
    slug: "cooper-test",
    title: "Cooper-test",
    description:
      "12-minutters løpetest: estimer VO₂-maks fra distansen du klarer.",
    category: "sport",
    tags: ["cooper", "vo2", "test", "løping", "kondisjon"],
    fields: [
      {
        id: "meter",
        label: "Distanse på 12 min",
        type: "number",
        unit: "m",
        defaultValue: 2800,
      },
    ],
    formula: "VO₂-maks ≈ (distanse − 504,9) / 44,73",
    explanation:
      "Cooper-testen er 12 minutter så langt du klarer. Formelen gir et grovt estimat på maksimalt oksygenopptak i ml/kg/min. Løp på flatt underlag, og ikke start testen uten å tåle hard innsats.",
    disclaimer: "Ikke en medisinsk test. Unngå maksinnsats ved sykdom eller ukjent hjerterisiko.",
    compute(input) {
      const meters = num(input, "meter");
      if (!Number.isFinite(meters) || meters <= 0) return [];
      const vo2 = (meters - 504.9) / 44.73;
      const kmh = meters / 1000 / (12 / 60);
      const pace = 60 / kmh;
      return [
        result("vo2", "Estimert VO₂-maks", vo2, {
          digits: 1,
          unit: "ml/kg/min",
          primary: true,
        }),
        result("kmh", "Snittfart", kmh, { digits: 2, unit: "km/t" }),
        result("tempo", "Snittempo", `${formatPace(pace)} /km`, { kind: "text" }),
        result("km", "Distanse", meters / 1000, { digits: 2, unit: "km" }),
      ];
    },
  },
  {
    slug: "pulssoner-sport",
    title: "Pulssoner",
    description:
      "Fem treningssoner fra makspuls, med eller uten hvilepuls (Karvonen).",
    category: "sport",
    tags: ["puls", "soner", "trening", "karvonen"],
    fields: [
      {
        id: "maks",
        label: "Makspuls",
        type: "number",
        unit: "slag/min",
        defaultValue: 190,
        hint: "Beste anslag er en test, ikke 220 minus alder alene.",
      },
      {
        id: "hvile",
        label: "Hvilepuls (valgfritt)",
        type: "number",
        unit: "slag/min",
        defaultValue: 55,
        hint: "Fyll inn for Karvonen-soner. La stå tom for prosent av makspuls.",
      },
    ],
    formula:
      "Karvonen: slag = hvile + % · (maks − hvile)     ellers: % · maks",
    explanation:
      "Sone 1–2 er rolig, sone 3 terskel/tempo, sone 4–5 hard. Karvonen bruker pulreserve og treffer ofte bedre enn ren prosent av makspuls.",
    compute(input) {
      const max = num(input, "maks");
      const restRaw = num(input, "hvile");
      if (!Number.isFinite(max) || max <= 0) return [];
      const rest = Number.isFinite(restRaw) && restRaw > 0 ? restRaw : 0;
      const hr = (pct: number) =>
        rest > 0 ? rest + pct * (max - rest) : pct * max;
      const zone = (from: number, to: number) =>
        `${Math.round(hr(from))}–${Math.round(hr(to))}`;
      return [
        result("z2", "Sone 2 (rolig)", zone(0.6, 0.7), {
          kind: "text",
          unit: "slag/min",
          primary: true,
        }),
        result("z1", "Sone 1 (restitusjon)", zone(0.5, 0.6), {
          kind: "text",
          unit: "slag/min",
        }),
        result("z3", "Sone 3 (terskel)", zone(0.7, 0.8), {
          kind: "text",
          unit: "slag/min",
        }),
        result("z4", "Sone 4 (hard)", zone(0.8, 0.9), {
          kind: "text",
          unit: "slag/min",
        }),
        result("z5", "Sone 5 (maks)", zone(0.9, 1), {
          kind: "text",
          unit: "slag/min",
        }),
      ];
    },
  },
];

function resolveDistance(input: Record<string, string>): number | null {
  if (input.distansevalg === "custom") {
    const km = num(input, "egendistanse");
    return Number.isFinite(km) && km > 0 ? km : null;
  }
  const km = Number(input.distansevalg);
  return Number.isFinite(km) && km > 0 ? km : null;
}

function formatNumberNb(n: number): string {
  return new Intl.NumberFormat("nb-NO", { maximumFractionDigits: 2 }).format(n);
}
