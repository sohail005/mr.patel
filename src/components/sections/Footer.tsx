"use client";

import { motion } from "framer-motion";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="relative py-12 border-t border-[rgba(108,99,255,0.1)]">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    <motion.a
                        href="#hero"
                        className="text-xl font-bold gradient-text tracking-tight"
                        whileHover={{ scale: 1.05 }}
                    >
                        {"<Sohail Patel />"}
                    </motion.a>

                    <p className="text-sm text-[var(--color-text-muted)]">
                        © {currentYear} Sohail Patel. Crafted with{" "}
                        <span className="text-[var(--color-accent)]">♥</span> and lots of ☕
                    </p>

                    <div className="flex items-center gap-1 text-xs text-[var(--color-text-muted)]">
                        <span>Built with</span>
                        <span className="text-[var(--color-primary)]">Next.js</span>
                        <span>×</span>
                        <span className="text-[var(--color-secondary)]">Three.js</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
