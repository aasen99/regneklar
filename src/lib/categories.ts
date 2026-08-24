import type { Category, CategoryId } from "./types";

export const categories: Category[] = [
  {
    id: "okonomi",
    title: "Økonomi",
    description: "Lån, renter, MVA, lønn, sparing og prosent.",
    blurb: "Penger, renter og priser",
  },
  {
    id: "helse",
    title: "Helse",
    description: "BMI, kalorier, vekt, termin og kroppsmål.",
    blurb: "Kropp, kost og form",
  },
  {
    id: "sport",
    title: "Sport",
    description:
      "Løpetempo, km/t til min/km, 400 m-rundetid, split, sluttid og treningssoner.",
    blurb: "Løping, tempo og runder",
  },
  {
    id: "matematikk",
    title: "Matematikk",
    description: "Areal, volum, Pythagoras, brøk, ligninger og statistikk.",
    blurb: "Tall, figurer og formler",
  },
  {
    id: "enheter",
    title: "Enheter",
    description: "Lengde, vekt, temperatur, volum, fart og data.",
    blurb: "Omregning mellom enheter",
  },
  {
    id: "hverdag",
    title: "Hverdag",
    description: "Strøm, drivstoff, reise, alder, dato og tid.",
    blurb: "Praktiske hverdagsregnestykker",
  },
  {
    id: "bygg",
    title: "Bygg",
    description: "Maling, fliser, betong, gulv, tapet og gjerde.",
    blurb: "Oppussing og materialer",
  },
  {
    id: "mat",
    title: "Mat",
    description: "Oppskriftsskalering, mål og porsjoner.",
    blurb: "Kjøkken og porsjoner",
  },
  {
    id: "skole",
    title: "Skole",
    description: "Karaktersnitt, karakterbehov og studiebelastning.",
    blurb: "Karakterer og studier",
  },
  {
    id: "fysikk",
    title: "Fysikk",
    description: "Hastighet, Ohm, kraft, energi, tetthet og effekt.",
    blurb: "Naturfag og teknikk",
  },
];

export function getCategory(id: string): Category | undefined {
  return categories.find((c) => c.id === id);
}

export function isCategoryId(id: string): id is CategoryId {
  return categories.some((c) => c.id === id);
}
