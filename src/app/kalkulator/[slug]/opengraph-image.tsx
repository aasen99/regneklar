import { getCategory } from "@/lib/categories";
import { getCalculator } from "@/lib/catalog";
import { createOgImage, ogSize } from "@/lib/og-image";

export const alt = "Kalkulator på REGNEKLAR";
export const size = ogSize;
export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const calculator = getCalculator(slug);
  const category = calculator
    ? getCategory(calculator.category)
    : undefined;

  return createOgImage({
    kicker: (category?.title ?? "Kalkulator").toUpperCase(),
    title: calculator?.title ?? "REGNEKLAR",
  });
}
