"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Preload } from "@react-three/drei";
import ParticleField from "./ParticleField";
import FloatingShapes from "./FloatingShapes";

export default function HeroScene() {
    return (
        <div className="canvas-container">
            <Canvas
                camera={{ position: [0, 0, 8], fov: 60 }}
                dpr={[1, 1.5]}
                gl={{
                    antialias: true,
                    alpha: true,
                    powerPreference: "high-performance",
                }}
            >
                <Suspense fallback={null}>
                    <ambientLight intensity={0.3} />
                    <pointLight position={[10, 10, 10]} intensity={0.8} color="#6c63ff" />
                    <pointLight
                        position={[-10, -10, -10]}
                        intensity={0.5}
                        color="#00d4ff"
                    />
                    <ParticleField count={1500} radius={8} />
                    <FloatingShapes />
                    <Preload all />
                </Suspense>
            </Canvas>
        </div>
    );
}
