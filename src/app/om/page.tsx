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
        Regneklar gjør vanlige utregninger enklere å forstå. Her får du ikke
        bare et svar, men også formelen og en kort forklaring på hvordan
        resultatet regnes ut.
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
      <p className="mt-4 leading-relaxed text-ink-soft">
        Målet er at det skal være like enkelt å forstå utregningen som å få
        svaret.
      </p>

      <h2 className="mt-10 font-serif text-2xl">Kvalitet og kilder</h2>
      <p className="mt-3 leading-relaxed text-ink-soft">
        Kalkulatorer som bygger på regler eller satser som kan endre seg, viser
        kilde og dato for siste oppdatering. Opplysningene hentes så langt det
        er mulig fra offentlige og pålitelige kilder.
      </p>
      <p className="mt-4 leading-relaxed text-ink-soft">
        Formler og forklaringer er laget for å være tydelige og nyttige.
        Likevel kan feil forekomme.
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
