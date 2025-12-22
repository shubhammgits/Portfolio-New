'use client';

import { Canvas } from '@react-three/fiber';
import { ScrollControls, Environment } from '@react-three/drei';
import { EffectComposer, Bloom, Noise, Vignette } from '@react-three/postprocessing';
import { Suspense } from 'react';
import ClientOnly from './ClientOnly';

export function NoirLighting() {
  return (
    <>
      {/* Main Key Light */}
      <directionalLight
        position={[-5, 8, 5]}
        intensity={1.5}
        color="#FFFFFF"
        castShadow
      />

      {/* Fill Light */}
      <directionalLight
        position={[5, 0, 5]}
        intensity={0.8}
        color="#E8F4FF"
      />

      {/* Ambient Light */}
      <ambientLight intensity={0.4} color="#FFFFFF" />

      {/* Purple Accent */}
      <pointLight
        position={[0, 2, 8]}
        intensity={0.5}
        color="#A78BFA"
        distance={25}
        decay={2}
      />
    </>
  );
}

// Post-Processing Effects
function Effects() {
  return (
    <EffectComposer>
      {/* Subtle Bloom for rim lights */}
      <Bloom
        intensity={0.3}
        luminanceThreshold={0.9}
        luminanceSmoothing={0.9}
        mipmapBlur
      />
      
      {/* Film Grain Noise */}
      <Noise opacity={0.015} />
      
      {/* Vignette for cinematic framing */}
      <Vignette
        offset={0.3}
        darkness={0.5}
        eskil={false}
      />
    </EffectComposer>
  );
}

interface SceneProps {
  children: React.ReactNode;
  scrollPages?: number;
}

export default function Scene({ children, scrollPages = 5 }: SceneProps) {
  return (
    <div className="fixed inset-0 z-0 bg-dm-bg-dark">
      <ClientOnly>
        <Canvas
          camera={{
            position: [0, 0, 15],
            fov: 60,
            near: 0.1,
            far: 1000,
          }}
          shadows
          gl={{
            antialias: true,
            powerPreference: 'high-performance',
          }}
          dpr={[1, 2]}
          frameloop="always"
        >
          {/* Background Color */}
          <color attach="background" args={['#07010D']} />
          
          {/* Fog for depth */}
          <fog attach="fog" args={['#07010D', 20, 100]} />

          {/* Lighting Setup */}
          <NoirLighting />

          {/* Scroll Controls for scroll-driven animations */}
          <ScrollControls pages={scrollPages} damping={0.2}>
            <Suspense fallback={null}>
              {children}
            </Suspense>
          </ScrollControls>

          {/* Environment for reflections */}
          <Environment preset="city" />

          {/* Post-Processing */}
          <Effects />
        </Canvas>
      </ClientOnly>
    </div>
  );
}