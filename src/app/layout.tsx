import { GoogleAnalytics } from "@next/third-parties/google";
import { Figtree, Fraunces } from "next/font/google";
import type { Metadata } from "next";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { SITE_DESCRIPTION } from "@/lib/seo";
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
    default: "REGNEKLAR – gratis kalkulatorer og formler",
    template: "%s · REGNEKLAR",
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "kalkulator",
    "formel",
    "gratis kalkulator",
    "BMI",
    "løping",
    "tempo",
    "prosent",
    "matematikk",
    "trigonometri",
    "fysikk",
    "statistikk",
    "musikk",
    "BPM",
    "foto",
    "kaffe",
    "studiepoeng",
    "karakter",
    "bygg",
    "Pythagoras",
  ],
  applicationName: "REGNEKLAR",
  manifest: "/site.webmanifest",
  appleWebApp: {
    title: "REGNEKLAR",
    statusBarStyle: "default",
  },
  openGraph: {
    locale: "nb_NO",
    type: "website",
    siteName: "REGNEKLAR",
    title: "REGNEKLAR – gratis kalkulatorer og formler",
    description: SITE_DESCRIPTION,
    url: "https://regneklar.no",
  },
  twitter: {
    card: "summary_large_image",
    title: "REGNEKLAR – gratis kalkulatorer og formler",
    description: SITE_DESCRIPTION,
  },
  alternates: {
    canonical: "/",
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
      <GoogleAnalytics gaId="G-HRZWPVKVPH" />
    </html>
  );
}
