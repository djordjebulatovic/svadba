import type { MetadataRoute } from "next";
import { CATEGORIES } from "@/data/categories";
import { CITIES } from "@/data/cities";
import { SITE_URL } from "@/lib/site";
import { getPublishedVendors } from "@/lib/vendors";

// Samo javne stranice. /demo/ nikada ne ulazi u sitemap; izmišljeni primeri takođe ne.
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticPages = ["", "/za-vendore", "/kalkulator", "/o-nama", "/politika-privatnosti", "/uslovi-koriscenja"].map((p) => ({
    url: `${SITE_URL}${p}`,
    lastModified: now,
  }));
  const cities = CITIES.map((c) => ({ url: `${SITE_URL}/${c.slug}`, lastModified: now }));
  const lists = CITIES.flatMap((c) => CATEGORIES.map((k) => ({ url: `${SITE_URL}/${c.slug}/${k.slug}`, lastModified: now })));
  const vendors = getPublishedVendors()
    .filter((v) => !v.isExample)
    .map((v) => ({ url: `${SITE_URL}/vendor/${v.slug}`, lastModified: new Date(v.updatedAt) }));
  return [...staticPages, ...cities, ...lists, ...vendors];
}
