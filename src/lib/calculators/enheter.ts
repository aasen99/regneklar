import type { Calculator } from "../types";
import { num } from "../format";
import { createConverter, result } from "../helpers";

export const enheterCalculators: Calculator[] = [
  createConverter({
    slug: "lengde",
    title: "Lengdeomregning",
    description: "Regn om mellom millimeter, centimeter, meter, kilometer, tommer og fot.",
    category: "enheter",
    popular: true,
    tags: ["lengde", "meter", "tommer", "enheter"],
    defaultFrom: "m",
    defaultTo: "cm",
    defaultValue: 1,
    formula: "verdi_til = verdi_fra · (faktor_fra / faktor_til)",
    explanation:
      "Alle lengder omregnes via meter. 1 tomme = 25,4 mm, 1 fot = 12 tommer, 1 yard = 3 fot.",
    units: [
      { id: "mm", label: "Millimeter (mm)", toBase: 0.001 },
      { id: "cm", label: "Centimeter (cm)", toBase: 0.01 },
      { id: "m", label: "Meter (m)", toBase: 1 },
      { id: "km", label: "Kilometer (km)", toBase: 1000 },
      { id: "in", label: "Tommer (in)", toBase: 0.0254 },
      { id: "ft", label: "Fot (ft)", toBase: 0.3048 },
      { id: "yd", label: "Yard (yd)", toBase: 0.9144 },
      { id: "mi", label: "Mile (mi)", toBase: 1609.344 },
    ],
  }),
  createConverter({
    slug: "vekt",
    title: "Vektomregning",
    description: "Regn om mellom milligram, gram, kilo, tonn, uns og pund.",
    category: "enheter",
    tags: ["vekt", "kg", "pund"],
    defaultFrom: "kg",
    defaultTo: "g",
    defaultValue: 1,
    formula: "via kilogram som grunnenhet",
    explanation: "1 pund (lb) = 0,45359237 kg. 1 uns (oz) = 1/16 pund.",
    units: [
      { id: "mg", label: "Milligram (mg)", toBase: 0.000001 },
      { id: "g", label: "Gram (g)", toBase: 0.001 },
      { id: "hg", label: "Hektogram (hg)", toBase: 0.1 },
      { id: "kg", label: "Kilogram (kg)", toBase: 1 },
      { id: "t", label: "Tonn (t)", toBase: 1000 },
      { id: "oz", label: "Uns (oz)", toBase: 0.028349523125 },
      { id: "lb", label: "Pund (lb)", toBase: 0.45359237 },
    ],
  }),
  {
    slug: "temperatur",
    title: "Temperaturomregning",
    description: "Regn om mellom Celsius, Fahrenheit og Kelvin.",
    category: "enheter",
    tags: ["temperatur", "celsius", "fahrenheit"],
    popular: true,
    fields: [
      { id: "verdi", label: "Verdi", type: "number", defaultValue: 20 },
      {
        id: "fra",
        label: "Fra",
        type: "select",
        defaultValue: "c",
        options: [
          { value: "c", label: "Celsius (°C)" },
          { value: "f", label: "Fahrenheit (°F)" },
          { value: "k", label: "Kelvin (K)" },
        ],
      },
    ],
    formula: "F = C · 9/5 + 32     K = C + 273,15",
    explanation:
      "Celsius og Kelvin har samme stegstørrelse, men ulike nullpunkt. Fahrenheit har både annet nullpunkt og annen skala.",
    compute(input) {
      const verdi = num(input, "verdi");
      if (!Number.isFinite(verdi)) return [];
      let c = verdi;
      if (input.fra === "f") c = (verdi - 32) * (5 / 9);
      if (input.fra === "k") c = verdi - 273.15;
      return [
        result("c", "Celsius", c, { digits: 2, unit: "°C", primary: true }),
        result("f", "Fahrenheit", c * (9 / 5) + 32, { digits: 2, unit: "°F" }),
        result("k", "Kelvin", c + 273.15, { digits: 2, unit: "K" }),
      ];
    },
  },
  createConverter({
    slug: "volum-enheter",
    title: "Volumenheter",
    description: "Regn om mellom milliliter, desiliter, liter, kubikkmeter og gallon.",
    category: "enheter",
    tags: ["volum", "liter", "dl"],
    defaultFrom: "l",
    defaultTo: "dl",
    formula: "via kubikkmeter (1 L = 0,001 m³)",
    explanation: "1 liter = 1 dm³ = 10 dl = 100 cl = 1000 ml.",
    units: [
      { id: "ml", label: "Milliliter (ml)", toBase: 0.000001 },
      { id: "cl", label: "Centiliter (cl)", toBase: 0.00001 },
      { id: "dl", label: "Desiliter (dl)", toBase: 0.0001 },
      { id: "l", label: "Liter (l)", toBase: 0.001 },
      { id: "m3", label: "Kubikkmeter (m³)", toBase: 1 },
      { id: "gal", label: "US gallon", toBase: 0.003785411784 },
    ],
  }),
  createConverter({
    slug: "areal-enheter",
    title: "Arealenheter",
    description: "Regn om mellom kvadratmeter, mål, dekar, hektar og kvadratkilometer.",
    category: "enheter",
    tags: ["areal", "mål", "hektar"],
    defaultFrom: "m2",
    defaultTo: "maal",
    defaultValue: 1000,
    formula: "1 dekar = 1 mål = 1000 m²     1 ha = 10 mål",
    explanation:
      "I Norge er 1 mål det samme som 1 dekar (1000 m²). Hektar er 10 000 m².",
    units: [
      { id: "cm2", label: "Kvadratcentimeter", toBase: 0.0001 },
      { id: "m2", label: "Kvadratmeter (m²)", toBase: 1 },
      { id: "maal", label: "Mål / dekar", toBase: 1000 },
      { id: "ha", label: "Hektar (ha)", toBase: 10000 },
      { id: "km2", label: "Kvadratkilometer", toBase: 1_000_000 },
    ],
  }),
  createConverter({
    slug: "hastighet-enheter",
    title: "Fartsomregning",
    description: "Regn om mellom km/t, m/s, knop og mph.",
    category: "enheter",
    tags: ["fart", "km/t", "knop"],
    defaultFrom: "kmh",
    defaultTo: "ms",
    defaultValue: 80,
    formula: "1 m/s = 3,6 km/t     1 knop = 1,852 km/t",
    explanation:
      "Meter per sekund brukes i fysikk, km/t i trafikken, knop til sjøs.",
    units: [
      { id: "ms", label: "Meter per sekund (m/s)", toBase: 1 },
      { id: "kmh", label: "Kilometer i timen (km/t)", toBase: 1 / 3.6 },
      { id: "mph", label: "Miles per hour (mph)", toBase: 0.44704 },
      { id: "kn", label: "Knop", toBase: 1852 / 3600 },
    ],
  }),
  createConverter({
    slug: "data-enheter",
    title: "Dataenheter",
    description: "Regn om mellom bit, byte, kilobyte, megabyte, gigabyte og terabyte.",
    category: "enheter",
    tags: ["data", "gb", "mb", "lagring"],
    defaultFrom: "gb",
    defaultTo: "mb",
    defaultValue: 1,
    formula: "1 byte = 8 bit     1 KB = 1000 byte (SI)",
    explanation:
      "Her brukes SI-prefiks (1000). Operativsystemer viser ofte 1024-baserte enheter (KiB, MiB).",
    units: [
      { id: "bit", label: "Bit", toBase: 1 },
      { id: "B", label: "Byte (B)", toBase: 8 },
      { id: "kB", label: "Kilobyte (kB)", toBase: 8 * 1000 },
      { id: "MB", label: "Megabyte (MB)", toBase: 8 * 1e6 },
      { id: "GB", label: "Gigabyte (GB)", toBase: 8 * 1e9 },
      { id: "TB", label: "Terabyte (TB)", toBase: 8 * 1e12 },
    ],
  }),
  {
    slug: "tid-enheter",
    title: "Tidomregning",
    description: "Regn om mellom sekunder, minutter, timer, døgn og uker.",
    category: "enheter",
    tags: ["tid", "timer", "døgn"],
    fields: [
      { id: "verdi", label: "Verdi", type: "number", defaultValue: 90 },
      {
        id: "fra",
        label: "Fra",
        type: "select",
        defaultValue: "min",
        options: [
          { value: "s", label: "Sekunder" },
          { value: "min", label: "Minutter" },
          { value: "t", label: "Timer" },
          { value: "d", label: "Døgn" },
          { value: "u", label: "Uker" },
        ],
      },
    ],
    formula: "1 døgn = 24 t = 1440 min = 86400 s",
    explanation: "Alle verdier omregnes via sekunder.",
    compute(input) {
      const verdi = num(input, "verdi");
      if (!Number.isFinite(verdi)) return [];
      const faktor: Record<string, number> = {
        s: 1,
        min: 60,
        t: 3600,
        d: 86400,
        u: 604800,
      };
      const sek = verdi * (faktor[input.fra] ?? 1);
      return [
        result("t", "Timer", sek / 3600, { digits: 4, primary: true }),
        result("min", "Minutter", sek / 60, { digits: 2 }),
        result("s", "Sekunder", sek, { digits: 2 }),
        result("d", "Døgn", sek / 86400, { digits: 4 }),
      ];
    },
  },
  {
    slug: "skostorrelse",
    title: "Skostørrelse",
    description: "Omtrentlig omregning mellom EU, UK, US og centimeter.",
    category: "enheter",
    tags: ["sko", "størrelse"],
    fields: [
      { id: "eu", label: "EU-størrelse", type: "number", defaultValue: 42 },
    ],
    formula: "cm ≈ 2/3 · EU     UK ≈ EU − 33     US ≈ EU − 32,5",
    explanation:
      "Skostørrelser varierer mellom merker. Dette er en grov tommelfingerregel, ikke en garanti for passform.",
    compute(input) {
      const eu = num(input, "eu");
      if (!Number.isFinite(eu)) return [];
      return [
        result("cm", "Fotlengde (ca.)", (eu * 2) / 3, {
          digits: 1,
          unit: "cm",
          primary: true,
        }),
        result("uk", "UK (ca.)", eu - 33, { digits: 1 }),
        result("us", "US herrer (ca.)", eu - 32.5, { digits: 1 }),
      ];
    },
  },
];
