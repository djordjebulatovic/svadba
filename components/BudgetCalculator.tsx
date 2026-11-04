"use client";

import { useMemo, useState } from "react";
import { BUDGET_ITEMS, BUDGET_LEVELS, BUDGET_NOTE, CITY_FACTOR, type BudgetLevel } from "@/data/budget";
import { CITIES } from "@/data/cities";

const fmt = (n: number) => `${(Math.round(n / 10) * 10).toLocaleString("sr-Latn-RS")} €`;
const fmtUnit = (n: number) => `${Math.round(n).toLocaleString("sr-Latn-RS")} €`;

export function BudgetCalculator() {
  const [guests, setGuests] = useState(150);
  const [city, setCity] = useState("beograd");
  const [level, setLevel] = useState<BudgetLevel>("srednje");

  const rows = useMemo(() => {
    const f = CITY_FACTOR[city] ?? 1;
    const g = Math.max(0, guests || 0);
    return BUDGET_ITEMS.map((item) => {
      const [min, max] = item.ranges[level];
      const mult = item.perGuest ? g : 1;
      return { ...item, min: min * mult * f, max: max * mult * f, unitMin: min * f, unitMax: max * f };
    });
  }, [guests, city, level]);

  const total = rows.reduce((a, r) => [a[0] + r.min, a[1] + r.max], [0, 0]);
  const top = Math.max(...rows.map((r) => r.max));

  return (
    <div className="grid gap-8 lg:grid-cols-[320px_minmax(0,1fr)]">
      <form className="card grid content-start gap-5 self-start p-5 sm:p-6" onSubmit={(e) => e.preventDefault()} aria-label="Podaci za procenu">
        <div>
          <label htmlFor="k-gosti" className="label">Broj gostiju</label>
          <input id="k-gosti" type="number" min={1} max={2000} inputMode="numeric" className="input" value={guests || ""} onChange={(e) => setGuests(Number(e.target.value))} />
          <input type="range" min={20} max={500} step={10} value={Math.min(500, guests || 20)} onChange={(e) => setGuests(Number(e.target.value))} className="mt-3 w-full accent-brown" aria-label="Broj gostiju, klizač" />
        </div>
        <div>
          <label htmlFor="k-grad" className="label">Grad</label>
          <select id="k-grad" className="input" value={city} onChange={(e) => setCity(e.target.value)}>
            {CITIES.map((c) => <option key={c.slug} value={c.slug}>{c.name}</option>)}
          </select>
        </div>
        <fieldset>
          <legend className="label">Nivo</legend>
          <div className="grid grid-cols-3 gap-1 rounded-xl bg-tint p-1">
            {BUDGET_LEVELS.map((l) => (
              <label key={l.value} className="relative">
                <input type="radio" name="nivo" value={l.value} checked={level === l.value} onChange={() => setLevel(l.value)} className="peer sr-only" />
                <span className="block cursor-pointer rounded-lg px-2 py-2 text-center text-sm font-semibold text-muted peer-checked:bg-surface peer-checked:text-ink peer-checked:shadow-sm peer-focus-visible:outline-2 peer-focus-visible:outline-brown">
                  {l.label}
                </span>
              </label>
            ))}
          </div>
        </fieldset>
      </form>

      <section aria-labelledby="procena" aria-live="polite" className="min-w-0">
        <div className="rounded-[24px] bg-ink p-6 text-white sm:p-8">
          <h2 id="procena" className="font-sans text-sm font-bold uppercase tracking-[0.12em] text-sand">Ukupno, okvirno</h2>
          <p className="mt-2 font-display text-4xl tabular-nums sm:text-5xl">
            {fmt(total[0])} <span className="text-white/60">–</span> {fmt(total[1])}
          </p>
          <p className="mt-2 text-sm text-white/75">
            {guests || 0} gostiju · {CITIES.find((c) => c.slug === city)?.name} · {BUDGET_LEVELS.find((l) => l.value === level)?.label.toLowerCase()}
          </p>
        </div>

        <ul className="mt-6 divide-y divide-line">
          {rows.map((r) => (
            <li key={r.key} className="grid gap-2 py-4 sm:grid-cols-[minmax(0,1fr)_10.5rem] sm:items-center sm:gap-6">
              <div className="min-w-0">
                <p className="font-semibold">{r.label}</p>
                {r.perGuest && <p className="text-sm text-muted tabular-nums">{fmtUnit(r.unitMin)} – {fmtUnit(r.unitMax)} po osobi</p>}
                <div className="mt-2 h-2 rounded-full bg-tint" aria-hidden="true">
                  <div
                    className="h-2 rounded-full bg-sand"
                    style={{ marginLeft: `${(r.min / top) * 100}%`, width: `${Math.max(2, ((r.max - r.min) / top) * 100)}%` }}
                  />
                </div>
              </div>
              <p className="font-semibold tabular-nums sm:text-right">{fmt(r.min)} – {fmt(r.max)}</p>
            </li>
          ))}
        </ul>
        <p className="mt-4 rounded-xl bg-tint px-4 py-3 text-sm text-brown-dark">{BUDGET_NOTE}</p>
      </section>
    </div>
  );
}
