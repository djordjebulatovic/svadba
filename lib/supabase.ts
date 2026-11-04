import "server-only";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let client: SupabaseClient | null | undefined;

/** Vraća Supabase klijenta ili null ako env varijable nisu podešene. */
export function getSupabase(): SupabaseClient | null {
  if (client !== undefined) return client;
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_ANON_KEY;
  client = url && key ? createClient(url, key, { auth: { persistSession: false } }) : null;
  return client;
}

type Table = "couple_signups" | "vendor_signups" | "inquiries";

/**
 * Upisuje red u tabelu. Bez .select() jer javni ključ ne sme da čita (RLS).
 * TODO: kada Supabase nije podešen, podaci se samo ispisuju u log servera.
 */
export async function insertRow(table: Table, row: Record<string, unknown>): Promise<{ ok: boolean }> {
  const sb = getSupabase();
  if (!sb) {
    console.warn(`[TODO Supabase nije podešen] ${table}:`, JSON.stringify(row));
    return { ok: true };
  }
  const { error } = await sb.from(table).insert(row);
  if (error) {
    console.error(`[Supabase] greška pri upisu u ${table}:`, error.message);
    return { ok: false };
  }
  return { ok: true };
}
