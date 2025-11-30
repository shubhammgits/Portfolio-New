'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { useSceneStore } from '@/store/sceneStore';

// Dynamically import 3D components with no SSR
const Scene = dynamic(() => import('@/components/Scene'), { ssr: false });
const LoadingScreen = dynamic(() => import('@/components/LoadingScreen'), { ssr: false });
const Navigation = dynamic(() => import('@/components/Navigation'), { ssr: false });
const HeroScene = dynamic(() => import('@/components/HeroScene'), { ssr: false });
const ProjectsGallery = dynamic(() => import('@/components/ProjectCard').then(mod => ({ default: mod.ProjectsGallery })), { ssr: false });
const LikeButton = dynamic(() => import('@/components/LikeButton'), { ssr: false });

// Mouse tracking
function MouseTracker() {
  const setMousePosition = useSceneStore((state) => state.setMousePosition);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Normalize to -1 to 1
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [setMousePosition]);

  return null;
}

export default function Home() {
  const isLoading = useSceneStore((state) => state.isLoading);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <main className="relative min-h-screen overflow-x-hidden">
      {/* Mouse Position Tracker */}
      <MouseTracker />

      {/* Loading Screen */}
      {isLoading && <LoadingScreen />}

      {/* 3D Scene Background */}
      <Scene scrollPages={5}>
        <HeroScene />
        <ProjectsGallery />
      </Scene>

      {/* HTML Content Layer */}
      <div className="relative z-10 pointer-events-none">
        {/* Section 1: Hero */}
        <section className="h-screen flex items-center justify-center pointer-events-auto">
          <div className="text-center max-w-4xl mx-auto px-8 fade-in-cinematic">
            <h1 className="text-7xl md:text-8xl font-bold text-header mb-6 tracking-tight">
              Dark Matter
            </h1>
            <p className="text-xl md:text-2xl text-body max-w-2xl mx-auto leading-relaxed">
              A high-fidelity 3D portfolio experience crafted with advanced materiality and cinematic physics.
            </p>
          </div>
        </section>

        {/* Section 2: About */}
        <section className="h-screen flex items-center justify-center pointer-events-auto">
          <div className="max-w-3xl mx-auto px-8">
            <div className="glass-morph p-12 rounded-3xl">
              <h2 className="text-5xl font-bold text-header mb-6">About</h2>
              <p className="text-lg text-body leading-relaxed mb-6">
                Specializing in WebGL experiences that push the boundaries of what's possible on the web. 
                Combining creative vision with technical excellence to deliver immersive digital experiences.
              </p>
              <div className="grid grid-cols-3 gap-4 mt-8">
                {['Three.js', 'GSAP', 'React'].map((skill) => (
                  <div key={skill} className="glass-morph p-4 rounded-xl text-center">
                    <span className="text-sm text-body">{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Projects */}
        <section className="h-screen flex items-center justify-center pointer-events-auto">
          <div className="max-w-4xl mx-auto px-8 text-center">
            <h2 className="text-6xl font-bold text-header mb-6">Projects</h2>
            <p className="text-lg text-body mb-12">
              Scroll to explore 3D project cards floating in space
            </p>
          </div>
        </section>

        {/* Section 4: Projects Continued */}
        <section className="h-screen" />

        {/* Section 5: Contact */}
        <section className="h-screen flex items-center justify-center pointer-events-auto">
          <div className="max-w-2xl mx-auto px-8">
            <div className="glass-morph p-12 rounded-3xl text-center">
              <h2 className="text-5xl font-bold text-header mb-6">Get in Touch</h2>
              <p className="text-lg text-body mb-8">
                Let's create something extraordinary together.
              </p>
              <a
                href="mailto:hello@darkmatter.dev"
                className="inline-block glass-morph px-8 py-4 rounded-full text-dm-text hover:bg-white/10 transition-all duration-300 magnetic-button"
              >
                hello@darkmatter.dev
              </a>
            </div>
          </div>
        </section>
      </div>

      {/* Floating UI Elements */}
      <div className="pointer-events-auto">
        {mounted && (
          <>
            <Navigation />
            <LikeButton />
          </>
        )}
      </div>
    </main>
  );
}
