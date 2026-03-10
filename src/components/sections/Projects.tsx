"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

const projects = [
    {
        title: "Figma-to-Code Pipeline",
        description:
            "A workflow automation system for streamlining infrastructure and design handovers, converting design assets into production-ready code.",
        tags: ["Workflow Automation", "Code Generation", "Infrastructure", "React"],
        color: "#6c63ff",
        image: "⚡",
        github: "https://github.com/sohail005",
        live: "#",
    },
    {
        title: "Revalsys Technologies Collaboration",
        description:
            "Collaborative development work focused on specialized software solutions, scalable architectures, and component modularity.",
        tags: ["Collaboration", "Software Solutions", "React Native"],
        color: "#00d4ff",
        image: "🤝",
        github: "https://github.com/sohail005",
        live: "#",
    },
    {
        title: "Modern Website Builder",
        description:
            "A project focused on creating intuitive tools for simplified web development and deployment, leveraging modern front-end frameworks.",
        tags: ["UI/UX", "Web Builders", "Next.js", "App Deployment"],
        color: "#ff6fd8",
        image: "🏗️",
        github: "https://github.com/sohail005",
        live: "#",
    },
];


function ProjectCard({
    project,
    index,
    isInView,
}: {
    project: (typeof projects)[0];
    index: number;
    isInView: boolean;
}) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="group relative glass-card overflow-hidden cursor-pointer"
        >
            {/* Glow effect on hover */}
            <motion.div
                animate={{
                    opacity: isHovered ? 0.15 : 0,
                }}
                className="absolute inset-0 rounded-2xl"
                style={{
                    background: `radial-gradient(600px circle at center, ${project.color}, transparent)`,
                }}
            />

            {/* Top colored bar */}
            <div
                className="h-1 w-full"
                style={{
                    background: `linear-gradient(90deg, ${project.color}, ${project.color}66)`,
                }}
            />

            <div className="relative p-8">
                {/* Icon and Links */}
                <div className="flex items-start justify-between mb-6">
                    <motion.div
                        animate={{ rotate: isHovered ? 360 : 0, scale: isHovered ? 1.1 : 1 }}
                        transition={{ duration: 0.6 }}
                        className="text-5xl"
                    >
                        {project.image}
                    </motion.div>

                    <div className="flex gap-3">
                        <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-10 h-10 rounded-full bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] flex items-center justify-center text-[var(--color-text-muted)] hover:text-white hover:border-[var(--color-primary)] transition-all"
                        >
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                            </svg>
                        </a>
                        <a
                            href={project.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-10 h-10 rounded-full bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] flex items-center justify-center text-[var(--color-text-muted)] hover:text-white hover:border-[var(--color-secondary)] transition-all"
                        >
                            <svg
                                className="w-4 h-4"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                />
                            </svg>
                        </a>
                    </div>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text"
                    style={{
                        backgroundImage: isHovered ? `linear-gradient(135deg, ${project.color}, white)` : undefined,
                        WebkitBackgroundClip: isHovered ? "text" : undefined,
                        WebkitTextFillColor: isHovered ? "transparent" : undefined,
                    }}
                >
                    {project.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-[var(--color-text-muted)] leading-relaxed mb-6">
                    {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                        <span
                            key={tag}
                            className="px-3 py-1 text-xs rounded-full border transition-colors duration-300"
                            style={{
                                borderColor: `${project.color}33`,
                                color: project.color,
                                backgroundColor: `${project.color}0a`,
                            }}
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
        </motion.div>
    );
}

export default function Projects() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section id="projects" className="relative py-32 overflow-hidden" ref={ref}>
            <div className="absolute top-1/3 left-1/4 w-80 h-80 rounded-full bg-[var(--color-secondary)] opacity-[0.02] blur-[100px]" />

            <div className="max-w-7xl mx-auto px-6">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-20"
                >
                    <p className="text-[var(--color-primary)] font-mono text-sm tracking-widest uppercase mb-4">
                        Featured Work
                    </p>
                    <h2 className="section-heading">
                        Things I&apos;ve <span className="gradient-text">built</span>
                    </h2>
                </motion.div>

                {/* Project Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.map((project, i) => (
                        <ProjectCard
                            key={project.title}
                            project={project}
                            index={i}
                            isInView={isInView}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
