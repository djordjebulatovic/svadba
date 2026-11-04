import type { Metadata } from "next";
import Link from "next/link";
import { SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "O nama",
  description: `Ko stoji iza sajta ${SITE_NAME} i zašto ga pravimo.`,
  alternates: { canonical: "/o-nama" },
};

export default function AboutPage() {
  return (
    <div className="container-page pt-8 sm:pt-12">
      <p className="eyebrow mb-3">O nama</p>
      <h1 className="mb-8 text-[2.1rem] sm:text-5xl">Zašto pravimo {SITE_NAME}</h1>
      <div className="prose-page">
        {/* TODO: dopuniti pravim imenom i pričom osnivača */}
        <p>
          Kada planirate venčanje u Srbiji, cene sala, muzike i fotografa obično saznate tek posle desetak poruka na Instagramu ili telefonskih poziva. Mi želimo da to bude jednostavnije.
        </p>
        <p>
          {SITE_NAME} okuplja sale, restorane, muziku, fotografe, venčanice, cveće i organizatore na jednom mestu, sa okvirnim cenama i jasnim informacijama. Počinjemo sa Beogradom i Novim Sadom.
        </p>
        <h2>Naša pravila</h2>
        <ul>
          <li>Ne objavljujemo izmišljene recenzije, ocene ni cene.</li>
          <li>Profil vendora objavljujemo samo uz njegovu saglasnost.</li>
          <li>Primeri profila su uvek jasno označeni kao primer.</li>
        </ul>
        <p>
          Imate salu ili uslugu za venčanja? <Link href="/za-vendore">Dodajte je besplatno</Link>.
        </p>
      </div>
    </div>
  );
}
