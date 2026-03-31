"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";

// ─── RevealWord must be defined OUTSIDE the parent to avoid hooks-in-loop ───
function RevealWord({
    word,
    progress,
    i,
    total,
}: {
    word: string;
    progress: MotionValue<number>;
    i: number;
    total: number;
}) {
    const start = (i / total) * 0.65;
    const end = Math.min(start + Math.max(0.28, 0.6 / total), 1);
    const opacity = useTransform(progress, [start, end], [0, 1]);
    const y = useTransform(progress, [start, end], [18, 0]);

    return (
        <motion.span
            style={{
                opacity,
                y,
                display: "inline-block",
                marginRight: "0.28em",
                willChange: "transform, opacity",
            }}
            aria-hidden="true"
        >
            {word}
        </motion.span>
    );
}

interface WordRevealProps {
    text: string;
    className?: string;
    offset?: any; // Bypassing Framer Motion's strict tuple type
}

export default function WordReveal({
    text,
    className = "",
    offset = ["start 88%", "start 18%"],
}: WordRevealProps) {
    const ref = useRef<HTMLSpanElement>(null!);
    const { scrollYProgress } = useScroll({ target: ref, offset });
    const words = text.split(" ");

    return (
        <span ref={ref} className={className} aria-label={text}>
            {words.map((word, i) => (
                <RevealWord
                    key={`${word}-${i}`}
                    word={word}
                    progress={scrollYProgress}
                    i={i}
                    total={words.length}
                />
            ))}
        </span>
    );
}
