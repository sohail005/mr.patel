"use client";

import { useEffect, useRef, useState, type ComponentType } from "react";
import type { LottieHandle, LottieProps } from "lottie-react";

type LottiePlayer = ComponentType<LottieProps>;

export default function MobileAppShowcase() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const lottieRef = useRef<LottieHandle | null>(null);
  const [LottiePlayer, setLottiePlayer] = useState<LottiePlayer | null>(null);
  const [animationData, setAnimationData] = useState<object | null>(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [active, setActive] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncMotionPreference = () => setReduceMotion(mediaQuery.matches);

    syncMotionPreference();
    mediaQuery.addEventListener("change", syncMotionPreference);
    return () => mediaQuery.removeEventListener("change", syncMotionPreference);
  }, []);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const visible = entry.isIntersecting;

        setActive(visible);
        if (visible) setShouldLoad(true);
      },
      { rootMargin: "600px 0px", threshold: 0.12 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!shouldLoad || LottiePlayer || animationData) return;

    let cancelled = false;

    Promise.all([
      import("lottie-react"),
      import("@/Assets/Mobile_App_Showcase.json"),
    ]).then(([lottieModule, animationModule]) => {
      if (cancelled) return;

      setLottiePlayer(() => lottieModule.Lottie);
      setAnimationData(animationModule.default);
    });

    return () => {
      cancelled = true;
    };
  }, [LottiePlayer, animationData, shouldLoad]);

  useEffect(() => {
    const animation = lottieRef.current;
    if (!animation) return;

    if (active && !reduceMotion) {
      animation.play();
      return;
    }

    animation.pause();
  }, [active, reduceMotion, LottiePlayer, animationData]);

  return (
    <section
      ref={sectionRef}
      aria-label="Mobile app showcase"
      className="relative flex h-svh w-full items-center justify-center overflow-hidden bg-background px-2 pb-2 pt-2 sm:px-4 lg:px-6"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_16%,color-mix(in_srgb,var(--color-primary)_18%,transparent),transparent_32%),radial-gradient(circle_at_78%_72%,color-mix(in_srgb,var(--color-secondary)_12%,transparent),transparent_28%)]" />
      <div className="terrain-grid absolute inset-0 opacity-[0.05]" />

      {LottiePlayer && animationData ? (
        <LottiePlayer
          lottieRef={lottieRef}
          src={animationData}
          autoplay={active && !reduceMotion}
          loop={!reduceMotion}
          rendererSettings={{
            preserveAspectRatio: "xMidYMid meet",
            progressiveLoad: true,
            contentVisibility: "auto",
          }}
          subscriptions={{
            ready: () => {
              if (active && !reduceMotion) {
                lottieRef.current?.play();
              }
            },
          }}
          speed={0.85}
          className="relative z-10 h-[calc(100svh-1rem)] w-[150vw] max-w-none scale-[1.42] transform-gpu sm:w-[140vw] sm:scale-[1.38] lg:h-[158svh] lg:w-[130vw] lg:scale-[1.54]"
        />
      ) : (
        <div className="relative z-10 h-[calc(100svh-1rem)] w-full" />
      )}
    </section>
  );
}
