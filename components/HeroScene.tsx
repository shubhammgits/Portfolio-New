'use client';

import { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Center, useScroll } from '@react-three/drei';
import { Physics } from '@react-three/rapier';
import * as THREE from 'three';
import { useSceneStore } from '@/store/sceneStore';
import FloatingElement from './FloatingElement';

function Avatar() {
  const groupRef = useRef<THREE.Group>(null);
  const mousePosition = useSceneStore((state) => state.mousePosition);

  useFrame(() => {
    if (!groupRef.current) return;

    const targetX = mousePosition.x * 0.5;
    const targetY = mousePosition.y * 0.5;

    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      targetX,
      0.05
    );

    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      -targetY * 0.3,
      0.05
    );
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Placeholder Avatar - Replace with actual model */}
      <mesh castShadow>
        <sphereGeometry args={[1.5, 32, 32]} />
        <meshStandardMaterial
          color="#6D28D9"
          roughness={0.4}
          metalness={0.6}
          envMapIntensity={1}
        />
      </mesh>

      {/* Inner Core */}
      <mesh scale={0.7}>
        <sphereGeometry args={[1.5, 32, 32]} />
        <meshStandardMaterial
          color="#FFFFFF"
          transparent
          opacity={0.1}
          emissive="#FFFFFF"
          emissiveIntensity={0.2}
        />
      </mesh>

      {/* Orbital Ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.5, 0.05, 16, 100]} />
        <meshStandardMaterial
          color="#2A0A4A"
          roughness={0.3}
          metalness={0.8}
        />
      </mesh>
    </group>
  );
}

function Bio3DText() {
  const textRef = useRef<THREE.Group>(null);
  const scroll = useScroll();

  useFrame(() => {
    if (!textRef.current) return;

    const scrollOffset = scroll.offset;

    // Start shattering at 15% scroll
    if (scrollOffset > 0.15) {
      const shatterProgress = Math.min((scrollOffset - 0.15) / 0.1, 1);

      // Fade out and scatter
      textRef.current.children.forEach((child, i) => {
        if (child instanceof THREE.Mesh) {
          child.position.x += Math.sin(i) * shatterProgress * 0.1;
          child.position.y += Math.cos(i) * shatterProgress * 0.1;
          child.position.z += (Math.random() - 0.5) * shatterProgress * 2;
          
          if (child.material instanceof THREE.Material) {
            child.material.opacity = 1 - shatterProgress;
          }
        }
      });
    }
  });

  return (
    <group ref={textRef} position={[0, -4, 0]}>
      <Center>
        {/* Using mesh text as fallback */}
        <mesh>
          <boxGeometry args={[8, 0.5, 0.2]} />
          <meshStandardMaterial
            color="#FFFFFF"
            roughness={0.3}
            metalness={0.7}
            transparent
            opacity={1}
          />
        </mesh>
      </Center>
    </group>
  );
}

export default function HeroScene() {
  const { camera } = useThree();
  const scroll = useScroll();

  // Generate random positions for floating shards
  const shardPositions = useMemo(() => {
    return Array.from({ length: 20 }, () => [
      (Math.random() - 0.5) * 15,
      (Math.random() - 0.5) * 15,
      (Math.random() - 0.5) * 10 - 5,
    ] as [number, number, number]);
  }, []);

  const shardTypes = ['shard', 'pyramid', 'box', 'sphere'] as const;

  useFrame(() => {
    const scrollOffset = scroll.offset;

    // Camera fly-through animation
    if (scrollOffset < 0.3) {
      // Hero section - gentle float
      camera.position.z = THREE.MathUtils.lerp(camera.position.z, 10, 0.05);
      camera.position.y = THREE.MathUtils.lerp(camera.position.y, 0, 0.05);
    } else {
      // Zoom into avatar's "eye" then fly past shards
      const flyProgress = (scrollOffset - 0.3) / 0.2;
      camera.position.z = THREE.MathUtils.lerp(10, -20, flyProgress);
      camera.position.y = THREE.MathUtils.lerp(0, 5, flyProgress);
    }
  });

  return (
    <Physics gravity={[0, 0, 0]}>
      <group position={[0, 2, 0]}>
        <Avatar />
      </group>

      <Bio3DText />

      {/* Floating Shards with Physics */}
      {shardPositions.map((pos, i) => (
        <FloatingElement
          key={i}
          position={pos}
          geometry={shardTypes[i % shardTypes.length]}
          color={i % 2 === 0 ? '#6D28D9' : '#2A0A4A'}
          scale={0.5 + Math.random() * 0.5}
        />
      ))}

      {/* Ground Plane for reflections */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -5, 0]} receiveShadow>
        <planeGeometry args={[50, 50]} />
        <meshStandardMaterial
          color="#07010D"
          roughness={0.8}
          metalness={0.2}
          transparent
          opacity={0.5}
        />
      </mesh>
    </Physics>
  );
}
