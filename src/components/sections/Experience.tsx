"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const experiences = [
    {
        role: "React Native, React.js & Next.js Developer",
        company: "Espirits Technologies Pvt Ltd.",
        period: "Feb 2025 — Present",
        description:
            "Handling full mobile release cycles, implementing CI/CD with Fastlane, mentoring junior developers, and building scalable web/mobile solutions.",
        technologies: ["React Native", "Next.js", "Fastlane", "CI/CD"],
        color: "#6c63ff",
    },
    {
        role: "React Native Developer",
        company: "Revalsys Technologies PVT LTD.",
        period: "Dec 2021 — Feb 2025",
        description:
            "Gained experience in writing reusable, modular, and clean code. Built and deployed apps end-to-end, improving knowledge of the app release cycle. Strengthened problem-solving through handling complex bugs. Improved performance tuning, memory optimization, and bundle size reduction.",
        technologies: ["React Native", "Performance Tuning", "App Release"],
        color: "#ff6fd8",
    },
    {
        role: "React & React Native Developer",
        company: "Mufeed Products and Services Pvt Ltd.",
        period: "Feb 2022 — Nov 2023",
        description:
            "Focused on structuring scalable React Native projects, component reusability, and modular coding. Emphasized performance optimization and clean code.",
        technologies: ["React", "React Native", "Redux", "Performance tuning"],
        color: "#00d4ff",
    },
];


export default function Experience() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section
            id="experience"
            className="relative py-32 overflow-hidden"
            ref={ref}
        >
            <div className="absolute top-1/2 right-0 w-96 h-96 rounded-full bg-[var(--color-primary)] opacity-[0.03] blur-[120px]" />

            <div className="max-w-4xl mx-auto px-6">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-20"
                >
                    <p className="text-[var(--color-primary)] font-mono text-sm tracking-widest uppercase mb-4">
                        Career Path
                    </p>
                    <h2 className="section-heading">
                        Work <span className="gradient-text">experience</span>
                    </h2>
                </motion.div>

                {/* Timeline */}
                <div className="relative">
                    {/* Center line */}
                    <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[var(--color-primary)] via-[var(--color-secondary)] to-[var(--color-accent)] opacity-30" />

                    {experiences.map((exp, i) => (
                        <motion.div
                            key={exp.company}
                            initial={{ opacity: 0, x: i % 2 === 0 ? -60 : 60 }}
                            animate={isInView ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.3 + i * 0.2 }}
                            className={`relative flex items-start gap-8 mb-16 ${i % 2 === 0
                                ? "md:flex-row"
                                : "md:flex-row-reverse"
                                }`}
                        >
                            {/* Timeline dot */}
                            <div className="absolute left-6 md:left-1/2 -translate-x-1/2 z-10">
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={isInView ? { scale: 1 } : {}}
                                    transition={{ duration: 0.4, delay: 0.5 + i * 0.2 }}
                                    className="w-4 h-4 rounded-full border-2 border-[var(--color-background)]"
                                    style={{
                                        backgroundColor: exp.color,
                                        boxShadow: `0 0 15px ${exp.color}60`,
                                    }}
                                />
                            </div>

                            {/* Card */}
                            <div
                                className={`ml-16 md:ml-0 md:w-[calc(50%-2rem)] ${i % 2 !== 0 ? "md:text-right" : ""
                                    }`}
                            >
                                <div className="glass-card p-6 hover:scale-[1.02] transition-transform duration-300">
                                    {/* Period */}
                                    <span
                                        className="text-xs font-mono px-3 py-1 rounded-full inline-block mb-3"
                                        style={{
                                            color: exp.color,
                                            backgroundColor: `${exp.color}15`,
                                            border: `1px solid ${exp.color}30`,
                                        }}
                                    >
                                        {exp.period}
                                    </span>

                                    {/* Role & Company */}
                                    <h3 className="text-lg font-bold text-white mb-1">
                                        {exp.role}
                                    </h3>
                                    <p
                                        className="text-sm font-medium mb-3"
                                        style={{ color: exp.color }}
                                    >
                                        {exp.company}
                                    </p>

                                    {/* Description */}
                                    <p className="text-sm text-[var(--color-text-muted)] leading-relaxed mb-4">
                                        {exp.description}
                                    </p>

                                    {/* Technologies */}
                                    <div
                                        className={`flex flex-wrap gap-2 ${i % 2 !== 0 ? "md:justify-end" : ""
                                            }`}
                                    >
                                        {exp.technologies.map((tech) => (
                                            <span
                                                key={tech}
                                                className="px-2 py-0.5 text-xs rounded-md bg-[rgba(255,255,255,0.05)] text-[var(--color-text-muted)]"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
