import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCategory } from "@/lib/categories";
import { getCalculator } from "@/lib/catalog";
import { formulas, getFormula } from "@/lib/formulas";
import { formulaMetadata } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return formulas.map((f) => ({ slug: f.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const formula = getFormula(slug);
  if (!formula) return { title: "Ikke funnet" };
  return formulaMetadata(formula);
}

export default async function FormulaPage({ params }: Props) {
  const { slug } = await params;
  const formula = getFormula(slug);
  if (!formula) notFound();

  const category = getCategory(formula.category);
  const calculator = formula.calculatorSlug
    ? getCalculator(formula.calculatorSlug)
    : undefined;

  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <p className="text-xs uppercase tracking-[0.16em] text-pine">
        {category?.title} · formel
      </p>
      <h1 className="mt-2 font-serif text-4xl">{formula.title}</h1>
      <p className="mt-6 rounded-2xl bg-pine-dark px-5 py-4 font-serif text-2xl text-sand">
        {formula.expression}
      </p>
      <h2 className="mt-8 font-serif text-2xl">Størrelser</h2>
      <dl className="mt-4 divide-y divide-line rounded-2xl border border-line bg-sand">
        {formula.variables.map((variable) => (
          <div
            key={variable.symbol}
            className="grid grid-cols-[7rem_1fr] gap-4 px-4 py-3"
          >
            <dt className="font-serif text-pine">{variable.symbol}</dt>
            <dd className="text-ink-soft">{variable.meaning}</dd>
          </div>
        ))}
      </dl>
      <h2 className="mt-8 font-serif text-2xl">Forklaring</h2>
      <p className="mt-3 leading-relaxed text-ink-soft">{formula.explanation}</p>
      {formula.example ? (
        <>
          <h2 className="mt-8 font-serif text-2xl">Eksempel</h2>
          <p className="mt-3 leading-relaxed text-ink-soft">{formula.example}</p>
        </>
      ) : null}
      {formula.prerequisites ? (
        <>
          <h2 className="mt-8 font-serif text-2xl">Forutsetninger</h2>
          <p className="mt-3 leading-relaxed text-ink-soft">
            {formula.prerequisites}
          </p>
        </>
      ) : null}
      {formula.commonMistakes && formula.commonMistakes.length > 0 ? (
        <>
          <h2 className="mt-8 font-serif text-2xl">Vanlige feil</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-ink-soft">
            {formula.commonMistakes.map((mistake) => (
              <li key={mistake}>{mistake}</li>
            ))}
          </ul>
        </>
      ) : null}
      {formula.source ? (
        <p className="mt-8 text-sm text-ink-soft">
          Kilde:{" "}
          <a
            href={formula.source.url}
            className="text-pine hover:underline"
            rel="noopener noreferrer"
            target="_blank"
          >
            {formula.source.label}
          </a>{" "}
          (kontrollert {formula.source.reviewedAt.split("-").reverse().join(".")}
          ).
        </p>
      ) : null}
      {calculator ? (
        <p className="mt-8">
          <Link
            href={`/kalkulator/${calculator.slug}`}
            className="inline-flex rounded-full bg-pine px-5 py-2.5 text-sm font-medium text-sand hover:bg-pine-dark"
          >
            Åpne {calculator.title}
          </Link>
        </p>
      ) : null}
    </article>
  );
}
