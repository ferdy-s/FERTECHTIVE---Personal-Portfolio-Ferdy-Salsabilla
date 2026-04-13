// components/Globe3D.tsx
"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";
import { useMemo } from "react";

function GlobePoints() {
  const points = useMemo(() => {
    const pts = [];
    const radius = 2;

    for (let i = 0; i < 5000; i++) {
      const phi = Math.acos(2 * Math.random() - 1);
      const theta = 2 * Math.PI * Math.random();

      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);

      pts.push(x, y, z);
    }

    return new Float32Array(pts);
  }, []);

  return (
    <Points positions={points} stride={3}>
      <PointMaterial
        transparent
        color="#22d3ee"
        size={0.02}
        sizeAttenuation
        depthWrite={false}
      />
    </Points>
  );
}

function Rings() {
  return (
    <>
      {[...Array(4)].map((_, i) => (
        <mesh key={i} rotation={[Math.PI / 2 + i * 0.2, 0, 0]}>
          <ringGeometry args={[2.5 + i * 0.3, 2.52 + i * 0.3, 128]} />
          <meshBasicMaterial color="#22d3ee" transparent opacity={0.3} />
        </mesh>
      ))}
    </>
  );
}

export default function Globe3D() {
  return (
    <Canvas camera={{ position: [0, 0, 6] }}>
      <ambientLight intensity={0.5} />

      <group rotation={[0.4, 0.2, 0]}>
        <GlobePoints />
        <Rings />
      </group>

      <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
    </Canvas>
  );
}