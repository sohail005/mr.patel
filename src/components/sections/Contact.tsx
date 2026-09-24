"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Lottie } from "lottie-react";
import handshakeAnimation from "@/Assets/Business_Handshake.json";
import ScrollReveal from "@/components/effects/ScrollReveal";
import SocialLinks from "@/components/sections/SocialLinks";
import { ShieldCheck } from "lucide-react";

const serviceOptions = [
  "App Deployment Services",
  "Complete App Development",
  "Website Development",
  "Development Training",
];

const contactChecklist = [
  "SEO-ready, engineered to rank on Google",
  "Lightning-fast, animated & mobile-first",
  "Designed to turn visitors into customers",
];

const pastCompanies = [
  "Fossil",
  "Opus Virtual Offices",
  "Jockey",
  "Hopp",
  "Pro 5 Networking",
  "Finecart",
  "Reval ERP",
];

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="h-3.5 w-3.5"
      aria-hidden="true"
    >
      <path
        d="M5 12.5 10 17 19 7"
        stroke="currentColor"
        strokeWidth={2.4}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
      <rect
        x="3"
        y="5"
        width="18"
        height="14"
        rx="2"
        stroke="currentColor"
        strokeWidth={1.8}
      />
      <path
        d="m4 7 8 6 8-6"
        stroke="currentColor"
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ContactPitchCard() {
  return (
    <div className="story-card flex h-full flex-col justify-between gap-8 rounded-[1.4rem] p-6 sm:rounded-4xl sm:p-8">
      <div>
        <span className="inline-flex items-center gap-2 rounded-full border border-[var(--surface-border)] bg-[var(--control-bg)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-text)]">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-secondary opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-secondary" />
          </span>
          Available for new projects
        </span>

        <p className="mt-6 text-caption font-mono uppercase tracking-[0.28em] text-[#e2793d]">
          Free consultation
        </p>
        <h3 className="mt-3 italic font-[family-name:var(--font-playfair)] text-4xl font-black leading-[1.05] tracking-tight text-[var(--color-text)] sm:text-5xl">
          Let&apos;s build something{" "}
          <span className="italic font-[family-name:var(--font-playfair)] font-bold text-[#e2793d]">
            that ships.
          </span>
        </h3>
        <p className="mt-5 leading-7 text-[var(--color-text-muted)]">
          I design and build fast, SEO-optimised web and mobile products that
          turn visitors into customers, engineered for rankings, speed and
          conversions.
        </p>

        <ul className="mt-6 space-y-3">
          {contactChecklist.map((item) => (
            <li key={item} className="flex items-center gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#e2793d] text-white shadow-[0_2px_8px_rgba(226,121,61,0.4)]">
                <CheckIcon />
              </span>
              <span className="text-base text-[var(--color-text)]">{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <div className="border-t border-[var(--surface-border)] pt-6">
          <p className="text-caption font-mono font-bold uppercase tracking-[0.24em] text-[var(--color-text-muted)]">
            Experience across
          </p>
          <p className="mt-3 flex flex-wrap gap-x-2 gap-y-1 text-xs font-bold uppercase tracking-[0.08em] text-[var(--color-text-muted)]">
            {pastCompanies.map((company, index) => (
              <span key={company}>
                {company}
                {index < pastCompanies.length - 1 ? (
                  <span className="ml-2"></span>
                ) : null}
              </span>
            ))}
          </p>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
          <a
            href="mailto:sohail345patel@gmail.com"
            className="inline-flex items-center gap-2 text-sm text-[var(--color-text)] transition-colors duration-300 hover:text-[var(--color-primary)]"
          >
            <MailIcon />
            Email me
          </a>
          <SocialLinks showLabel={false} />
        </div>
      </div>
    </div>
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
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false);
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

  useEffect(() => {
    if (!sent) return;

    const timeout = window.setTimeout(() => setSent(false), 4000);
    return () => window.clearTimeout(timeout);
  }, [sent]);

  useEffect(() => {
    if (!showSuccessAnimation) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setShowSuccessAnimation(false);
    };
    const timeout = window.setTimeout(
      () => setShowSuccessAnimation(false),
      3200,
    );

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      window.clearTimeout(timeout);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [showSuccessAnimation]);

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
      setShowSuccessAnimation(true);
      setFormState({ name: "", email: "", service: "", message: "" });
    } catch (caughtError) {
      setError(
        caughtError instanceof Error
          ? caughtError.message
          : "Unable to send message right now.",
      );
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" className="relative py-16 sm:py-20 lg:py-24">
      <AnimatePresence>
        {showSuccessAnimation ? (
          <motion.div
            aria-modal="true"
            className="fixed inset-0 z-10000 flex items-center justify-center bg-transparent"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            onClick={() => setShowSuccessAnimation(false)}
          >
            <motion.div
              className="flex h-screen w-screen flex-col items-center justify-center overflow-hidden text-center"
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.98, opacity: 0 }}
              transition={{ duration: 0.28, ease: "easeOut" }}
              onClick={(event) => event.stopPropagation()}
            >
              <motion.div
                className="relative z-10 mt-60 bg-background p-10 text-center rounded-2xl shadow-[0_22px_55px_rgba(0,0,0,0.42)] backdrop-blur-2xl "
                initial={{ y: -14, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.12, duration: 0.32, ease: "easeOut" }}
              >
                <p className="text-4xl font-bold text-text sm:text-5xl">
                  Thank you!
                </p>
                <p className="text-body-lg mt-3 max-w-2xl text-text-muted">
                  Your message has been sent successfully. I will get back to
                  you soon.
                </p>
              </motion.div>
              <Lottie
                src={handshakeAnimation}
                autoplay
                loop={false}
                className="h-auto w-[140vw] min-w-[140vw] max-w-none shrink-0"
              />
            </motion.div>
            <button
              type="button"
              aria-label="Close success animation"
              className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/10 text-2xl leading-none text-white hover:bg-white/16 focus:outline-none focus:ring-2 focus:ring-white/50"
              onClick={() => setShowSuccessAnimation(false)}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </motion.div>
        ) : null}
      </AnimatePresence>
      <div className="mx-auto max-w-6xl px-6">
        <ScrollReveal mode="inView" className="max-w-3xl">
          <p className="section-kicker">Contact</p>
          <h2 className="section-heading mt-4">
            Tell me what you are building. I will tell you where I can help.
          </h2>
        </ScrollReveal>

        <div className="mt-9 grid items-stretch gap-5 sm:mt-10 sm:gap-6 lg:grid-cols-[0.42fr_0.58fr]">
          <ScrollReveal mode="inView" direction="up" className="h-full">
            <ContactPitchCard />
          </ScrollReveal>

          <ScrollReveal mode="inView" direction="up" className="h-full">
            <form
              onSubmit={handleSubmit}
              className="story-card flex h-full flex-col rounded-[1.4rem] p-6 sm:rounded-[2rem] sm:p-8"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="block">
                  <span className="text-caption font-mono uppercase tracking-[0.24em] text-[var(--color-text-muted)]">
                    Name
                  </span>
                  <input
                    type="text"
                    required
                    placeholder="Your name"
                    suppressHydrationWarning
                    value={formState.name}
                    onChange={(event) =>
                      setFormState((state) => ({
                        ...state,
                        name: event.target.value,
                      }))
                    }
                    className="mt-3 w-full rounded-[1.25rem] border border-[var(--surface-border)] bg-[var(--control-bg)] px-4 py-3 text-[var(--color-text)] outline-none focus:border-[var(--color-primary)]"
                  />
                </label>

                <label className="block">
                  <span className="text-caption font-mono uppercase tracking-[0.24em] text-[var(--color-text-muted)]">
                    Email
                  </span>
                  <input
                    type="email"
                    required
                    placeholder="you@example.com"
                    suppressHydrationWarning
                    value={formState.email}
                    onChange={(event) =>
                      setFormState((state) => ({
                        ...state,
                        email: event.target.value,
                      }))
                    }
                    className="mt-3 w-full rounded-[1.25rem] border border-[var(--surface-border)] bg-[var(--control-bg)] px-4 py-3 text-[var(--color-text)] outline-none focus:border-[var(--color-primary)]"
                  />
                </label>
              </div>

              <div ref={serviceMenuRef} className="relative mt-5">
                <span className="text-caption font-mono uppercase tracking-[0.24em] text-[var(--color-text-muted)]">
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
                  <span
                    className={
                      formState.service
                        ? "text-[var(--color-text)]"
                        : "text-[var(--color-text-muted)]"
                    }
                  >
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
                        {formState.service === service ? (
                          <span aria-hidden="true">✓</span>
                        ) : null}
                      </button>
                    ))}
                  </div>
                ) : null}
              </div>

              <label className="mt-5 block">
                <span className="text-caption font-mono uppercase tracking-[0.24em] text-[var(--color-text-muted)]">
                  Message
                </span>
                <textarea
                  required
                  rows={6}
                  placeholder="Tell me about your project, goals, and timeline..."
                  suppressHydrationWarning
                  value={formState.message}
                  onChange={(event) =>
                    setFormState((state) => ({
                      ...state,
                      message: event.target.value,
                    }))
                  }
                  className="mt-3 w-full rounded-[1.5rem] border border-[var(--surface-border)] bg-[var(--control-bg)] px-4 py-3 text-[var(--color-text)] outline-none focus:border-[var(--color-primary)]"
                />
              </label>

              {error ? (
                <p className="mt-4 text-sm text-red-300">{error}</p>
              ) : null}

              <p className="flex items-center justify-center pt-10 gap-2 text-[12px] font-medium text-[#141B1A]/40">
                <ShieldCheck
                  size={13}
                  strokeWidth={2}
                  className="text-[#C56E3D]"
                  aria-hidden="true"
                />
                Your details stay private — no spam, ever.
              </p>

              <motion.button
                type="submit"
                disabled={sending}
                aria-busy={sending}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.99 }}
                className="text-button mt-auto flex w-full items-center justify-center gap-3 rounded-full border border-[var(--primary-action-border)] bg-[var(--primary-action-bg)] px-6 py-4 font-mono uppercase tracking-[0.28em] text-[var(--primary-action-text)] disabled:cursor-wait disabled:opacity-60"
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
