import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CalculatorCard } from "@/components/CalculatorCard";
import { FormulaCard } from "@/components/FormulaCard";
import { categories, getCategory, isCategoryId } from "@/lib/categories";
import { calculatorsByCategory } from "@/lib/catalog";
import { formulasByCategory } from "@/lib/formulas";

type Props = { params: Promise<{ id: string }> };

export function generateStaticParams() {
  return categories.map((c) => ({ id: c.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const category = getCategory(id);
  if (!category) return { title: "Ikke funnet" };
  return {
    title: category.title,
    description: category.description,
  };
}

export default async function CategoryPage({ params }: Props) {
  const { id } = await params;
  if (!isCategoryId(id)) notFound();
  const category = getCategory(id);
  if (!category) notFound();

  const calcs = calculatorsByCategory(id);
  const forms = formulasByCategory(id);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <p className="text-xs uppercase tracking-[0.18em] text-pine">Kategori</p>
      <h1 className="mt-2 font-serif text-4xl">{category.title}</h1>
      <p className="mt-3 max-w-2xl text-lg text-ink-soft">{category.description}</p>

      <h2 className="mt-10 font-serif text-2xl">Kalkulatorer</h2>
      <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {calcs.map((calculator) => (
          <CalculatorCard key={calculator.slug} calculator={calculator} />
        ))}
      </div>

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
