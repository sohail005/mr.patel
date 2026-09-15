import HomeRuntime from "@/components/effects/HomeRuntime";
import StartExperience from "@/components/effects/StartExperience";
import Navbar from "@/components/sections/Navbar";
import Hero from "@/components/sections/Hero";
import MobileAppShowcase from "@/components/sections/MobileAppShowcase";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Services from "@/components/sections/Services";
import Projects from "@/components/sections/Projects";
import Experience from "@/components/sections/Experience";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <main className="relative">
      <HomeRuntime />
      <StartExperience />
      <Navbar />
      <Hero />
      <MobileAppShowcase />
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
