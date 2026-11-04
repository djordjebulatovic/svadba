import type { CategorySlug } from "@/lib/types";

export type Category = {
  slug: CategorySlug;
  name: string; // za navigaciju i kartice
  plural: string; // za naslove: "Sale za venčanja u Beogradu"
  short: string; // za prazno stanje: "Uskoro dodajemo sale u Beogradu"
  description: string;
};

export const CATEGORIES: Category[] = [
  { slug: "sale", name: "Sale i restorani", plural: "Sale za venčanja", short: "sale i restorane", description: "Sale, restorani, vile i prostori u prirodi." },
  { slug: "muzika", name: "Muzika", plural: "Muzika za venčanja", short: "muziku", description: "Bendovi, trubači, DJ i tamburaši." },
  { slug: "fotografi", name: "Fotografi i video", plural: "Fotografi i snimatelji za venčanja", short: "fotografe i snimatelje", description: "Fotografija i video za ceo dan." },
  { slug: "vencanice-i-odela", name: "Venčanice i odela", plural: "Venčanice i odela", short: "venčanice i odela", description: "Saloni venčanica i muških odela." },
  { slug: "cvece-i-dekoracija", name: "Cveće i dekoracija", plural: "Cveće i dekoracija za venčanja", short: "cveće i dekoraciju", description: "Buketi, aranžmani i dekoracija sale." },
  { slug: "organizatori", name: "Organizatori", plural: "Organizatori venčanja", short: "organizatore venčanja", description: "Planiranje od prvog koraka do kraja večeri." },
];

export function getCategory(slug: string) {
  return CATEGORIES.find((c) => c.slug === slug);
}
