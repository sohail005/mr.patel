"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Text, Float } from "@react-three/drei";
import * as THREE from "three";

const skills = [
    "React", "Next.js", "TypeScript", "Tailwind CSS", "Redux",
    "Context API", "React Native", "Reanimated", "Framer Motion", "GSAP",
    "Git", "Fastlane", "CI/CD", "App Store", "Play Store",
    "REST APIs", "AWS", "Figma", "Three.js", "Node.js",
];

function SkillNode({ text, position, color }: { text: string; position: [number, number, number]; color: string }) {
    const meshRef = useRef<THREE.Mesh>(null!);

    useFrame((state) => {
        if (!meshRef.current) return;
        meshRef.current.lookAt(state.camera.position);
    });

    return (
        <Float speed={1.5} rotationIntensity={0} floatIntensity={1}>
            <group position={position}>
                <mesh ref={meshRef}>
                    <sphereGeometry args={[0.08, 16, 16]} />
                    <meshBasicMaterial color={color} transparent opacity={0.8} />
                </mesh>
                <Text
                    position={[0, 0.2, 0]}
                    fontSize={0.14}
                    color="white"
                    anchorX="center"
                    anchorY="middle"
                    font="/fonts/Inter-Medium.woff"
                    outlineWidth={0.005}
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
            const radius = 2;
            return {
                text: skill,
                position: [
                    radius * Math.cos(theta) * Math.sin(phi),
                    radius * Math.sin(theta) * Math.sin(phi),
                    radius * Math.cos(phi),
                ] as [number, number, number],
                color: colors[i % colors.length],
            };
        });
    }, []);

    useFrame((state) => {
        if (!groupRef.current) return;
        groupRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    });

    return (
        <group ref={groupRef}>
            {nodes.map((node) => (
                <SkillNode key={node.text} {...node} />
            ))}
        </group>
    );
}

export default function SkillsSphere() {
    return (
        <Canvas camera={{ position: [0, 0, 5], fov: 50 }} dpr={[1, 1.5]}>
            <ambientLight intensity={0.5} />
            <SkillNodes />
        </Canvas>
    );
}
