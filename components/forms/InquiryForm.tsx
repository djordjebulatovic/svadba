"use client";

import { useActionState } from "react";
import { submitInquiry } from "@/lib/actions";
import { initialFormState } from "@/lib/form-state";
import { a11y, Consent, Field, FormMessage, Honeypot, SubmitButton } from "./parts";

export function InquiryForm({ vendorSlug, vendorName, disabled }: { vendorSlug: string; vendorName: string; disabled?: boolean }) {
  const [state, action] = useActionState(submitInquiry, initialFormState);
  const e = state.errors ?? {};
  const id = (k: string) => `upit-${k}`;
  const today = new Date().toISOString().slice(0, 10);

  if (state.status === "success") return <FormMessage state={state} />;

  return (
    <form action={disabled ? undefined : action} className="relative grid gap-4" noValidate aria-describedby={disabled ? "upit-demo" : undefined}>
      {disabled && (
        <p id="upit-demo" className="rounded-xl bg-tint px-4 py-3 text-sm text-brown-dark">
          Ovo je primer. Obrazac je isključen i upiti se ne šalju.
        </p>
      )}
      <Honeypot />
      <input type="hidden" name="vendor_slug" value={vendorSlug} />
      <fieldset disabled={disabled} className="grid gap-4 disabled:opacity-70">
        <legend className="sr-only">Upit za {vendorName}</legend>
        <Field id={id("name")} label="Ime i prezime" error={e.name}>
          <input {...a11y(id("name"), e.name)} name="name" className="input" autoComplete="name" required />
        </Field>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field id={id("phone")} label="Telefon" error={e.phone} optional>
            <input {...a11y(id("phone"), e.phone)} name="phone" type="tel" className="input" autoComplete="tel" inputMode="tel" />
          </Field>
          <Field id={id("email")} label="Mejl" error={e.email}>
            <input {...a11y(id("email"), e.email)} name="email" type="email" className="input" autoComplete="email" inputMode="email" required />
          </Field>
          <Field id={id("date")} label="Datum venčanja" error={e.date} optional>
            <input {...a11y(id("date"), e.date)} name="date" type="date" min={today} className="input" />
          </Field>
          <Field id={id("guests")} label="Broj gostiju" error={e.guests} optional>
            <input {...a11y(id("guests"), e.guests)} name="guests" type="number" min={1} max={2000} inputMode="numeric" className="input" />
          </Field>
        </div>
        <Field id={id("message")} label="Poruka" error={e.message} optional>
          <textarea {...a11y(id("message"), e.message)} name="message" rows={4} className="input" placeholder="Npr. da li je subota u junu slobodna i šta ulazi u meni?" />
        </Field>
        <Consent error={e.consent} disabled={disabled} idPrefix="upit-" />
      </fieldset>
      <FormMessage state={state} />
      <SubmitButton disabled={disabled}>Pošalji upit</SubmitButton>
    </form>
  );
}
