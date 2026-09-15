"use client";

import ScrollReveal from "@/components/effects/ScrollReveal";

const experience = [
  {
    period: "Mar 2025 to present",
    duration: "Current",
    role: "React Native, React.js and Next.js Developer",
    company: "Espirits Technologies Pvt Ltd.",
    type: "Full-time",
    focus:
      "Full mobile release cycles, CI/CD ownership, mentoring, and product work across web and mobile.",
    highlights: ["Mobile release ownership", "CI/CD pipelines", "Mentoring developers"],
    skills: ["React Native", "React", "Next.js", "CI/CD"],
  },
  {
    period: "Nov 2021 to Mar 2025 - 3 yrs 5 mons",
    duration: "3 yrs 5 mons",
    role: "React Native Developer",
    company: "Revalsys Technologies Pvt Ltd.",
    type: "Full-time",
    focus:
      "End-to-end app delivery with stronger depth in debugging, performance tuning, and release discipline.",
    highlights: ["App store delivery", "Performance tuning", "Production debugging"],
    skills: ["React Native", "Redux", "Firebase", "Native modules"],
  },
  {
    period: "Jan 2021 to Nov 2021 - 11 Mon",
    duration: "11 mons",
    role: "React and React Native Developer",
    company: "Mufeed Products and Services Pvt Ltd.",
    type: "Full-time",
    focus:
      "Reusable project structure, component systems, and performance-minded implementation.",
    highlights: ["Reusable components", "Project structure", "Responsive UI"],
    skills: ["React", "React Native", "JavaScript", "UI systems"],
  },
];

export default function Experience() {
  return (
    <section id="experience" className="relative overflow-hidden py-16 sm:py-20 lg:py-24">
      <div className="relative mx-auto max-w-6xl px-5 sm:px-6">
        <ScrollReveal mode="inView" className="max-w-4xl">
          <p className="section-kicker">Experience</p>
          <div className="mt-4 gap-5 lg:grid-cols-[minmax(0,0.9fr)_minmax(18rem,0.34fr)] lg:items-center">
            <h2 className="section-heading text-[var(--color-text)]">
              Teams, products, releases, and the lessons that came with them.
            </h2>
            <div className="rounded-[1.35rem] border border-[var(--surface-border)] bg-[var(--control-bg)] p-4 mt-5">
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--color-primary)]">
                Career track
              </p>
              <p className="mt-3 text-sm leading-6 text-[var(--color-text-muted)]">
                5+ years moving from reusable UI foundations to full release ownership.
              </p>
            </div>
          </div>
        </ScrollReveal>

        <div className="relative mt-10 sm:mt-12">
          <div className="absolute bottom-8 left-3 top-8 hidden w-px bg-gradient-to-b from-[var(--color-primary)] via-[var(--color-secondary)] to-transparent sm:block" />

          <div className="space-y-5 sm:space-y-6 sm:pl-8">
            {experience.map((item, index) => (
              <ScrollReveal
                key={`${item.company}-${item.period}`}
                mode="inView"
                direction="up"
                delay={index * 0.08}
              >
                <article className="group relative grid gap-5 rounded-[1.35rem] border border-[var(--surface-border)] bg-[linear-gradient(135deg,var(--color-panel),var(--color-panel-strong))] p-5 shadow-[0_24px_70px_rgba(0,0,0,0.22)] transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1 hover:border-[var(--surface-border-strong)] hover:shadow-[0_28px_86px_rgba(0,0,0,0.3)] sm:grid-cols-[12rem_minmax(0,1fr)] sm:rounded-[1.85rem] sm:p-6 lg:grid-cols-[15rem_minmax(0,1fr)] lg:p-7">
                  <span className="absolute -left-7 top-7 hidden h-4 w-4 rounded-full border border-[var(--color-primary)] bg-[var(--color-background)] shadow-[0_0_0_6px_color-mix(in_srgb,var(--color-primary)_13%,transparent),0_0_24px_color-mix(in_srgb,var(--color-primary)_46%,transparent)] sm:block" />
                  <div className="relative">
                    <div className="flex flex-wrap items-center gap-2 sm:block">
                      <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--color-primary)]">
                        {item.period}
                      </p>
                      <span
                        className={`rounded-full border px-3 py-1 font-mono text-[9px] uppercase tracking-[0.16em] sm:mt-4 sm:inline-flex ${
                          item.duration === "Current"
                            ? "border-[color-mix(in_srgb,var(--color-primary)_46%,transparent)] bg-[var(--color-primary)] text-[var(--highlight-text)] shadow-[0_0_24px_color-mix(in_srgb,var(--color-primary)_28%,transparent)]"
                            : "border-[var(--surface-border)] bg-[var(--control-bg)] text-[var(--color-text-muted)]"
                        }`}
                      >
                        {item.duration}
                      </span>
                    </div>
                    <p className="mt-4 text-sm font-semibold uppercase tracking-[0.18em] text-[var(--color-text-muted)]">
                      {item.company}
                    </p>
                  </div>

                  <div className="min-w-0">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <h3 className="text-xl font-semibold leading-tight text-[var(--color-text)] sm:text-2xl">
                        {item.role}
                      </h3>
                      <span className="rounded-full bg-[color-mix(in_srgb,var(--color-secondary)_13%,transparent)] px-3 py-1 font-mono text-[9px] uppercase tracking-[0.16em] text-[var(--color-secondary)]">
                        {item.type}
                      </span>
                    </div>
                    <p className="mt-4 max-w-3xl text-sm leading-7 text-[var(--color-text-muted)] sm:text-base sm:leading-8">
                      {item.focus}
                    </p>

                    <div className="mt-5 grid gap-3 md:grid-cols-3">
                      {item.highlights.map((highlight) => (
                        <div
                          key={highlight}
                          className="rounded-xl border border-[var(--surface-border)] bg-[var(--control-bg)] px-4 py-3"
                        >
                          <span className="block text-sm font-medium leading-6 text-[var(--color-text)]">
                            {highlight}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-5 flex flex-wrap gap-2">
                      {item.skills.map((skill) => (
                        <span
                          key={skill}
                          className="rounded-full border border-[var(--surface-border)] px-3 py-1.5 text-xs text-[var(--color-text-muted)]"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
