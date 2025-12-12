'use client';

import { useEffect } from 'react';
import { useSceneStore } from '@/store/sceneStore';

export default function ScrollVFX() {
  const scrollProgress = useSceneStore((state) => state.scrollProgress);

  useEffect(() => {
    const value = String(scrollProgress);
    document.documentElement.style.setProperty('--scroll', value);
  }, [scrollProgress]);

  return null;
}
