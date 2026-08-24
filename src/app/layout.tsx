import { Figtree, Fraunces } from "next/font/google";
import type { Metadata } from "next";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import "./globals.css";

const sans = Figtree({
  variable: "--font-figtree",
  subsets: ["latin", "latin-ext"],
});

const serif = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin", "latin-ext"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://regneklar.no"),
  title: {
    default: "REGNEKLAR – kalkulatorer og formler",
    template: "%s · REGNEKLAR",
  },
  description:
    "Kalkulatorer og formler for økonomi, helse, sport, skole, bygg, hverdag og matematikk. På norsk, med forklaring.",
  keywords: [
    "kalkulator",
    "formel",
    "lån",
    "BMI",
    "løping",
    "tempo",
    "min/km",
    "prosent",
    "MVA",
    "enheter",
    "matematikk",
  ],
  openGraph: {
    title: "REGNEKLAR – kalkulatorer og formler",
    description:
      "Regn det ut. Skjønn det. Kalkulatorer og formler for alle, på norsk.",
    locale: "nb_NO",
    type: "website",
    siteName: "REGNEKLAR",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="nb"
      className={`${sans.variable} ${serif.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-paper text-ink font-sans">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
