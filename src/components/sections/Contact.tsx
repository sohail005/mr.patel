"use client";

import { FormEvent, useState } from "react";
import { motion } from "framer-motion";
import ScrollReveal from "@/components/effects/ScrollReveal";

const socials = [
  { label: "GitHub", href: "https://github.com/sohail005" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/md-sohail-a63a321b1/" },
  { label: "Threads", href: "https://www.threads.com/@sohail.code" },
  { label: "Email", href: "mailto:sohail345patel@gmail.com" },
];

export default function Contact() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setSending(true);
    setError("");

    try {
      const response = await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formState),
      });
      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error || "Unable to send message.");
      }

      setSent(true);
      setFormState({ name: "", email: "", message: "" });
      setTimeout(() => setSent(false), 4000);
    } catch (caughtError) {
      setError(
        caughtError instanceof Error
          ? caughtError.message
          : "Unable to send message right now."
      );
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" className="relative py-28">
      <div className="mx-auto max-w-6xl px-6">
        <ScrollReveal mode="inView" className="max-w-3xl">
          <p className="section-kicker">Contact</p>
          <h2 className="section-heading mt-4 text-white">
            If the build needs care, direction, and motion discipline, let&apos;s
            talk.
          </h2>
        </ScrollReveal>

        <div className="mt-14 grid gap-6 lg:grid-cols-[0.42fr_0.58fr]">
          <ScrollReveal mode="inView" direction="left">
            <div className="story-card rounded-[2rem] p-8">
              <p className="font-mono text-[10px] uppercase tracking-[0.26em] text-[var(--color-primary)]">
                Reach out
              </p>
              <p className="mt-6 text-lg leading-8 text-[var(--color-text-muted)]">
                I&apos;m open to product work, interface-heavy builds, and
                animation-driven frontends that still need engineering rigor.
              </p>

              <div className="mt-10 space-y-3">
                {socials.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target={social.href.startsWith("mailto:") ? undefined : "_blank"}
                    rel={social.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                    className="flex items-center justify-between rounded-[1.25rem] border border-white/10 bg-white/5 px-4 py-4 text-sm text-[var(--color-text-muted)] hover:text-white"
                  >
                    <span>{social.label}</span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-[var(--color-primary)]">
                      Open
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal mode="inView" direction="right">
            <form onSubmit={handleSubmit} className="story-card rounded-[2rem] p-8">
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="block">
                  <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-[var(--color-text-muted)]">
                    Name
                  </span>
                  <input
                    type="text"
                    required
                    suppressHydrationWarning
                    value={formState.name}
                    onChange={(event) =>
                      setFormState((state) => ({ ...state, name: event.target.value }))
                    }
                    className="mt-3 w-full rounded-[1.25rem] border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-[var(--color-primary)]"
                  />
                </label>

                <label className="block">
                  <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-[var(--color-text-muted)]">
                    Email
                  </span>
                  <input
                    type="email"
                    required
                    suppressHydrationWarning
                    value={formState.email}
                    onChange={(event) =>
                      setFormState((state) => ({ ...state, email: event.target.value }))
                    }
                    className="mt-3 w-full rounded-[1.25rem] border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-[var(--color-primary)]"
                  />
                </label>
              </div>

              <label className="mt-5 block">
                <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-[var(--color-text-muted)]">
                  Message
                </span>
                <textarea
                  required
                  rows={6}
                  suppressHydrationWarning
                  value={formState.message}
                  onChange={(event) =>
                    setFormState((state) => ({ ...state, message: event.target.value }))
                  }
                  className="mt-3 w-full rounded-[1.5rem] border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-[var(--color-primary)]"
                />
              </label>

              {error ? (
                <p className="mt-4 text-sm text-red-300">{error}</p>
              ) : null}

              <motion.button
                type="submit"
                disabled={sending}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.99 }}
                className="mt-6 w-full rounded-full border border-[rgba(143,199,255,0.22)] bg-[rgba(143,199,255,0.12)] px-6 py-4 font-mono text-[11px] uppercase tracking-[0.28em] text-white disabled:opacity-60"
              >
                {sent ? "Message sent" : sending ? "Sending" : "Send message"}
              </motion.button>
            </form>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
