"use client";

import { FormEvent, KeyboardEvent, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { getChatResponse } from "@/lib/portfolio-chat/responseGenerator";
import type { ChatContext, ChatMessage, ChatResponse } from "@/types/portfolio-chat";

const storageKey = "ask-sohail-chat-v1";
const maxInputLength = 300;

const initialResponse: ChatResponse = {
  type: "text",
  message:
    "Hi. I'm Sohail's portfolio assistant. I can help you explore his skills, experience, projects, services, and professional work.",
  suggestions: [
    "About Sohail",
    "Skills",
    "React Native Experience",
    "Featured Projects",
    "Services",
    "Why Hire Sohail?",
    "Contact Sohail",
  ],
};

function createId() {
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function AssistantGlyph() {
  return (
    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[color-mix(in_srgb,var(--color-primary)_38%,transparent)] bg-[color-mix(in_srgb,var(--color-primary)_13%,transparent)] text-[var(--color-primary)] shadow-[0_0_24px_color-mix(in_srgb,var(--color-primary)_20%,transparent)]">
      <svg aria-hidden="true" className="h-4 w-4" viewBox="0 0 24 24" fill="none">
        <path d="M12 3l1.7 5.2L19 10l-5.3 1.8L12 17l-1.7-5.2L5 10l5.3-1.8L12 3Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
        <path d="M19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8L19 15Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

function trustedTarget(href: string) {
  return href.startsWith("http") ? "_blank" : undefined;
}

function ResponseDetails({ response }: { response: ChatResponse }) {
  return (
    <div className="mt-3 space-y-3">
      {response.skills?.map((group) => (
        <div key={group.title} className="rounded-2xl border border-white/10 bg-white/[0.045] p-3">
          <p className="text-caption font-mono uppercase tracking-[0.22em] text-[var(--color-primary)]">
            {group.title}
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            {group.items.map((item) => (
              <span key={item} className="rounded-full border border-white/10 bg-white/[0.055] px-3 py-1 text-xs text-[var(--color-text)]">
                {item}
              </span>
            ))}
          </div>
        </div>
      ))}

      {response.services?.map((service) => (
        <div key={service.id} className="rounded-2xl border border-white/10 bg-white/[0.045] p-3">
          <p className="font-semibold text-[var(--color-text)]">{service.title}</p>
          <p className="mt-1 text-sm leading-6 text-[var(--color-text-muted)]">{service.description}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {service.capabilities.slice(0, 4).map((item) => (
              <span key={item} className="text-sm rounded-full border border-white/10 bg-[var(--control-bg)] px-2.5 py-1 text-[var(--color-text-muted)]">
                {item}
              </span>
            ))}
          </div>
        </div>
      ))}

      {response.projects?.map((project) => (
        <a
          key={project.id}
          href={project.projectUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block rounded-2xl border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.075),rgba(255,255,255,0.035))] p-3 transition hover:-translate-y-0.5 hover:border-[color-mix(in_srgb,var(--color-primary)_42%,transparent)]"
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="font-semibold text-[var(--color-text)]">{project.title}</p>
              <p className="text-caption mt-1 font-mono uppercase tracking-[0.16em] text-[var(--color-primary)]">
                {project.platform.join(" + ")} / {project.metric}
              </p>
            </div>
            <span className="text-caption rounded-full border border-white/10 px-2 py-1 text-[var(--color-text-muted)]">
              View
            </span>
          </div>
          <p className="mt-2 text-sm leading-6 text-[var(--color-text-muted)]">{project.description}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {project.technologies.slice(0, 4).map((technology) => (
              <span key={technology} className="text-caption rounded-full bg-white/[0.055] px-2.5 py-1 text-[var(--color-text-muted)]">
                {technology}
              </span>
            ))}
          </div>
        </a>
      ))}

      {response.actions?.length ? (
        <div className="flex flex-wrap gap-2 pt-1">
          {response.actions.map((action) => (
            <a
              key={`${action.label}-${action.href}`}
              href={action.href}
              target={trustedTarget(action.href)}
              rel={trustedTarget(action.href) ? "noopener noreferrer" : undefined}
              className={`rounded-full border px-3 py-2 text-xs font-medium ${
                action.kind === "primary"
                  ? "border-[var(--primary-action-border)] bg-[var(--primary-action-bg)] text-[var(--primary-action-text)]"
                  : "border-white/10 bg-white/[0.045] text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
              }`}
            >
              {action.label}
            </a>
          ))}
        </div>
      ) : null}
    </div>
  );
}

function MessageBubble({ message }: { message: ChatMessage }) {
  const isUser = message.role === "user";

  return (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      className={`flex gap-3 ${isUser ? "justify-end" : "justify-start"}`}
    >
      {!isUser ? <AssistantGlyph /> : null}
      <div
        className={`max-w-[82%] rounded-[1.25rem] border px-4 py-3 text-sm leading-6 shadow-[0_18px_42px_rgba(0,0,0,0.18)] ${
          isUser
            ? "border-[color-mix(in_srgb,var(--color-primary)_28%,transparent)] bg-[color-mix(in_srgb,var(--color-primary)_17%,transparent)] text-[var(--color-text)]"
            : "border-white/10 bg-white/[0.055] text-[var(--color-text-muted)]"
        }`}
      >
        <p className="whitespace-pre-wrap break-words">{message.content}</p>
        {message.response ? <ResponseDetails response={message.response} /> : null}
      </div>
    </motion.div>
  );
}

function TypingIndicator() {
  return (
    <div className="flex items-center gap-3">
      <AssistantGlyph />
      <div className="flex gap-1.5 rounded-full border border-white/10 bg-white/[0.055] px-4 py-3">
        {[0, 1, 2].map((item) => (
          <span
            key={item}
            className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--color-primary)]"
            style={{ animationDelay: `${item * 120}ms` }}
          />
        ))}
      </div>
    </div>
  );
}

export default function PortfolioChat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [context, setContext] = useState<ChatContext>({});
  const [value, setValue] = useState("");
  const [processing, setProcessing] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const suggestions = useMemo(() => {
    const latestAssistant = [...messages].reverse().find((message) => message.role === "assistant");
    return latestAssistant?.response?.suggestions ?? initialResponse.suggestions ?? [];
  }, [messages]);

  useEffect(() => {
    try {
      const stored = sessionStorage.getItem(storageKey);
      if (stored) {
        const parsed = JSON.parse(stored) as { messages?: ChatMessage[]; context?: ChatContext };
        setMessages(parsed.messages?.length ? parsed.messages : []);
        setContext(parsed.context ?? {});
      }
    } catch {
      setMessages([]);
    } finally {
      setHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    sessionStorage.setItem(storageKey, JSON.stringify({ messages, context }));
  }, [context, hydrated, messages]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, processing, open]);

  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();
    const handleKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  const sendMessage = (rawQuestion: string) => {
    const question = rawQuestion.trim().slice(0, maxInputLength);
    if (!question || processing) return;

    const userMessage: ChatMessage = { id: createId(), role: "user", content: question };
    setMessages((items) => [...items, userMessage]);
    setValue("");
    setProcessing(true);

    window.setTimeout(() => {
      const response = getChatResponse(question, context);
      setContext(response.updatedContext ?? context);
      setMessages((items) => [
        ...items,
        {
          id: createId(),
          role: "assistant",
          content: response.message,
          response,
        },
      ]);
      setProcessing(false);
    }, 190);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    sendMessage(value);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      sendMessage(value);
    }
  };

  const clearChat = () => {
    setMessages([]);
    setContext({});
    sessionStorage.removeItem(storageKey);
  };

  return (
    <>
      <motion.button
        type="button"
        aria-label="Open Ask Sohail portfolio assistant"
        aria-expanded={open}
        onClick={() => setOpen(true)}
        whileHover={{ y: -3, scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={`fixed bottom-[4.75rem] right-4 z-[90] flex min-h-12 items-center gap-3 overflow-hidden rounded-full border border-white/14 bg-[linear-gradient(135deg,rgba(143,199,255,0.18),rgba(127,224,195,0.11),rgba(255,255,255,0.07))] px-4 py-3 text-sm font-semibold text-[var(--color-text)] shadow-[0_18px_55px_rgba(0,0,0,0.32),inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur-2xl sm:bottom-[4.85rem] sm:right-5 ${open ? "pointer-events-none opacity-0" : "opacity-100"}`}
      >
        <span className="absolute inset-x-5 top-0 h-px bg-gradient-to-r from-transparent via-white/70 to-transparent" />
        <span className="relative h-2.5 w-2.5 rounded-full bg-[var(--color-secondary)] shadow-[0_0_18px_var(--color-secondary)]" />
        <span className="hidden sm:inline">Ask Sohail</span>
        <span className="sm:hidden" aria-hidden="true">
          Ask
        </span>
      </motion.button>

      <AnimatePresence>
        {open ? (
          <motion.section
            role="dialog"
            aria-modal="false"
            aria-label="Ask Sohail portfolio assistant"
            data-lenis-prevent
            initial={{ opacity: 0, y: 22, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.97 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="fixed inset-x-3 bottom-3 top-3 z-[120] flex overflow-hidden rounded-[1.65rem] border border-white/12 bg-[linear-gradient(145deg,rgba(8,20,32,0.84),rgba(5,13,22,0.94))] text-[var(--color-text)] shadow-[0_28px_95px_rgba(0,0,0,0.46),inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur-2xl sm:inset-auto sm:bottom-5 sm:right-5 sm:h-[min(680px,calc(100svh-2.5rem))] sm:w-[400px]"
          >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,color-mix(in_srgb,var(--color-primary)_24%,transparent),transparent_34%),radial-gradient(circle_at_90%_20%,color-mix(in_srgb,var(--color-secondary)_15%,transparent),transparent_30%)]" />
            <div className="relative z-10 flex min-h-0 w-full flex-col">
              <header className="flex items-center justify-between gap-3 border-b border-white/10 px-4 py-4">
                <div className="flex items-center gap-3">
                  <AssistantGlyph />
                  <div>
                    <p className="font-semibold leading-tight">Ask Sohail</p>
                    <div className="mt-1 flex items-center gap-2 text-sm text-[var(--color-text-muted)]">
                      <span>Portfolio Assistant</span>
                      <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-secondary)]" />
                      <span>Available</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={clearChat}
                    className="text-sm rounded-full border border-white/10 bg-white/[0.045] px-3 py-2 text-[var(--color-text-muted)] hover:text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                    aria-label="Clear Ask Sohail chat"
                    title="Clear chat"
                  >
                    Clear
                  </button>
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.045] text-xl leading-none text-[var(--color-text-muted)] hover:text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                    aria-label="Close Ask Sohail"
                    title="Close"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
              </header>

              <div
                ref={scrollRef}
                data-lenis-prevent
                onWheel={(event) => event.stopPropagation()}
                onTouchMove={(event) => event.stopPropagation()}
                className="min-h-0 flex-1 touch-pan-y space-y-4 overflow-y-auto overscroll-contain px-4 py-4"
              >
                {messages.length === 0 ? (
                  <div className="rounded-[1.35rem] border border-white/10 bg-white/[0.055] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
                    <p className="text-2xl font-semibold">Hi</p>
                    <p className="mt-3 text-sm leading-7 text-[var(--color-text-muted)]">
                      I&apos;m Sohail&apos;s portfolio assistant. I can help you explore his skills,
                      experience, projects, services, and professional work.
                    </p>
                    <p className="mt-3 text-sm text-[var(--color-text)]">What would you like to know?</p>
                  </div>
                ) : null}

                {messages.map((message) => (
                  <MessageBubble key={message.id} message={message} />
                ))}

                {processing ? <TypingIndicator /> : null}
              </div>

              <div className="border-t border-white/10 p-4">
                {suggestions.length ? (
                  <div className="mb-3 flex gap-2 overflow-x-auto pb-1" aria-label="Suggested Ask Sohail questions">
                    {suggestions.map((suggestion) => (
                      <button
                        key={suggestion}
                        type="button"
                        onClick={() => sendMessage(suggestion)}
                        className="shrink-0 rounded-full border border-white/10 bg-white/[0.045] px-3 py-2 text-xs text-[var(--color-text-muted)] hover:border-[color-mix(in_srgb,var(--color-primary)_36%,transparent)] hover:text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                ) : null}

                <form onSubmit={handleSubmit} className="flex items-end gap-2">
                  <label className="sr-only" htmlFor="ask-sohail-input">
                    Ask about Sohail
                  </label>
                  <textarea
                    ref={inputRef}
                    id="ask-sohail-input"
                    value={value}
                    maxLength={maxInputLength}
                    rows={1}
                    onChange={(event) => setValue(event.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Ask about Sohail..."
                    className="max-h-28 min-h-12 flex-1 resize-none rounded-[1.1rem] border border-white/10 bg-white/[0.055] px-4 py-3 text-sm text-[var(--color-text)] outline-none placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[color-mix(in_srgb,var(--color-primary)_22%,transparent)]"
                  />
                  <button
                    type="submit"
                    disabled={!value.trim() || processing}
                    aria-label="Send Ask Sohail message"
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[var(--primary-action-border)] bg-[var(--primary-action-bg)] text-[var(--primary-action-text)] shadow-[0_12px_28px_color-mix(in_srgb,var(--color-primary)_14%,transparent)] disabled:cursor-not-allowed disabled:opacity-45 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                  >
                    <svg aria-hidden="true" className="h-5 w-5" viewBox="0 0 24 24" fill="none">
                      <path d="M5 12h13M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </form>
              </div>
            </div>
          </motion.section>
        ) : null}
      </AnimatePresence>
    </>
  );
}
