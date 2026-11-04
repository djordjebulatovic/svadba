import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CategoryGrid } from "@/components/CategoryGrid";
import { CITIES, getCity } from "@/data/cities";

type Props = { params: Promise<{ grad: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return CITIES.map((c) => ({ grad: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const city = getCity((await params).grad);
  if (!city) return {};
  return {
    title: `Sve za venčanje u ${city.locative}`,
    description: `Sale, muzika, fotografi, venčanice, cveće i organizatori venčanja u ${city.locative}, sa okvirnim cenama.`,
    alternates: { canonical: `/${city.slug}` },
  };
}

export default async function CityPage({ params }: Props) {
  const city = getCity((await params).grad);
  if (!city) notFound();
  return (
    <div className="container-page pt-8 sm:pt-12">
      <p className="eyebrow mb-3">{city.name}</p>
      <h1 className="mb-8 text-[2.1rem] sm:text-5xl">Sve za venčanje u {city.locative}</h1>
      <CategoryGrid city={city.slug} />
    </div>
  );
}
