import Link from "next/link";
import { getCategory } from "@/data/categories";
import { getCity } from "@/data/cities";
import { capacityText, eur, priceText, VENUE_TYPE_LABEL } from "@/lib/format";
import type { Vendor } from "@/lib/types";
import { Gallery } from "./Gallery";
import { InquiryForm } from "./forms/InquiryForm";
import { IconCheck, IconGlobe, IconInstagram, IconMail, IconPhone, IconPin, IconShield } from "./icons";

const has = (v: Vendor, f: string) => v.features?.some((x) => x.toLowerCase() === f.toLowerCase());

function facts(v: Vendor): { label: string; value: string }[] {
  const out: { label: string; value: string }[] = [];
  const price = v.priceFrom != null ? `${eur(v.priceFrom)}${v.priceUnit && v.priceUnit !== "ukupno" ? ` ${v.priceUnit}` : ""}` : null;
  if (v.category === "sale") {
    const cap = capacityText(v);
    if (cap) out.push({ label: "Kapacitet", value: cap });
    if (price) out.push({ label: "Meni od", value: price });
    if (v.venueType) out.push({ label: "Tip prostora", value: VENUE_TYPE_LABEL[v.venueType] });
    out.push({ label: "Parking", value: has(v, "Parking") ? "Da" : "Nije navedeno" });
    out.push({ label: "Terasa", value: has(v, "Terasa") ? "Da" : "Nije navedeno" });
    out.push({ label: "Smeštaj", value: has(v, "Smeštaj") ? "Da" : "Nije navedeno" });
    out.push({ label: "Bina za bend", value: has(v, "Bina za bend") ? "Da" : "Nije navedeno" });
  } else {
    if (price) out.push({ label: "Cena od", value: price });
    const cap = capacityText(v);
    if (cap) out.push({ label: "Kapacitet", value: cap });
  }
  return out;
}

function mapsLink(v: Vendor) {
  if (v.mapsUrl) return v.mapsUrl;
  if (!v.address) return null;
  const city = getCity(v.city)?.name ?? "";
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${v.address}, ${city}`)}`;
}

export function VendorProfile({ vendor, demo = false }: { vendor: Vendor; demo?: boolean }) {
  const category = getCategory(vendor.category);
  const city = getCity(vendor.city);
  const price = priceText(vendor);
  const map = mapsLink(vendor);
  const updated = new Date(vendor.updatedAt).toLocaleDateString("sr-Latn-RS", { day: "numeric", month: "long", year: "numeric" });
  const instagramHandle = vendor.instagram?.replace(/^@/, "").replace(/^https?:\/\/(www\.)?instagram\.com\//, "").replace(/\/$/, "");

  return (
    <div className="container-page pb-28 pt-6 lg:pb-12">
      {!demo && category && city && (
        <nav aria-label="Putanja" className="mb-4 text-sm text-muted">
          <Link href={`/${city.slug}/${category.slug}`} className="hover:text-ink">
            ← {category.name} u {city.locative}
          </Link>
        </nav>
      )}

      <Gallery images={vendor.images} name={vendor.name} />

      <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1fr)_380px]">
        <div className="min-w-0 space-y-8">
          <header className="space-y-3">
            <div className="flex flex-wrap gap-2">
              {vendor.isExample && (
                <span className="rounded-full bg-sand-light px-3 py-1 text-xs font-bold text-brown-dark">
                  Primer profila · podaci nisu pravi
                </span>
              )}
              {vendor.verified && (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-success/10 px-3 py-1 text-xs font-bold text-success">
                  <IconShield /> Podaci potvrđeni od strane vendora
                </span>
              )}
            </div>
            <h1 className="text-[2.1rem] sm:text-5xl">{vendor.name}</h1>
            <p className="text-muted">
              {category?.name}
              {vendor.area && ` · ${vendor.area}`}
              {city && `, ${city.name}`}
            </p>
            {vendor.address && (
              <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm">
                <IconPin className="h-4 w-4 text-brown" />
                <span>{vendor.address}</span>
                {map && (
                  <a href={map} target="_blank" rel="noopener noreferrer" className="font-semibold text-brown underline">
                    Otvori u Google mapama
                  </a>
                )}
              </p>
            )}
          </header>

          <section aria-labelledby="kljucno">
            <h2 id="kljucno" className="sr-only">Ključne informacije</h2>
            <dl className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {facts(vendor).map((f) => (
                <div key={f.label} className="rounded-2xl border border-line bg-surface px-4 py-3">
                  <dt className="text-xs font-bold uppercase tracking-[0.08em] text-muted">{f.label}</dt>
                  <dd className="mt-0.5 font-semibold tabular-nums">{f.value}</dd>
                </div>
              ))}
            </dl>
          </section>

          {vendor.description && (
            <section aria-labelledby="opis" className="space-y-3">
              <h2 id="opis" className="text-2xl">Opis</h2>
              <p className="max-w-[68ch] whitespace-pre-line leading-7">{vendor.description}</p>
            </section>
          )}

          {(vendor.includes?.length || vendor.features?.length) ? (
            <section aria-labelledby="ukljuceno" className="grid gap-8 sm:grid-cols-2">
              {vendor.includes && vendor.includes.length > 0 && (
                <div className="space-y-3">
                  <h2 id="ukljuceno" className="text-2xl">Šta je uključeno</h2>
                  <ul className="space-y-2">
                    {vendor.includes.map((x) => (
                      <li key={x} className="flex gap-2"><IconCheck className="mt-1 h-4 w-4 shrink-0 text-brown" />{x}</li>
                    ))}
                  </ul>
                </div>
              )}
              {vendor.features && vendor.features.length > 0 && (
                <div className="space-y-3">
                  <h2 className="text-2xl">Pogodnosti</h2>
                  <ul className="flex flex-wrap gap-2">
                    {vendor.features.map((f) => (
                      <li key={f} className="rounded-full border border-line bg-surface px-3 py-1 text-sm">{f}</li>
                    ))}
                  </ul>
                </div>
              )}
            </section>
          ) : null}

          {vendor.packages && vendor.packages.length > 0 && (
            <section aria-labelledby="paketi" className="space-y-3">
              <h2 id="paketi" className="text-2xl">{vendor.category === "sale" ? "Meniji" : "Paketi"}</h2>
              <ul className="grid gap-3 sm:grid-cols-2">
                {vendor.packages.map((p) => (
                  <li key={p.name} className="card p-5">
                    <div className="flex items-baseline justify-between gap-3">
                      <h3 className="text-lg">{p.name}</h3>
                      {p.priceFrom != null && <p className="shrink-0 font-bold text-brown">od {eur(p.priceFrom)}</p>}
                    </div>
                    {p.includes && (
                      <ul className="mt-3 space-y-1 text-sm text-muted">
                        {p.includes.map((x) => <li key={x}>{x}</li>)}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {(vendor.phone || vendor.website || vendor.instagram || vendor.email) && (
            <section aria-labelledby="kontakt" className="space-y-3">
              <h2 id="kontakt" className="text-2xl">Kontakt</h2>
              <ul className="space-y-2">
                {vendor.phone && (
                  <li className="flex items-center gap-2"><IconPhone className="h-4 w-4 text-brown" /><a href={`tel:${vendor.phone.replace(/\s/g, "")}`} className="select-all hover:underline">{vendor.phone}</a></li>
                )}
                {vendor.email && (
                  <li className="flex items-center gap-2"><IconMail className="h-4 w-4 text-brown" /><a href={`mailto:${vendor.email}`} className="select-all hover:underline">{vendor.email}</a></li>
                )}
                {vendor.website && (
                  <li className="flex items-center gap-2"><IconGlobe className="h-4 w-4 text-brown" /><a href={vendor.website} target="_blank" rel="noopener noreferrer nofollow" className="hover:underline">{vendor.website.replace(/^https?:\/\//, "")}</a></li>
                )}
                {instagramHandle && (
                  <li className="flex items-center gap-2"><IconInstagram className="h-4 w-4 text-brown" /><a href={`https://instagram.com/${instagramHandle}`} target="_blank" rel="noopener noreferrer nofollow" className="hover:underline">@{instagramHandle}</a></li>
                )}
              </ul>
            </section>
          )}

          <p className="text-xs text-muted">
            Poslednja izmena: {updated.replace(/\.$/, "")}. Cene su okvirne; tačnu ponudu dobijate od vendora.
          </p>
        </div>

        <aside id="upit" className="scroll-mt-24 lg:sticky lg:top-24 lg:self-start" aria-labelledby="upit-naslov">
          <div className="card p-5 sm:p-6">
            {price && (
              <p className="mb-1 text-sm text-muted">
                Okvirna cena <span className="block font-display text-2xl text-ink">{price}</span>
              </p>
            )}
            <h2 id="upit-naslov" className="mb-4 mt-3 text-xl">Pošaljite upit za {vendor.name}</h2>
            <InquiryForm vendorSlug={vendor.slug} vendorName={vendor.name} disabled={demo || vendor.isExample} />
          </div>
        </aside>
      </div>

      {/* Mobilna traka sa dugmetom za upit */}
      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-surface/95 px-4 pb-[max(12px,env(safe-area-inset-bottom))] pt-3 backdrop-blur lg:hidden">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3">
          <p className="min-w-0 text-xs leading-tight text-muted">
            {price ? <>Okvirna cena<span className="block truncate text-[15px] font-bold text-ink">{price}</span></> : vendor.name}
          </p>
          <a href="#upit" className="btn shrink-0">Pošalji upit</a>
        </div>
      </div>
    </div>
  );
}
