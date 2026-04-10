"use client";

import { useLenis } from "@/hooks/useLenis";

/**
 * LenisProvider — mount this once at the root to enable
 * Lenis smooth scroll for the entire page.
 * It renders nothing visible; Lenis attaches to window scroll.
 */
export default function LenisProvider() {
  useLenis();
  return null;
}
