'use client';

import { Canvas } from '@react-three/fiber';
import { ScrollControls, Environment } from '@react-three/drei';
import { EffectComposer, Bloom, Noise, Vignette } from '@react-three/postprocessing';
import { Suspense } from 'react';
import ClientOnly from './ClientOnly';

export function NoirLighting() {
  return (
    <>
      {/* Main Key Light - Soft from top-left */}
      <directionalLight
        position={[-5, 8, 5]}
        intensity={0.8}
        color="#FFFFFF"
        castShadow
      />

      {/* Rim Light - Strong cool white from behind */}
      <directionalLight
        position={[0, 0, -10]}
        intensity={1.2}
        color="#E8F4FF"
      />

      {/* Ambient Occlusion Simulation */}
      <ambientLight intensity={0.1} color="#313647" />

      {/* Fill Light - Subtle from bottom */}
      <pointLight
        position={[0, -5, 2]}
        intensity={0.3}
        color="#44444E"
        distance={15}
        decay={2}
      />

      {/* Accent Lights for depth */}
      <pointLight
        position={[10, 5, -5]}
        intensity={0.4}
        color="#FFFFFF"
        distance={20}
      />
      <pointLight
        position={[-10, -5, -5]}
        intensity={0.3}
        color="#333446"
        distance={20}
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
    <div className="fixed inset-0 z-0">
      <ClientOnly>
        <Canvas
          camera={{
            position: [0, 0, 10],
            fov: 50,
            near: 0.1,
            far: 1000,
          }}
          shadows
          gl={{
            antialias: true,
            alpha: false,
            powerPreference: 'high-performance',
          }}
          dpr={[1, 2]}
          frameloop="always"
        >
          {/* Background Color */}
          <color attach="background" args={['#222222']} />
          
          {/* Fog for depth */}
          <fog attach="fog" args={['#222222', 10, 50]} />

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