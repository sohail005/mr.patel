"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface ScrollRevealProps {
    children: React.ReactNode;
    className?: string;
    direction?: "up" | "down" | "left" | "right" | "none";
    scale?: boolean;
    offset?: any;
}

export default function ScrollReveal({
    children,
    className = "",
    direction = "up",
    scale = false,
    offset = ["start 92%", "start 35%"],
}: ScrollRevealProps) {
    const ref = useRef<HTMLDivElement>(null!);
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
