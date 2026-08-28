import type { Calculator } from "../types";
import { num } from "../format";
import { allNumbers, result } from "../helpers";

const A4_HZ = 440;
const NOTE_NAMES = [
  "C",
  "C#",
  "D",
  "D#",
  "E",
  "F",
  "F#",
  "G",
  "G#",
  "A",
  "A#",
  "B",
];

function midiToFreq(midi: number, a4 = A4_HZ): number {
  return a4 * Math.pow(2, (midi - 69) / 12);
}

function freqToMidi(freq: number, a4 = A4_HZ): number {
  return 69 + 12 * Math.log2(freq / a4);
}

export const musikkCalculators: Calculator[] = [
  {
    slug: "bpm-tid",
    title: "BPM og tid",
    shortTitle: "BPM",
    description:
      "Regn ut varighet fra BPM og antall takter, eller finn BPM fra tid.",
    category: "musikk",
    tags: ["bpm", "tempo", "takt", "musikk"],
    popular: true,
    fields: [
      {
        id: "modus",
        label: "Jeg vil",
        type: "select",
        defaultValue: "varighet",
        options: [
          { value: "varighet", label: "Finne varighet fra BPM" },
          { value: "bpm", label: "Finne BPM fra varighet" },
        ],
      },
      {
        id: "bpm",
        label: "BPM",
        type: "number",
        defaultValue: 120,
      },
      {
        id: "takter",
        label: "Antall takter",
        type: "number",
        defaultValue: 32,
      },
      {
        id: "taktart",
        label: "Slag per takt",
        type: "number",
        defaultValue: 4,
        hint: "4 for 4/4, 3 for 3/4.",
      },
      {
        id: "sekunder",
        label: "Varighet",
        type: "number",
        unit: "s",
        defaultValue: 64,
      },
    ],
    formula: "tid = takter · slag/takt · 60 / BPM",
    explanation:
      "BPM er slag per minutt. En 4/4-takt har fire slag. Dobbel BPM = halv tid for samme antall slag.",
    compute(input) {
      const slagPerTakt = num(input, "taktart");
      const takter = num(input, "takter");
      if (!allNumbers([slagPerTakt, takter]) || slagPerTakt <= 0 || takter <= 0) {
        return [];
      }
      const slag = takter * slagPerTakt;
      if (input.modus === "bpm") {
        const sek = num(input, "sekunder");
        if (!Number.isFinite(sek) || sek <= 0) return [];
        const bpm = (slag * 60) / sek;
        return [
          result("bpm", "BPM", bpm, { digits: 2, primary: true }),
          result("slag", "Totalt antall slag", slag, { kind: "integer" }),
        ];
      }
      const bpm = num(input, "bpm");
      if (!Number.isFinite(bpm) || bpm <= 0) return [];
      const sek = (slag * 60) / bpm;
        const min = Math.floor(sek / 60);
        const rest = sek - min * 60;
        const restStr = rest.toFixed(1).padStart(4, "0");
        return [
          result("tid", "Varighet", sek, {
            digits: 2,
            unit: "s",
            primary: true,
          }),
          result("fmt", "Som min:sek", `${min}:${restStr}`, { kind: "text" }),
          result("slag", "Totalt antall slag", slag, { kind: "integer" }),
        ];
    },
  },
  {
    slug: "note-frekvens",
    title: "Note til frekvens",
    shortTitle: "Note Hz",
    description:
      "Finn frekvensen til en MIDI-note eller nærmeste note fra en frekvens (A4 = 440 Hz).",
    category: "musikk",
    tags: ["note", "frekvens", "hz", "stemming", "musikk"],
    popular: true,
    fields: [
      {
        id: "modus",
        label: "Retning",
        type: "select",
        defaultValue: "note",
        options: [
          { value: "note", label: "MIDI-note → Hz" },
          { value: "hz", label: "Hz → nærmeste note" },
        ],
      },
      {
        id: "midi",
        label: "MIDI-note",
        type: "number",
        defaultValue: 69,
        hint: "69 = A4. 60 = midt-C (C4).",
      },
      {
        id: "hz",
        label: "Frekvens",
        type: "number",
        unit: "Hz",
        defaultValue: 440,
      },
      {
        id: "a4",
        label: "A4-referanse",
        type: "number",
        unit: "Hz",
        defaultValue: 440,
      },
    ],
    formula: "f = 440 · 2^((n − 69)/12)",
    explanation:
      "Likestemt temperering: hver halvtone er faktor 2^(1/12). MIDI 69 er A4.",
    compute(input) {
      const a4 = num(input, "a4");
      if (!Number.isFinite(a4) || a4 <= 0) return [];
      if (input.modus === "hz") {
        const hz = num(input, "hz");
        if (!Number.isFinite(hz) || hz <= 0) return [];
        const midi = freqToMidi(hz, a4);
        const rounded = Math.round(midi);
        const name = NOTE_NAMES[((rounded % 12) + 12) % 12];
        const octave = Math.floor(rounded / 12) - 1;
        const cents = (midi - rounded) * 100;
        return [
          result("note", "Nærmeste note", `${name}${octave}`, {
            kind: "text",
            primary: true,
          }),
          result("midi", "MIDI", rounded, { kind: "integer" }),
          result("cents", "Avvik", cents, { digits: 1, unit: "cent" }),
          result("eksakt", "Eksakt frekvens for noten", midiToFreq(rounded, a4), {
            digits: 2,
            unit: "Hz",
          }),
        ];
      }
      const midi = num(input, "midi");
      if (!Number.isFinite(midi)) return [];
      const n = Math.round(midi);
      const name = NOTE_NAMES[((n % 12) + 12) % 12];
      const octave = Math.floor(n / 12) - 1;
      const f = midiToFreq(n, a4);
      return [
        result("hz", "Frekvens", f, { digits: 2, unit: "Hz", primary: true }),
        result("note", "Note", `${name}${octave}`, { kind: "text" }),
      ];
    },
  },
  {
    slug: "capo",
    title: "Capo-transponering",
    shortTitle: "Capo",
    description:
      "Se hvilke grepsformer du spiller med capo, eller hvilken klingende akkord du får.",
    category: "musikk",
    tags: ["capo", "gitar", "transponering", "akkord", "musikk"],
    fields: [
      {
        id: "form",
        label: "Grepsform (uten capo-tankegang)",
        type: "select",
        defaultValue: "0",
        options: NOTE_NAMES.map((n, i) => ({
          value: String(i),
          label: n.replace("#", "♯"),
        })),
      },
      {
        id: "bånd",
        label: "Capo på bånd",
        type: "number",
        defaultValue: 2,
        min: 0,
        max: 12,
      },
    ],
    formula: "klingende = (form + capo) mod 12",
    explanation:
      "Capo flytter alle toner opp. Spiller du C-form med capo på 2. bånd, klinger det som D.",
    compute(input) {
      const form = Number(input.form);
      const band = Math.round(num(input, "bånd"));
      if (!Number.isFinite(form) || !Number.isFinite(band) || band < 0) return [];
      const kling = (form + band) % 12;
      return [
        result("kling", "Klingende toneart/akkord", NOTE_NAMES[kling].replace("#", "♯"), {
          kind: "text",
          primary: true,
        }),
        result("form", "Grepsform", NOTE_NAMES[form].replace("#", "♯"), {
          kind: "text",
        }),
        result("capo", "Capo", band === 0 ? "Ingen" : `${band}. bånd`, {
          kind: "text",
        }),
      ];
    },
  },
  {
    slug: "notelengde",
    title: "Notelengde i millisekunder",
    shortTitle: "Notelengde",
    description:
      "Finn hvor lang en 1/4-note, 1/8-note osv. er ved gitt BPM.",
    category: "musikk",
    tags: ["note", "delay", "ms", "bpm", "musikk"],
    fields: [
      {
        id: "bpm",
        label: "BPM",
        type: "number",
        defaultValue: 128,
      },
    ],
    formula: "ms = 60000 / BPM · (4 / nevner)",
    explanation:
      "Ved 120 BPM er en 1/4-note 500 ms. Nyttig for delay, kompressor og sidechain.",
    compute(input) {
      const bpm = num(input, "bpm");
      if (!Number.isFinite(bpm) || bpm <= 0) return [];
      const quarter = 60000 / bpm;
      return [
        result("q", "1/4-note", quarter, { digits: 1, unit: "ms", primary: true }),
        result("e", "1/8-note", quarter / 2, { digits: 1, unit: "ms" }),
        result("s", "1/16-note", quarter / 4, { digits: 1, unit: "ms" }),
        result("h", "1/2-note", quarter * 2, { digits: 1, unit: "ms" }),
        result("dot", "Prikket 1/4", quarter * 1.5, { digits: 1, unit: "ms" }),
        result("trip", "1/8-triol", quarter / 3, { digits: 1, unit: "ms" }),
      ];
    },
  },
  {
    slug: "intervall-musikk",
    title: "Intervall (halvtoner)",
    shortTitle: "Intervall",
    description:
      "Finn intervallet mellom to toner i halvtoner og som navn.",
    category: "musikk",
    tags: ["intervall", "halvtone", "musikkteori"],
    fields: [
      {
        id: "fra",
        label: "Fra tone (MIDI)",
        type: "number",
        defaultValue: 60,
      },
      {
        id: "til",
        label: "Til tone (MIDI)",
        type: "number",
        defaultValue: 67,
      },
    ],
    formula: "halvtoner = |til − fra|",
    explanation:
      "12 halvtoner = oktav. 7 = kvint, 5 = kvart, 4 = stor ters.",
    compute(input) {
      const fra = Math.round(num(input, "fra"));
      const til = Math.round(num(input, "til"));
      if (!allNumbers([fra, til])) return [];
      const h = Math.abs(til - fra);
      const names: Record<number, string> = {
        0: "Prime",
        1: "Liten sekund",
        2: "Stor sekund",
        3: "Liten ters",
        4: "Stor ters",
        5: "Kvart",
        6: "Tritonus",
        7: "Kvint",
        8: "Liten sekst",
        9: "Stor sekst",
        10: "Liten septim",
        11: "Stor septim",
        12: "Oktav",
      };
      const within = h % 12;
      const okt = Math.floor(h / 12);
      const label = names[within] ?? `${within} halvtoner`;
      return [
        result("h", "Halvtoner", h, { kind: "integer", primary: true }),
        result(
          "navn",
          "Intervall",
          okt > 0 && within === 0
            ? `${okt} oktav${okt > 1 ? "er" : ""}`
            : okt > 0
              ? `${label} + ${okt} oktav${okt > 1 ? "er" : ""}`
              : label,
          { kind: "text" },
        ),
      ];
    },
  },
  {
    slug: "metronom-click",
    title: "Metronom-intervall",
    shortTitle: "Metronom",
    description: "Hvor mange millisekunder mellom hvert slag ved gitt BPM?",
    category: "musikk",
    tags: ["metronom", "bpm", "musikk"],
    fields: [
      { id: "bpm", label: "BPM", type: "number", defaultValue: 100 },
    ],
    formula: "intervall = 60000 / BPM",
    explanation: "Samme som 1/4-note-lengde når takten teller kvartnoter.",
    compute(input) {
      const bpm = num(input, "bpm");
      if (!Number.isFinite(bpm) || bpm <= 0) return [];
      return [
        result("ms", "Ms mellom slag", 60000 / bpm, {
          digits: 2,
          unit: "ms",
          primary: true,
        }),
        result("hz", "Slag per sekund", bpm / 60, { digits: 3, unit: "Hz" }),
      ];
    },
  },
  {
    slug: "delay-bpm",
    title: "Delay fra BPM",
    shortTitle: "Delay",
    description:
      "Finn delay-tid i ms for hel, halv, fjerdedels- og åttendelsnote ved gitt BPM.",
    category: "musikk",
    tags: ["delay", "bpm", "ms", "musikk", "produksjon"],
    fields: [
      { id: "bpm", label: "BPM", type: "number", defaultValue: 120 },
    ],
    formula: "ms = 60000 / BPM · note-verdi",
    explanation:
      "Hel note = 4 slag i 4/4. Brukes til å synce delay og reverb til tempo i opptak og live.",
    compute(input) {
      const bpm = num(input, "bpm");
      if (!Number.isFinite(bpm) || bpm <= 0) return [];
      const hel = 60000 / bpm;
      return [
        result("hel", "Hel note", hel * 4, { digits: 1, unit: "ms", primary: true }),
        result("halv", "Halv note", hel * 2, { digits: 1, unit: "ms" }),
        result("fjerde", "Fjerdedelsnote", hel, { digits: 1, unit: "ms" }),
        result("åttende", "Åttendelsnote", hel / 2, { digits: 1, unit: "ms" }),
      ];
    },
  },
  {
    slug: "stemming-a4",
    title: "Stemming og A4",
    shortTitle: "A4 Hz",
    description:
      "Finn frekvensen til en note når A4 er stemt annerledes enn 440 Hz.",
    category: "musikk",
    tags: ["stemming", "a4", "frekvens", "hz", "musikk"],
    fields: [
      { id: "a4", label: "A4-frekvens", type: "number", unit: "Hz", defaultValue: 440 },
      {
        id: "note",
        label: "MIDI-note",
        type: "number",
        defaultValue: 69,
        hint: "69 = A4. 60 = C4.",
      },
    ],
    formula: "f = A4 · 2^((n − 69) / 12)",
    explanation:
      "Barokkstemming bruker ofte A4 = 415 Hz. Orkestre kan stemme 442–444 Hz. Hver halv tone er en faktor 2^(1/12).",
    compute(input) {
      const a4 = num(input, "a4");
      const note = num(input, "note");
      if (!allNumbers([a4, note]) || a4 <= 0) return [];
      const f = a4 * Math.pow(2, (note - 69) / 12);
      const cents = 1200 * Math.log2(a4 / 440);
      return [
        result("f", "Frekvens", f, { digits: 2, unit: "Hz", primary: true }),
        result("cents", "Avvik fra 440 Hz A4", cents, {
          digits: 1,
          unit: "cent",
        }),
      ];
    },
  },
];
