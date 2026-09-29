import { sohailExperience } from "@/data/sohail";
import ScrollReveal from "@/components/effects/ScrollReveal";
import Container from "@/components/ui/Container";
import SectionLabel from "@/components/ui/SectionLabel";
import ExperienceItem from "@/components/sections/ExperienceItem";

export default function Experience() {
  return (
    <section id="experience" className="relative overflow-hidden py-16 sm:py-20 lg:py-24">
      <Container>
        <ScrollReveal mode="inView" className="max-w-2xl">
          <SectionLabel>Experience</SectionLabel>
          <h2 className="text-section mt-4 font-sans font-semibold leading-[1.1] text-[var(--color-text-primary)]">
            Experience
          </h2>
        </ScrollReveal>

        <div className="mt-10 flex flex-col gap-10 sm:mt-12">
          {sohailExperience.map((experience, index) => (
            <ScrollReveal
              key={`${experience.company}-${experience.period}`}
              mode="inView"
              direction="up"
              delay={index * 0.08}
            >
              <ExperienceItem experience={experience} index={index} />
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
