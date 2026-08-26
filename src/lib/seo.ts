import type { Metadata } from "next";
import type { Calculator, Formula } from "./types";
import { getCategory } from "./categories";

export const SITE_URL = "https://regneklar.no";
export const SITE_NAME = "REGNEKLAR";
export const SITE_DESCRIPTION =
  "Gratis kalkulatorer og formler på norsk – sport, matte, fysikk, mat, skole, musikk, foto, bygg, statistikk og mer. Ikke bare penger. Med forklaring.";

export type FaqItem = { question: string; answer: string };

export function pageMetadata(
  title: string,
  description: string,
  options?: {
    absoluteTitle?: boolean;
    path?: string;
    keywords?: string[];
  },
): Metadata {
  const url = options?.path ? `${SITE_URL}${options.path}` : undefined;
  const trimmed =
    description.length > 160
      ? `${description.slice(0, 157).trim()}…`
      : description;

  return {
    title: options?.absoluteTitle ? { absolute: title } : title,
    description: trimmed,
    keywords: options?.keywords,
    alternates: options?.path ? { canonical: options.path } : undefined,
    openGraph: {
      title,
      description: trimmed,
      locale: "nb_NO",
      type: "website",
      siteName: SITE_NAME,
      url,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: trimmed,
    },
  };
}

export function calculatorMetadata(calculator: Calculator): Metadata {
  const category = getCategory(calculator.category);
  const title = calculator.title.includes("kalkulator")
    ? calculator.title
    : `${calculator.title} – kalkulator`;
  const description = `${calculator.description} Formel og forklaring på REGNEKLAR.`;
  return pageMetadata(title, description, {
    path: `/kalkulator/${calculator.slug}`,
    keywords: [
      calculator.title,
      calculator.shortTitle,
      ...(category ? [category.title] : []),
      ...calculator.tags.slice(0, 6),
      "kalkulator",
      "formel",
    ].filter(Boolean) as string[],
  });
}

export function formulaMetadata(formula: Formula): Metadata {
  const description = `${formula.expression}. ${formula.explanation}`;
  return pageMetadata(`${formula.title} – formel`, description, {
    path: `/formler/${formula.slug}`,
    keywords: [formula.title, "formel", formula.category, ...formula.variables.map((v) => v.symbol)],
  });
}

export function categoryMetadata(
  title: string,
  description: string,
  id: string,
): Metadata {
  return pageMetadata(
    `${title} – kalkulatorer og formler`,
    `${description} Gratis utregning med formel på norsk.`,
    { path: `/kategori/${id}` },
  );
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

export function calculatorJsonLd(calculator: Calculator) {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: calculator.title,
    description: calculator.description,
    url: `${SITE_URL}/kalkulator/${calculator.slug}`,
    applicationCategory: "UtilityApplication",
    operatingSystem: "Any",
    inLanguage: "nb-NO",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "NOK",
    },
    isPartOf: {
      "@type": "WebSite",
      name: SITE_NAME,
      url: SITE_URL,
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
