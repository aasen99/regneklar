import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CalculatorCard } from "@/components/CalculatorCard";
import { FormulaCard } from "@/components/FormulaCard";
import { CATEGORY_SECTIONS } from "@/lib/category-sections";
import { categories, getCategory, isCategoryId } from "@/lib/categories";
import { calculatorsByCategory, getCalculator } from "@/lib/catalog";
import { formulasByCategory } from "@/lib/formulas";
import { categoryMetadata } from "@/lib/seo";

type Props = { params: Promise<{ id: string }> };

export function generateStaticParams() {
  return categories.map((c) => ({ id: c.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const category = getCategory(id);
  if (!category) return { title: "Ikke funnet" };
  return categoryMetadata(category.title, category.description, category.id);
}

export default async function CategoryPage({ params }: Props) {
  const { id } = await params;
  if (!isCategoryId(id)) notFound();
  const category = getCategory(id);
  if (!category) notFound();

  const calcs = calculatorsByCategory(id);
  const forms = formulasByCategory(id);
  const sections = CATEGORY_SECTIONS[id];
  const sectionSlugs = new Set(sections?.flatMap((s) => s.slugs) ?? []);
  const remainingCalcs = sections
    ? calcs.filter((c) => !sectionSlugs.has(c.slug))
    : [];

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <p className="text-xs uppercase tracking-[0.18em] text-pine">Kategori</p>
      <h1 className="mt-2 font-serif text-4xl">{category.title}</h1>
      <p className="mt-3 max-w-2xl text-lg text-ink-soft">{category.description}</p>

      {id === "okonomi" ? (
        <p className="mt-5 max-w-2xl text-sm leading-relaxed text-ink-soft">
          For personlig økonomi, guider og mer avanserte verktøy (flere lån,
          SIFO-budsjett, eie vs. leie m.m.) se også{" "}
          <a
            href="https://pengerifokus.no"
            className="text-pine hover:underline"
            rel="noopener noreferrer"
            target="_blank"
          >
            Penger i Fokus
          </a>
          .
        </p>
      ) : null}

      <h2 className="mt-10 font-serif text-2xl">Kalkulatorer</h2>
      {sections ? (
        <div className="mt-5 space-y-10">
          {sections.map((section) => {
            const items = section.slugs
              .map((slug) => getCalculator(slug))
              .filter((c): c is NonNullable<typeof c> => Boolean(c));
            if (items.length === 0) return null;
            return (
              <section key={section.title}>
                <h3 className="font-serif text-xl text-ink">{section.title}</h3>
                <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {items.map((calculator) => (
                    <CalculatorCard key={calculator.slug} calculator={calculator} />
                  ))}
                </div>
              </section>
            );
          })}
          {remainingCalcs.length > 0 ? (
            <section>
              <h3 className="font-serif text-xl text-ink">Flere kalkulatorer</h3>
              <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {remainingCalcs.map((calculator) => (
                  <CalculatorCard key={calculator.slug} calculator={calculator} />
                ))}
              </div>
            </section>
          ) : null}
        </div>
      ) : (
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {calcs.map((calculator) => (
            <CalculatorCard key={calculator.slug} calculator={calculator} />
          ))}
        </div>
      )}

      {forms.length > 0 && (
        <>
          <h2 className="mt-12 font-serif text-2xl">Formler</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {forms.map((formula) => (
              <FormulaCard key={formula.slug} formula={formula} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
