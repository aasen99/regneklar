import type { Category, CategoryId } from "./types";

export const categories: Category[] = [
  {
    id: "okonomi",
    title: "Økonomi",
    description: "Lån, BSU, sparing, bolig, renter, MVA, lønn og prosent.",
    blurb: "Penger, renter og priser",
  },
  {
    id: "sport",
    title: "Sport og helse",
    description:
      "Løpetempo, BMI, kalorier, pulssoner, styrke, termin og trening.",
    blurb: "Trening, kropp og form",
  },
  {
    id: "matematikk",
    title: "Matematikk",
    description: "Areal, volum, Pythagoras, brøk, ligninger og prosent.",
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
    description:
      "Bevegelse, energi, bølger, optikk, gasslov, kjemi og radioaktivitet.",
    blurb: "Naturfag og teknikk",
  },
  {
    id: "elektro",
    title: "Elektro",
    description:
      "Ohm, motstand, spenningsfall, transformator, vekselstrøm og trefase.",
    blurb: "Strøm, spenning og kretser",
  },
  {
    id: "statistikk",
    title: "Statistikk",
    description:
      "Snitt, standardavvik, normalfordeling, konfidensintervall og kombinatorikk.",
    blurb: "Data, sannsynlighet og utvalg",
  },
  {
    id: "musikk",
    title: "Musikk",
    description: "BPM, noter, capo, intervaller og notelengder.",
    blurb: "Tempo, stemming og teori",
  },
  {
    id: "foto",
    title: "Foto",
    description: "Eksponering, crop-faktor, DPI, lukkertid og dybdeskarphet.",
    blurb: "Kamera og utskrift",
  },
  {
    id: "dyr",
    title: "Dyr",
    description: "Hunde- og kattealder, fôr og akvarievolum.",
    blurb: "Kjæledyr og akvarium",
  },
];

export function getCategory(id: string): Category | undefined {
  return categories.find((c) => c.id === id);
}

export function isCategoryId(id: string): id is CategoryId {
  return categories.some((c) => c.id === id);
}
