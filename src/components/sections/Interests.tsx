"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Container from "@/components/ui/Container";
import SectionLabel from "@/components/ui/SectionLabel";
import { interests } from "@/data/interests";

export default function Interests() {
  const [selected, setSelected] = useState<string[]>([]);

  const toggle = (id: string) => {
    setSelected((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]));
  };

  return (
    <section id="interests" className="relative overflow-hidden py-16 sm:py-20 lg:py-24">
      <Container>
        <div className="max-w-2xl">
          <SectionLabel>Beyond the code</SectionLabel>
          <h2 className="mt-4 text-[clamp(1.25rem,2.5vw,2.5rem)] font-sans font-semibold leading-[1.1] text-[var(--color-text-primary)]">
            A few things outside of shipping products.
          </h2>
        </div>

        <div className="mt-10 flex flex-wrap gap-3 sm:mt-12 sm:gap-4">
          {interests.map((item) => {
            const isSelected = selected.includes(item.id);
            return (
              <motion.button
                key={item.id}
                type="button"
                animate={{ scale: isSelected ? 1.06 : 1 }}
                whileTap={{ scale: 0.92 }}
                transition={{ type: "spring", stiffness: 500, damping: 16 }}
                onClick={() => toggle(item.id)}
                className={`flex items-center gap-2 whitespace-nowrap rounded-full border px-4 py-2 font-mono text-xs uppercase tracking-[0.08em] transition-colors duration-200 sm:px-5 sm:py-2.5 sm:text-sm ${
                  isSelected
                    ? "border-[var(--color-primary-accent)] bg-[color-mix(in_srgb,var(--color-primary-accent)_10%,transparent)] text-[var(--color-text-primary)]"
                    : "border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-[var(--color-border-strong)] hover:text-[var(--color-text-primary)]"
                }`}
              >
                <motion.span
                  aria-hidden="true"
                  animate={{ scale: isSelected ? 1.25 : 1, rotate: isSelected ? -8 : 0 }}
                  transition={{ type: "spring", stiffness: 500, damping: 14 }}
                >
                  {item.emoji}
                </motion.span>
                <span>{item.label}</span>
              </motion.button>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
