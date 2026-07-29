"use client";

import { MotionValue, motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const stages = [
  {
    id: "01",
    label: "Foundation",
    titleTop: "SHIP",
    titleBottom: "PRODUCTS",
    highlight: "THAT HOLD",
    subtitle: "Production-first delivery",
    body:
      "From release cycles to bug pressure, the work starts with shipping real software that survives outside a polished demo.",
    note: "React Native, app stores, release ownership, production debugging.",
    accent: "#8fc7ff",
    cards: [
      { title: "Release pipeline", value: "build / sign / ship", tone: "soft" },
      { title: "Bug triage", value: "critical > major > polish", tone: "strong" },
      { title: "Versioning", value: "ios 4.2.1 / android 4.2.1", tone: "soft" },
    ],
  },
  {
    id: "02",
    label: "Interfaces",
    titleTop: "BUILD",
    titleBottom: "EXPERIENCES",
    highlight: "THAT READ FAST",
    subtitle: "Clear interaction layers",
    body:
      "Web and mobile interfaces need rhythm, hierarchy, and immediate readability before they need decoration.",
    note: "Next.js, TypeScript, dashboards, platform UI, systemized layouts.",
    accent: "#7fe0c3",
    cards: [
      { title: "Route map", value: "/dashboard /analytics /projects /contact", tone: "strong" },
      { title: "Components", value: "cards / nav / motion / form states", tone: "soft" },
      { title: "UX rule", value: "clarity before flourish", tone: "soft" },
    ],
  },
  {
    id: "03",
    label: "Systems",
    titleTop: "SCALE",
    titleBottom: "THE STACK",
    highlight: "WITHOUT FRICTION",
    subtitle: "Architecture under motion",
    body:
      "The better the transitions feel, the more the underlying code has to stay disciplined: boundaries, state, performance, and maintainable patterns.",
    note: "Server components, APIs, performance, reusable structure, sane state flow.",
    accent: "#f7b267",
    cards: [
      { title: "Modules", value: "app / components / effects / sections", tone: "soft" },
      { title: "State", value: "scoped, predictable, minimal", tone: "strong" },
      { title: "Performance", value: "motion with restraint", tone: "soft" },
    ],
  },
  {
    id: "04",
    label: "Polish",
    titleTop: "DIRECT",
    titleBottom: "THE MOTION",
    highlight: "LIKE A FILM CUT",
    subtitle: "Scrollytelling without excess",
    body:
      "The goal is a portfolio that feels intentional at every scroll point: pinned visuals, bold transitions, and enough restraint to keep the work in focus.",
    note: "Framer Motion, layered timing, sticky scenes, editorial pacing.",
    accent: "#ff8a65",
    cards: [
      { title: "Scene", value: "pinned visual stage", tone: "strong" },
      { title: "Text", value: "hard cuts + soft fades", tone: "soft" },
      { title: "Rule", value: "free tooling only", tone: "soft" },
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
          className="font-mono text-[11px] uppercase tracking-[0.34em]"
          style={{ color: stage.accent }}
        >
          {stage.label}
        </p>
        <div className="mt-5 font-[family:var(--font-display)] text-[clamp(3rem,6vw,6rem)] leading-[0.88] text-white">
          <div>{stage.titleTop}</div>
          <div>{stage.titleBottom}</div>
          <div className="mt-2 inline-block px-3 py-1 text-black" style={{ background: stage.accent }}>
            {stage.highlight}
          </div>
        </div>
        <p className="mt-6 text-2xl leading-tight text-white">{stage.subtitle}</p>
        <div className="mt-8 h-px w-56 bg-white/60" />
        <p className="mt-8 text-lg leading-9 text-[var(--color-text-muted)]">{stage.body}</p>
        <p className="mt-6 text-sm leading-7 text-white/70">{stage.note}</p>
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
          className="absolute left-0 top-20 w-[30rem] rounded-[2rem] border border-white/10 bg-[rgba(10,18,28,0.9)] p-6 shadow-[0_30px_80px_rgba(0,0,0,0.35)]"
          style={{ rotate: -8 }}
        >
          <div className="mb-5 flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-yellow-300/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
          </div>
          <p className="font-mono text-[10px] uppercase tracking-[0.28em]" style={{ color: stage.accent }}>
            stage {stage.id} / source
          </p>
          <div className="mt-5 space-y-3 font-mono text-sm text-white/80">
            <div className="rounded-xl border border-white/8 bg-white/[0.03] px-4 py-3">
              const stage = "{stage.label.toLowerCase()}";
            </div>
            <div className="rounded-xl border border-white/8 bg-white/[0.03] px-4 py-3">
              transition: pinned visual + editorial copy
            </div>
            <div className="rounded-xl border border-white/8 bg-white/[0.03] px-4 py-3">
              constraint: free tooling / no paid plugins
            </div>
          </div>
        </motion.div>

        <motion.div
          className="absolute left-56 top-52 w-[22rem] rounded-[1.8rem] border border-white/10 bg-[rgba(14,24,36,0.94)] p-5 shadow-[0_24px_70px_rgba(0,0,0,0.32)]"
          style={{ rotate: 7 }}
        >
          <p className="font-mono text-[10px] uppercase tracking-[0.26em] text-white/55">
            showcase cards
          </p>
          <div className="mt-4 space-y-3">
            {stage.cards.map((card) => (
              <div
                key={card.title}
                className={`rounded-[1.2rem] border px-4 py-4 ${
                  card.tone === "strong"
                    ? "border-white/14 bg-white/[0.06]"
                    : "border-white/8 bg-white/[0.03]"
                }`}
              >
                <p className="font-mono text-[10px] uppercase tracking-[0.24em]" style={{ color: stage.accent }}>
                  {card.title}
                </p>
                <p className="mt-3 text-lg text-white">{card.value}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="absolute left-24 top-[22rem] w-[18rem] rounded-[1.7rem] border border-white/10 bg-[rgba(9,17,26,0.92)] p-5 shadow-[0_18px_50px_rgba(0,0,0,0.28)]"
          style={{ rotate: -3 }}
        >
          <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-white/55">
            software map
          </p>
          <div className="mt-4 space-y-2">
            {["mobile", "web", "api", "motion", "release"].map((item, itemIndex) => (
              <div key={item} className="flex items-center gap-3">
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ background: itemIndex === 2 ? "white" : stage.accent }}
                />
                <span className="font-mono text-sm uppercase tracking-[0.18em] text-white/80">
                  {item}
                </span>
                <span className="h-px flex-1 bg-white/10" />
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
          <p className="font-mono text-[10px] uppercase tracking-[0.3em]" style={{ color: stage.accent }}>
            {stage.label}
          </p>
          <div className="mt-4 font-[family:var(--font-display)] text-4xl leading-[0.9] text-white">
            <div>{stage.titleTop}</div>
            <div>{stage.titleBottom}</div>
            <div className="mt-2 inline-block px-3 py-1 text-black" style={{ background: stage.accent }}>
              {stage.highlight}
            </div>
          </div>
          <p className="mt-5 text-lg leading-8 text-[var(--color-text-muted)]">{stage.body}</p>
          <div className="mt-6 space-y-3">
            {stage.cards.map((card) => (
              <div key={card.title} className="rounded-[1.15rem] border border-white/8 bg-white/[0.03] px-4 py-4">
                <p className="font-mono text-[10px] uppercase tracking-[0.24em]" style={{ color: stage.accent }}>
                  {card.title}
                </p>
                <p className="mt-2 text-white">{card.value}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
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
      <section className="relative bg-[#090909] px-6 py-20 lg:hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_35%_40%,rgba(255,255,255,0.10),transparent_24%),linear-gradient(180deg,#040404_0%,#161616_55%,#0b0b0b_100%)]" />
        <div className="relative z-10 mx-auto max-w-7xl">
          <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-white/60">
            Showcase
          </p>
          <p className="mt-3 font-[family:var(--font-display)] text-[clamp(3rem,15vw,4.8rem)] leading-[0.9] text-white">
            Code and software,
            <br />
            directed like scenes.
          </p>
          <p className="mt-6 max-w-md text-base leading-8 text-[var(--color-text-muted)]">
            Bold software storytelling for small screens, without the pinned desktop layers.
          </p>
          <div className="mt-10">
            <MobileStageList />
          </div>
        </div>
      </section>

      <section ref={ref} className="relative hidden lg:block" style={{ height: `${stages.length * 100}vh` }}>
        <div className="sticky top-0 h-screen overflow-hidden bg-[#090909]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_35%_40%,rgba(255,255,255,0.10),transparent_24%),linear-gradient(90deg,#040404_0%,#171717_52%,#0b0b0b_100%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.02),transparent_20%,transparent_80%,rgba(255,255,255,0.02))]" />

          <div className="absolute left-8 top-8 z-30 hidden lg:block">
            <p className="font-[family:var(--font-display)] text-5xl font-semibold tracking-tight text-white">
              Showcase
            </p>
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-[var(--color-text-muted)]">
              Code / software / motion
            </p>
          </div>

          <div className="absolute bottom-8 left-8 z-30 hidden lg:block max-w-xs">
            <p className="font-mono text-[11px] uppercase tracking-[0.26em] text-white/60">
              Interactive project scrollytelling
            </p>
            <p className="mt-3 text-sm leading-7 text-white/60">
              Pinned visual composition, hard-cut headline changes, softer body fades.
            </p>
          </div>

          <div className="relative mx-auto h-full max-w-7xl">
            {stages.map((stage, index) => (
              <StageVisual key={`visual-${stage.id}`} stage={stage} index={index} progress={scrollYProgress} />
            ))}

            {stages.map((stage, index) => (
              <StageText key={`text-${stage.id}`} stage={stage} index={index} progress={scrollYProgress} />
            ))}

            <div className="absolute right-8 top-1/2 z-30 hidden -translate-y-1/2 flex-col gap-4 lg:flex">
              {stages.map((stage, index) => {
                const segment = 1 / stages.length;
                const scale = useTransform(
                  scrollYProgress,
                  [index * segment, index * segment + segment / 2, (index + 1) * segment],
                  [1, 1.45, 1]
                );
                const opacity = useTransform(
                  scrollYProgress,
                  [index * segment, index * segment + segment / 2, (index + 1) * segment],
                  [0.28, 1, 0.28]
                );

                return (
                  <motion.div key={stage.id} style={{ scale, opacity }} className="flex items-center gap-3">
                    <div className="h-2.5 w-2.5 rounded-full bg-white" />
                    <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-white/55">
                      {stage.label}
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
