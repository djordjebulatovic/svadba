import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-page flex flex-col items-start gap-5 py-24">
      <p className="eyebrow">Greška 404</p>
      <h1 className="text-4xl sm:text-5xl">Ova stranica ne postoji</h1>
      <p className="max-w-[48ch] text-muted">Možda je link pogrešan ili je stranica uklonjena. Pretragu možete početi od početne strane.</p>
      <div className="flex flex-wrap gap-3">
        <Link href="/" className="btn">Na početnu</Link>
        <Link href="/beograd/sale" className="btn-outline">Sale u Beogradu</Link>
      </div>
    </div>
  );
}
