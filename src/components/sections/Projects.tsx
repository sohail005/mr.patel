"use client";

import { motion, useInView, useMotionValue, useTransform, useSpring, useScroll } from "framer-motion";
import WordReveal from "@/components/effects/WordReveal";
import ScrollReveal from "@/components/effects/ScrollReveal";
import { useRef, useState } from "react";

const projects = [
    {
        title: "Opus Virtual Offices",
        description: "A premium all-in-one virtual office platform offering professional business addresses, live call answering, and mail handling services across 650+ US locations.",
        tags: ["Virtual Office", "SaaS", "Web Platform", "Business Services"],
        color: "#3b82f6",
        image: "https://www.opusvirtualoffices.com/opus-logo-icon.svg",
        github: "#",
        live: "https://www.opusvirtualoffices.com/",
    },
    {
        title: "Finecart",
        description: "A local marketplace application that connects users with neighborhood stores for convenient doorstep delivery of varied products.",
        tags: ["React Native", "Firebase", "Marketplace"],
        color: "#6c63ff",
        image: "https://play-lh.googleusercontent.com/dRmXZ9KOrIV3ysgByLlUDf32JTG8-fC5sEr9D7XeXjSLpP1OjYMlsgYekqx0xQzteuY=s512-rw",
        github: "https://github.com/sohail005",
        live: "https://play.google.com/store/apps/details?id=com.retail.center.io",
    },
    {
        title: "HOPP",
        description: "An on-demand driver service app that allows users to hire verified and trained professional drivers on an hourly basis.",
        tags: ["React Native", "Google Maps", "On-Demand"],
        color: "#00d4ff",
        image: "https://play-lh.googleusercontent.com/65rwHxXRvvzoJG6iETMINnUgeQqYq0JUUVUCP8AHMARnUVGYOXVNqSL4FRyWCOUxnDY=s512-rw",
        github: "https://github.com/sohail005",
        live: "https://play.google.com/store/apps/details?id=com.Revalsys.warantech.HoppCustomer",
    },
    {
        title: "HOPP-Partner",
        description: "The companion application for HOPP drivers to manage their bookings, trips, and real-time navigation.",
        tags: ["Real-time Tracking", "React Native", "Logistics"],
        color: "#ff6fd8",
        image: "https://play-lh.googleusercontent.com/GOMusFUPLSJCgpplOT8-i2qRqR_EGjNLelEO2MDsnzI6C0Y8gRPy-iqLhImfM0JoEQ=s512-rw",
        github: "https://github.com/sohail005",
        live: "https://play.google.com/store/apps/details?id=com.Revalsys.warantech.HOPPDriver",
    },
    {
        title: "Reval Retail",
        description: "A comprehensive retail shopping platform designed for local neighborhood stores to reach customers online.",
        tags: ["E-commerce", "React Native", "Retail"],
        color: "#a78bfa",
        image: "https://play-lh.googleusercontent.com/DE372GJhBmpnz9xdn3wRcdpFqV5z2NzkZQ2Ro6EDPxkbnD-vzC8t9q6ezeqGoAkLUT0=s512-rw",
        github: "https://github.com/sohail005",
        live: "https://play.google.com/store/apps/details?id=com.revalretail",
    },
    {
        title: "RevalOmni Dashboard",
        description: "A business management dashboard for retail owners to monitor sales, inventory, and business analytics in real-time.",
        tags: ["Data Viz", "React Native", "Analytics"],
        color: "#fbbf24",
        image: "https://play-lh.googleusercontent.com/ACPopRcdWwcEgdhg8yvN1Tp6FF2xfzskkqWP6OmGhgvjWOZOaBCCD7T5t4FnaFdDiYL3=s512-rw",
        github: "https://github.com/sohail005",
        live: "https://play.google.com/store/apps/details?id=com.masterwsi",
    },
    {
        title: "Reval ESS",
        description: "Employee Self Service (ESS) application for internal company management, profile updates, and leave requests.",
        tags: ["HRMS", "Internal Tool", "React Native"],
        color: "#94a3b8",
        image: "https://play-lh.googleusercontent.com/PZsZzBt_BforgPaps1wry9HbuIwThsfNghCCMvLOVG1iA8qV-5Gh0pnUGzRSt5QbVOo5=s512-rw",
        github: "https://github.com/sohail005",
        live: "https://play.google.com/store/apps/details?id=com.revaless",
    },
    {
        title: "Hopp(ios)",
        description: "iOS version of the on-demand driver service, offering seamless booking and professional driver management.",
        tags: ["iOS", "App Store", "React Native"],
        color: "#00d4ff",
        image: "https://is1-ssl.mzstatic.com/image/thumb/Purple112/v4/3f/b4/d6/3fb4d6f4-7130-0849-b8e9-9e84838de4a2/AppIcon-0-0-1x_U007epad-0-10-0-85-220.png/1024x1024bb.jpg",
        github: "https://github.com/sohail005",
        live: "https://apps.apple.com/in/app/hopp-company/id1527763771",
    },
    {
        title: "Hopp Partner (ios)",
        description: "iOS companion app for HOPP partners to track earnings, manage schedules, and accept trip requests.",
        tags: ["iOS", "Logistics", "React Native"],
        color: "#ff6fd8",
        image: "https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/f4/dc/f8/f4dcf8d4-2b24-3aa1-1ae3-611a7365700a/AppIcon-0-0-1x_U007epad-0-9-0-85-220.png/1024x1024bb.jpg",
        github: "https://github.com/sohail005",
        live: "https://apps.apple.com/in/app/hopp-partner/id1527779025",
    },
    {
        title: "Revalsys Authenticator",
        description: "A secure authentication app providing 2FA and secure notifications for internal company systems using JWT and Biometrics.",
        tags: ["Security", "Biometrics", "2FA"],
        color: "#10b981",
        image: "https://play-lh.googleusercontent.com/KEQmiTIYsjlwCK0IU0jPqqQMqc90LGQHAPlA1Cir6u8F2jgZS3GbQ0DAY8W1vbhBcZY=s512-rw",
        github: "https://github.com/sohail005",
        live: "https://play.google.com/store/apps/details?id=com.revalnotification",
    },
    {
        title: "Pro V Networking",
        description: "A professional networking and business event platform for connecting attendees and managing event interactions.",
        tags: ["Networking", "Social", "React Native"],
        color: "#ec4899",
        image: "https://play-lh.googleusercontent.com/P1Mzwk2GwKYy99eLRSP_JZTSS9xJpdi3Ad0jraytb39owFr3-zfogY4cL4RED-wzWX9GGQnFTxsumoKOj-UT-_4=s512-rw",
        github: "https://github.com/sohail005",
        live: "https://play.google.com/store/apps/details?id=com.pro_v_networking",
    },
    {
        title: "Pro V Networking(ios)",
        description: "iOS version of the professional networking platform, listed as Pro 5 Networking on the App Store.",
        tags: ["iOS", "Networking", "Professional"],
        color: "#ec4899",
        image: "https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/e6/bb/93/e6bb9361-96f2-563f-9dcf-7ee8452671c5/AppIcon-1x_U007emarketing-0-6-0-85-220-0.png/1024x1024bb.jpg",
        github: "https://github.com/sohail005",
        live: "https://apps.apple.com/in/app/pro-5-networking/id6745877588",
    },
    {
        title: "Motorspace",
        description: "A JavaScript-focused exploration project involving visualization and interactive simulations for motor systems.",
        tags: ["JavaScript", "HTML/CSS", "Simulation"],
        color: "#ef4444",
        image: "⚙️",
        github: "https://github.com/sohail005/Motorspace",
        live: "#",
    },
];

function MagneticCard({ project }: { project: (typeof projects)[0] }) {
    const cardRef = useRef<HTMLDivElement>(null!);
    const [isHovered, setIsHovered] = useState(false);
    const [spotlight, setSpotlight] = useState({ x: 0, y: 0 });

    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const rotateX = useTransform(y, [-0.5, 0.5], [6, -6]);
    const rotateY = useTransform(x, [-0.5, 0.5], [-6, 6]);
    const springRX = useSpring(rotateX, { stiffness: 200, damping: 25 });
    const springRY = useSpring(rotateY, { stiffness: 200, damping: 25 });
    const springX = useSpring(x, { stiffness: 200, damping: 25 });
    const springY = useSpring(y, { stiffness: 200, damping: 25 });
    const translateX = useTransform(springX, [-0.5, 0.5], [-6, 6]);
    const translateY = useTransform(springY, [-0.5, 0.5], [-6, 6]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = cardRef.current.getBoundingClientRect();
        const nx = (e.clientX - rect.left) / rect.width - 0.5;
        const ny = (e.clientY - rect.top) / rect.height - 0.5;
        x.set(nx);
        y.set(ny);

        setSpotlight({
            x: ((e.clientX - rect.left) / rect.width) * 100,
            y: ((e.clientY - rect.top) / rect.height) * 100,
        });
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
        setIsHovered(false);
    };

    return (
        <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateX: springRX,
                rotateY: springRY,
                x: translateX,
                y: translateY,
                transformStyle: "preserve-3d",
            }}
            className="group relative glass-card overflow-hidden cursor-pointer h-full"
        >
            {/* Spotlight effect */}
            {isHovered && (
                <div
                    className="absolute inset-0 pointer-events-none transition-opacity duration-300 z-0"
                    style={{
                        background: `radial-gradient(280px circle at ${spotlight.x}% ${spotlight.y}%, ${project.color}18, transparent 70%)`,
                    }}
                />
            )}

            {/* Color glow overlay */}
            <motion.div
                animate={{ opacity: isHovered ? 0.12 : 0 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 z-0 rounded-2xl"
                style={{
                    background: `radial-gradient(ellipse at center, ${project.color}, transparent 70%)`,
                }}
            />

            {/* Top bar */}
            <motion.div
                className="h-[2px] w-full"
                animate={{ opacity: isHovered ? 1 : 0.5 }}
                style={{
                    background: `linear-gradient(90deg, transparent, ${project.color}, transparent)`,
                    boxShadow: isHovered ? `0 0 12px ${project.color}60` : "none",
                }}
            />

            <div className="relative z-10 p-8">
                {/* Icon and links */}
                <div className="flex items-start justify-between mb-6">
                    <motion.div
                        animate={{
                            rotate: isHovered ? 360 : 0,
                            scale: isHovered ? 1.1 : 1,
                        }}
                        transition={{ duration: 0.8, ease: "circOut" }}
                        className="w-16 h-16 rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-white/5 flex items-center justify-center relative group-hover:border-white/20 transition-colors"
                    >
                        {project.image.startsWith('http') ? (
                            <img 
                                src={project.image} 
                                alt={project.title} 
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                loading="lazy"
                            />
                        ) : (
                            <span className="text-4xl">{project.image}</span>
                        )}
                        {/* Reflective shine overlay */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    </motion.div>

                    <div className="flex gap-3">
                        {[
                            { href: project.github, label: "GitHub", icon: (
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                </svg>
                            )},
                            { href: project.live, label: "Live", icon: (
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                </svg>
                            )},
                        ].filter(btn => btn.href !== "#").map((btn) => (
                            <motion.a
                                key={btn.label}
                                href={btn.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={btn.label}
                                whileHover={{ scale: 1.15, rotate: 5 }}
                                whileTap={{ scale: 0.9 }}
                                className="w-10 h-10 rounded-full bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] flex items-center justify-center text-[var(--color-text-muted)] hover:text-white hover:border-[var(--color-primary)] transition-all"
                            >
                                {btn.icon}
                            </motion.a>
                        ))}
                    </div>
                </div>

                {/* Title */}
                <h3
                    className="text-xl font-bold mb-3 transition-all duration-300"
                    style={{
                        backgroundImage: isHovered ? `linear-gradient(135deg, ${project.color}, white)` : undefined,
                        WebkitBackgroundClip: isHovered ? "text" : undefined,
                        WebkitTextFillColor: isHovered ? "transparent" : undefined,
                        color: isHovered ? undefined : "white",
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
                            className="px-3 py-1 text-xs rounded-full border transition-all duration-300"
                            style={{
                                borderColor: `${project.color}33`,
                                color: project.color,
                                backgroundColor: isHovered ? `${project.color}15` : `${project.color}08`,
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
    const ref = useRef<HTMLDivElement>(null!);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    const blobY = useTransform(scrollYProgress, [0, 1], [-80, 80]);

    return (
        <section id="projects" className="relative py-32 overflow-hidden" ref={ref}>
            <motion.div 
                style={{ y: blobY }}
                className="absolute top-1/2 left-1/4 w-96 h-96 rounded-full bg-[var(--color-primary)] opacity-[0.03] blur-[120px] pointer-events-none" 
            />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                {/* Header */}
                <div className="text-center mb-20">
                    <p className="text-[var(--color-primary)] font-mono text-sm tracking-widest uppercase mb-4">
                        Featured Work
                    </p>
                    <h2 className="section-heading text-4xl md:text-5xl font-bold">
                        <WordReveal text="Things I've" /> <span className="text-[var(--color-primary)]"><WordReveal text="built" /></span>
                    </h2>
                </div>

                {/* Grid */}
                <div className="grid lg:grid-cols-3 gap-8">
                    {projects.map((project, i) => (
                        <ScrollReveal 
                            key={project.title} 
                            direction={i % 3 === 0 ? "left" : i % 3 === 2 ? "right" : "up"} 
                            scale 
                            offset={["start 95%", "start 40%"]}
                        >
                            <MagneticCard project={project} />
                        </ScrollReveal>
                    ))}
                </div>
            </div>
        </section>
    );
}
