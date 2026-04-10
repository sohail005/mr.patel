"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Contact from "@/components/sections/Contact";
import FadeUp from "@/components/effects/FadeUp";
import dynamic from "next/dynamic";

const CursorEffect = dynamic(() => import("@/components/effects/CursorEffect"), { ssr: false });
const ScrollProgress = dynamic(() => import("@/components/effects/ScrollProgress"), { ssr: false });
const LenisProvider = dynamic(() => import("@/components/effects/LenisProvider"), { ssr: false });

type TechCategory = "All" | "Frontend" | "Backend" | "Mobile" | "Beginner";

interface TechItem {
    id: string;
    name: string;
    category: TechCategory;
    level: "Beginner" | "Intermediate" | "Advanced";
    description: string;
    color: string;
    icon: string;
    overview: string;
    concepts: string[];
    usage: string;
    tips: string[];
}

const technologies: TechItem[] = [
    {
        id: "react-native",
        name: "React Native",
        category: "Mobile",
        level: "Advanced",
        description: "Building production-grade, cross-platform mobile apps.",
        color: "#61dafb",
        icon: "📱",
        overview: "React Native is my go-to framework for mobile development. I've built and shipped multiple apps to the App Store and Google Play using it, leveraging its native Modules bridge and Reanimated for buttery 60fps animations.",
        concepts: ["Metro Bundler", "Reanimated 3", "Gesture Handler", "Platform-specific Code", "Native Modules"],
        usage: "Used heavily in HOPP, Finecart, Reval Retail, and Opus Virtual Offices for building robust mobile experiences.",
        tips: [
            "Use React Native Reanimated over the animated API for performance.",
            "Always test on both iOS and Android simultaneously to catch layout shifts early.",
            "Use Expo router if starting a new project today for out-of-the-box deep linking."
        ]
    },
    {
        id: "nextjs",
        name: "Next.js",
        category: "Frontend",
        level: "Advanced",
        description: "Creating highly optimized, SEO-friendly React web applications.",
        color: "#ffffff",
        icon: "▲",
        overview: "Next.js empowers me to build fast, full-stack React applications. From static site generation to server components and API routes, it acts as the foundation for almost all web platforms I build.",
        concepts: ["App Router", "Server Components (RSC)", "Server Actions", "Image Optimization", "Static Generation (SSG)"],
        usage: "Built this very portfolio and multiple client dashboards using the latest Next.js 14 App Router.",
        tips: [
            "Keep Client components as leaf nodes in your component tree.",
            "Leverage Server Actions to eliminate the need for bloated API routes.",
            "Use next/image heavily; it drastically improves Core Web Vitals."
        ]
    },
    {
        id: "typescript",
        name: "TypeScript",
        category: "All",
        level: "Advanced",
        description: "Type-safe JavaScript for scalable and reliable codebases.",
        color: "#3178c6",
        icon: "TS",
        overview: "TypeScript is non-negotiable for me in production apps. It catches 90% of bugs before runtime and serves as excellent self-documenting code.",
        concepts: ["Generics", "Utility Types", "Strict Mode", "Type Inference", "Discriminated Unions"],
        usage: "Used across all projects: React Native apps, Next.js backends, tests, and Node.js microservices.",
        tips: [
            "Enable 'strict': true in tsconfig immediately.",
            "Avoid 'any' whenever possible; use 'unknown' if you are unsure.",
            "Utilize Zod or Yup to validate API responses at the edge and infer TS types."
        ]
    },
    {
        id: "firebase",
        name: "Firebase",
        category: "Backend",
        level: "Intermediate",
        description: "Realtime databases, authentication, and cloud functions.",
        color: "#ffa000",
        icon: "🔥",
        overview: "Firebase is my preferred BaaS for rapid prototyping and real-time syncing. The ecosystem provides everything needed to bootstrap a backend in hours.",
        concepts: ["Firestore", "Cloud Functions", "Firebase Auth", "Security Rules", "Cloud Messaging (FCM)"],
        usage: "Powered the backend for Finecart and handled push notifications for HOPP driver partner apps.",
        tips: [
            "Design your Firestore database schema for reading, not writing.",
            "Denormalize data if necessary since joins aren't native.",
            "Never bypass Security Rules; always validate data at the database level."
        ]
    },
    {
        id: "playwright",
        name: "Playwright",
        category: "All",
        level: "Intermediate",
        description: "Reliable end-to-end testing for modern web apps.",
        color: "#2EAD33",
        icon: "🎭",
        overview: "Testing is crucial for production apps. I use Playwright as my primary end-to-end testing framework because of its speed, auto-waiting capabilities, and cross-browser support.",
        concepts: ["E2E Testing", "Auto-waiting", "Network Interception", "UI Assertions", "Headless Mode"],
        usage: "Wrote extensive E2E test suites for portfolio features like form validation and Digibouquet mechanics.",
        tips: [
            "Use auto-waiting to avoid flaky, arbitrary setTimeout calls.",
            "Utilize the Playwright VS Code extension for easy debugging and UI mode.",
            "Mock API routes directly in tests to ensure deterministic results."
        ]
    },
    {
        id: "deployment",
        name: "android and IOS deployment",
        category: "Mobile",
        level: "Advanced",
        description: "Shipping React Native apps to the App Store and Google Play.",
        color: "#83A92A",
        icon: "🚀",
        overview: "Writing an app is only 50% of the battle. Dealing with code signing, certificates, Google Play consoles, and App Store Connect forms is a complex beast that I navigate comfortably.",
        concepts: ["EAS Build", "Code Signing", "Fastlane", "TestFlight", "App Store Guidelines"],
        usage: "Shipped HOPP, Finecart, Reval Retail, and Opus Virtual Offices directly to end users across both major mobile platforms over dozens of iterations.",
        tips: [
            "Use EAS Build with EAS Credentials to automate code signing woes.",
            "Always utilize TestFlight internal testing branches before an external review.",
            "Keep provisioning profiles up to date and clean up old certificates annually."
        ]
    },
    {
        id: "roadmap",
        name: "Full-Stack Roadmap",
        category: "All",
        level: "Beginner",
        description: "A step-by-step roadmap to go from Zero to Full-Stack.",
        color: "#E34F26",
        icon: "🗺️",
        overview: "Getting started in web development can be overwhelming. This roadmap is the exact path I recommend to transition from writing your first line of HTML to building production-ready scalable apps.",
        concepts: ["HTML/CSS Foundations", "Vanilla JavaScript", "React.js Ecosystem", "Node.js Basics", "Next.js App Router"],
        usage: "This path forms the foundational skill set I use every single day as a software engineer.",
        tips: [
            "Don't rush to React. Spend ample time mastering Vanilla JavaScript array methods and async/promises.",
            "Build real projects. 100 hours of videos won't teach you as much as 10 hours of struggling with an actual codebase.",
            "Once you grasp APIs and state management, Next.js will naturally solve the router/SSR pain points."
        ]
    },
    {
        id: "frontend-roadmap",
        name: "Frontend Roadmap",
        category: "Frontend",
        level: "Beginner",
        description: "The visual path to becoming a UI/UX-focused frontend engineer.",
        color: "#d946ef",
        icon: "🎨",
        overview: "Want to focus purely on the frontend? Building beautiful user interfaces starts here. Real frontend engineering goes far beyond centering a div; it encompasses web accessibility, animations, responsive layouts, and performance.",
        concepts: ["Semantic HTML", "CSS Flex/Grid", "DOM Manipulation", "Web Accessibility (a11y)", "Responsive Design"],
        usage: "This path ensures websites not only look good but operate flawlessly on screens of all sizes.",
        tips: [
            "Learn CSS deeply before reaching for Tailwind. Tailwind is amazing, but understanding the underlying CSS is irreplaceable.",
            "Always test your websites fully zoomed in and on mobile simulators.",
            "Lighthouse is your best friend. Build a habit of auditing your apps early."
        ]
    }
];

const categories: TechCategory[] = ["All", "Frontend", "Mobile", "Backend", "Beginner"];

export default function LearnWithMe() {
    const [filter, setFilter] = useState<TechCategory>("All");
    const [selectedId, setSelectedId] = useState<string | null>(null);

    const filteredTech = filter === "All" 
        ? technologies 
        : filter === "Beginner" 
            ? technologies.filter(t => t.level === "Beginner") 
            : technologies.filter(t => t.category === filter);

    const selectedTech = technologies.find(t => t.id === selectedId);

    return (
        <main className="relative min-h-screen pt-32 pb-24 bg-[var(--color-bg)]">
            <LenisProvider />
            <ScrollProgress />
            <CursorEffect />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                
                {/* ─── Hero Section ─── */}
                <FadeUp className="text-center mb-16 lg:mb-24">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ type: "spring", stiffness: 200, damping: 20 }}
                        className="inline-block mb-6 px-4 py-1.5 rounded-full border border-[rgba(108,99,255,0.3)] bg-[rgba(108,99,255,0.1)] backdrop-blur-md"
                    >
                        <span className="text-[var(--color-primary)] font-mono text-xs tracking-widest uppercase">
                            Knowledge Base
                        </span>
                    </motion.div>
                    <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight leading-tight mb-6">
                        Learn With <span className="gradient-text">Me</span>
                    </h1>
                    <p className="text-lg md:text-xl text-[var(--color-text-muted)] max-w-2xl mx-auto leading-relaxed">
                        Explore the technologies I've worked on, learn my favorite patterns, and discover how I structure production-grade applications.
                    </p>
                </FadeUp>

                {/* ─── Filters ─── */}
                <FadeUp delay={0.1} className="flex flex-wrap justify-center gap-3 mb-16">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setFilter(cat)}
                            className={`relative px-6 py-2 rounded-full text-sm font-medium transition-all ${
                                filter === cat ? "text-white" : "text-[var(--color-text-muted)] hover:text-white"
                            }`}
                        >
                            {filter === cat && (
                                <motion.div
                                    layoutId="active-filter"
                                    className="absolute inset-0 rounded-full border border-[var(--color-primary)] bg-[rgba(108,99,255,0.15)]"
                                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                                />
                            )}
                            <span className="relative z-10">{cat}</span>
                        </button>
                    ))}
                </FadeUp>

                {/* ─── Grid ─── */}
                <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-32">
                    <AnimatePresence>
                        {filteredTech.map((tech) => (
                            <motion.div
                                layoutId={`card-${tech.id}`}
                                key={tech.id}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.2 }}
                                onClick={() => setSelectedId(tech.id)}
                                className="glass-card p-6 rounded-3xl cursor-pointer hover:border-[var(--color-primary)] transition-colors group relative overflow-hidden flex flex-col h-full"
                            >
                                <div className="absolute top-0 right-0 w-32 h-32 blur-[60px] opacity-20 pointer-events-none group-hover:opacity-40 transition-opacity" style={{ background: tech.color }} />
                                
                                <div className="flex items-center gap-4 mb-4 relative z-10">
                                    <div className="w-12 h-12 rounded-xl flex items-center justify-center text-xl bg-white/5 border border-white/10 shadow-lg">
                                        {tech.icon}
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-white">{tech.name}</h3>
                                        <span className="text-xs font-mono" style={{ color: tech.color }}>{tech.level}</span>
                                    </div>
                                </div>
                                <p className="text-sm text-[var(--color-text-muted)] leading-relaxed relative z-10 flex-grow">
                                    {tech.description}
                                </p>
                                <div className="mt-6 text-sm font-semibold text-white/70 group-hover:text-white flex items-center gap-2 relative z-10">
                                    Explore <span className="group-hover:translate-x-1 transition-transform">→</span>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>

                {/* ─── Inline Expanded Modal ─── */}
                <AnimatePresence>
                    {selectedId && selectedTech && (
                        <>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setSelectedId(null)}
                                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
                            />
                            <div className="fixed inset-0 pointer-events-none flex items-center justify-center z-[101] p-4 lg:p-10">
                                <motion.div
                                    layoutId={`card-${selectedTech.id}`}
                                    className="w-full max-w-4xl max-h-full overflow-y-auto glass-card rounded-[2rem] border-[rgba(255,255,255,0.1)] pointer-events-auto shadow-2xl relative"
                                    style={{ background: `linear-gradient(to bottom right, rgba(15,15,25,0.95), rgba(5,5,10,0.98))` }}
                                >
                                    <div className="sticky top-0 right-0 flex justify-end p-6 z-20 pointer-events-none">
                                        <button 
                                            onClick={() => setSelectedId(null)}
                                            className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center text-white pointer-events-auto backdrop-blur-md transition-colors"
                                        >
                                            ✕
                                        </button>
                                    </div>

                                    <div className="px-6 pb-10 lg:px-12 lg:pb-16 -mt-10">
                                        <div className="flex items-center gap-6 mb-8">
                                            <div className="w-20 h-20 rounded-2xl flex items-center justify-center text-4xl bg-white/5 border border-white/10 shadow-lg" style={{ boxShadow: `0 0 30px ${selectedTech.color}20` }}>
                                                {selectedTech.icon}
                                            </div>
                                            <div>
                                                <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">{selectedTech.name}</h2>
                                                <div className="flex items-center gap-3 mt-2">
                                                    <span className="px-3 py-1 rounded-full text-xs font-mono border border-white/10 text-[var(--color-text-muted)]">
                                                        {selectedTech.category}
                                                    </span>
                                                    <span className="text-sm font-semibold" style={{ color: selectedTech.color }}>{selectedTech.level}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="grid lg:grid-cols-3 gap-10">
                                            <div className="lg:col-span-2 space-y-10">
                                                <section>
                                                    <h4 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                                                        <span className="text-[var(--color-primary)]">#</span> Overview
                                                    </h4>
                                                    <p className="text-[var(--color-text-muted)] leading-relaxed">
                                                        {selectedTech.overview}
                                                    </p>
                                                </section>

                                                <section>
                                                    <h4 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                                                        <span className="text-green-400">#</span> Real-world Usage
                                                    </h4>
                                                    <p className="text-[var(--color-text-muted)] leading-relaxed">
                                                        {selectedTech.usage}
                                                    </p>
                                                </section>

                                                <section>
                                                    <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                                                        <span className="text-yellow-400">#</span> Pro Tips & Best Practices
                                                    </h4>
                                                    <ul className="space-y-3">
                                                        {selectedTech.tips.map((tip, i) => (
                                                            <li key={i} className="flex gap-3 text-[var(--color-text-muted)]">
                                                                <span style={{ color: selectedTech.color }}>✦</span>
                                                                <span className="leading-relaxed">{tip}</span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </section>
                                            </div>

                                            <div className="space-y-8">
                                                <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.05]">
                                                    <h4 className="text-sm font-bold text-white mb-4 uppercase tracking-widest text-[var(--color-text-muted)]">
                                                        Key Concepts
                                                    </h4>
                                                    <div className="flex flex-wrap gap-2">
                                                        {selectedTech.concepts.map(c => (
                                                            <span key={c} className="px-3 py-1.5 text-xs rounded-lg bg-black/40 text-white/80 border border-white/5">
                                                                {c}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        </>
                    )}
                </AnimatePresence>

            </div>

            {/* ─── Contact Section ─── */}
            <div className="mt-32 pt-20 border-t border-[rgba(255,255,255,0.05)] relative">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[1px] bg-gradient-to-r from-transparent via-[var(--color-primary)] to-transparent opacity-30" />
                <div className="text-center mb-10 px-6">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        Want to learn more or <span className="text-[var(--color-secondary)]">work together?</span>
                    </h2>
                    <p className="text-[var(--color-text-muted)] max-w-xl mx-auto">
                        Whether you need a full-stack developer for your next project or looking for mentorship in React Native, I'm always open to chat.
                    </p>
                </div>
                <Contact />
            </div>
            
        </main>
    );
}
