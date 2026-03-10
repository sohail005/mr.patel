"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CursorEffect() {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [isPointer, setIsPointer] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Only enable on non-touch devices
        if (typeof window === "undefined") return;
        const isTouchDevice =
            "ontouchstart" in window || navigator.maxTouchPoints > 0;
        if (isTouchDevice) return;

        setIsVisible(true);

        const handleMouseMove = (e: MouseEvent) => {
            setMousePos({ x: e.clientX, y: e.clientY });
            const target = e.target as HTMLElement;
            setIsPointer(
                window.getComputedStyle(target).cursor === "pointer" ||
                target.tagName === "A" ||
                target.tagName === "BUTTON" ||
                target.closest("a") !== null ||
                target.closest("button") !== null
            );
        };

        const handleMouseLeave = () => setIsVisible(false);
        const handleMouseEnter = () => setIsVisible(true);

        window.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseleave", handleMouseLeave);
        document.addEventListener("mouseenter", handleMouseEnter);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseleave", handleMouseLeave);
            document.removeEventListener("mouseenter", handleMouseEnter);
        };
    }, []);

    if (!isVisible) return null;

    return (
        <>
            {/* Main cursor dot */}
            <motion.div
                className="fixed top-0 left-0 w-3 h-3 rounded-full bg-white mix-blend-difference pointer-events-none z-[9998]"
                animate={{
                    x: mousePos.x - 6,
                    y: mousePos.y - 6,
                    scale: isPointer ? 0.5 : 1,
                }}
                transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 28,
                    mass: 0.5,
                }}
            />

            {/* Outer ring */}
            <motion.div
                className="fixed top-0 left-0 w-10 h-10 rounded-full border border-[var(--color-primary)] pointer-events-none z-[9997]"
                animate={{
                    x: mousePos.x - 20,
                    y: mousePos.y - 20,
                    scale: isPointer ? 1.8 : 1,
                    opacity: isPointer ? 0.5 : 0.3,
                }}
                transition={{
                    type: "spring",
                    stiffness: 150,
                    damping: 15,
                    mass: 0.1,
                }}
            />

            {/* Glow trail */}
            <motion.div
                className="fixed top-0 left-0 w-40 h-40 rounded-full pointer-events-none z-[9996]"
                animate={{
                    x: mousePos.x - 80,
                    y: mousePos.y - 80,
                }}
                transition={{
                    type: "spring",
                    stiffness: 50,
                    damping: 20,
                    mass: 0.8,
                }}
                style={{
                    background:
                        "radial-gradient(circle, rgba(108,99,255,0.06) 0%, transparent 70%)",
                }}
            />
        </>
    );
}
