import { createOgImage, ogSize } from "@/lib/og-image";

export const alt = "REGNEKLAR – kalkulatorer og formler på norsk";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return createOgImage({
    kicker: "KALKULATORER OG FORMLER",
    title: "Regn det ut. Skjønn det.",
  });
}
