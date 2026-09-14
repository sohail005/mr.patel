"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Lottie } from "lottie-react";
import { useEffect, useMemo, useState } from "react";
import loadingAnimation from "@/Assets/loading.json";

const roles = ["SOFTWARE", "MOBILE", "WEB", "PRODUCT"];

export default function StartExperience() {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);

  const paddedProgress = useMemo(
    () => String(progress).padStart(3, "0"),
    [progress]
  );

  useEffect(() => {
    let frame = 0;
    const start = performance.now();
    const duration = 2600;

    const tick = (now: number) => {
      const elapsed = now - start;
      const next = Math.min(100, Math.round((elapsed / duration) * 100));

      setProgress(next);

      if (next < 100) {
        frame = requestAnimationFrame(tick);
        return;
      }

      window.setTimeout(() => setVisible(false), 520);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (!visible) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [visible]);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: "-100%" }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          className="start-experience fixed inset-0 z-[9998] overflow-hidden bg-[#050505] text-white"
        >
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: progress / 100 }}
            transition={{ duration: 0.24, ease: "easeOut" }}
            className="absolute left-0 top-0 h-1 w-full origin-left bg-white"
          />

          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_24%,rgba(143,199,255,0.16),transparent_28%),linear-gradient(180deg,#050505_0%,#0b1118_100%)]" />
          <motion.div
            animate={{ x: ["-22%", "18%", "-22%"], opacity: [0.22, 0.54, 0.22] }}
            transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/2 h-px w-[140vw] -translate-y-1/2 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.7),transparent)]"
          />

          <div className="relative z-10 flex min-h-screen flex-col justify-between px-6 py-7 sm:px-10 lg:px-14">
            <div className="grid items-start gap-6 md:grid-cols-[auto_minmax(14rem,24rem)] md:justify-between">
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-white/52">
                  Presenting {paddedProgress} / 100
                </p>
                <div className="mt-4 h-px w-48 overflow-hidden bg-white/12">
                  <motion.div
                    animate={{ x: ["-100%", "100%"] }}
                    transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
                    className="h-full w-24 bg-white/80"
                  />
                </div>
              </div>

              <div className="justify-self-start md:justify-self-end">
                <div className="h-20 w-[min(82vw,24rem)] overflow-hidden opacity-90 mix-blend-screen md:-mt-4">
                 
                </div>
                <p className="-mt-2 hidden text-right font-mono text-[11px] uppercase tracking-[0.28em] text-white/44 sm:block">
                  Compiling experience v 2026
                </p>
              </div>
            </div>

            <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
              <div className="flex flex-row gap-2 lg:gap-4 justify-start lg:justify-end">
                <motion.p
                  initial={{ opacity: 0, y: 26 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.18, ease: "easeOut" }}
                  className=" text-[clamp(2rem,15vw,13rem)] font-bold leading-[0.82] tracking-[-0.06em] text-white/90 lg:text-[clamp(2rem,15vw,16rem)]"
                >
                  Sohail
                  <br />
                  Patel.
                </motion.p>
                 <Lottie
                    src={loadingAnimation}
                    autoplay
                    loop
                    className="h-full w-full"
                  />
              </div>

              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.46, ease: "easeOut" }}
                className="flex flex-wrap gap-2 lg:max-w-[22rem] lg:justify-end"
              >
                {roles.map((role, index) => (
                  <motion.span
                    key={role}
                    animate={{ opacity: [0.42, 1, 0.42] }}
                    transition={{
                      duration: 1.7,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: index * 0.16,
                    }}
                    className="rounded-full border border-white/14 bg-white/6 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.26em] text-white/70"
                  >
                    {role}
                  </motion.span>
                ))}
              </motion.div>
            </div>

            <div className="grid gap-4 border-t border-white/10 pt-5 sm:grid-cols-3">
              {[
                ["Identity", "Software developer"],
                ["Focus", "Web and mobile systems"],
                ["Mode", "Motion-led product craft"],
              ].map(([label, value]) => (
                <div key={label} className="flex items-center justify-between gap-5">
                  <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-white/36">
                    {label}
                  </span>
                  <span className="text-right text-sm text-white/70">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
