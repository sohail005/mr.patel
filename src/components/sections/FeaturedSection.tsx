"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";

const FEATURES = [
    {
        num: "01",
        subtitle: "Mobile-First Engineer",
        title: "React Native",
        titleAccent: "Developer",
        description:
            "Building production-grade mobile apps from scratch to the App Store. Buttery 60fps animations, gesture-driven interfaces, and platform-native performance.",
        tags: ["React Native", "Expo", "Reanimated", "Gesture Handler"],
        color: "#6c63ff",
        stat: "3+",
        statLabel: "Years Mobile Dev",
    },
    {
        num: "02",
        subtitle: "Modern Web Experiences",
        title: "Next.js",
        titleAccent: "",
        description:
            "Shipping full-stack Next.js applications with server components, dynamic routing, SEO optimization, and pixel-perfect UI implementations.",
        tags: ["Next.js", "TypeScript", "Tailwind CSS", "REST APIs"],
        color: "#00d4ff",
        stat: "25+",
        statLabel: "Projects Shipped",
    },
    {
        num: "03",
        subtitle: "App Store & Google Play",
        title: "Android and IOS",
        titleAccent: "Deployment",
        description:
            "Shipping React Native apps to millions of hands. Handling code signing, provisioning profiles, and navigating complex app store review guidelines without breaking a sweat.",
        tags: ["EAS Build", "Code Signing", "App Store", "Play Store"],
        color: "#ff6fd8",
        stat: "100%",
        statLabel: "Production Releases",
    },
    {
        num: "04",
        subtitle: "Type-Safe Architecture",
        title: "TypeScript",
        titleAccent: "JavaScript",
        description:
            "Strong typing across the entire stack. Clean, self-documenting code that teams can scale and maintain without friction or runtime surprises.",
        tags: ["TypeScript", "Redux Toolkit", "Clean Architecture", "Patterns"],
        color: "#a78bfa",
        stat: "15+",
        statLabel: "Technologies",
    },
];

// ─── Visuals ──────────────────────────────────────────────────────────────────

function PhoneVisual({ color }: { color: string }) {
    return (
        <div className="relative w-40 h-72 mx-auto">
            <div
                className="absolute inset-0 rounded-[2.5rem] border-2 opacity-50"
                style={{ borderColor: color }}
            />
            <div
                className="absolute top-3 left-1/2 -translate-x-1/2 w-10 h-1 rounded-full opacity-40"
                style={{ backgroundColor: color }}
            />
            <div
                className="absolute bottom-4 left-1/2 -translate-x-1/2 w-16 h-1 rounded-full opacity-30"
                style={{ backgroundColor: color }}
            />
            <div
                className="absolute inset-4 rounded-[2rem] overflow-hidden"
                style={{ background: `${color}08` }}
            >
                <div className="mt-5 space-y-2.5 px-3">
                    {[75, 90, 60, 82].map((w, i) => (
                        <motion.div
                            key={i}
                            className="h-7 rounded-xl"
                            style={{
                                width: `${w}%`,
                                background: `${color}1a`,
                                border: `1px solid ${color}25`,
                            }}
                            animate={{ opacity: [0.35, 0.85, 0.35] }}
                            transition={{
                                duration: 2.2,
                                delay: i * 0.38,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                        />
                    ))}
                </div>
            </div>
            <div
                className="absolute inset-0 rounded-[2.5rem] blur-2xl opacity-10"
                style={{ background: color }}
            />
        </div>
    );
}

function BrowserVisual({ color }: { color: string }) {
    const lines = [85, 65, 90, 72, 55, 78, 62];
    return (
        <div className="w-full max-w-xs mx-auto">
            <div
                className="rounded-2xl overflow-hidden border"
                style={{ borderColor: `${color}30`, background: `${color}06` }}
            >
                <div
                    className="px-4 py-3 flex items-center gap-2 border-b"
                    style={{ borderColor: `${color}20` }}
                >
                    {["#ff5f57", "#febc2e", "#28c840"].map((c) => (
                        <div
                            key={c}
                            className="w-2.5 h-2.5 rounded-full opacity-60"
                            style={{ backgroundColor: c }}
                        />
                    ))}
                    <div
                        className="flex-1 h-4 rounded-md mx-2 opacity-20"
                        style={{ background: color }}
                    />
                </div>
                <div className="p-4 space-y-2">
                    {lines.map((w, i) => (
                        <motion.div
                            key={i}
                            className="h-2.5 rounded-sm"
                            style={{ width: `${w}%`, background: `${color}28` }}
                            animate={{ opacity: [0.25, 0.7, 0.25] }}
                            transition={{
                                duration: 1.8,
                                delay: i * 0.2,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

function PipelineVisual({ color }: { color: string }) {
    const stages = ["Push", "Test", "Build", "Deploy"];
    return (
        <div className="flex flex-col items-center gap-6">
            <div className="flex items-center gap-2">
                {stages.map((s, i) => (
                    <div key={s} className="flex items-center gap-2">
                        <motion.div
                            className="flex flex-col items-center gap-1.5"
                            animate={{ scale: [1, 1.06, 1] }}
                            transition={{
                                duration: 1.6,
                                delay: i * 0.5,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                        >
                            <div
                                className="w-14 h-14 rounded-2xl flex items-center justify-center text-lg font-bold"
                                style={{
                                    background: `${color}12`,
                                    border: `1px solid ${color}35`,
                                    color: color,
                                }}
                            >
                                {["↑", "✓", "◈", "→"][i]}
                            </div>
                            <span className="text-xs font-mono" style={{ color: `${color}88` }}>
                                {s}
                            </span>
                        </motion.div>
                        {i < stages.length - 1 && (
                            <motion.div
                                className="w-8 h-px mb-6 rounded-full"
                                style={{ background: `${color}40` }}
                                animate={{ scaleX: [0.5, 1, 0.5], opacity: [0.3, 0.8, 0.3] }}
                                transition={{
                                    duration: 1.6,
                                    delay: i * 0.5 + 0.3,
                                    repeat: Infinity,
                                }}
                            />
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

function TypeVisual({ color }: { color: string }) {
    const types = [
        "const build = <T extends App>(config: T): Deploy<T>",
        "type Stack = React | Next | Native | TypeScript",
        "interface Dev { mobile: true; web: true; ci: true }",
    ];
    return (
        <div className="space-y-3 font-mono text-xs max-w-xs mx-auto">
            {types.map((line, i) => (
                <motion.div
                    key={i}
                    className="px-4 py-3 rounded-xl truncate"
                    style={{
                        background: `${color}0c`,
                        border: `1px solid ${color}28`,
                        color: `${color}cc`,
                    }}
                    animate={{ opacity: [0.4, 0.85, 0.4] }}
                    transition={{ duration: 2.5, delay: i * 0.6, repeat: Infinity, ease: "easeInOut" }}
                >
                    {line}
                </motion.div>
            ))}
        </div>
    );
}

const VISUALS = [PhoneVisual, BrowserVisual, PipelineVisual, TypeVisual];

// ─── FeaturePanel — must be outside parent (calls hooks) ─────────────────────
function FeaturePanel({
    feature,
    index,
    total,
    progress,
}: {
    feature: (typeof FEATURES)[0];
    index: number;
    total: number;
    progress: MotionValue<number>;
}) {
    const seg = 1 / total;
    const start = index * seg;
    const end = (index + 1) * seg;
    const t = 0.06; // transition band

    const opIn = index === 0 ? 0 : start - t;
    const opOut = index === total - 1 ? 1 : end - t;

    // Clamp to [0,1]
    const inputRange = [
        Math.max(0, opIn),
        Math.min(1, start + t),
        Math.max(0, opOut),
        Math.min(1, end + t),
    ];
    const opacityOut = [
        index === 0 ? 1 : 0,
        1,
        1,
        index === total - 1 ? 1 : 0,
    ];

    const opacity = useTransform(progress, inputRange, opacityOut);
    const yValues = [
        index === 0 ? 0 : 28,
        0,
        0,
        index === total - 1 ? 0 : -28,
    ];
    const y = useTransform(progress, inputRange, yValues);

    const Visual = VISUALS[index];

    return (
        <motion.div
            style={{ opacity, y, willChange: "transform, opacity" }}
            className="absolute inset-0 flex flex-col lg:flex-row items-center justify-center gap-4 lg:gap-20 px-6 lg:px-20 pointer-events-none pt-36 lg:pt-0"
        >
            {/* Left — Text */}
            <div className="flex-1 max-w-lg space-y-3 lg:space-y-6 text-center lg:text-left z-10">
                <div className="flex items-center gap-3 justify-center lg:justify-start">
                    <span
                        className="text-[10px] lg:text-xs font-mono tracking-[0.25em] uppercase"
                        style={{ color: feature.color }}
                    >
                        {feature.num}
                    </span>
                    <div className="h-px w-8 lg:w-12 opacity-40" style={{ background: feature.color }} />
                    <span className="text-[10px] lg:text-xs text-[var(--color-text-muted)]">{feature.subtitle}</span>
                </div>

                <h3 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-tight text-white drop-shadow-lg">
                    {feature.title}{" "}
                    <span style={{ color: feature.color }}>{feature.titleAccent}</span>
                </h3>

                <p className="text-xs lg:text-lg text-[var(--color-text-muted)] leading-relaxed max-w-sm mx-auto lg:max-w-md lg:mx-0 drop-shadow">
                    {feature.description}
                </p>

                <div className="flex flex-wrap gap-1.5 lg:gap-2 justify-center lg:justify-start">
                    {feature.tags.map((tag) => (
                        <span
                            key={tag}
                            className="px-2 lg:px-3 py-0.5 lg:py-1 text-[10px] lg:text-xs rounded-full border backdrop-blur-sm"
                            style={{
                                borderColor: `${feature.color}35`,
                                color: feature.color,
                                background: `${feature.color}0d`,
                            }}
                        >
                            {tag}
                        </span>
                    ))}
                </div>

                {/* Stat */}
                <div className="pt-1.5 lg:pt-2">
                    <p className="text-4xl lg:text-6xl font-black" style={{ color: feature.color }}>
                        {feature.stat}
                    </p>
                    <p className="text-[10px] lg:text-sm text-[var(--color-text-muted)] mt-0.5 lg:mt-1">{feature.statLabel}</p>
                </div>
            </div>

            {/* Right — Visual */}
            <div className="flex-shrink-0 w-full lg:w-72 flex items-center justify-center scale-[0.65] md:scale-90 lg:scale-100 origin-top lg:origin-center mt-[-1rem] lg:mt-0">
                <Visual color={feature.color} />
            </div>
        </motion.div>
    );
}

// ─── Progress dots ────────────────────────────────────────────────────────────
function ProgressDots({
    total,
    progress,
}: {
    total: number;
    progress: MotionValue<number>;
}) {
    return (
        <div className="absolute right-6 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-10">
            {Array.from({ length: total }).map((_, i) => {
                const start = i / total;
                const end = (i + 1) / total;
                // eslint-disable-next-line react-hooks/rules-of-hooks
                const scale = useTransform(progress, [start, (start + end) / 2, end], [1, 1.6, 1]);
                // eslint-disable-next-line react-hooks/rules-of-hooks
                const opacity = useTransform(progress, [start, (start + end) / 2, end], [0.3, 1, 0.3]);
                return (
                    <motion.div
                        key={i}
                        style={{ scale, opacity }}
                        className="w-1.5 h-1.5 rounded-full bg-white"
                    />
                );
            })}
        </div>
    );
}

// ─── Main Export ──────────────────────────────────────────────────────────────
export default function FeaturedSection() {
    const containerRef = useRef<HTMLDivElement>(null!);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    return (
        <section
            ref={containerRef}
            style={{ height: `${FEATURES.length * 100}vh` }}
            className="relative"
        >
            {/* Sticky inner */}
            <div className="sticky top-0 h-screen overflow-hidden">
                {/* Background gradient that shifts with scroll */}
                {FEATURES.map((f, i) => {
                    const seg = 1 / FEATURES.length;
                    // eslint-disable-next-line react-hooks/rules-of-hooks
                    const opacity = useTransform(
                        scrollYProgress,
                        [i * seg, i * seg + 0.08, (i + 1) * seg - 0.08, (i + 1) * seg],
                        [0, 0.06, 0.06, 0]
                    );
                    return (
                        <motion.div
                            key={f.color}
                            style={{
                                opacity,
                                background: `radial-gradient(ellipse at 70% 50%, ${f.color} 0%, transparent 60%)`,
                            }}
                            className="absolute inset-0 pointer-events-none"
                        />
                    );
                })}

                {/* Subtle grid */}
                <div
                    className="absolute inset-0 opacity-[0.02] pointer-events-none"
                    style={{
                        backgroundImage:
                            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
                        backgroundSize: "80px 80px",
                    }}
                />

                {/* Section label */}
                <div className="absolute top-20 left-1/2 -translate-x-1/2 z-10 w-full text-center">
                    <p className="text-[var(--color-primary)] font-mono text-xs tracking-widest uppercase">
                        What I Do
                    </p>
                </div>

                {/* Feature panels */}
                <div className="relative h-full">
                    {FEATURES.map((feature, i) => (
                        <FeaturePanel
                            key={feature.num}
                            feature={feature}
                            index={i}
                            total={FEATURES.length}
                            progress={scrollYProgress}
                        />
                    ))}
                </div>

                {/* Progress dots */}
                <ProgressDots total={FEATURES.length} progress={scrollYProgress} />

                {/* Scroll hint at start */}
                <motion.div
                    style={{
                        opacity: useTransform(scrollYProgress, [0, 0.08], [1, 0]),
                    }}
                    className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
                >
                    <span className="text-[9px] font-mono tracking-[0.25em] text-[var(--color-text-muted)] uppercase">
                        Keep scrolling
                    </span>
                    <motion.div
                        animate={{ y: [0, 8, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="w-4 h-7 rounded-full border border-[rgba(255,255,255,0.15)] flex items-start justify-center pt-1"
                    >
                        <div className="w-0.5 h-1.5 rounded-full bg-[var(--color-primary)]" />
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
