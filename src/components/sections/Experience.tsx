"use client";

import { motion, useInView, useScroll, useTransform } from "framer-motion";
import WordReveal from "@/components/effects/WordReveal";
import ScrollReveal from "@/components/effects/ScrollReveal";
import { useRef } from "react";

const experiences = [
    {
        role: "React Native, React.js & Next.js Developer",
        company: "Espirits Technologies Pvt Ltd.",
        period: "Feb 2025 — Present",
        description: "Handling full mobile release cycles, implementing CI/CD with Fastlane, mentoring junior developers, and building scalable web/mobile solutions.",
        technologies: ["React Native", "Next.js", "Fastlane", "CI/CD"],
        color: "#6c63ff",
        current: true,
    },
    {
        role: "React Native Developer",
        company: "Revalsys Technologies PVT LTD.",
        period: "Dec 2021 — Feb 2025",
        description: "Built and deployed apps end-to-end, improving knowledge of the app release cycle. Strengthened problem-solving through complex bugs. Improved performance tuning, memory optimization, and bundle size reduction.",
        technologies: ["React Native", "Performance Tuning", "App Release"],
        color: "#ff6fd8",
        current: false,
    },
    {
        role: "React & React Native Developer",
        company: "Mufeed Products and Services Pvt Ltd.",
        period: "Feb 2022 — Nov 2023",
        description: "Structured scalable React Native projects with emphasis on component reusability, modular coding, and performance optimization.",
        technologies: ["React", "React Native", "Redux", "Performance Tuning"],
        color: "#00d4ff",
        current: false,
    },
];

export default function Experience() {
    const ref = useRef<HTMLDivElement>(null!);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start center", "end 80%"]
    });

    const blobY = useTransform(scrollYProgress, [0, 1], [-100, 100]);

    return (
        <section id="experience" className="relative py-24 overflow-hidden" ref={ref}>
            <motion.div 
                style={{ y: blobY }}
                className="absolute top-1/2 right-0 w-80 h-80 rounded-full bg-[var(--color-primary)] opacity-[0.03] blur-[100px] pointer-events-none" 
            />

            <div className="max-w-4xl mx-auto px-6 relative z-10">
                {/* Header */}
                <div className="text-center mb-16">
                    <p className="text-[var(--color-primary)] font-mono text-sm tracking-widest uppercase mb-3">Career Path</p>
                    <h2 className="section-heading text-4xl md:text-5xl font-bold">
                        <WordReveal text="Work" /> <span className="text-[var(--color-primary)]"><WordReveal text="experience" /></span>
                    </h2>
                </div>

                {/* Timeline */}
                <div className="relative">
                    {/* Vertical line - draws in based on scroll progress */}
                    <motion.div
                        style={{ scaleY: scrollYProgress, originY: 0 }}
                        className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[var(--color-primary)] via-[var(--color-secondary)] to-[var(--color-accent)] opacity-30"
                    />

                    {experiences.map((exp, i) => (
                        <ScrollReveal 
                            key={exp.company} 
                            direction={i % 2 === 0 ? "left" : "right"} 
                            offset={["start 90%", "start 45%"]}
                        >
                            <div className={`relative flex items-start gap-8 mb-14 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}>
                                {/* Timeline dot */}
                                <div className="absolute left-6 md:left-1/2 -translate-x-1/2 z-10">
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        whileInView={{ scale: 1 }}
                                        viewport={{ once: true, margin: "-100px" }}
                                        transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                                        className="relative"
                                    >
                                        {/* Pulse ring */}
                                        <motion.div
                                            animate={{ scale: [1, 2, 1], opacity: [0.4, 0, 0.4] }}
                                            transition={{ duration: 2.5, delay: i * 0.3, repeat: Infinity }}
                                            className="absolute inset-0 rounded-full"
                                            style={{ backgroundColor: exp.color }}
                                        />
                                        <div
                                            className="relative w-4 h-4 rounded-full border-2 border-[var(--color-background)]"
                                            style={{
                                                backgroundColor: exp.color,
                                                boxShadow: `0 0 12px ${exp.color}80`,
                                            }}
                                        />
                                    </motion.div>
                                </div>

                                {/* Card */}
                                <div className={`ml-16 md:ml-0 md:w-[calc(50%-2rem)] ${i % 2 !== 0 ? "md:text-right" : ""}`}>
                                    <div className="glass-card p-6 group hover:-translate-y-1 transition-transform duration-300">
                                    {/* Period */}
                                    <div className={`flex mb-3 ${i % 2 !== 0 ? "md:justify-end" : ""}`}>
                                        <span
                                            className="text-xs font-mono px-3 py-1 rounded-full inline-flex items-center gap-1.5"
                                            style={{ color: exp.color, backgroundColor: `${exp.color}12`, border: `1px solid ${exp.color}30` }}
                                        >
                                            {exp.current && (
                                                <motion.span
                                                    animate={{ scale: [1, 1.4, 1] }}
                                                    transition={{ duration: 1.5, repeat: Infinity }}
                                                    className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block"
                                                />
                                            )}
                                            {exp.period}
                                        </span>
                                    </div>

                                    <h3 className="text-base font-bold text-white mb-1 leading-snug">{exp.role}</h3>
                                    <p className="text-sm font-medium mb-3" style={{ color: exp.color }}>{exp.company}</p>
                                    <p className="text-sm text-[var(--color-text-muted)] leading-relaxed mb-4">{exp.description}</p>

                                    <div className={`flex flex-wrap gap-2 ${i % 2 !== 0 ? "md:justify-end" : ""}`}>
                                        {exp.technologies.map(tech => (
                                            <span
                                                key={tech}
                                                className="px-2.5 py-0.5 text-xs rounded-md bg-[rgba(255,255,255,0.05)] text-[var(--color-text-muted)] border border-[rgba(255,255,255,0.07)]"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                    </div>
                                </div>
                            </div>
                        </ScrollReveal>
                    ))}
                </div>
            </div>
        </section>
    );
}
