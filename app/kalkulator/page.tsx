import type { Metadata } from "next";
import { BudgetCalculator } from "@/components/BudgetCalculator";

export const metadata: Metadata = {
  title: "Kalkulator budžeta za svadbu: koliko košta venčanje",
  description: "Unesite broj gostiju, grad i nivo i dobijte okvirni raspon cena za salu, muziku, fotografa, venčanicu, cveće i ostalo.",
  alternates: { canonical: "/kalkulator" },
};

export default function CalculatorPage() {
  return (
    <div className="container-page pt-8 sm:pt-12">
      <header className="mb-8 space-y-3">
        <p className="eyebrow">Kalkulator budžeta</p>
        <h1 className="text-[2.1rem] sm:text-5xl">Koliko košta svadba?</h1>
        <p className="max-w-[60ch] text-muted">Okvirni raspon po stavkama za Beograd i Novi Sad. Promenite broj gostiju ili nivo i procena se odmah menja.</p>
      </header>
      <BudgetCalculator />
    </div>
  );
}
