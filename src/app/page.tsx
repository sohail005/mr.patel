"use client";

import dynamic from "next/dynamic";
import Navbar from "@/components/sections/Navbar";
import Hero from "@/components/sections/Hero";
import FeaturedSection from "@/components/sections/FeaturedSection";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Experience from "@/components/sections/Experience";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";

const CursorEffect = dynamic(
  () => import("@/components/effects/CursorEffect"),
  { ssr: false }
);

const ScrollProgress = dynamic(
  () => import("@/components/effects/ScrollProgress"),
  { ssr: false }
);

const LenisProvider = dynamic(
  () => import("@/components/effects/LenisProvider"),
  { ssr: false }
);

export default function Home() {
  return (
    <main className="relative">
      <LenisProvider />
      <ScrollProgress />
      <CursorEffect />
      <Navbar />
      <Hero />
      <FeaturedSection />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Contact />
      <Footer />
    </main>
  );
}
