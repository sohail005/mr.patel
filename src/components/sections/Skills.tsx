"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import ScrollReveal from "@/components/effects/ScrollReveal";

const groups = [
  {
    title: "Frontend systems",
    color: "var(--color-primary)",
    items: ["Next.js", "React", "TypeScript", "Tailwind CSS", "State design"],
  },
  {
    title: "Mobile delivery",
    color: "var(--color-secondary)",
    items: ["React Native", "Release cycles", "Store deployment", "Performance tuning"],
  },
  {
    title: "Motion and polish",
    color: "var(--color-accent)",
    items: ["Framer Motion", "Lenis", "Three.js", "Interaction pacing"],
  },
];

export default function Skills() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-120px" });

  return (
    <section id="skills" ref={ref} className="relative py-28">
      <div className="mx-auto max-w-7xl px-6">
        <ScrollReveal mode="inView" className="max-w-3xl">
          <p className="section-kicker">Stack</p>
          <h2 className="section-heading mt-4 text-[var(--color-text)]">
            The tools I reach for when the product has to move quickly.
          </h2>
        </ScrollReveal>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {groups.map((group, index) => (
            <ScrollReveal key={group.title} mode="inView" delay={index * 0.08}>
              <div className="story-card rounded-[1.9rem] p-7">
                <p
                  className="font-mono text-[10px] uppercase tracking-[0.28em]"
                  style={{ color: group.color }}
                >
                  Track {index + 1}
                </p>
                <h3 className="mt-4 text-2xl text-[var(--color-text)]">{group.title}</h3>
                <div className="mt-8 space-y-4">
                  {group.items.map((item, itemIndex) => (
                    <div key={item} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-[var(--color-text-muted)]">
                          {item}
                        </span>
                        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--color-text-muted)]">
                          Ready
                        </span>
                      </div>
                      <div className="h-1.5 rounded-full bg-[var(--control-bg)]">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={inView ? { width: `${70 + itemIndex * 6}%` } : { width: 0 }}
                          transition={{ duration: 1, delay: 0.12 * itemIndex }}
                          className="h-full rounded-full"
                          style={{
                            background: `linear-gradient(90deg, ${group.color}, rgba(255,255,255,0.8))`,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
