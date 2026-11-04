import type { Metadata } from "next";
import { VendorSignupForm } from "@/components/forms/VendorSignupForm";
import { IconCheck } from "@/components/icons";
import { SITE_NAME } from "@/lib/site";
import { getAnyVendorName } from "@/lib/vendors";

export const metadata: Metadata = {
  title: "Za vendore: besplatan profil za sale i usluge za venčanja",
  description: `Dodajte salu, muziku, fotografa ili drugu uslugu za venčanja na ${SITE_NAME}. Osnovni profil je besplatan, upiti stižu direktno od parova.`,
  alternates: { canonical: "/za-vendore" },
};

const BENEFITS = [
  { title: "Besplatan profil", text: "Fotografije, okvirne cene, kapacitet, meniji ili paketi. Mi ga pravimo sa vama." },
  { title: "Upiti direktno od parova", text: "Par šalje datum, broj gostiju i poruku. Upit stiže vama, bez posrednika." },
  { title: "Link koji šaljete klijentima", text: "Jedna uredna stranica sa svim informacijama umesto deset poruka na Instagramu." },
];

type Props = { searchParams: Promise<{ vendor?: string | string[] }> };

export default async function ForVendorsPage({ searchParams }: Props) {
  const raw = (await searchParams).vendor;
  const slug = typeof raw === "string" ? raw.slice(0, 120) : undefined;
  const prefillName = slug ? getAnyVendorName(slug) : undefined;

  return (
    <div className="container-page pt-8 sm:pt-12">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.25fr]">
        <div className="space-y-8">
          <header className="space-y-3">
            <p className="eyebrow">Za vendore</p>
            <h1 className="text-[2.1rem] sm:text-5xl">Imate salu ili uslugu za venčanja? Dodajte je besplatno.</h1>
            <p className="max-w-[52ch] text-muted">
              {SITE_NAME} pomaže parovima u Beogradu i Novom Sadu da na jednom mestu uporede sale i usluge sa okvirnim cenama.
            </p>
          </header>
          <ul className="space-y-5">
            {BENEFITS.map((b) => (
              <li key={b.title} className="flex gap-4">
                <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-tint text-brown">
                  <IconCheck className="h-5 w-5" />
                </span>
                <div>
                  <h2 className="font-sans text-base font-bold">{b.title}</h2>
                  <p className="text-muted">{b.text}</p>
                </div>
              </li>
            ))}
          </ul>
          <div className="rounded-2xl border border-line bg-surface p-5 text-sm leading-6">
            <p className="font-bold">Koliko košta?</p>
            <p className="mt-1 text-muted">
              Osnovni profil je besplatan. U budućnosti možda uvedemo dodatne plaćene opcije, ali osnovni profil ostaje besplatan za prve vendore.
            </p>
            <p className="mt-3 text-muted">Profil objavljujemo tek kada vi potvrdite podatke.</p>
          </div>
        </div>

        <section className="card p-5 sm:p-8" aria-labelledby="prijava">
          <h2 id="prijava" className="mb-6 text-2xl">Prijava za besplatan profil</h2>
          <VendorSignupForm prefillName={prefillName} sourceSlug={prefillName ? slug : undefined} />
        </section>
      </div>
    </div>
  );
}
