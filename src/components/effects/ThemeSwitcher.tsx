"use client";

import { useEffect, useState, type MouseEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";

type ThemeId = "midnight" | "daylight";

type ViewTransitionDocument = Document & {
  startViewTransition?: (callback: () => void) => { finished: Promise<void> };
};

const storageKey = "portfolio-theme";

function isThemeId(value: string | null): value is ThemeId {
  return value === "midnight" || value === "daylight";
}

export default function ThemeSwitcher({ className = "" }: { className?: string }) {
  const [theme, setThemeState] = useState<ThemeId>("midnight");
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem(storageKey);
    const currentTheme = document.documentElement.dataset.theme ?? null;
    const nextTheme = isThemeId(savedTheme)
      ? savedTheme
      : isThemeId(currentTheme)
        ? currentTheme
        : "midnight";

    window.queueMicrotask(() => {
      setThemeState(nextTheme);
      setHydrated(true);
    });
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    document.documentElement.dataset.theme = theme;
  }, [theme, hydrated]);

  const applyTheme = (next: ThemeId) => {
    setThemeState(next);
    document.documentElement.dataset.theme = next;
    localStorage.setItem(storageKey, next);
  };

  const toggleTheme = (event: MouseEvent<HTMLButtonElement>) => {
    const next: ThemeId = theme === "midnight" ? "daylight" : "midnight";
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const transitionDocument = document as ViewTransitionDocument;

    if (transitionDocument.startViewTransition && !prefersReducedMotion) {
      const { clientX, clientY } = event;
      const root = document.documentElement;
      const radius = Math.hypot(
        Math.max(clientX, window.innerWidth - clientX),
        Math.max(clientY, window.innerHeight - clientY),
      );

      root.style.setProperty("--theme-reveal-x", `${clientX}px`);
      root.style.setProperty("--theme-reveal-y", `${clientY}px`);
      root.style.setProperty("--theme-reveal-radius", `${radius}px`);

      const transition = transitionDocument.startViewTransition(() => applyTheme(next));
      transition.finished.finally(() => {
        root.style.removeProperty("--theme-reveal-x");
        root.style.removeProperty("--theme-reveal-y");
        root.style.removeProperty("--theme-reveal-radius");
      });
      return;
    }

    applyTheme(next);
  };

  const isLight = theme === "daylight";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`theme-toggle ${className}`.trim()}
      role="switch"
      aria-checked={isLight}
      aria-label={isLight ? "Switch to dark theme" : "Switch to white theme"}
    >
      <span className="theme-toggle-icon theme-toggle-icon--sun" aria-hidden="true">
        <SunIcon />
      </span>
      <span className="theme-toggle-icon theme-toggle-icon--moon" aria-hidden="true">
        <MoonIcon />
      </span>
      <motion.span
        className="theme-toggle-thumb"
        animate={{ x: isLight ? "100%" : "0%" }}
        transition={{ type: "spring", stiffness: 480, damping: 32 }}
      >
        <AnimatePresence mode="wait" initial={false}>
          {isLight ? (
            <motion.span
              key="sun"
              initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
              transition={{ duration: 0.22 }}
              className="theme-toggle-thumb-icon"
            >
              <SunIcon />
            </motion.span>
          ) : (
            <motion.span
              key="moon"
              initial={{ opacity: 0, rotate: 90, scale: 0.5 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: -90, scale: 0.5 }}
              transition={{ duration: 0.22 }}
              className="theme-toggle-thumb-icon"
            >
              <MoonIcon />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.span>
    </button>
  );
}

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="4.5" fill="currentColor" />
      <g stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
        <path d="M12 2.5v2.2" />
        <path d="M12 19.3v2.2" />
        <path d="M4.2 4.2l1.6 1.6" />
        <path d="M18.2 18.2l1.6 1.6" />
        <path d="M2.5 12h2.2" />
        <path d="M19.3 12h2.2" />
        <path d="M4.2 19.8l1.6-1.6" />
        <path d="M18.2 5.8l1.6-1.6" />
      </g>
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M20.2 14.6a8.4 8.4 0 1 1-10.8-10.8 8.4 8.4 0 0 0 10.8 10.8Z"
        fill="currentColor"
      />
    </svg>
  );
}
