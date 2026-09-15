"use client";

import { MotionValue, motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const stages = [
  {
    id: "01",
    label: "Foundation",
    titleTop: "SHIP",
    titleBottom: "REAL WORK",
    highlight: "IN PRODUCTION",
    subtitle: "Production-first delivery",
    body:
      "The work starts with releases, fixes, handoff, and the everyday details that decide whether a product feels reliable.",
    note: "React Native, app stores, release ownership, production debugging.",
    accent: "var(--color-primary)",
    cards: [
      { title: "Release pipeline", value: "build / sign / ship", tone: "soft" },
      { title: "Bug triage", value: "critical > major > polish", tone: "strong" },
      { title: "Versioning", value: "ios 4.2.1 / android 4.2.1", tone: "soft" },
    ],
  },
  {
    id: "02",
    label: "Interfaces",
    titleTop: "MAKE UI",
    titleBottom: "EASY TO USE",
    highlight: "ON EVERY SCREEN",
    subtitle: "Clear interaction layers",
    body:
      "Web and mobile interfaces need clear hierarchy, predictable states, and room for users to move without thinking too hard.",
    note: "Next.js, TypeScript, dashboards, platform UI, systemized layouts.",
    accent: "var(--color-secondary)",
    cards: [
      { title: "Route map", value: "/dashboard /analytics /projects /contact", tone: "strong" },
      { title: "Components", value: "cards / nav / motion / form states", tone: "soft" },
      { title: "UX rule", value: "clarity before flourish", tone: "soft" },
    ],
  },
  {
    id: "03",
    label: "Systems",
    titleTop: "KEEP CODE",
    titleBottom: "MAINTAINABLE",
    highlight: "AFTER LAUNCH",
    subtitle: "Architecture under motion",
    body:
      "Good interfaces are easier to keep improving when the code has clear boundaries, simple state, and predictable patterns.",
    note: "Server components, APIs, performance, reusable structure, sane state flow.",
    accent: "var(--color-accent)",
    cards: [
      { title: "Modules", value: "app / components / effects / sections", tone: "soft" },
      { title: "State", value: "scoped, predictable, minimal", tone: "strong" },
      { title: "Performance", value: "motion with restraint", tone: "soft" },
    ],
  },
  {
    id: "04",
    label: "Polish",
    titleTop: "ADD MOTION",
    titleBottom: "WHERE IT HELPS",
    highlight: "NOT EVERYWHERE",
    subtitle: "Animation with a job to do",
    body:
      "Animation should explain what changed, guide attention, or make a transition feel calmer. Otherwise it gets simplified.",
    note: "Framer Motion, layered timing, sticky scenes, editorial pacing.",
    accent: "var(--color-primary-strong)",
    cards: [
      { title: "Scene", value: "pinned visual stage", tone: "strong" },
      { title: "Text", value: "hard cuts + soft fades", tone: "soft" },
      { title: "Rule", value: "focused product craft", tone: "soft" },
    ],
  },
];

function StageText({
  stage,
  index,
  progress,
}: {
  stage: (typeof stages)[number];
  index: number;
  progress: MotionValue<number>;
}) {
  const segment = 1 / stages.length;
  const start = index * segment;
  const mid = start + segment / 2;
  const end = (index + 1) * segment;

  const opacity = useTransform(progress, [start, start + 0.08, end - 0.08, end], [0, 1, 1, 0]);
  const y = useTransform(progress, [start, mid, end], [36, 0, -28]);

  return (
    <motion.div
      style={{ opacity, y }}
      className="absolute inset-y-0 right-0 hidden w-full items-center justify-end px-6 pb-16 pt-24 lg:flex lg:px-12"
    >
      <div className="max-w-[34rem] text-left">
        <p
          className="text-sm font-mono uppercase tracking-[0.34em]"
          style={{ color: stage.accent }}
        >
          {stage.label}
        </p>
        <div className="text-hero mt-5 text-[var(--color-text)]">
          <div>{stage.titleTop}</div>
          <div>{stage.titleBottom}</div>
          <div className="mt-2 inline-block px-3 py-1 text-[var(--highlight-text)]" style={{ background: stage.accent }}>
            {stage.highlight}
          </div>
        </div>
        <p className="text-card-title mt-6 text-[var(--color-text)]">{stage.subtitle}</p>
        <div className="mt-8 h-px w-56 bg-[var(--featured-line)]" />
        <p className="text-body-lg mt-8 text-[var(--color-text-muted)]">{stage.body}</p>
        <p className="mt-6 text-sm leading-7 text-[var(--featured-soft-text)]">{stage.note}</p>
      </div>
    </motion.div>
  );
}

function StageVisual({
  stage,
  index,
  progress,
}: {
  stage: (typeof stages)[number];
  index: number;
  progress: MotionValue<number>;
}) {
  const segment = 1 / stages.length;
  const start = index * segment;
  const mid = start + segment / 2;
  const end = (index + 1) * segment;

  const opacity = useTransform(progress, [start, start + 0.08, end - 0.08, end], [0, 1, 1, 0]);
  const scale = useTransform(progress, [start, mid, end], [0.92, 1, 1.04]);
  const rotate = useTransform(progress, [start, mid, end], [-8, 0, 6]);
  const x = useTransform(progress, [start, mid, end], [-60, 0, 40]);

  return (
    <motion.div
      style={{ opacity, scale, rotateZ: rotate, x }}
      className="absolute left-0 top-1/2 z-10 hidden h-[34rem] w-[46rem] -translate-y-1/2 lg:block"
    >
      <div className="relative h-full w-full">
        <div
          className="absolute left-12 top-6 h-80 w-80 rounded-full blur-[110px]"
          style={{ background: `${stage.accent}22` }}
        />

        <motion.div
          className="absolute left-0 top-20 w-[30rem] rounded-[2rem] border border-[var(--featured-border)] bg-[var(--featured-card)] p-6 shadow-[0_30px_80px_rgba(0,0,0,0.25)]"
          style={{ rotate: -8 }}
        >
          <div className="mb-5 flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-yellow-300/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
          </div>
          <p className="text-sm font-mono uppercase tracking-[0.28em]" style={{ color: stage.accent }}>
            stage {stage.id} / source
          </p>
          <div className="mt-5 space-y-3 font-mono text-sm text-[var(--featured-card-text)]">
            <div className="rounded-xl border border-[var(--featured-border)] bg-[var(--featured-card-soft)] px-4 py-3">
              const stage = &quot;{stage.label.toLowerCase()}&quot;;
            </div>
            <div className="rounded-xl border border-[var(--featured-border)] bg-[var(--featured-card-soft)] px-4 py-3">
              transition: pinned visual + editorial copy
            </div>
            <div className="rounded-xl border border-[var(--featured-border)] bg-[var(--featured-card-soft)] px-4 py-3">
              constraint: focused product craft
            </div>
          </div>
        </motion.div>

        <motion.div
          className="absolute left-56 top-52 w-[22rem] rounded-[1.8rem] border border-[var(--featured-border)] bg-[var(--featured-card)] p-5 shadow-[0_24px_70px_rgba(0,0,0,0.24)]"
          style={{ rotate: 7 }}
        >
          <p className="text-caption font-mono uppercase tracking-[0.26em] text-[var(--featured-soft-text)]">
            showcase cards
          </p>
          <div className="mt-4 space-y-3">
            {stage.cards.map((card) => (
              <div
                key={card.title}
                className={`rounded-[1.2rem] border px-4 py-4 ${
                  card.tone === "strong"
                    ? "border-[var(--featured-border-strong)] bg-[var(--featured-card-strong)]"
                    : "border-[var(--featured-border)] bg-[var(--featured-card-soft)]"
                }`}
              >
                <p className="text-caption font-mono uppercase tracking-[0.24em]" style={{ color: stage.accent }}>
                  {card.title}
                </p>
                <p className="mt-3 text-lg text-[var(--color-text)]">{card.value}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="absolute left-24 top-[22rem] w-[18rem] rounded-[1.7rem] border border-[var(--featured-border)] bg-[var(--featured-card)] p-5 shadow-[0_18px_50px_rgba(0,0,0,0.22)]"
          style={{ rotate: -3 }}
        >
          <p className="text-caption font-mono uppercase tracking-[0.24em] text-[var(--featured-soft-text)]">
            software map
          </p>
          <div className="mt-4 space-y-2">
            {["mobile", "web", "api", "motion", "release"].map((item, itemIndex) => (
              <div key={item} className="flex items-center gap-3">
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ background: itemIndex === 2 ? "var(--color-text)" : stage.accent }}
                />
                <span className="font-mono text-sm uppercase tracking-[0.18em] text-[var(--featured-card-text)]">
                  {item}
                </span>
                <span className="h-px flex-1 bg-[var(--featured-border)]" />
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

function MobileStageList() {
  return (
    <div className="space-y-6 lg:hidden">
      {stages.map((stage) => (
        <div key={stage.id} className="story-card rounded-[1.8rem] p-6">
          <p className="text-sm font-mono uppercase tracking-[0.3em]" style={{ color: stage.accent }}>
            {stage.label}
          </p>
          <div className="mt-4 font-[family:var(--font-display)] text-4xl leading-[0.9] text-[var(--color-text)]">
            <div>{stage.titleTop}</div>
            <div>{stage.titleBottom}</div>
            <div className="mt-2 inline-block px-3 py-1 text-[var(--highlight-text)]" style={{ background: stage.accent }}>
              {stage.highlight}
            </div>
          </div>
          <p className="mt-5 text-lg leading-8 text-[var(--color-text-muted)]">{stage.body}</p>
          <div className="mt-6 space-y-3">
            {stage.cards.map((card) => (
              <div key={card.title} className="rounded-[1.15rem] border border-[var(--featured-border)] bg-[var(--featured-card-soft)] px-4 py-4">
                <p className="text-sm font-mono uppercase tracking-[0.24em]" style={{ color: stage.accent }}>
                  {card.title}
                </p>
                <p className="mt-2 text-[var(--color-text)]">{card.value}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function StageMarker({
  stage,
  index,
  progress,
}: {
  stage: (typeof stages)[number];
  index: number;
  progress: MotionValue<number>;
}) {
  const segment = 1 / stages.length;
  const scale = useTransform(
    progress,
    [index * segment, index * segment + segment / 2, (index + 1) * segment],
    [1, 1.45, 1]
  );
  const opacity = useTransform(
    progress,
    [index * segment, index * segment + segment / 2, (index + 1) * segment],
    [0.28, 1, 0.28]
  );

  return (
    <motion.div style={{ scale, opacity }} className="flex items-center gap-3">
      <div className="h-2.5 w-2.5 rounded-full bg-[var(--color-text)]" />
      <span className="text-caption font-mono uppercase tracking-[0.28em] text-[var(--featured-soft-text)]">
        {stage.label}
      </span>
    </motion.div>
  );
}

export default function FeaturedSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  return (
    <>
      <section className="relative bg-[var(--featured-bg)] px-6 py-20 lg:hidden">
        <div className="absolute inset-0 bg-[var(--featured-bg-layer-mobile)]" />
        <div className="relative z-10 mx-auto max-w-7xl">
          <p className="text-caption font-mono uppercase tracking-[0.32em] text-[var(--featured-soft-text)]">
            Showcase
          </p>
          <p className="text-hero mt-3 text-[var(--color-text)]">
            Software work,
            <br />
            shown clearly.
          </p>
          <p className="text-body-lg mt-6 max-w-md text-[var(--color-text-muted)]">
            A quick look at how I think about shipping interfaces that stay useful after the demo.
          </p>
          <div className="mt-10">
            <MobileStageList />
          </div>
        </div>
      </section>

      <section ref={ref} className="relative hidden lg:block" style={{ height: `${stages.length * 100}vh` }}>
        <div className="sticky top-0 h-screen overflow-hidden bg-[var(--featured-bg)]">
          <div className="absolute inset-0 bg-[var(--featured-bg-layer)]" />
          <div className="absolute inset-0 bg-[var(--featured-vignette)]" />

          <div className="absolute left-8 top-8 z-30 hidden lg:block">
            <p className="font-[family:var(--font-display)] text-5xl font-semibold tracking-tight text-[var(--color-text)]">
              Showcase
            </p>
            <p className="text-sm font-mono uppercase tracking-[0.3em] text-[var(--color-text-muted)]">
              Code / software / motion
            </p>
          </div>

          <div className="absolute bottom-8 left-8 z-30 hidden lg:block max-w-xs">
            <p className="text-sm font-mono uppercase tracking-[0.26em] text-[var(--featured-soft-text)]">
              Practical product thinking
            </p>
            <p className="mt-3 text-sm leading-7 text-[var(--featured-soft-text)]">
              Release habits, interface clarity, maintainable code, and motion used with restraint.
            </p>
          </div>

          <div className="relative mx-auto h-full max-w-7xl">
            {stages.map((stage, index) => (
              <StageVisual key={`visual-${stage.id}`} stage={stage} index={index} progress={scrollYProgress} />
            ))}

            {stages.map((stage, index) => (
              <StageText key={`text-${stage.id}`} stage={stage} index={index} progress={scrollYProgress} />
            ))}

            <div className="absolute right-8 top-1/2 z-30 hidden -translate-y-1/2 flex-col gap-4 lg:flex ">
              {stages.map((stage, index) => (
                <StageMarker key={stage.id} stage={stage} index={index} progress={scrollYProgress} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
