"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const vertexShader = `
  varying vec2 vUv;
  varying float vDepth;
  void main() {
    vUv = uv;
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    vDepth = -mvPosition.z;
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const fragmentShader = `
  uniform float uTime;
  uniform float uSpeed;
  varying vec2 vUv;
  varying float vDepth;

  float hash(vec2 p) {
    p = fract(p * vec2(234.34, 435.345));
    p += dot(p, p + 34.23);
    return fract(p.x * p.y);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(hash(i), hash(i + vec2(1,0)), f.x),
      mix(hash(i + vec2(0,1)), hash(i + vec2(1,1)), f.x),
      f.y
    );
  }

  void main() {
    vec2 uv = vUv;
    float t = uTime * uSpeed;

    // Tunnel effect: map UV to radial coordinates
    vec2 center = uv - 0.5;
    float dist = length(center);
    float angle = atan(center.y, center.x);

    // Spiral tunnel
    float tunnel = fract(angle / (2.0 * 3.14159) + t * 0.2 + dist * 2.0);
    float depth = fract(1.0 / (dist + 0.1) * 0.05 + t);

    float n1 = noise(vec2(angle * 3.0, dist * 8.0 - t * 2.0));
    float n2 = noise(vec2(angle * 6.0 + 0.5, dist * 4.0 + t));
    float combined = n1 * 0.6 + n2 * 0.4;

    // Color scheme: purple -> cyan -> pink
    vec3 col1 = vec3(0.424, 0.392, 1.0);  // #6c63ff
    vec3 col2 = vec3(0.0, 0.831, 1.0);    // #00d4ff
    vec3 col3 = vec3(1.0, 0.435, 0.847);  // #ff6fd8

    float colorMix = fract(combined + t * 0.1);
    vec3 color = mix(col1, col2, smoothstep(0.0, 0.5, colorMix));
    color = mix(color, col3, smoothstep(0.5, 1.0, colorMix));

    // Vignette: fade to black at edges and center
    float vignette = smoothstep(0.0, 0.2, dist) * smoothstep(0.5, 0.3, dist);
    color *= vignette * 2.0;

    // Rim glow
    float rim = smoothstep(0.35, 0.45, dist) * 0.4;
    color += vec3(0.4, 0.2, 0.8) * rim;

    // Streaks
    float streak = pow(max(0.0, sin(angle * 12.0 + t * 3.0)), 8.0) * 0.3;
    color += col2 * streak * (1.0 - dist * 2.0);

    float alpha = vignette * (0.4 + combined * 0.3);
    gl_FragColor = vec4(color, alpha * 0.6);
  }
`;

export default function WormholeTunnel() {
    const meshRef = useRef<THREE.Mesh>(null!);
    const materialRef = useRef<THREE.ShaderMaterial>(null!);

    const uniforms = useMemo(
        () => ({
            uTime: { value: 0 },
            uSpeed: { value: 0.3 },
        }),
        []
    );

    useFrame((state) => {
        if (materialRef.current) {
            materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
        }
        if (meshRef.current) {
            meshRef.current.rotation.z = state.clock.elapsedTime * 0.05;
        }
    });

    return (
        <mesh ref={meshRef} position={[0, 0, -3]} scale={[14, 14, 1]}>
            <planeGeometry args={[1, 1, 1, 1]} />
            <shaderMaterial
                ref={materialRef}
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
                uniforms={uniforms}
                transparent
                depthWrite={false}
                blending={THREE.AdditiveBlending}
                side={THREE.DoubleSide}
            />
        </mesh>
    );
}
