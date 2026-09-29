"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function seededRandom(index: number) {
  const value = Math.sin(index * 12.9898) * 43758.5453;
  return value - Math.floor(value);
}

function ParticleShell({ count = 900, radius = 3.2 }: { count?: number; radius?: number }) {
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
        size={0.028}
        color="#69D3B0"
        transparent
        opacity={0.55}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function WireCore() {
  const groupRef = useRef<THREE.Group>(null!);

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = state.clock.elapsedTime * 0.09;
    groupRef.current.rotation.x = state.clock.elapsedTime * 0.035;
  });

  return (
    <group ref={groupRef}>
      <mesh>
        <icosahedronGeometry args={[1.9, 1]} />
        <meshBasicMaterial color="#0100ff" wireframe transparent opacity={0.22} />
      </mesh>
      <mesh scale={0.62}>
        <icosahedronGeometry args={[1.9, 0]} />
        <meshBasicMaterial color="#0100ff" wireframe transparent opacity={0.35} />
      </mesh>
    </group>
  );
}

export default function HeroField() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6.2], fov: 42 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
    >
      <WireCore />
      <ParticleShell />
    </Canvas>
  );
}
