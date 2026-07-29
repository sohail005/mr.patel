"use client";

import ScrollReveal from "@/components/effects/ScrollReveal";

const experience = [
  {
    period: "Feb 2025 to present",
    role: "React Native, React.js and Next.js Developer",
    company: "Espirits Technologies Pvt Ltd.",
    focus:
      "Full mobile release cycles, CI/CD ownership, mentoring, and product work across web and mobile.",
  },
  {
    period: "Dec 2021 to Feb 2025",
    role: "React Native Developer",
    company: "Revalsys Technologies Pvt Ltd.",
    focus:
      "End-to-end app delivery with stronger depth in debugging, performance tuning, and release discipline.",
  },
  {
    period: "Feb 2022 to Nov 2023",
    role: "React and React Native Developer",
    company: "Mufeed Products and Services Pvt Ltd.",
    focus:
      "Reusable project structure, component systems, and performance-minded implementation.",
  },
];

export default function Experience() {
  return (
    <section id="experience" className="relative py-28">
      <div className="mx-auto max-w-5xl px-6">
        <ScrollReveal mode="inView" className="max-w-3xl">
          <p className="section-kicker">Career path</p>
          <h2 className="section-heading mt-4 text-white">
            Experience built by shipping, not by rehearsing.
          </h2>
        </ScrollReveal>

        <div className="mt-14 space-y-6">
          {experience.map((item, index) => (
            <ScrollReveal
              key={`${item.company}-${item.period}`}
              mode="inView"
              direction={index % 2 === 0 ? "left" : "right"}
            >
              <div className="grid gap-5 rounded-[2rem] border border-white/10 bg-[rgba(255,255,255,0.03)] p-7 sm:grid-cols-[0.34fr_0.66fr] sm:p-8">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.26em] text-[var(--color-primary)]">
                    {item.period}
                  </p>
                  <p className="mt-4 text-sm uppercase tracking-[0.2em] text-[var(--color-text-muted)]">
                    {item.company}
                  </p>
                </div>
                <div>
                  <h3 className="text-2xl text-white">{item.role}</h3>
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
