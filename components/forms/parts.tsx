"use client";

import Link from "next/link";
import { useFormStatus } from "react-dom";
import type { FormState } from "@/lib/form-state";

export function Field({
  id, label, error, hint, optional, children,
}: { id: string; label: string; error?: string; hint?: string; optional?: boolean; children: React.ReactNode }) {
  return (
    <div className="min-w-0">
      <label htmlFor={id} className="label">
        {label}
        {optional && <span className="ml-1 font-normal text-muted">(nije obavezno)</span>}
      </label>
      {children}
      {hint && !error && <p id={`${id}-hint`} className="mt-1 text-xs text-muted">{hint}</p>}
      {error && <p id={`${id}-error`} className="mt-1 text-sm text-danger">{error}</p>}
    </div>
  );
}

/** aria atributi za polje sa greškom */
export function a11y(id: string, error?: string, hint?: boolean) {
  return {
    id,
    name: id,
    "aria-invalid": error ? true : undefined,
    "aria-describedby": error ? `${id}-error` : hint ? `${id}-hint` : undefined,
  } as const;
}

export function Consent({ error, disabled, idPrefix = "" }: { error?: string; disabled?: boolean; idPrefix?: string }) {
  const id = `${idPrefix}consent`;
  return (
    <div>
      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          id={id}
          name="consent"
          required
          disabled={disabled}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-error` : undefined}
          className="mt-1 h-5 w-5 shrink-0 accent-brown"
        />
        <label htmlFor={id} className="text-sm text-muted">
          Saglasan/saglasna sam da se moji podaci obrađuju radi odgovora na ovaj obrazac, u skladu sa{" "}
          <Link href="/politika-privatnosti" className="font-semibold text-brown underline" target="_blank">
            politikom privatnosti
          </Link>
          .
        </label>
      </div>
      {error && <p id={`${id}-error`} className="mt-1 text-sm text-danger">{error}</p>}
    </div>
  );
}

/** Skriveno polje za botove. Ljudi ga ne vide i ne popunjavaju. */
export function Honeypot() {
  return (
    <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
      <label>
        Ne popunjavati
        <input type="text" name="_hp" tabIndex={-1} autoComplete="off" />
      </label>
    </div>
  );
}

export function SubmitButton({ children, disabled }: { children: React.ReactNode; disabled?: boolean }) {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className="btn w-full sm:w-auto" disabled={pending || disabled}>
      {pending ? "Šaljem…" : children}
    </button>
  );
}

export function FormMessage({ state }: { state: FormState }) {
  if (state.status === "idle" || !state.message) return null;
  const ok = state.status === "success";
  return (
    <p
      role={ok ? "status" : "alert"}
      className={`rounded-xl px-4 py-3 text-sm font-medium ${ok ? "bg-success/10 text-success" : "bg-danger/10 text-danger"}`}
    >
      {state.message}
    </p>
  );
}
