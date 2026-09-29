import HomeRuntime from "@/components/effects/HomeRuntime";
import Navbar from "@/components/sections/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Interests from "@/components/sections/Interests";
import Skills from "@/components/sections/Skills";
import Services from "@/components/sections/Services";
import Projects from "@/components/sections/Projects";
import Experience from "@/components/sections/Experience";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <main className="relative">
      <HomeRuntime />
      <Navbar />
      <Hero />
      <About />
      <Interests />
      <Skills />
      <Services />
      <Projects limit={2} />
      <Experience />
      <Footer />
    </main>
  );
}
