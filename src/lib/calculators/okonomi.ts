import type { Calculator } from "../types";
import { effectiveLoanRate } from "../finance";
import { num } from "../format";
import { allNumbers, result } from "../helpers";
import { reg, regPercent } from "../regulations";

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
    faqs: [
      {
        question: "Er gebyrer med i beregningen?",
        answer:
          "Nei. Månedlig beløp er ren avdrag og renter etter annuitetsformelen, uten etablerings- eller termingebyrer.",
      },
      {
        question: "Brukes nominell eller effektiv rente?",
        answer:
          "Du legger inn nominell årsrente. For sammenligning med bankens effektive rente, bruk effektiv-rente-kalkulatoren.",
      },
      {
        question: "Hvorfor går mest til renter i starten?",
        answer:
          "Terminbeløpet er likt hver måned, men renten beregnes av restgjelden. Når gjelden er høy, er renteandelen stor.",
      },
    ],
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
      "Regn ut feriepenger av feriepengegrunnlaget med riktig sats etter ferielengde og alder.",
    category: "okonomi",
    tags: ["lønn", "ferie", "arbeid", "feriepenger"],
    source: {
      label: "Arbeidstilsynet",
      url: "https://www.arbeidstilsynet.no/arbeidstid-og-organisering/ferie/feriepenger/",
      reviewedAt: "2026-08-28",
    },
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
          { value: "10.2", label: "10,2 % – lovens minimum (4 uker + 1 dag)" },
          { value: "12", label: "12 % – fem ukers ferie (avtale/tariff)" },
          { value: "12.5", label: "12,5 % – over 60 år, lovens ferie" },
          { value: "14.3", label: "14,3 % – over 60 år, fem ukers ferie" },
        ],
      },
    ],
    formula: "feriepenger = grunnlag · sats",
    explanation:
      "Feriepenger opptjenes året før de utbetales. Satsen avhenger av ferielengde og om du er over 60 år – ikke bare alder alene.",
    disclaimer: "Sjekk arbeidsavtale, tariff og ferieloven for din situasjon.",
    compute(input) {
      const grunnlag = num(input, "grunnlag");
      const sats = num(input, "sats");
      if (!allNumbers([grunnlag, sats])) return [];
      const belop = grunnlag * (sats / 100);
      const labels: Record<string, string> = {
        "10.2": "Lovens minimum",
        "12": "Fem ukers ferie",
        "12.5": "Over 60 år, lovens ferie",
        "14.3": "Over 60 år, fem ukers ferie",
      };
      return [
        result("ferie", "Feriepenger", belop, {
          kind: "currency",
          primary: true,
        }),
        result("sats", "Valgt sats", labels[input.sats ?? "10.2"] ?? `${sats} %`, {
          kind: "text",
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
  {
    slug: "egenkapital-bolig",
    title: "Egenkapital til bolig",
    shortTitle: "Egenkapital",
    description:
      "Finn egenkapital, dokumentavgift og lånebehov ved boligkjøp – med 10 % som hovedregel.",
    category: "okonomi",
    tags: ["bolig", "egenkapital", "dokumentavgift", "lån"],
    popular: true,
    source: {
      label: reg("mortgage_equity_requirement").sourceLabel,
      url: reg("mortgage_equity_requirement").sourceUrl,
      reviewedAt: reg("mortgage_equity_requirement").reviewedAt,
    },
    fields: [
      {
        id: "pris",
        label: "Kjøpesum",
        type: "number",
        unit: "kr",
        defaultValue: 4500000,
      },
      {
        id: "krav",
        label: "Egenkapitalkrav",
        type: "number",
        unit: "%",
        defaultValue: regPercent("mortgage_equity_requirement"),
        hint: "Hovedregel 10 %. Banken kan kreve mer.",
      },
      {
        id: "doktype",
        label: "Dokumentavgift",
        type: "select",
        defaultValue: "selveier",
        options: [
          { value: "selveier", label: "Selveier – 2,5 % av avgiftsgrunnlag" },
          { value: "borettslag", label: "Borettslag – ingen dokumentavgift" },
          { value: "nybygg", label: "Nybygg – eget avgiftsgrunnlag" },
          { value: "egendefinert", label: "Egendefinert avgiftsgrunnlag" },
        ],
      },
      {
        id: "grunnlag",
        label: "Avgiftsgrunnlag",
        type: "number",
        unit: "kr",
        defaultValue: 4500000,
        hint: "Brukes ved nybygg eller egendefinert. Ofte tomteverdi ved nybygg.",
      },
    ],
    formula: "egenkapital = pris · krav     dokumentavgift = sats · avgiftsgrunnlag",
    explanation:
      "Utlånsforskriften krever minst 10 % egenkapital som hovedregel. Banken kan kreve mer, og tilleggssikkerhet kan påvirke. Dokumentavgift beregnes ved overføring av hjemmel – boligtype og avgiftsgrunnlag er viktigere enn bare ny eller brukt.",
    disclaimer:
      "Viser lånebehov, ikke bankens faktiske lånetilbud. Fellesgjeld, omkostninger og megler er ikke med.",
    compute(input) {
      const pris = num(input, "pris");
      const krav = num(input, "krav");
      if (!allNumbers([pris, krav]) || pris <= 0) return [];
      const ek = pris * (krav / 100);
      let dokGrunnlag = pris;
      let dokSats = reg("document_fee_rate").value;
      if (input.doktype === "borettslag") {
        dokSats = 0;
      } else if (input.doktype === "nybygg" || input.doktype === "egendefinert") {
        const g = num(input, "grunnlag");
        dokGrunnlag = Number.isFinite(g) && g > 0 ? g : pris;
      }
      const dok = dokGrunnlag * dokSats;
      const lan = pris - ek;
      return [
        result("ek", "Egenkapital", ek, { kind: "currency", primary: true }),
        result("lan", "Lånebehov", lan, {
          kind: "currency",
          hint: "Kjøpesum minus egenkapital – ikke bankens maks lån",
        }),
        result("dok", "Dokumentavgift", dok, { kind: "currency" }),
        result("kontant", "Kontantbehov (EK + dok.)", ek + dok, {
          kind: "currency",
        }),
      ];
    },
  },
  {
    slug: "serielan",
    title: "Serielån",
    description:
      "Regn ut første og siste termin, avdrag og renter for et serielån.",
    category: "okonomi",
    tags: ["lån", "serielån", "avdrag"],
    fields: [
      {
        id: "belop",
        label: "Lånebeløp",
        type: "number",
        unit: "kr",
        defaultValue: 2000000,
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
        defaultValue: 20,
      },
    ],
    formula: "avdrag = P / n     termin = avdrag + restgjeld · r",
    explanation:
      "I et serielån er avdraget fast, mens rentene synker når restgjelden synker. Første termin er høyest, siste er lavest. n er antall måneder, r er månedlig rente.",
    compute(input) {
      const P = num(input, "belop");
      const rente = num(input, "rente");
      const aar = num(input, "aar");
      if (!allNumbers([P, rente, aar]) || P <= 0 || aar <= 0) return [];
      const n = aar * 12;
      const r = rente / 100 / 12;
      const avdrag = P / n;
      const forste = avdrag + P * r;
      const siste = avdrag + avdrag * r;
      const totalRenter = (r * n * (2 * P - (n - 1) * avdrag)) / 2;
      return [
        result("forste", "Første termin", forste, {
          kind: "currency",
          primary: true,
        }),
        result("siste", "Siste termin", siste, { kind: "currency" }),
        result("avdrag", "Faste avdrag", avdrag, { kind: "currency" }),
        result("renter", "Totale renter", totalRenter, { kind: "currency" }),
        result("total", "Totalt tilbakebetalt", P + totalRenter, {
          kind: "currency",
        }),
      ];
    },
  },
  {
    slug: "valuta",
    title: "Valutakalkulator",
    description: "Regn om mellom valuta og norske kroner når du kjenner kursen.",
    category: "okonomi",
    tags: ["valuta", "kurs", "nok", "reise"],
    fields: [
      {
        id: "belop",
        label: "Beløp",
        type: "number",
        defaultValue: 100,
      },
      {
        id: "kurs",
        label: "Kurs (kroner per 1 utenlandsk enhet)",
        type: "number",
        defaultValue: 11.5,
        step: 0.01,
        hint: "For eksempel 11,50 hvis 1 euro koster 11,50 kr.",
      },
      {
        id: "retning",
        label: "Retning",
        type: "select",
        defaultValue: "til_nok",
        options: [
          { value: "til_nok", label: "Fra utenlandsk valuta til kroner" },
          { value: "fra_nok", label: "Fra kroner til utenlandsk valuta" },
        ],
      },
    ],
    formula: "NOK = beløp · kurs     valuta = NOK / kurs",
    explanation:
      "Banken viser ofte «kroner per 1 euro/dollar». Vekslekursen du får i kasse eller app inkluderer vanligvis margin. Oppgi den kursen du faktisk får.",
    compute(input) {
      const belop = num(input, "belop");
      const kurs = num(input, "kurs");
      if (!allNumbers([belop, kurs]) || kurs <= 0) return [];
      const nok = input.retning === "fra_nok" ? belop : belop * kurs;
      const fx = input.retning === "fra_nok" ? belop / kurs : belop;
      return [
        result("hoved", input.retning === "fra_nok" ? "Utenlandsk beløp" : "I kroner", 
          input.retning === "fra_nok" ? fx : nok, {
          digits: 2,
          primary: true,
        }),
        result("motsatt", input.retning === "fra_nok" ? "I kroner" : "Utenlandsk beløp",
          input.retning === "fra_nok" ? nok : fx, { digits: 2 }),
      ];
    },
  },
  {
    slug: "timepris-frilans",
    title: "Timepris for frilans",
    description:
      "Finn ut hvilken timepris du trenger for å sitte igjen med et ønsket beløp.",
    category: "okonomi",
    tags: ["frilans", "timepris", "honorar", "næring"],
    fields: [
      {
        id: "netto",
        label: "Ønsket utbetalt per år",
        type: "number",
        unit: "kr",
        defaultValue: 500000,
      },
      {
        id: "skatt",
        label: "Skatt og avgifter",
        type: "number",
        unit: "%",
        defaultValue: 35,
      },
      {
        id: "timer",
        label: "Timer per uke",
        type: "number",
        defaultValue: 30,
      },
      {
        id: "ferie",
        label: "Ferieuker",
        type: "number",
        defaultValue: 5,
      },
      {
        id: "utnyttelse",
        label: "Fakturerbar andel",
        type: "number",
        unit: "%",
        defaultValue: 70,
        hint: "Resten går til administrasjon, salg og avbrekk.",
      },
    ],
    formula: "timepris = (netto / (1 − skatt)) / (uker · timer · utnyttelse)",
    explanation:
      "Frilansere fakturerer sjelden alle arbeidstimene. Her regnes bruttobehov fra ønsket netto, fordelt på fakturerbare timer i året.",
    disclaimer: "Ikke skatteråd. MVA, pensjon og sykepenger kommer i tillegg.",
    compute(input) {
      const netto = num(input, "netto");
      const skatt = num(input, "skatt");
      const timer = num(input, "timer");
      const ferie = num(input, "ferie");
      const utn = num(input, "utnyttelse");
      if (!allNumbers([netto, skatt, timer, ferie, utn]) || skatt >= 100) return [];
      const uker = 52 - ferie;
      const fakturerbart = uker * timer * (utn / 100);
      if (fakturerbart <= 0) return [];
      const brutto = netto / (1 - skatt / 100);
      const timepris = brutto / fakturerbart;
      return [
        result("time", "Nødvendig timepris", timepris, {
          kind: "currency",
          primary: true,
        }),
        result("brutto", "Brutto årsbehov", brutto, { kind: "currency" }),
        result("timer", "Fakturerbare timer", fakturerbart, {
          digits: 0,
          unit: "t",
        }),
      ];
    },
  },
  {
    slug: "nodfond",
    title: "Nødfond",
    description: "Hvor stort buffer bør du ha for tre til seks måneders utgifter?",
    category: "okonomi",
    tags: ["buffer", "sparing", "budsjett", "nødfond"],
    fields: [
      {
        id: "utgifter",
        label: "Faste utgifter per måned",
        type: "number",
        unit: "kr",
        defaultValue: 28000,
      },
      {
        id: "maaneder",
        label: "Antall måneder",
        type: "number",
        defaultValue: 3,
        hint: "Vanlig råd er 3–6 måneder.",
      },
    ],
    formula: "nødfond = månedlige utgifter · måneder",
    explanation:
      "Et nødfond skal dekke husleie, mat, strøm og andre faste utgifter hvis inntekten svikter. Tre måneder er et vanlig startmål, seks måneder gir mer ro.",
    compute(input) {
      const utgifter = num(input, "utgifter");
      const maaneder = num(input, "maaneder");
      if (!allNumbers([utgifter, maaneder]) || maaneder < 0) return [];
      return [
        result("fond", "Anbefalt fond", utgifter * maaneder, {
          kind: "currency",
          primary: true,
        }),
        result("halvaar", "For 6 måneder", utgifter * 6, { kind: "currency" }),
      ];
    },
  },
  {
    slug: "kredittkort-renter",
    title: "Kredittkort-renter",
    description:
      "Se neste måneds renter og hvor lang tid det tar å betale ned kortgjelden.",
    category: "okonomi",
    tags: ["kredittkort", "renter", "gjeld"],
    fields: [
      {
        id: "saldo",
        label: "Saldo",
        type: "number",
        unit: "kr",
        defaultValue: 25000,
      },
      {
        id: "rente",
        label: "Effektiv årsrente",
        type: "number",
        unit: "%",
        defaultValue: 22,
      },
      {
        id: "betaling",
        label: "Fast månedlig betaling",
        type: "number",
        unit: "kr",
        defaultValue: 1500,
      },
    ],
    formula: "n = ln(PMT / (PMT − r · S)) / ln(1 + r)",
    explanation:
      "r er månedlig rente. Hvis betalingen bare dekker rentene, synker ikke saldoen. Små ekstra innbetalinger kutter tiden mye når renten er høy.",
    compute(input) {
      const S = num(input, "saldo");
      const rente = num(input, "rente");
      const pmt = num(input, "betaling");
      if (!allNumbers([S, rente, pmt]) || S <= 0) return [];
      const r = rente / 100 / 12;
      const nesteRente = S * r;
      if (pmt <= nesteRente + 1e-9) {
        return [
          result("rente", "Renter neste måned", nesteRente, {
            kind: "currency",
            primary: true,
          }),
          result("status", "Nedbetaling", "Betalingen dekker ikke rentene.", {
            kind: "text",
          }),
        ];
      }
      const n = Math.log(pmt / (pmt - r * S)) / Math.log(1 + r);
      const total = pmt * n;
      return [
        result("maaneder", "Tid til nedbetalt", n, {
          digits: 1,
          unit: "måneder",
          primary: true,
        }),
        result("rente", "Renter neste måned", nesteRente, { kind: "currency" }),
        result("totalt", "Totalt innbetalt", total, { kind: "currency" }),
        result("kost", "Renter totalt", total - S, { kind: "currency" }),
      ];
    },
  },
  {
    slug: "regel-72",
    title: "Regel 72",
    description:
      "Anslå hvor mange år det tar før pengene dobles ved gitt årlig avkastning.",
    category: "okonomi",
    tags: ["sparing", "dobling", "avkastning", "tommelfingerregel"],
    popular: true,
    fields: [
      {
        id: "rente",
        label: "Årlig avkastning",
        type: "number",
        unit: "%",
        defaultValue: 7,
        step: 0.1,
      },
      {
        id: "belop",
        label: "Startbeløp (valgfritt)",
        type: "number",
        unit: "kr",
        defaultValue: 100000,
      },
    ],
    formula: "år ≈ 72 / r",
    explanation:
      "Regel 72 er en rask tilnærming for rentes rente. Ved 6 % tar det ca. 12 år å doble. Nøyaktig tid er ln(2)/ln(1+r).",
    compute(input) {
      const rente = num(input, "rente");
      const belop = num(input, "belop");
      if (!Number.isFinite(rente) || rente <= 0) return [];
      const approx = 72 / rente;
      const exact = Math.log(2) / Math.log(1 + rente / 100);
      const out = [
        result("aar", "År til dobling (regel 72)", approx, {
          digits: 1,
          unit: "år",
          primary: true,
        }),
        result("eksakt", "Nøyaktig tid", exact, { digits: 2, unit: "år" }),
      ];
      if (Number.isFinite(belop) && belop > 0) {
        out.push(
          result("dobbelt", "Dobbelt beløp", belop * 2, { kind: "currency" }),
        );
      }
      return out;
    },
  },
  {
    slug: "bsu",
    title: "BSU-kalkulator",
    shortTitle: "BSU",
    description:
      "Regn ut skattefradrag, total sparing og renter på BSU med årlige innskudd.",
    category: "okonomi",
    tags: ["bsu", "boligsparing", "skatt", "ungdom"],
    popular: true,
    fields: [
      {
        id: "innskudd",
        label: "Årlig innskudd",
        type: "number",
        unit: "kr",
        defaultValue: reg("bsu_annual_limit").value,
        hint: `Maks er vanligvis ${reg("bsu_annual_limit").value.toLocaleString("nb-NO")} kr per år.`,
      },
      {
        id: "aar",
        label: "Antall år",
        type: "number",
        unit: "år",
        defaultValue: 8,
      },
      {
        id: "rente",
        label: "Årlig rente",
        type: "number",
        unit: "%",
        defaultValue: 4.5,
        step: 0.1,
      },
      {
        id: "fradrag",
        label: "Skattefradrag av innskudd",
        type: "number",
        unit: "%",
        defaultValue: regPercent("bsu_tax_deduction"),
        hint: `Sjekk gjeldende sats hos Skatteetaten (ofte ${regPercent("bsu_tax_deduction")} %).`,
      },
      {
        id: "tak",
        label: "Totaltaket på BSU",
        type: "number",
        unit: "kr",
        defaultValue: reg("bsu_total_limit").value,
      },
    ],
    formula: "skattefordel = innskudd · sats     slutt ≈ innskudd · ((1+r)ⁿ − 1) / r",
    explanation:
      "BSU har årlige og totale tak. Skattefradraget beregnes av årets innskudd. Renteanslaget forutsetter innskudd ved starten av hvert år.",
    disclaimer:
      "Regler for BSU, alder og skattefradrag endres. Sjekk bank og Skatteetaten. Ikke skatteråd.",
    compute(input) {
      const innskudd = num(input, "innskudd");
      const aar = num(input, "aar");
      const rente = num(input, "rente");
      const fradrag = num(input, "fradrag");
      const tak = num(input, "tak");
      if (!allNumbers([innskudd, aar, rente, fradrag, tak]) || aar <= 0) {
        return [];
      }
      const years = Math.min(Math.floor(aar), 99);
      let saldo = 0;
      let innskutt = 0;
      let skatteTot = 0;
      const r = rente / 100;
      for (let i = 0; i < years; i++) {
        const room = Math.max(0, tak - saldo);
        const dep = Math.min(innskudd, room);
        if (dep <= 0) break;
        saldo = (saldo + dep) * (1 + r);
        innskutt += dep;
        skatteTot += dep * (fradrag / 100);
      }
      return [
        result("slutt", "Estimert saldo", saldo, {
          kind: "currency",
          primary: true,
        }),
        result("innskutt", "Totalt innskutt", innskutt, { kind: "currency" }),
        result("renter", "Renter totalt", saldo - innskutt, {
          kind: "currency",
        }),
        result("skatt", "Skattefradrag totalt", skatteTot, {
          kind: "currency",
        }),
        result("effekt", "Saldo + skattefordel", saldo + skatteTot, {
          kind: "currency",
        }),
      ];
    },
  },
  {
    slug: "million-sparing",
    title: "Millionkalkulator",
    shortTitle: "1 million",
    description:
      "Finn tid, månedlig sparing eller nødvendig avkastning for å nå et sparemål.",
    category: "okonomi",
    tags: ["million", "sparing", "mål", "fond"],
    popular: true,
    fields: [
      {
        id: "mal",
        label: "Sparemål",
        type: "number",
        unit: "kr",
        defaultValue: 1000000,
      },
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
        defaultValue: 5000,
      },
      {
        id: "rente",
        label: "Årlig avkastning",
        type: "number",
        unit: "%",
        defaultValue: 7,
        step: 0.1,
      },
    ],
    formula: "FV = P(1+r)ⁿ + PMT · ((1+r)ⁿ − 1) / r",
    explanation:
      "Kalkulatoren løser for antall måneder til målet nås med startbeløp, faste innskudd og rentes rente.",
    compute(input) {
      const mal = num(input, "mal");
      const start = num(input, "start");
      const pmt = num(input, "maaned");
      const rente = num(input, "rente");
      if (!allNumbers([mal, start, pmt, rente]) || mal <= 0) return [];
      if (start >= mal) {
        return [
          result("status", "Status", "Du har allerede nådd målet.", {
            kind: "text",
            primary: true,
          }),
        ];
      }
      const r = rente / 100 / 12;
      let n: number;
      if (r === 0) {
        if (pmt <= 0) return [];
        n = (mal - start) / pmt;
      } else {
        // mal = start*(1+r)^n + pmt*((1+r)^n - 1)/r
        // (mal + pmt/r) = (start + pmt/r)*(1+r)^n
        const a = start + pmt / r;
        const b = mal + pmt / r;
        if (a <= 0 || b / a <= 0) return [];
        n = Math.log(b / a) / Math.log(1 + r);
      }
      if (!Number.isFinite(n) || n < 0) {
        return [
          result(
            "status",
            "Status",
            "Med denne avkastningen og sparing nås ikke målet.",
            { kind: "text", primary: true },
          ),
        ];
      }
      const innskutt = start + pmt * n;
      return [
        result("tid", "Tid til mål", n, {
          digits: 1,
          unit: "måneder",
          primary: true,
        }),
        result("aar", "I år", n / 12, { digits: 1, unit: "år" }),
        result("innskutt", "Totalt innskutt", innskutt, { kind: "currency" }),
        result("gevinst", "Avkastning underveis", mal - innskutt, {
          kind: "currency",
        }),
      ];
    },
  },
  {
    slug: "effektiv-rente",
    title: "Effektiv rente",
    description:
      "Beregn effektiv årsrente på lån med gebyrer, basert på faktiske kontantstrømmer.",
    category: "okonomi",
    tags: ["rente", "effektiv", "nominell", "lån", "gebyr"],
    source: {
      label: "Forbrukerrådet",
      url: "https://storage02.forbrukerradet.no/media/2025/03/forbrukerradet-pakket-og-uklart.pdf",
      reviewedAt: "2026-08-28",
    },
    fields: [
      {
        id: "belop",
        label: "Lånebeløp",
        type: "number",
        unit: "kr",
        defaultValue: 2000000,
      },
      {
        id: "nominell",
        label: "Nominell årsrente",
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
      {
        id: "terminer",
        label: "Terminer per år",
        type: "select",
        defaultValue: "12",
        options: [
          { value: "12", label: "12 (månedlig)" },
          { value: "4", label: "4 (kvartal)" },
        ],
      },
      {
        id: "etablering",
        label: "Etableringsgebyr",
        type: "number",
        unit: "kr",
        defaultValue: 3000,
      },
      {
        id: "termin",
        label: "Termingebyr",
        type: "number",
        unit: "kr",
        defaultValue: 70,
        hint: "Per termin, i tillegg til avdrag og renter.",
      },
    ],
    formula: "IRR fra kontantstrømmer → effektiv årsrente",
    explanation:
      "Effektiv rente tar hensyn til når gebyrer betales og hvor ofte renten kapitaliseres. Dette er nærmere det banken oppgir enn ren omregning av nominell rente.",
    disclaimer:
      "Forenklet modell uten forsikring, avdragsfrihet eller renteendringer. Sammenlign med bankens oppgitte effektiv rente.",
    compute(input) {
      const belop = num(input, "belop");
      const nominell = num(input, "nominell");
      const aar = num(input, "aar");
      const etablering = num(input, "etablering");
      const termingebyr = num(input, "termin");
      const m = Number(input.terminer) || 12;
      if (
        !allNumbers([belop, nominell, aar, etablering, termingebyr]) ||
        belop <= 0 ||
        aar <= 0
      ) {
        return [];
      }
      const eff = effectiveLoanRate({
        principal: belop,
        annualRatePercent: nominell,
        years: aar,
        periodsPerYear: m,
        establishmentFee: etablering,
        termFee: termingebyr,
      });
      const nominellEff =
        (Math.pow(1 + nominell / 100 / m, m) - 1) * 100;
      return [
        result("eff", "Effektiv årsrente", eff, {
          kind: "percent",
          digits: 3,
          primary: true,
        }),
        result("nom", "Nominell (uten gebyrer)", nominellEff, {
          kind: "percent",
          digits: 3,
          hint: "Kun rentes rente, uten gebyrer",
        }),
      ];
    },
  },
  {
    slug: "cagr",
    title: "Årlig gjennomsnittlig avkastning (CAGR)",
    shortTitle: "CAGR",
    description:
      "Finn den jevne årlige vekstraten mellom startverdi og sluttverdi.",
    category: "okonomi",
    tags: ["cagr", "avkastning", "fond", "investering"],
    fields: [
      {
        id: "start",
        label: "Startverdi",
        type: "number",
        unit: "kr",
        defaultValue: 100000,
      },
      {
        id: "slutt",
        label: "Sluttverdi",
        type: "number",
        unit: "kr",
        defaultValue: 180000,
      },
      {
        id: "aar",
        label: "Antall år",
        type: "number",
        unit: "år",
        defaultValue: 7,
        step: 0.1,
      },
    ],
    formula: "CAGR = (slutt / start)^(1/n) − 1",
    explanation:
      "CAGR glatter ut svingninger og viser hvilken fast årlig rente som ville gitt samme resultat.",
    compute(input) {
      const start = num(input, "start");
      const slutt = num(input, "slutt");
      const aar = num(input, "aar");
      if (!allNumbers([start, slutt, aar]) || start <= 0 || aar <= 0) return [];
      const cagr = (Math.pow(slutt / start, 1 / aar) - 1) * 100;
      return [
        result("cagr", "CAGR", cagr, {
          kind: "percent",
          digits: 2,
          primary: true,
        }),
        result("total", "Total avkastning", ((slutt - start) / start) * 100, {
          kind: "percent",
          digits: 2,
        }),
        result("gevinst", "Gevinst / tap", slutt - start, { kind: "currency" }),
      ];
    },
  },
  {
    slug: "leieavkastning",
    title: "Leieavkastning",
    description:
      "Regn ut brutto og netto leieavkastning for en utleiebolig.",
    category: "okonomi",
    tags: ["utleie", "yield", "bolig", "avkastning"],
    fields: [
      {
        id: "pris",
        label: "Kjøpspris / verdi",
        type: "number",
        unit: "kr",
        defaultValue: 3500000,
      },
      {
        id: "leie",
        label: "Månedlig leie",
        type: "number",
        unit: "kr",
        defaultValue: 16000,
      },
      {
        id: "kostnader",
        label: "Årlige driftskostnader",
        type: "number",
        unit: "kr",
        defaultValue: 35000,
        hint: "Felleskostnader, forsikring, vedlikehold, kommunale avgifter m.m.",
      },
    ],
    formula: "brutto = (12 · leie) / pris     netto = (12 · leie − kostnader) / pris",
    explanation:
      "Brutto yield ignorerer kostnader. Netto yield er mer realistisk, men tar ikke hensyn til skatt, tomgang eller verdistigning.",
    disclaimer: "Forenklet modell. Skatt på leieinntekt og finansieringskostnader er ikke med.",
    compute(input) {
      const pris = num(input, "pris");
      const leie = num(input, "leie");
      const kostnader = num(input, "kostnader");
      if (!allNumbers([pris, leie, kostnader]) || pris <= 0) return [];
      const aarLeie = leie * 12;
      const netto = aarLeie - kostnader;
      return [
        result("brutto", "Brutto avkastning", (aarLeie / pris) * 100, {
          kind: "percent",
          digits: 2,
          primary: true,
        }),
        result("netto", "Netto avkastning", (netto / pris) * 100, {
          kind: "percent",
          digits: 2,
        }),
        result("kontant", "Netto årlig kontantstrøm", netto, {
          kind: "currency",
        }),
      ];
    },
  },
  {
    slug: "ekstra-innbetaling-lan",
    title: "Ekstra innbetaling på lån",
    shortTitle: "Ekstra innbetaling",
    description:
      "Se hvor mye du sparer i renter og tid ved å betale ekstra hver måned på et annuitetslån.",
    category: "okonomi",
    tags: ["lån", "ekstraordinært", "avdrag", "renter"],
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
      {
        id: "ekstra",
        label: "Ekstra per måned",
        type: "number",
        unit: "kr",
        defaultValue: 2000,
      },
    ],
    formula: "n = ln(PMT / (PMT − P · r)) / ln(1 + r)",
    explanation:
      "Sammenligner standard annuitet med samme lån pluss ekstra månedlig beløp. Ekstra går til avdrag og kutter rentene.",
    disclaimer: "Forenklet uten gebyrer. Sjekk om banken tillater ekstraordinære innbetalinger uten kostnad.",
    compute(input) {
      const P = num(input, "belop");
      const rente = num(input, "rente");
      const aar = num(input, "aar");
      const ekstra = num(input, "ekstra");
      if (!allNumbers([P, rente, aar, ekstra]) || P <= 0 || aar <= 0) return [];
      const n0 = aar * 12;
      const r = rente / 100 / 12;
      const M =
        r === 0 ? P / n0 : (P * r * Math.pow(1 + r, n0)) / (Math.pow(1 + r, n0) - 1);
      const total0 = M * n0;
      const pmt = M + Math.max(0, ekstra);
      if (r > 0 && pmt <= P * r) {
        return [
          result("status", "Status", "Betalingen dekker ikke rentene.", {
            kind: "text",
            primary: true,
          }),
        ];
      }
      const n1 =
        r === 0
          ? P / pmt
          : Math.log(pmt / (pmt - P * r)) / Math.log(1 + r);
      const total1 = pmt * n1;
      return [
        result("spart", "Sparte renter", total0 - total1, {
          kind: "currency",
          primary: true,
        }),
        result("tid", "Måneder spart", n0 - n1, { digits: 1 }),
        result("nyTid", "Ny nedbetalingstid", n1 / 12, {
          digits: 1,
          unit: "år",
        }),
        result("termin", "Ny månedlig betaling", pmt, { kind: "currency" }),
      ];
    },
  },
  {
    slug: "laneramme",
    title: "Låneramme",
    shortTitle: "Låneramme",
    description:
      "Anslå teoretisk øvre låneramme ut fra inntekt, eksisterende gjeld, egenkapital og belåningsgrad.",
    category: "okonomi",
    tags: ["boliglån", "låneramme", "belåningsgrad", "gjeldsgrad"],
    source: {
      label: reg("mortgage_max_ltv").sourceLabel,
      url: reg("mortgage_max_ltv").sourceUrl,
      reviewedAt: reg("mortgage_max_ltv").reviewedAt,
    },
    fields: [
      {
        id: "inntekt",
        label: "Brutto årsinntekt",
        type: "number",
        unit: "kr",
        defaultValue: 650000,
      },
      {
        id: "gjeld",
        label: "Eksisterende gjeld",
        type: "number",
        unit: "kr",
        defaultValue: 0,
        hint: "Studielån, billån, kredittkort m.m.",
      },
      {
        id: "multipel",
        label: "Maks gjeld / inntekt",
        type: "number",
        defaultValue: reg("debt_income_multiplier").value,
        step: 0.1,
        hint: "Finanstilsynets utgangspunkt er ofte 5 ganger inntekt.",
      },
      {
        id: "ek",
        label: "Egenkapital",
        type: "number",
        unit: "kr",
        defaultValue: 600000,
      },
      {
        id: "belaning",
        label: "Maks belåningsgrad",
        type: "number",
        unit: "%",
        defaultValue: regPercent("mortgage_max_ltv"),
      },
    ],
    formula: "nytt lån ≤ min(inntekt · multipel − gjeld, boligpris · LTV − EK)",
    explanation:
      "Gjeldsgraden gjelder samlet gjeld, ikke bare nytt boliglån. Belåningsgrad begrenser hvor mye du kan låne mot boligens verdi. Banken vurderer også renter, betjeningsevne og livsopphold.",
    disclaimer:
      "Teoretisk øvre ramme – ikke et lånetilbud. Banken kan si nei selv om tallet ser høyt ut.",
    compute(input) {
      const inntekt = num(input, "inntekt");
      const gjeld = num(input, "gjeld");
      const multipel = num(input, "multipel");
      const ek = num(input, "ek");
      const belaning = num(input, "belaning");
      if (
        !allNumbers([inntekt, gjeld, multipel, ek, belaning]) ||
        belaning <= 0
      ) {
        return [];
      }
      const fraInntekt = Math.max(0, inntekt * multipel - gjeld);
      const ltv = belaning / 100;
      const maksVerdiFraEk = ltv < 1 ? ek / (1 - ltv) : ek;
      const lanFraEk = Math.max(0, maksVerdiFraEk - ek);
      const maksLan = Math.min(fraInntekt, lanFraEk);
      const maksBolig = maksLan + ek;
      return [
        result("lan", "Teoretisk øvre låneramme", maksLan, {
          kind: "currency",
          primary: true,
        }),
        result("bolig", "Maks boligpris (lån + EK)", maksBolig, {
          kind: "currency",
        }),
        result("inntektstak", "Rom fra gjeldsgrad", fraInntekt, {
          kind: "currency",
        }),
        result("ektak", "Rom fra egenkapital/LTV", lanFraEk, {
          kind: "currency",
        }),
      ];
    },
  },
  {
    slug: "pris-per-kvm",
    title: "Pris per kvadratmeter",
    shortTitle: "kr/m²",
    description: "Regn ut kvadratmeterpris, eller finn totalpris fra kr/m².",
    category: "okonomi",
    tags: ["bolig", "kvm", "kvadratmeter", "pris"],
    fields: [
      {
        id: "retning",
        label: "Jeg vil",
        type: "select",
        defaultValue: "per_kvm",
        options: [
          { value: "per_kvm", label: "Finne pris per m²" },
          { value: "total", label: "Finne totalpris" },
        ],
      },
      {
        id: "pris",
        label: "Totalpris",
        type: "number",
        unit: "kr",
        defaultValue: 4500000,
      },
      {
        id: "kvm",
        label: "Areal",
        type: "number",
        unit: "m²",
        defaultValue: 78,
      },
      {
        id: "kvmpris",
        label: "Pris per m²",
        type: "number",
        unit: "kr",
        defaultValue: 55000,
      },
    ],
    formula: "kr/m² = pris / areal     pris = kr/m² · areal",
    explanation:
      "Sammenlign boliger på kvadratmeterpris, men husk planløsning, standard, fellesgjeld og beliggenhet.",
    compute(input) {
      const kvm = num(input, "kvm");
      if (!Number.isFinite(kvm) || kvm <= 0) return [];
      if (input.retning === "total") {
        const kvmpris = num(input, "kvmpris");
        if (!Number.isFinite(kvmpris)) return [];
        return [
          result("total", "Totalpris", kvmpris * kvm, {
            kind: "currency",
            primary: true,
          }),
        ];
      }
      const pris = num(input, "pris");
      if (!Number.isFinite(pris)) return [];
      return [
        result("kvm", "Pris per m²", pris / kvm, {
          kind: "currency",
          digits: 0,
          primary: true,
        }),
      ];
    },
  },
  {
    slug: "annuitet-vs-serie",
    title: "Annuitet vs. serielån",
    shortTitle: "Annuitet vs. serie",
    description:
      "Sammenlign månedlig beløp og totale renter for annuitetslån og serielån.",
    category: "okonomi",
    tags: ["annuitet", "serielån", "sammenligning", "lån"],
    fields: [
      {
        id: "belop",
        label: "Lånebeløp",
        type: "number",
        unit: "kr",
        defaultValue: 2500000,
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
    formula: "annuitet: fast termin     serie: fast avdrag",
    explanation:
      "Serielån koster normalt mindre i renter totalt, men første termin er høyere. Annuitet er jevnere for budsjettet.",
    compute(input) {
      const P = num(input, "belop");
      const rente = num(input, "rente");
      const aar = num(input, "aar");
      if (!allNumbers([P, rente, aar]) || P <= 0 || aar <= 0) return [];
      const n = aar * 12;
      const r = rente / 100 / 12;
      const annM =
        r === 0 ? P / n : (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
      const annTotal = annM * n;
      const avdrag = P / n;
      const serieForste = avdrag + P * r;
      const serieSiste = avdrag + avdrag * r;
      const serieRenter = (r * n * (2 * P - (n - 1) * avdrag)) / 2;
      return [
        result("annM", "Annuitet per måned", annM, {
          kind: "currency",
          primary: true,
        }),
        result("serieF", "Serie første måned", serieForste, {
          kind: "currency",
        }),
        result("serieS", "Serie siste måned", serieSiste, {
          kind: "currency",
        }),
        result("annR", "Renter annuitet", annTotal - P, { kind: "currency" }),
        result("serieR", "Renter serie", serieRenter, { kind: "currency" }),
        result("diff", "Serielån sparer", annTotal - P - serieRenter, {
          kind: "currency",
        }),
      ];
    },
  },
  {
    slug: "lonnsokning",
    title: "Lønnsøkning",
    description:
      "Se ny lønn, økning i kroner og kjøpekraft etter inflasjon.",
    category: "okonomi",
    tags: ["lønn", "økning", "inflasjon", "reallønn"],
    fields: [
      {
        id: "lonn",
        label: "Nåværende årslønn",
        type: "number",
        unit: "kr",
        defaultValue: 550000,
      },
      {
        id: "okning",
        label: "Lønnsøkning",
        type: "number",
        unit: "%",
        defaultValue: 4.5,
        step: 0.1,
      },
      {
        id: "inflasjon",
        label: "Forventet inflasjon",
        type: "number",
        unit: "%",
        defaultValue: 2.5,
        step: 0.1,
      },
    ],
    formula: "ny = gammel · (1 + p)     reelt ≈ p − inflasjon",
    explanation:
      "Nominell økning er det som står i kontrakten. Reell økning trekker fra inflasjonen og sier mer om kjøpekraft.",
    compute(input) {
      const lonn = num(input, "lonn");
      const okning = num(input, "okning");
      const inflasjon = num(input, "inflasjon");
      if (!allNumbers([lonn, okning, inflasjon])) return [];
      const ny = lonn * (1 + okning / 100);
      const reell = ((1 + okning / 100) / (1 + inflasjon / 100) - 1) * 100;
      return [
        result("ny", "Ny årslønn", ny, { kind: "currency", primary: true }),
        result("kroner", "Økning i kroner", ny - lonn, { kind: "currency" }),
        result("maaned", "Ny månedslønn (brutto/12)", ny / 12, {
          kind: "currency",
        }),
        result("reell", "Reell økning", reell, { kind: "percent", digits: 2 }),
      ];
    },
  },
];

function formatPlain(n: number): string {
  return new Intl.NumberFormat("nb-NO", { maximumFractionDigits: 4 }).format(n);
}
