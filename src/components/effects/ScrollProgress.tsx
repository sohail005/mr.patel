"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";

export default function ScrollProgress() {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001,
    });

    // Pre-compute the left position as a motion value (no hooks inside JSX)
    const dotLeft = useTransform(scaleX, (v: number) => `calc(${v * 100}% - 6px)`);

    return (
        <>
            {/* Main progress bar */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-[3px] z-[9999] origin-left"
                style={{
                    scaleX,
                    background:
                        "linear-gradient(90deg, var(--color-primary-accent), var(--color-secondary-accent))",
                    boxShadow:
                        "0 0 12px color-mix(in srgb, var(--color-primary-accent) 70%, transparent), 0 0 28px color-mix(in srgb, var(--color-secondary-accent) 40%, transparent)",
                }}
            />
            {/* Glowing dot at the leading tip */}
            <motion.div
                className="fixed top-0 z-[9999] h-3 w-3 rounded-full"
                style={{
                    left: dotLeft,
                    marginTop: "-3px",
                    background: "var(--color-secondary-accent)",
                    boxShadow:
                        "0 0 10px var(--color-secondary-accent), 0 0 20px var(--color-primary-accent)",
                    opacity: scaleX,
                }}
            />
        </>
    );
}
