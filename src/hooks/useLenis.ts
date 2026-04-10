"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { useAnimationFrame } from "framer-motion";

/**
 * useLenis — initialises Lenis smooth scroll and syncs it with
 * Framer Motion's animation loop so useScroll / useTransform
 * stay perfectly in sync with inertia-based scrolling.
 *
 * Returns the Lenis instance so callers can call .scrollTo() etc.
 */
export function useLenis() {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Skip on touch devices — native momentum already feels great
    if ("ontouchstart" in window || navigator.maxTouchPoints > 0) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 0,
    });

    lenisRef.current = lenis;

    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Sync Lenis raf with Framer Motion's animation frame
  useAnimationFrame((time) => {
    lenisRef.current?.raf(time);
  });

  return lenisRef;
}
