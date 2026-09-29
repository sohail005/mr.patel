"use client";

import dynamic from "next/dynamic";
import { motion, useReducedMotion } from "framer-motion";
import Button from "@/components/ui/Button";
import SectionLabel from "@/components/ui/SectionLabel";
import Container from "@/components/ui/Container";

const HeroField = dynamic(() => import("@/components/three/HeroField"), {
  ssr: false,
});

const REVEAL_SPRING = { type: "spring" as const, stiffness: 120, damping: 22 };

const HEADLINE = "I engineer modern, production-ready web & mobile applications.";
const headlineWords = HEADLINE.split(" ");

const wordVariants = {
  hidden: { opacity: 0, y: 24, filter: "blur(6px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)" },
};

export default function Hero() {
  const shouldReduceMotion = useReducedMotion();

  const rise = (delay: number, distance = 20) =>
    shouldReduceMotion
      ? { initial: false as const }
      : {
          initial: { opacity: 0, y: distance },
          animate: { opacity: 1, y: 0 },
          transition: { ...REVEAL_SPRING, delay },
        };

  return (
    <section
      id="hero"
      className="relative flex min-h-svh items-center overflow-hidden bg-[var(--color-background)]"
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[60%] opacity-[0.06]"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 0%, var(--color-primary-accent), transparent 70%)",
        }}
      />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-[linear-gradient(to_top,var(--color-background),transparent)]" />

      <div className="pointer-events-none absolute inset-0 hidden opacity-60 lg:block" aria-hidden="true">
        {shouldReduceMotion ? (
          <div
            className="absolute inset-[12%] rounded-full opacity-40 blur-2xl"
            style={{
              background:
                "radial-gradient(circle, color-mix(in srgb, var(--color-primary-accent) 40%, transparent), transparent 70%)",
            }}
          />
        ) : (
          <HeroField />
        )}
      </div>

      <Container className="relative z-10 grid items-center gap-10 pb-16 pt-24 sm:pt-28 lg:grid-cols-[minmax(0,8fr)_minmax(0,4fr)] lg:gap-8 lg:pb-20 lg:pt-24">
        <div className="flex max-w-2xl flex-col items-start gap-5 lg:gap-6">
          <motion.span {...rise(0, 14)} className="inline-flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-primary-accent)]" />
            <SectionLabel>Software Developer</SectionLabel>
          </motion.span>

          <h1 className="text-[length:var(--text-hero)] font-sans font-semibold leading-[1.06] tracking-tight text-[var(--color-text-primary)]">
            <span className="sr-only">{HEADLINE}</span>
            <span aria-hidden="true">
              {headlineWords.map((word, i) => (
                <motion.span
                  key={`${word}-${i}`}
                  className="mr-[0.26em] inline-block"
                  variants={shouldReduceMotion ? undefined : wordVariants}
                  initial={shouldReduceMotion ? false : "hidden"}
                  animate={shouldReduceMotion ? undefined : "visible"}
                  transition={{ ...REVEAL_SPRING, delay: 0.1 + i * 0.05 }}
                  style={{ willChange: "transform, opacity, filter" }}
                >
                  {word}
                </motion.span>
              ))}
            </span>
          </h1>

          <motion.p {...rise(0.35)} className="text-body-lg max-w-xl text-[var(--color-text-secondary)]">
            I build with React Native, Next.js & React.js, backed by Firebase, SEO, analytics, and
            production deployments.
          </motion.p>

          <motion.div {...rise(0.5)} className="flex flex-wrap items-center gap-3 pt-1 sm:gap-4">
            <Button variant="primary" href="/#projects">
              Explore work
            </Button>
            <Button variant="secondary" href="/contact">
              Discuss a build
            </Button>
          </motion.div>

          <motion.div
            {...rise(0.65, 12)}
            className="inline-flex items-center gap-2 pt-1 font-mono text-[11px] uppercase tracking-[0.24em] text-[var(--color-text-muted)]"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--color-primary-accent)] opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--color-primary-accent)]" />
            </span>
            Available for builds
          </motion.div>
        </div>

        <div className="hidden lg:block" aria-hidden="true" />
      </Container>

      <div className="absolute bottom-5 left-1/2 z-20 hidden -translate-x-1/2 sm:block lg:bottom-6">
        <motion.div
          animate={shouldReduceMotion ? { y: 0 } : { y: [0, 9, 0] }}
          transition={shouldReduceMotion ? undefined : { duration: 1.8, repeat: Infinity }}
          className="flex flex-col items-center gap-3"
        >
          <span className="font-mono text-sm uppercase tracking-[0.3em] text-[var(--color-text-muted)]">
            Scroll the climb
          </span>
          <div className="flex h-10 w-6 justify-center rounded-full border border-[var(--color-border)] pt-2">
            <span className="h-2 w-1 rounded-full bg-[var(--color-primary-accent)]" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
