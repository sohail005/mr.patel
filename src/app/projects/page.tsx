import type { Metadata } from "next";
import Footer from "@/components/sections/Footer";
import Navbar from "@/components/sections/Navbar";
import Projects from "@/components/sections/Projects";

export const metadata: Metadata = {
  title: "Projects | Sohail Patel",
  description:
    "Explore shipped web, Android, and iOS products built by Sohail Patel.",
};

export default function ProjectsPage() {
  return (
    <main className="relative pt-16">
      <Navbar />
      <Projects />
      <Footer />
    </main>
  );
}