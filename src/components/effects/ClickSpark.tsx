"use client";

import {
  MouseEvent,
  ReactNode,
  useCallback,
  useEffect,
  useRef,
} from "react";

type Spark = {
  x: number;
  y: number;
  angle: number;
  startTime: number;
};

type ClickSparkProps = {
  sparkColor?: string;
  sparkSize?: number;
  sparkRadius?: number;
  sparkCount?: number;
  duration?: number;
  easing?: "linear" | "ease-in" | "ease-in-out" | "ease-out" | string;
  extraScale?: number;
  children: ReactNode;
};

export default function ClickSpark({
  sparkColor = "#fff",
  sparkSize = 10,
  sparkRadius = 15,
  sparkCount = 8,
  duration = 400,
  easing = "ease-out",
  extraScale = 1,
  children,
}: ClickSparkProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const sparksRef = useRef<Spark[]>([]);
  const animationIdRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let resizeTimeout: ReturnType<typeof setTimeout>;

    const resizeCanvas = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const pixelRatio = window.devicePixelRatio || 1;

      const nextWidth = Math.max(1, Math.floor(width * pixelRatio));
      const nextHeight = Math.max(1, Math.floor(height * pixelRatio));

      if (canvas.width !== nextWidth || canvas.height !== nextHeight) {
        canvas.width = nextWidth;
        canvas.height = nextHeight;
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;
      }
    };

    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(resizeCanvas, 100);
    };

    window.addEventListener("resize", handleResize);
    resizeCanvas();

    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(resizeTimeout);
    };
  }, []);

  const easeFunc = useCallback(
    (t: number) => {
      switch (easing) {
        case "linear":
          return t;
        case "ease-in":
          return t * t;
        case "ease-in-out":
          return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
        default:
          return t * (2 - t);
      }
    },
    [easing]
  );

  const startAnimation = useCallback(
    () => {
      const drawFrame = (timestamp: number) => {
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");
      if (!canvas || !ctx) {
        animationIdRef.current = null;
        return;
      }

      const pixelRatio = window.devicePixelRatio || 1;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      sparksRef.current = sparksRef.current.filter((spark) => {
        const elapsed = timestamp - spark.startTime;
        if (elapsed >= duration) return false;

        const progress = elapsed / duration;
        const eased = easeFunc(progress);
        const distance = eased * sparkRadius * extraScale * pixelRatio;
        const lineLength = sparkSize * (1 - eased) * pixelRatio;
        const x = spark.x * pixelRatio;
        const y = spark.y * pixelRatio;

        const x1 = x + distance * Math.cos(spark.angle);
        const y1 = y + distance * Math.sin(spark.angle);
        const x2 = x + (distance + lineLength) * Math.cos(spark.angle);
        const y2 = y + (distance + lineLength) * Math.sin(spark.angle);

        ctx.strokeStyle = sparkColor;
        ctx.lineWidth = 2 * pixelRatio;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();

        return true;
      });

      animationIdRef.current =
        sparksRef.current.length > 0 ? requestAnimationFrame(drawFrame) : null;
      };

      animationIdRef.current = requestAnimationFrame(drawFrame);
    },
    [duration, easeFunc, extraScale, sparkColor, sparkRadius, sparkSize]
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    return () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
        animationIdRef.current = null;
      }
    };
  }, [startAnimation]);

  const handleClick = (event: MouseEvent<HTMLDivElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const x = event.clientX;
    const y = event.clientY;
    const now = performance.now();

    const newSparks = Array.from({ length: sparkCount }, (_, index) => ({
      x,
      y,
      angle: (2 * Math.PI * index) / sparkCount,
      startTime: now,
    }));

    sparksRef.current.push(...newSparks);
    if (animationIdRef.current === null) {
      startAnimation();
    }
  };

  return (
    <div className="relative min-h-screen w-full" onClick={handleClick}>
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[9997] block select-none"
      />
      {children}
    </div>
  );
}
