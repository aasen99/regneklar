import type { CategoryId } from "./types";

export type CategorySection = {
  title: string;
  slugs: string[];
};

export const CATEGORY_SECTIONS: Partial<Record<CategoryId, CategorySection[]>> = {
  sport: [
    {
      title: "Løping",
      slugs: [
        "km-t-min-km",
        "maltempo",
        "opptrapping-loping",
        "sluttid-loping",
        "split-tider",
        "rundetid-400m",
        "predikert-lopsid",
      ],
    },
    {
      title: "Styrke",
      slugs: ["enrm", "treningsvolum", "skivekalkulator", "dots-styrkeloft", "progresjon-styrke"],
    },
    {
      title: "Sykling",
      slugs: ["watt-per-kg", "ftp-soner", "sykkel-kadens", "vo2max"],
    },
    {
      title: "Kropp og helse",
      slugs: ["bmi", "kaloribehov", "kroppsfett-navy", "terminkalkulator", "sovnbehov"],
    },
    {
      title: "Restitusjon",
      slugs: ["hviletid-sett", "sovn", "sovnbehov", "makspuls"],
    },
  ],
  okonomi: [
    {
      title: "Lån og bolig",
      slugs: [
        "lanekalkulator",
        "egenkapital-bolig",
        "laneramme",
        "serielan",
        "effektiv-rente",
        "ekstra-innbetaling-lan",
      ],
    },
    {
      title: "Sparing",
      slugs: ["rentes-rente", "bsu", "million-sparing", "regel-72", "nodfond"],
    },
    {
      title: "Lønn og arbeid",
      slugs: ["lonn-omregning", "brutto-netto", "feriepenger", "lonnsokning"],
    },
    {
      title: "Prosent og priser",
      slugs: ["prosent", "mva", "inflasjon", "tips", "prosentvis-endring"],
    },
  ],
  fysikk: [
    {
      title: "Mekanikk",
      slugs: ["kraft", "bevegelse", "arbeid-effekt", "pendel-periode", "sentripetal"],
    },
    {
      title: "Energi",
      slugs: ["effekt-kalkulator", "kinetisk-energi", "varmeenergi", "virkningsgrad"],
    },
    {
      title: "Bølger og optikk",
      slugs: ["bolge", "snell", "linse", "desibel"],
    },
    {
      title: "Varme og gass",
      slugs: ["ideell-gass", "faseovergang", "hydrostatisk", "trykk"],
    },
    {
      title: "Kjemi og radioaktivitet",
      slugs: ["stoffmengde", "konsentrasjon", "halvveringstid", "foton"],
    },
  ],
  matematikk: [
    {
      title: "Grunnleggende regning",
      slugs: ["prosent-av-tall", "brok", "potens-rot", "gjennomsnitt"],
    },
    {
      title: "Geometri",
      slugs: ["areal", "volum", "volum-kule", "pythagoras", "omkrets"],
    },
    {
      title: "Algebra",
      slugs: ["andregrad", "forstegard", "logaritme", "sff-mfm"],
    },
    {
      title: "Trigonometri og prosent",
      slugs: ["trigonometri", "prosentpoeng", "compound-prosent"],
    },
  ],
};
