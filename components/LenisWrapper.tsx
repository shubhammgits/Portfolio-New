'use client';

import { ReactLenis } from 'lenis/react';
import { useSceneStore } from '@/store/sceneStore';

export default function LenisWrapper({ children }: { children: React.ReactNode }) {
  const setScrollProgress = useSceneStore((state) => state.setScrollProgress);

  return (
    <ReactLenis
      root
      options={{
        lerp: 0.05,
        duration: 1.2,
        smoothWheel: true,
        wheelMultiplier: 0.8,
        touchMultiplier: 1.5,
      }}
    >
      {children}
    </ReactLenis>
  );
}
