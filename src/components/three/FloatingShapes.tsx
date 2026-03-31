"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, MeshWobbleMaterial } from "@react-three/drei";
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
    geometry: "sphere" | "octahedron" | "torus" | "icosahedron" | "torusKnot";
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
                return <torusGeometry args={[1, 0.38, 16, 48]} />;
            case "icosahedron":
                return <icosahedronGeometry args={[1, 1]} />;
            case "torusKnot":
                return <torusKnotGeometry args={[0.7, 0.25, 80, 12]} />;
            default:
                return <sphereGeometry args={[1, 32, 32]} />;
        }
    };

    return (
        <Float speed={speed} rotationIntensity={0.6} floatIntensity={2.5}>
            <mesh ref={meshRef} position={position} scale={scale}>
                <GeometryComponent />
                <MeshDistortMaterial
                    color={color}
                    transparent
                    opacity={0.18}
                    distort={0.35}
                    speed={2.5}
                    roughness={0.1}
                    metalness={0.9}
                    envMapIntensity={1}
                />
            </mesh>
        </Float>
    );
}

function WireframeShape({
    position,
    color,
    speed,
    scale,
}: {
    position: [number, number, number];
    color: string;
    speed: number;
    scale: number;
}) {
    const meshRef = useRef<THREE.Mesh>(null!);

    useFrame((state) => {
        if (!meshRef.current) return;
        meshRef.current.rotation.y = state.clock.elapsedTime * speed * 0.5;
        meshRef.current.rotation.x = state.clock.elapsedTime * speed * 0.3;
    });

    return (
        <Float speed={speed * 0.7} rotationIntensity={0.3} floatIntensity={1.5}>
            <mesh ref={meshRef} position={position} scale={scale}>
                <icosahedronGeometry args={[1, 1]} />
                <meshBasicMaterial
                    color={color}
                    wireframe
                    transparent
                    opacity={0.12}
                />
            </mesh>
        </Float>
    );
}

export default function FloatingShapes() {
    return (
        <group>
            {/* Main shapes */}
            <FloatingShape
                position={[-4, 2, -3]}
                color="#6c63ff"
                speed={1.5}
                scale={0.9}
                geometry="octahedron"
            />
            <FloatingShape
                position={[4, -1, -4]}
                color="#00d4ff"
                speed={1.2}
                scale={0.65}
                geometry="torus"
            />
            <FloatingShape
                position={[-2.5, -3, -2]}
                color="#ff6fd8"
                speed={1.8}
                scale={0.55}
                geometry="icosahedron"
            />
            <FloatingShape
                position={[3, 3, -5]}
                color="#6c63ff"
                speed={1}
                scale={1.1}
                geometry="sphere"
            />
            <FloatingShape
                position={[0, -2.5, -6]}
                color="#00d4ff"
                speed={0.8}
                scale={0.75}
                geometry="octahedron"
            />
            <FloatingShape
                position={[-5, 0, -5]}
                color="#ff6fd8"
                speed={1.3}
                scale={0.5}
                geometry="torusKnot"
            />

            {/* Wireframe accent shapes */}
            <WireframeShape
                position={[4.5, 2, -4]}
                color="#6c63ff"
                speed={0.6}
                scale={1.2}
            />
            <WireframeShape
                position={[-3.5, -1.5, -6]}
                color="#00d4ff"
                speed={0.4}
                scale={1.5}
            />
        </group>
    );
}
