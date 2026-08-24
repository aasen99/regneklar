import type { MetadataRoute } from "next";
import { calculators } from "@/lib/catalog";
import { categories } from "@/lib/categories";
import { formulas } from "@/lib/formulas";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://regneklar.no";
  const now = new Date();
  return [
    { url: base, lastModified: now },
    { url: `${base}/formler`, lastModified: now },
    { url: `${base}/om`, lastModified: now },
    { url: `${base}/sok`, lastModified: now },
    ...categories.map((c) => ({
      url: `${base}/kategori/${c.id}`,
      lastModified: now,
    })),
    ...calculators.map((c) => ({
      url: `${base}/kalkulator/${c.slug}`,
      lastModified: now,
    })),
    ...formulas.map((f) => ({
      url: `${base}/formler/${f.slug}`,
      lastModified: now,
    })),
  ];
}
