"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

export function Gallery({ images, name }: { images: string[]; name: string }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const shown = images.slice(0, 5);

  useEffect(() => {
    const d = dialog.current;
    if (!d) return;
    const close = (e: MouseEvent) => e.target === d && d.close();
    d.addEventListener("click", close);
    return () => d.removeEventListener("click", close);
  }, []);

  if (images.length === 0) {
    return <div className="aspect-[16/9] rounded-[var(--radius-card)] bg-tint" aria-hidden="true" />;
  }

  return (
    <div className="relative">
      <div className="grid h-[260px] grid-cols-[2fr_1fr] grid-rows-2 gap-1.5 overflow-hidden rounded-[var(--radius-card)] sm:h-[380px] lg:h-[460px] lg:grid-cols-[2fr_1fr_1fr]">
        {shown.map((src, i) => (
          <div
            key={src}
            className={`relative bg-tint ${i === 0 ? "row-span-2" : ""} ${i > 2 ? "hidden lg:block" : ""}`}
          >
            <Image
              src={src}
              alt={`${name}, fotografija ${i + 1} od ${images.length}`}
              fill
              priority={i === 0}
              sizes={i === 0 ? "(min-width: 1024px) 50vw, 66vw" : "(min-width: 1024px) 25vw, 33vw"}
              className="object-cover"
            />
          </div>
        ))}
      </div>
      {images.length > 1 && (
        <button
          type="button"
          onClick={() => dialog.current?.showModal()}
          className="absolute bottom-3 right-3 rounded-full bg-surface/95 px-4 py-2 text-sm font-semibold text-ink shadow hover:bg-surface"
        >
          Sve fotografije ({images.length})
        </button>
      )}
      <dialog
        ref={dialog}
        aria-label={`Fotografije: ${name}`}
        className="m-auto h-[100dvh] max-h-none w-full max-w-none bg-bg p-0 backdrop:bg-ink/60 sm:h-[90dvh] sm:max-w-4xl sm:rounded-3xl"
      >
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-line bg-bg/95 px-5 py-3">
          <p className="font-display text-lg">{name}</p>
          <button type="button" className="btn-outline min-h-10 px-4 py-1.5 text-sm" onClick={() => dialog.current?.close()}>
            Zatvori
          </button>
        </div>
        <div className="grid gap-3 p-4 sm:p-6">
          {images.map((src, i) => (
            <div key={src} className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-tint">
              <Image src={src} alt={`${name}, fotografija ${i + 1} od ${images.length}`} fill sizes="(min-width: 896px) 832px, 100vw" className="object-cover" loading="lazy" />
            </div>
          ))}
        </div>
      </dialog>
    </div>
  );
}
