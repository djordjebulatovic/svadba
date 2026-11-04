import type { Vendor } from "./types";

export const eur = (n: number) => `${n.toLocaleString("sr-Latn-RS")} €`;

export function priceText(v: Vendor): string | null {
  if (v.priceFrom == null) return null;
  const unit = v.priceUnit ?? (v.category === "sale" ? "po osobi" : "ukupno");
  const prefix = v.category === "sale" ? "meni od" : "od";
  return unit === "ukupno" ? `${prefix} ${eur(v.priceFrom)}` : `${prefix} ${eur(v.priceFrom)} ${unit}`;
}

export function capacityText(v: Vendor): string | null {
  if (v.capacityMax && v.capacityMin) return `${v.capacityMin}–${v.capacityMax} gostiju`;
  if (v.capacityMax) return `do ${v.capacityMax} gostiju`;
  if (v.capacityMin) return `od ${v.capacityMin} gostiju`;
  return null;
}

export const VENUE_TYPE_LABEL: Record<string, string> = {
  sala: "Sala",
  restoran: "Restoran",
  vila: "Vila",
  priroda: "Priroda",
};
