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
        Regneklar.no er laget av Benjamin for å gjøre vanlige utregninger
        enklere å forstå. Kalkulatorene viser ikke bare svaret, men også
        formelen og en kort forklaring.
      </p>
      <p className="mt-4 leading-relaxed text-ink-soft">
        Nettstedet samler {calculators.length} kalkulatorer og{" "}
        {formulas.length} formler innen sport og helse, matematikk, fysikk,
        elektro, statistikk, musikk, foto, dyr, bygg, mat, skole, enheter,
        hverdag og økonomi.
      </p>

      <h2 className="mt-10 font-serif text-2xl">Slik bruker du det</h2>
      <ul className="mt-3 list-disc space-y-2 pl-5 text-ink-soft">
        <li>Søk, eller gå via kategori.</li>
        <li>Fyll inn feltene. Resultatet oppdateres med en gang.</li>
        <li>Les formelen under – den er den samme som kalkulatoren bruker.</li>
      </ul>

      <h2 className="mt-10 font-serif text-2xl">Kvalitet og kilder</h2>
      <p className="mt-3 leading-relaxed text-ink-soft">
        Satser og regler som endrer seg over tid (egenkapital, dokumentavgift,
        feriepenger, BSU m.m.) kontrolleres jevnlig mot offentlige kilder.
        Hver slik kalkulator viser kilde og dato for siste kontroll. Oppdager
        du en feil?{" "}
        <a href="mailto:post@regneklar.no" className="text-pine hover:underline">
          Send en e-post
        </a>
        .
      </p>

      <h2 className="mt-10 font-serif text-2xl">Viktig å vite</h2>
      <p className="mt-3 leading-relaxed text-ink-soft">
        Tallene er til hjelp og læring. De erstatter ikke bank, lege,
        Skatteetaten eller fagfolk. Skatt, lån og helse har regler og unntak
        som en generell kalkulator ikke kan fange.
      </p>

      <h2 className="mt-10 font-serif text-2xl">Penger i Fokus</h2>
      <p className="mt-3 leading-relaxed text-ink-soft">
        Regneklar og{" "}
        <a
          href="https://pengerifokus.no"
          className="text-pine hover:underline"
          rel="noopener noreferrer"
          target="_blank"
        >
          Penger i Fokus
        </a>{" "}
        drives av samme person, men har ulike oppgaver. Regneklar gir raske
        utregninger. Penger i Fokus går dypere i personlig økonomi med guider
        og mer spesialiserte verktøy.
      </p>

      <h2 className="mt-10 font-serif text-2xl">Kontakt og personvern</h2>
      <p className="mt-3 leading-relaxed text-ink-soft">
        E-post:{" "}
        <a href="mailto:post@regneklar.no" className="text-pine hover:underline">
          post@regneklar.no
        </a>
        . Les om informasjonskapsler og analyse i{" "}
        <Link href="/personvern" className="text-pine hover:underline">
          personvernerklæringen
        </Link>
        .
      </p>

      <p className="mt-8">
        <Link href="/" className="text-pine hover:underline">
          Tilbake til forsiden
        </Link>
      </p>
    </div>
  );
}
