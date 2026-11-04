# Svadbeni vodič (radni naziv)

Sajt na kome parovi u Beogradu i Novom Sadu pronalaze i porede sale, muziku, fotografe, venčanice, cveće i organizatore venčanja, sa okvirnim cenama.

Tehnologija: Next.js (App Router) + TypeScript, Tailwind CSS, Supabase za obrasce, hosting na Vercelu.

## Pokretanje lokalno

Potreban je Node.js 20 ili noviji.

```bash
npm install
cp .env.example .env.local   # pa popunite vrednosti (može i prazno)
npm run dev                  # http://localhost:3000
```

Provera pre objave:

```bash
npm run lint    # provera TypeScript tipova
npm run build   # produkcioni build
```

## Env varijable

| Varijabla | Obavezna | Opis |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | da, na produkciji | Pun URL sajta bez `/` na kraju, npr. `https://www.mojsajt.rs`. Koristi se za sitemap, canonical i Open Graph. |
| `SUPABASE_URL` | ne | Supabase → Project Settings → API → Project URL. |
| `SUPABASE_ANON_KEY` | ne | Supabase → Project Settings → API → `anon` / publishable ključ. |

Ako Supabase varijable nisu podešene, obrasci i dalje rade, ali se podaci samo ispisuju u log servera sa oznakom `[TODO Supabase nije podešen]`. Na Vercelu ih vidite u Logs.

## Ime sajta i domen

Ime je privremeno. Menja se na jednom mestu: `lib/site.ts` (`SITE_NAME`, `CONTACT_EMAIL`). Domen se podešava preko `NEXT_PUBLIC_SITE_URL`.
Open Graph slika je `app/opengraph-image.jpg`; posle promene imena napravite novu (vidi `scripts/generate-placeholders.py`) ili ubacite svoju sliku 1200×630.

## Supabase

1. Napravite projekat na supabase.com (preporuka: region u EU, npr. Frankfurt).
2. U SQL Editor-u pokrenite `supabase/migrations/20261104000000_init.sql` (ili `supabase db push` ako koristite Supabase CLI).
3. Upišite `SUPABASE_URL` i `SUPABASE_ANON_KEY` u `.env.local` i u Vercel → Settings → Environment Variables.

Migracija pravi tabele `couple_signups`, `vendor_signups` i `inquiries` i uključuje Row Level Security: javni ključ sme samo da upisuje (i to samo uz saglasnost), ne i da čita. Podatke čitate u Supabase Table Editor-u.

## Kako se dodaje vendor

Jedan JSON fajl i jedan folder sa slikama:

1. Napravite folder `public/vendors/<slug>/` i ubacite slike (npr. `1.jpg`, `2.jpg`…). Prva slika je naslovna. Preporuka: JPG, širina oko 1600px.
2. Napravite `data/vendors/<slug>.json`. Najlakše je da kopirate `data/vendors/sala-primer.json` i izmenite vrednosti.
3. Postavite `"status": "published"` tek kada vendor da saglasnost za objavu.
4. `"verified": true` samo ako je vendor potvrdio podatke. Tada se na profilu prikazuje oznaka „Podaci potvrđeni od strane vendora“.

`slug` sme da sadrži samo mala slova bez dijakritika, brojeve i crtice, npr. `sala-zlatni-klas`.

### Polja

| Polje | Opis |
|---|---|
| `slug`, `name` | Obavezno. |
| `category` | `sale`, `muzika`, `fotografi`, `vencanice-i-odela`, `cvece-i-dekoracija`, `organizatori` |
| `city` | `beograd` ili `novi-sad` |
| `area`, `address`, `mapsUrl` | Deo grada, adresa, link na Google mape (ako nema `mapsUrl`, pravi se iz adrese). |
| `phone`, `email`, `website`, `instagram` | Kontakt (Instagram bez `@`). |
| `description` | Opis. |
| `priceFrom`, `priceUnit` | Cena od u EUR; jedinica `po osobi`, `ukupno` ili `po satu`. |
| `capacityMin`, `capacityMax` | Kapacitet (za sale). |
| `venueType` | `sala`, `restoran`, `vila`, `priroda` (za sale). |
| `features` | Oznake, npr. `"Parking"`, `"Terasa"`, `"Smeštaj"`, `"Bina za bend"`. |
| `includes` | Šta je uključeno u cenu (lista). |
| `packages` | Meniji ili paketi: `{ "name", "priceFrom", "includes": [] }`. |
| `images` | Putanje, npr. `"/vendors/<slug>/1.jpg"`. |
| `status` | `published` (javno) ili `demo` (samo preko tajnog linka). |
| `demoToken` | Tajni deo demo linka (obavezno za `demo`). |
| `verified` | `true` samo ako je vendor potvrdio podatke. |
| `isExample` | `true` za izmišljene primere: prikazuje oznaku „Primer profila“, isključuje obrazac za upit i ne ulazi u sitemap. |
| `updatedAt` | Datum poslednje izmene, npr. `"2026-11-04"`. |

U liste, sitemap i `/vendor/<slug>` ulaze samo vendori sa `"status": "published"`.

## Kako se pravi demo link za salu

1. Dodajte vendora kao gore, ali sa `"status": "demo"`.
2. Upišite tajni token: `"demoToken": "ime-sale-x7k2"`. Dodajte nekoliko nasumičnih znakova da link ne može da se pogodi.
3. Posle deploy-a link je: `https://<domen>/demo/ime-sale-x7k2`

Demo stranica:
- koristi isti šablon kao pravi profil,
- ima traku na vrhu „Ovo je primer kako bi vaša stranica izgledala…“,
- ima isključen obrazac za upit,
- ima `noindex, nofollow` (meta tag i `X-Robots-Tag` header), nije u sitemap-u, nije u listama i nigde nije linkovana; `robots.txt` blokira `/demo/`,
- na dnu ima dugme koje vodi na `/za-vendore?vendor=<slug>`, gde je naziv firme unapred popunjen.

Primer u repou: `/demo/sala-lipa-x7k2`.

Kada sala pristane na objavu, promenite `"status"` u `"published"` (i po želji obrišite `demoToken`). Ako `slug` počinje sa `demo-`, preimenujte ga.

## Kalkulator budžeta

Rasponi su u `data/budget.ts`. Svaka stavka ima `[min, max]` za nivoe skromno, srednje i luksuzno; `perGuest: true` množi iznos brojem gostiju. `CITY_FACTOR` podešava razliku između gradova.

## Struktura

```
app/                      stranice (App Router)
  [grad]/[kategorija]/    liste, npr. /beograd/sale
  vendor/[slug]/          javni profil
  demo/[token]/           demo profil (tajni link)
  za-vendore/, kalkulator/, o-nama/, politika-privatnosti/, uslovi-koriscenja/
  sitemap.ts, robots.ts, opengraph-image.jpg
components/               UI komponente i obrasci
data/                     vendori (JSON), kategorije, gradovi, budžet
lib/                      tipovi, učitavanje vendora, Supabase, server akcije
supabase/migrations/      SQL migracija
scripts/                  generator privremenih slika
```

## Šta još nije urađeno (namerno)

Nalozi, plaćanje, recenzije, kalendar dostupnosti, admin panel i chat nisu deo prve verzije. Vendori su u JSON fajlovima, a obrasci u zasebnim tabelama, pa se baza za vendore i admin panel mogu dodati kasnije bez menjanja stranica.

## Pre objave

- [ ] Pravo ime i domen (`lib/site.ts`, `NEXT_PUBLIC_SITE_URL`, nova OG slika)
- [ ] Podaci rukovaoca u politici privatnosti (`app/politika-privatnosti/page.tsx`) i provera sa pravnikom
- [ ] Prava naslovna fotografija `public/hero.jpg`
- [ ] Supabase env varijable na Vercelu
