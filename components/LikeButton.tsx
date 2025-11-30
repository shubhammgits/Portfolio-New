'use client';

import { useRef, useState, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useSceneStore } from '@/store/sceneStore';
import { Canvas } from '@react-three/fiber';

// 3D Geometric Confetti using InstancedMesh
function GeometricConfetti({ count = 100, trigger }: { count?: number; trigger: number }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  
  const particles = useMemo(() => {
    return Array.from({ length: count }, () => ({
      position: new THREE.Vector3(0, 0, 0),
      velocity: new THREE.Vector3(
        (Math.random() - 0.5) * 2,
        Math.random() * 3 + 2,
        (Math.random() - 0.5) * 2
      ),
      rotation: new THREE.Euler(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      ),
      rotationVelocity: new THREE.Euler(
        (Math.random() - 0.5) * 0.2,
        (Math.random() - 0.5) * 0.2,
        (Math.random() - 0.5) * 0.2
      ),
      scale: Math.random() * 0.3 + 0.2,
      life: 1,
      color: Math.random() > 0.5 ? '#44444E' : '#333446',
    }));
  }, [count]);

  useFrame((state, delta) => {
    if (!meshRef.current || trigger === 0) return;

    const dummy = new THREE.Object3D();
    const gravity = -9.8;

    particles.forEach((particle, i) => {
      if (particle.life <= 0) return;

      // Physics
      particle.velocity.y += gravity * delta;
      particle.position.add(particle.velocity.clone().multiplyScalar(delta));
      particle.rotation.x += particle.rotationVelocity.x;
      particle.rotation.y += particle.rotationVelocity.y;
      particle.rotation.z += particle.rotationVelocity.z;

      // Decay
      particle.life -= delta;

      // Update instance
      dummy.position.copy(particle.position);
      dummy.rotation.copy(particle.rotation);
      dummy.scale.setScalar(particle.scale * particle.life);
      dummy.updateMatrix();

      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });

    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  // Mixed geometry types
  const geometries = [
    new THREE.BoxGeometry(0.2, 0.2, 0.2),
    new THREE.OctahedronGeometry(0.15),
    new THREE.TetrahedronGeometry(0.15),
  ];

  return (
    <>
      {geometries.map((geo, idx) => (
        <instancedMesh
          key={idx}
          ref={idx === 0 ? meshRef : null}
          args={[geo, undefined, Math.floor(count / 3)]}
        >
          <meshStandardMaterial
            color={idx % 2 === 0 ? '#44444E' : '#333446'}
            roughness={0.7}
            metalness={0.3}
          />
        </instancedMesh>
      ))}
    </>
  );
}

export default function LikeButton() {
  const likeCount = useSceneStore((state) => state.likeCount);
  const incrementLikes = useSceneStore((state) => state.incrementLikes);
  const [confettiTrigger, setConfettiTrigger] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleLike = () => {
    incrementLikes();
    setConfettiTrigger((prev) => prev + 1);
    setIsAnimating(true);

    setTimeout(() => setIsAnimating(false), 300);
  };

  return (
    <>
      {/* HTML Button */}
      <button
        onClick={handleLike}
        className="fixed bottom-24 right-8 z-50 glass-morph rounded-full p-4 shadow-2xl group hover:scale-110 transition-transform duration-300"
        style={{
          transform: isAnimating ? 'scale(0.9)' : 'scale(1)',
        }}
      >
        <div className="flex flex-col items-center gap-2">
          {/* Heart Icon */}
          <div className="relative">
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              className="text-dm-text transition-all duration-300 group-hover:text-white"
            >
              <path
                d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                fill="currentColor"
                opacity="0.3"
              />
            </svg>
            
            {/* Pulse Animation */}
            {isAnimating && (
              <div className="absolute inset-0 animate-ping">
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="text-dm-text"
                >
                  <path
                    d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                    fill="currentColor"
                    opacity="0.3"
                  />
                </svg>
              </div>
            )}
          </div>

          {/* Counter */}
          <span className="text-dm-text text-sm font-mono mono-counter">
            {likeCount}
          </span>
        </div>
      </button>

      {/* 3D Confetti Canvas */}
      {confettiTrigger > 0 && (
        <div className="fixed bottom-24 right-8 w-64 h-64 pointer-events-none z-40">
          <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
            <GeometricConfetti count={50} trigger={confettiTrigger} />
          </Canvas>
        </div>
      )}
    </>
  );
}
