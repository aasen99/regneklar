import { getCategory } from "@/lib/categories";
import { getFormula } from "@/lib/formulas";
import { createOgImage, ogSize } from "@/lib/og-image";

export const alt = "Formel på REGNEKLAR";
export const size = ogSize;
export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const formula = getFormula(slug);
  const category = formula ? getCategory(formula.category) : undefined;

  return createOgImage({
    kicker: `${(category?.title ?? "Formel").toUpperCase()} · FORMEL`,
    title: formula?.title ?? "REGNEKLAR",
  });
}
