import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CalculatorCard } from "@/components/CalculatorCard";
import { CalculatorForm } from "@/components/CalculatorForm";
import { JsonLd } from "@/components/JsonLd";
import { getCategory } from "@/lib/categories";
import {
  calculators,
  getCalculator,
} from "@/lib/catalog";
import { PIF_LINKS, relatedCalculators } from "@/lib/related";
import { formulas } from "@/lib/formulas";
import {
  calculatorFaqItems,
  calculatorJsonLd,
  calculatorMetadata,
  faqJsonLd,
} from "@/lib/seo";
import Link from "next/link";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return calculators.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const calculator = getCalculator(slug);
  if (!calculator) return { title: "Ikke funnet" };
  return calculatorMetadata(calculator);
}

export default async function CalculatorPage({ params }: Props) {
  const { slug } = await params;
  const calculator = getCalculator(slug);
  if (!calculator) notFound();

  const category = getCategory(calculator.category);
  const related = relatedCalculators(calculator.slug);
  const linkedFormulas = formulas.filter(
    (f) => f.calculatorSlug === calculator.slug,
  );
  const faqs = calculatorFaqItems(calculator);
  const pifLink = PIF_LINKS[calculator.slug];

  return (
    <article className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <JsonLd data={calculatorJsonLd(calculator)} />
      <JsonLd data={faqJsonLd(faqs)} />
      <p className="text-xs uppercase tracking-[0.16em] text-pine">
        <Link href={`/kategori/${calculator.category}`} className="hover:underline">
          {category?.title}
        </Link>
      </p>
      <h1 className="mt-2 font-serif text-4xl text-ink">{calculator.title}</h1>
      <p className="mt-3 max-w-2xl text-lg text-ink-soft">
        {calculator.description}
      </p>
      {calculator.source ? (
        <p className="mt-4 max-w-2xl text-sm text-ink-soft">
          Sist faglig kontrollert:{" "}
          {calculator.source.reviewedAt.split("-").reverse().join(".")}. Kilde:{" "}
          <a
            href={calculator.source.url}
            className="text-pine hover:underline"
            rel="noopener noreferrer"
            target="_blank"
          >
            {calculator.source.label}
          </a>
          .
        </p>
      ) : null}
      {pifLink ? (
        <p className="mt-3 max-w-2xl text-sm text-ink-soft">
          <a
            href={pifLink.href}
            className="text-pine hover:underline"
            rel="noopener noreferrer"
            target="_blank"
          >
            {pifLink.label}
          </a>
        </p>
      ) : null}

      <div className="mt-8">
        <CalculatorForm slug={calculator.slug} />
      </div>

      <section className="mt-10 rounded-2xl border border-line bg-sand p-6">
        <h2 className="font-serif text-2xl">Vanlige spørsmål</h2>
        <dl className="mt-4 space-y-6">
          {faqs.map((faq) => (
            <div key={faq.question}>
              <dt className="font-medium text-ink">{faq.question}</dt>
              <dd
                className={
                  faq.answer === calculator.formula
                    ? "mt-2 rounded-xl bg-paper px-4 py-3 font-serif text-lg text-pine-dark"
                    : "mt-2 leading-relaxed text-ink-soft"
                }
              >
                {faq.answer}
              </dd>
            </div>
          ))}
        </dl>
        {calculator.disclaimer ? (
          <p className="mt-6 text-sm text-ink-soft/80">{calculator.disclaimer}</p>
        ) : null}
        {linkedFormulas.length > 0 ? (
          <ul className="mt-4 text-sm">
            {linkedFormulas.map((formula) => (
              <li key={formula.slug}>
                <Link
                  href={`/formler/${formula.slug}`}
                  className="text-pine hover:underline"
                >
                  Se formelen {formula.title}
                </Link>
              </li>
            ))}
          </ul>
        ) : null}
      </section>

      {related.length > 0 && (
        <section className="mt-12">
          <h2 className="font-serif text-2xl">Liknende kalkulatorer</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((item) => (
              <CalculatorCard key={item.slug} calculator={item} />
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
