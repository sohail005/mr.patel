"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import ProfileCard from "@/components/effects/ProfileCard";
import profilePhoto from "@/Assets/profile-photo.jpg";

const HeroScene = dynamic(() => import("@/components/three/HeroScene"), {
  ssr: false,
});

const metrics = [
  { label: "Years shipping products", value: "5+" },
  { label: "Mobile and web releases", value: "20+" },
  { label: "Core stack coverage", value: "React Native / React / Next " },
  { label: "Delivery ownership", value: "Build / Test / Launch" },
];

export default function Hero() {
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

      <div
        className="pointer-events-none absolute left-1/2 top-[10%] h-[18rem] w-[18rem] -translate-x-1/2 rounded-full bg-[rgba(204,230,255,0.12)] blur-[90px] sm:h-[28rem] sm:w-[28rem] lg:h-[34rem] lg:w-[34rem] lg:blur-[120px]"
      />

      <div className="absolute inset-x-0 bottom-0 h-56 bg-[var(--hero-bottom-fade)]" />

      <div
        className="relative z-10 grid w-full gap-9 px-5 pb-24 pt-28 sm:px-8 sm:pt-32 md:grid-cols-[minmax(0,1.08fr)_minmax(17rem,0.92fr)] md:items-center md:gap-8 md:pb-28 lg:grid-cols-[minmax(0,1.45fr)_minmax(24rem,0.55fr)] lg:items-end lg:gap-12 lg:px-12 lg:pt-36 2xl:px-20"
      >
        <div className="max-w-4xl md:max-w-none">
          <h1 className="section-heading max-w-7xl text-balance text-[var(--color-text)]">
            I build thoughtful web and mobile experiences that solve real-world problems.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-[var(--color-text-muted)] sm:text-lg md:mt-6 md:text-xl md:leading-8">
            I build React Native and Next.js interfaces that are fast, readable,
            and steady after launch.
          </p>

          <div className="mt-8 flex flex-col gap-3 min-[420px]:flex-row md:mt-10">
            <a
              href="#projects"
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-[var(--primary-action-border)] bg-[var(--primary-action-bg)] px-6 py-3 text-center font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--primary-action-text)] sm:tracking-[0.28em]"
            >
              Explore work
            </a>
            <a
              href="#contact"
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-[var(--surface-border)] px-6 py-3 text-center font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--color-text-muted)] hover:text-[var(--color-text)] sm:tracking-[0.28em]"
            >
              Discuss a build
            </a>
          </div>
        </div>

        <div className="flex justify-center">
          <ProfileCard
            avatarUrl={profilePhoto.src}
            miniAvatarUrl={profilePhoto.src}
            name="Sohail Patel"
            title="Software Developer"
            handle="sohailpatel"
            status="Available"
            contactText="Contact"
            behindGlowEnabled
            behindGlowColor="rgba(143,199,255,0.62)"
            behindGlowSize="54%"
            innerGradient="linear-gradient(145deg,rgba(6,16,27,0.96) 0%,rgba(13,30,45,0.88) 62%,rgba(18,44,52,0.78) 100%)"
            className="hero-profile-card lg:mr-2"
          />
        </div>

        <div className="grid gap-3 min-[520px]:grid-cols-2 md:col-span-2 md:gap-4 lg:mt-2 lg:grid-cols-4">
          {metrics.map((item) => (
            <div key={item.label} className="story-card rounded-[1.25rem] p-4 sm:rounded-[1.6rem] sm:p-5">
              <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-[var(--color-text-muted)] sm:text-[10px] sm:tracking-[0.24em]">
                {item.label}
              </p>
              <p className="mt-3 text-lg font-semibold text-[var(--color-text)] sm:mt-4 sm:text-2xl">
                {item.value}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-5 left-1/2 z-20 hidden -translate-x-1/2 sm:block lg:bottom-8">
        <motion.div
          animate={{ y: [0, 9, 0] }}
          transition={{ duration: 1.8, repeat: Infinity }}
          className="flex flex-col items-center gap-3"
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--color-text-muted)]">
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
