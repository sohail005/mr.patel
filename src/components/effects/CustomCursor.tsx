"use client";

import { useEffect, useRef, useState } from "react";

const INTERACTIVE_SELECTOR = 'a, button, [role="button"], input, textarea, select, [data-cursor]';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [enabled] = useState(() => {
    if (typeof window === "undefined") return false;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    return fine && !reduced;
  });
  const [hovering, setHovering] = useState(false);
  const [label, setLabel] = useState<string | null>(null);

  useEffect(() => {
    if (!enabled) return;

    document.documentElement.classList.add("cursor-active");

    let dotX = window.innerWidth / 2;
    let dotY = window.innerHeight / 2;
    let ringX = dotX;
    let ringY = dotY;
    let targetX = dotX;
    let targetY = dotY;
    let rafId = 0;

    const onMove = (event: PointerEvent) => {
      targetX = event.clientX;
      targetY = event.clientY;

      const target = event.target as Element | null;
      const interactive = target?.closest(INTERACTIVE_SELECTOR);
      setHovering(Boolean(interactive));
      setLabel(interactive?.getAttribute("data-cursor-label") ?? null);
    };

    const tick = () => {
      dotX = targetX;
      dotY = targetY;
      ringX += (targetX - ringX) * 0.18;
      ringY += (targetY - ringY) * 0.18;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${dotX}px, ${dotY}px, 0) translate(-50%, -50%)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
      }
      rafId = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    rafId = requestAnimationFrame(tick);

    return () => {
      document.documentElement.classList.remove("cursor-active");
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(rafId);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={dotRef}
        className="custom-cursor"
        aria-hidden="true"
        style={{
          width: 6,
          height: 6,
          background: "var(--color-text-primary)",
        }}
      />
      <div
        ref={ringRef}
        className="custom-cursor flex items-center justify-center border transition-[width,height,opacity] duration-200 ease-out"
        aria-hidden="true"
        style={{
          width: hovering ? 64 : 32,
          height: hovering ? 64 : 32,
          borderColor: "var(--color-primary-accent)",
          opacity: hovering ? 0.9 : 0.5,
        }}
      >
        {label ? (
          <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-[var(--color-text-primary)]">
            {label}
          </span>
        ) : null}
      </div>
    </>
  );
}
