"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import dynamic from "next/dynamic";

const SkillsSphere = dynamic(
    () => import("@/components/three/SkillsSphere"),
    { ssr: false }
);

const skillCategories = [
    {
        title: "Frontend & Mobile",
        color: "#6c63ff",
        skills: [
            { name: "React / React Native", level: 95 },
            { name: "Next.js", level: 90 },
            { name: "Tailwind CSS", level: 92 },
            { name: "Redux / Context API", level: 85 },
            { name: "TypeScript", level: 90 },
        ],
    },
    {
        title: "Animations & UX",
        color: "#00d4ff",
        skills: [
            { name: "Reanimated", level: 90 },
            { name: "Gesture Handler", level: 88 },
            { name: "Framer Motion", level: 85 },
            { name: "GSAP", level: 80 },
            { name: "Performance Tuning", level: 85 },
        ],
    },
    {
        title: "DevOps & Publishing",
        color: "#ff6fd8",
        skills: [
            { name: "Git / GitHub Actions", level: 95 },
            { name: "Fastlane", level: 92 },
            { name: "CI/CD Pipelines", level: 88 },
            { name: "App Store Publishing", level: 90 },
            { name: "Play Store Publishing", level: 90 },
        ],
    },
];

function SkillBar({
    name,
    level,
    color,
    delay,
    isInView,
}: {
    name: string;
    level: number;
    color: string;
    delay: number;
    isInView: boolean;
}) {
    return (
        <div className="space-y-2">
            <div className="flex justify-between items-center">
                <span className="text-sm text-[var(--color-text-muted)]">{name}</span>
                <span className="text-xs font-mono text-[var(--color-text-muted)]">
                    {level}%
                </span>
            </div>
            <div className="h-1.5 rounded-full bg-[rgba(255,255,255,0.05)] overflow-hidden">
                <motion.div
                    initial={{ width: 0 }}
                    animate={isInView ? { width: `${level}%` } : {}}
                    transition={{ duration: 1.2, delay, ease: "easeOut" }}
                    className="h-full rounded-full"
                    style={{
                        background: `linear-gradient(90deg, ${color}, ${color}88)`,
                        boxShadow: `0 0 10px ${color}40`,
                    }}
                />
            </div>
        </div>
    );
}

export default function Skills() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section id="skills" className="relative py-12 overflow-hidden" ref={ref}>
            <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-[var(--color-accent)] opacity-[0.03] blur-[120px]" />

            <div className="max-w-7xl mx-auto px-6">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-20"
                >
                    <p className="text-[var(--color-primary)] font-mono text-sm tracking-widest uppercase mb-4">
                        Skills & Expertise
                    </p>
                    <h2 className="section-heading">
                        My <span className="gradient-text">tech stack</span>
                    </h2>
                </motion.div>

                <div className="max-w-6xl mx-auto space-y-32">
                    {/* First Zig-Zag: SkillsSphere (Left) and Frontend Skills (Right) */}
                    <div className=" gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={isInView ? { opacity: 1, scale: 1 } : {}}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            className="relative w-full rounded-2xl overflow-hidden"
                        >
                            <SkillsSphere />
                        </motion.div>
                       <div className="grid lg:grid-cols-3 gap-16">
                        <div className="space-y-10 w-full">
                            {skillCategories.slice(1, 2).map((category) => (
                                <motion.div
                                    key={category.title}
                                    initial={{ opacity: 0, x: -40 }}
                                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                                    transition={{ duration: 0.6, delay: 0.3 }}
                                >
                                    <div className="flex items-center gap-3 mb-5">
                                        <div
                                            className="w-3 h-3 rounded-full"
                                            style={{ backgroundColor: category.color }}
                                        />
                                        <h3 className="text-xl font-semibold text-white">
                                            {category.title}
                                        </h3>
                                    </div>
                                    <div className="space-y-6">
                                        {category.skills.map((skill, skillIdx) => (
                                            <SkillBar
                                                key={skill.name}
                                                name={skill.name}
                                                level={skill.level}
                                                color={category.color}
                                                delay={0.5 + skillIdx * 0.1}
                                                isInView={isInView}
                                            />
                                        ))}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                        <div className="space-y-10 w-full">
                            {skillCategories.slice(2, 3).map((category) => (
                                <motion.div
                                    key={category.title}
                                    initial={{ opacity: 0, x: 40 }}
                                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                                    transition={{ duration: 0.6, delay: 0.3 }}
                                >
                                    <div className="flex items-center gap-3 mb-5">
                                        <div
                                            className="w-3 h-3 rounded-full"
                                            style={{ backgroundColor: category.color }}
                                        />
                                        <h3 className="text-xl font-semibold text-white">
                                            {category.title}
                                        </h3>
                                    </div>
                                    <div className="space-y-6">
                                        {category.skills.map((skill, skillIdx) => (
                                            <SkillBar
                                                key={skill.name}
                                                name={skill.name}
                                                level={skill.level}
                                                color={category.color}
                                                delay={0.5 + skillIdx * 0.1}
                                                isInView={isInView}
                                            />
                                        ))}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                         <div className="space-y-10 w-full">
                            {skillCategories.slice(0, 1).map((category, catIdx) => (
                                <motion.div
                                    key={category.title}
                                    initial={{ opacity: 0, x: 40 }}
                                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                                    transition={{ duration: 0.6, delay: 0.3 }}
                                >
                                    <div className="flex items-center gap-3 mb-5">
                                        <div
                                            className="w-3 h-3 rounded-full"
                                            style={{ backgroundColor: category.color }}
                                        />
                                        <h3 className="text-xl font-semibold text-white">
                                            {category.title}
                                        </h3>
                                    </div>
                                    <div className="space-y-6">
                                        {category.skills.map((skill, skillIdx) => (
                                            <SkillBar
                                                key={skill.name}
                                                name={skill.name}
                                                level={skill.level}
                                                color={category.color}
                                                delay={0.5 + skillIdx * 0.1}
                                                isInView={isInView}
                                            />
                                        ))}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                    </div>

                    
                </div>
            </div>
        </section>
    );
}
