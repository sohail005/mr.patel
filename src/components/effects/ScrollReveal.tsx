"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type Variants } from "framer-motion";

type ScrollRevealMode = "scroll" | "inView";
type ScrollOffset = NonNullable<Parameters<typeof useScroll>[0]>["offset"];

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  direction?: "up" | "down" | "left" | "right" | "none";
  scale?: boolean;
  offset?: ScrollOffset;
  mode?: ScrollRevealMode;
  delay?: number;
}

const inViewVariants: Variants = {
  hidden: ({ dir, sc }: { dir: string; sc: boolean }) => ({
    opacity: 0,
    y: dir === "up" ? 24 : dir === "down" ? -24 : 0,
    x: dir === "left" ? 24 : dir === "right" ? -24 : 0,
    scale: sc ? 0.9 : 1,
    willChange: "transform, opacity",
  }),
  visible: {
    opacity: 1,
    y: 0,
    x: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 120, damping: 22 },
  },
};

export default function ScrollReveal({
  children,
  className = "",
  direction = "up",
  scale = false,
  offset = ["start 92%", "start 35%"],
  mode = "scroll",
  delay = 0,
}: ScrollRevealProps) {
  if (mode === "inView") {
    return (
      <motion.div
        className={`relative ${className}`.trim()}
        custom={{ dir: direction, sc: scale }}
        variants={inViewVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        transition={{ delay }}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <ScrollRevealProgress
      className={className}
      direction={direction}
      offset={offset}
      scale={scale}
    >
      {children}
    </ScrollRevealProgress>
  );
}

function ScrollRevealProgress({
  children,
  className,
  direction,
  offset,
  scale,
}: Required<Pick<ScrollRevealProps, "children" | "className" | "direction" | "offset" | "scale">>) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset });
  const opacity = useTransform(scrollYProgress, [0, 0.6], [0, 1]);
  const yInit = direction === "up" ? 28 : direction === "down" ? -28 : 0;
  const xInit = direction === "left" ? 28 : direction === "right" ? -28 : 0;
  const y = useTransform(scrollYProgress, [0, 0.6], [yInit, 0]);
  const x = useTransform(scrollYProgress, [0, 0.6], [xInit, 0]);
  const scaleVal = useTransform(scrollYProgress, [0, 0.6], scale ? [0.88, 1] : [1, 1]);

  return (
    <motion.div
      ref={ref}
      style={{ opacity, y, x, scale: scaleVal, willChange: "transform, opacity" }}
      className={`relative ${className}`.trim()}
    >
      {children}
    </motion.div>
  );
}
