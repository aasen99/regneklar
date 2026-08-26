import type { Metadata } from "next";
import { FormulaCard } from "@/components/FormulaCard";
import { SearchForm } from "@/components/SearchForm";
import { formulas } from "@/lib/formulas";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata(
  "Formelsamling",
  "Formler for sport, matte, fysikk, mat, skole, musikk, foto, elektro og statistikk – forklart på norsk med lenke til kalkulator.",
  { path: "/formler" },
);

export default function FormulasPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <h1 className="font-serif text-4xl">Formelsamling</h1>
      <p className="mt-3 max-w-2xl text-lg text-ink-soft">
        Formlene bak kalkulatorene. Hver formel har symboler, forklaring og
        lenke til utregning.
      </p>
      <div className="mt-6 max-w-xl">
        <SearchForm />
      </div>
      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        {formulas.map((formula) => (
          <FormulaCard key={formula.slug} formula={formula} />
        ))}
      </div>
    </div>
  );
}
