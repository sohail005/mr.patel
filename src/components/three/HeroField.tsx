"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, RoundedBox } from "@react-three/drei";
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

/** Procedural "code editor" texture — avoids shipping a GLB/image asset for the hero. */
function useCodeTexture(accent: string) {
  return useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 320;
    const ctx = canvas.getContext("2d");
    if (!ctx) return new THREE.Texture();

    ctx.fillStyle = "#0b1512";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "rgba(255,255,255,0.06)";
    ctx.fillRect(0, 0, canvas.width, 28);
    ["#ff5f57", "#febc2e", "#28c840"].forEach((color, i) => {
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(22 + i * 20, 14, 6, 0, Math.PI * 2);
      ctx.fill();
    });

    const lineColors = [accent, "rgba(255,255,255,0.5)", "rgba(255,255,255,0.28)"];
    let y = 56;
    let seed = 1;
    while (y < canvas.height - 20) {
      const indent = 24 + (seededRandom(seed++) > 0.7 ? 32 : 0);
      const width = 60 + seededRandom(seed++) * 260;
      ctx.fillStyle = lineColors[Math.floor(seededRandom(seed++) * lineColors.length)];
      ctx.globalAlpha = 0.85;
      ctx.fillRect(indent, y, width, 8);
      ctx.globalAlpha = 1;
      y += 20;
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    return texture;
  }, [accent]);
}

function useGlyphTexture(char: string, color: string) {
  return useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 128;
    canvas.height = 128;
    const ctx = canvas.getContext("2d");
    if (!ctx) return new THREE.Texture();
    ctx.font = "700 72px monospace";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = color;
    ctx.globalAlpha = 0.85;
    ctx.fillText(char, 64, 70);
    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    return texture;
  }, [char, color]);
}

function CodeGlyph({
  char,
  color,
  position,
}: {
  char: string;
  color: string;
  position: [number, number, number];
}) {
  const texture = useGlyphTexture(char, color);
  return (
    <Float speed={1.4} rotationIntensity={0.3} floatIntensity={0.8}>
      <sprite position={position} scale={0.4}>
        <spriteMaterial map={texture} transparent opacity={0.85} depthWrite={false} />
      </sprite>
    </Float>
  );
}

function Workspace({ primary, secondary }: { primary: string; secondary: string }) {
  const groupRef = useRef<THREE.Group>(null!);
  const codeTexture = useCodeTexture(primary);
  const pointer = useRef({ x: 0, y: 0 });
  const scrollRef = useScrollProgress("hero");

  useEffect(() => {
    const onMove = (event: PointerEvent) => {
      pointer.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (event.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;
    const scroll = scrollRef.current;

    const targetRotY = pointer.current.x * 0.22 + scroll * 0.5;
    const targetRotX = -pointer.current.y * 0.14 + Math.sin(t * 0.3) * 0.02;

    groupRef.current.rotation.y += (targetRotY - groupRef.current.rotation.y) * 0.06;
    groupRef.current.rotation.x += (targetRotX - groupRef.current.rotation.x) * 0.06;
    groupRef.current.position.y = -scroll * 0.6 + Math.sin(t * 0.6) * 0.05;
    groupRef.current.position.z = -scroll * 0.8;
  });

  return (
    <group ref={groupRef}>
      <group rotation={[0.18, -0.32, 0]} position={[0.3, 0, 0]}>
        <RoundedBox args={[2.1, 1.3, 0.06]} radius={0.06} smoothness={4}>
          <meshStandardMaterial
            color="#0b1512"
            metalness={0.3}
            roughness={0.4}
            emissive="#0b1512"
          />
        </RoundedBox>
        <mesh position={[0, 0, 0.035]}>
          <planeGeometry args={[1.98, 1.18]} />
          <meshBasicMaterial map={codeTexture} toneMapped={false} />
        </mesh>
        <RoundedBox args={[0.3, 0.26, 0.08]} radius={0.03} position={[0, -0.76, -0.1]}>
          <meshStandardMaterial color="#0b1512" metalness={0.4} roughness={0.5} />
        </RoundedBox>
        <mesh position={[0, -0.95, -0.1]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[1.4, 0.5]} />
          <meshBasicMaterial color={secondary} transparent opacity={0.08} />
        </mesh>
      </group>

      <CodeGlyph char="</>" color={primary} position={[-1.6, 0.6, 0.4]} />
      <CodeGlyph char="{ }" color={secondary} position={[1.7, -0.5, 0.6]} />
      <CodeGlyph char="=>" color={primary} position={[-1.3, -0.9, -0.3]} />
    </group>
  );
}

function useScrollProgress(sectionId: string) {
  const progressRef = useRef(0);

  useEffect(() => {
    const node = document.getElementById(sectionId);
    if (!node) return;

    const onScroll = () => {
      const rect = node.getBoundingClientRect();
      const height = rect.height || window.innerHeight;
      progressRef.current = Math.min(1, Math.max(0, -rect.top / height));
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [sectionId]);

  return progressRef;
}

function ParticleShell({
  count = 700,
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
        <meshBasicMaterial color={secondary} wireframe transparent opacity={0.16} />
      </mesh>
      <mesh scale={0.6}>
        <icosahedronGeometry args={[1.7, 0]} />
        <meshBasicMaterial color={primary} wireframe transparent opacity={0.25} />
      </mesh>
    </group>
  );
}

function SceneLighting({ primary }: { primary: string }) {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[2, 3, 2]} intensity={0.8} />
      <pointLight position={[-2, -1, 1.5]} intensity={6} color={primary} distance={6} />
    </>
  );
}

function FrameloopGate({ active, children }: { active: boolean; children: React.ReactNode }) {
  const { set } = useThree();
  useEffect(() => {
    set({ frameloop: active ? "always" : "never" });
  }, [active, set]);
  return <>{children}</>;
}

export default function HeroField() {
  const [colors] = useState(() => ({
    primary: readCssColor("--color-primary-accent", "#cc6600"),
    secondary: readCssColor("--color-secondary-accent", "#cc6600"),
  }));
  const [active, setActive] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting),
      { threshold: 0.05 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="h-full w-full">
      <Canvas
        camera={{ position: [0, 0, 5.6], fov: 42 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <FrameloopGate active={active}>
          <SceneLighting primary={colors.primary} />
          <WireCore primary={colors.primary} secondary={colors.secondary} />
          <ParticleShell color={colors.primary} />
          <Workspace primary={colors.primary} secondary={colors.secondary} />
        </FrameloopGate>
      </Canvas>
    </div>
  );
}
