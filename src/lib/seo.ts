import type { Metadata } from "next";
import type { Calculator } from "./types";

export const SITE_URL = "https://regneklar.no";
export const SITE_NAME = "REGNEKLAR";
export const SITE_DESCRIPTION =
  "Kalkulatorer og formler for økonomi, sport, skole, elektro, statistikk, bygg, hverdag og matematikk. På norsk, med forklaring.";

export type FaqItem = { question: string; answer: string };

export function pageMetadata(
  title: string,
  description: string,
  options?: { absoluteTitle?: boolean },
): Metadata {
  return {
    title: options?.absoluteTitle ? { absolute: title } : title,
    description,
    openGraph: {
      title,
      description,
      locale: "nb_NO",
      type: "website",
      siteName: SITE_NAME,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    inLanguage: "nb-NO",
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_URL}/sok?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

export function calculatorFaqItems(calculator: Calculator): FaqItem[] {
  const items: FaqItem[] = [
    {
      question: `Hva kan jeg regne ut med ${calculator.title}?`,
      answer: calculator.description,
    },
  ];
  if (calculator.formula) {
    items.push({
      question: "Hvilken formel bruker kalkulatoren?",
      answer: calculator.formula,
    });
  }
  if (calculator.explanation) {
    items.push({
      question: "Hvordan virker utregningen?",
      answer: calculator.explanation,
    });
  }
  return items;
}

export function faqJsonLd(items: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}
