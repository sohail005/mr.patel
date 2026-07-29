"use client";

import dynamic from "next/dynamic";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const HeroScene = dynamic(() => import("@/components/three/HeroScene"), {
  ssr: false,
});

const metrics = [
  { label: "Years shipping products", value: "3+" },
  { label: "Mobile and web releases", value: "25+" },
  { label: "Core stack coverage", value: "React / Next / Native" },
];

const ledger = [
  ["Current focus", "Product-grade React Native and Next.js systems"],
  ["Preferred terrain", "Animation-heavy UI, release engineering, polished interfaces"],
  ["Approach", "Fast delivery, sober architecture, detail in motion"],
];

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const copyY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);
  const sceneY = useTransform(scrollYProgress, [0, 1], [0, 70]);
  const hazeScale = useTransform(scrollYProgress, [0, 1], [1, 1.25]);

  return (
    <section
      id="hero"
      ref={ref}
      className="relative flex min-h-screen items-center overflow-hidden"
    >
      <motion.div style={{ y: sceneY }} className="absolute inset-0 opacity-70">
        <HeroScene />
      </motion.div>

      <div className="atmosphere" />
      <div className="terrain-grid absolute inset-0 opacity-[0.06]" />

      <motion.div
        style={{ scale: hazeScale }}
        className="pointer-events-none absolute left-1/2 top-[12%] h-[34rem] w-[34rem] -translate-x-1/2 rounded-full bg-[rgba(204,230,255,0.12)] blur-[120px]"
      />

      <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-[#040d15] to-transparent" />

      <motion.div
        style={{ y: copyY, opacity: copyOpacity }}
        className="relative z-10 grid w-full gap-12 px-6 pb-20 pt-36 lg:grid-cols-[minmax(0,1.45fr)_minmax(24rem,0.55fr)] lg:items-end lg:px-12 2xl:px-20"
      >
        <div>
          <h1 className="section-heading max-w-5xl text-white">
            Cinematic product work for web and mobile, built with motion that
            earns its place.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--color-text-muted)] md:text-xl">
            I design and ship React Native and Next.js experiences that feel
            precise under the cursor, stable in production, and intentional in
            every state change.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <a
              href="#projects"
              className="rounded-full border border-[rgba(143,199,255,0.26)] bg-[rgba(143,199,255,0.12)] px-6 py-3 font-mono text-[11px] uppercase tracking-[0.28em] text-white"
            >
              Explore work
            </a>
            <a
              href="#contact"
              className="rounded-full border border-white/12 px-6 py-3 font-mono text-[11px] uppercase tracking-[0.28em] text-[var(--color-text-muted)] hover:text-white"
            >
              Discuss a build
            </a>
          </div>

          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {metrics.map((item) => (
              <div key={item.label} className="story-card rounded-[1.6rem] p-5">
                <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-[var(--color-text-muted)]">
                  {item.label}
                </p>
                <p className="mt-4 text-2xl font-semibold text-white">
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="story-card rounded-[2rem] p-6 sm:p-8 lg:max-w-[30rem] lg:justify-self-end">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[var(--color-primary)]">
                Field ledger
              </p>
              <p className="mt-2 font-[family:var(--font-display)] text-4xl leading-none text-white">
                Sohail Patel
              </p>
            </div>
            <div className="rounded-full border border-[rgba(127,224,195,0.24)] bg-[rgba(127,224,195,0.09)] px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--color-secondary)]">
              Available
            </div>
          </div>

          <div className="ridge-divider my-6" />

          <div className="space-y-4 text-sm text-[var(--color-text-muted)]">
            {ledger.map(([label, value]) => (
              <div key={label} className="ledger-line">
                <span className="font-mono uppercase tracking-[0.2em] text-[10px] text-[var(--color-primary)]">
                  {label}
                </span>
                <span className="max-w-[14rem] text-right leading-6 text-[var(--color-text)]">
                  {value}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-[1.5rem] border border-white/8 bg-[rgba(255,255,255,0.03)] p-5">
            <p className="font-mono text-[10px] uppercase tracking-[0.26em] text-[var(--color-text-muted)]">
              Signature stack
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {["Next.js", "React Native", "TypeScript", "Framer Motion", "Three.js"].map(
                (item) => (
                  <span
                    key={item}
                    className="rounded-full border border-white/10 px-3 py-1 text-xs text-[var(--color-text-muted)]"
                  >
                    {item}
                  </span>
                )
              )}
            </div>
          </div>
        </div>
      </motion.div>

      <div className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2">
        <motion.div
          animate={{ y: [0, 9, 0] }}
          transition={{ duration: 1.8, repeat: Infinity }}
          className="flex flex-col items-center gap-3"
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--color-text-muted)]">
            Scroll the climb
          </span>
          <div className="flex h-10 w-6 justify-center rounded-full border border-white/15 pt-2">
            <span className="h-2 w-1 rounded-full bg-[var(--color-primary)]" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
