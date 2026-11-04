import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { IconArrow } from "@/components/icons";
import { VendorProfile } from "@/components/VendorProfile";
import { SITE_NAME } from "@/lib/site";
import { getDemoTokens, getDemoVendor } from "@/lib/vendors";

type Props = { params: Promise<{ token: string }> };

// Pristup samo preko tačnog tokena iz JSON-a; nepoznat token = 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return getDemoTokens().map((token) => ({ token }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const v = getDemoVendor((await params).token);
  return {
    title: v ? `${v.name} (primer stranice)` : "Primer stranice",
    robots: { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false } },
    alternates: { canonical: null },
    openGraph: null,
  };
}

export default async function DemoPage({ params }: Props) {
  const vendor = getDemoVendor((await params).token);
  if (!vendor) notFound();

  return (
    <>
      <div className="sticky top-16 z-30 bg-ink text-white" role="note">
        <p className="container-page py-2.5 text-center text-sm">
          Ovo je primer kako bi vaša stranica izgledala na {SITE_NAME}. Stranica nije javno objavljena.
        </p>
      </div>

      <VendorProfile vendor={vendor} demo />

      <section className="container-page pb-8" aria-labelledby="demo-cta">
        <div className="flex flex-col items-start justify-between gap-6 rounded-[28px] bg-tint p-6 sm:flex-row sm:items-center sm:p-10">
          <div>
            <h2 id="demo-cta" className="text-2xl sm:text-3xl">Želite ovakvu stranicu besplatno?</h2>
            <p className="mt-2 text-muted">Pošaljite nam podatke i fotografije, a mi pravimo profil. Objavljujemo ga tek kada ga vi odobrite.</p>
          </div>
          <Link href={`/za-vendore?vendor=${encodeURIComponent(vendor.slug)}`} className="btn shrink-0">
            Želim besplatan profil <IconArrow />
          </Link>
        </div>
      </section>
    </>
  );
}
