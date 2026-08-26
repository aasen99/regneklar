import type { Metadata } from "next";
import Link from "next/link";
import { calculators } from "@/lib/catalog";
import { formulas } from "@/lib/formulas";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata(
  "Om REGNEKLAR",
  "REGNEKLAR er gratis kalkulatorer og formler på norsk – bredde fra sport og matte til mat, skole og fysikk, med forklaring under svaret.",
  { path: "/om" },
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
        {formulas.length} formler innen sport og helse, matematikk, fysikk,
        elektro, statistikk, musikk, foto, dyr, bygg, mat, skole, enheter,
        hverdag og økonomi. Poenget er bredde og forståelse – ikke bare
        pengeutregninger.
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
      <h2 className="mt-10 font-serif text-2xl">Penger i Fokus</h2>
      <p className="mt-3 leading-relaxed text-ink-soft">
        REGNEKLAR og{" "}
        <a
          href="https://pengerifokus.no"
          className="text-pine hover:underline"
          rel="noopener noreferrer"
          target="_blank"
        >
          pengerifokus.no
        </a>{" "}
        eies av samme. REGNEKLAR er formel- og kalkulatorfokusert; Penger i
        Fokus går dypere på personlig økonomi med guider, budsjett og mer
        spesialiserte verktøy. De to sidene kan lenke til hverandre der det
        gir mening for brukeren.
      </p>
      <p className="mt-8">
        <Link href="/" className="text-pine hover:underline">
          Tilbake til forsiden
        </Link>
      </p>
    </div>
  );
}
