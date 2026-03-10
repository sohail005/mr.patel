"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const stats = [
    { label: "Years Experience", value: "3+" },
    { label: "Projects Completed", value: "25+" },
    { label: "Technologies", value: "15+" },
    { label: "GitHub Repos", value: "30+" },
];

const highlights = [
    {
        icon: "🚀",
        title: "Full-Stack Development",
        description:
            "Building end-to-end applications with modern frameworks and cloud-native architectures.",
    },
    {
        icon: "🎨",
        title: "Creative Engineering",
        description:
            "Merging design and code to create visually stunning, interactive digital experiences.",
    },
    {
        icon: "📱",
        title: "Mobile & Cross-Platform",
        description:
            "Crafting native-quality apps with React Native, delivering seamless experiences on every device.",
    },
];

export default function About() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section id="about" className="relative py-12 overflow-hidden" ref={ref}>
            {/* Background accent */}
            <div className="absolute top-1/2 left-0 w-96 h-96 rounded-full bg-[var(--color-primary)] opacity-[0.03] blur-[120px]" />
            <div className="absolute top-1/4 right-0 w-72 h-72 rounded-full bg-[var(--color-secondary)] opacity-[0.03] blur-[100px]" />

            <div className="max-w-7xl mx-auto px-6">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-20"
                >
                    <p className="text-[var(--color-primary)] font-mono text-sm tracking-widest uppercase mb-4">
                        About Me
                    </p>
                    <h2 className="section-heading">
                        Turning ideas into{" "}
                        <span className="gradient-text">digital reality</span>
                    </h2>
                </motion.div>

                {/* Content Grid */}
                <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
                    {/* Left - Bio */}
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <div className="glass-card p-8 space-y-6">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)] flex items-center justify-center text-2xl">
                                    👨‍💻
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-white">Sohail Patel</h3>
                                    <p className="text-sm text-[var(--color-text-muted)]">
                                        Software Developer
                                    </p>
                                </div>
                            </div>

                            <p className="text-[var(--color-text-muted)] leading-relaxed">
                                I’m a software developer who transforms ideas into clean, scalable, and user-focused digital products. With a passion for problem-solving and modern technology, I build solutions that deliver real impact.
                            </p>

                            {/* Tech stack badges */}
                            <div className="flex flex-wrap gap-2 pt-4">
                                {[
                                    "React",
                                    "React Native",
                                    "Next.js",
                                    "TypeScript",
                                    "Tailwind CSS",
                                    "Redux",
                                    "Fastlane",
                                    "Git",
                                ].map((tech) => (
                                    <span
                                        key={tech}
                                        className="px-3 py-1 text-xs rounded-full bg-[rgba(108,99,255,0.1)] border border-[rgba(108,99,255,0.2)] text-[var(--color-primary-light)]"
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* Right - Stats */}
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="grid grid-cols-2 gap-4"
                    >
                        {stats.map((stat, i) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                                transition={{ duration: 0.5, delay: 0.5 + i * 0.1 }}
                                className="glass-card p-6 text-center group hover:scale-105 transition-transform duration-300"
                            >
                                <p className="text-4xl font-bold gradient-text mb-2">
                                    {stat.value}
                                </p>
                                <p className="text-sm text-[var(--color-text-muted)]">
                                    {stat.label}
                                </p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>

                {/* Highlights */}
                <div className="grid md:grid-cols-3 gap-6">
                    {highlights.map((item, i) => (
                        <motion.div
                            key={item.title}
                            initial={{ opacity: 0, y: 40 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.7 + i * 0.15 }}
                            className="glass-card p-8 text-center group hover:scale-[1.02] transition-all duration-300"
                        >
                            <div className="text-4xl mb-4">{item.icon}</div>
                            <h3 className="text-lg font-semibold text-white mb-3">
                                {item.title}
                            </h3>
                            <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
                                {item.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
