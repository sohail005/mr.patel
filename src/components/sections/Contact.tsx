"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Lottie } from "lottie-react";
import { Mail, ShieldCheck } from "lucide-react";
import handshakeAnimation from "@/Assets/Business_Handshake.json";
import ScrollReveal from "@/components/effects/ScrollReveal";
import SocialLinks from "@/components/sections/SocialLinks";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import SectionLabel from "@/components/ui/SectionLabel";
import { sohailContact } from "@/data/sohail";

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

const inputClasses =
  "mt-2 w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-3 text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] outline-none transition-colors focus:border-[var(--color-primary-accent)]";

function ContactPitchCard() {
  return (
    <div className="flex h-full flex-col justify-between gap-8 rounded-2xl border border-[var(--color-border)] p-6 sm:p-8">
      <div>
        <span className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] px-4 py-2 font-mono text-xs uppercase tracking-[0.18em] text-[var(--color-text-primary)]">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--color-primary-accent)] opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--color-primary-accent)]" />
          </span>
          Available for new projects
        </span>

        <p className="mt-6 leading-7 text-[var(--color-text-secondary)]">
          I design and build fast, SEO-optimised web and mobile products that
          turn visitors into customers, engineered for rankings, speed and
          conversions.
        </p>

        <ul className="mt-6 space-y-3">
          {contactChecklist.map((item) => (
            <li key={item} className="flex items-start gap-3">
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-primary-accent)]" />
              <span className="text-sm text-[var(--color-text-primary)]">{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-[var(--color-border)] pt-6">
          <a
            href={`mailto:${sohailContact.email}`}
            className="inline-flex items-center gap-2 text-sm text-[var(--color-text-primary)] transition-colors hover:text-[var(--color-primary-accent)]"
          >
            <Mail size={16} strokeWidth={1.75} />
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
    if (!formState.name.trim() || !formState.email.trim()) {
      setError("Please fill in your name and email.");
      return;
    }
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
                className="relative z-10 mt-60 rounded-2xl bg-[var(--color-background)] p-10 text-center shadow-[0_22px_55px_rgba(0,0,0,0.42)] backdrop-blur-2xl"
                initial={{ y: -14, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.12, duration: 0.32, ease: "easeOut" }}
              >
                <p className="text-4xl font-bold text-[var(--color-text-primary)] sm:text-5xl">
                  Thank you!
                </p>
                <p className="mt-3 max-w-2xl text-base text-[var(--color-text-secondary)]">
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

      <Container>
        <ScrollReveal mode="inView" className="max-w-2xl">
          <SectionLabel>Contact</SectionLabel>
          <h2 className="text-section mt-4 font-sans font-semibold leading-[1.1] text-[var(--color-text-primary)]">
            Let&apos;s build something.
          </h2>
          <p className="mt-5 text-sm leading-6 text-[var(--color-text-secondary)] sm:text-base">
            Tell me what you are building. I will tell you where I can help.
          </p>
        </ScrollReveal>

        <div className="mt-10 grid items-stretch gap-6 sm:mt-12 lg:grid-cols-[0.42fr_0.58fr]">
          <ScrollReveal mode="inView" direction="up" className="h-full">
            <ContactPitchCard />
          </ScrollReveal>

          <ScrollReveal mode="inView" direction="up" className="h-full">
            <form
              onSubmit={handleSubmit}
              className="flex h-full flex-col rounded-2xl border border-[var(--color-border)] p-6 sm:p-8"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="block">
                  <span className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--color-text-muted)]">
                    Name
                  </span>
                  <input
                    type="text"
                    name="name"
                    placeholder="Your name"
                    aria-label="Name"
                    value={formState.name}
                    onChange={(event) =>
                      setFormState((state) => ({ ...state, name: event.target.value }))
                    }
                    className={inputClasses}
                  />
                </label>

                <label className="block">
                  <span className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--color-text-muted)]">
                    Email
                  </span>
                  <input
                    type="email"
                    name="email"
                    placeholder="you@example.com"
                    aria-label="Email"
                    value={formState.email}
                    onChange={(event) =>
                      setFormState((state) => ({ ...state, email: event.target.value }))
                    }
                    className={inputClasses}
                  />
                </label>
              </div>

              <div ref={serviceMenuRef} className="relative mt-5">
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--color-text-muted)]">
                  Service
                </span>
                <button
                  type="button"
                  aria-haspopup="listbox"
                  aria-expanded={serviceOpen}
                  onClick={() => setServiceOpen((open) => !open)}
                  className={`mt-2 flex min-h-[52px] w-full items-center justify-between gap-4 rounded-lg border px-4 py-3 text-left text-sm outline-none transition-colors ${
                    serviceOpen
                      ? "border-[var(--color-primary-accent)] bg-[var(--color-surface)]"
                      : "border-[var(--color-border)] bg-[var(--color-surface)] hover:border-[var(--color-border-strong)]"
                  }`}
                >
                  <span
                    className={
                      formState.service
                        ? "text-[var(--color-text-primary)]"
                        : "text-[var(--color-text-muted)]"
                    }
                  >
                    {formState.service || "Select a service"}
                  </span>
                  <span
                    aria-hidden="true"
                    className={`text-[var(--color-primary-accent)] transition-transform duration-300 ${serviceOpen ? "rotate-180" : ""}`}
                  >
                    ↓
                  </span>
                </button>

                {serviceOpen ? (
                  <div
                    role="listbox"
                    aria-label="Available services"
                    className="absolute inset-x-0 top-full z-30 mt-2 overflow-hidden rounded-lg border border-[var(--color-border-strong)] bg-[var(--color-background-secondary)] p-1.5 shadow-[0_22px_55px_rgba(0,0,0,0.42)]"
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
                        className={`flex w-full items-center justify-between rounded-md px-4 py-3 text-left text-sm transition-colors duration-200 ${
                          formState.service === service
                            ? "bg-[var(--color-surface)] text-[var(--color-text-primary)]"
                            : "text-[var(--color-text-muted)] hover:bg-[var(--color-surface)] hover:text-[var(--color-text-primary)]"
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
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--color-text-muted)]">
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
                  className={inputClasses}
                />
              </label>

              {error ? (
                <p className="mt-4 text-sm text-red-300">{error}</p>
              ) : null}

              <p className="flex items-center justify-center gap-2 py-8 text-xs font-medium text-[var(--color-text-muted)]">
                <ShieldCheck
                  size={13}
                  strokeWidth={2}
                  className="text-[var(--color-primary-accent)]"
                  aria-hidden="true"
                />
                Your details stay private — no spam, ever.
              </p>

              <Button type="submit" variant="primary" className="mt-auto w-full">
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
              </Button>
            </form>
          </ScrollReveal>
        </div>
      </Container>
    </section>
  );
}
