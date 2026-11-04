"use client";

import { useActionState } from "react";
import { CITIES } from "@/data/cities";
import { submitCoupleSignup } from "@/lib/actions";
import { initialFormState } from "@/lib/form-state";
import { a11y, Consent, Field, FormMessage, Honeypot, SubmitButton } from "./parts";

const MONTHS = ["januar", "februar", "mart", "april", "maj", "jun", "jul", "avgust", "septembar", "oktobar", "novembar", "decembar"];

function monthOptions() {
  const now = new Date();
  const out: { value: string; label: string }[] = [];
  for (let i = 0; i < 30; i++) {
    const d = new Date(now.getFullYear(), now.getMonth() + i, 1);
    out.push({
      value: `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`,
      label: `${MONTHS[d.getMonth()]} ${d.getFullYear()}.`,
    });
  }
  return out;
}

export function CoupleSignupForm({ defaultCity, idPrefix = "par-" }: { defaultCity?: string; idPrefix?: string }) {
  const [state, action] = useActionState(submitCoupleSignup, initialFormState);
  const e = state.errors ?? {};
  const id = (k: string) => `${idPrefix}${k}`;

  if (state.status === "success") {
    return <FormMessage state={{ ...state, message: state.message ?? "Hvala! Javićemo vam čim dodamo sale i usluge u vašem gradu." }} />;
  }

  return (
    <form action={action} className="relative grid gap-4 sm:grid-cols-2" noValidate>
      <Honeypot />
      <Field id={id("name")} label="Ime" error={e.name}>
        <input {...a11y(id("name"), e.name)} name="name" className="input" autoComplete="given-name" required />
      </Field>
      <Field id={id("email")} label="Mejl" error={e.email}>
        <input {...a11y(id("email"), e.email)} name="email" type="email" className="input" autoComplete="email" inputMode="email" required />
      </Field>
      <Field id={id("city")} label="Grad" error={e.city}>
        <select {...a11y(id("city"), e.city)} name="city" className="input" defaultValue={defaultCity ?? ""}>
          <option value="">Izaberite grad</option>
          {CITIES.map((c) => (
            <option key={c.slug} value={c.slug}>{c.name}</option>
          ))}
        </select>
      </Field>
      <Field id={id("wedding_month")} label="Okvirni datum venčanja" error={e.wedding_month} optional>
        <select {...a11y(id("wedding_month"), e.wedding_month)} name="wedding_month" className="input" defaultValue="">
          <option value="">Mesec i godina</option>
          {monthOptions().map((m) => (
            <option key={m.value} value={m.value}>{m.label}</option>
          ))}
        </select>
      </Field>
      <Field id={id("guests")} label="Broj gostiju" error={e.guests} optional>
        <input {...a11y(id("guests"), e.guests)} name="guests" type="number" min={1} max={2000} inputMode="numeric" className="input" placeholder="npr. 150" />
      </Field>
      <div className="sm:col-span-2">
        <Consent error={e.consent} idPrefix={idPrefix} />
      </div>
      <div className="flex flex-col gap-3 sm:col-span-2">
        <FormMessage state={state} />
        <SubmitButton>Javite mi</SubmitButton>
        <p className="text-sm text-muted">Javićemo vam čim dodamo sale i usluge u vašem gradu.</p>
      </div>
    </form>
  );
}
