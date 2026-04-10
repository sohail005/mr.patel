"use client";

import { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

type CursorSection = "default" | "hero" | "about" | "skills" | "projects" | "experience" | "contact";

const SECTION_COLORS: Record<CursorSection, string> = {
    default: "108,99,255",
    hero: "108,99,255",
    about: "0,212,255",
    skills: "108,99,255",
    projects: "255,111,216",
    experience: "0,212,255",
    contact: "108,99,255",
};

function getSection(): CursorSection {
    const ids: CursorSection[] = ["hero", "about", "skills", "projects", "experience", "contact"];
    for (const id of [...ids].reverse()) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (el.getBoundingClientRect().top <= window.innerHeight / 2) return id;
    }
    return "default";
}

export default function CursorEffect() {
    const [pos, setPos] = useState({ x: -100, y: -100 });
    const [isPointer, setIsPointer] = useState(false);
    const [visible, setVisible] = useState(false);
    const [section, setSection] = useState<CursorSection>("default");

    const dotX = useSpring(-100, { stiffness: 1500, damping: 40 });
    const dotY = useSpring(-100, { stiffness: 1500, damping: 40 });
    const ringX = useSpring(-100, { stiffness: 500, damping: 30 });
    const ringY = useSpring(-100, { stiffness: 500, damping: 30 });

    useEffect(() => {
        if (typeof window === "undefined") return;
        if ("ontouchstart" in window || navigator.maxTouchPoints > 0) return;
        setVisible(true);

        const onMove = (e: MouseEvent) => {
            if (!visible) setVisible(true);
            dotX.set(e.clientX - 5);
            dotY.set(e.clientY - 5);
            ringX.set(e.clientX - 18);
            ringY.set(e.clientY - 18);
            setPos({ x: e.clientX, y: e.clientY });

            const t = e.target as HTMLElement;
            setIsPointer(
                window.getComputedStyle(t).cursor === "pointer" ||
                ["A", "BUTTON"].includes(t.tagName) ||
                t.closest("a") !== null ||
                t.closest("button") !== null
            );
        };
        const onScroll = () => setSection(getSection());
        const onLeave = () => setVisible(false);
        const onEnter = () => setVisible(true);

        window.addEventListener("mousemove", onMove);
        window.addEventListener("scroll", onScroll, { passive: true });
        document.addEventListener("mouseleave", onLeave);
        document.addEventListener("mouseenter", onEnter);
        return () => {
            window.removeEventListener("mousemove", onMove);
            window.removeEventListener("scroll", onScroll);
            document.removeEventListener("mouseleave", onLeave);
            document.removeEventListener("mouseenter", onEnter);
        };
    }, []);

    if (!visible) return null;
    const rgb = SECTION_COLORS[section];

    return (
        <>
            {/* Inner dot */}
            <motion.div
                className="fixed top-0 left-0 rounded-full pointer-events-none z-[9998] mix-blend-difference bg-white"
                style={{ x: dotX, y: dotY, width: 10, height: 10 }}
                animate={{ scale: isPointer ? 0.4 : 1 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
            />

            {/* Outer ring */}
            <motion.div
                className="fixed top-0 left-0 rounded-full pointer-events-none z-[9997]"
                style={{
                    x: ringX,
                    y: ringY,
                    width: 36,
                    height: 36,
                    border: `1.5px solid rgba(${rgb},0.55)`,
                }}
                animate={{ scale: isPointer ? 1.6 : 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 18 }}
            />

            {/* Soft glow follow */}
            <motion.div
                className="fixed rounded-full pointer-events-none z-[9996]"
                style={{
                    x: pos.x - 60,
                    y: pos.y - 60,
                    width: 120,
                    height: 120,
                    background: `radial-gradient(circle, rgba(${rgb},0.07) 0%, transparent 70%)`,
                    transition: "left 0.1s, top 0.1s",
                }}
            />
        </>
    );
}
