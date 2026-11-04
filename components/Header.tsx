import Link from "next/link";
import { SITE_NAME } from "@/lib/site";
import { IconClose, IconMenu } from "./icons";

const NAV = [
  { href: "/beograd/sale", label: "Sale" },
  { href: "/#kategorije", label: "Usluge" },
  { href: "/kalkulator", label: "Kalkulator budžeta" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg/95 backdrop-blur supports-[backdrop-filter]:bg-bg/85">
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <Link href="/" className="font-display text-xl font-semibold tracking-tight text-ink sm:text-[22px]">
          {SITE_NAME}
        </Link>

        <nav aria-label="Glavna navigacija" className="hidden items-center gap-7 md:flex">
          {NAV.map((item) => (
            <Link key={item.href} href={item.href} className="text-[15px] font-medium text-muted hover:text-ink">
              {item.label}
            </Link>
          ))}
          <Link href="/za-vendore" className="btn-outline min-h-10 px-4 py-2 text-sm">
            Za vendore
          </Link>
        </nav>

        {/* Mobilni meni radi i bez JavaScript-a */}
        <details className="group relative md:hidden">
          <summary className="flex h-11 w-11 cursor-pointer list-none items-center justify-center rounded-full text-ink hover:bg-tint [&::-webkit-details-marker]:hidden">
            <span className="sr-only">Otvori meni</span>
            <span className="group-open:hidden"><IconMenu /></span>
            <span className="hidden group-open:block"><IconClose /></span>
          </summary>
          <nav aria-label="Mobilna navigacija" className="absolute right-0 top-14 w-64 rounded-2xl border border-line bg-surface p-2 shadow-[var(--shadow-float)]">
            {NAV.map((item) => (
              <Link key={item.href} href={item.href} className="block rounded-xl px-4 py-3 text-[15px] font-medium hover:bg-tint">
                {item.label}
              </Link>
            ))}
            <Link href="/za-vendore" className="mt-1 block rounded-xl bg-tint px-4 py-3 text-[15px] font-semibold text-brown">
              Za vendore: dodajte profil
            </Link>
          </nav>
        </details>
      </div>
    </header>
  );
}
