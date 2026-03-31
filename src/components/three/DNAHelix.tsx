"use client";

import { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

interface StrandNode {
    position: THREE.Vector3;
    color: THREE.Color;
    side: "left" | "right";
    t: number;
}

export default function DNAHelix() {
    const groupRef = useRef<THREE.Group>(null!);
    const { mouse } = useThree();

    const nodeCount = 28;
    const helixRadius = 0.7;
    const helixHeight = 5.5;
    const helixTurns = 3.5;

    const { nodes, connectors } = useMemo(() => {
        const nodes: StrandNode[] = [];
        const connectors: [THREE.Vector3, THREE.Vector3][] = [];

        const colorA = new THREE.Color("#6c63ff");
        const colorB = new THREE.Color("#00d4ff");
        const colorC = new THREE.Color("#ff6fd8");

        for (let i = 0; i < nodeCount; i++) {
            const t = i / (nodeCount - 1);
            const angle = t * Math.PI * 2 * helixTurns;
            const y = (t - 0.5) * helixHeight;

            const leftPos = new THREE.Vector3(
                Math.cos(angle) * helixRadius,
                y,
                Math.sin(angle) * helixRadius
            );
            const rightPos = new THREE.Vector3(
                Math.cos(angle + Math.PI) * helixRadius,
                y,
                Math.sin(angle + Math.PI) * helixRadius
            );

            const color = i % 3 === 0 ? colorA : i % 3 === 1 ? colorB : colorC;
            nodes.push({ position: leftPos, color: color.clone(), side: "left", t });
            nodes.push({ position: rightPos, color: color.clone(), side: "right", t });

            // Connector rungs every other node
            if (i % 2 === 0) {
                connectors.push([leftPos.clone(), rightPos.clone()]);
            }
        }

        return { nodes, connectors };
    }, []);

    const connectorGeometries = useMemo(() => {
        return connectors.map(([start, end]) => {
            const dir = new THREE.Vector3().subVectors(end, start);
            const mid = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5);
            const len = dir.length();

            const geo = new THREE.CylinderGeometry(0.015, 0.015, len, 6);
            return { geo, mid, dir, len };
        });
    }, [connectors]);

    useFrame((state) => {
        if (!groupRef.current) return;
        const t = state.clock.elapsedTime;

        // Gentle auto-rotation
        groupRef.current.rotation.y = t * 0.25;

        // Mouse parallax tilt
        groupRef.current.rotation.x = THREE.MathUtils.lerp(
            groupRef.current.rotation.x,
            mouse.y * 0.3,
            0.05
        );
        groupRef.current.rotation.z = THREE.MathUtils.lerp(
            groupRef.current.rotation.z,
            -mouse.x * 0.15,
            0.05
        );
    });

    return (
        <group ref={groupRef} position={[2.5, 0, -1]}>
            {/* Strand nodes */}
            {nodes.map((node, i) => (
                <mesh key={`node-${i}`} position={node.position}>
                    <sphereGeometry args={[0.07, 12, 12]} />
                    <meshStandardMaterial
                        color={node.color}
                        emissive={node.color}
                        emissiveIntensity={0.8}
                        roughness={0.1}
                        metalness={0.5}
                        transparent
                        opacity={0.9}
                    />
                </mesh>
            ))}

            {/* Connector rungs */}
            {connectorGeometries.map((c, i) => {
                const quaternion = new THREE.Quaternion();
                const axis = new THREE.Vector3(1, 0, 0);
                const dir = c.dir.clone().normalize();
                quaternion.setFromUnitVectors(axis, dir);
                const euler = new THREE.Euler().setFromQuaternion(quaternion);

                return (
                    <mesh key={`rung-${i}`} position={c.mid} rotation={euler}>
                        <cylinderGeometry args={[0.012, 0.012, c.len, 6]} />
                        <meshStandardMaterial
                            color="#ffffff"
                            emissive="#8b83ff"
                            emissiveIntensity={0.4}
                            transparent
                            opacity={0.35}
                            roughness={0.3}
                            metalness={0.6}
                        />
                    </mesh>
                );
            })}

            {/* Core glow aura */}
            <mesh>
                <cylinderGeometry args={[0.06, 0.06, helixHeight, 8]} />
                <meshBasicMaterial
                    color="#6c63ff"
                    transparent
                    opacity={0.07}
                    blending={THREE.AdditiveBlending}
                    depthWrite={false}
                />
            </mesh>
        </group>
    );
}
