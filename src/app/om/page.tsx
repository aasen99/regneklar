import type { Metadata } from "next";
import Link from "next/link";
import { calculators } from "@/lib/catalog";
import { formulas } from "@/lib/formulas";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata(
  "Om REGNEKLAR",
  "Hva REGNEKLAR er, og hvordan kalkulatorene er tenkt brukt.",
);

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="font-serif text-4xl">Om REGNEKLAR</h1>
      <p className="mt-5 text-lg leading-relaxed text-ink-soft">
        REGNEKLAR.no er laget for at hvem som helst skal kunne slå opp en
        utregning og forstå formelen bak. Ikke bare et svar – men hvorfor
        svaret blir som det blir.
      </p>
      <p className="mt-4 leading-relaxed text-ink-soft">
        Nettstedet samler {calculators.length} kalkulatorer og{" "}
        {formulas.length} formler innen økonomi, helse, sport, matematikk,
        enheter, hverdag, bygg, mat, skole og fysikk. Flere kommer.
      </p>
      <h2 className="mt-10 font-serif text-2xl">Slik bruker du det</h2>
      <ul className="mt-3 list-disc space-y-2 pl-5 text-ink-soft">
        <li>Søk, eller gå via kategori.</li>
        <li>Fyll inn feltene. Resultatet oppdateres med en gang.</li>
        <li>Les formelen under – den er den samme som kalkulatoren bruker.</li>
      </ul>
      <h2 className="mt-10 font-serif text-2xl">Viktig å vite</h2>
      <p className="mt-3 leading-relaxed text-ink-soft">
        Tallene er til hjelp og læring. De erstatter ikke bank, lege,
        Skatteetaten eller fagfolk. Skatt, lån og helse har regler og unntak
        som en generell kalkulator ikke kan fange.
      </p>
      <p className="mt-8">
        <Link href="/" className="text-pine hover:underline">
          Tilbake til forsiden
        </Link>
      </p>
    </div>
  );
}
