import type { Metadata } from "next";
import Link from "next/link";
import { CalculatorCard } from "@/components/CalculatorCard";
import { FormulaCard } from "@/components/FormulaCard";
import { SearchForm } from "@/components/SearchForm";
import { searchCalculators } from "@/lib/catalog";
import { POPULAR_SEARCHES } from "@/lib/featured";
import { searchFormulas } from "@/lib/formulas";

type Props = { searchParams: Promise<{ q?: string }> };

export const metadata: Metadata = {
  title: "Søk",
  description: "Søk i kalkulatorer og formler på REGNEKLAR.",
  robots: { index: false, follow: true },
};

export default async function SearchPage({ searchParams }: Props) {
  const { q = "" } = await searchParams;
  const query = q.trim();
  const hasQuery = query.length > 0;
  const calcs = hasQuery ? searchCalculators(query) : [];
  const forms = hasQuery ? searchFormulas(query) : [];

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <h1 className="font-serif text-4xl">Søk</h1>
      <div className="mt-6 max-w-xl">
        <SearchForm defaultValue={query} large />
      </div>

      {hasQuery ? (
        <p className="mt-6 text-ink-soft">
          {calcs.length + forms.length} treff på «{query}»
        </p>
      ) : (
        <>
          <p className="mt-6 max-w-2xl text-ink-soft">
            Søk blant kalkulatorer og formler. Prøv et nøkkelord som «maling»,
            «lån» eller «BMI».
          </p>
          <section className="mt-10">
            <h2 className="font-serif text-2xl">Populære søk</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {POPULAR_SEARCHES.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-full border border-line bg-sand px-4 py-2 text-sm text-ink hover:border-pine/40"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </section>
        </>
      )}

      {calcs.length > 0 && (
        <section className="mt-8">
          <h2 className="font-serif text-2xl">Kalkulatorer</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {calcs.map((calculator) => (
              <CalculatorCard key={calculator.slug} calculator={calculator} />
            ))}
          </div>
        </section>
      )}

      {forms.length > 0 && (
        <section className="mt-10">
          <h2 className="font-serif text-2xl">Formler</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {forms.map((formula) => (
              <FormulaCard key={formula.slug} formula={formula} />
            ))}
          </div>
        </section>
      )}

      {hasQuery && calcs.length === 0 && forms.length === 0 ? (
        <p className="mt-8 text-ink-soft">Ingen treff. Prøv et annet ord.</p>
      ) : null}
    </div>
  );
}
