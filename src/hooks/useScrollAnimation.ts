"use client";

import { useRef, RefObject } from "react";
import { useScroll, useTransform, useSpring, MotionValue } from "framer-motion";

interface ScrollAnimationOptions {
  /** Input scroll progress range, default [0, 1] */
  inputRange?: [number, number];
  /** Output values [from, to] */
  outputRange: [number, number];
  /** Apply spring smoothing */
  spring?: boolean;
  /** Framer Motion offset tuple */
  offset?: [string, string];
}

/**
 * Reusable hook: maps section scroll progress → a MotionValue.
 * @example
 *   const y = useScrollAnimation(ref, { outputRange: [0, -80] });
 */
export function useScrollAnimation(
  ref: RefObject<HTMLElement>,
  options: ScrollAnimationOptions
): MotionValue<number> {
  const {
    inputRange = [0, 1],
    outputRange,
    spring: applySpring = false,
    offset = ["start end", "end start"],
  } = options;

  const { scrollYProgress } = useScroll({ target: ref, offset: offset as any });
  const value = useTransform(scrollYProgress, inputRange, outputRange);

  const springValue = useSpring(value, { stiffness: 80, damping: 20 });
  return applySpring ? springValue : value;
}

/**
 * Opacity variant of useScrollAnimation — fades element in from 0→1
 * over the first 50% of section scroll.
 */
export function useScrollOpacity(
  ref: RefObject<HTMLElement>,
  offset?: [string, string]
): MotionValue<number> {
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: (offset as any) ?? ["start end", "start 40%"],
  });
  return useTransform(scrollYProgress, [0, 0.6], [0, 1]);
}
