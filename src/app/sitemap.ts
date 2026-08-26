import type { MetadataRoute } from "next";
import { calculators } from "@/lib/catalog";
import { categories } from "@/lib/categories";
import { formulas } from "@/lib/formulas";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://regneklar.no";
  const now = new Date();
  return [
    { url: base, lastModified: now, changeFrequency: "weekly", priority: 1 },
    {
      url: `${base}/formler`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${base}/om`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.4,
    },
    ...categories.map((c) => ({
      url: `${base}/kategori/${c.id}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    ...calculators.map((c) => ({
      url: `${base}/kalkulator/${c.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...formulas.map((f) => ({
      url: `${base}/formler/${f.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
