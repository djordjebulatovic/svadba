import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/JsonLd";
import { VendorProfile } from "@/components/VendorProfile";
import { getCategory } from "@/data/categories";
import { getCity } from "@/data/cities";
import { priceText } from "@/lib/format";
import { SITE_URL } from "@/lib/site";
import { getPublishedVendor, getPublishedVendors } from "@/lib/vendors";

type Props = { params: Promise<{ slug: string }> };

// Samo objavljeni vendori; demo vendori ovde vraćaju 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return getPublishedVendors().map((v) => ({ slug: v.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const v = getPublishedVendor((await params).slug);
  if (!v) return {};
  const cat = getCategory(v.category);
  const city = getCity(v.city);
  const price = priceText(v);
  const title = `${v.name}, ${cat?.name.toLowerCase()} u ${city?.locative}${price ? ` (${price})` : ""}`;
  return {
    title,
    description: (v.description ?? `${v.name}: ${cat?.name} u ${city?.locative}.`).slice(0, 155),
    alternates: { canonical: `/vendor/${v.slug}` },
    openGraph: { title, url: `/vendor/${v.slug}`, images: v.images[0] ? [{ url: v.images[0] }] : undefined },
    // Izmišljeni primer profila ne treba da se indeksira kao prava firma.
    robots: v.isExample ? { index: false, follow: true } : undefined,
  };
}

export default async function VendorPage({ params }: Props) {
  const vendor = getPublishedVendor((await params).slug);
  if (!vendor) notFound();
  const city = getCity(vendor.city);

  return (
    <>
      {!vendor.isExample && (
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            name: vendor.name,
            url: `${SITE_URL}/vendor/${vendor.slug}`,
            image: vendor.images.map((i) => `${SITE_URL}${i}`),
            description: vendor.description,
            telephone: vendor.phone,
            email: vendor.email,
            address: vendor.address
              ? { "@type": "PostalAddress", streetAddress: vendor.address, addressLocality: city?.name, addressCountry: "RS" }
              : undefined,
            priceRange: vendor.priceFrom ? `od ${vendor.priceFrom} EUR` : undefined,
            sameAs: [vendor.website, vendor.instagram && `https://instagram.com/${vendor.instagram.replace(/^@/, "")}`].filter(Boolean),
          }}
        />
      )}
      <VendorProfile vendor={vendor} />
    </>
  );
}
