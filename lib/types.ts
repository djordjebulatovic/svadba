export type CategorySlug =
  | "sale"
  | "muzika"
  | "fotografi"
  | "vencanice-i-odela"
  | "cvece-i-dekoracija"
  | "organizatori";

export type CitySlug = "beograd" | "novi-sad";

export type VenueType = "sala" | "restoran" | "vila" | "priroda";

export type Vendor = {
  slug: string;
  name: string;
  category: CategorySlug;
  city: CitySlug;
  area?: string; // npr. "Zemun", "Voždovac"
  address?: string;
  mapsUrl?: string;
  phone?: string;
  email?: string;
  website?: string;
  instagram?: string;
  description?: string;
  priceFrom?: number; // u EUR
  priceUnit?: "po osobi" | "ukupno" | "po satu";
  capacityMin?: number;
  capacityMax?: number;
  venueType?: VenueType;
  features?: string[]; // "Parking", "Terasa", "Smeštaj", "Bina za bend"
  includes?: string[]; // šta je uključeno u cenu
  packages?: { name: string; priceFrom?: number; includes?: string[] }[];
  images: string[]; // putanje u /public/vendors/[slug]/
  status: "demo" | "published"; // demo = vidljivo samo preko /demo/[token]
  demoToken?: string;
  verified: boolean; // vendor potvrdio podatke
  isExample?: boolean; // izmišljen primer profila, prikazuje se oznaka "Primer profila"
  updatedAt: string; // ISO datum
};
