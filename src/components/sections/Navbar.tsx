"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Button from "@/components/ui/Button";

const navLinks = [
  { name: "Home", href: "/#hero", section: "hero" },
  { name: "About", href: "/#about", section: "about" },
  { name: "Services", href: "/#services", section: "services" },
  { name: "Work", href: "/#projects", section: "projects" },
  { name: "Experience", href: "/#experience", section: "experience" },
  { name: "Capabilities", href: "/#skills", section: "skills" },
  { name: "Contact", href: "/contact", section: "/contact" },
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
        className={`site-nav-bar relative flex w-full items-center justify-between border-b px-5 py-4 sm:px-8 lg:px-12 ${
          scrolled
            ? "border-[var(--color-border)] bg-[var(--nav-bg-scrolled)] backdrop-blur-2xl backdrop-saturate-150"
            : "border-[var(--color-border)] bg-[var(--nav-bg-rest)] backdrop-blur-xl backdrop-saturate-150"
        }`}
      >
        <Link
          href="/#hero"
          className="relative z-10 flex min-w-0 items-center gap-3 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-background)]"
        >
          <span className="h-2 w-2 rounded-full bg-[var(--color-primary-accent)] animate-pulse" />
          <p className="font-mono text-sm font-medium uppercase tracking-[0.32em] text-[var(--color-text-primary)]">
            Sohail Patel
          </p>
        </Link>

        <div className="relative z-10 hidden items-center gap-7 lg:flex">
          {navLinks.map((link, index) => {
            const active = link.section === activeSection;
            const linkClasses = `group relative rounded-sm font-mono text-sm uppercase tracking-[0.28em] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-background)] ${
              active
                ? "text-[var(--color-text-primary)]"
                : "text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]"
            }`;
            const underline = (
              <>
                <span className="absolute -bottom-3 left-0 h-px w-full origin-left scale-x-0 bg-[var(--color-primary-accent)] transition-transform duration-300 group-hover:scale-x-100" />
                {active ? (
                  <motion.span
                    layoutId="nav-active-line"
                    className="absolute -bottom-3 left-0 h-px w-full bg-[var(--color-primary-accent)]"
                    transition={{ type: "spring", stiffness: 320, damping: 28 }}
                  />
                ) : null}
              </>
            );
            return (
              <motion.div
                key={link.name}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * index, duration: 0.45 }}
                className="relative"
              >
                {link.section.startsWith("/") ? (
                  <Link href={link.href} className={linkClasses}>
                    {link.name}
                    {underline}
                  </Link>
                ) : (
                  <a href={link.href} className={linkClasses}>
                    {link.name}
                    {underline}
                  </a>
                )}
              </motion.div>
            );
          })}
        </div>

        <div className="relative z-10 hidden items-center gap-4 lg:flex ">
          <Button className="text-(--color-text-primary)" variant="primary" size="sm" href="/contact">
            Discuss a build
          </Button>
        </div>

        <div className="relative z-10 flex items-center gap-2 lg:hidden">
          <button
            type="button"
            onClick={() => setMobileOpen((value) => !value)}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--color-border)] bg-[var(--control-bg)] text-[var(--color-text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-background)]"
            aria-label="Toggle navigation"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? (
              <X size={22} strokeWidth={1.75} />
            ) : (
              <Menu size={22} strokeWidth={1.75} />
            )}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen ? (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.24 }}
            className="site-nav-menu border-b border-[var(--color-border)] bg-[var(--nav-bg-scrolled)] px-5 py-6 backdrop-blur-2xl lg:hidden"
          >
            <div className="flex flex-col gap-5">
              {navLinks.map((link, index) => {
                const mobileLinkClasses =
                  "rounded-sm font-mono text-sm uppercase tracking-[0.28em] text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-background)]";
                return (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.04 * index, duration: 0.2 }}
                  >
                    {link.section.startsWith("/") ? (
                      <Link
                        href={link.href}
                        onClick={() => setMobileOpen(false)}
                        className={mobileLinkClasses}
                      >
                        {link.name}
                      </Link>
                    ) : (
                      <a
                        href={link.href}
                        onClick={() => setMobileOpen(false)}
                        className={mobileLinkClasses}
                      >
                        {link.name}
                      </a>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.nav>
  );
}
