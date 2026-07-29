"use client";

import { motion } from "framer-motion";
import ScrollReveal from "@/components/effects/ScrollReveal";

const projects = [
  {
    title: "Opus Virtual Offices",
    summary:
      "A premium business platform for addresses, live answering, and operational trust across hundreds of US locations.",
    tags: ["Platform", "Business services", "Web"],
    link: "https://www.opusvirtualoffices.com/",
    region: "United States",
  },
  {
    title: "Finecart",
    summary:
      "A local marketplace app connecting neighborhood stores and customers with practical delivery flows.",
    tags: ["Marketplace", "React Native", "Mobile"],
    link: "https://play.google.com/store/apps/details?id=com.retail.center.io",
    region: "India",
  },
  {
    title: "HOPP",
    summary:
      "An on-demand driver-booking product focused on reliability, location workflows, and day-to-day transport use.",
    tags: ["On-demand", "Maps", "React Native"],
    link: "https://play.google.com/store/apps/details?id=com.Revalsys.warantech.HoppCustomer",
    region: "India",
  },
  {
    title: "RevalOmni Dashboard",
    summary:
      "A business monitoring interface for sales, inventory, and operating visibility across retail workflows.",
    tags: ["Dashboard", "Analytics", "Operations"],
    link: "https://play.google.com/store/apps/details?id=com.masterwsi",
    region: "India",
  },
  {
    title: "Revalsys Authenticator",
    summary:
      "A security-focused utility for two-factor authentication and secure notifications in internal systems.",
    tags: ["Security", "2FA", "Biometrics"],
    link: "https://play.google.com/store/apps/details?id=com.revalnotification",
    region: "India",
  },
  {
    title: "Pro V Networking",
    summary:
      "A professional networking product designed for events, attendee discovery, and structured engagement.",
    tags: ["Networking", "Events", "Mobile"],
    link: "https://play.google.com/store/apps/details?id=com.pro_v_networking",
    region: "United Kingdom",
  },
];

export default function Projects() {
  return (
    <section id="projects" className="relative overflow-hidden py-28">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(247,178,103,0.08),transparent_24%)]" />
      <div className="mx-auto max-w-7xl px-6">
        <ScrollReveal mode="inView" className="max-w-3xl">
          <p className="section-kicker">Selected work</p>
          <h2 className="section-heading mt-4 text-white">
            Product builds across mobile apps, dashboards, and service platforms.
          </h2>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--color-text-muted)]">
            The portfolio is broad, but the consistent thread is practical
            execution: shipping, refining, and making interfaces feel
            dependable rather than fragile.
          </p>
        </ScrollReveal>

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          {projects.map((project, index) => (
            <ScrollReveal
              key={project.title}
              mode="inView"
              direction={index % 2 === 0 ? "left" : "right"}
              delay={index * 0.04}
            >
              <motion.a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -6 }}
                className="story-card block rounded-[2rem] p-7 sm:p-8"
              >
                <div className="flex items-start justify-between gap-6">
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-[var(--color-primary)]">
                      {project.region}
                    </p>
                    <h3 className="mt-3 text-2xl text-white">{project.title}</h3>
                  </div>
                  <span className="rounded-full border border-white/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--color-text-muted)]">
                    Live
                  </span>
                </div>

                <p className="mt-5 max-w-xl leading-8 text-[var(--color-text-muted)]">
                  {project.summary}
                </p>

                <div className="mt-8 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/10 px-3 py-1 text-xs text-[var(--color-text-muted)]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.a>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
