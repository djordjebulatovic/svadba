"use server";

import { CATEGORIES } from "@/data/categories";
import { CITIES } from "@/data/cities";
import type { FormState } from "./form-state";
import { insertRow } from "./supabase";
import { getPublishedVendor } from "./vendors";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MONTH_RE = /^\d{4}-(0[1-9]|1[0-2])$/;
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

function str(fd: FormData, key: string, max = 500): string {
  const v = fd.get(key);
  return typeof v === "string" ? v.trim().slice(0, max) : "";
}

function int(fd: FormData, key: string, max = 100000): number | null {
  const s = str(fd, key, 12).replace(/\s/g, "");
  if (!s) return null;
  const n = Number(s);
  return Number.isFinite(n) && n >= 0 && n <= max ? Math.round(n) : NaN;
}

/** Skriveno polje koje ljudi ne vide; ako je popunjeno, u pitanju je bot. */
function isBot(fd: FormData) {
  return str(fd, "_hp") !== "";
}

function fail(errors: Record<string, string>): FormState {
  return { status: "error", message: "Proverite označena polja.", errors };
}

const SAVE_ERROR: FormState = {
  status: "error",
  message: "Slanje trenutno nije uspelo. Pokušajte ponovo za nekoliko minuta.",
};

export async function submitCoupleSignup(_: FormState, fd: FormData): Promise<FormState> {
  if (isBot(fd)) return { status: "success" };
  const name = str(fd, "name", 120);
  const email = str(fd, "email", 200);
  const city = str(fd, "city", 40);
  const wedding_month = str(fd, "wedding_month", 7);
  const guests = int(fd, "guests", 2000);
  const consent = fd.get("consent") === "on";

  const errors: Record<string, string> = {};
  if (!name) errors.name = "Unesite ime.";
  if (!EMAIL_RE.test(email)) errors.email = "Unesite ispravan mejl.";
  if (city && !CITIES.some((c) => c.slug === city)) errors.city = "Izaberite grad.";
  if (wedding_month && !MONTH_RE.test(wedding_month)) errors.wedding_month = "Izaberite mesec i godinu.";
  if (Number.isNaN(guests)) errors.guests = "Unesite broj gostiju.";
  if (!consent) errors.consent = "Potrebna je saglasnost da bismo vam se javili.";
  if (Object.keys(errors).length) return fail(errors);

  const res = await insertRow("couple_signups", {
    name, email, city: city || null, wedding_month: wedding_month || null, guests, consent,
  });
  if (!res.ok) return SAVE_ERROR;
  return { status: "success", message: "Hvala! Javićemo vam čim dodamo sale i usluge u vašem gradu." };
}

export async function submitVendorSignup(_: FormState, fd: FormData): Promise<FormState> {
  if (isBot(fd)) return { status: "success" };
  const business_name = str(fd, "business_name", 160);
  const category = str(fd, "category", 40);
  const city = str(fd, "city", 40);
  const contact_name = str(fd, "contact_name", 120);
  const phone = str(fd, "phone", 40);
  const email = str(fd, "email", 200);
  const website = str(fd, "website", 300);
  const capacity = int(fd, "capacity", 5000);
  const price_from = int(fd, "price_from", 1000000);
  const note = str(fd, "note", 2000);
  const source_vendor_slug = str(fd, "source_vendor_slug", 120) || null;
  const consent = fd.get("consent") === "on";

  const errors: Record<string, string> = {};
  if (!business_name) errors.business_name = "Unesite naziv firme.";
  if (!CATEGORIES.some((c) => c.slug === category)) errors.category = "Izaberite kategoriju.";
  if (!CITIES.some((c) => c.slug === city)) errors.city = "Izaberite grad.";
  if (!contact_name) errors.contact_name = "Unesite ime kontakt osobe.";
  if (!phone) errors.phone = "Unesite telefon.";
  if (!EMAIL_RE.test(email)) errors.email = "Unesite ispravan mejl.";
  if (Number.isNaN(capacity)) errors.capacity = "Unesite broj.";
  if (Number.isNaN(price_from)) errors.price_from = "Unesite iznos u evrima.";
  if (!consent) errors.consent = "Potrebna je saglasnost da bismo vas kontaktirali.";
  if (Object.keys(errors).length) return fail(errors);

  const res = await insertRow("vendor_signups", {
    business_name, category, city, contact_name, phone, email,
    website: website || null, capacity, price_from, note: note || null, consent, source_vendor_slug,
  });
  if (!res.ok) return SAVE_ERROR;
  return { status: "success", message: "Hvala! Javićemo vam se u roku od nekoliko dana da zajedno napravimo profil." };
}

export async function submitInquiry(_: FormState, fd: FormData): Promise<FormState> {
  if (isBot(fd)) return { status: "success" };
  const vendor_slug = str(fd, "vendor_slug", 120);
  const name = str(fd, "name", 120);
  const phone = str(fd, "phone", 40);
  const email = str(fd, "email", 200);
  const date = str(fd, "date", 10);
  const guests = int(fd, "guests", 2000);
  const message = str(fd, "message", 3000);
  const consent = fd.get("consent") === "on";

  const errors: Record<string, string> = {};
  // Upiti samo za objavljene vendore (demo stranice imaju isključen obrazac).
  if (!getPublishedVendor(vendor_slug)) return { status: "error", message: "Ovaj profil trenutno ne prima upite." };
  if (!name) errors.name = "Unesite ime.";
  if (!EMAIL_RE.test(email)) errors.email = "Unesite ispravan mejl.";
  if (date && !DATE_RE.test(date)) errors.date = "Izaberite datum.";
  if (Number.isNaN(guests)) errors.guests = "Unesite broj gostiju.";
  if (!consent) errors.consent = "Potrebna je saglasnost da bismo prosledili upit.";
  if (Object.keys(errors).length) return fail(errors);

  const res = await insertRow("inquiries", {
    vendor_slug, name, phone: phone || null, email, date: date || null, guests, message: message || null, consent,
  });
  if (!res.ok) return SAVE_ERROR;
  return { status: "success", message: "Upit je poslat. Vendor će vam se javiti direktno na mejl ili telefon." };
}
