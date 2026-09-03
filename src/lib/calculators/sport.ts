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
      "Regn om mellom kilometer i timen og minutter per kilometer. Viser også 400 m-runde og vanlige løpsdistanser.",
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
        hint: "Skriv km/t som 12 eller 12,5, og tempo som 5:00 eller 4:45.",
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
      "Finn rundetid på 400 m-bane ut fra tempo, km/t eller sluttid. Viser også 100 m, 200 m og hvor mange runder distansen tilsvarer.",
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
        hint: "Brukes når du velger tempo eller km/t. Skriv 4:00 for tempo, eller 15 for km/t.",
      },
      {
        id: "distanse",
        label: "Distanse",
        type: "number",
        unit: "km",
        defaultValue: 5,
        hint: "Brukes sammen med sluttid, og til å telle runder.",
      },
      {
        id: "tid",
        label: "Sluttid",
        type: "text",
        defaultValue: "20:00",
        hint: "For eksempel 20:00 eller 1:23:45. Brukes når du velger sluttid.",
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
    formula: "rundetid = tempo · (banelengde i meter / 1000)",
    explanation:
      "En standard løpebane er 400 m i innerste felt. 5 km er 12,5 runder: tolv hele runder og 200 m. Innendørsbaner er ofte 200 m.",
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
      "Finn tempoet per kilometer du trenger for å løpe en distanse på ønsket sluttid.",
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
        hint: "For eksempel 22:30, 50:00 eller 1:45:00.",
      },
    ],
    formula: "tempo = sluttid / distanse",
    explanation:
      "Del sluttiden på antall kilometer. Et 10 km-løp på 50 minutter krever 5:00 /km, altså 12 km/t.",
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
      "Regn ut sluttiden fra tempo eller km/t og distansen du skal løpe.",
    category: "sport",
    tags: ["løping", "sluttid", "tempo", "prediksjon"],
    fields: [
      {
        id: "utgangspunkt",
        label: "Oppgi tempo som",
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
      "Et jevnt tempo på 5:30 /km på 10 km gir 55 minutter. I konkurranse varierer ofte tempoet noen sekunder per kilometer.",
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
      "Finn jevne mellomtider for hver kilometer og hver 400 m, ut fra ønsket sluttid. Fungerer for 5 km, 10 km, halvmaraton og maraton.",
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
        label: "Ønsket sluttid",
        type: "text",
        defaultValue: "50:00",
      },
    ],
    formula: "tid ved d km = sluttid · (d / total)",
    explanation:
      "Jevn split betyr samme tempo hele veien. Mange løper første halvdel litt roligere (negativ split). Her er alle mellomtidene jevnt fordelt.",
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
      "Finn hvor mange 400 m-runder 5 km, 10 km eller en valgfri distanse tilsvarer, og hvor mange meter som blir til rest.",
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
      "5000 m på 400 m-bane er 12,5 runder. Du starter ofte ved 200 m-merket, slik at målstreken blir i måloppløpet. 10 000 m er 25 runder.",
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
      "Estimer tiden på en ny distanse ut fra et løp du allerede har gjennomført (Riegels formel).",
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
      "Pete Riegels formel er et grovt anslag når form og løype er sammenlignbare. Eksponenten 1,06 betyr at lengre distanser går saktere enn ved ren proporsjon. Den treffer dårligere hvis du ikke har trent på den nye distansen.",
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
      "Finn tempo for rolig tur, terskel, intervall og repetisjoner ut fra 5 km-tiden din.",
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
      "T₅ er 5 km-tempo per kilometer. Rolig tur skal kjennes pratbar. Terskel er komfortabelt anstrengende. Intervall ligger nær 5 km-fart, repetisjoner litt raskere. Dette er tommelfingerregler, ikke den fulle VDOT-tabellen til Jack Daniels.",
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
        hint: "Skriv min/km, for eksempel 4:00.",
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
      "Åtte ganger 400 m i 4:00 /km gir 1:36 per drag. Med 90 sekunder pause blir økten omtrent 12:48 løping pluss 10:30 pause.",
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
        result("loping", "Samlet løpetid", formatHms(totalWork), { kind: "text" }),
        result("okt", "Økttid inkludert pause", formatHms(totalWork + totalRest), {
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
      "Planlegg en raskere andre halvdel. Kalkulatoren viser tempo for første og andre halvdel hver for seg.",
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
        label: "Ønsket sluttid",
        type: "text",
        defaultValue: "50:00",
      },
      {
        id: "delta",
        label: "Andre halvdel raskere med",
        type: "number",
        unit: "s",
        defaultValue: 30,
        hint: "30 sekunder betyr at andre halvdel er 30 sekunder raskere enn første.",
      },
    ],
    formula: "1. halv = (T + δ) / 2     2. halv = (T − δ) / 2",
    explanation:
      "Negativ split er vanlig i godt løpte konkurranser: du starter kontrollert og øker. 30 sekunder forskjell på 10 km merkes, men er overkommelig.",
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
    title: "Kalorier ved løping",
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
      "Tommelfingerregelen er omtrent 1 kcal per kilo kroppsvekt per kilometer. På én enkeltøkt betyr distanse og kroppsvekt mer enn tempo. Tallet er et anslag, ikke en laboratoriemåling.",
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
      "Finn steglengde ut fra fart og antall steg i minuttet.",
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
      "Cooper-testen er 12 minutter så langt du klarer. Formelen gir et grovt estimat på maksimalt oksygenopptak i ml/kg/min. Løp på flatt underlag. Ikke ta testen hvis du er syk eller ikke tåler hard innsats.",
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
        result("tempo", "Snitt-tempo", `${formatPace(pace)} /km`, { kind: "text" }),
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
        hint: "Beste anslag kommer fra en test, ikke fra 220 minus alder alene.",
      },
      {
        id: "hvile",
        label: "Hvilepuls (valgfritt)",
        type: "number",
        unit: "slag/min",
        defaultValue: 55,
        hint: "Fyll inn for Karvonen-soner. La feltet stå tomt for å bruke prosent av makspuls.",
      },
    ],
    formula:
      "Karvonen: slag = hvile + % · (maks − hvile)     ellers: % · maks",
    explanation:
      "Sone 1–2 er rolig, sone 3 terskel/tempo, sone 4–5 hard. Karvonen bruker pulsreserve og treffer ofte bedre enn ren prosent av makspuls.",
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
  {
    slug: "enrm",
    title: "1RM (maksvekt)",
    shortTitle: "1RM",
    description:
      "Estimer maksvekten for én repetisjon (1RM) ut fra vekt og antall repetisjoner (Epley).",
    category: "sport",
    tags: ["styrke", "1rm", "benk", "knebøy"],
    popular: true,
    fields: [
      {
        id: "vekt",
        label: "Vekt",
        type: "number",
        unit: "kg",
        defaultValue: 80,
      },
      {
        id: "reps",
        label: "Repetisjoner",
        type: "number",
        defaultValue: 5,
      },
    ],
    formula: "1RM ≈ vekt · (1 + reps / 30)",
    explanation:
      "Epley-formelen passer best for 1–10 repetisjoner nær utmattelse. Den overvurderer ofte mange repetisjoner. Bruk den til å styre prosentbasert trening, ikke som fasit for konkurransemaks.",
    compute(input) {
      const vekt = num(input, "vekt");
      const reps = num(input, "reps");
      if (!allNumbers([vekt, reps]) || vekt <= 0 || reps < 1) return [];
      const rm = reps === 1 ? vekt : vekt * (1 + reps / 30);
      return [
        result("rm", "Estimert 1RM", rm, { digits: 1, unit: "kg", primary: true }),
        result("p90", "90 % (tung styrke)", rm * 0.9, { digits: 1, unit: "kg" }),
        result("p80", "80 % (5–8 reps)", rm * 0.8, { digits: 1, unit: "kg" }),
        result("p70", "70 % (volum)", rm * 0.7, { digits: 1, unit: "kg" }),
      ];
    },
  },
  {
    slug: "ftp-soner",
    title: "FTP-soner (sykkel)",
    description: "Finn sykkelsoner etter Coggan ut fra funksjonell terskelwatt (FTP).",
    category: "sport",
    tags: ["sykkel", "watt", "ftp", "soner"],
    fields: [
      {
        id: "ftp",
        label: "FTP",
        type: "number",
        unit: "W",
        defaultValue: 250,
      },
    ],
    formula: "sone = prosent av FTP",
    explanation:
      "FTP er den høyeste watt du kan holde i omtrent en time. Sone 2 er utholdenhet, sone 4 terskel og sone 5 VO₂-maks. En vanlig test er 20 minutter ganger 0,95, eller en test på 60 minutter.",
    compute(input) {
      const ftp = num(input, "ftp");
      if (!Number.isFinite(ftp) || ftp <= 0) return [];
      const band = (a: number, b: number) =>
        `${Math.round(ftp * a)}–${Math.round(ftp * b)} W`;
      return [
        result("z2", "Sone 2 (55–75 %)", band(0.55, 0.75), {
          kind: "text",
          primary: true,
        }),
        result("z1", "Sone 1 (< 55 %)", `under ${Math.round(ftp * 0.55)} W`, {
          kind: "text",
        }),
        result("z3", "Sone 3 (76–90 %)", band(0.76, 0.9), { kind: "text" }),
        result("z4", "Sone 4 (91–105 %)", band(0.91, 1.05), { kind: "text" }),
        result("z5", "Sone 5 (106–120 %)", band(1.06, 1.2), { kind: "text" }),
        result("z6", "Sone 6 (121–150 %)", band(1.21, 1.5), { kind: "text" }),
      ];
    },
  },
  {
    slug: "svommetempo",
    title: "Svømmetempo",
    description: "Regn om sluttid til tid per 100 m og 50 m, og estimer 1500 m.",
    category: "sport",
    tags: ["svømming", "tempo", "basseng"],
    fields: [
      {
        id: "meter",
        label: "Distanse",
        type: "number",
        unit: "m",
        defaultValue: 400,
      },
      {
        id: "tid",
        label: "Sluttid",
        type: "text",
        defaultValue: "7:20",
        placeholder: "7:20 eller 1:12:00",
      },
    ],
    formula: "tid per 100 m = sluttid · 100 / distanse",
    explanation:
      "Oppgi tid som 7:20 eller 1:12:00. Tempo per 100 m er det vanlige målet i basseng. Tid i åpent vann blir ofte annerledes på grunn av vendinger og forhold.",
    compute(input) {
      const meter = num(input, "meter");
      const sek = parseRaceSeconds(input.tid);
      if (!Number.isFinite(meter) || meter <= 0 || sek == null || sek <= 0) {
        return [];
      }
      const per100 = (sek / meter) * 100;
      return [
        result("p100", "Per 100 m", formatHms(per100), {
          kind: "text",
          primary: true,
        }),
        result("p50", "Per 50 m", formatHms(per100 / 2), { kind: "text" }),
        result("p1500", "Estimert 1500 m", formatHms((sek / meter) * 1500), {
          kind: "text",
        }),
        result("fart", "Snittfart", meter / 1000 / (sek / 3600), {
          digits: 2,
          unit: "km/t",
        }),
      ];
    },
  },
  {
    slug: "watt-per-kg",
    title: "Watt per kilo",
    description: "Finn effekt relativt til kroppsvekt. Nyttig på sykkel, særlig i motbakke.",
    category: "sport",
    tags: ["watt", "ftp", "sykkel", "vekt"],
    fields: [
      {
        id: "watt",
        label: "Effekt",
        type: "number",
        unit: "W",
        defaultValue: 250,
      },
      {
        id: "kg",
        label: "Kroppsvekt",
        type: "number",
        unit: "kg",
        defaultValue: 75,
      },
    ],
    formula: "W/kg = watt / kroppsvekt",
    explanation:
      "I motbakke betyr watt per kilo mer enn rå watt. Rundt 2–3 W/kg er vanlig mosjon, 4+ W/kg er sterkt på FTP-nivå. Tallet sier lite om teknikk eller utholdenhet alene.",
    compute(input) {
      const watt = num(input, "watt");
      const kg = num(input, "kg");
      if (!allNumbers([watt, kg]) || kg <= 0) return [];
      return [
        result("wkg", "Watt per kilo", watt / kg, {
          digits: 2,
          unit: "W/kg",
          primary: true,
        }),
        result("ftp75", "Ved 75 kg", watt / 75, { digits: 2, unit: "W/kg" }),
      ];
    },
  },
  {
    slug: "vo2max",
    title: "VO₂-max-estimat",
    shortTitle: "VO₂-max",
    description:
      "Anslå maksimalt oksygenopptak fra Cooper-test, 5 km-tid eller hvilepuls.",
    category: "sport",
    tags: ["vo2", "kondisjon", "cooper", "utholdenhet"],
    popular: true,
    fields: [
      {
        id: "metode",
        label: "Metode",
        type: "select",
        defaultValue: "cooper",
        options: [
          { value: "cooper", label: "Cooper 12 min (meter)" },
          { value: "5km", label: "5 km-tid" },
          { value: "hvilepuls", label: "Hvilepuls og alder" },
        ],
      },
      {
        id: "meter",
        label: "Distanse på 12 min",
        type: "number",
        unit: "m",
        defaultValue: 2800,
      },
      {
        id: "tid5",
        label: "5 km-tid",
        type: "text",
        defaultValue: "25:00",
        hint: "mm:ss eller m:ss",
      },
      {
        id: "hvile",
        label: "Hvilepuls",
        type: "number",
        unit: "slag/min",
        defaultValue: 60,
      },
      {
        id: "alder",
        label: "Alder",
        type: "number",
        unit: "år",
        defaultValue: 30,
      },
    ],
    formula:
      "Cooper: VO₂ ≈ d₁₂/1000·22,351 − 11,288     Uth: VO₂ ≈ 15 · HRmax/HRhvile",
    explanation:
      "Cooper-formelen er klassisk felttest. Hvilepulsmetoden (Uth–Sørensen) er grovere. Alle er estimater – labtest er mer nøyaktig.",
    disclaimer: "Ikke medisinsk vurdering. Avbryt hard testing ved ubehag.",
    compute(input) {
      if (input.metode === "cooper") {
        const d = num(input, "meter");
        if (!Number.isFinite(d) || d <= 0) return [];
        const vo2 = (d / 1000) * 22.351 - 11.288;
        return [
          result("vo2", "Estimert VO₂-max", vo2, {
            digits: 1,
            unit: "ml/kg/min",
            primary: true,
          }),
          result("km", "Distanse", d / 1000, { digits: 2, unit: "km" }),
        ];
      }
      if (input.metode === "5km") {
        const sek = parseRaceSeconds(input.tid5 ?? "");
        if (sek == null || sek <= 0) return [];
        const v = 5000 / sek; // m/s
        // Simplified Daniels-like estimate from velocity
        const vo2 = -4.6 + 0.182258 * (v * 60) + 0.000104 * (v * 60) ** 2;
        return [
          result("vo2", "Estimert VO₂-max", vo2, {
            digits: 1,
            unit: "ml/kg/min",
            primary: true,
          }),
          result("fart", "Snittfart", v * 3.6, { digits: 2, unit: "km/t" }),
        ];
      }
      const hvile = num(input, "hvile");
      const alder = num(input, "alder");
      if (!allNumbers([hvile, alder]) || hvile <= 0) return [];
      const hrmax = 208 - 0.7 * alder;
      const vo2 = 15.3 * (hrmax / hvile);
      return [
        result("vo2", "Estimert VO₂-max", vo2, {
          digits: 1,
          unit: "ml/kg/min",
          primary: true,
        }),
        result("hrmax", "Estimert makspuls", hrmax, {
          digits: 0,
          unit: "slag/min",
        }),
      ];
    },
  },
  {
    slug: "treningsvolum",
    title: "Treningsvolum",
    shortTitle: "Volum",
    description:
      "Regn ut total tonnasje: sett × reps × vekt, med valgfri flere øvelser.",
    category: "sport",
    tags: ["styrke", "volum", "tonnasje", "gym"],
    popular: true,
    fields: [
      {
        id: "sett",
        label: "Sett",
        type: "number",
        defaultValue: 4,
      },
      {
        id: "reps",
        label: "Reps per sett",
        type: "number",
        defaultValue: 8,
      },
      {
        id: "kg",
        label: "Vekt",
        type: "number",
        unit: "kg",
        defaultValue: 60,
      },
      {
        id: "ovelser",
        label: "Antall like øvelser",
        type: "number",
        defaultValue: 1,
        hint: "Hvis flere øvelser med samme sett/reps/vekt.",
      },
    ],
    formula: "volum = sett · reps · vekt · øvelser",
    explanation:
      "Tonnasje er et enkelt mål på treningsmengde. Økt volum over tid er en vanlig måte å progressere på – så lenge teknikken holder.",
    compute(input) {
      const sett = num(input, "sett");
      const reps = num(input, "reps");
      const kg = num(input, "kg");
      const ovelser = num(input, "ovelser");
      if (!allNumbers([sett, reps, kg, ovelser]) || sett < 0 || reps < 0) {
        return [];
      }
      const per = sett * reps * kg;
      const total = per * ovelser;
      return [
        result("total", "Total tonnasje", total, {
          digits: 0,
          unit: "kg",
          primary: true,
        }),
        result("per", "Per øvelse", per, { digits: 0, unit: "kg" }),
        result("reps", "Totalt reps", sett * reps * ovelser, {
          kind: "integer",
        }),
      ];
    },
  },
  {
    slug: "skivekalkulator",
    title: "Skivekalkulator",
    shortTitle: "Skiver",
    description:
      "Finn hvilke skiver du trenger på hver side for ønsket totalvekt.",
    category: "sport",
    tags: ["skiver", "stang", "styrke", "gym"],
    popular: true,
    fields: [
      {
        id: "mal",
        label: "Ønsket totalvekt",
        type: "number",
        unit: "kg",
        defaultValue: 100,
      },
      {
        id: "stang",
        label: "Stang",
        type: "select",
        defaultValue: "20",
        options: [
          { value: "20", label: "OL-stang 20 kg" },
          { value: "15", label: "Teknikkstang 15 kg" },
          { value: "10", label: "Ez/annen 10 kg" },
          { value: "0", label: "Uten stang (kun skiver)" },
        ],
      },
    ],
    formula: "per side = (total − stang) / 2",
    explanation:
      "Standard skivesett: 25, 20, 15, 10, 5, 2,5, 1,25 kg. Algoritmen bruker færrest store skiver først.",
    compute(input) {
      const mal = num(input, "mal");
      const stang = Number(input.stang);
      if (!Number.isFinite(mal) || !Number.isFinite(stang) || mal < stang) {
        return [
          result("feil", "Ugyldig", "Totalvekt må være minst stangvekten.", {
            kind: "text",
            primary: true,
          }),
        ];
      }
      let perSide = (mal - stang) / 2;
      const plates = [25, 20, 15, 10, 5, 2.5, 1.25];
      const used: string[] = [];
      for (const p of plates) {
        const n = Math.floor(perSide / p + 1e-9);
        if (n > 0) {
          used.push(`${n}× ${p} kg`);
          perSide -= n * p;
        }
      }
      const rest = Math.round(perSide * 1000) / 1000;
      return [
        result(
          "sider",
          "Per side",
          used.length ? used.join(" + ") : "Ingen skiver",
          { kind: "text", primary: true },
        ),
        result("last", "Last totalt (uten stang)", mal - stang, {
          digits: 2,
          unit: "kg",
        }),
        ...(rest > 0.01
          ? [
              result("rest", "Mangler per side", rest, {
                digits: 2,
                unit: "kg",
                hint: "Finnes ikke i standardsettet.",
              }),
            ]
          : []),
      ];
    },
  },
  {
    slug: "met-kalorier",
    title: "MET-kalorier",
    shortTitle: "MET",
    description:
      "Anslå energiforbruk fra MET-verdi, kroppsvekt og varighet.",
    category: "sport",
    tags: ["met", "kalorier", "aktivitet", "forbrenning"],
    popular: true,
    fields: [
      {
        id: "met",
        label: "MET",
        type: "number",
        defaultValue: 7,
        step: 0.1,
        hint: "Gange ca. 3–4, jogge 7–10, sykle hardt 10–12.",
      },
      {
        id: "kg",
        label: "Kroppsvekt",
        type: "number",
        unit: "kg",
        defaultValue: 75,
      },
      {
        id: "min",
        label: "Varighet",
        type: "number",
        unit: "min",
        defaultValue: 45,
      },
    ],
    formula: "kcal ≈ MET · kg · timer",
    explanation:
      "1 MET er omtrent hvileforbrenning. Formelen er et praktisk anslag; faktisk forbruk varierer med intensitet og økonomi.",
    compute(input) {
      const met = num(input, "met");
      const kg = num(input, "kg");
      const min = num(input, "min");
      if (!allNumbers([met, kg, min]) || met <= 0 || kg <= 0 || min <= 0) {
        return [];
      }
      const timer = min / 60;
      const kcal = met * kg * timer;
      return [
        result("kcal", "Estimert forbruk", kcal, {
          digits: 0,
          unit: "kcal",
          primary: true,
        }),
        result("perTime", "Per time", met * kg, { digits: 0, unit: "kcal/t" }),
      ];
    },
  },
  {
    slug: "kritisk-hastighet",
    title: "Kritisk hastighet",
    shortTitle: "CV",
    description:
      "Finn kritisk hastighet og anaerob reserve fra to løpsresultater.",
    category: "sport",
    tags: ["kritisk hastighet", "terskel", "løping", "cv"],
    fields: [
      {
        id: "d1",
        label: "Distanse 1",
        type: "number",
        unit: "m",
        defaultValue: 1200,
      },
      {
        id: "t1",
        label: "Tid 1",
        type: "text",
        defaultValue: "4:00",
      },
      {
        id: "d2",
        label: "Distanse 2",
        type: "number",
        unit: "m",
        defaultValue: 3000,
      },
      {
        id: "t2",
        label: "Tid 2",
        type: "text",
        defaultValue: "11:00",
      },
    ],
    formula: "d = CV · t + D' ",
    explanation:
      "To tidsserier gir en rett linje: stigningstallet er kritisk hastighet (CV), skjæringen er anaerob distansereserve (D′). CV ligger ofte nær terskelfart.",
    compute(input) {
      const d1 = num(input, "d1");
      const d2 = num(input, "d2");
      const t1 = parseRaceSeconds(input.t1 ?? "");
      const t2 = parseRaceSeconds(input.t2 ?? "");
      if (!allNumbers([d1, d2]) || t1 == null || t2 == null || t1 === t2) {
        return [];
      }
      const cv = (d2 - d1) / (t2 - t1); // m/s
      const dPrime = d1 - cv * t1;
      if (cv <= 0) return [];
      const pace = 1000 / cv / 60; // min/km
      return [
        result("cv", "Kritisk hastighet", cv * 3.6, {
          digits: 2,
          unit: "km/t",
          primary: true,
        }),
        result("tempo", "Som tempo", `${formatPace(pace)} /km`, {
          kind: "text",
        }),
        result("dprime", "D′ (anaerob reserve)", Math.max(0, dPrime), {
          digits: 0,
          unit: "m",
        }),
      ];
    },
  },
  {
    slug: "sykkel-kadens",
    title: "Sykkelkadens og fart",
    shortTitle: "Kadens",
    description:
      "Regn ut fart fra kadens og gir, eller nødvendig kadens for ønsket fart.",
    category: "sport",
    tags: ["sykkel", "kadens", "gir", "fart"],
    fields: [
      {
        id: "modus",
        label: "Jeg vil",
        type: "select",
        defaultValue: "fart",
        options: [
          { value: "fart", label: "Finne fart" },
          { value: "kadens", label: "Finne kadens" },
        ],
      },
      {
        id: "kadens",
        label: "Kadens",
        type: "number",
        unit: "rpm",
        defaultValue: 90,
      },
      {
        id: "fart",
        label: "Fart",
        type: "number",
        unit: "km/t",
        defaultValue: 30,
      },
      {
        id: "fortann",
        label: "Tenn foran",
        type: "number",
        defaultValue: 50,
      },
      {
        id: "baktann",
        label: "Tenn bak",
        type: "number",
        defaultValue: 17,
      },
      {
        id: "omkrets",
        label: "Hjulomkrets",
        type: "number",
        unit: "mm",
        defaultValue: 2105,
        hint: "Ca. 2105 mm for 700×25C.",
      },
    ],
    formula: "fart = kadens · (fortann/baktann) · omkrets · 60 / 10³",
    explanation:
      "Utvikling = fortann/baktann. Gang med hjulomkrets og kadens for meter per minutt, omregnet til km/t.",
    compute(input) {
      const fortann = num(input, "fortann");
      const baktann = num(input, "baktann");
      const omkrets = num(input, "omkrets");
      if (
        !allNumbers([fortann, baktann, omkrets]) ||
        baktann <= 0 ||
        omkrets <= 0
      ) {
        return [];
      }
      const gear = fortann / baktann;
      const mPerRev = gear * (omkrets / 1000);
      if (input.modus === "kadens") {
        const fart = num(input, "fart");
        if (!Number.isFinite(fart) || fart <= 0) return [];
        const mPerMin = (fart * 1000) / 60;
        const kadens = mPerMin / mPerRev;
        return [
          result("kadens", "Nødvendig kadens", kadens, {
            digits: 1,
            unit: "rpm",
            primary: true,
          }),
          result("gir", "Gearing", gear, { digits: 2 }),
        ];
      }
      const kadens = num(input, "kadens");
      if (!Number.isFinite(kadens) || kadens <= 0) return [];
      const kmh = (kadens * mPerRev * 60) / 1000;
      return [
        result("fart", "Fart", kmh, {
          digits: 1,
          unit: "km/t",
          primary: true,
        }),
        result("gir", "Gearing", gear, { digits: 2 }),
        result("m", "Meter per pedalomdreining", mPerRev, {
          digits: 2,
          unit: "m",
        }),
      ];
    },
  },
  {
    slug: "triathlon-tid",
    title: "Triathlon-tid",
    shortTitle: "Triathlon",
    description:
      "Summer svøm, sykkel, løp og vekseltider til estimert totaltid.",
    category: "sport",
    tags: ["triathlon", "swim", "bike", "run", "transition"],
    fields: [
      {
        id: "swim",
        label: "Svømmetid",
        type: "text",
        defaultValue: "35:00",
      },
      {
        id: "t1",
        label: "Veksel 1 (T1)",
        type: "text",
        defaultValue: "3:00",
      },
      {
        id: "bike",
        label: "Sykkelttid",
        type: "text",
        defaultValue: "1:20:00",
      },
      {
        id: "t2",
        label: "Veksel 2 (T2)",
        type: "text",
        defaultValue: "2:00",
      },
      {
        id: "run",
        label: "Løpstid",
        type: "text",
        defaultValue: "55:00",
      },
    ],
    formula: "total = svøm + T1 + sykkel + T2 + løp",
    explanation:
      "Vekseltidene spiser ofte mer enn folk tror – spesielt i sprint og olympisk distanse.",
    compute(input) {
      const parts = ["swim", "t1", "bike", "t2", "run"].map((id) =>
        parseRaceSeconds(input[id] ?? ""),
      );
      if (parts.some((p) => p == null)) return [];
      const [swim, t1, bike, t2, run] = parts as number[];
      const total = swim + t1 + bike + t2 + run;
      return [
        result("total", "Totaltid", formatHms(total), {
          kind: "text",
          primary: true,
        }),
        result("disk", "Kun disipliner", formatHms(swim + bike + run), {
          kind: "text",
        }),
        result("veksler", "Veksler totalt", formatHms(t1 + t2), {
          kind: "text",
        }),
      ];
    },
  },
  {
    slug: "dots-styrkeloft",
    title: "DOTS (styrkeløft)",
    shortTitle: "DOTS",
    description:
      "Regn ut DOTS-score fra total og kroppsvekt – sammenlign på tvers av vektklasser.",
    category: "sport",
    tags: ["dots", "styrkeløft", "ipf", "total"],
    fields: [
      {
        id: "total",
        label: "Total (kg)",
        type: "number",
        unit: "kg",
        defaultValue: 500,
      },
      {
        id: "bw",
        label: "Kroppsvekt",
        type: "number",
        unit: "kg",
        defaultValue: 83,
      },
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
    ],
    formula: "DOTS = total · 500 / (a + b·bw + c·bw² + d·bw³ + e·bw⁴)",
    explanation:
      "IPF DOTS erstattet Wilks. Høyere score er bedre. Koeffisientene er offisielle IPF-verdier.",
    compute(input) {
      const total = num(input, "total");
      const bw = num(input, "bw");
      if (!allNumbers([total, bw]) || bw <= 0 || total <= 0) return [];
      // IPF DOTS: score = total * 500 / (a + b·bw + c·bw² + d·bw³ + e·bw⁴)
      const [a, b, c2, d, e] =
        input.kjonn === "kvinne"
          ? [-57.96288, 13.6175032, -0.112665186, 0.00051585678, -1.0706e-6]
          : [-307.75076, 24.0900756, -0.1918759225, 0.00073932828, -1.093e-6];
      const denom =
        a + b * bw + c2 * bw ** 2 + d * bw ** 3 + e * bw ** 4;
      if (denom <= 0) return [];
      const dots = (total * 500) / denom;
      return [
        result("dots", "DOTS", dots, { digits: 2, primary: true }),
        result("perKg", "Total / kroppsvekt", total / bw, {
          digits: 2,
        }),
      ];
    },
  },
  {
    slug: "progresjon-styrke",
    title: "Styrkeprogresjon",
    shortTitle: "Progresjon",
    description:
      "Planlegg lineær økning: startvekt, økning per uke og vekt etter N uker.",
    category: "sport",
    tags: ["progresjon", "styrke", "linear progression"],
    fields: [
      {
        id: "start",
        label: "Startvekt",
        type: "number",
        unit: "kg",
        defaultValue: 60,
      },
      {
        id: "okning",
        label: "Økning per uke",
        type: "number",
        unit: "kg",
        defaultValue: 2.5,
        step: 0.5,
      },
      {
        id: "uker",
        label: "Antall uker",
        type: "number",
        defaultValue: 8,
      },
    ],
    formula: "vekt = start + økning · uker",
    explanation:
      "Klassisk lineær progresjon for nybegynnere. Når økningen stopper, trengs deload eller annet program.",
    compute(input) {
      const start = num(input, "start");
      const okning = num(input, "okning");
      const uker = num(input, "uker");
      if (!allNumbers([start, okning, uker]) || uker < 0) return [];
      const slutt = start + okning * uker;
      return [
        result("slutt", "Vekt etter perioden", slutt, {
          digits: 1,
          unit: "kg",
          primary: true,
        }),
        result("total", "Total økning", okning * uker, {
          digits: 1,
          unit: "kg",
        }),
        result("prosent", "Økning", start > 0 ? (okning * uker) / start * 100 : 0, {
          kind: "percent",
          digits: 1,
        }),
      ];
    },
  },
  {
    slug: "opptrapping-loping",
    title: "Opptrapping av løpsmengde",
    shortTitle: "Opptrapping",
    description:
      "Planlegg økning av ukentlig løpsmengde mot et mål – med 10 % opptrapping per uke eller egen sats.",
    category: "sport",
    tags: [
      "løping",
      "opptrapping",
      "treningsmengde",
      "10 prosent",
      "uke",
      "progresjon",
    ],
    popular: true,
    fields: [
      {
        id: "naa",
        label: "Nåværende mengde",
        type: "number",
        unit: "km/uke",
        defaultValue: 25,
        hint: "Hvor mye du løper typisk i en uke nå.",
      },
      {
        id: "mal",
        label: "Mål",
        type: "number",
        unit: "km/uke",
        defaultValue: 50,
        hint: "Ønsket ukentlig distanse.",
      },
      {
        id: "okning",
        label: "Økning per uke",
        type: "number",
        unit: "%",
        defaultValue: 10,
        step: 0.5,
        hint: "Klassisk tommelfingerregel er ca. 10 %.",
      },
    ],
    formula: "kmₙ = nå · (1 + r)ⁿ",
    explanation:
      "Hver uke økes mengden med valgt prosent fra uken før. Uke 1 er første økning fra dagens nivå. 10 %-regelen er en grov rettesnor – form, skader og livssituasjon betyr mer enn formelen.",
    disclaimer:
      "Veiledende plan, ikke personlig treningsråd. Øk mer forsiktig ved skadehistorikk, eller ta en lettere uke ved behov.",
    faqs: [
      {
        question: "Hvorfor 10 % per uke?",
        answer:
          "Mange treningsplaner bruker ca. 10 % økning i ukentlig mengde for å redusere skaderisiko. Det er en tommelfingerregel, ikke en absolutt grense.",
      },
      {
        question: "Er uke 1 dagens mengde?",
        answer:
          "Nei. Nåværende mengde er utgangspunktet. Uke 1 er første uke med økning (f.eks. 10 % mer).",
      },
    ],
    compute(input) {
      const naa = num(input, "naa");
      const mal = num(input, "mal");
      const okning = num(input, "okning");
      if (!allNumbers([naa, mal, okning]) || naa <= 0 || mal <= 0 || okning <= 0) {
        return [];
      }
      if (mal <= naa) {
        return [
          result("uker", "Uker til mål", 0, {
            kind: "integer",
            primary: true,
            hint: "Du er allerede på eller over målet.",
          }),
          result("naa", "Nåværende mengde", naa, { digits: 1, unit: "km/uke" }),
        ];
      }

      const factor = 1 + okning / 100;
      const weeks = Math.max(
        1,
        Math.ceil(Math.log(mal / naa) / Math.log(factor) - 1e-12),
      );
      if (weeks > 52) {
        return [
          result("uker", "Uker til mål", weeks, {
            kind: "integer",
            primary: true,
            hint: "Over 52 uker – vurder mer realistisk mål eller startmengde.",
          }),
        ];
      }

      const out: ResultItem[] = [
        result("uker", "Uker til mål", weeks, {
          kind: "integer",
          primary: true,
          hint: `Med ${okning} % økning hver uke`,
        }),
      ];

      let km = naa;
      let sum = 0;
      for (let w = 1; w <= weeks; w++) {
        km *= factor;
        const display = w === weeks && km < mal ? mal : km;
        sum += display;
        out.push(
          result(`uke${w}`, `Uke ${w}`, display, {
            digits: 1,
            unit: "km",
          }),
        );
      }

      out.push(
        result("total", "Totalt i opptrappingsperioden", sum, {
          digits: 0,
          unit: "km",
        }),
      );
      return out;
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
