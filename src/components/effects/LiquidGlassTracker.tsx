"use client";

import { useEffect } from "react";

const GLASS_SELECTOR = ".story-card, .panel-shell, .glass-card";

export default function LiquidGlassTracker() {
  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let current: HTMLElement | null = null;

    const onMove = (e: PointerEvent) => {
      const target = (e.target as HTMLElement)?.closest<HTMLElement>(GLASS_SELECTOR);

      if (target !== current) {
        current?.style.setProperty("--glass-glow", "0");
        current = target;
      }

      if (!target) return;

      const rect = target.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      target.style.setProperty("--gx", `${x}%`);
      target.style.setProperty("--gy", `${y}%`);
      target.style.setProperty("--glass-glow", "1");
    };

    const onLeave = () => {
      current?.style.setProperty("--glass-glow", "0");
      current = null;
    };

    document.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave, { passive: true });

    return () => {
      document.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return null;
}
