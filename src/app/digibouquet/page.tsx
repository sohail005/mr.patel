import DigibouquetView from "./DigibouquetView";

export const metadata = {
  title: "Digibouquet | Interactive Experience",
  description: "Create and share a digital bouquet, an interactive web experience.",
};

export default function DigibouquetPage() {
  return (
    <main className="relative min-h-screen">
      <DigibouquetView />
    </main>
  );
}
