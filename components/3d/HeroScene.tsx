"use client";
import { useRef, useEffect, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere, MeshDistortMaterial, Stars, Float, Torus } from "@react-three/drei";
import * as THREE from "three";

function DistortSphere() {
  const meshRef = useRef<THREE.Mesh>(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const targetRot = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      mousePos.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mousePos.current.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;
    targetRot.current.x += (mousePos.current.y * 0.3 - targetRot.current.x) * 0.05;
    targetRot.current.y += (mousePos.current.x * 0.3 - targetRot.current.y) * 0.05;
    meshRef.current.rotation.x = targetRot.current.x;
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.15 + targetRot.current.y;
  });

  return (
    <Float speed={2} rotationIntensity={0.4} floatIntensity={0.8}>
      <Sphere ref={meshRef} args={[1, 64, 64]}>
        <MeshDistortMaterial
          color="#3B82F6"
          attach="material"
          distort={0.45}
          speed={2}
          roughness={0.1}
          metalness={0.8}
          transparent
          opacity={0.85}
        />
      </Sphere>
    </Float>
  );
}

function InnerWireframe() {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y = -state.clock.elapsedTime * 0.2;
    meshRef.current.rotation.x = state.clock.elapsedTime * 0.1;
  });

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[1.35, 1]} />
      <meshBasicMaterial color="#8B5CF6" wireframe transparent opacity={0.12} />
    </mesh>
  );
}

function OrbitRing() {
  const groupRef = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    groupRef.current.rotation.x = 0.4;
  });

  return (
    <group ref={groupRef}>
      <Torus args={[1.8, 0.008, 4, 128]}>
        <meshBasicMaterial color="#06B6D4" transparent opacity={0.35} />
      </Torus>
    </group>
  );
}

function FloatingParticles() {
  const count = 60;
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 8;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 8;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 8;
    }
    return arr;
  }, []);

  const pointsRef = useRef<THREE.Points>(null);
  useFrame((state) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y = state.clock.elapsedTime * 0.02;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color="#3B82F6"
        size={0.025}
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

export default function HeroScene() {
  return (
    <div style={{ width: "100%", height: "100%", position: "absolute", inset: 0 }}>
      <Canvas
        camera={{ position: [0, 0, 4], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.3} />
        <pointLight position={[5, 5, 5]} intensity={2} color="#3B82F6" />
        <pointLight position={[-5, -3, 3]} intensity={1.5} color="#8B5CF6" />
        <pointLight position={[0, 5, -3]} intensity={1} color="#06B6D4" />

        <DistortSphere />
        <InnerWireframe />
        <OrbitRing />
        <FloatingParticles />
        <Stars
          radius={15}
          depth={20}
          count={600}
          factor={2}
          saturation={0.5}
          fade
          speed={0.5}
        />
      </Canvas>
    </div>
  );
}
