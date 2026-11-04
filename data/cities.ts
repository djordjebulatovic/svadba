import type { CitySlug } from "@/lib/types";

export const CITIES: { slug: CitySlug; name: string; locative: string }[] = [
  { slug: "beograd", name: "Beograd", locative: "Beogradu" },
  { slug: "novi-sad", name: "Novi Sad", locative: "Novom Sadu" },
];

export function getCity(slug: string) {
  return CITIES.find((c) => c.slug === slug);
}
