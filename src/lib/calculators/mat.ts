import type { Calculator } from "../types";
import { num } from "../format";
import { allNumbers, createConverter, result } from "../helpers";

export const matCalculators: Calculator[] = [
  {
    slug: "oppskrift",
    title: "Oppskriftsskalering",
    description: "Skaler en oppskrift fra et antall porsjoner til et annet.",
    category: "mat",
    tags: ["oppskrift", "porsjoner", "matlaging"],
    popular: true,
    fields: [
      {
        id: "mengde",
        label: "Mengde i oppskriften",
        type: "number",
        defaultValue: 400,
      },
      {
        id: "fra",
        label: "Porsjoner i oppskriften",
        type: "number",
        defaultValue: 4,
      },
      {
        id: "til",
        label: "Ønskede porsjoner",
        type: "number",
        defaultValue: 6,
      },
    ],
    formula: "ny mengde = gammel · (nye porsjoner / gamle porsjoner)",
    explanation:
      "Alle ingredienser ganges med samme faktor. Krydder og hevemidler kan trenge finjustering – smak og sjekk.",
    compute(input) {
      const mengde = num(input, "mengde");
      const fra = num(input, "fra");
      const til = num(input, "til");
      if (!allNumbers([mengde, fra, til]) || fra === 0) return [];
      const faktor = til / fra;
      return [
        result("ny", "Ny mengde", mengde * faktor, {
          digits: 2,
          primary: true,
        }),
        result("faktor", "Skaleringsfaktor", faktor, { digits: 3 }),
      ];
    },
  },
  createConverter({
    slug: "kokkemal",
    title: "Kjøkkenmål",
    description: "Regn om mellom ts, ss, dl, liter og kopper. Vannbasert (1 ml ≈ 1 g).",
    category: "mat",
    tags: ["ss", "ts", "dl", "mål"],
    defaultFrom: "ss",
    defaultTo: "ml",
    defaultValue: 1,
    formula: "1 ss = 15 ml     1 ts = 5 ml     1 dl = 100 ml",
    explanation:
      "Norske matskjeer er 15 ml og teskjeer 5 ml. En amerikansk cup er 240 ml. For sukker og mel veier 1 ml ikke 1 g.",
    units: [
      { id: "ml", label: "Milliliter (ml)", toBase: 1 },
      { id: "ts", label: "Teskje (ts)", toBase: 5 },
      { id: "ss", label: "Spiseskje (ss)", toBase: 15 },
      { id: "dl", label: "Desiliter (dl)", toBase: 100 },
      { id: "l", label: "Liter (l)", toBase: 1000 },
      { id: "cup", label: "Cup (US)", toBase: 240 },
    ],
  }),
  {
    slug: "gjester",
    title: "Mat til gjester",
    description: "Et grovt anslag på hvor mye mat du trenger til et selskap.",
    category: "mat",
    tags: ["selskap", "porsjoner", "buffet"],
    fields: [
      {
        id: "voksne",
        label: "Voksne",
        type: "number",
        defaultValue: 8,
      },
      {
        id: "barn",
        label: "Barn",
        type: "number",
        defaultValue: 3,
      },
      {
        id: "type",
        label: "Måltid",
        type: "select",
        defaultValue: "middag",
        options: [
          { value: "middag", label: "Middag (varmrett)" },
          { value: "buffet", label: "Buffet / grilling" },
          { value: "kake", label: "Kake og kaffe" },
        ],
      },
    ],
    formula: "porsjoner = voksne + 0,6 · barn, deretter m × porsjonsvekt",
    explanation:
      "Tommelfingerregler: middag ca. 350 g varmrett per voksen, buffet 400 g, kake 120 g. Barn regnes som 60 %.",
    compute(input) {
      const voksne = num(input, "voksne");
      const barn = num(input, "barn");
      if (!allNumbers([voksne, barn])) return [];
      const porsjoner = voksne + 0.6 * barn;
      const per: Record<string, number> = {
        middag: 350,
        buffet: 400,
        kake: 120,
      };
      const gram = porsjoner * (per[input.type] ?? 350);
      return [
        result("gram", "Matmengde", gram / 1000, {
          digits: 2,
          unit: "kg",
          primary: true,
        }),
        result("porsjoner", "Voksenporsjoner", porsjoner, { digits: 1 }),
      ];
    },
  },
  {
    slug: "steketid",
    title: "Steketid kjøtt",
    description: "Grov steketid ut fra vekt og minutter per kilo.",
    category: "mat",
    tags: ["stek", "ovn", "kjøtt"],
    fields: [
      { id: "kg", label: "Vekt", type: "number", unit: "kg", defaultValue: 1.4 },
      {
        id: "min",
        label: "Minutter per kg",
        type: "number",
        defaultValue: 40,
        hint: "Ofte 30–60 min/kg avhengig av stek og ønsket kjerne.",
      },
      {
        id: "hvile",
        label: "Hviletid",
        type: "number",
        unit: "min",
        defaultValue: 15,
      },
    ],
    formula: "tid = vekt · min/kg + hvile",
    explanation:
      "Kjernetemperatur er sikrere enn klokka. Bruk dette som utgangspunkt, og sjekk med steketermometer.",
    compute(input) {
      const kg = num(input, "kg");
      const min = num(input, "min");
      const hvile = num(input, "hvile");
      if (!allNumbers([kg, min, hvile])) return [];
      const stek = kg * min;
      return [
        result("stek", "Steketid", stek, {
          digits: 0,
          unit: "min",
          primary: true,
        }),
        result("total", "Inkl. hvile", stek + hvile, { digits: 0, unit: "min" }),
      ];
    },
  },
  {
    slug: "bakerprosent",
    title: "Bakerprosent",
    description:
      "Regn ut vann, salt og gjær fra melmengden. Melet er alltid 100 %.",
    category: "mat",
    tags: ["baking", "brød", "deig", "prosent"],
    fields: [
      { id: "mel", label: "Mel", type: "number", unit: "g", defaultValue: 500 },
      {
        id: "vann",
        label: "Hydrering",
        type: "number",
        unit: "%",
        defaultValue: 70,
      },
      {
        id: "salt",
        label: "Salt",
        type: "number",
        unit: "%",
        defaultValue: 2,
      },
      {
        id: "gjaer",
        label: "Gjær",
        type: "number",
        unit: "%",
        defaultValue: 1,
        hint: "Tørrgjær ofte 0,5–1 %, fersk gjær omtrent tre ganger så mye.",
      },
    ],
    formula: "ingrediens = mel · prosent / 100",
    explanation:
      "Bakerprosent gjør oppskrifter skalerbare. 70 % hydrering på 500 g mel er 350 g vann. Salt ligger vanligvis rundt 1,8–2,2 %.",
    compute(input) {
      const mel = num(input, "mel");
      const vann = num(input, "vann");
      const salt = num(input, "salt");
      const gjaer = num(input, "gjaer");
      if (!allNumbers([mel, vann, salt, gjaer]) || mel <= 0) return [];
      const vg = (mel * vann) / 100;
      const sg = (mel * salt) / 100;
      const gg = (mel * gjaer) / 100;
      return [
        result("vann", "Vann", vg, { digits: 0, unit: "g", primary: true }),
        result("salt", "Salt", sg, { digits: 1, unit: "g" }),
        result("gjaer", "Gjær", gg, { digits: 1, unit: "g" }),
        result("deig", "Deig totalt", mel + vg + sg + gg, {
          digits: 0,
          unit: "g",
        }),
      ];
    },
  },
  {
    slug: "gjaer",
    title: "Gjæromregning",
    description: "Regn om mellom fersk gjær, aktiv tørrgjær og instant gjær.",
    category: "mat",
    tags: ["gjær", "baking", "brød"],
    fields: [
      {
        id: "mengde",
        label: "Mengde",
        type: "number",
        unit: "g",
        defaultValue: 25,
      },
      {
        id: "fra",
        label: "Jeg har",
        type: "select",
        defaultValue: "fersk",
        options: [
          { value: "fersk", label: "Fersk gjær" },
          { value: "aktiv", label: "Aktiv tørrgjær" },
          { value: "instant", label: "Instant / tørrgjær i pose" },
        ],
      },
    ],
    formula: "fersk : aktiv : instant ≈ 3 : 1,5 : 1",
    explanation:
      "En pose instant gjær er ofte 7 g og tilsvarer grovt 25 g fersk. Forholdet varierer mellom merker. Ikke bytt 1:1 i søte, tunge deiger uten å kjenne etter.",
    compute(input) {
      const m = num(input, "mengde");
      if (!Number.isFinite(m) || m < 0) return [];
      const toInstant: Record<string, number> = {
        fersk: 1 / 3,
        aktiv: 1 / 1.5,
        instant: 1,
      };
      const inst = m * (toInstant[input.fra] ?? 1);
      return [
        result("instant", "Instant gjær", inst, {
          digits: 1,
          unit: "g",
          primary: true,
        }),
        result("aktiv", "Aktiv tørrgjær", inst * 1.5, { digits: 1, unit: "g" }),
        result("fersk", "Fersk gjær", inst * 3, { digits: 1, unit: "g" }),
      ];
    },
  },
  {
    slug: "kaffe-ratio",
    title: "Kaffe-ratio",
    shortTitle: "Kaffe",
    description:
      "Finn kaffe- og vannmengde fra bryggeratio (f.eks. 1:16).",
    category: "mat",
    tags: ["kaffe", "ratio", "brygg", "v60"],
    popular: true,
    fields: [
      {
        id: "modus",
        label: "Jeg kjenner",
        type: "select",
        defaultValue: "kaffe",
        options: [
          { value: "kaffe", label: "Kaffemengde → vann" },
          { value: "vann", label: "Vannmengde → kaffe" },
        ],
      },
      {
        id: "ratio",
        label: "Ratio (1:x)",
        type: "number",
        defaultValue: 16,
        hint: "1:15–1:17 er vanlig for filter. Espresso er helt annerledes.",
      },
      {
        id: "kaffe",
        label: "Kaffe",
        type: "number",
        unit: "g",
        defaultValue: 18,
      },
      {
        id: "vann",
        label: "Vann",
        type: "number",
        unit: "g",
        defaultValue: 300,
      },
    ],
    formula: "vann = kaffe · ratio     kaffe = vann / ratio",
    explanation:
      "Ratio 1:16 betyr 16 g vann per 1 g kaffe. 1 ml vann ≈ 1 g. Juster etter smak og metode.",
    compute(input) {
      const ratio = num(input, "ratio");
      if (!Number.isFinite(ratio) || ratio <= 0) return [];
      if (input.modus === "vann") {
        const vann = num(input, "vann");
        if (!Number.isFinite(vann) || vann <= 0) return [];
        return [
          result("kaffe", "Kaffe", vann / ratio, {
            digits: 1,
            unit: "g",
            primary: true,
          }),
          result("ratio", "Ratio", `1:${ratio}`, { kind: "text" }),
        ];
      }
      const kaffe = num(input, "kaffe");
      if (!Number.isFinite(kaffe) || kaffe <= 0) return [];
      return [
        result("vann", "Vann", kaffe * ratio, {
          digits: 0,
          unit: "g",
          primary: true,
        }),
        result("ml", "Vann (ml)", kaffe * ratio, { digits: 0, unit: "ml" }),
      ];
    },
  },
  {
    slug: "saltlake",
    title: "Saltlake / saltprosent",
    shortTitle: "Saltlake",
    description:
      "Regn ut saltmengde for lake, eller saltprosent i en blanding.",
    category: "mat",
    tags: ["salt", "lake", "brine", "sylting"],
    fields: [
      {
        id: "modus",
        label: "Jeg vil",
        type: "select",
        defaultValue: "salt",
        options: [
          { value: "salt", label: "Finne saltmengde" },
          { value: "prosent", label: "Finne saltprosent" },
        ],
      },
      {
        id: "vaeske",
        label: "Væske",
        type: "number",
        unit: "g",
        defaultValue: 1000,
        hint: "1 liter vann ≈ 1000 g.",
      },
      {
        id: "prosent",
        label: "Ønsket saltprosent",
        type: "number",
        unit: "%",
        defaultValue: 5,
        hint: "Ofte 3–6 % for lake, 2 % for deig.",
      },
      {
        id: "salt",
        label: "Salt",
        type: "number",
        unit: "g",
        defaultValue: 50,
      },
    ],
    formula: "salt = væske · % / 100     % = salt / væske · 100",
    explanation:
      "Prosenten er vektprosent av væsken. Noen regner salt av total (væske+salt) – her er det av væsken.",
    compute(input) {
      const vaeske = num(input, "vaeske");
      if (!Number.isFinite(vaeske) || vaeske <= 0) return [];
      if (input.modus === "prosent") {
        const salt = num(input, "salt");
        if (!Number.isFinite(salt) || salt < 0) return [];
        return [
          result("p", "Saltprosent", (salt / vaeske) * 100, {
            kind: "percent",
            digits: 2,
            primary: true,
          }),
        ];
      }
      const p = num(input, "prosent");
      if (!Number.isFinite(p) || p < 0) return [];
      const salt = (vaeske * p) / 100;
      return [
        result("salt", "Salt", salt, { digits: 1, unit: "g", primary: true }),
        result("total", "Lake totalt", vaeske + salt, { digits: 0, unit: "g" }),
      ];
    },
  },
  {
    slug: "matsvinn",
    title: "Matsvinn / råvekt",
    shortTitle: "Matsvinn",
    description:
      "Regn om mellom råvekt og spiselig vekt med svinnprosent (skrell, bein, fett).",
    category: "mat",
    tags: ["svinn", "råvekt", "porsjon", "innkjøp"],
    fields: [
      {
        id: "modus",
        label: "Jeg vil",
        type: "select",
        defaultValue: "kjope",
        options: [
          { value: "kjope", label: "Finne råvekt å kjøpe" },
          { value: "spiselig", label: "Finne spiselig mengde" },
        ],
      },
      {
        id: "mengde",
        label: "Mengde",
        type: "number",
        unit: "g",
        defaultValue: 500,
      },
      {
        id: "svinn",
        label: "Svinn",
        type: "number",
        unit: "%",
        defaultValue: 20,
        hint: "Potet ca. 20 %, laks med skinn/bein ofte 30–40 %.",
      },
    ],
    formula: "spiselig = rå · (1 − svinn)     rå = spiselig / (1 − svinn)",
    explanation:
      "Svinn er det som kuttes bort. Kjøper du til 400 g spiselig med 20 % svinn, trenger du 500 g råvare.",
    compute(input) {
      const mengde = num(input, "mengde");
      const svinn = num(input, "svinn");
      if (!allNumbers([mengde, svinn]) || svinn >= 100 || svinn < 0) return [];
      const behold = 1 - svinn / 100;
      if (input.modus === "spiselig") {
        return [
          result("spis", "Spiselig mengde", mengde * behold, {
            digits: 0,
            unit: "g",
            primary: true,
          }),
          result("bort", "Svinn", mengde * (svinn / 100), {
            digits: 0,
            unit: "g",
          }),
        ];
      }
      return [
        result("raa", "Råvekt å kjøpe", mengde / behold, {
          digits: 0,
          unit: "g",
          primary: true,
        }),
        result("bort", "Forventet svinn", mengde / behold - mengde, {
          digits: 0,
          unit: "g",
        }),
      ];
    },
  },
  {
    slug: "ovn-temperatur",
    title: "Ovn: vanlig ↔ over-/undervarme",
    shortTitle: "Ovnstemperatur",
    description:
      "Tommelfingerregel for å justere temperatur mellom vanlig ovn og varmluft.",
    category: "mat",
    tags: ["ovn", "varmluft", "temperatur", "baking"],
    fields: [
      {
        id: "retning",
        label: "Fra",
        type: "select",
        defaultValue: "vanlig",
        options: [
          { value: "vanlig", label: "Vanlig / over-undervarme → varmluft" },
          { value: "vifte", label: "Varmluft → vanlig" },
        ],
      },
      {
        id: "temp",
        label: "Temperatur",
        type: "number",
        unit: "°C",
        defaultValue: 200,
      },
    ],
    formula: "varmluft ≈ vanlig − 20 °C",
    explanation:
      "Varmluft sirkulerer og baker ofte fortere/varmere. 20 °C lavere er vanlig råd – sjekk alltid oppskrift og ovn.",
    compute(input) {
      const temp = num(input, "temp");
      if (!Number.isFinite(temp)) return [];
      if (input.retning === "vifte") {
        return [
          result("ny", "Vanlig ovn (ca.)", temp + 20, {
            digits: 0,
            unit: "°C",
            primary: true,
          }),
        ];
      }
      return [
        result("ny", "Varmluft (ca.)", temp - 20, {
          digits: 0,
          unit: "°C",
          primary: true,
        }),
      ];
    },
  },
  {
    slug: "pasta-ris",
    title: "Pasta og ris",
    description: "Anslå tørrvare og vann til pasta eller ris for et antall personer.",
    category: "mat",
    tags: ["pasta", "ris", "porsjon"],
    popular: true,
    fields: [
      {
        id: "type",
        label: "Type",
        type: "select",
        defaultValue: "pasta",
        options: [
          { value: "pasta", label: "Pasta (tørr)" },
          { value: "ris", label: "Ris (tørr)" },
        ],
      },
      {
        id: "personer",
        label: "Personer",
        type: "number",
        defaultValue: 4,
      },
      {
        id: "porsjon",
        label: "Gram per person",
        type: "number",
        unit: "g",
        defaultValue: 100,
        hint: "Pasta ofte 80–100 g, ris 60–80 g tørt som tilbehør.",
      },
    ],
    formula: "tørrvare = personer · g/person     risvann ≈ 1,5–2 × ris",
    explanation:
      "Pasta kokes i rikelig vann. Ris: ca. 1:1,5 til 1:2 vann avhengig av type.",
    compute(input) {
      const personer = num(input, "personer");
      const porsjon = num(input, "porsjon");
      if (!allNumbers([personer, porsjon]) || personer <= 0) return [];
      const torr = personer * porsjon;
      if (input.type === "ris") {
        return [
          result("ris", "Tørr ris", torr, {
            digits: 0,
            unit: "g",
            primary: true,
          }),
          result("vann", "Vann (ca. 1:1,75)", torr * 1.75, {
            digits: 0,
            unit: "ml",
          }),
        ];
      }
      return [
        result("pasta", "Tørr pasta", torr, {
          digits: 0,
          unit: "g",
          primary: true,
        }),
        result("vann", "Kokevann (anslag)", Math.max(2, personer) * 1000, {
          digits: 0,
          unit: "ml",
          hint: "Rikelig vann – minst 1 l per 100 g er vanlig råd.",
        }),
      ];
    },
  },
  {
    slug: "egg-vekt",
    title: "Egg etter vekt",
    shortTitle: "Egg",
    description: "Regn om mellom antall egg og gram (L ≈ 63 g med skall).",
    category: "mat",
    tags: ["egg", "baking", "vekt"],
    fields: [
      {
        id: "modus",
        label: "Retning",
        type: "select",
        defaultValue: "antall",
        options: [
          { value: "antall", label: "Antall → gram" },
          { value: "gram", label: "Gram → antall" },
        ],
      },
      {
        id: "antall",
        label: "Antall egg",
        type: "number",
        defaultValue: 3,
      },
      {
        id: "gram",
        label: "Gram",
        type: "number",
        unit: "g",
        defaultValue: 189,
      },
      {
        id: "storrelse",
        label: "Størrelse",
        type: "select",
        defaultValue: "L",
        options: [
          { value: "S", label: "S (ca. 53 g)" },
          { value: "M", label: "M (ca. 58 g)" },
          { value: "L", label: "L (ca. 63 g)" },
          { value: "XL", label: "XL (ca. 73 g)" },
        ],
      },
    ],
    formula: "gram ≈ antall · vekt per egg",
    explanation:
      "EU-størrelser er vekt med skall. I baking er det greit å veie ut når nøyaktighet teller.",
    compute(input) {
      const w: Record<string, number> = { S: 53, M: 58, L: 63, XL: 73 };
      const per = w[input.storrelse ?? "L"] ?? 63;
      if (input.modus === "gram") {
        const gram = num(input, "gram");
        if (!Number.isFinite(gram) || gram < 0) return [];
        return [
          result("n", "Antall egg (ca.)", gram / per, {
            digits: 1,
            primary: true,
          }),
          result("per", "Per egg", per, { digits: 0, unit: "g" }),
        ];
      }
      const antall = num(input, "antall");
      if (!Number.isFinite(antall) || antall < 0) return [];
      return [
        result("g", "Totalvekt (ca.)", antall * per, {
          digits: 0,
          unit: "g",
          primary: true,
        }),
        result("per", "Per egg", per, { digits: 0, unit: "g" }),
      ];
    },
  },
  {
    slug: "hevetid",
    title: "Hevetid og temperatur",
    shortTitle: "Heving",
    description:
      "Anslå hvordan hevetiden endrer seg når temperaturen endres (tommelfingerregel).",
    category: "mat",
    tags: ["heving", "gjær", "baking", "temperatur"],
    fields: [
      {
        id: "tid",
        label: "Kjent hevetid",
        type: "number",
        unit: "min",
        defaultValue: 60,
      },
      {
        id: "t1",
        label: "Ved temperatur",
        type: "number",
        unit: "°C",
        defaultValue: 22,
      },
      {
        id: "t2",
        label: "Ny temperatur",
        type: "number",
        unit: "°C",
        defaultValue: 28,
      },
    ],
    formula: "tid₂ ≈ tid₁ · 2^((t₁ − t₂)/10)",
    explanation:
      "Q₁₀-regel: ca. dobbel hastighet for hver +10 °C (innenfor rimelig gjærområde). Deig over ~35 °C kan smake off.",
    compute(input) {
      const tid = num(input, "tid");
      const t1 = num(input, "t1");
      const t2 = num(input, "t2");
      if (!allNumbers([tid, t1, t2]) || tid <= 0) return [];
      const ny = tid * Math.pow(2, (t1 - t2) / 10);
      return [
        result("ny", "Estimert hevetid", ny, {
          digits: 0,
          unit: "min",
          primary: true,
        }),
        result("faktor", "Tidsfaktor", ny / tid, { digits: 2 }),
      ];
    },
  },
  {
    slug: "marinering-tid",
    title: "Marineringstid",
    shortTitle: "Marinering",
    description:
      "Anslå marineringstid ut fra kjøtttykkelse og salt/sukker-andel i lake.",
    category: "mat",
    tags: ["marinering", "lake", "kjøtt", "fisk", "mat"],
    fields: [
      {
        id: "tykkelse",
        label: "Tykkelse",
        type: "number",
        unit: "cm",
        defaultValue: 2,
      },
      {
        id: "type",
        label: "Type",
        type: "select",
        defaultValue: "kjott",
        options: [
          { value: "kjott", label: "Kjøtt" },
          { value: "fisk", label: "Fisk" },
          { value: "kylling", label: "Kylling" },
        ],
      },
      {
        id: "salt",
        label: "Salt i lake",
        type: "number",
        unit: "%",
        defaultValue: 5,
        hint: "Andel salt i væsken.",
      },
    ],
    formula: "tid ≈ tykkelse² · faktor / salt^0,5",
    explanation:
      "Tykkere stykker trenger lengre tid. Sterkere lake (mer salt) trekker raskere inn, men ikke lineært – smak jevnlig underveis.",
    compute(input) {
      const t = num(input, "tykkelse");
      const salt = num(input, "salt");
      if (!allNumbers([t, salt]) || t <= 0 || salt <= 0) return [];
      const base =
        input.type === "fisk" ? 15 : input.type === "kylling" ? 25 : 35;
      const timer = (base * t * t) / Math.sqrt(salt);
      const min = timer * 60;
      return [
        result("min", "Estimert tid", min, {
          digits: 0,
          unit: "min",
          primary: true,
        }),
        result("timer", "I timer", timer, { digits: 1, unit: "t" }),
      ];
    },
  },
  {
    slug: "sukker-sirup",
    title: "Sukker til sirup",
    shortTitle: "Sirup",
    description:
      "Regn ut hvor mye vann du trenger for ønsket sukkerkonsentrasjon i sirup.",
    category: "mat",
    tags: ["sukker", "sirup", "konsentrasjon", "baking", "dessert"],
    fields: [
      {
        id: "sukker",
        label: "Sukker",
        type: "number",
        unit: "g",
        defaultValue: 500,
      },
      {
        id: "prosent",
        label: "Ønsket konsentrasjon",
        type: "number",
        unit: "%",
        defaultValue: 65,
        hint: "Enkel sirup ca. 65 %. Honning-lignende over 80 %.",
      },
    ],
    formula: "total masse = sukker / (konsentrasjon/100)     vann = total − sukker",
    explanation:
      "Konsentrasjon er sukker delt på total vekt. Varm opp forsiktig til sukkeret løser seg – ikke rør for mye når det koker.",
    compute(input) {
      const sukker = num(input, "sukker");
      const p = num(input, "prosent");
      if (!allNumbers([sukker, p]) || sukker <= 0 || p <= 0 || p >= 100) return [];
      const total = sukker / (p / 100);
      const vann = total - sukker;
      return [
        result("vann", "Vann å tilsette", vann, {
          digits: 0,
          unit: "g",
          primary: true,
        }),
        result("total", "Total sirup", total, { digits: 0, unit: "g" }),
      ];
    },
  },
];
