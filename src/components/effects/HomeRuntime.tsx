"use client";

import dynamic from "next/dynamic";

const ScrollProgress = dynamic(() => import("@/components/effects/ScrollProgress"), {
  ssr: false,
});

const LenisProvider = dynamic(() => import("@/components/effects/LenisProvider"), {
  ssr: false,
});

export default function HomeRuntime() {
  return (
    <>
      <LenisProvider />
      <ScrollProgress />
    </>
  );
}
