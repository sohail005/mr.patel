"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight } from "lucide-react";

export default function StartProjectTab() {
  const pathname = usePathname();
  if (pathname === "/contact") return null;

  return (
    <Link
      href="/contact"
      aria-label="Start a project"
      className="start-project-tab fixed left-0 top-1/2 z-40 flex -translate-y-1/2 flex-col items-center gap-4 rounded-r-2xl bg-[#c49a45] px-2.5 py-5 shadow-[0_18px_45px_rgba(0,0,0,0.35)] transition-transform duration-300 hover:translate-x-1"
    >
      <span
        className="text-caption font-mono font-bold uppercase tracking-[0.3em] text-[#123f36]"
        style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
      >
        Start a project
      </span>
      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#123f36] text-[#c49a45]">
        <ArrowUpRight size={16} strokeWidth={2.4} aria-hidden="true" />
      </span>
    </Link>
  );
}
