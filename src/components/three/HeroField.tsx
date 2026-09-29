"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function seededRandom(index: number) {
  const value = Math.sin(index * 12.9898) * 43758.5453;
  return value - Math.floor(value);
}

function readCssColor(name: string, fallback: string) {
  if (typeof window === "undefined") return fallback;
  const value = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  return value.startsWith("#") ? value : fallback;
}

function ParticleShell({
  count = 1000,
  radius = 3,
  color,
}: {
  count?: number;
  radius?: number;
  color: string;
}) {
  const pointsRef = useRef<THREE.Points>(null!);

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = seededRandom(i * 3 + 1) * Math.PI * 2;
      const phi = Math.acos(2 * seededRandom(i * 3 + 2) - 1);
      const r = radius * (0.86 + seededRandom(i * 3 + 3) * 0.14);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, [count, radius]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y = state.clock.elapsedTime * 0.045;
    pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.03) * 0.12;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.026}
        color={color}
        transparent
        opacity={0.5}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function WireCore({ primary, secondary }: { primary: string; secondary: string }) {
  const groupRef = useRef<THREE.Group>(null!);

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = state.clock.elapsedTime * 0.09;
    groupRef.current.rotation.x = state.clock.elapsedTime * 0.035;
  });

  return (
    <group ref={groupRef}>
      <mesh>
        <icosahedronGeometry args={[1.7, 1]} />
        <meshBasicMaterial color={secondary} wireframe transparent opacity={0.22} />
      </mesh>
      <mesh scale={0.6}>
        <icosahedronGeometry args={[1.7, 0]} />
        <meshBasicMaterial color={primary} wireframe transparent opacity={0.35} />
      </mesh>
    </group>
  );
}

export default function HeroField() {
  const [colors, setColors] = useState({ primary: "#69D3B0", secondary: "#8FD8C2" });

  useEffect(() => {
    setColors({
      primary: readCssColor("--color-primary-accent", "#69D3B0"),
      secondary: readCssColor("--color-secondary-accent", "#8FD8C2"),
    });
  }, []);

  return (
    <Canvas
      camera={{ position: [0, 0, 5.6], fov: 42 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
    >
      <WireCore primary={colors.primary} secondary={colors.secondary} />
      <ParticleShell color={colors.primary} />
    </Canvas>
  );
}
