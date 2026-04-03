"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from "framer-motion";

const navLinks = [
    { name: "Home", href: "/#hero", section: "hero" },
    { name: "About", href: "/#about", section: "about" },
    { name: "Skills", href: "/#skills", section: "skills" },
    { name: "Projects", href: "/#projects", section: "projects" },
    { name: "Experience", href: "/#experience", section: "experience" },
    { name: "Digibouquet", href: "/digibouquet", section: "" },
    { name: "Contact", href: "/#contact", section: "contact" },
];

function MagneticLink({
    href,
    children,
    isActive,
    id,
    onClick,
}: {
    href: string;
    children: React.ReactNode;
    isActive: boolean;
    id: string;
    onClick?: () => void;
}) {
    const ref = useRef<HTMLAnchorElement>(null!);
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const sx = useSpring(x, { stiffness: 350, damping: 25 });
    const sy = useSpring(y, { stiffness: 350, damping: 25 });

    const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
        const rect = ref.current.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        x.set((e.clientX - cx) * 0.3);
        y.set((e.clientY - cy) * 0.3);
    };
    const handleMouseLeave = () => { x.set(0); y.set(0); };

    return (
        <motion.a
            ref={ref}
            href={href}
            id={id}
            onClick={onClick}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ x: sx, y: sy }}
            className="relative px-4 py-2 text-sm text-[var(--color-text-muted)] hover:text-white transition-colors duration-300"
        >
            {children}
            {isActive && (
                <motion.span
                    layoutId="navbar-active-indicator"
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] w-full rounded-full"
                    style={{
                        background: "linear-gradient(90deg, var(--color-primary), var(--color-secondary))",
                        boxShadow: "0 0 8px var(--color-primary)",
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 35 }}
                />
            )}
            {!isActive && (
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] group-hover:w-full transition-all duration-300" />
            )}
        </motion.a>
    );
}

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [activeSection, setActiveSection] = useState("hero");

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);

            // Detect active section
            const sections = navLinks.map((l) => l.section).filter(Boolean);
            for (const id of sections.reverse()) {
                const el = document.getElementById(id);
                if (!el) continue;
                const rect = el.getBoundingClientRect();
                if (rect.top <= 120) {
                    setActiveSection(id);
                    break;
                }
            }
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <motion.nav
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
                scrolled
                    ? "bg-[rgba(5,8,22,0.80)] backdrop-blur-2xl border-b border-[rgba(108,99,255,0.18)]"
                    : "bg-transparent"
            }`}
        >
            {/* Shimmer line on scroll */}
            {scrolled && (
                <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    className="absolute bottom-0 left-0 right-0 h-[1px] origin-left"
                    style={{
                        background: "linear-gradient(90deg, transparent, rgba(108,99,255,0.4), rgba(0,212,255,0.4), transparent)",
                    }}
                />
            )}

            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                {/* Logo */}
                <motion.a
                    href="/"
                    className="text-2xl font-bold gradient-text tracking-tight"
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.95 }}
                >
                    {"<SP />"}
                </motion.a>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center gap-1">
                    {navLinks.map((link, i) => (
                        <motion.div
                            key={link.name}
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.08 * i, duration: 0.5 }}
                        >
                            <MagneticLink
                                href={link.href}
                                isActive={link.section === activeSection}
                                id={`nav-link-${link.name.toLowerCase()}`}
                            >
                                {link.name}
                            </MagneticLink>
                        </motion.div>
                    ))}
                </div>

                {/* CTA Button */}
                <motion.a
                    href="/#contact"
                    id="nav-cta-button"
                    className="hidden md:block px-5 py-2.5 rounded-full text-sm font-medium bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] text-white relative overflow-hidden group"
                    whileHover={{ scale: 1.06, boxShadow: "0 0 20px rgba(108,99,255,0.5)" }}
                    whileTap={{ scale: 0.95 }}
                >
                    <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity" />
                    Let&apos;s Talk
                </motion.a>

                {/* Mobile Toggle */}
                <motion.button
                    onClick={() => setMobileOpen(!mobileOpen)}
                    className="md:hidden relative w-8 h-8 flex flex-col justify-center items-center gap-1.5"
                    aria-label="Toggle navigation menu"
                    whileTap={{ scale: 0.9 }}
                >
                    <motion.span
                        animate={mobileOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                        className="w-6 h-0.5 bg-white origin-center"
                    />
                    <motion.span
                        animate={mobileOpen ? { opacity: 0, x: -12 } : { opacity: 1, x: 0 }}
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                        className="w-6 h-0.5 bg-white"
                    />
                    <motion.span
                        animate={mobileOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                        className="w-6 h-0.5 bg-white origin-center"
                    />
                </motion.button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0, filter: "blur(8px)" }}
                        animate={{ opacity: 1, height: "auto", filter: "blur(0px)" }}
                        exit={{ opacity: 0, height: 0, filter: "blur(8px)" }}
                        transition={{ duration: 0.3 }}
                        className="md:hidden bg-[rgba(5,8,22,0.95)] backdrop-blur-2xl border-t border-[rgba(108,99,255,0.15)]"
                    >
                        <div className="flex flex-col items-center py-6 gap-4">
                            {navLinks.map((link, i) => (
                                <motion.a
                                    key={link.name}
                                    href={link.href}
                                    initial={{ opacity: 0, x: -24 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.04 * i, type: "spring" }}
                                    onClick={() => setMobileOpen(false)}
                                    className={`text-lg transition-colors font-medium ${
                                        link.section === activeSection
                                            ? "text-white"
                                            : "text-[var(--color-text-muted)] hover:text-white"
                                    }`}
                                >
                                    {link.name}
                                </motion.a>
                            ))}
                            <motion.a
                                href="/#contact"
                                onClick={() => setMobileOpen(false)}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.3 }}
                                className="mt-2 px-6 py-2.5 rounded-full text-sm font-medium bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] text-white"
                            >
                                Let&apos;s Talk
                            </motion.a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
}
