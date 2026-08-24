import type { Metadata } from "next";
import Link from "next/link";
import { CalculatorCard } from "@/components/CalculatorCard";
import { CategoryGrid } from "@/components/CategoryGrid";
import { JsonLd } from "@/components/JsonLd";
import { SearchForm } from "@/components/SearchForm";
import { calculators, featuredCalculators } from "@/lib/catalog";
import { categories } from "@/lib/categories";
import { formulas } from "@/lib/formulas";
import { pageMetadata, SITE_DESCRIPTION, websiteJsonLd } from "@/lib/seo";

export const metadata: Metadata = pageMetadata(
  "REGNEKLAR – kalkulatorer og formler for alle",
  SITE_DESCRIPTION,
  { absoluteTitle: true },
);

export default function HomePage() {
  const featured = featuredCalculators();

  return (
    <>
      <JsonLd data={websiteJsonLd()} />
      <section className="hero-grid border-b border-line">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
          <p className="text-xs uppercase tracking-[0.22em] text-pine">
            regneklar.no
          </p>
          <h1 className="mt-4 max-w-3xl font-serif text-4xl leading-[1.12] text-ink sm:text-6xl">
            Alle kalkulatorene.
            <br />
            Alle formlene.
            <span className="text-pine"> Klart forklart.</span>
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-soft">
            Lån, BMI, løpetempo, prosent, maling, strøm, Pythagoras og resten.
            REGNEKLAR samler utregningene folk faktisk trenger – på norsk, uten
            støy.
          </p>
          <div className="mt-8 max-w-xl">
            <SearchForm large />
          </div>
          <p className="mt-4 text-sm text-ink-soft">
            {calculators.length} kalkulatorer · {formulas.length} formler ·{" "}
            {categories.length} kategorier
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="mb-6 flex items-end justify-between gap-4">
          <h2 className="font-serif text-3xl">Kategorier</h2>
          <Link href="/formler" className="text-sm text-pine hover:underline">
            Gå til formelsamlingen
          </Link>
        </div>
        <CategoryGrid />
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6">
        <h2 className="font-serif text-3xl">Mest brukt</h2>
        <p className="mt-2 text-ink-soft">
          Start her hvis du bare skal ha svaret – formelen ligger under.
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((calculator) => (
            <CalculatorCard key={calculator.slug} calculator={calculator} />
          ))}
        </div>
      </section>
    </>
  );
}
