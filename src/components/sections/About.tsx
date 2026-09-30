import Image from "next/image";
import profilePhoto from "@/Assets/profile-photo.jpg";
import { sohailProfile } from "@/data/sohail";
import ScrollReveal from "@/components/effects/ScrollReveal";
import Container from "@/components/ui/Container";
import SectionLabel from "@/components/ui/SectionLabel";
import SectionNumber from "@/components/ui/SectionNumber";

const principles = [
  {
    value: "01",
    title: "Build for real users",
    text: "Interfaces are shaped around how people actually use the product, not around a demo flow.",
  },
  {
    value: "02",
    title: "Production before perfection",
    text: "A working release that reaches users beats an unfinished build that only looks good locally.",
  },
  {
    value: "03",
    title: "Performance matters",
    text: "Load time, responsiveness, and stability are treated as features, not afterthoughts.",
  },
  {
    value: "04",
    title: "Keep it maintainable",
    text: "Code should be easy to hand off, extend, and debug months after the first release.",
  },
];

export default function About() {
  return (
    <section id="about" className="relative overflow-hidden py-16 sm:py-20 lg:py-24">
      <Container>
        <ScrollReveal mode="inView" className="max-w-full">
          <SectionLabel>About</SectionLabel>
          <h2 className="mt-4 text-[clamp(1.25rem,2.5vw,2.5rem)] font-sans font-semibold leading-[1.1] text-[var(--color-text-primary)]">
            {sohailProfile.summary}
          </h2>
        </ScrollReveal>

        <div className="mt-10 grid gap-10 sm:mt-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <ScrollReveal>
            <div className="flex flex-col gap-6">
              <div className="group relative aspect-[4/5] w-full max-w-sm overflow-hidden rounded-2xl border border-[var(--color-border)] transition-[border-color,box-shadow] duration-500 hover:border-[var(--color-primary-accent)] hover:shadow-[0_0_50px_-12px_var(--color-primary-accent)]">
                <Image
                  src={profilePhoto}
                  alt="Sohail Patel"
                  fill
                  sizes="(min-width: 1024px) 24rem, 100vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[var(--color-background)]/50 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="pointer-events-none absolute inset-0 -translate-x-full -skew-x-12 bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />
              </div>

              <p className="max-w-md text-sm leading-6 text-[var(--color-text-secondary)]">
                {sohailProfile.about}
              </p>
            </div>
          </ScrollReveal>

          <div className="flex flex-col gap-8">
            <div className="grid gap-8 sm:grid-cols-2">
              {principles.map((item, index) => (
                <ScrollReveal key={item.value} mode="inView" direction="up" delay={index * 0.06}>
                  <div className="flex flex-col gap-3">
                    <SectionNumber value={item.value} />
                    <h3 className="text-lg font-semibold text-[var(--color-text-primary)]">
                      {item.title}
                    </h3>
                    <p className="text-sm leading-6 text-[var(--color-text-secondary)]">{item.text}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>

            <ScrollReveal mode="inView">
              <ul className="flex flex-wrap gap-2 border-t border-[var(--color-border)] pt-8">
                {sohailProfile.highlights.map((highlight) => (
                  <li
                    key={highlight}
                    className="rounded-full border border-[var(--color-border)] px-3 py-3 font-mono text-xs uppercase tracking-[0.08em] text-[var(--color-text-muted)] sm:text-sm"
                  >
                    {highlight}
                  </li>
                ))}
              </ul>
            </ScrollReveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
