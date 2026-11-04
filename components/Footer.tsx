import Link from "next/link";
import { CATEGORIES } from "@/data/categories";
import { CITIES } from "@/data/cities";
import { CONTACT_EMAIL, SITE_NAME } from "@/lib/site";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-line bg-tint/60">
      <div className="container-page grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-3">
          <p className="font-display text-xl font-semibold">{SITE_NAME}</p>
          <p className="text-sm text-muted">Sve za venčanje na jednom mestu, sa okvirnim cenama. Beograd i Novi Sad.</p>
        </div>
        {CITIES.map((city) => (
          <div key={city.slug}>
            <p className="mb-3 text-sm font-bold">{city.name}</p>
            <ul className="space-y-2 text-sm text-muted">
              {CATEGORIES.map((cat) => (
                <li key={cat.slug}>
                  <Link href={`/${city.slug}/${cat.slug}`} className="hover:text-ink">
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div>
          <p className="mb-3 text-sm font-bold">Sajt</p>
          <ul className="space-y-2 text-sm text-muted">
            <li><Link href="/za-vendore" className="hover:text-ink">Za vendore</Link></li>
            <li><Link href="/kalkulator" className="hover:text-ink">Kalkulator budžeta</Link></li>
            <li><Link href="/o-nama" className="hover:text-ink">O nama</Link></li>
            <li><Link href="/politika-privatnosti" className="hover:text-ink">Politika privatnosti</Link></li>
            <li><Link href="/uslovi-koriscenja" className="hover:text-ink">Uslovi korišćenja</Link></li>
            <li className="select-all">{CONTACT_EMAIL}</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-line">
        <p className="container-page py-5 text-xs text-muted">
          © {new Date().getFullYear()} {SITE_NAME}. Cene na sajtu su okvirne; tačnu ponudu daje vendor.
        </p>
      </div>
    </footer>
  );
}
