import { sohailClientProjects } from "@/data/sohail";
import ScrollReveal from "@/components/effects/ScrollReveal";
import Container from "@/components/ui/Container";
import SectionLabel from "@/components/ui/SectionLabel";
import ProjectCard from "@/components/sections/ProjectCard";

export default function ClientProjects() {
  return (
    <section id="client-projects" className="relative overflow-hidden py-16 sm:py-20 lg:py-24">
      <Container>
        <ScrollReveal mode="inView" className="max-w-2xl">
          <SectionLabel>Happy Clients</SectionLabel>
          <h2 className="text-section mt-4 font-sans font-semibold leading-[1.1] text-[var(--color-text-primary)]">
            Client Work
          </h2>
          <p className="mt-5 max-w-xl text-sm leading-6 text-[var(--color-text-secondary)] sm:text-base">
            Websites built for clients who came back happy with the result.
          </p>
        </ScrollReveal>

        <div className="mt-10 grid grid-cols-2 gap-3 sm:mt-12 sm:gap-6 lg:grid-cols-4">
          {sohailClientProjects.map((project, index) => (
            <ScrollReveal key={project.id} mode="inView" direction="up" delay={index * 0.05}>
              <ProjectCard project={project} index={index} />
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
