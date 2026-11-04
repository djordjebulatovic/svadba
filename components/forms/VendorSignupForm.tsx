"use client";

import { useActionState, useState } from "react";
import { CATEGORIES } from "@/data/categories";
import { CITIES } from "@/data/cities";
import { submitVendorSignup } from "@/lib/actions";
import { initialFormState } from "@/lib/form-state";
import { a11y, Consent, Field, FormMessage, Honeypot, SubmitButton } from "./parts";

export function VendorSignupForm({ prefillName, sourceSlug }: { prefillName?: string; sourceSlug?: string }) {
  const [state, action] = useActionState(submitVendorSignup, initialFormState);
  const [category, setCategory] = useState(sourceSlug ? "sale" : "");
  const e = state.errors ?? {};

  if (state.status === "success") return <FormMessage state={state} />;

  return (
    <form action={action} className="relative grid gap-4 sm:grid-cols-2" noValidate>
      <Honeypot />
      {sourceSlug && <input type="hidden" name="source_vendor_slug" value={sourceSlug} />}
      <Field id="business_name" label="Naziv firme" error={e.business_name}>
        <input {...a11y("business_name", e.business_name)} className="input" defaultValue={prefillName} autoComplete="organization" required />
      </Field>
      <Field id="category" label="Kategorija" error={e.category}>
        <select {...a11y("category", e.category)} className="input" value={category} onChange={(ev) => setCategory(ev.target.value)} required>
          <option value="">Izaberite kategoriju</option>
          {CATEGORIES.map((c) => (
            <option key={c.slug} value={c.slug}>{c.name}</option>
          ))}
        </select>
      </Field>
      <Field id="city" label="Grad" error={e.city}>
        <select {...a11y("city", e.city)} className="input" defaultValue="" required>
          <option value="">Izaberite grad</option>
          {CITIES.map((c) => (
            <option key={c.slug} value={c.slug}>{c.name}</option>
          ))}
        </select>
      </Field>
      <Field id="contact_name" label="Kontakt osoba" error={e.contact_name}>
        <input {...a11y("contact_name", e.contact_name)} className="input" autoComplete="name" required />
      </Field>
      <Field id="phone" label="Telefon" error={e.phone}>
        <input {...a11y("phone", e.phone)} type="tel" className="input" autoComplete="tel" inputMode="tel" placeholder="+381 6x xxx xxxx" required />
      </Field>
      <Field id="email" label="Mejl" error={e.email}>
        <input {...a11y("email", e.email)} type="email" className="input" autoComplete="email" inputMode="email" required />
      </Field>
      <Field id="website" label="Sajt ili Instagram" error={e.website} optional>
        <input {...a11y("website", e.website)} className="input" placeholder="www… ili @nalog" />
      </Field>
      {(category === "sale" || category === "") && (
        <Field id="capacity" label="Kapacitet (broj gostiju)" error={e.capacity} optional>
          <input {...a11y("capacity", e.capacity)} type="number" min={1} inputMode="numeric" className="input" placeholder="npr. 250" />
        </Field>
      )}
      <Field id="price_from" label="Okvirna cena od (€)" error={e.price_from} hint={category === "sale" ? "Za sale: cena menija po osobi." : undefined} optional>
        <input {...a11y("price_from", e.price_from, category === "sale")} type="number" min={0} inputMode="numeric" className="input" placeholder="npr. 45" />
      </Field>
      <div className="sm:col-span-2">
        <Field id="note" label="Napomena" error={e.note} optional>
          <textarea {...a11y("note", e.note)} rows={4} className="input" placeholder="Šta je važno da parovi znaju o vama?" />
        </Field>
      </div>
      <div className="sm:col-span-2">
        <Consent error={e.consent} idPrefix="vendor-" />
      </div>
      <div className="flex flex-col gap-3 sm:col-span-2">
        <FormMessage state={state} />
        <SubmitButton>Prijavite se besplatno</SubmitButton>
      </div>
    </form>
  );
}
