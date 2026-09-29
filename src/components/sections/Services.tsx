import { Code2, Globe, Rocket, Smartphone } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { sohailServices } from "@/data/sohail";
import ScrollReveal from "@/components/effects/ScrollReveal";
import Container from "@/components/ui/Container";
import ServiceItem from "@/components/sections/ServiceItem";

const iconMap: Record<string, LucideIcon> = {
  "app-deployment": Rocket,
  "complete-app-development": Smartphone,
  "website-development": Globe,
  "development-training": Code2,
};

export default function Services() {
  return (
    <section id="services" className="relative overflow-hidden py-16 sm:py-20 lg:py-24">
      <Container>
        <ScrollReveal mode="inView" className="max-w-3xl">
          <h2 className="text-section font-sans font-semibold leading-[1.1] text-[var(--color-text-primary)]">
            From idea to launch, I build products ready for real users.
          </h2>
        </ScrollReveal>

        <div className="mt-10 sm:mt-12">
          {sohailServices.map((service, index) => (
            <ScrollReveal key={service.id} mode="inView" delay={index * 0.06}>
              <ServiceItem service={service} icon={iconMap[service.id] ?? Code2} index={index} />
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
