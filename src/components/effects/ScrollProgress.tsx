"use client";

import { motion, useScroll, useSpring, useTransform, useMotionValue } from "framer-motion";
import { useEffect, useState } from "react";

export default function ScrollProgress() {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001,
    });

    // Pre-compute the left position as a motion value (no hooks inside JSX)
    const dotLeft = useTransform(scaleX, (v: number) => `calc(${v * 100}% - 6px)`);

    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    if (!mounted) return null;

    return (
        <>
            {/* Main progress bar */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-[3px] z-[9999] origin-left"
                style={{
                    scaleX,
                    background:
                        "linear-gradient(90deg, var(--color-primary), var(--color-secondary), var(--color-accent))",
                    boxShadow:
                        "0 0 12px rgba(108,99,255,0.8), 0 0 28px rgba(0,212,255,0.4)",
                }}
            />
            {/* Glowing dot at the leading tip */}
            <motion.div
                className="fixed top-0 z-[9999] h-3 w-3 rounded-full"
                style={{
                    left: dotLeft,
                    marginTop: "-3px",
                    background: "var(--color-secondary)",
                    boxShadow: "0 0 10px var(--color-secondary), 0 0 20px var(--color-primary)",
                    opacity: scaleX,
                }}
            />
        </>
    );
}
