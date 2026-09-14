"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import ScrollReveal from "@/components/effects/ScrollReveal";

type SocialIconName = "github" | "linkedin" | "threads" | "instagram" | "email";

const socialIconColors: Record<SocialIconName, string> = {
  github: "#f0f6fc",
  linkedin: "#0a66c2",
  threads: "#ffffff",
  instagram: "#e4405f",
  email: "#ea4335",
};

const socials: { label: string; href: string; icon: SocialIconName }[] = [
  { label: "GitHub", href: "https://github.com/sohail005", icon: "github" },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/md-sohail-a63a321b1/",
    icon: "linkedin",
  },
  { label: "Threads", href: "https://www.threads.com/@sohail.code", icon: "threads" },
  { label: "Instagram", href: "https://www.instagram.com/sohail.code/", icon: "instagram" },
  { label: "Email", href: "mailto:sohail345patel@gmail.com", icon: "email" },
];

const serviceOptions = [
  "App Deployment Services",
  "Complete App Development",
  "Website Development",
  "Development Training",
];

function SocialIcon({ name }: { name: SocialIconName }) {
  const commonProps = {
    "aria-hidden": true,
    className: "h-9 w-9 transition-transform duration-300 group-hover:scale-110",
    fill: "none",
    stroke: "currentColor",
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    strokeWidth: 1.8,
    style: { color: socialIconColors[name] },
    viewBox: "0 0 24 24",
  };

  if (name === "github") {
    return (
      <svg {...commonProps} fill="currentColor" stroke="none">
        <path d="M12 2.5a9.5 9.5 0 0 0-3 18.51c.48.09.65-.21.65-.46v-1.67c-2.65.58-3.21-1.12-3.21-1.12-.44-1.1-1.06-1.39-1.06-1.39-.86-.59.07-.58.07-.58.95.07 1.45.98 1.45.98.85 1.45 2.23 1.03 2.77.79.09-.62.33-1.03.6-1.27-2.12-.24-4.35-1.06-4.35-4.72 0-1.04.37-1.89.98-2.56-.1-.24-.42-1.21.09-2.52 0 0 .8-.26 2.62.98a9.1 9.1 0 0 1 4.76 0c1.82-1.24 2.62-.98 2.62-.98.51 1.31.19 2.28.09 2.52.61.67.98 1.52.98 2.56 0 3.67-2.24 4.48-4.37 4.72.34.3.64.88.64 1.77v2.62c0 .25.17.55.66.46A9.5 9.5 0 0 0 12 2.5Z" />
      </svg>
    );
  }

  if (name === "linkedin") {
    return (
      <svg {...commonProps}>
        <path d="M7 9.5v7M7 6.5v.01M11 16.5v-4a3 3 0 0 1 6 0v4M11 9.5v7" />
      </svg>
    );
  }

  if (name === "instagram") {
    return (
      <svg {...commonProps}>
        <rect x="3.5" y="3.5" width="17" height="17" rx="4" />
        <circle cx="12" cy="12" r="4" />
        <path d="M17.5 6.5h.01" />
      </svg>
    );
  }

  if (name === "threads") {
    return (
      <svg {...commonProps}>
        <path d="M17.7 11.4c-.28-3.08-2.2-5.1-5.4-5.1-3.46 0-5.58 2.24-5.58 5.7 0 3.55 2.16 5.7 5.5 5.7 2.63 0 4.42-1.43 4.42-3.53 0-1.85-1.3-3.06-3.37-3.06-2.2 0-3.3 1.05-3.3 2.37 0 1.03.74 1.7 1.9 1.7 1.21 0 2.05-.71 2.05-1.82 0-2.22-1.59-3.96-4.08-3.96" />
      </svg>
    );
  }

  return (
    <svg {...commonProps}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m4 7 8 6 8-6" />
    </svg>
  );
}

function SocialButton({ label, href, icon }: (typeof socials)[number]) {
  const isEmail = href.startsWith("mailto:");

  return (
    <motion.a
      href={href}
      target={isEmail ? undefined : "_blank"}
      rel={isEmail ? undefined : "noopener noreferrer"}
      whileHover={{ y: -4, scale: 1.015 }}
      whileTap={{ scale: 0.98 }}
      className="social-orbit-button group relative flex min-h-14 items-center justify-between overflow-hidden rounded-[1.25rem] border border-[var(--surface-border)] px-4 py-4 text-sm text-[var(--color-text-muted)]"
    >
      <span className="" aria-hidden="true" />
      <span className="relative z-10 flex flex-1 items-center justify-start gap-3 text-left">
        <span className="" aria-hidden="true">
          <SocialIcon name={icon} />
        </span>
        <span className="text-left transition-colors duration-300 group-hover:text-[var(--color-text)]">
          {label}
        </span>
      </span>
    </motion.a>
  );
}

export default function Contact() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    service: "",
    message: "",
  });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [serviceOpen, setServiceOpen] = useState(false);
  const serviceMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      if (!serviceMenuRef.current?.contains(event.target as Node)) {
        setServiceOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setServiceOpen(false);
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!formState.service) {
      setError("Please select a service before sending your message.");
      return;
    }
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
      setFormState({ name: "", email: "", service: "", message: "" });
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
          <h2 className="section-heading mt-4 text-[var(--color-text)]">
            Tell me what you are building. I will tell you where I can help.
          </h2>
        </ScrollReveal>

        <div className="mt-14 grid gap-6 lg:grid-cols-[0.42fr_0.58fr]">
          <ScrollReveal mode="inView" direction="left">
            <div className="story-card rounded-[2rem] p-8">
              <p className="font-mono text-[10px] uppercase tracking-[0.26em] text-[var(--color-primary)]">
                Reach out
              </p>
              <p className="mt-6 text-lg leading-8 text-[var(--color-text-muted)]">
                I&apos;m open to mobile apps, web products, dashboards, and
                interfaces where the details matter after launch.
              </p>

              <div className="mt-5 grid grid-cols-2 gap-3">
                {socials.map((social) => (
                  <SocialButton key={social.label} {...social} />
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
                    placeholder="Your name"
                    suppressHydrationWarning
                    value={formState.name}
                    onChange={(event) =>
                      setFormState((state) => ({ ...state, name: event.target.value }))
                    }
                    className="mt-3 w-full rounded-[1.25rem] border border-[var(--surface-border)] bg-[var(--control-bg)] px-4 py-3 text-[var(--color-text)] outline-none focus:border-[var(--color-primary)]"
                  />
                </label>

                <label className="block">
                  <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-[var(--color-text-muted)]">
                    Email
                  </span>
                  <input
                    type="email"
                    required
                    placeholder="you@example.com"
                    suppressHydrationWarning
                    value={formState.email}
                    onChange={(event) =>
                      setFormState((state) => ({ ...state, email: event.target.value }))
                    }
                    className="mt-3 w-full rounded-[1.25rem] border border-[var(--surface-border)] bg-[var(--control-bg)] px-4 py-3 text-[var(--color-text)] outline-none focus:border-[var(--color-primary)]"
                  />
                </label>
              </div>

              <div ref={serviceMenuRef} className="relative mt-5">
                <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-[var(--color-text-muted)]">
                  Service
                </span>
                <button
                  type="button"
                  aria-haspopup="listbox"
                  aria-expanded={serviceOpen}
                  onClick={() => setServiceOpen((open) => !open)}
                  className={`mt-3 flex min-h-14 w-full items-center justify-between gap-4 rounded-[1.25rem] border px-4 py-3 text-left text-sm outline-none transition-[border-color,background-color,box-shadow] duration-300 ${
                    serviceOpen
                      ? "border-[var(--color-primary)] bg-[var(--control-bg-hover)] shadow-[0_0_0_3px_color-mix(in_srgb,var(--color-primary)_12%,transparent)]"
                      : "border-[var(--surface-border)] bg-[var(--control-bg)] hover:border-[var(--surface-border-strong)]"
                  }`}
                >
                  <span className={formState.service ? "text-[var(--color-text)]" : "text-[var(--color-text-muted)]"}>
                    {formState.service || "Select a service"}
                  </span>
                  <span
                    aria-hidden="true"
                    className={`text-[var(--color-primary)] transition-transform duration-300 ${serviceOpen ? "rotate-180" : ""}`}
                  >
                    ↓
                  </span>
                </button>

                {serviceOpen ? (
                  <div
                    role="listbox"
                    aria-label="Available services"
                    className="absolute inset-x-0 top-full z-30 mt-2 overflow-hidden rounded-[1.25rem] border border-[var(--surface-border-strong)] bg-[var(--color-panel-strong)] p-1.5 shadow-[0_22px_55px_rgba(0,0,0,0.42)] backdrop-blur-2xl"
                  >
                    {serviceOptions.map((service) => (
                      <button
                        key={service}
                        type="button"
                        role="option"
                        aria-selected={formState.service === service}
                        onClick={() => {
                          setFormState((state) => ({ ...state, service }));
                          setServiceOpen(false);
                        }}
                        className={`flex w-full items-center justify-between rounded-[0.9rem] px-4 py-3 text-left text-sm transition-colors duration-200 ${
                          formState.service === service
                            ? "bg-[var(--primary-action-bg)] text-[var(--color-text)]"
                            : "text-[var(--color-text-muted)] hover:bg-[var(--control-bg-hover)] hover:text-[var(--color-text)]"
                        }`}
                      >
                        <span>{service}</span>
                        {formState.service === service ? <span aria-hidden="true">✓</span> : null}
                      </button>
                    ))}
                  </div>
                ) : null}
              </div>

              <label className="mt-5 block">
                <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-[var(--color-text-muted)]">
                  Message
                </span>
                <textarea
                  required
                  rows={6}
                  placeholder="Tell me about your project, goals, and timeline..."
                  suppressHydrationWarning
                  value={formState.message}
                  onChange={(event) =>
                    setFormState((state) => ({ ...state, message: event.target.value }))
                  }
                  className="mt-3 w-full rounded-[1.5rem] border border-[var(--surface-border)] bg-[var(--control-bg)] px-4 py-3 text-[var(--color-text)] outline-none focus:border-[var(--color-primary)]"
                />
              </label>

              {error ? (
                <p className="mt-4 text-sm text-red-300">{error}</p>
              ) : null}

              <motion.button
                type="submit"
                disabled={sending}
                aria-busy={sending}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.99 }}
                className="mt-6 flex w-full items-center justify-center gap-3 rounded-full border border-[var(--primary-action-border)] bg-[var(--primary-action-bg)] px-6 py-4 font-mono text-[11px] uppercase tracking-[0.28em] text-[var(--primary-action-text)] disabled:cursor-wait disabled:opacity-60"
              >
                {sending ? (
                  <>
                    <span
                      aria-hidden="true"
                      className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-current border-t-transparent"
                    />
                    <span>Sending...</span>
                  </>
                ) : sent ? (
                  "Message sent"
                ) : (
                  "Send message"
                )}
              </motion.button>
            </form>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
