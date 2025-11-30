'use client';

import { useEffect, useRef, useState } from 'react';
import { useProgress } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useSceneStore } from '@/store/sceneStore';

// Assembling Wireframe Shard Component
function AssemblingShard() {
  const meshRef = useRef<THREE.Mesh>(null);
  const particlesRef = useRef<THREE.Points>(null);
  const { progress } = useProgress();
  const [isExploding, setIsExploding] = useState(false);

  useFrame((state) => {
    if (!meshRef.current) return;

    // Rotate the shard
    meshRef.current.rotation.x = state.clock.elapsedTime * 0.3;
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.5;

    // Assemble animation - scale based on progress
    const targetScale = Math.min(progress / 100, 1);
    meshRef.current.scale.lerp(
      new THREE.Vector3(targetScale, targetScale, targetScale),
      0.1
    );

    // Explode particles when complete
    if (progress >= 100 && !isExploding && particlesRef.current) {
      setIsExploding(true);
    }

    if (isExploding && particlesRef.current) {
      const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < positions.length; i += 3) {
        positions[i] += (Math.random() - 0.5) * 0.3;
        positions[i + 1] += (Math.random() - 0.5) * 0.3;
        positions[i + 2] += (Math.random() - 0.5) * 0.3;
      }
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
      
      // Fade out
      if (particlesRef.current.material instanceof THREE.PointsMaterial) {
        particlesRef.current.material.opacity = Math.max(
          0,
          particlesRef.current.material.opacity - 0.02
        );
      }
    }
  });

  // Create particle system for explosion
  const particleCount = 1000;
  const particlePositions = new Float32Array(particleCount * 3);
  
  for (let i = 0; i < particleCount * 3; i += 3) {
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    const r = 2;
    
    particlePositions[i] = r * Math.sin(phi) * Math.cos(theta);
    particlePositions[i + 1] = r * Math.sin(phi) * Math.sin(theta);
    particlePositions[i + 2] = r * Math.cos(phi);
  }

  return (
    <group>
      {/* Main Wireframe Shard */}
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[2, 1]} />
        <meshBasicMaterial
          color="#44444E"
          wireframe
          transparent
          opacity={0.8}
        />
      </mesh>

      {/* Inner Glow */}
      <mesh scale={0.9}>
        <icosahedronGeometry args={[2, 1]} />
        <meshBasicMaterial
          color="#FFFFFF"
          transparent
          opacity={0.1}
        />
      </mesh>

      {/* Explosion Particles */}
      {progress >= 100 && (
        <points ref={particlesRef}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={particleCount}
              array={particlePositions}
              itemSize={3}
            />
          </bufferGeometry>
          <pointsMaterial
            size={0.05}
            color="#44444E"
            transparent
            opacity={1}
            sizeAttenuation
          />
        </points>
      )}
    </group>
  );
}

// Scene for the loader
function LoaderScene() {
  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={0.8} color="#FFFFFF" />
      <pointLight position={[-10, -10, -10]} intensity={0.3} color="#44444E" />
      <AssemblingShard />
    </>
  );
}

export default function LoadingScreen() {
  const { progress } = useProgress();
  const setIsLoading = useSceneStore((state) => state.setIsLoading);
  const setLoadingProgress = useSceneStore((state) => state.setLoadingProgress);
  const [shouldHide, setShouldHide] = useState(false);

  useEffect(() => {
    setLoadingProgress(progress);

    if (progress >= 100) {
      // Wait for explosion animation before hiding
      setTimeout(() => {
        setShouldHide(true);
        setTimeout(() => {
          setIsLoading(false);
        }, 800); // Match CSS transition
      }, 1200);
    }
  }, [progress, setIsLoading, setLoadingProgress]);

  return (
    <div
      className={`loading-screen ${shouldHide ? 'fade-out' : ''}`}
      style={{
        background: 'linear-gradient(135deg, #222222 0%, #313647 100%)',
      }}
    >
      <div className="relative w-full h-full">
        {/* 3D Canvas */}
        <Canvas
          camera={{ position: [0, 0, 8], fov: 50 }}
          gl={{ antialias: true, alpha: false }}
        >
          <color attach="background" args={['#222222']} />
          <LoaderScene />
        </Canvas>

        {/* Percentage Counter */}
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2">
          <div className="text-center">
            <div className="text-6xl font-mono mono-counter text-dm-text mb-2">
              {Math.round(progress)}%
            </div>
            <div className="text-sm text-body tracking-widest uppercase">
              Loading Experience
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-64">
          <div className="h-px bg-dm-secondary rounded-full overflow-hidden">
            <div
              className="h-full bg-dm-text transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
