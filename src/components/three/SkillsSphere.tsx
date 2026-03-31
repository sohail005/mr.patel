"use client";

import { useRef, useMemo, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Text, Float, OrbitControls } from "@react-three/drei";
import * as THREE from "three";

const skills = [
    "React", "Next.js", "TypeScript", "Tailwind CSS", "Redux",
    "Context API", "React Native", "Reanimated", "Framer Motion", "GSAP",
    "Git", "Fastlane", "CI/CD", "App Store", "Play Store",
    "REST APIs", "AWS", "Figma", "Three.js", "Node.js",
];

function OrbitalRing({ radius }: { radius: number }) {
    const meshRef = useRef<THREE.Mesh>(null!);

    useFrame((state) => {
        if (!meshRef.current) return;
        meshRef.current.rotation.y = state.clock.elapsedTime * 0.08;
        meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.06) * 0.3;
    });

    return (
        <mesh ref={meshRef}>
            <torusGeometry args={[radius, 0.005, 8, 120]} />
            <meshBasicMaterial
                color="#6c63ff"
                transparent
                opacity={0.25}
                blending={THREE.AdditiveBlending}
                depthWrite={false}
            />
        </mesh>
    );
}

function CoreSphere() {
    const meshRef = useRef<THREE.Mesh>(null!);

    useFrame((state) => {
        if (!meshRef.current) return;
        const t = state.clock.elapsedTime;
        const mat = meshRef.current.material as THREE.MeshStandardMaterial;
        mat.emissiveIntensity = 0.5 + Math.sin(t * 2) * 0.25;
    });

    return (
        <mesh ref={meshRef}>
            <sphereGeometry args={[0.18, 32, 32]} />
            <meshStandardMaterial
                color="#6c63ff"
                emissive="#6c63ff"
                emissiveIntensity={0.5}
                roughness={0.1}
                metalness={0.8}
                transparent
                opacity={0.9}
            />
        </mesh>
    );
}

function SkillNode({
    text,
    position,
    color,
    index,
}: {
    text: string;
    position: [number, number, number];
    color: string;
    index: number;
}) {
    const meshRef = useRef<THREE.Mesh>(null!);
    const [hovered, setHovered] = useState(false);

    useFrame((state) => {
        if (!meshRef.current) return;
        meshRef.current.lookAt(state.camera.position);
        if (hovered) {
            meshRef.current.scale.setScalar(
                THREE.MathUtils.lerp(meshRef.current.scale.x, 1.5, 0.1)
            );
        } else {
            meshRef.current.scale.setScalar(
                THREE.MathUtils.lerp(meshRef.current.scale.x, 1, 0.1)
            );
        }
    });

    return (
        <Float
            speed={1.2 + index * 0.05}
            rotationIntensity={0}
            floatIntensity={0.6}
        >
            <group position={position}>
                {/* Node sphere */}
                <mesh
                    ref={meshRef}
                    onPointerOver={() => setHovered(true)}
                    onPointerOut={() => setHovered(false)}
                >
                    <sphereGeometry args={[0.06, 16, 16]} />
                    <meshStandardMaterial
                        color={color}
                        emissive={color}
                        emissiveIntensity={hovered ? 1.5 : 0.8}
                        roughness={0.1}
                        metalness={0.5}
                        transparent
                        opacity={0.95}
                    />
                </mesh>

                {/* Glow halo */}
                <mesh>
                    <sphereGeometry args={[0.1, 16, 16]} />
                    <meshBasicMaterial
                        color={color}
                        transparent
                        opacity={hovered ? 0.25 : 0.08}
                        blending={THREE.AdditiveBlending}
                        depthWrite={false}
                    />
                </mesh>

                {/* Label */}
                <Text
                    position={[0, 0.19, 0]}
                    fontSize={0.13}
                    color={hovered ? "white" : "#e4e4e7"}
                    anchorX="center"
                    anchorY="middle"
                    outlineWidth={0.006}
                    outlineColor="#000000"
                >
                    {text}
                </Text>
            </group>
        </Float>
    );
}

function SkillNodes() {
    const groupRef = useRef<THREE.Group>(null!);

    const nodes = useMemo(() => {
        const colors = ["#6c63ff", "#00d4ff", "#ff6fd8"];
        return skills.map((skill, i) => {
            const phi = Math.acos(-1 + (2 * i) / skills.length);
            const theta = Math.sqrt(skills.length * Math.PI) * phi;
            const r = 2.2;
            return {
                text: skill,
                position: [
                    r * Math.cos(theta) * Math.sin(phi),
                    r * Math.sin(theta) * Math.sin(phi),
                    r * Math.cos(phi),
                ] as [number, number, number],
                color: colors[i % colors.length],
                index: i,
            };
        });
    }, []);

    useFrame((state) => {
        if (!groupRef.current) return;
        groupRef.current.rotation.y = state.clock.elapsedTime * 0.08;
    });

    return (
        <group ref={groupRef}>
            <CoreSphere />
            <OrbitalRing radius={2.2} />
            <OrbitalRing radius={1.6} />
            {nodes.map((node) => (
                <SkillNode key={node.text} {...node} />
            ))}
        </group>
    );
}

export default function SkillsSphere() {
    return (
        <Canvas
            camera={{ position: [0, 0, 5.5], fov: 50 }}
            dpr={[1, 1.5]}
            style={{ height: 520, background: "transparent" }}
            gl={{
                antialias: true,
                alpha: true,
                powerPreference: "high-performance",
                preserveDrawingBuffer: false,
            }}
        >
            <ambientLight intensity={0.5} />
            <pointLight position={[5, 5, 5]} intensity={0.8} color="#6c63ff" />
            <pointLight position={[-5, -5, 5]} intensity={0.6} color="#00d4ff" />
            <SkillNodes />
            <OrbitControls
                enableZoom={false}
                enablePan={false}
                autoRotate={false}
                rotateSpeed={0.5}
                minPolarAngle={Math.PI * 0.2}
                maxPolarAngle={Math.PI * 0.8}
            />
        </Canvas>
    );
}
