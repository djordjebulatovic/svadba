// Okvirni rasponi za kalkulator budžeta, u EUR.
// Menjajte slobodno: [min, max] za svaki nivo.
// perGuest: true znači da se iznos množi brojem gostiju.

export type BudgetLevel = "skromno" | "srednje" | "luksuzno";

export type BudgetItem = {
  key: string;
  label: string;
  perGuest?: boolean;
  ranges: Record<BudgetLevel, [number, number]>;
};

export const BUDGET_LEVELS: { value: BudgetLevel; label: string }[] = [
  { value: "skromno", label: "Skromno" },
  { value: "srednje", label: "Srednje" },
  { value: "luksuzno", label: "Luksuzno" },
];

// Faktor po gradu (Beograd je osnova).
export const CITY_FACTOR: Record<string, number> = {
  beograd: 1,
  "novi-sad": 0.9,
};

export const BUDGET_ITEMS: BudgetItem[] = [
  { key: "sala", label: "Sala (meni po osobi)", perGuest: true, ranges: { skromno: [30, 40], srednje: [40, 55], luksuzno: [55, 90] } },
  { key: "muzika", label: "Muzika", ranges: { skromno: [800, 1500], srednje: [1500, 3000], luksuzno: [3000, 6000] } },
  { key: "foto", label: "Fotograf i video", ranges: { skromno: [600, 1000], srednje: [1000, 2000], luksuzno: [2000, 4000] } },
  { key: "vencanica", label: "Venčanica", ranges: { skromno: [300, 800], srednje: [800, 1800], luksuzno: [1800, 4000] } },
  { key: "odelo", label: "Odelo", ranges: { skromno: [200, 400], srednje: [400, 800], luksuzno: [800, 1800] } },
  { key: "cvece", label: "Cveće i dekoracija", ranges: { skromno: [300, 700], srednje: [700, 1500], luksuzno: [1500, 4000] } },
  { key: "burme", label: "Burme", ranges: { skromno: [300, 600], srednje: [600, 1200], luksuzno: [1200, 3000] } },
  { key: "ostalo", label: "Ostalo (pozivnice, torta, šminka, prevoz)", ranges: { skromno: [400, 800], srednje: [800, 1600], luksuzno: [1600, 3500] } },
];

export const BUDGET_NOTE =
  "Okvirne procene na osnovu javno dostupnih podataka. Stvarne cene zavise od vendora.";
