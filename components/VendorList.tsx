"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { VENUE_TYPE_LABEL } from "@/lib/format";
import type { Vendor } from "@/lib/types";
import { IconClose, IconFilter } from "./icons";
import { VendorCard } from "./VendorCard";

type Sort = "preporuceno" | "cena" | "kapacitet";
const SORTS: { value: Sort; label: string }[] = [
  { value: "preporuceno", label: "Preporučeno" },
  { value: "cena", label: "Cena rastuće" },
  { value: "kapacitet", label: "Kapacitet" },
];

const num = (s: string | null) => {
  const n = Number(s);
  return s && Number.isFinite(n) && n > 0 ? n : undefined;
};

export function VendorList({ vendors, isVenue }: { vendors: Vendor[]; isVenue: boolean }) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const [open, setOpen] = useState(false);
  const [resetKey, setResetKey] = useState(0);

  const gosti = num(params.get("gosti"));
  const cenaOd = num(params.get("cena-od"));
  const cenaDo = num(params.get("cena-do"));
  const deo = params.get("deo") ?? "";
  const tip = params.get("tip") ?? "";
  const sort = (params.get("sort") as Sort) || "preporuceno";

  const areas = useMemo(() => [...new Set(vendors.map((v) => v.area).filter(Boolean) as string[])].sort(), [vendors]);
  const types = useMemo(() => [...new Set(vendors.map((v) => v.venueType).filter(Boolean) as string[])], [vendors]);

  function set(key: string, value: string) {
    const next = new URLSearchParams(params.toString());
    if (value) next.set(key, value);
    else next.delete(key);
    const qs = next.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  }

  const results = useMemo(() => {
    const list = vendors.filter((v) => {
      if (gosti && v.capacityMax != null && v.capacityMax < gosti) return false;
      if (gosti && v.capacityMin != null && v.capacityMin > gosti) return false;
      if (cenaOd && (v.priceFrom ?? 0) < cenaOd) return false;
      if (cenaDo && v.priceFrom != null && v.priceFrom > cenaDo) return false;
      if (deo && v.area !== deo) return false;
      if (tip && v.venueType !== tip) return false;
      return true;
    });
    return list.sort((a, b) => {
      if (sort === "cena") return (a.priceFrom ?? Infinity) - (b.priceFrom ?? Infinity);
      if (sort === "kapacitet") return (b.capacityMax ?? 0) - (a.capacityMax ?? 0);
      // Preporučeno: potvrđeni pa skorije ažurirani. TODO: kasnije prava logika preporuke.
      return Number(b.verified) - Number(a.verified) || b.updatedAt.localeCompare(a.updatedAt);
    });
  }, [vendors, gosti, cenaOd, cenaDo, deo, tip, sort]);

  function reset() {
    setResetKey((k) => k + 1);
    router.replace(pathname, { scroll: false });
  }

  const activeCount = [gosti, cenaOd, cenaDo, deo, tip].filter(Boolean).length;
  const priceLabel = isVenue ? "Cena po osobi (€)" : "Cena (€)";

  const renderFilters = (p: string) => (
    <div className="grid gap-5" key={`${p}${resetKey}`}>
      <div>
        <label htmlFor={`${p}gosti`} className="label">Broj gostiju</label>
        <input id={`${p}gosti`} type="number" min={1} inputMode="numeric" className="input" placeholder="npr. 150" defaultValue={gosti ?? ""} onChange={(e) => set("gosti", e.target.value)} />
      </div>
      <fieldset>
        <legend className="label">{priceLabel}</legend>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label htmlFor={`${p}cena-od`} className="sr-only">Cena od</label>
            <input id={`${p}cena-od`} type="number" min={0} inputMode="numeric" className="input" placeholder="od" defaultValue={cenaOd ?? ""} onChange={(e) => set("cena-od", e.target.value)} />
          </div>
          <div>
            <label htmlFor={`${p}cena-do`} className="sr-only">Cena do</label>
            <input id={`${p}cena-do`} type="number" min={0} inputMode="numeric" className="input" placeholder="do" defaultValue={cenaDo ?? ""} onChange={(e) => set("cena-do", e.target.value)} />
          </div>
        </div>
      </fieldset>
      <div>
        <label htmlFor={`${p}deo`} className="label">Deo grada</label>
        <select id={`${p}deo`} className="input" value={deo} onChange={(e) => set("deo", e.target.value)}>
          <option value="">Svi delovi grada</option>
          {areas.map((a) => <option key={a} value={a}>{a}</option>)}
        </select>
      </div>
      {isVenue && (
        <div>
          <label htmlFor={`${p}tip`} className="label">Tip prostora</label>
          <select id={`${p}tip`} className="input" value={tip} onChange={(e) => set("tip", e.target.value)}>
            <option value="">Svi tipovi</option>
            {(["sala", "restoran", "vila", "priroda"] as const).map((t) => (
              <option key={t} value={t} disabled={!types.includes(t)}>{VENUE_TYPE_LABEL[t]}{t === "vila" ? " / imanje" : ""}</option>
            ))}
          </select>
        </div>
      )}
      {activeCount > 0 && (
        <button type="button" className="text-left text-sm font-semibold text-brown underline" onClick={reset}>
          Poništi filtere
        </button>
      )}
    </div>
  );

  return (
    <div className="grid gap-8 lg:grid-cols-[260px_minmax(0,1fr)]">
      {/* Desktop: bočna kolona */}
      <aside className="hidden lg:block" aria-label="Filteri">
        <div className="sticky top-24 card p-5">{renderFilters("d-")}</div>
      </aside>

      <div className="min-w-0">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-muted" aria-live="polite">
            {results.length === 1 ? "1 rezultat" : `${results.length} rezultata`}
          </p>
          <div className="flex items-center gap-2">
            <button type="button" className="btn-outline min-h-10 px-4 py-2 text-sm lg:hidden" onClick={() => setOpen(true)} aria-expanded={open} aria-controls="filteri-panel">
              <IconFilter /> Filteri{activeCount > 0 && ` (${activeCount})`}
            </button>
            <label htmlFor="f-sort" className="sr-only">Sortiranje</label>
            <select id="f-sort" className="input min-h-10 w-auto py-2 text-sm" value={sort} onChange={(e) => set("sort", e.target.value === "preporuceno" ? "" : e.target.value)}>
              {SORTS.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
            </select>
          </div>
        </div>

        {results.length > 0 ? (
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {results.map((v, i) => <VendorCard key={v.slug} vendor={v} priority={i < 2} />)}
          </div>
        ) : (
          <div className="card p-8 text-center">
            <p className="font-display text-xl">Nema rezultata za izabrane filtere</p>
            <p className="mt-2 text-muted">Probajte širi raspon cene ili drugi broj gostiju.</p>
            <button type="button" className="btn-outline mt-5" onClick={reset}>Poništi filtere</button>
          </div>
        )}
      </div>

      {/* Mobilni: panel odozdo */}
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-labelledby="filteri-naslov" id="filteri-panel">
          <button type="button" className="absolute inset-0 bg-ink/40" aria-label="Zatvori filtere" onClick={() => setOpen(false)} />
          <div className="absolute inset-x-0 bottom-0 max-h-[85dvh] overflow-y-auto rounded-t-3xl bg-surface p-5 pb-[max(20px,env(safe-area-inset-bottom))]">
            <div className="mb-5 flex items-center justify-between">
              <h2 id="filteri-naslov" className="text-xl">Filteri</h2>
              <button type="button" className="flex h-11 w-11 items-center justify-center rounded-full hover:bg-tint" onClick={() => setOpen(false)} aria-label="Zatvori">
                <IconClose />
              </button>
            </div>
            {renderFilters("m-")}
            <button type="button" className="btn mt-6 w-full" onClick={() => setOpen(false)}>
              Prikaži {results.length} {results.length === 1 ? "rezultat" : "rezultata"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
