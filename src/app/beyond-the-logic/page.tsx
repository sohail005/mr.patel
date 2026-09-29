import type { Metadata } from "next";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import BeyondTheLogic from "@/components/sections/BeyondTheLogic";

export const metadata: Metadata = {
  title: "Beyond the Logic | Sohail Patel",
  description:
    "A radial gallery of moments outside the codebase, from Sohail Patel.",
};

export default function BeyondTheLogicPage() {
  return (
    <main className="relative pt-16">
      <Navbar />
      <BeyondTheLogic />
      <Footer />
    </main>
  );
}
