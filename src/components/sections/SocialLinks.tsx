"use client";

import { motion } from "framer-motion";

type SocialIconName = "github" | "linkedin" | "threads" | "instagram" | "youtube" | "email";

const socials: { label: string; href: string; icon: SocialIconName }[] = [
  { label: "GitHub", href: "https://github.com/sohail005", icon: "github" },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/md-sohail-a63a321b1/",
    icon: "linkedin",
  },
  { label: "Threads", href: "https://www.threads.com/@sohail.code", icon: "threads" },
  { label: "Instagram", href: "https://www.instagram.com/sohail.code/", icon: "instagram" },
  { label: "YouTube", href: "https://www.youtube.com/@Sohail.code005", icon: "youtube" },
  { label: "Email", href: "mailto:sohail345patel@gmail.com", icon: "email" },
];

function SocialIcon({ name }: { name: SocialIconName }) {
  const iconClassName = "relative z-10 h-4 w-4 transition-transform duration-300 group-hover:scale-110";

  if (name === "github") {
    return (
      <svg
        aria-hidden="true"
        className={iconClassName}
        viewBox="0 0 512 512"
        fill="currentColor"
      >
        <path d="M173.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3 .3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5 .3-6.2 2.3zm44.2-1.7c-2.9 .7-4.9 2.6-4.6 4.9 .3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM252.8 8C114.1 8 8 113.3 8 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 391.5 8 252.8 8z" />
      </svg>
    );
  }

  if (name === "linkedin") {
    return (
      <svg
        aria-hidden="true"
        className={iconClassName}
        viewBox="0 0 448 512"
        fill="currentColor"
      >
        <path d="M100.3 448H7.4V148.9h92.9zM53.8 108.1C24.1 108.1 0 83.5 0 53.8a53.8 53.8 0 0 1 107.6 0c0 29.7-24.1 54.3-53.8 54.3zM447.9 448h-92.7V302.4c0-34.7-.7-79.2-48.3-79.2-48.3 0-55.7 37.7-55.7 76.7V448h-92.8V148.9h89.1v40.8h1.3c12.4-23.5 42.7-48.3 87.9-48.3 94 0 111.3 61.9 111.3 142.3V448z" />
      </svg>
    );
  }

  if (name === "instagram") {
    return (
      <svg
        aria-hidden="true"
        className={iconClassName}
        viewBox="0 0 448 512"
        fill="currentColor"
      >
        <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
      </svg>
    );
  }

  if (name === "threads") {
    return (
      <svg
        aria-hidden="true"
        className={iconClassName}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.8}
      >
        <path d="M17.7 11.4c-.28-3.08-2.2-5.1-5.4-5.1-3.46 0-5.58 2.24-5.58 5.7 0 3.55 2.16 5.7 5.5 5.7 2.63 0 4.42-1.43 4.42-3.53 0-1.85-1.3-3.06-3.37-3.06-2.2 0-3.3 1.05-3.3 2.37 0 1.03.74 1.7 1.9 1.7 1.21 0 2.05-.71 2.05-1.82 0-2.22-1.59-3.96-4.08-3.96" />
      </svg>
    );
  }

  if (name === "youtube") {
    return (
      <svg
        aria-hidden="true"
        className={iconClassName}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.8}
      >
        <path d="M21 12s0-3.1-.4-4.6a2.5 2.5 0 0 0-1.8-1.8C17.3 5.3 12 5.3 12 5.3s-5.3 0-6.8.4a2.5 2.5 0 0 0-1.8 1.8C3 8.9 3 12 3 12s0 3.1.4 4.6a2.5 2.5 0 0 0 1.8 1.8c1.5.4 6.8.4 6.8.4s5.3 0 6.8-.4a2.5 2.5 0 0 0 1.8-1.8c.4-1.5.4-4.6.4-4.6Z" />
        <path d="m10 9.5 5 2.5-5 2.5v-5Z" fill="currentColor" stroke="none" />
      </svg>
    );
  }

  return (
    <svg
      aria-hidden="true"
      className={iconClassName}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.8}
    >
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
      aria-label={label}
      title={label}
      whileTap={{ scale: 0.94 }}
      className="group relative flex h-11 w-11 items-center justify-center rounded-full border border-[var(--surface-border)] text-[var(--color-text-muted)] transition-all duration-500 hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]"
    >
      <span className="absolute inset-0 rounded-full bg-[var(--color-primary)] opacity-0 blur-md transition-opacity duration-500 group-hover:opacity-20" />
      <SocialIcon name={icon} />
    </motion.a>
  );
}

export default function SocialLinks({
  className = "",
  showLabel = true,
}: {
  className?: string;
  showLabel?: boolean;
}) {
  const icons = (
    <div className="flex gap-4">
      {socials.map((social) => (
        <SocialButton key={social.label} {...social} />
      ))}
    </div>
  );

  if (!showLabel) {
    return <div className={className}>{icons}</div>;
  }

  return (
    <div className={`flex flex-col gap-6 md:items-end ${className}`.trim()}>
      <p className="text-caption font-mono font-bold uppercase tracking-[0.4em] text-[var(--color-text-muted)]">
        Social presence
      </p>
      {icons}
    </div>
  );
}
