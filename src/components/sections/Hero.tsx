"use client";

import dynamic from "next/dynamic";
import { motion, useScroll, useTransform, type Variants } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const HeroScene = dynamic(
    () => import("@/components/three/HeroScene"),
    { ssr: false }
);

const words = ["create", "innovate", "engineer", "build", "craft"];

function TypewriterWord() {
    const [index, setIndex] = useState(0);
    const [displayed, setDisplayed] = useState("");
    const [deleting, setDeleting] = useState(false);
    const [pause, setPause] = useState(false);

    useEffect(() => {
        if (pause) return;
        const word = words[index % words.length];
        const speed = deleting ? 55 : 100;
        const timeout = setTimeout(() => {
            if (!deleting) {
                setDisplayed(word.slice(0, displayed.length + 1));
                if (displayed.length + 1 === word.length) {
                    setPause(true);
                    setTimeout(() => { setPause(false); setDeleting(true); }, 1800);
                }
            } else {
                setDisplayed(word.slice(0, displayed.length - 1));
                if (displayed.length - 1 === 0) { setDeleting(false); setIndex(i => i + 1); }
            }
        }, speed);
        return () => clearTimeout(timeout);
    }, [displayed, deleting, index, pause]);

    return (
        <span className="text-[var(--color-secondary)]">
            {displayed}
            <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                className="inline-block w-0.5 h-[0.8em] bg-[var(--color-secondary)] ml-1 align-middle"
            />
        </span>
    );
}

export default function Hero() {
    const ref = useRef<HTMLDivElement>(null!);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"],
    });

    // Content fade and drift upward
    const y = useTransform(scrollYProgress, [0, 1], [0, 150]);
    const opacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
    
    // Scale down effect for the main container
    const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.85]);

    // Parallax for the particle background (slower than content)
    const particleY = useTransform(scrollYProgress, [0, 1], [0, 50]);

    const container: Variants = {
        hidden: {},
        visible: { transition: { staggerChildren: 0.16, delayChildren: 0.2 } },
    };
    const itemUp: Variants = {
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 70, damping: 18 } },
    };

    return (
        <section id="hero" ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden">
            {/* Particle background with parallax */}
            <motion.div style={{ y: particleY }} className="absolute inset-0 pointer-events-none">
                <HeroScene />
            </motion.div>

            {/* Radial gradient glow behind text */}
            <div className="absolute inset-0 z-[1] pointer-events-none">
                <motion.div 
                    style={{ scale }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full bg-[var(--color-primary)] opacity-[0.07] blur-[120px]" 
                />
            </div>

            {/* Content Container */}
            <motion.div
                style={{ y, opacity, scale }}
                className="relative z-10 max-w-4xl mx-auto px-6 text-center transform-gpu"
            >
                <motion.div variants={container} initial="hidden" animate="visible" className="space-y-6">
                    {/* Available badge */}
                    <motion.div variants={itemUp} className="flex justify-center">
                        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[rgba(108,99,255,0.1)] border border-[rgba(108,99,255,0.3)] text-sm text-[var(--color-text-muted)]">
                            <motion.span
                                animate={{ scale: [1, 1.5, 1] }}
                                transition={{ duration: 2, repeat: Infinity }}
                                className="w-2 h-2 rounded-full bg-emerald-400 inline-block"
                            />
                            Available for work
                        </span>
                    </motion.div>

                    {/* Heading */}
                    <motion.h1
                        variants={itemUp}
                        className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-tight"
                    >
                        <span className="text-white">Hi, I&apos;m </span>
                        <span className="gradient-text">Sohail</span>
                    </motion.h1>

                    {/* Typewriter subline */}
                    <motion.p
                        variants={itemUp}
                        className="text-xl md:text-2xl text-[var(--color-text-muted)] max-w-xl mx-auto leading-relaxed"
                    >
                        Code, <TypewriterWord /> — every single day.
                    </motion.p>

                    {/* CTA Buttons */}
                    <motion.div
                        variants={itemUp}
                        className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2"
                    >
                        <motion.a
                            href="#projects"
                            whileHover={{ scale: 1.05, boxShadow: "0 0 28px rgba(108,99,255,0.45)" }}
                            whileTap={{ scale: 0.97 }}
                            className="px-8 py-3.5 rounded-full bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] text-white font-semibold text-base flex items-center gap-2 transition-all"
                        >
                            View Projects
                            <motion.svg
                                animate={{ x: [0, 4, 0] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                                className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </motion.svg>
                        </motion.a>

                        <motion.a
                            href="#contact"
                            whileHover={{ scale: 1.05, backgroundColor: "rgba(108,99,255,0.08)" }}
                            whileTap={{ scale: 0.97 }}
                            className="px-8 py-3.5 rounded-full border border-[rgba(255,255,255,0.12)] text-white font-semibold text-base hover:border-[var(--color-primary)] transition-all"
                        >
                            Contact Me
                        </motion.a>
                    </motion.div>

                    {/* Social links */}
                    <motion.div variants={itemUp} className="flex items-center justify-center gap-4 pt-2">
                        {[
                            { label: "GitHub", href: "https://github.com/sohail005", icon: "M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" },
                        ].map(link => (
                            <motion.a
                                key={link.label}
                                href={link.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.15, y: -2 }}
                                className="w-10 h-10 rounded-full bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] flex items-center justify-center text-[var(--color-text-muted)] hover:text-white hover:border-[var(--color-primary)] transition-all"
                                aria-label={link.label}
                            >
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d={link.icon} /></svg>
                            </motion.a>
                        ))}
                    </motion.div>
                </motion.div>
            </motion.div>

            {/* Scroll indicator */}
            <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
            >
                <span className="text-[9px] font-mono tracking-[0.25em] text-[var(--color-text-muted)] uppercase">Scroll</span>
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 1.6, repeat: Infinity }}
                    className="w-5 h-8 rounded-full border-2 border-[rgba(255,255,255,0.15)] flex items-start justify-center pt-1.5"
                >
                    <div className="w-1 h-1 rounded-full bg-[var(--color-primary)]" />
                </motion.div>
            </motion.div>

            {/* Bottom fade */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[var(--color-background)] to-transparent z-10" />
        </section>
    );
}
