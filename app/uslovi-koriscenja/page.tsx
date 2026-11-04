import type { Metadata } from "next";
import Link from "next/link";
import { CONTACT_EMAIL, SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "Uslovi korišćenja",
  description: `Uslovi korišćenja sajta ${SITE_NAME}.`,
  alternates: { canonical: "/uslovi-koriscenja" },
};

export default function TermsPage() {
  return (
    <div className="container-page pt-8 sm:pt-12">
      <p className="eyebrow mb-3">Pravne informacije</p>
      <h1 className="mb-2 text-[2.1rem] sm:text-5xl">Uslovi korišćenja</h1>
      <p className="mb-8 text-sm text-muted">Poslednja izmena: 4. novembar 2026.</p>
      <div className="prose-page">
        {/* TODO: pre objave proveriti sa pravnikom */}
        <h2>O sajtu</h2>
        <p>{SITE_NAME} je katalog sala i usluga za venčanja. Ne pružamo te usluge sami i nismo strana u dogovoru između para i vendora.</p>
        <h2>Cene i podaci</h2>
        <p>
          Cene su okvirne („cena od“) i služe za poređenje. Tačnu ponudu daje vendor. Podatke koje vendor nije potvrdio ne označavamo kao potvrđene.
          Primeri profila su izmišljeni i jasno označeni.
        </p>
        <h2>Upiti</h2>
        <p>Kada pošaljete upit, prosleđujemo ga izabranom vendoru. Dalja komunikacija i dogovor su između vas i vendora.</p>
        <h2>Vendori</h2>
        <p>
          Profil vendora objavljujemo samo uz njegovu saglasnost. Vendor odgovara za tačnost podataka koje nam dostavi i može u svakom trenutku tražiti izmenu ili uklanjanje profila.
        </p>
        <h2>Privatnost</h2>
        <p>Obrada podataka je opisana u <Link href="/politika-privatnosti">politici privatnosti</Link>.</p>
        <h2>Kontakt</h2>
        <p>Pitanja i zahtevi: <span className="select-all">{CONTACT_EMAIL}</span>.</p>
      </div>
    </div>
  );
}
