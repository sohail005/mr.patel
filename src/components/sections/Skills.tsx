import { sohailSkills } from "@/data/sohail";
import ScrollReveal from "@/components/effects/ScrollReveal";
import Container from "@/components/ui/Container";
import SectionLabel from "@/components/ui/SectionLabel";
import CapabilityGroup from "@/components/sections/CapabilityGroup";

export default function Skills() {
  return (
    <section id="skills" className="relative overflow-hidden py-16 sm:py-20 lg:py-24">
      <Container>
        <ScrollReveal mode="inView" className="max-w-2xl">
          <SectionLabel>Capabilities</SectionLabel>
          <h2 className="text-section mt-4 font-sans font-semibold leading-[1.1] text-[var(--color-text-primary)]">
            Capabilities
          </h2>
        </ScrollReveal>

        <div className="mt-10 grid gap-8 sm:mt-12 sm:grid-cols-2 lg:grid-cols-4">
          {sohailSkills.map((group, index) => (
            <ScrollReveal key={group.title} mode="inView" delay={index * 0.06}>
              <CapabilityGroup title={group.title} items={group.items} />
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
