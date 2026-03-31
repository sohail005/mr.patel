"use client";

import { motion, useInView, useMotionValue, useTransform, useSpring, useScroll, type Variants } from "framer-motion";
import WordReveal from "@/components/effects/WordReveal";
import ScrollReveal from "@/components/effects/ScrollReveal";
import { useRef, useEffect, useState } from "react";

const stats = [
    { label: "Years Experience", value: 3, suffix: "+" },
    { label: "Projects Completed", value: 25, suffix: "+" },
    { label: "Technologies", value: 15, suffix: "+" },
    { label: "GitHub Repos", value: 30, suffix: "+" },
];

const highlights = [
    { icon: "🚀", title: "Full-Stack Development", description: "Building end-to-end applications with modern frameworks and cloud-native architectures.", color: "#6c63ff" },
    { icon: "🎨", title: "Creative Engineering", description: "Merging design and code to create visually stunning, interactive digital experiences.", color: "#00d4ff" },
    { icon: "📱", title: "Mobile & Cross-Platform", description: "Crafting native-quality apps with React Native, delivering seamless experiences on every device.", color: "#ff6fd8" },
];

function CountUp({ target, suffix, isInView }: { target: number; suffix: string; isInView: boolean }) {
    const [count, setCount] = useState(0);
    const hasRun = useRef(false);
    useEffect(() => {
        if (!isInView || hasRun.current) return;
        hasRun.current = true;
        const duration = 1600;
        const start = performance.now();
        const ease = (t: number) => 1 - Math.pow(1 - t, 4);
        const tick = (now: number) => {
            const p = Math.min((now - start) / duration, 1);
            setCount(Math.round(ease(p) * target));
            if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
    }, [isInView, target]);
    return <>{count}{suffix}</>;
}

function TiltCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
    const ref = useRef<HTMLDivElement>(null!);
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const rotX = useSpring(useTransform(y, [-0.5, 0.5], [6, -6]), { stiffness: 200, damping: 25 });
    const rotY = useSpring(useTransform(x, [-0.5, 0.5], [-6, 6]), { stiffness: 200, damping: 25 });

    const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const r = ref.current.getBoundingClientRect();
        x.set((e.clientX - r.left) / r.width - 0.5);
        y.set((e.clientY - r.top) / r.height - 0.5);
    };
    const onLeave = () => { x.set(0); y.set(0); };

    return (
        <motion.div
            ref={ref}
            onMouseMove={onMove}
            onMouseLeave={onLeave}
            style={{ rotateX: rotX, rotateY: rotY, transformStyle: "preserve-3d" }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

export default function About() {
    const ref = useRef<HTMLDivElement>(null!);
    const isInView = useInView(ref, { once: true, margin: "-80px" });
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    const blobY1 = useTransform(scrollYProgress, [0, 1], [-50, 50]);
    const blobY2 = useTransform(scrollYProgress, [0, 1], [50, -50]);

    const fadeUp: Variants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 70, damping: 18 } },
    };
    const container: Variants = {
        hidden: {},
        visible: { transition: { staggerChildren: 0.1 } },
    };

    return (
        <section id="about" className="relative py-24 overflow-hidden" ref={ref}>
            <motion.div 
                style={{ y: blobY1 }}
                className="absolute top-1/2 left-0 w-80 h-80 rounded-full bg-[var(--color-primary)] opacity-[0.04] blur-[100px] pointer-events-none" 
            />
            <motion.div 
                style={{ y: blobY2 }}
                className="absolute top-1/4 right-0 w-64 h-64 rounded-full bg-[var(--color-secondary)] opacity-[0.04] blur-[90px] pointer-events-none" 
            />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                {/* Header */}
                <div className="text-center mb-16">
                    <p className="text-[var(--color-primary)] font-mono text-sm tracking-widest uppercase mb-3">
                        About Me
                    </p>
                    <h2 className="section-heading text-4xl md:text-5xl font-bold">
                        <WordReveal text="Turning ideas into" />{" "}
                        <span className="gradient-text">
                            <WordReveal text="digital reality" />
                        </span>
                    </h2>
                </div>

                {/* Bio + Stats */}
                <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
                    {/* Bio card with tilt */}
                    <ScrollReveal direction="left" offset={["start 90%", "start 40%"]}>
                        <TiltCard className="glass-card p-8 space-y-5">
                            <div className="flex items-center gap-3">
                                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)] flex items-center justify-center text-xl">
                                    👨‍💻
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-white">Sohail Patel</h3>
                                    <p className="text-sm text-[var(--color-text-muted)]">Software Developer</p>
                                </div>
                            </div>
                            <p className="text-[var(--color-text-muted)] leading-relaxed text-sm">
                                I&apos;m a software developer who transforms ideas into clean, scalable, and user-focused digital products. With a passion for problem-solving and modern technology, I build solutions that deliver real impact.
                            </p>
                            <div className="flex flex-wrap gap-2 pt-1">
                                {["React", "React Native", "Next.js", "TypeScript", "Tailwind CSS", "Redux", "Fastlane", "Git"].map((tech, i) => (
                                    <motion.span
                                        key={tech}
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={isInView ? { opacity: 1, scale: 1 } : {}}
                                        transition={{ delay: 0.3 + i * 0.04 }}
                                        whileHover={{ scale: 1.08, y: -2 }}
                                        className="px-3 py-1 text-xs rounded-full bg-[rgba(108,99,255,0.08)] border border-[rgba(108,99,255,0.2)] text-[var(--color-primary-light)] cursor-default"
                                    >
                                        {tech}
                                    </motion.span>
                                ))}
                            </div>
                        </TiltCard>
                    </ScrollReveal>

                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-4">
                        {stats.map((stat, i) => (
                            <ScrollReveal key={stat.label} scale offset={["start 95%", "start 50%"]}>
                                <div className="glass-card p-6 text-center h-full hover:scale-105 hover:-translate-y-1 transition-transform duration-300">
                                    <p className="text-4xl font-bold gradient-text mb-1 tabular-nums">
                                        <CountUp target={stat.value} suffix={stat.suffix} isInView={isInView} />
                                    </p>
                                    <p className="text-sm text-[var(--color-text-muted)]">{stat.label}</p>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>

                {/* Highlights */}
                <div className="grid md:grid-cols-3 gap-5">
                    {highlights.map((item, i) => (
                        <ScrollReveal key={item.title} direction="up" scale offset={["start 95%", "start 60%"]}>
                            <div className="glass-card p-7 text-center relative overflow-hidden group h-full hover:-translate-y-1 transition-transform duration-300">
                                {/* Bottom accent on hover */}
                                <div
                                    className="absolute bottom-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                                    style={{ background: `linear-gradient(90deg, transparent, ${item.color}, transparent)` }}
                                />
                                <div className="text-3xl mb-4">{item.icon}</div>
                                <h3 className="text-base font-semibold text-white mb-2">{item.title}</h3>
                                <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">{item.description}</p>
                            </div>
                        </ScrollReveal>
                    ))}
                </div>
            </div>
        </section>
    );
}
