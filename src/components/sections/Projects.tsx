import { sohailProjects } from "@/data/sohail";
import type { PortfolioProject } from "@/types/portfolio";
import ScrollReveal from "@/components/effects/ScrollReveal";
import Container from "@/components/ui/Container";
import SectionLabel from "@/components/ui/SectionLabel";
import Button from "@/components/ui/Button";
import ProjectCard from "@/components/sections/ProjectCard";

const companyOrder: Record<string, number> = {
  "Espirits Technologies Pvt Ltd.": 1,
  "Revalsys Technologies Pvt Ltd.": 2,
  "Mufeed Products and Services Pvt Ltd.": 3,
};

const orderedProjects: PortfolioProject[] = [...sohailProjects].sort(
  (a, b) => (companyOrder[a.company] ?? 99) - (companyOrder[b.company] ?? 99),
);

export default function Projects({ limit }: { limit?: number }) {
  const projects = limit ? orderedProjects.slice(0, limit) : orderedProjects;

  return (
    <section id="projects" className="relative overflow-hidden py-16 sm:py-20 lg:py-24">
      <Container>
        <ScrollReveal mode="inView" className="max-w-2xl">
          <SectionLabel>Selected Work</SectionLabel>
          <h2 className="text-section mt-4 font-sans font-semibold leading-[1.1] text-[var(--color-text-primary)]">
            Selected Work
          </h2>
          <p className="mt-5 max-w-xl text-sm leading-6 text-[var(--color-text-secondary)] sm:text-base">
            Products, applications, and experiences I&apos;ve built and shipped.
          </p>
        </ScrollReveal>

        <div className="mt-10 grid grid-cols-2 gap-3 sm:mt-12 sm:gap-6 lg:grid-cols-4">
          {projects.map((project, index) => (
            <ScrollReveal key={project.id} mode="inView" direction="up" delay={index * 0.05}>
              <ProjectCard project={project} index={index} />
            </ScrollReveal>
          ))}
        </div>

        {limit ? (
          <div className="mt-12 flex justify-center">
            <Button variant="secondary" href="/projects">
              View all projects
            </Button>
          </div>
        ) : null}
      </Container>
    </section>
  );
}
