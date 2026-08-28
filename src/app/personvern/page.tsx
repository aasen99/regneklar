import type { Metadata } from "next";
import Link from "next/link";
import { CookieSettingsButton } from "@/components/CookieConsent";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata(
  "Personvern og informasjonskapsler",
  "Hvordan REGNEKLAR behandler personopplysninger, informasjonskapsler og Google Analytics.",
  { path: "/personvern" },
);

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="font-serif text-4xl">Personvern og informasjonskapsler</h1>
      <p className="mt-5 text-lg leading-relaxed text-ink-soft">
        REGNEKLAR.no tar personvern på alvor. Denne siden forklarer hva som
        lagres når du bruker nettstedet.
      </p>

      <h2 className="mt-10 font-serif text-2xl">Behandlingsansvarlig</h2>
      <p className="mt-3 leading-relaxed text-ink-soft">
        Nettstedet drives av Benjamin. Kontakt:{" "}
        <a href="mailto:post@regneklar.no" className="text-pine hover:underline">
          post@regneklar.no
        </a>
        .
      </p>

      <h2 className="mt-10 font-serif text-2xl">Nødvendige informasjonskapsler</h2>
      <p className="mt-3 leading-relaxed text-ink-soft">
        Vi lagrer valget ditt om informasjonskapsler lokalt i nettleseren
        (localStorage). Dette er nødvendig for å huske om du har sagt ja eller
        nei til analyse.
      </p>

      <h2 className="mt-10 font-serif text-2xl">Analyse (Google Analytics)</h2>
      <p className="mt-3 leading-relaxed text-ink-soft">
        Med ditt samtykke bruker vi Google Analytics for å forstå hvilke
        kalkulatorer som brukes mest. Analyse lastes ikke før du trykker «Tillat
        analyse». Standardtilstanden er nektet (Consent Mode). Vi bruker ikke
        annonsering eller sporing på tvers av nettsteder.
      </p>
      <p className="mt-3">
        <CookieSettingsButton />
      </p>

      <h2 className="mt-10 font-serif text-2xl">Kalkulatorer og lagring</h2>
      <p className="mt-3 leading-relaxed text-ink-soft">
        Tallene du skriver inn i kalkulatorene behandles i nettleseren din og
        sendes ikke til serveren for lagring. Vi samler ikke inn innholdet i
        feltene.
      </p>

      <h2 className="mt-10 font-serif text-2xl">Eksterne lenker</h2>
      <p className="mt-3 leading-relaxed text-ink-soft">
        Noen sider lenker til offentlige kilder (Skatteetaten, Kartverket m.m.)
        og til Penger i Fokus. Disse nettstedene har egne personvernregler.
      </p>

      <p className="mt-10">
        <Link href="/om" className="text-pine hover:underline">
          Tilbake til Om REGNEKLAR
        </Link>
      </p>
    </div>
  );
}
