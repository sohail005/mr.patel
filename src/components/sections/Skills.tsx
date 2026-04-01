"use client";

import { motion, useInView, useScroll, useTransform } from "framer-motion";
import WordReveal from "@/components/effects/WordReveal";
import ScrollReveal from "@/components/effects/ScrollReveal";
import { useRef } from "react";

const skillCategories = [
    {
        title: "Frontend & Mobile",
        color: "#6c63ff",
        icon: "⚡",
        skills: [
            { name: "React / React Native", level: 85 },
            { name: "Next.js", level: 80 },
            { name: "TypeScript", level: 80 },
            { name: "Tailwind CSS", level: 85 },
            { name: "Redux / Context API", level: 75 },
        ],
    },
    {
        title: "Animations & UX",
        color: "#00d4ff",
        icon: "🎬",
        skills: [
            { name: "Reanimated", level: 80 },
            { name: "Gesture Handler", level: 75 },
            { name: "Framer Motion", level: 75 },
            { name: "Performance Tuning", level: 70 },
        ],
    },
    {
        title: "DevOps & Publishing",
        color: "#ff6fd8",
        icon: "🚀",
        skills: [
            { name: "Git / GitHub Actions", level: 85 },
            { name: "CI/CD Pipelines", level: 75 },
            { name: "App Store", level: 80 },
            { name: "Play Store", level: 80 },
        ],
    },
];

// All skills as a flat list for the tag cloud
const allTags = [
    "React", "Next.js", "React Native", "TypeScript", "Tailwind CSS",
    "Redux", "Context API", "Reanimated", "Framer Motion",
    "Git", "CI/CD", "App Store", "Play Store",
    "REST APIs", "Figma", "Three.js",
    "Performance", "GitHub Actions",
];

const tagColors = ["#6c63ff", "#00d4ff", "#ff6fd8"];

function SkillBar({ name, level, color, delay, isInView }: {
    name: string; level: number; color: string; delay: number; isInView: boolean;
}) {
    return (
        <div className="space-y-1.5">
            <div className="flex justify-between items-center">
                <span className="text-sm text-[var(--color-text)]">{name}</span>
                <motion.span
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ delay: delay + 1.2 }}
                    className="text-xs font-mono"
                    style={{ color }}
                >
                    {level}%
                </motion.span>
            </div>
            <div className="h-1.5 rounded-full bg-[rgba(255,255,255,0.06)] overflow-hidden">
                <motion.div
                    initial={{ width: 0 }}
                    animate={isInView ? { width: `${level}%` } : {}}
                    transition={{ duration: 1.2, delay, ease: [0.16, 1, 0.3, 1] }}
                    className="h-full rounded-full"
                    style={{
                        background: `linear-gradient(90deg, ${color}cc, ${color})`,
                        boxShadow: `0 0 8px ${color}50`,
                    }}
                />
            </div>
        </div>
    );
}

export default function Skills() {
    const ref = useRef<HTMLDivElement>(null!);
    const isInView = useInView(ref, { once: true, margin: "-80px" });
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    const blobY1 = useTransform(scrollYProgress, [0, 1], [-60, 60]);

    return (
        <section id="skills" className="relative py-24 overflow-hidden" ref={ref}>
            <motion.div 
                style={{ y: blobY1 }}
                className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-[var(--color-accent)] opacity-[0.03] blur-[100px] pointer-events-none" 
            />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                {/* Header */}
                <div className="text-center mb-16">
                    <p className="text-[var(--color-primary)] font-mono text-sm tracking-widest uppercase mb-3">
                        Skills & Expertise
                    </p>
                    <h2 className="section-heading text-4xl md:text-5xl font-bold">
                        <WordReveal text="My" /> <span className="text-[var(--color-secondary)]"><WordReveal text="tech stack" /></span>
                    </h2>
                </div>

                {/* Tag cloud */}
                <ScrollReveal direction="up" offset={["start 90%", "start 40%"]}>
                    <div className="flex flex-wrap justify-center gap-3 mb-16">
                    {allTags.map((tag, i) => {
                        const color = tagColors[i % tagColors.length];
                        return (
                            <motion.span
                                key={tag}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                                transition={{ delay: 0.2 + i * 0.04, type: "spring", stiffness: 200, damping: 20 }}
                                whileHover={{ scale: 1.1, y: -3, transition: { duration: 0.15 } }}
                                className="px-4 py-2 rounded-full text-sm font-medium cursor-default border transition-all duration-200"
                                style={{
                                    borderColor: `${color}35`,
                                    color: color,
                                    backgroundColor: `${color}0d`,
                                }}
                            >
                                {tag}
                            </motion.span>
                        );
                    })}
                    </div>
                </ScrollReveal>

                {/* Skill category cards */}
                <div className="grid md:grid-cols-3 gap-6">
                    {skillCategories.map((category, i) => (
                        <ScrollReveal key={category.title} direction="up" scale offset={["start 90%", "start 50%"]}>
                            <div className="glass-card p-6 relative overflow-hidden group h-full hover:-translate-y-1 transition-transform duration-300">
                                {/* Top accent bar */}
                                <div
                                    className="absolute top-0 left-0 right-0 h-[2px]"
                                    style={{ background: `linear-gradient(90deg, transparent, ${category.color}, transparent)` }}
                                />

                                <div className="flex items-center gap-3 mb-6">
                                    <div
                                        className="w-9 h-9 rounded-lg flex items-center justify-center text-lg"
                                        style={{ background: `${category.color}18`, border: `1px solid ${category.color}35` }}
                                    >
                                        {category.icon}
                                    </div>
                                    <div>
                                        <div className="w-2 h-2 rounded-full inline-block mr-2 align-middle" style={{ backgroundColor: category.color }} />
                                        <span className="text-base font-semibold text-white">{category.title}</span>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    {category.skills.map((skill, si) => (
                                        <SkillBar
                                            key={skill.name}
                                            name={skill.name}
                                            level={skill.level}
                                            color={category.color}
                                            delay={si * 0.08}
                                            isInView={isInView}
                                        />
                                    ))}
                                </div>
                            </div>
                        </ScrollReveal>
                    ))}
                </div>
            </div>
        </section>
    );
}
