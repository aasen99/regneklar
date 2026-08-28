import type { Metadata } from "next";
import Link from "next/link";
import { calculators } from "@/lib/catalog";
import { formulas } from "@/lib/formulas";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata(
  "Om Regneklar",
  "Regneklar gjør vanlige utregninger enklere å forstå – med svar, formel og kort forklaring.",
  { path: "/om" },
);

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="font-serif text-4xl">Om Regneklar</h1>
      <p className="mt-5 text-lg leading-relaxed text-ink-soft">
        Regneklar.no er laget av Benjamin for å gjøre vanlige utregninger
        enklere å forstå. Kalkulatorene viser ikke bare svaret, men også
        formelen og en kort forklaring.
      </p>
      <p className="mt-4 leading-relaxed text-ink-soft">
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
        utregninger. Penger i Fokus går dypere i personlig økonomi.
      </p>
      <p className="mt-4 leading-relaxed text-ink-soft">
        Nettstedet har {calculators.length} kalkulatorer og {formulas.length}{" "}
        formler innen blant annet matematikk, økonomi, sport og helse, fysikk,
        elektro, statistikk, bygg, mat, skole og hverdagslige utregninger.
      </p>

      <h2 className="mt-10 font-serif text-2xl">Slik fungerer kalkulatorene</h2>
      <ul className="mt-3 list-disc space-y-2 pl-5 text-ink-soft">
        <li>Finn riktig kalkulator ved å søke eller velge en kategori.</li>
        <li>Fyll inn tallene du kjenner.</li>
        <li>Resultatet oppdateres med én gang.</li>
        <li>Se formelen og forklaringen under resultatet.</li>
      </ul>

      <h2 className="mt-10 font-serif text-2xl">Kvalitet og kilder</h2>
      <p className="mt-3 leading-relaxed text-ink-soft">
        Kalkulatorer som bygger på regler eller satser som kan endre seg, viser
        kilde og dato for siste faglige kontroll. Satser hentes fra et sentralt
        register og oppdateres når reglene endres.
      </p>
      <p className="mt-4 leading-relaxed text-ink-soft">
        Oppdager du feil i en formel, sats eller forklaring? Send en e-post til{" "}
        <a
          href="mailto:post@regneklar.no"
          className="text-pine hover:underline"
        >
          post@regneklar.no
        </a>{" "}
        – gjerne med lenke til kalkulatoren og hva som virker feil.
      </p>

      <h2 className="mt-10 font-serif text-2xl">Viktig å vite</h2>
      <p className="mt-3 leading-relaxed text-ink-soft">
        Resultatene er veiledende og kan være avrundet. Enkelte utregninger
        påvirkes av regler, unntak eller personlige forhold som en generell
        kalkulator ikke kan ta hensyn til.
      </p>
      <p className="mt-4 leading-relaxed text-ink-soft">
        Regneklar erstatter derfor ikke råd eller beregninger fra banker,
        Skatteetaten, helsepersonell eller andre fagfolk.
      </p>

      <h2 className="mt-10 font-serif text-2xl">Personvern</h2>
      <p className="mt-3 leading-relaxed text-ink-soft">
        Du trenger ikke opprette en konto for å bruke kalkulatorene.
        Informasjon om informasjonskapsler og analyse finner du i{" "}
        <Link href="/personvern" className="text-pine hover:underline">
          personvernerklæringen
        </Link>
        . Du kan endre samtykke når som helst via lenken i bunnteksten.
      </p>

      <p className="mt-8">
        <Link href="/" className="text-pine hover:underline">
          Tilbake til forsiden
        </Link>
      </p>
    </div>
  );
}
