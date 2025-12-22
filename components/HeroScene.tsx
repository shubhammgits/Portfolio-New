'use client';

import { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Center, useScroll } from '@react-three/drei';
import * as THREE from 'three';
import { useSceneStore } from '@/store/sceneStore';

function Avatar() {
  const groupRef = useRef<THREE.Group>(null);
  const mousePosition = useSceneStore((state) => state.mousePosition);

  useFrame((state) => {
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

    // Gentle bobbing animation
    groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
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
          emissive="#6D28D9"
          emissiveIntensity={0.2}
        />
      </mesh>

      {/* Inner Core */}
      <mesh scale={0.7}>
        <sphereGeometry args={[1.5, 32, 32]} />
        <meshStandardMaterial
          color="#FFFFFF"
          transparent
          opacity={0.15}
          emissive="#FFFFFF"
          emissiveIntensity={0.3}
        />
      </mesh>

      {/* Orbital Ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.5, 0.05, 16, 100]} />
        <meshStandardMaterial
          color="#A78BFA"
          roughness={0.3}
          metalness={0.8}
          emissive="#A78BFA"
          emissiveIntensity={0.3}
        />
      </mesh>
    </group>
  );
}

function FloatingShard({ position, index }: { position: [number, number, number]; index: number }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.elapsedTime;
    
    // Floating animation
    meshRef.current.position.y = position[1] + Math.sin(time * 0.5 + index) * 0.3;
    meshRef.current.rotation.x = time * 0.2 + index;
    meshRef.current.rotation.y = time * 0.3 + index * 0.5;
  });

  const geometryType = index % 4;
  const color = index % 2 === 0 ? '#6D28D9' : '#A78BFA';

  return (
    <mesh ref={meshRef} position={position} castShadow>
      {geometryType === 0 && <boxGeometry args={[0.5, 0.5, 0.5]} />}
      {geometryType === 1 && <octahedronGeometry args={[0.4]} />}
      {geometryType === 2 && <coneGeometry args={[0.3, 0.6, 4]} />}
      {geometryType === 3 && <sphereGeometry args={[0.3, 16, 16]} />}
      <meshStandardMaterial
        color={color}
        roughness={0.3}
        metalness={0.7}
        emissive={color}
        emissiveIntensity={0.3}
      />
    </mesh>
  );
}

export default function HeroScene() {
  const { camera } = useThree();
  const scroll = useScroll();
  const shardPositions = useMemo(() => {
    return Array.from({ length: 15 }, () => [
      (Math.random() - 0.5) * 12,
      (Math.random() - 0.5) * 10,
      (Math.random() - 0.5) * 8 - 3,
    ] as [number, number, number]);
  }, []);

  useFrame(() => {
    const scrollOffset = scroll.offset;
    if (scrollOffset < 0.2) {
      camera.position.z = THREE.MathUtils.lerp(camera.position.z, 15, 0.05);
      camera.position.y = THREE.MathUtils.lerp(camera.position.y, 0, 0.05);
    } else if (scrollOffset < 0.5) {
      const flyProgress = (scrollOffset - 0.2) / 0.3;
      camera.position.z = THREE.MathUtils.lerp(15, 8, flyProgress);
      camera.position.y = THREE.MathUtils.lerp(0, 2, flyProgress);
    }
  });

  return (
    <group>
      <group position={[0, 0, 0]}>
        <Avatar />
      </group>

      {/* Floating Shards */}
      {shardPositions.map((pos, i) => (
        <FloatingShard key={i} position={pos} index={i} />
      ))}

      {/* Ground Plane for depth */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -5, 0]} receiveShadow>
        <planeGeometry args={[50, 50]} />
        <meshStandardMaterial
          color="#07010D"
          roughness={0.8}
          metalness={0.2}
        />
      </mesh>
    </group>
  );
}
