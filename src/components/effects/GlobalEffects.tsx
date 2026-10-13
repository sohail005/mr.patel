"use client";

import dynamic from "next/dynamic";

const CustomCursor = dynamic(() => import("@/components/effects/CustomCursor"), {
  ssr: false,
});

const BackToTop = dynamic(() => import("@/components/effects/BackToTop"), {
  ssr: false,
});

export default function GlobalEffects() {
  return (
    <>
      <CustomCursor />
      <BackToTop />
    </>
  );
}
