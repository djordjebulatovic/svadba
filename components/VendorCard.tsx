import Image from "next/image";
import Link from "next/link";
import { capacityText, priceText, VENUE_TYPE_LABEL } from "@/lib/format";
import type { Vendor } from "@/lib/types";
import { IconPin, IconUsers } from "./icons";

export function VendorCard({ vendor, priority }: { vendor: Vendor; priority?: boolean }) {
  const price = priceText(vendor);
  const cap = capacityText(vendor);
  const cover = vendor.images[0];
  return (
    <article className="card group relative flex flex-col overflow-hidden">
      <div className="relative aspect-[4/3] bg-tint">
        {cover && (
          <Image
            src={cover}
            alt={`${vendor.name}, naslovna fotografija`}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            priority={priority}
          />
        )}
        {vendor.isExample && (
          <span className="absolute left-3 top-3 rounded-full bg-surface/95 px-3 py-1 text-xs font-bold text-ink">Primer profila</span>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-1.5 p-4 sm:p-5">
        <h3 className="text-xl">
          <Link href={`/vendor/${vendor.slug}`} className="after:absolute after:inset-0 focus-visible:outline-none">
            {vendor.name}
          </Link>
        </h3>
        <p className="flex items-center gap-1.5 text-sm text-muted">
          <IconPin />
          {[vendor.area, vendor.venueType && VENUE_TYPE_LABEL[vendor.venueType]].filter(Boolean).join(" · ")}
        </p>
        {price && <p className="text-[15px] font-bold text-brown">{price}</p>}
        {cap && (
          <p className="flex items-center gap-1.5 text-sm text-muted"><IconUsers />{cap}</p>
        )}
        {vendor.features && vendor.features.length > 0 && (
          <ul className="mt-2 flex flex-wrap gap-1.5" aria-label="Oznake">
            {vendor.features.slice(0, 3).map((f) => (
              <li key={f} className="rounded-full border border-line px-2.5 py-0.5 text-xs text-muted">{f}</li>
            ))}
          </ul>
        )}
      </div>
    </article>
  );
}
