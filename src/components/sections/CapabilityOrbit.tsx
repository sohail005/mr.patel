"use client";

import { useEffect, useRef, useState } from "react";
import SectionLabel from "@/components/ui/SectionLabel";
import CapabilityGroup from "@/components/sections/CapabilityGroup";
import { CAPABILITY_LINKS } from "@/data/capabilityLinks";

type CapabilityOrbitProps = {
  title: string;
  items: string[];
};

const DEGREES_PER_MS = 360 / 26000;
const RADIUS = 100;

export default function CapabilityOrbit({ title, items }: CapabilityOrbitProps) {
  const [flat, setFlat] = useState(true);
  const [selected, setSelected] = useState<string | null>(null);
  const [rotation, setRotation] = useState(0);
  const pausedRef = useRef(false);
  const rafRef = useRef(0);
  const lastRef = useRef(0);

  useEffect(() => {
    const query = window.matchMedia("(min-width: 1024px) and (prefers-reduced-motion: no-preference)");
    const update = () => setFlat(!query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (flat) return;

    lastRef.current = performance.now();

    const tick = (now: number) => {
      const delta = now - lastRef.current;
      lastRef.current = now;
      if (!pausedRef.current) {
        setRotation((current) => (current + delta * DEGREES_PER_MS) % 360);
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [flat]);

  if (flat) {
    return <CapabilityGroup title={title} items={items} />;
  }

  return (
    <div
      className="flex flex-col items-center gap-6"
      onPointerEnter={() => {
        pausedRef.current = true;
      }}
      onPointerLeave={() => {
        pausedRef.current = false;
      }}
      onFocus={() => {
        pausedRef.current = true;
      }}
      onBlur={() => {
        pausedRef.current = false;
      }}
    >
      <SectionLabel>{title}</SectionLabel>

      <div
        className="relative flex w-full items-center justify-center"
        style={{ height: 120, perspective: "760px" }}
      >
        <div
          className="absolute"
          style={{ width: 1, height: 1, transformStyle: "preserve-3d" }}
        >
          {items.map((item, index) => {
            const baseAngle = (360 / items.length) * index;
            const effectiveAngle = baseAngle + rotation;
            const rad = (effectiveAngle * Math.PI) / 180;
            const depth = Math.cos(rad);
            const depthUnit = (depth + 1) / 2;
            const opacity = 0.12 + Math.pow(depthUnit, 1.8) * 0.88;
            const scale = 0.55 + Math.pow(depthUnit, 1.4) * 0.5;
            const visible = depth > -0.1;
            const isSelected = selected === item;
            const href = CAPABILITY_LINKS[item];

            const sharedStyle = {
              transform: `rotateY(${effectiveAngle}deg) translateZ(${RADIUS}px) rotateY(${-effectiveAngle}deg) scale(${scale}) translate(-50%, -50%)`,
              opacity,
              zIndex: Math.round(depth * 100),
              pointerEvents: visible ? ("auto" as const) : ("none" as const),
              borderColor: isSelected ? "var(--color-primary-accent)" : "var(--color-border)",
              color: isSelected ? "var(--color-text-primary)" : "var(--color-text-secondary)",
              background: isSelected
                ? "color-mix(in srgb, var(--color-primary-accent) 16%, transparent)"
                : "color-mix(in srgb, var(--color-background) 65%, transparent)",
            };
            const sharedClassName =
              "absolute flex items-center justify-center whitespace-nowrap rounded-full border px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.08em] transition-[border-color,background-color,color] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-background)]";

            if (href) {
              return (
                <a
                  key={item}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  data-cursor-label="Visit"
                  tabIndex={visible ? 0 : -1}
                  aria-hidden={!visible}
                  onPointerEnter={() => setSelected(item)}
                  onFocus={() => setSelected(item)}
                  onClick={() => setSelected(item)}
                  className={sharedClassName}
                  style={sharedStyle}
                >
                  {item}
                </a>
              );
            }

            return (
              <button
                key={item}
                type="button"
                data-cursor-label="Tech"
                tabIndex={visible ? 0 : -1}
                aria-hidden={!visible}
                onPointerEnter={() => setSelected(item)}
                onFocus={() => setSelected(item)}
                onClick={() => setSelected(item)}
                className={sharedClassName}
                style={sharedStyle}
              >
                {item}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
