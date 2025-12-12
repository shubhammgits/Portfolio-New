'use client';

import { ReactLenis, useLenis } from 'lenis/react';
import { useSceneStore } from '@/store/sceneStore';

function LenisSync() {
  const setScrollProgress = useSceneStore((state) => state.setScrollProgress);
  const setCurrentSection = useSceneStore((state) => state.setCurrentSection);

  useLenis((lenis) => {
    const limit = Math.max(1, lenis.limit || 1);
    const progress = Math.min(1, Math.max(0, (lenis.scroll || 0) / limit));
    setScrollProgress(progress);

    // 5 sections/pages in the current layout (0..4)
    const section = Math.min(4, Math.max(0, Math.round(progress * 4)));
    setCurrentSection(section);
  }, []);

  return null;
}

export default function LenisWrapper({ children }: { children: React.ReactNode }) {
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
      <LenisSync />
      {children}
    </ReactLenis>
  );
}
