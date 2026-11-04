"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { CATEGORIES } from "@/data/categories";
import { CITIES } from "@/data/cities";

export function SearchBar() {
  const router = useRouter();
  const [city, setCity] = useState("beograd");
  const [category, setCategory] = useState("sale");
  const [guests, setGuests] = useState("");

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const q = guests ? `?gosti=${encodeURIComponent(guests)}` : "";
    router.push(`/${city}/${category}${q}`);
  }

  const fld = "flex min-w-0 flex-col gap-0.5 px-4 py-2.5";
  const lbl = "text-[11px] font-bold uppercase tracking-[0.1em] text-muted";
  const ctl = "w-full bg-transparent text-[16px] font-medium text-ink focus:outline-none";

  return (
    <form
      onSubmit={onSubmit}
      role="search"
      aria-label="Pretraga usluga"
      className="grid gap-1 rounded-2xl border border-line bg-surface p-1.5 shadow-[var(--shadow-float)] md:grid-cols-[1fr_1.3fr_1fr_auto]"
    >
      <div className={`${fld} border-b border-line md:border-b-0 md:border-r`}>
        <label htmlFor="s-grad" className={lbl}>Grad</label>
        <select id="s-grad" className={ctl} value={city} onChange={(e) => setCity(e.target.value)}>
          {CITIES.map((c) => <option key={c.slug} value={c.slug}>{c.name}</option>)}
        </select>
      </div>
      <div className={`${fld} border-b border-line md:border-b-0 md:border-r`}>
        <label htmlFor="s-kat" className={lbl}>Šta tražite</label>
        <select id="s-kat" className={ctl} value={category} onChange={(e) => setCategory(e.target.value)}>
          {CATEGORIES.map((c) => <option key={c.slug} value={c.slug}>{c.name}</option>)}
        </select>
      </div>
      <div className={fld}>
        <label htmlFor="s-gosti" className={lbl}>Broj gostiju</label>
        <input id="s-gosti" type="number" min={1} max={2000} inputMode="numeric" placeholder="npr. 150" className={ctl} value={guests} onChange={(e) => setGuests(e.target.value)} />
      </div>
      <button type="submit" className="btn min-h-12 rounded-xl px-7">Pretraži</button>
    </form>
  );
}
