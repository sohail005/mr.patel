"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import ScrollReveal from "@/components/effects/ScrollReveal";

const groups = [
  {
    eyebrow: "Track 01",
    title: "Frontend Systems",
    summary: "Product interfaces built with typed components, responsive layouts, and clean release habits.",
    color: "var(--color-primary)",
    badge: "Web",
    items: [
      { name: "Next.js", level: 88 },
      { name: "React", level: 94 },
      { name: "TypeScript", level: 82 },
      { name: "Tailwind CSS", level: 90 },
      { name: "State design", level: 76 },
    ],
  },
  {
    eyebrow: "Track 02",
    title: "Mobile Delivery",
    summary: "React Native apps carried from feature work through testing, store assets, and production releases.",
    color: "var(--color-secondary)",
    badge: "Apps",
    items: [
      { name: "React Native", level: 92 },
      { name: "Release cycles", level: 86 },
      { name: "Store deployment", level: 88 },
      { name: "Performance tuning", level: 84 },
      { name: "Native modules", level: 74 },
    ],
  },
  {
    eyebrow: "Track 03",
    title: "Motion & Polish",
    summary: "Purposeful interaction details that make products feel refined without slowing the experience down.",
    color: "var(--color-accent)",
    badge: "UX",
    items: [
      { name: "Framer Motion", level: 82 },
      { name: "Lenis scroll", level: 78 },
      { name: "Three.js", level: 72 },
      { name: "Interaction pacing", level: 88 },
      { name: "Layout animations", level: 80 },
    ],
  },
];

export default function Skills() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-120px" });

  return (
    <section id="skills" ref={ref} className="relative overflow-hidden py-16 sm:py-20 lg:py-24">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <ScrollReveal mode="inView" className="max-w-5xl">
          <p className="section-kicker">Capabilities grid</p>
          <div className="mt-4 gap-6 lg:grid-cols-[minmax(0,0.92fr)_minmax(18rem,0.36fr)] lg:items-end">
            <h2 className="section-heading max-w-4xl text-[var(--color-text)]">
              The tools I reach for when the product has to move quickly.
            </h2>
            <p className="text-sm leading-7 text-[var(--color-text-muted)] sm:text-base mt-5">
              A practical stack for shipping responsive web apps, mobile products,
              and polished interfaces without turning the codebase heavy.
            </p>
          </div>
        </ScrollReveal>

        <div className="mt-9 grid gap-5 sm:mt-10 lg:grid-cols-3">
          {groups.map((group, index) => (
            <ScrollReveal key={group.title} mode="inView" delay={index * 0.08}>
              <article className="story-card group h-full rounded-[1.35rem] p-5 transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1 hover:border-[var(--surface-border-strong)] sm:rounded-[1.75rem] sm:p-6">
                <div className="relative z-10 flex items-start justify-between gap-4">
                  <div>
                    <p
                      className="font-mono text-[10px] uppercase tracking-[0.24em]"
                      style={{ color: group.color }}
                    >
                      {group.eyebrow}
                    </p>
                    <h3 className="mt-4 text-2xl font-semibold leading-tight text-[var(--color-text)]">
                      {group.title}
                    </h3>
                  </div>
                  <span
                    className="rounded-full border px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em]"
                    style={{
                      borderColor: `color-mix(in srgb, ${group.color} 38%, transparent)`,
                      color: group.color,
                    }}
                  >
                    {group.badge}
                  </span>
                </div>

                <p className="relative z-10 mt-4 min-h-14 text-sm leading-7 text-[var(--color-text-muted)]">
                  {group.summary}
                </p>

                <div className="relative z-10 mt-6 space-y-4">
                  {group.items.map((item, itemIndex) => (
                    <div key={item.name} className="space-y-2">
                      <div className="flex items-center justify-between gap-3">
                        <span className="text-sm font-medium text-[var(--color-text-muted)]">
                          {item.name}
                        </span>
                        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--color-text-muted)]">
                          Ready
                        </span>
                      </div>
                      <div className="h-1.5 overflow-hidden rounded-full bg-[color-mix(in_srgb,var(--color-text)_9%,transparent)]">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={inView ? { width: `${item.level}%` } : { width: 0 }}
                          transition={{ duration: 0.65, delay: 0.08 * itemIndex, ease: "easeOut" }}
                          className="h-full rounded-full shadow-[0_0_18px_currentColor]"
                          style={{
                            background: `linear-gradient(90deg, ${group.color}, rgba(255,255,255,0.8))`,
                            color: group.color,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
