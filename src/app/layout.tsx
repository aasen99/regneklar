import { CookieConsent } from "@/components/CookieConsent";
import { ConditionalAnalytics } from "@/components/ConditionalAnalytics";
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
  metadataBase: new URL("https://www.regneklar.no"),
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
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png", sizes: "32x32" },
      { url: "/icon-192.png", type: "image/png", sizes: "192x192" },
      { url: "/icon-512.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
  },
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
    url: "https://www.regneklar.no",
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
        <CookieConsent />
      </body>
      <ConditionalAnalytics gaId="G-HRZWPVKVPH" />
    </html>
  );
}
