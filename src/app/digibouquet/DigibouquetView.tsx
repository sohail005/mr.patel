"use client";

import dynamic from "next/dynamic";
import InteractiveBuilder from "@/components/builder/InteractiveBuilder";

const CursorEffect = dynamic(
  () => import("@/components/effects/CursorEffect"),
  { ssr: false }
);

export default function DigibouquetView() {
  return (
    <>
      <CursorEffect />
      <main className="w-full">
        <InteractiveBuilder />
      </main>
    </>
  );
}
