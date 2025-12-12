'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { RigidBody, RapierRigidBody } from '@react-three/rapier';
import * as THREE from 'three';
import { useSceneStore } from '@/store/sceneStore';

interface FloatingElementProps {
  position: [number, number, number];
  geometry: 'box' | 'sphere' | 'pyramid' | 'shard';
  color?: string;
  scale?: number;
  mouseRepulsion?: boolean;
}

export default function FloatingElement({
  position,
  geometry,
  color = '#44444E',
  scale = 1,
  mouseRepulsion = true,
}: FloatingElementProps) {
  const rigidBodyRef = useRef<RapierRigidBody>(null);
  const meshRef = useRef<THREE.Mesh>(null);
  const mousePosition = useSceneStore((state) => state.mousePosition);

  const brownianOffset = useMemo(() => ({
    x: Math.random() * Math.PI * 2,
    y: Math.random() * Math.PI * 2,
    z: Math.random() * Math.PI * 2,
  }), []);

  useFrame((state) => {
    if (!rigidBodyRef.current) return;

    const time = state.clock.elapsedTime;
    const brownianForce = new THREE.Vector3(
      Math.sin(time * 0.3 + brownianOffset.x) * 0.02,
      Math.cos(time * 0.2 + brownianOffset.y) * 0.02,
      Math.sin(time * 0.25 + brownianOffset.z) * 0.02
    );

    rigidBodyRef.current.applyImpulse(brownianForce, true);

    // Mouse Repulsion
    if (mouseRepulsion && meshRef.current) {
      const meshPos = meshRef.current.position;
      const mousePos3D = new THREE.Vector3(
        mousePosition.x * 10,
        mousePosition.y * 10,
        0
      );

      const distance = meshPos.distanceTo(mousePos3D);
      const repulsionRadius = 5;

      if (distance < repulsionRadius) {
        const direction = new THREE.Vector3()
          .subVectors(meshPos, mousePos3D)
          .normalize();
        
        const forceMagnitude = (1 - distance / repulsionRadius) * 0.5;
        const repulsionForce = direction.multiplyScalar(forceMagnitude);

        rigidBodyRef.current.applyImpulse(repulsionForce, true);
      }
    }

    // Gentle rotation
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.001;
      meshRef.current.rotation.y += 0.002;
    }
  });

  // Geometry Selection
  const renderGeometry = () => {
    switch (geometry) {
      case 'box':
        return <boxGeometry args={[1, 1, 1]} />;
      case 'sphere':
        return <sphereGeometry args={[0.5, 16, 16]} />;
      case 'pyramid':
        return <coneGeometry args={[0.5, 1, 4]} />;
      case 'shard':
        return <octahedronGeometry args={[0.6, 0]} />;
      default:
        return <boxGeometry args={[1, 1, 1]} />;
    }
  };

  return (
    <RigidBody
      ref={rigidBodyRef}
      position={position}
      colliders="hull"
      mass={1}
      linearDamping={0.8}
      angularDamping={0.8}
      restitution={0.5}
    >
      <mesh ref={meshRef} scale={scale} castShadow receiveShadow>
        {renderGeometry()}
        <meshStandardMaterial
          color={color}
          roughness={0.7}
          metalness={0.3}
          envMapIntensity={0.5}
        />
      </mesh>
    </RigidBody>
  );
}
