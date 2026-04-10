"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type Variants } from "framer-motion";

type ScrollRevealMode = "scroll" | "inView";

interface ScrollRevealProps {
    children: React.ReactNode;
    className?: string;
    direction?: "up" | "down" | "left" | "right" | "none";
    scale?: boolean;
    offset?: any;
    /** "scroll" = scroll-progress (default), "inView" = whileInView once */
    mode?: ScrollRevealMode;
    /** Delay for inView mode */
    delay?: number;
}

const inViewVariants: Variants = {
    hidden: ({ dir, sc }: { dir: string; sc: boolean }) => ({
        opacity: 0,
        y: dir === "up" ? 40 : dir === "down" ? -40 : 0,
        x: dir === "left" ? 60 : dir === "right" ? -60 : 0,
        scale: sc ? 0.9 : 1,
        willChange: "transform, opacity",
    }),
    visible: {
        opacity: 1, y: 0, x: 0, scale: 1,
        transition: { type: "spring", stiffness: 70, damping: 18 },
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
    const ref = useRef<HTMLDivElement>(null!);

    /* ── inView mode: lightweight whileInView ── */
    if (mode === "inView") {
        return (
            <motion.div
                className={className}
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

    /* ── scroll mode: scroll-progress driven (default) ── */
    const { scrollYProgress } = useScroll({ target: ref, offset });
    const opacity = useTransform(scrollYProgress, [0, 0.6], [0, 1]);
    const yInit = direction === "up" ? 55 : direction === "down" ? -55 : 0;
    const xInit = direction === "left" ? 75 : direction === "right" ? -75 : 0;
    const y = useTransform(scrollYProgress, [0, 0.6], [yInit, 0]);
    const x = useTransform(scrollYProgress, [0, 0.6], [xInit, 0]);
    const scaleVal = useTransform(scrollYProgress, [0, 0.6], scale ? [0.88, 1] : [1, 1]);

    return (
        <motion.div
            ref={ref}
            style={{ opacity, y, x, scale: scaleVal, willChange: "transform, opacity" }}
            className={className}
        >
            {children}
        </motion.div>
    );
}
