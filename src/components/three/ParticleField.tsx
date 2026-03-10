"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface ParticleFieldProps {
    count?: number;
    radius?: number;
    color?: string;
    size?: number;
}

export default function ParticleField({
    count = 2000,
    radius = 10,
    color = "#6c63ff",
    size = 0.015,
}: ParticleFieldProps) {
    const meshRef = useRef<THREE.Points>(null!);

    const [positions, colors] = useMemo(() => {
        const positions = new Float32Array(count * 3);
        const colors = new Float32Array(count * 3);
        const baseColor = new THREE.Color(color);
        const secondaryColor = new THREE.Color("#00d4ff");
        const accentColor = new THREE.Color("#ff6fd8");

        for (let i = 0; i < count; i++) {
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);
            const r = radius * Math.cbrt(Math.random());

            positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
            positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
            positions[i * 3 + 2] = r * Math.cos(phi);

            const colorChoice = Math.random();
            const chosenColor =
                colorChoice < 0.5
                    ? baseColor
                    : colorChoice < 0.8
                        ? secondaryColor
                        : accentColor;

            colors[i * 3] = chosenColor.r;
            colors[i * 3 + 1] = chosenColor.g;
            colors[i * 3 + 2] = chosenColor.b;
        }

        return [positions, colors];
    }, [count, radius, color]);

    useFrame((state) => {
        if (!meshRef.current) return;
        meshRef.current.rotation.y = state.clock.elapsedTime * 0.03;
        meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.02) * 0.1;
    });

    return (
        <points ref={meshRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    args={[positions, 3]}
                />
                <bufferAttribute
                    attach="attributes-color"
                    args={[colors, 3]}
                />
            </bufferGeometry>
            <pointsMaterial
                size={size}
                vertexColors
                transparent
                opacity={0.8}
                sizeAttenuation
                depthWrite={false}
                blending={THREE.AdditiveBlending}
            />
        </points>
    );
}
