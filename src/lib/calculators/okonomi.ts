import type { Calculator } from "../types";
import { num } from "../format";
import { allNumbers, result } from "../helpers";

export const okonomiCalculators: Calculator[] = [
  {
    slug: "lanekalkulator",
    title: "Lånekalkulator",
    shortTitle: "Lån",
    description:
      "Regn ut månedlig beløp, totalkostnad og renter for boliglån og andre annuitetslån.",
    category: "okonomi",
    tags: ["lån", "boliglån", "renter", "annuitet", "avdrag"],
    popular: true,
    fields: [
      {
        id: "belop",
        label: "Lånebeløp",
        type: "number",
        unit: "kr",
        defaultValue: 3000000,
      },
      {
        id: "rente",
        label: "Nominell rente",
        type: "number",
        unit: "%",
        defaultValue: 5.5,
        step: 0.1,
      },
      {
        id: "aar",
        label: "Nedbetalingstid",
        type: "number",
        unit: "år",
        defaultValue: 25,
      },
    ],
    formula: "M = P · r · (1 + r)^n / ((1 + r)^n − 1)",
    explanation:
      "Annuitetslån har samme terminbeløp hver måned. r er månedlig rente (årlig rente delt på 12), n er antall måneder, og P er lånebeløpet. I starten går mer til renter, mot slutten mer til avdrag.",
    disclaimer:
      "Forenklet modell uten gebyrer, rentebinding eller avdragsfrihet. Banken din kan ha andre vilkår.",
    compute(input) {
      const P = num(input, "belop");
      const rente = num(input, "rente");
      const aar = num(input, "aar");
      if (!allNumbers([P, rente, aar]) || P <= 0 || aar <= 0) return [];
      const n = aar * 12;
      const r = rente / 100 / 12;
      const M =
        r === 0 ? P / n : (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
      const total = M * n;
      return [
        result("maaned", "Månedlig beløp", M, {
          kind: "currency",
          digits: 0,
          primary: true,
        }),
        result("total", "Totalt tilbakebetalt", total, { kind: "currency" }),
        result("renter", "Totale renter", total - P, { kind: "currency" }),
        result("terminer", "Antall terminer", n, { kind: "integer" }),
      ];
    },
  },
  {
    slug: "rentes-rente",
    title: "Rentes rente og sparing",
    shortTitle: "Sparing",
    description:
      "Se hvordan sparebeløp vokser med rentes rente, med eller uten faste innskudd.",
    category: "okonomi",
    tags: ["sparing", "renter", "avkastning", "fond"],
    popular: true,
    fields: [
      {
        id: "start",
        label: "Startbeløp",
        type: "number",
        unit: "kr",
        defaultValue: 50000,
      },
      {
        id: "maaned",
        label: "Månedlig sparing",
        type: "number",
        unit: "kr",
        defaultValue: 2000,
      },
      {
        id: "rente",
        label: "Årlig avkastning",
        type: "number",
        unit: "%",
        defaultValue: 6,
        step: 0.1,
      },
      {
        id: "aar",
        label: "Sparingstid",
        type: "number",
        unit: "år",
        defaultValue: 15,
      },
    ],
    formula:
      "A = P(1 + r)^n + PMT · (((1 + r)^n − 1) / r)",
    explanation:
      "Startbeløpet forrentes hvert år. Faste innskudd behandles som en annuitet. Her brukes månedlig modell: r er månedlig rente, n er antall måneder.",
    compute(input) {
      const P = num(input, "start");
      const PMT = num(input, "maaned");
      const rente = num(input, "rente");
      const aar = num(input, "aar");
      if (!allNumbers([P, PMT, rente, aar]) || aar < 0) return [];
      const n = aar * 12;
      const r = rente / 100 / 12;
      const futureP = r === 0 ? P : P * Math.pow(1 + r, n);
      const futurePmt =
        r === 0 ? PMT * n : PMT * ((Math.pow(1 + r, n) - 1) / r);
      const total = futureP + futurePmt;
      const innskutt = P + PMT * n;
      return [
        result("slutt", "Sluttverdi", total, {
          kind: "currency",
          primary: true,
        }),
        result("innskutt", "Totalt innskutt", innskutt, { kind: "currency" }),
        result("gevinst", "Avkastning", total - innskutt, { kind: "currency" }),
      ];
    },
  },
  {
    slug: "mva",
    title: "MVA-kalkulator",
    shortTitle: "MVA",
    description:
      "Legg til eller trekk fra merverdiavgift med norske satser: 25 %, 15 % og 12 %.",
    category: "okonomi",
    tags: ["mva", "moms", "skatt", "pris"],
    popular: true,
    fields: [
      {
        id: "belop",
        label: "Beløp",
        type: "number",
        unit: "kr",
        defaultValue: 1000,
      },
      {
        id: "sats",
        label: "MVA-sats",
        type: "select",
        defaultValue: "25",
        options: [
          { value: "25", label: "25 % – alminnelig sats" },
          { value: "15", label: "15 % – næringsmidler" },
          { value: "12", label: "12 % – persontransport, kinobilletter m.m." },
          { value: "0", label: "0 % – unntatt / fritatt" },
        ],
      },
      {
        id: "retning",
        label: "Beløpet er",
        type: "select",
        defaultValue: "eks",
        options: [
          { value: "eks", label: "Uten MVA (legg til)" },
          { value: "inkl", label: "Med MVA (trekk fra)" },
        ],
      },
    ],
    formula: "inkl. = eks. · (1 + s)    eks. = inkl. / (1 + s)",
    explanation:
      "Standard MVA i Norge er 25 %. Matvarer har 15 %, og enkelte tjenester som persontransport har 12 %. Kalkulatoren skiller mellom å legge til og å trekke ut avgiften.",
    compute(input) {
      const belop = num(input, "belop");
      const sats = num(input, "sats");
      if (!allNumbers([belop, sats]) || belop < 0) return [];
      const s = sats / 100;
      const eks = input.retning === "inkl" ? belop / (1 + s) : belop;
      const inkl = input.retning === "inkl" ? belop : belop * (1 + s);
      return [
        result("inkl", "Pris inkl. MVA", inkl, {
          kind: "currency",
          digits: 2,
          primary: true,
        }),
        result("eks", "Pris eks. MVA", eks, { kind: "currency", digits: 2 }),
        result("avgift", "MVA-beløp", inkl - eks, {
          kind: "currency",
          digits: 2,
        }),
      ];
    },
  },
  {
    slug: "prosent",
    title: "Prosentkalkulator",
    shortTitle: "Prosent",
    description:
      "Finn prosent av et tall, hvor mange prosent ett tall er av et annet, og prosentvis endring.",
    category: "okonomi",
    tags: ["prosent", "andel", "rabatt", "påslag"],
    popular: true,
    fields: [
      { id: "a", label: "Tall A", type: "number", defaultValue: 25 },
      { id: "b", label: "Tall B", type: "number", defaultValue: 200 },
    ],
    formula: "andel = A / B · 100 %     verdi = A/100 · B",
    explanation:
      "Prosent betyr hundredeler. «Hva er A % av B» ganger B med A/100. «A er hvor mange % av B» deler A på B og ganger med 100.",
    compute(input) {
      const a = num(input, "a");
      const b = num(input, "b");
      if (!allNumbers([a, b])) return [];
      return [
        result("av", `${formatPlain(a)} % av ${formatPlain(b)}`, (a / 100) * b, {
          primary: true,
          digits: 4,
        }),
        result(
          "andel",
          `${formatPlain(a)} er andel av ${formatPlain(b)}`,
          b === 0 ? "Kan ikke dele på 0" : (a / b) * 100,
          { kind: b === 0 ? "text" : "percent", digits: 2 },
        ),
        result("endring", "Endring fra B til A", b === 0 ? "–" : ((a - b) / b) * 100, {
          kind: b === 0 ? "text" : "percent",
        }),
      ];
    },
  },
  {
    slug: "prosentvis-endring",
    title: "Prosentvis endring",
    description: "Regn ut hvor mange prosent et tall har økt eller sunket.",
    category: "okonomi",
    tags: ["prosent", "vekst", "endring", "inflasjon"],
    fields: [
      {
        id: "fra",
        label: "Opprinnelig verdi",
        type: "number",
        defaultValue: 400,
      },
      {
        id: "til",
        label: "Ny verdi",
        type: "number",
        defaultValue: 460,
      },
    ],
    formula: "endring = (ny − gammel) / gammel · 100 %",
    explanation:
      "Positivt tall betyr økning, negativt tall betyr nedgang. Formelene brukes til priser, lønn, karakterer og målinger.",
    compute(input) {
      const fra = num(input, "fra");
      const til = num(input, "til");
      if (!allNumbers([fra, til]) || fra === 0) return [];
      const endring = ((til - fra) / fra) * 100;
      return [
        result("prosent", "Prosentvis endring", endring, {
          kind: "percent",
          primary: true,
        }),
        result("differanse", "Differanse", til - fra, { digits: 4 }),
      ];
    },
  },
  {
    slug: "feriepenger",
    title: "Feriepenger",
    description:
      "Regn ut feriepenger av feriepengegrunnlaget med 10,2 % eller 12 %.",
    category: "okonomi",
    tags: ["lønn", "ferie", "arbeid"],
    fields: [
      {
        id: "grunnlag",
        label: "Feriepengegrunnlag",
        type: "number",
        unit: "kr",
        defaultValue: 550000,
      },
      {
        id: "sats",
        label: "Sats",
        type: "select",
        defaultValue: "10.2",
        options: [
          { value: "10.2", label: "10,2 % – vanlig" },
          { value: "12", label: "12 % – 60 år og eldre" },
        ],
      },
    ],
    formula: "feriepenger = grunnlag · sats",
    explanation:
      "Feriepenger opptjenes året før de utbetales. Vanlig sats er 10,2 %. Arbeidstakere over 60 år har som hovedregel 12 %. Tariffavtaler kan gi mer.",
    disclaimer: "Sjekk arbeidsavtale og ferieloven for din situasjon.",
    compute(input) {
      const grunnlag = num(input, "grunnlag");
      const sats = num(input, "sats");
      if (!allNumbers([grunnlag, sats])) return [];
      const belop = grunnlag * (sats / 100);
      return [
        result("ferie", "Feriepenger", belop, {
          kind: "currency",
          primary: true,
        }),
        result("rest", "Grunnlag etter avsetning (illustrasjon)", grunnlag - belop, {
          kind: "currency",
        }),
      ];
    },
  },
  {
    slug: "lonn-omregning",
    title: "Lønn: år, måned og time",
    shortTitle: "Lønn",
    description:
      "Regn om mellom årslønn, månedslønn og timelønn med norske arbeidstider.",
    category: "okonomi",
    tags: ["lønn", "timelønn", "årslønn"],
    fields: [
      {
        id: "belop",
        label: "Beløp",
        type: "number",
        unit: "kr",
        defaultValue: 600000,
      },
      {
        id: "type",
        label: "Dette er",
        type: "select",
        defaultValue: "aar",
        options: [
          { value: "aar", label: "Årslønn" },
          { value: "maaned", label: "Månedslønn" },
          { value: "time", label: "Timelønn" },
        ],
      },
      {
        id: "timeruke",
        label: "Timer per uke",
        type: "number",
        defaultValue: 37.5,
        step: 0.5,
      },
      {
        id: "uker",
        label: "Uker per år",
        type: "number",
        defaultValue: 52,
        hint: "52 uker gir årslønn inkl. ferie. Bruk 47 for omtrent faktisk arbeidstid.",
      },
    ],
    formula: "årslønn = timelønn · timer/uke · uker/år",
    explanation:
      "Full stilling i Norge er ofte 37,5 timer i uken. Årslønn deles vanligvis på 12 for månedslønn, også i feriemåneder.",
    compute(input) {
      const belop = num(input, "belop");
      const timeruke = num(input, "timeruke");
      const uker = num(input, "uker");
      if (!allNumbers([belop, timeruke, uker]) || timeruke <= 0 || uker <= 0)
        return [];
      const aarstimer = timeruke * uker;
      let aar = belop;
      if (input.type === "maaned") aar = belop * 12;
      if (input.type === "time") aar = belop * aarstimer;
      return [
        result("aar", "Årslønn", aar, { kind: "currency", primary: true }),
        result("maaned", "Månedslønn", aar / 12, { kind: "currency" }),
        result("time", "Timelønn", aar / aarstimer, {
          kind: "currency",
          digits: 2,
        }),
      ];
    },
  },
  {
    slug: "inflasjon",
    title: "Inflasjon og kroneverdi",
    description:
      "Se hva et beløp er verdt etter inflasjon, eller hva som trengs for å beholde kjøpekraften.",
    category: "okonomi",
    tags: ["inflasjon", "kpi", "penger"],
    fields: [
      {
        id: "belop",
        label: "Beløp i dag",
        type: "number",
        unit: "kr",
        defaultValue: 10000,
      },
      {
        id: "sats",
        label: "Årlig inflasjon",
        type: "number",
        unit: "%",
        defaultValue: 2.5,
        step: 0.1,
      },
      {
        id: "aar",
        label: "Antall år",
        type: "number",
        unit: "år",
        defaultValue: 10,
      },
    ],
    formula: "verdi = beløp / (1 + i)^n     behov = beløp · (1 + i)^n",
    explanation:
      "Inflasjon svekker kjøpekraften. Hvis prisene stiger med i per år, må du ha beløp · (1 + i)^n om n år for å kjøpe det samme.",
    compute(input) {
      const belop = num(input, "belop");
      const sats = num(input, "sats");
      const aar = num(input, "aar");
      if (!allNumbers([belop, sats, aar])) return [];
      const faktor = Math.pow(1 + sats / 100, aar);
      return [
        result("behov", "Trengs om n år for samme kjøpekraft", belop * faktor, {
          kind: "currency",
          primary: true,
        }),
        result("verdi", "Dagens beløp er da verdt", belop / faktor, {
          kind: "currency",
        }),
      ];
    },
  },
  {
    slug: "tips",
    title: "Tips og deling av regning",
    description: "Legg på tips og del restaurregningen mellom flere.",
    category: "okonomi",
    tags: ["tips", "restaurant", "deling"],
    fields: [
      {
        id: "regning",
        label: "Regning",
        type: "number",
        unit: "kr",
        defaultValue: 840,
      },
      {
        id: "tips",
        label: "Tips",
        type: "number",
        unit: "%",
        defaultValue: 10,
      },
      {
        id: "personer",
        label: "Antall personer",
        type: "number",
        defaultValue: 4,
      },
    ],
    formula: "per person = (regning · (1 + tips)) / n",
    explanation:
      "Tips er frivillig i Norge. 10 % er et vanlig utgangspunkt på restaurant hvis servicen var god.",
    compute(input) {
      const regning = num(input, "regning");
      const tips = num(input, "tips");
      const personer = num(input, "personer");
      if (!allNumbers([regning, tips, personer]) || personer <= 0) return [];
      const tipsBelop = regning * (tips / 100);
      const total = regning + tipsBelop;
      return [
        result("per", "Per person", total / personer, {
          kind: "currency",
          digits: 2,
          primary: true,
        }),
        result("tips", "Tips totalt", tipsBelop, { kind: "currency", digits: 2 }),
        result("total", "Å betale totalt", total, { kind: "currency", digits: 2 }),
      ];
    },
  },
  {
    slug: "avkastning",
    title: "Avkastning (ROI)",
    description: "Regn ut gevinst og avkastning i prosent på en investering.",
    category: "okonomi",
    tags: ["roi", "investering", "gevinst"],
    fields: [
      {
        id: "investert",
        label: "Investert",
        type: "number",
        unit: "kr",
        defaultValue: 100000,
      },
      {
        id: "verdi",
        label: "Verdi nå / solgt for",
        type: "number",
        unit: "kr",
        defaultValue: 128000,
      },
    ],
    formula: "ROI = (verdi − investert) / investert · 100 %",
    explanation:
      "Return on investment viser gevinst i forhold til innsatsen. Positiv ROI er fortjeneste, negativ er tap.",
    compute(input) {
      const investert = num(input, "investert");
      const verdi = num(input, "verdi");
      if (!allNumbers([investert, verdi]) || investert === 0) return [];
      const gevinst = verdi - investert;
      return [
        result("roi", "Avkastning", (gevinst / investert) * 100, {
          kind: "percent",
          primary: true,
        }),
        result("gevinst", "Gevinst / tap", gevinst, { kind: "currency" }),
      ];
    },
  },
  {
    slug: "nedbetaling-gjeld",
    title: "Nedbetaling av gjeld",
    description:
      "Finn hvor lang tid det tar å bli gjeldfri med et fast månedsbeløp.",
    category: "okonomi",
    tags: ["gjeld", "kredittkort", "avdrag"],
    fields: [
      {
        id: "gjeld",
        label: "Gjeldsbeløp",
        type: "number",
        unit: "kr",
        defaultValue: 80000,
      },
      {
        id: "rente",
        label: "Årlig rente",
        type: "number",
        unit: "%",
        defaultValue: 19.9,
        step: 0.1,
      },
      {
        id: "betaling",
        label: "Månedlig betaling",
        type: "number",
        unit: "kr",
        defaultValue: 2500,
      },
    ],
    formula: "n = ln(PMT / (PMT − P · r)) / ln(1 + r)",
    explanation:
      "Hvis månedsbetalingen bare dekker rentene, synker ikke gjelden. Formelen gir antall måneder for et fast beløp på et lån med renter.",
    compute(input) {
      const P = num(input, "gjeld");
      const rente = num(input, "rente");
      const PMT = num(input, "betaling");
      if (!allNumbers([P, rente, PMT]) || P <= 0 || PMT <= 0) return [];
      const r = rente / 100 / 12;
      if (r > 0 && PMT <= P * r) {
        return [
          result(
            "status",
            "Status",
            "Betalingen dekker ikke rentene. Gjelden vil øke.",
            { kind: "text", primary: true },
          ),
          result("min", "Minstebeløp for å holde stand", P * r, {
            kind: "currency",
            digits: 0,
          }),
        ];
      }
      const n =
        r === 0
          ? P / PMT
          : Math.log(PMT / (PMT - P * r)) / Math.log(1 + r);
      const total = PMT * n;
      return [
        result("tid", "Tid til gjeldfri", n, {
          digits: 1,
          unit: "måneder",
          primary: true,
        }),
        result("aar", "I år", n / 12, { digits: 1, unit: "år" }),
        result("renter", "Renter totalt", total - P, { kind: "currency" }),
      ];
    },
  },
  {
    slug: "budsjett-50-30-20",
    title: "50/30/20-budsjett",
    description:
      "Del inntekten i behov (50 %), ønsker (30 %) og sparing (20 %).",
    category: "okonomi",
    tags: ["budsjett", "sparing", "økonomi"],
    fields: [
      {
        id: "inntekt",
        label: "Netto månedsinntekt",
        type: "number",
        unit: "kr",
        defaultValue: 38000,
      },
    ],
    formula: "behov = 0,50 · I    ønsker = 0,30 · I    sparing = 0,20 · I",
    explanation:
      "Tommelfingerregelen 50/30/20 er et utgangspunkt, ikke en lov. Bolig i Norge spiser ofte mer enn 50 % – da kan du justere fordelingen.",
    compute(input) {
      const inntekt = num(input, "inntekt");
      if (!Number.isFinite(inntekt) || inntekt < 0) return [];
      return [
        result("behov", "Behov (50 %)", inntekt * 0.5, {
          kind: "currency",
          primary: true,
        }),
        result("onsker", "Ønsker (30 %)", inntekt * 0.3, { kind: "currency" }),
        result("sparing", "Sparing (20 %)", inntekt * 0.2, { kind: "currency" }),
      ];
    },
  },
  {
    slug: "brutto-netto",
    title: "Fra brutto til utbetalt",
    description:
      "Et enkelt overslag: trekk skattetrekk og andre faste trekk fra bruttolønn.",
    category: "okonomi",
    tags: ["lønn", "skatt", "netto"],
    fields: [
      {
        id: "brutto",
        label: "Brutto månedsinntekt",
        type: "number",
        unit: "kr",
        defaultValue: 52000,
      },
      {
        id: "skatt",
        label: "Skattetrekk",
        type: "number",
        unit: "%",
        defaultValue: 25,
      },
      {
        id: "andre",
        label: "Andre trekk",
        type: "number",
        unit: "kr",
        defaultValue: 400,
        hint: "Fagforening, pensjon, forsikring m.m.",
      },
    ],
    formula: "netto = brutto · (1 − skatt) − andre trekk",
    explanation:
      "Norsk skatt avhenger av tabellkort, trinnskatt, trygdeavgift og fradrag. Her oppgir du trekkprosenten selv, slik at du får et ærlig overslag uten å late som vi er Skatteetaten.",
    disclaimer:
      "Dette er ikke en offisiell skattekalkulator. Bruk Skatteetaten for nøyaktig forskuddstrekk.",
    compute(input) {
      const brutto = num(input, "brutto");
      const skatt = num(input, "skatt");
      const andre = num(input, "andre");
      if (!allNumbers([brutto, skatt, andre])) return [];
      const trekk = brutto * (skatt / 100);
      const netto = brutto - trekk - andre;
      return [
        result("netto", "Utbetalt", netto, { kind: "currency", primary: true }),
        result("skatt", "Skattetrekk", trekk, { kind: "currency" }),
        result("totaltrekk", "Trekk totalt", trekk + andre, { kind: "currency" }),
      ];
    },
  },
];

function formatPlain(n: number): string {
  return new Intl.NumberFormat("nb-NO", { maximumFractionDigits: 4 }).format(n);
}
