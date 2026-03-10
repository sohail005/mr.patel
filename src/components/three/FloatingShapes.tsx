"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

function FloatingShape({
    position,
    color,
    speed,
    scale,
    geometry,
}: {
    position: [number, number, number];
    color: string;
    speed: number;
    scale: number;
    geometry: "sphere" | "octahedron" | "torus" | "icosahedron";
}) {
    const meshRef = useRef<THREE.Mesh>(null!);

    useFrame((state) => {
        if (!meshRef.current) return;
        meshRef.current.rotation.x = state.clock.elapsedTime * speed * 0.3;
        meshRef.current.rotation.z = state.clock.elapsedTime * speed * 0.2;
    });

    const GeometryComponent = () => {
        switch (geometry) {
            case "octahedron":
                return <octahedronGeometry args={[1, 0]} />;
            case "torus":
                return <torusGeometry args={[1, 0.4, 16, 32]} />;
            case "icosahedron":
                return <icosahedronGeometry args={[1, 0]} />;
            default:
                return <sphereGeometry args={[1, 32, 32]} />;
        }
    };

    return (
        <Float speed={speed} rotationIntensity={0.5} floatIntensity={2}>
            <mesh ref={meshRef} position={position} scale={scale}>
                <GeometryComponent />
                <MeshDistortMaterial
                    color={color}
                    transparent
                    opacity={0.15}
                    distort={0.3}
                    speed={2}
                    roughness={0.2}
                    metalness={0.8}
                />
            </mesh>
        </Float>
    );
}

export default function FloatingShapes() {
    return (
        <group>
            <FloatingShape
                position={[-4, 2, -3]}
                color="#6c63ff"
                speed={1.5}
                scale={0.8}
                geometry="octahedron"
            />
            <FloatingShape
                position={[4, -1, -4]}
                color="#00d4ff"
                speed={1.2}
                scale={0.6}
                geometry="torus"
            />
            <FloatingShape
                position={[-2, -3, -2]}
                color="#ff6fd8"
                speed={1.8}
                scale={0.5}
                geometry="icosahedron"
            />
            <FloatingShape
                position={[3, 3, -5]}
                color="#6c63ff"
                speed={1}
                scale={1}
                geometry="sphere"
            />
            <FloatingShape
                position={[0, -2, -6]}
                color="#00d4ff"
                speed={0.8}
                scale={0.7}
                geometry="octahedron"
            />
        </group>
    );
}
