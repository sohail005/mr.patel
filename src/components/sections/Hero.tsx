"use client";

import dynamic from "next/dynamic";
import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import ProfileCard from "@/components/effects/ProfileCard";
import SpecularButton from "@/components/effects/SpecularButton";
import { scrollToHash } from "@/lib/scrollToHash";
import profilePhoto from "@/Assets/profile-photo.jpg";

const HeroScene = dynamic(() => import("@/components/three/HeroScene"), {
  ssr: false,
});

// Timed to hand off right as the StartExperience preloader clears the screen.
const REVEAL_DELAY = 3;
const REVEAL_SPRING = { type: "spring" as const, stiffness: 120, damping: 22 };

const HEADLINE = "I develop high-performance web & mobile applications.";
const ACCENT_WORD_COUNT = 2;
const headlineWords = HEADLINE.split(" ");
const accentStartIndex = headlineWords.length - ACCENT_WORD_COUNT;

let letterCursor = 0;
const wordStartIndices = headlineWords.map((word) => {
  const start = letterCursor;
  letterCursor += word.length + 1;
  return start;
});

const techStack = ["React Native", "Next.js", "TypeScript", "SEO"];

const wordVariants = {
  hidden: { opacity: 0, y: 24, filter: "blur(6px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)" },
};

const HOVER_PALETTE = [
  "#2dd4bf",
  "#38bdf8",
  "#60a5fa",
  "#fb923c",
  "#f87171",
  "#f472b6",
  "#a78bfa",
  "#818cf8",
];

const SCRAMBLE_STEPS = 5;
const SCRAMBLE_INTERVAL = 50;
const HOLD_DURATION = 650;

const hexToRgb = (hex: string): [number, number, number] => {
  const clean = hex.trim().replace("#", "");
  const full = clean.length === 3 ? clean.split("").map((c) => c + c).join("") : clean;
  const n = parseInt(full, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
};

const rgbToHex = (r: number, g: number, b: number) =>
  `#${[r, g, b].map((v) => Math.round(v).toString(16).padStart(2, "0")).join("")}`;

const mixHex = (a: string, b: string, t: number) => {
  const [r1, g1, b1] = hexToRgb(a);
  const [r2, g2, b2] = hexToRgb(b);
  return rgbToHex(r1 + (r2 - r1) * t, g1 + (g2 - g1) * t, b1 + (b2 - b1) * t);
};

const readCssColor = (name: string, fallback: string) => {
  if (typeof window === "undefined") return fallback;
  const value = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  return value.startsWith("#") ? value : fallback;
};

const gradientColorAt = (progress: number) => {
  const stops = [
    readCssColor("--color-primary-strong", "#cfe4d1"),
    readCssColor("--color-secondary", "#2a835f"),
    readCssColor("--color-accent", "#12544f"),
  ];
  const clamped = Math.min(1, Math.max(0, progress));
  const segment = 1 / (stops.length - 1);
  const index = Math.min(stops.length - 2, Math.floor(clamped / segment));
  const localT = (clamped - index * segment) / segment;
  return mixHex(stops[index], stops[index + 1], localT);
};

function HoverLetter({ char, progress }: { char: string; progress: number }) {
  const [color, setColor] = useState<string | null>(null);
  const [fading, setFading] = useState(false);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearTimers = () => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
  };

  useEffect(() => clearTimers, []);

  if (char.trim() === "") {
    return <span>{char}</span>;
  }

  const handleEnter = () => {
    clearTimers();
    setFading(false);
    const finalColor = gradientColorAt(progress);
    for (let step = 0; step < SCRAMBLE_STEPS; step++) {
      const timer = setTimeout(() => {
        const isLastStep = step === SCRAMBLE_STEPS - 1;
        setColor(isLastStep ? finalColor : HOVER_PALETTE[Math.floor(Math.random() * HOVER_PALETTE.length)]);
      }, step * SCRAMBLE_INTERVAL);
      timersRef.current.push(timer);
    }
  };

  const handleLeave = () => {
    clearTimers();
    const timer = setTimeout(() => {
      setFading(true);
      setColor(null);
    }, HOLD_DURATION);
    timersRef.current.push(timer);
  };

  return (
    <span
      className="hero-headline-letter"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      style={{
        transitionDuration: fading ? "1100ms" : "140ms",
        ...(color ? { color, WebkitTextFillColor: color } : undefined),
      }}
    >
      {char}
    </span>
  );
}

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
      className="relative flex min-h-[100svh] items-center overflow-hidden"
    >
      <div className="absolute inset-0 opacity-50 md:opacity-60 lg:opacity-70">
        <HeroScene />
      </div>

      <div className="atmosphere" />
      <div className="terrain-grid absolute inset-0 opacity-[0.06]" />

      <div className="pointer-events-none absolute left-1/2 top-[10%] h-[18rem] w-[18rem] -translate-x-1/2 rounded-full bg-[rgba(139,187,146,0.14)] blur-[90px] sm:h-[28rem] sm:w-[28rem] lg:h-[34rem] lg:w-[34rem] lg:blur-[120px]" />

      <div className="absolute inset-x-0 bottom-0 h-56 bg-[var(--hero-bottom-fade)]" />

      <div className="relative z-10 grid w-full gap-12 px-5 pb-24 pt-28 sm:px-8 sm:pt-32 md:grid-cols-[minmax(0,1.15fr)_minmax(18rem,0.85fr)] md:items-center md:gap-10 md:pb-28 lg:grid-cols-[minmax(0,1.5fr)_minmax(21rem,0.5fr)] lg:gap-16 lg:px-12 lg:pt-32 xl:px-16 2xl:px-24">
        {/* LEFT: hierarchy */}
        <div className="flex max-w-2xl flex-col items-start gap-5 sm:gap-6 md:max-w-none">
          <motion.span
            {...rise(REVEAL_DELAY, 14)}
            className="inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-[0.32em] text-primary"
          >
            <span className="h-1 w-4 rounded-full bg-primary" />
            Software developer
          </motion.span>

          <h1 className="hero-title text-text">
            <span className="sr-only">{HEADLINE}</span>
            <span aria-hidden="true">
              {headlineWords.map((word, i) => (
                <motion.span
                  key={`${word}-${i}`}
                  className={`inline-block mr-[0.28em] ${i >= accentStartIndex ? "gradient-text" : ""}`}
                  variants={shouldReduceMotion ? undefined : wordVariants}
                  initial={shouldReduceMotion ? false : "hidden"}
                  animate={shouldReduceMotion ? undefined : "visible"}
                  transition={{ ...REVEAL_SPRING, delay: REVEAL_DELAY + 0.15 + i * 0.06 }}
                  style={{ willChange: "transform, opacity, filter" }}
                >
                  {Array.from(word).map((char, ci) => (
                    <HoverLetter
                      key={ci}
                      char={char}
                      progress={(wordStartIndices[i] + ci) / (HEADLINE.length - 1)}
                    />
                  ))}
                </motion.span>
              ))}
            </span>
          </h1>

          <motion.p
            {...rise(REVEAL_DELAY + 0.45)}
            className="text-body-lg max-w-xxl text-text-muted"
          >
            I build with <span className="font-bold">React Native, Next.js & React.js, SEO, backed by Firebase, analytics, and production deployments.</span>
          </motion.p>

          <motion.div
            {...rise(REVEAL_DELAY + 0.55)}
            className="flex flex-wrap items-center gap-3 pt-1 sm:gap-4"
          >
            <SpecularButton
              size="sm"
              radius={999}
              onClick={() => scrollToHash("projects")}
              className="hero-cta-button"
              tintOpacity={0}
              textColor="var(--color-text)"
              lineColor="#ffffff"
              baseColor="#3f5a4a"
              proximity={200}
            >
              Explore work
            </SpecularButton>
            <SpecularButton
              size="sm"
              radius={999}
              onClick={() => scrollToHash("contact")}
              className="hero-cta-button"
              tintOpacity={0}
              textColor="var(--color-text)"
              lineColor="#ffffff"
              baseColor="#3f5a4a"
              proximity={200}
            >
              Discuss a build
            </SpecularButton>
          </motion.div>

          <motion.div
            {...rise(REVEAL_DELAY + 0.65, 12)}
            className="inline-flex items-center gap-2 pt-1 font-mono text-[11px] uppercase tracking-[0.24em] text-text-muted"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-secondary opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-secondary" />
            </span>
            Available for builds
          </motion.div>
        </div>

        {/* RIGHT: portrait + supporting visual */}
        <motion.div
          {...rise(REVEAL_DELAY + 0.35, 26)}
          className="flex w-full flex-col items-center gap-5 md:items-end md:pr-1 lg:pr-3 xl:pr-4"
        >
          <div className="hero-portrait-frame">
            <ProfileCard
              avatarUrl={profilePhoto.src}
              miniAvatarUrl={profilePhoto.src}
              name="Sohail Patel"
              title="Software Developer"
              handle="sohailpatel"
              status="Available"
              contactText="Contact"
              behindGlowEnabled
              behindGlowColor="rgba(139,187,146,0.5)"
              behindGlowSize="48%"
              innerGradient="linear-gradient(145deg,rgba(6,16,27,0.96) 0%,rgba(13,30,45,0.88) 62%,rgba(18,44,52,0.78) 100%)"
              className="hero-profile-card"
            />
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 md:justify-end">
            {techStack.map((tech) => (
              <span key={tech} className="hero-tech-chip">
                {tech}
              </span>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-5 left-1/2 z-20 hidden -translate-x-1/2 sm:block lg:bottom-8">
        <motion.div
          animate={shouldReduceMotion ? { y: 0 } : { y: [0, 9, 0] }}
          transition={shouldReduceMotion ? undefined : { duration: 1.8, repeat: Infinity }}
          className="flex flex-col items-center gap-3"
        >
          <span className="text-sm font-mono uppercase tracking-[0.3em] text-[var(--color-text-muted)]">
            Scroll the climb
          </span>
          <div className="flex h-10 w-6 justify-center rounded-full border border-[var(--surface-border)] pt-2">
            <span className="h-2 w-1 rounded-full bg-[var(--color-primary)]" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
