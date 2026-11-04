import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { CoupleSignupForm } from "@/components/forms/CoupleSignupForm";
import { VendorList } from "@/components/VendorList";
import { CATEGORIES, getCategory } from "@/data/categories";
import { CITIES, getCity } from "@/data/cities";
import { SITE_NAME } from "@/lib/site";
import { getVendorsFor } from "@/lib/vendors";

type Props = { params: Promise<{ grad: string; kategorija: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return CITIES.flatMap((c) => CATEGORIES.map((k) => ({ grad: c.slug, kategorija: k.slug })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { grad, kategorija } = await params;
  const city = getCity(grad);
  const cat = getCategory(kategorija);
  if (!city || !cat) return {};
  const title = `${cat.plural} u ${city.locative} sa cenama`;
  return {
    title,
    description: `${cat.plural} u ${city.locative}: okvirne cene, kapacitet i fotografije na jednom mestu. Pošaljite upit direktno, bez dopisivanja. ${SITE_NAME}.`,
    alternates: { canonical: `/${city.slug}/${cat.slug}` },
    openGraph: { title: `${title} | ${SITE_NAME}`, url: `/${city.slug}/${cat.slug}` },
  };
}

export default async function ListPage({ params }: Props) {
  const { grad, kategorija } = await params;
  const city = getCity(grad);
  const cat = getCategory(kategorija);
  if (!city || !cat) notFound();
  const vendors = getVendorsFor(city.slug, cat.slug);
  const other = CITIES.find((c) => c.slug !== city.slug)!;

  return (
    <div className="container-page pt-8 sm:pt-12">
      <header className="mb-8 space-y-3">
        <p className="eyebrow">{city.name}</p>
        <h1 className="text-[2.1rem] sm:text-5xl">{cat.plural} u {city.locative}</h1>
        <p className="max-w-[60ch] text-muted">{cat.description} Cene su okvirne; tačnu ponudu daje vendor.</p>
        <nav aria-label="Kategorije" className="-mx-4 flex gap-2 overflow-x-auto px-4 pt-2 sm:mx-0 sm:flex-wrap sm:px-0">
          {CATEGORIES.map((c) => (
            <Link
              key={c.slug}
              href={`/${city.slug}/${c.slug}`}
              aria-current={c.slug === cat.slug ? "page" : undefined}
              className="shrink-0 rounded-full border border-line px-4 py-2 text-sm font-medium text-muted hover:border-brown hover:text-ink aria-[current=page]:border-brown aria-[current=page]:bg-brown aria-[current=page]:text-white"
            >
              {c.name}
            </Link>
          ))}
          <Link href={`/${other.slug}/${cat.slug}`} className="shrink-0 rounded-full px-4 py-2 text-sm font-semibold text-brown underline">
            {other.name} →
          </Link>
        </nav>
      </header>

      {vendors.length > 0 ? (
        <Suspense fallback={<p className="text-muted">Učitavanje…</p>}>
          <VendorList vendors={vendors} isVenue={cat.slug === "sale"} />
        </Suspense>
      ) : (
        <section className="grid gap-8 rounded-[28px] bg-tint p-6 sm:p-10 lg:grid-cols-[1fr_1.3fr]" aria-labelledby="uskoro">
          <div>
            <h2 id="uskoro" className="text-2xl sm:text-3xl">
              Uskoro dodajemo {cat.short} u {city.locative}.
            </h2>
            <p className="mt-3 text-muted">Ostavite mejl i javićemo vam.</p>
            <p className="mt-6 text-sm text-muted">
              Imate {cat.slug === "sale" ? "salu" : "uslugu"} u {city.locative}?{" "}
              <Link href="/za-vendore" className="font-semibold text-brown underline">Dodajte je besplatno</Link>.
            </p>
          </div>
          <div className="card p-5 sm:p-8">
            <CoupleSignupForm defaultCity={city.slug} />
          </div>
        </section>
      )}
    </div>
  );
}
