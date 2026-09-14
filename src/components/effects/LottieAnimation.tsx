"use client";

import { Lottie } from "lottie-react";
import animationData from "@/Assets/Error 404.json";

export default function LottieAnimation() {
  return (
    <Lottie
      src={animationData}
      autoplay
      loop
      className="mx-auto h-full w-full max-w-[34rem]"
    />
  );
}
