import type { Metadata } from "next";
import { CONTACT_EMAIL, SITE_NAME, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Politika privatnosti",
  description: `Koje podatke ${SITE_NAME} prikuplja, zašto, koliko ih čuva i kako se traži brisanje.`,
  alternates: { canonical: "/politika-privatnosti" },
};

export default function PrivacyPage() {
  return (
    <div className="container-page pt-8 sm:pt-12">
      <p className="eyebrow mb-3">Pravne informacije</p>
      <h1 className="mb-2 text-[2.1rem] sm:text-5xl">Politika privatnosti</h1>
      <p className="mb-8 text-sm text-muted">Poslednja izmena: 4. novembar 2026.</p>
      <div className="prose-page">
        {/* TODO: pre objave proveriti sa pravnikom i upisati podatke rukovaoca */}
        <p>
          Ova politika objašnjava kako {SITE_NAME} ({SITE_URL}) obrađuje podatke o ličnosti, u skladu sa Zakonom o zaštiti podataka o ličnosti
          („Službeni glasnik RS“, br. 87/2018).
        </p>

        <h2>Ko je rukovalac podacima</h2>
        <p>Rukovalac je [IME I PREZIME / NAZIV FIRME, ADRESA, PIB]. Kontakt za pitanja o privatnosti: <span className="select-all">{CONTACT_EMAIL}</span>.</p>

        <h2>Koje podatke prikupljamo</h2>
        <ul>
          <li><strong>Obrazac za parove:</strong> ime, mejl, grad, okvirni mesec venčanja, broj gostiju.</li>
          <li><strong>Upit vendoru:</strong> ime, telefon, mejl, datum venčanja, broj gostiju i poruka.</li>
          <li><strong>Prijava vendora:</strong> naziv firme, kategorija, grad, kontakt osoba, telefon, mejl, sajt ili Instagram, kapacitet, okvirna cena i napomena.</li>
        </ul>
        <p>Ne koristimo naloge, ne prikupljamo podatke o plaćanju i ne prodajemo podatke trećim licima.</p>

        <h2>Zašto ih prikupljamo</h2>
        <ul>
          <li>Da vas obavestimo kada dodamo sale i usluge u vašem gradu (parovi).</li>
          <li>Da prosledimo vaš upit izabranom vendoru (upiti). Vendor dobija podatke iz upita kako bi vam odgovorio.</li>
          <li>Da vas kontaktiramo radi izrade profila (vendori).</li>
        </ul>
        <p>Osnov obrade je vaš pristanak, koji dajete označavanjem polja za saglasnost. Pristanak možete povući u svakom trenutku.</p>

        <h2>Koliko dugo čuvamo podatke</h2>
        <ul>
          <li>Prijave parova: do 24 meseca od prijave, ili kraće ako zatražite brisanje.</li>
          <li>Upiti vendorima: do 12 meseci od slanja.</li>
          <li>Prijave vendora: dok traje saradnja, a najduže 24 meseca od poslednjeg kontakta ako profil nije objavljen.</li>
        </ul>

        <h2>Ko obrađuje podatke za nas</h2>
        <p>
          Podaci se čuvaju kod pružaoca usluge baze podataka (Supabase), a sajt je smešten kod pružaoca hostinga (Vercel). Ovi pružaoci mogu obrađivati podatke van Srbije, uz odgovarajuće mere zaštite predviđene zakonom.
        </p>

        <h2>Vaša prava i kako tražite brisanje</h2>
        <p>
          Imate pravo na pristup, ispravku, brisanje, ograničenje obrade, prenosivost podataka i prigovor, kao i pravo da povučete pristanak. Za brisanje ili bilo koji drugi zahtev pišite na{" "}
          <span className="select-all">{CONTACT_EMAIL}</span> sa mejl adrese koju ste uneli. Odgovaramo najkasnije u roku od 30 dana.
        </p>
        <p>
          Ako smatrate da su vam prava povređena, možete podneti pritužbu Povereniku za informacije od javnog značaja i zaštitu podataka o ličnosti.
        </p>

        <h2>Kolačići</h2>
        <p>Sajt trenutno ne koristi kolačiće za praćenje ni oglašavanje. Ako to promenimo, ažuriraćemo ovu stranicu i tražiti saglasnost.</p>
      </div>
    </div>
  );
}
