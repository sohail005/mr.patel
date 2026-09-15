"use client";

import ScrollReveal from "@/components/effects/ScrollReveal";

const experience = [
  {
    period: "Mar 2025 to present",
    role: "React Native, React.js and Next.js Developer",
    company: "Espirits Technologies Pvt Ltd.",
    focus:
      "Full mobile release cycles, CI/CD ownership, mentoring, and product work across web and mobile.",
  },
  {
    period: "Nov 2021 to Mar 2025 - 3 yrs 5 mons",
    role: "React Native Developer",
    company: "Revalsys Technologies Pvt Ltd.",
    focus:
      "End-to-end app delivery with stronger depth in debugging, performance tuning, and release discipline.",
  },
  {
    period: "Jan 2021 to Nov 2021 - 11 Mon",
    role: "React and React Native Developer",
    company: "Mufeed Products and Services Pvt Ltd.",
    focus:
      "Reusable project structure, component systems, and performance-minded implementation.",
  },
];

export default function Experience() {
  return (
    <section id="experience" className="relative py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-5xl px-6">
        <ScrollReveal mode="inView" className="max-w-3xl">
          <p className="section-kicker">Experience</p>
          <h2 className="section-heading mt-4 text-[var(--color-text)]">
            Teams, products, releases, and the lessons that came with them.
          </h2>
        </ScrollReveal>

        <div className="mt-9 space-y-5 sm:mt-10 sm:space-y-6">
          {experience.map((item) => (
            <ScrollReveal
              key={`${item.company}-${item.period}`}
              mode="inView"
              direction="up"
            >
              <div className="grid gap-5 rounded-[1.4rem] border border-[var(--surface-border)] bg-[var(--control-bg)] p-6 sm:grid-cols-[0.34fr_0.66fr] sm:rounded-[2rem] sm:p-8">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.26em] text-[var(--color-primary)]">
                    {item.period}
                  </p>
                  <p className="mt-4 text-sm uppercase tracking-[0.2em] text-[var(--color-text-muted)]">
                    {item.company}
                  </p>
                </div>
                <div>
                  <h3 className="text-2xl text-[var(--color-text)]">{item.role}</h3>
                  <p className="mt-4 leading-8 text-[var(--color-text-muted)]">
                    {item.focus}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
