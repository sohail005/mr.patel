"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";

interface GlitchTextProps {
    text: string;
    className?: string;
    as?: "h1" | "h2" | "h3" | "p" | "span";
    delay?: number;
    triggerOnView?: boolean;
}

const GLITCH_CHARS = "!<>-_\\/[]{}—=+*^?#@$%&";

function scramble(original: string, progress: number): string {
    return original
        .split("")
        .map((char, i) => {
            if (char === " ") return " ";
            if (i < original.length * progress) return char;
            return GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
        })
        .join("");
}

export default function GlitchText({
    text,
    className = "",
    as: Tag = "span",
    delay = 0,
    triggerOnView = true,
}: GlitchTextProps) {
    const ref = useRef<HTMLElement>(null!);
    const isInView = useInView(ref as React.RefObject<Element>, { once: true, margin: "-80px" });
    const [displayText, setDisplayText] = useState(triggerOnView ? text.replace(/[^ ]/g, "_") : text);
    const [hasPlayed, setHasPlayed] = useState(false);

    const shouldRun = triggerOnView ? isInView : true;

    useEffect(() => {
        if (!shouldRun || hasPlayed) return;

        let frame: ReturnType<typeof requestAnimationFrame>;
        let start: number | null = null;
        const duration = 900;
        const delayMs = delay * 1000;
        let started = false;

        const animate = (timestamp: number) => {
            if (!started) {
                if (!start) start = timestamp;
                if (timestamp - start < delayMs) {
                    frame = requestAnimationFrame(animate);
                    return;
                }
                started = true;
                start = timestamp;
            }

            const elapsed = timestamp - (start ?? timestamp);
            const progress = Math.min(elapsed / duration, 1);
            setDisplayText(scramble(text, progress));

            if (progress < 1) {
                frame = requestAnimationFrame(animate);
            } else {
                setDisplayText(text);
                setHasPlayed(true);
            }
        };

        frame = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(frame);
    }, [shouldRun, hasPlayed, text, delay]);

    return (
        <motion.span
            ref={ref as React.RefObject<HTMLSpanElement>}
            className={`inline-block font-mono ${className}`}
            initial={{ opacity: 0 }}
            animate={shouldRun ? { opacity: 1 } : {}}
            transition={{ duration: 0.3, delay }}
        >
            {displayText}
        </motion.span>
    );
}
