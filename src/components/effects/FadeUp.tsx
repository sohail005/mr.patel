"use client";

import { motion, type Variants } from "framer-motion";
import { useRef } from "react";

interface FadeUpProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  /** y distance to travel, default 28px */
  distance?: number;
  /** Only animate once when entering viewport */
  once?: boolean;
}

const variants: Variants = {
  hidden: (distance: number) => ({ opacity: 0, y: distance, willChange: "transform, opacity" }),
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 70, damping: 18 },
  },
};

/**
 * Lightweight `whileInView` fade-up wrapper.
 * Use for simple one-off elements that don't need scroll-progress tracking.
 *
 * @example
 *   <FadeUp delay={0.2}>
 *     <p>Hello</p>
 *   </FadeUp>
 */
export default function FadeUp({
  children,
  className = "",
  delay = 0,
  duration = 0.6,
  distance = 28,
  once = true,
}: FadeUpProps) {
  return (
    <motion.div
      className={className}
      custom={distance}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-60px" }}
      transition={{ delay, duration }}
    >
      {children}
    </motion.div>
  );
}
