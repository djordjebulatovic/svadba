import Link from "next/link";
import { CATEGORIES } from "@/data/categories";
import type { CitySlug } from "@/lib/types";
import { CategoryIcon } from "./icons";

export function CategoryGrid({ city = "beograd" }: { city?: CitySlug }) {
  return (
    <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
      {CATEGORIES.map((c) => (
        <li key={c.slug}>
          <Link
            href={`/${city}/${c.slug}`}
            className="card flex h-full flex-col items-center gap-3 px-3 py-6 text-center transition-transform hover:-translate-y-0.5"
          >
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-tint text-brown">
              <CategoryIcon slug={c.slug} />
            </span>
            <span className="text-[15px] font-semibold leading-snug">{c.name}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
