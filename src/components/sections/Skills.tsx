"use client";

import { ReactNode } from "react";
import ScrollReveal from "@/components/effects/ScrollReveal";

const CodeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
  </svg>
);

const SmartphoneIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <rect width="14" height="20" x="5" y="2" rx="2" ry="2" />
    <path d="M12 18h.01" />
  </svg>
);

const SparklesIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="m12 3-1.9 5.8a2 2 0 0 1-1.287 1.288L3 12l5.8 1.9a2 2 0 0 1 1.288 1.287L12 21l1.9-5.8a2 2 0 0 1 1.287-1.288L21 12l-5.8-1.9a2 2 0 0 1-1.288-1.287Z" />
    <path d="M5 3v4" />
    <path d="M19 17v4" />
    <path d="M3 5h4" />
    <path d="M17 19h4" />
  </svg>
);

const groups: {
  title: string;
  summary: string;
  color: string;
  badge: string;
  icon: ReactNode;
  items: string[];
}[] = [
  {
    title: "Frontend Systems",
    summary: "Product interfaces built with typed components, responsive layouts, and clean release habits.",
    color: "var(--color-primary)",
    badge: "Web",
    icon: <CodeIcon />,
    items: ["Next.js", "React", "TypeScript", "Tailwind CSS", "State design", "SEO"],
  },
  {
    title: "Mobile Delivery",
    summary: "React Native apps carried from feature work through testing, store assets, and production releases.",
    color: "var(--color-primary)",
    badge: "Apps",
    icon: <SmartphoneIcon />,
    items: ["React Native", "Release cycles", "Store deployment", "Performance tuning", "Native modules"],
  },
  {
    title: "Motion & Polish",
    summary: "Purposeful interaction details that make products feel refined without slowing the experience down.",
    color: "var(--color-primary)",
    badge: "UX",
    icon: <SparklesIcon />,
    items: ["Framer Motion", "Lenis scroll", "Three.js", "Interaction pacing", "Layout animations"],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="relative overflow-hidden py-16 sm:py-20 lg:py-24">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <ScrollReveal mode="inView" className="max-w-3xl">
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-primary" />
            <p className="section-kicker">Capabilities</p>
          </div>
          <h2 className="section-heading mt-4 max-w-2xl text-text">
            The tools I reach for{" "}
            <span className="text-text-muted">when the product has to </span>
            <span className="bg-[linear-gradient(90deg,var(--color-primary),var(--color-primary-strong))] bg-clip-text text-transparent">
              move quickly.
            </span>
          </h2>
          <p className="text-body-lg prose-measure mt-5 text-text-muted">
            A practical stack for shipping responsive web apps, mobile products,
            and polished interfaces without turning the codebase heavy.
          </p>
        </ScrollReveal>

        <div className="mt-9 grid gap-5 sm:mt-10 lg:grid-cols-3">
          {groups.map((group, index) => (
            <ScrollReveal key={group.title} mode="inView" delay={index * 0.08}>
              <article className="story-card group h-full rounded-[1.35rem] p-5 sm:rounded-[1.75rem] sm:p-6">
                <div className="relative z-10 flex items-start justify-between gap-4">
                  <span
                    className="flex h-14 w-14 items-center justify-center rounded-2xl border [&>svg]:h-6 [&>svg]:w-6"
                    style={{
                      borderColor: `color-mix(in srgb, ${group.color} 32%, transparent)`,
                      background: `color-mix(in srgb, ${group.color} 14%, transparent)`,
                      color: group.color,
                    }}
                  >
                    {group.icon}
                  </span>
                  <span
                    className="text-caption rounded-full border px-3 py-1 font-mono uppercase tracking-[0.18em]"
                    style={{
                      borderColor: `color-mix(in srgb, ${group.color} 38%, transparent)`,
                      color: group.color,
                    }}
                  >
                    {group.badge}
                  </span>
                </div>

                <p
                  className="text-caption relative z-10 mt-5 font-mono uppercase tracking-[0.24em]"
                  style={{ color: group.color }}
                >
                  {group.title}
                </p>
                <h3 className="text-card-title relative z-10 mt-1 text-text">
                  {group.title}
                </h3>

                <p className="relative z-10 mt-3 text-sm leading-6 text-text-muted">
                  {group.summary}
                </p>

                <div className="relative z-10 mt-5 border-t border-(--surface-border) pt-5">
                  <div className="grid grid-cols-2 gap-2.5">
                    {group.items.map((item) => (
                      <span
                        key={item}
                        className="inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm text-text"
                        style={{
                          borderColor: `color-mix(in srgb, ${group.color} 20%, transparent)`,
                          background: `color-mix(in srgb, ${group.color} 8%, transparent)`,
                        }}
                      >
                        <span className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: group.color }} />
                        <span className="truncate">{item}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
