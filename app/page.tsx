import Image from "next/image";
import Link from "next/link";
import { CategoryGrid } from "@/components/CategoryGrid";
import { CoupleSignupForm } from "@/components/forms/CoupleSignupForm";
import { IconArrow } from "@/components/icons";
import { SearchBar } from "@/components/SearchBar";
import { BUDGET_ITEMS, BUDGET_NOTE } from "@/data/budget";
import { SITE_NAME } from "@/lib/site";

const STEPS = [
  { title: "Pretražite", text: "Izaberite grad, kategoriju i broj gostiju. Odmah vidite okvirne cene i kapacitet." },
  { title: "Uporedite", text: "Pogledajte fotografije, menije, pakete i šta je uključeno, sve na jednoj stranici." },
  { title: "Pošaljite upit", text: "Jedan kratak obrazac ide direktno vendoru. Bez dopisivanja po Instagramu." },
];

export default function HomePage() {
  return (
    <>
      {/* Hero: fotografija preko cele širine, pretraga prelazi preko donje ivice */}
      <section className="relative">
        <div className="relative isolate overflow-hidden">
          <Image
            src="/hero.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="-z-20 object-cover"
          />
          <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink/70 via-ink/35 to-ink/10" />
          <div className="container-page flex min-h-[420px] flex-col justify-end pb-20 pt-24 sm:min-h-[480px] sm:pb-24">
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.16em] text-white/85">Beograd i Novi Sad</p>
            <h1 className="max-w-[16ch] text-[2.4rem] font-normal leading-[1.08] text-white sm:text-6xl">
              Sve za venčanje na jednom mestu, sa okvirnim cenama
            </h1>
            <p className="mt-4 max-w-[52ch] text-[17px] text-white/90">
              Sale, muzika, fotografi, venčanice, cveće i organizatori. Uporedite cene i pošaljite upit direktno, bez dopisivanja.
            </p>
          </div>
        </div>
        <div className="container-page relative z-10 -mt-12 sm:-mt-14">
          <SearchBar />
        </div>
      </section>

      <section id="kategorije" className="container-page scroll-mt-24 pt-16 sm:pt-20" aria-labelledby="kategorije-naslov">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow mb-2">Kategorije</p>
            <h2 id="kategorije-naslov" className="text-3xl sm:text-4xl">Šta vam treba za veliki dan?</h2>
          </div>
          <p className="max-w-[40ch] text-muted">Počinjemo sa Beogradom. Novi Sad je u istoj pretrazi, iznad.</p>
        </div>
        <CategoryGrid city="beograd" />
      </section>

      <section className="container-page pt-20 sm:pt-24" aria-labelledby="kako-radi">
        <p className="eyebrow mb-2">Kako radi</p>
        <h2 id="kako-radi" className="mb-10 text-3xl sm:text-4xl">Od pretrage do ponude u tri koraka</h2>
        <ol className="grid gap-8 sm:grid-cols-3">
          {STEPS.map((s, i) => (
            <li key={s.title} className="relative border-t border-line pt-6">
              <span className="font-display text-5xl font-light text-sand" aria-hidden="true">{i + 1}</span>
              <h3 className="mt-3 text-xl">{s.title}</h3>
              <p className="mt-2 text-muted">{s.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="container-page pt-20 sm:pt-24" aria-labelledby="budzet">
        <div className="grid items-center gap-8 overflow-hidden rounded-[28px] bg-tint p-6 sm:p-10 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <p className="eyebrow mb-2">Budžet</p>
            <h2 id="budzet" className="text-3xl sm:text-4xl">Koliko košta svadba?</h2>
            <p className="mt-3 max-w-[52ch] text-muted">
              Unesite broj gostiju i grad, pa dobijte okvirni raspon za salu, muziku, fotografa, venčanicu i ostalo. Procena traje manje od minuta.
            </p>
            <Link href="/kalkulator" className="btn mt-6">
              Izračunajte budžet <IconArrow />
            </Link>
          </div>
          <div>
            <dl className="grid grid-cols-2 gap-3 text-sm">
              {BUDGET_ITEMS.filter((b) => ["sala", "muzika", "foto", "vencanica"].includes(b.key)).map((b) => {
                const [min, max] = b.ranges.srednje;
                return (
                  <div key={b.key} className="rounded-2xl bg-surface px-4 py-3">
                    <dt className="text-muted">{b.label.replace(" (meni po osobi)", "")}</dt>
                    <dd className="font-semibold tabular-nums">
                      {min}–{max} €{b.perGuest ? " po osobi" : ""}
                    </dd>
                  </div>
                );
              })}
            </dl>
            <p className="mt-3 text-xs text-muted">Srednji nivo, Beograd. {BUDGET_NOTE}</p>
          </div>
        </div>
      </section>

      <section className="container-page pt-20 sm:pt-24" aria-labelledby="prijava-par">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.3fr]">
          <div>
            <p className="eyebrow mb-2">Za parove</p>
            <h2 id="prijava-par" className="text-3xl sm:text-4xl">Planirate venčanje?</h2>
            <p className="mt-3 max-w-[46ch] text-muted">
              {SITE_NAME} je nov i upravo dodajemo prve sale i usluge. Ostavite mejl i javićemo vam čim dodamo sale i usluge u vašem gradu.
            </p>
          </div>
          <div className="card p-5 sm:p-8">
            <CoupleSignupForm />
          </div>
        </div>
      </section>

      <section className="container-page pt-20 sm:pt-24" aria-labelledby="vendori">
        <div className="flex flex-col items-start justify-between gap-6 rounded-[28px] border border-line bg-surface p-6 sm:flex-row sm:items-center sm:p-10">
          <div>
            <h2 id="vendori" className="text-2xl sm:text-3xl">Imate salu ili uslugu za venčanja? Dodajte je besplatno.</h2>
            <p className="mt-2 text-muted">Profil sa cenama i fotografijama, upiti direktno od parova.</p>
          </div>
          <Link href="/za-vendore" className="btn shrink-0">Za vendore <IconArrow /></Link>
        </div>
      </section>
    </>
  );
}
