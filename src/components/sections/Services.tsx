"use client";

import ScrollReveal from "@/components/effects/ScrollReveal";

type ServiceIcon = "deployment" | "app" | "website" | "training";

type Service = {
  number: string;
  title: string;
  description: string;
  capabilities: string[];
  icon: ServiceIcon;
  accent: string;
};

const services: Service[] = [
  {
    number: "01 / Release",
    title: "App Deployment Services",
    description:
      "A reliable path from a signed build to a confident Android and iOS release.",
    capabilities: [
      "Google Play Console and App Store Connect",
      "Signing, certificates, and provisioning",
      "Store listings, screenshots, and assets",
      "Internal, closed, open, TestFlight, and production releases",
      "Versioning, release management, and troubleshooting",
      "Push notifications, APNs, and Firebase configuration",
    ],
    icon: "deployment",
    accent: "var(--color-primary)",
  },
  {
    number: "02 / Product",
    title: "Complete App Development",
    description:
      "Production-minded mobile apps shaped from the first product idea through launch.",
    capabilities: [
      "React Native for Android and iOS",
      "APIs, Firebase, auth, and push notifications",
      "State management and native integrations",
      "Testing, performance, deployment, and future enhancements",
    ],
    icon: "app",
    accent: "var(--color-secondary)",
  },
  {
    number: "03 / Web",
    title: "Website Development",
    description:
      "Modern, responsive websites and web products built to perform after launch.",
    capabilities: [
      "React.js, Next.js, TypeScript, and Tailwind CSS",
      "Responsive landing pages and business websites",
      "Admin dashboards, SaaS apps, and API integrations",
      "Performance, SEO-friendly implementation, deployment, and maintenance",
    ],
    icon: "website",
    accent: "var(--color-accent)",
  },
  {
    number: "04 / Practice",
    title: "Development Training",
    description:
      "Practical, project-based guidance for developers who want to ship real work.",
    capabilities: [
      "React Native, React.js, Next.js, and TypeScript",
      "Firebase, API integration, Git, and GitHub workflows",
      "Android Studio basics and app deployment",
      "Real-world architecture, debugging, and production practices",
    ],
    icon: "training",
    accent: "var(--color-primary-strong)",
  },
];

function ServiceIcon({ name }: { name: ServiceIcon }) {
  const commonProps = {
    "aria-hidden": true,
    className: "h-6 w-6",
    fill: "none",
    stroke: "currentColor",
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    strokeWidth: 1.7,
    viewBox: "0 0 24 24",
  };

  if (name === "deployment") {
    return (
      <svg {...commonProps}>
        <path d="M12 16V4m0 0L7.5 8.5M12 4l4.5 4.5" />
        <path d="M5 13v5.5A1.5 1.5 0 0 0 6.5 20h11a1.5 1.5 0 0 0 1.5-1.5V13" />
      </svg>
    );
  }

  if (name === "app") {
    return (
      <svg {...commonProps}>
        <rect x="6" y="2.8" width="12" height="18.4" rx="2.2" />
        <path d="M10 17.5h4M9.5 5.8h5" />
      </svg>
    );
  }

  if (name === "website") {
    return (
      <svg {...commonProps}>
        <rect x="3" y="4" width="18" height="16" rx="2" />
        <path d="M3 9h18M7 6.5h.01M10 6.5h.01M13 6.5h.01" />
      </svg>
    );
  }

  return (
    <svg {...commonProps}>
      <path d="M4 19.5V8.8a1.8 1.8 0 0 1 1.8-1.8h12.4A1.8 1.8 0 0 1 20 8.8v10.7" />
      <path d="M2.5 19.5h19M8 4.5h8M12 4.5v2.5M8 12h8M8 15.5h5" />
    </svg>
  );
}

export default function Services() {
  return (
    <section id="services" className="relative overflow-hidden py-16 sm:py-20 lg:py-24">
      <div className="pointer-events-none absolute right-0 top-24 hidden h-72 w-72 rounded-full bg-[rgba(143,199,255,0.07)] blur-[90px] md:block" />

      <div className="mx-auto max-w-7xl px-6">
        <ScrollReveal mode="inView" className="max-w-3xl">
          <p className="section-kicker">Services</p>
          <h2 className="section-heading mt-4 text-[var(--color-text)]">
            From first commit to the release that reaches real people.
          </h2>
          <p className="text-body-lg prose-measure mt-6 text-[var(--color-text-muted)]">
            Focused product work across mobile, web, release engineering, and
            the practical skills that keep teams moving.
          </p>
        </ScrollReveal>

        <div className="mt-9 grid gap-5 sm:mt-10 md:grid-cols-2">
          {services.map((service, index) => (
            <ScrollReveal
              key={service.title}
              mode="inView"
              delay={index * 0.08}
              direction="up"
            >
              <article className="story-card group flex h-full flex-col rounded-[1.4rem] p-6 transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1 hover:border-[var(--surface-border-strong)] hover:shadow-[0_22px_56px_rgba(0,0,0,0.28)] sm:rounded-[1.9rem] sm:p-8">
                <div className="relative z-10 flex items-start justify-between gap-4">
                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-[1rem] border bg-[var(--control-bg)] transition-transform duration-500 group-hover:rotate-6 group-hover:scale-105"
                    style={{ borderColor: `color-mix(in srgb, ${service.accent} 35%, transparent)`, color: service.accent }}
                  >
                    <ServiceIcon name={service.icon} />
                  </div>
                  <span className="text-caption font-mono uppercase tracking-[0.24em] text-[var(--color-text-muted)]">
                    {service.number}
                  </span>
                </div>

                <div className="relative z-10 mt-6 flex flex-1 flex-col sm:mt-7">
                  <h3 className="text-card-title max-w-md text-[var(--color-text)]">
                    {service.title}
                  </h3>
                  <p className="mt-3 max-w-lg leading-7 text-[var(--color-text-muted)]">
                    {service.description}
                  </p>

                  <ul className="mt-6 grid gap-3 sm:mt-7 sm:grid-cols-2" aria-label={`${service.title} capabilities`}>
                    {service.capabilities.map((capability) => (
                      <li key={capability} className="flex gap-2.5 text-sm leading-6 text-[var(--color-text-muted)]">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: service.accent }} />
                        <span>{capability}</span>
                      </li>
                    ))}
                  </ul>

                  <a
                    href="#contact"
                    aria-label={`Talk about ${service.title}`}
                    className="text-button mt-8 inline-flex min-h-11 w-fit items-center gap-2 rounded-full border border-[var(--primary-action-border)] bg-[var(--primary-action-bg)] px-5 py-3 font-mono uppercase tracking-[0.2em] text-[var(--primary-action-text)] transition-[transform,background-color,border-color,gap] duration-300 hover:-translate-y-0.5 hover:gap-3 hover:border-[var(--color-primary)] hover:bg-[var(--control-bg-hover)]"
                  >
                    Let&apos;s talk about this
                    <span aria-hidden="true">-&gt;</span>
                  </a>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
