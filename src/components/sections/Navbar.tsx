"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

const navLinks = [
  { name: "Home", href: "/#hero", section: "hero" },
  { name: "About", href: "/#about", section: "about" },
  { name: "Skills", href: "/#skills", section: "skills" },
  { name: "Projects", href: "/#projects", section: "projects" },
  { name: "Experience", href: "/#experience", section: "experience" },
  { name: "Contact", href: "/#contact", section: "contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [activeSection, setActiveSection] = useState("hero");
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (pathname !== "/") {
      window.queueMicrotask(() => setActiveSection(pathname));
      return;
    }

    const sections = navLinks
      .map((link) => link.section)
      .filter((section) => !section.startsWith("/"));

    const onScroll = () => {
      setScrolled(window.scrollY > 28);

      for (const id of [...sections].reverse()) {
        const node = document.getElementById(id);
        if (!node) continue;
        if (node.getBoundingClientRect().top <= 140) {
          setActiveSection(id);
          break;
        }
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  return (
    <motion.nav
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.75, ease: "easeOut" }}
      className="fixed inset-x-0 top-0 z-50"
    >
      <div
        className={`relative flex w-full items-center justify-between overflow-hidden border-b px-5 py-4 sm:px-8 lg:px-12 ${
          scrolled
            ? "border-[var(--surface-border)] bg-[var(--nav-bg-scrolled)] shadow-[0_18px_55px_rgba(0,0,0,0.26)] backdrop-blur-2xl"
            : "border-[var(--surface-border)] bg-[var(--nav-bg-rest)] backdrop-blur-xl"
        }`}
      >
        <motion.div
          animate={{ x: ["-10%", "10%", "-10%"] }}
          transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
          className="pointer-events-none absolute inset-y-0 left-[-20%] w-[40%] bg-[linear-gradient(90deg,transparent,rgba(143,199,255,0.12),transparent)] blur-2xl"
        />
        <motion.div
          animate={{ opacity: [0.35, 0.8, 0.35], scaleX: [0.8, 1, 0.8] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
          className="pointer-events-none absolute bottom-0 left-0 h-px w-full bg-[linear-gradient(90deg,transparent,rgba(143,199,255,0.85),rgba(127,224,195,0.65),transparent)]"
        />

        <Link href="/#hero" className="relative z-10 flex min-w-0 items-center gap-3">
          <motion.span
            animate={{ opacity: [0.45, 1, 0.45], scale: [1, 1.35, 1] }}
            transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
            className="h-2.5 w-2.5 rounded-full bg-[var(--color-secondary)]"
          />
          <div>
            <p className="whitespace-nowrap font-[family:var(--font-display)] text-2xl font-semibold leading-none text-[var(--color-text)]">
              Sohail Patel
            </p>
            <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.32em] text-[var(--color-text-muted)]">
              Software developer
            </p>
          </div>
        </Link>

        <div className="relative z-10 hidden items-center gap-7 lg:flex">
          {navLinks.map((link, index) => {
            const active = link.section === activeSection;
            return (
              <motion.a
                key={link.name}
                href={link.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * index, duration: 0.45 }}
                whileHover={{ y: -2 }}
                className={`group relative font-mono text-[11px] uppercase tracking-[0.28em] ${
                  active ? "text-[var(--color-text)]" : "text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
                }`}
              >
                {link.name}
                <span className="absolute -bottom-3 left-0 h-px w-full origin-left scale-x-0 bg-[linear-gradient(90deg,var(--color-primary),var(--color-secondary))] transition-transform duration-300 group-hover:scale-x-100" />
                {active ? (
                  <motion.span
                    layoutId="nav-active-line"
                    className="absolute -bottom-3 left-0 h-px w-full bg-[linear-gradient(90deg,var(--color-primary),var(--color-secondary))]"
                    transition={{ type: "spring", stiffness: 320, damping: 28 }}
                  />
                ) : null}
              </motion.a>
            );
          })}
        </div>

        <motion.a
          href="/#contact"
          whileHover={{ scale: 1.03, y: -1 }}
          whileTap={{ scale: 0.99 }}
          className="primary-action-button relative z-10 hidden overflow-hidden rounded-full border px-5 py-3 font-mono text-[11px] uppercase tracking-[0.24em] lg:block"
        >
          <motion.span
            animate={{ x: ["-140%", "160%"] }}
            transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut", repeatDelay: 1.6 }}
            className="absolute inset-y-0 left-0 w-14 skew-x-[-20deg] bg-[var(--control-bg-hover)]"
          />
          <span className="relative z-10">Start a project</span>
        </motion.a>

        <button
          type="button"
          onClick={() => setMobileOpen((value) => !value)}
          className="relative z-10 flex h-11 w-11 items-center justify-center rounded-full border border-[var(--surface-border)] bg-[var(--control-bg)] lg:hidden"
          aria-label="Toggle navigation"
        >
          <div className="space-y-1.5">
            <motion.span
              animate={mobileOpen ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 24 }}
              className="block h-px w-5 bg-[var(--color-text)]"
            />
            <motion.span
              animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: 0.15 }}
              className="block h-px w-5 bg-[var(--color-text)]"
            />
            <motion.span
              animate={mobileOpen ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 24 }}
              className="block h-px w-5 bg-[var(--color-text)]"
            />
          </div>
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen ? (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.24 }}
            className="border-b border-[var(--surface-border)] bg-[var(--nav-bg-scrolled)] px-5 py-6 shadow-[0_18px_50px_rgba(0,0,0,0.22)] backdrop-blur-2xl lg:hidden"
          >
            <div className="flex flex-col gap-5">
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.04 * index, duration: 0.2 }}
                  className="font-mono text-xs uppercase tracking-[0.28em] text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
                >
                  {link.name}
                </motion.a>
              ))}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.nav>
  );
}
