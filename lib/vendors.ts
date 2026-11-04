import "server-only";
import fs from "node:fs";
import path from "node:path";
import type { CategorySlug, CitySlug, Vendor } from "./types";

const DIR = path.join(process.cwd(), "data", "vendors");

let cache: Vendor[] | null = null;

/** Svi vendori iz /data/vendors/*.json (i demo i objavljeni). */
function loadAll(): Vendor[] {
  if (cache && process.env.NODE_ENV === "production") return cache;
  const files = fs.readdirSync(DIR).filter((f) => f.endsWith(".json"));
  const vendors = files.map((file) => {
    const raw = JSON.parse(fs.readFileSync(path.join(DIR, file), "utf8")) as Vendor;
    if (!raw.slug || !raw.name || !raw.category || !raw.city || !raw.status) {
      throw new Error(`Vendor ${file}: nedostaju obavezna polja (slug, name, category, city, status).`);
    }
    if (raw.status === "demo" && !raw.demoToken) {
      throw new Error(`Vendor ${file}: demo vendor mora imati demoToken.`);
    }
    return { ...raw, images: raw.images ?? [], verified: Boolean(raw.verified) };
  });
  cache = vendors;
  return vendors;
}

/** Samo objavljeni vendori: jedini koji smeju u liste, sitemap i /vendor/[slug]. */
export function getPublishedVendors(): Vendor[] {
  return loadAll().filter((v) => v.status === "published");
}

export function getPublishedVendor(slug: string): Vendor | undefined {
  return getPublishedVendors().find((v) => v.slug === slug);
}

export function getVendorsFor(city: CitySlug, category: CategorySlug): Vendor[] {
  return getPublishedVendors().filter((v) => v.city === city && v.category === category);
}

/** Demo vendor po tajnom tokenu. */
export function getDemoVendor(token: string): Vendor | undefined {
  return loadAll().find((v) => v.status === "demo" && v.demoToken === token);
}

export function getDemoTokens(): string[] {
  return loadAll()
    .filter((v) => v.status === "demo" && v.demoToken)
    .map((v) => v.demoToken as string);
}

/** Bilo koji vendor po slug-u (koristi se samo za popunjavanje imena na /za-vendore). */
export function getAnyVendorName(slug: string): string | undefined {
  return loadAll().find((v) => v.slug === slug)?.name;
}
