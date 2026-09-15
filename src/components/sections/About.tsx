"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import ScrollReveal from "@/components/effects/ScrollReveal";

const principles = [
  {
    title: "Product before spectacle",
    text: "Motion has to explain state, focus attention, or shape pacing. If it only decorates, it gets cut.",
  },
  {
    title: "Ship the hard parts",
    text: "Release engineering, bug pressure, and messy platform details are part of the craft, not separate from it.",
  },
  {
    title: "Polish without bloat",
    text: "The strongest effect is often careful layering, timing, and restraint rather than more libraries or heavier scenes.",
  },
];

export default function About() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const hazeY = useTransform(scrollYProgress, [0, 1], [-20, 28]);

  return (
    <section id="about" ref={ref} className="relative overflow-hidden py-16 sm:py-20 lg:py-24">
      <motion.div
        style={{ y: hazeY }}
        className="pointer-events-none absolute left-0 top-16 hidden h-80 w-80 rounded-full bg-[rgba(127,224,195,0.08)] blur-[90px] md:block"
      />

      <div className="mx-auto max-w-7xl px-6">
        <ScrollReveal mode="inView" className="max-w-3xl">
          <p className="section-kicker">About</p>
          <h2 className="section-heading mt-4 text-[var(--color-text)]">
            I like the part where design has to survive production.
          </h2>
          <p className="text-body-lg prose-measure mt-6 text-[var(--color-text-muted)]">
            My work sits between interface detail and release responsibility:
            the layout, the state, the handoff, the strange edge case, and the
            tiny interaction that makes a product feel finished.
          </p>
        </ScrollReveal>

        <div className="mt-9 grid gap-5 sm:mt-10 lg:grid-cols-[1.15fr_0.85fr]">
          <ScrollReveal>
            <div className="story-card rounded-[1.4rem] p-6 sm:rounded-[2rem] sm:p-8 lg:p-10">
              <p className="text-caption font-mono uppercase tracking-[0.28em] text-[var(--color-primary)]">
                Field notes
              </p>
              <div className="mt-6 space-y-4 text-[var(--color-text-muted)] sm:mt-8 sm:space-y-5">
                <p className="text-lg leading-8 text-[var(--color-text)]">
                  My strongest work sits where interaction design and software
                  discipline overlap.
                </p>
                <p className="leading-8">
                  That means responsive interfaces, careful scroll behavior,
                  production-minded architecture, and a willingness to solve the
                  unglamorous parts of the build as seriously as the visible
                  ones.
                </p>
              </div>
            </div>
          </ScrollReveal>

          <div className="grid gap-4">
            {principles.map((item, index) => (
              <ScrollReveal
                key={item.title}
                direction={index === 0 ? "right" : "up"}
                mode="inView"
                delay={index * 0.08}
              >
                <div className="panel-shell rounded-[1.6rem] p-6">
                  <p className="text-caption font-mono uppercase tracking-[0.24em] text-[var(--color-secondary)]">
                    Principle {index + 1}
                  </p>
                  <h3 className="text-card-title mt-3 text-[var(--color-text)]">{item.title}</h3>
                  <p className="mt-3 leading-7 text-[var(--color-text-muted)]">
                    {item.text}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
