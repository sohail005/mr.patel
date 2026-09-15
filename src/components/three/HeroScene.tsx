"use client";

import { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Preload, AdaptiveDpr } from "@react-three/drei";
import ParticleField from "./ParticleField";

export default function HeroScene() {
    const [renderScene, setRenderScene] = useState(false);

    useEffect(() => {
        const media = window.matchMedia("(min-width: 641px) and (prefers-reduced-motion: no-preference)");
        const update = () => setRenderScene(media.matches);

        update();
        media.addEventListener("change", update);
        return () => media.removeEventListener("change", update);
    }, []);

    if (!renderScene) {
        return null;
    }

    return (
        <div className="canvas-container">
            <Canvas
                camera={{ position: [0, 0, 8], fov: 60 }}
                dpr={[1, 1.25]}
                gl={{
                    antialias: false,
                    alpha: true,
                    powerPreference: "high-performance",
                }}
            >
                <Suspense fallback={null}>
                    <ambientLight intensity={0.3} />
                    <pointLight position={[8, 8, 8]} intensity={1.0} color="#6c63ff" />
                    <pointLight position={[-8, -8, -8]} intensity={0.6} color="#00d4ff" />
                    <ParticleField count={900} radius={9} size={0.014} />
                    <AdaptiveDpr pixelated />
                    <Preload all />
                </Suspense>
            </Canvas>
        </div>
    );
}
