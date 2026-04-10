"use client";

import { useRef, RefObject } from "react";
import { useScroll, useTransform, useSpring, MotionValue } from "framer-motion";

/**
 * Reusable parallax hook.
 * Returns a `y` MotionValue that shifts by `distance` pixels
 * as the element scrolls through the viewport.
 *
 * @example
 *   const y = useParallax(ref, 60); // moves up 60px as section scrolls past
 */
export function useParallax(
  ref: RefObject<HTMLElement>,
  distance: number,
  offset: [string, string] = ["start end", "end start"]
): MotionValue<number> {
  const { scrollYProgress } = useScroll({ target: ref, offset: offset as any });
  return useTransform(scrollYProgress, [0, 1], [-distance, distance]);
}

/**
 * Parallax with spring — smoother feel for foreground elements.
 */
export function useParallaxSpring(
  ref: RefObject<HTMLElement>,
  distance: number
): MotionValue<number> {
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"] as any,
  });
  const raw = useTransform(scrollYProgress, [0, 1], [-distance, distance]);
  return useSpring(raw, { stiffness: 60, damping: 18 });
}
