"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const ROSE_COUNT = 30;

export default function FallingRoses() {
    const [roses, setRoses] = useState<any[]>([]);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const newRoses = Array.from({ length: ROSE_COUNT }).map((_, i) => ({
                id: i,
                x: Math.random() * 100, // percentage for better responsiveness
                delay: Math.random() * 2,
                duration: 5 + Math.random() * 5, // 5s to 10s 
                size: 50 + Math.random() * 70,  // 50px to 120px
                rotate: Math.random() * 360,
                rotateEnd: Math.random() * 360 + 360,
                pathOffset: (Math.random() - 0.5) * 100, // drift left/right
            }));
            setRoses(newRoses);
        }
    }, []);

    if (roses.length === 0) return null;

    return (
        <div className="pointer-events-none fixed inset-0 z-[100] overflow-hidden">
            {roses.map((rose) => (
                <motion.img
                    key={rose.id}
                    src="/flowers/rose.png"
                    alt="Rose"
                    className="absolute -top-[200px]"
                    style={{
                        width: rose.size,
                        left: `${rose.x}%`,
                        filter: "brightness(0.85) contrast(1.4) saturate(1.2)"
                    }}
                    initial={{ y: 0, opacity: 0, rotate: rose.rotate, x: 0 }}
                    animate={{
                        y: typeof window !== 'undefined' ? window.innerHeight + 400 : 1500,
                        opacity: [0, 1, 1, 0],
                        rotate: rose.rotateEnd,
                        x: rose.pathOffset,
                    }}
                    transition={{
                        duration: rose.duration,
                        delay: rose.delay,
                        ease: "linear",
                    }}
                />
            ))}
        </div>
    );
}
