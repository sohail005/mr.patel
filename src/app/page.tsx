"use client";

import dynamic from "next/dynamic";
import StartExperience from "@/components/effects/StartExperience";
import Navbar from "@/components/sections/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Services from "@/components/sections/Services";
import Projects from "@/components/sections/Projects";
import Experience from "@/components/sections/Experience";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";

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
      <StartExperience />
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Services />
      <Projects limit={2} />
      <Experience />
      <Contact />
      <Footer />
    </main>
  );
}
