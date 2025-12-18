'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { useSceneStore } from '@/store/sceneStore';
import { portfolio } from '@/lib/portfolio';

const Scene = dynamic(() => import('@/components/Scene'), { ssr: false });
const LoadingScreen = dynamic(() => import('@/components/LoadingScreen'), { ssr: false });
const Navigation = dynamic(() => import('@/components/Navigation'), { ssr: false });
const HeroScene = dynamic(() => import('@/components/HeroScene'), { ssr: false });
const ProjectsGallery = dynamic(() => import('@/components/ProjectsGallery'), { ssr: false });
const LikeButton = dynamic(() => import('@/components/LikeButton'), { ssr: false });
const SpotifyPeek = dynamic(() => import('@/components/SpotifyPeek'), { ssr: false });
const ScrollVFX = dynamic(() => import('@/components/ScrollVFX'), { ssr: false });
const HUDDock = dynamic(() => import('@/components/HUDDock'), { ssr: false });
const AchievementToasts = dynamic(() => import('@/components/AchievementToasts'), { ssr: false });

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

  if (!mounted) {
    return (
      <div className="fixed inset-0 bg-dm-bg-dark flex items-center justify-center">
        <div className="text-dm-text text-2xl font-mono">Loading...</div>
      </div>
    );
  }

  return (
    <main className="relative min-h-screen overflow-x-hidden">
      {/* Mouse Position Tracker */}
      <MouseTracker />

      {/* Scroll-driven CSS depth */}
      <ScrollVFX />

      {/* Fun UI overlays */}
      <AchievementToasts />

      {/* Loading Screen */}
      {mounted && isLoading && <LoadingScreen />}

      {/* 3D Scene Background */}
      {mounted && (
        <Scene scrollPages={5}>
          <HeroScene />
          <ProjectsGallery />
        </Scene>
      )}

      {/* HTML Content Layer */}
      <div className="relative z-10 pointer-events-none">
        {/* Section 1: Hero */}
        <section className="h-screen flex items-center justify-center pointer-events-auto">
          <div className="text-center max-w-4xl mx-auto px-8 fade-in-cinematic">
            <h1 className="text-7xl md:text-8xl font-bold text-header mb-6 tracking-tight">
              {portfolio.name}
            </h1>
            <p className="text-xl md:text-2xl text-body max-w-2xl mx-auto leading-relaxed">
              {portfolio.headline}
            </p>
            <p className="mt-6 text-sm text-body">
              Tip: scroll like you’re unlocking a new level.
            </p>
          </div>
        </section>

        {/* Section 2: About */}
        <section className="h-screen flex items-center justify-center pointer-events-auto">
          <div className="max-w-3xl mx-auto px-8">
            <div className="glass-morph p-12 rounded-3xl">
              <h2 className="text-5xl font-bold text-header mb-4">About</h2>
              <div className="text-sm text-body mb-8">{portfolio.location}</div>
              {portfolio.bio.map((line) => (
                <p key={line} className="text-lg text-body leading-relaxed mb-4">
                  {line}
                </p>
              ))}

              <div className="flex flex-wrap gap-3 mt-8">
                {portfolio.socials.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="glass-morph px-4 py-2 rounded-full text-sm text-dm-text/90 hover:text-dm-text hover:bg-white/5 transition-colors"
                  >
                    {link.label}
                  </a>
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
              Scroll to explore 3D project cards floating in space. Double‑click one to open it.
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
                Let’s build something slightly unhinged (in a good way).
              </p>
              <a
                href={portfolio.contact.primaryCtaHref}
                target={portfolio.contact.primaryCtaHref.startsWith('http') ? '_blank' : undefined}
                rel={portfolio.contact.primaryCtaHref.startsWith('http') ? 'noreferrer' : undefined}
                className="inline-block glass-morph px-8 py-4 rounded-full text-dm-text hover:bg-white/10 transition-all duration-300 magnetic-button"
              >
                {portfolio.contact.primaryCtaLabel}
              </a>

              <div className="mt-8 text-xs text-body">
                Bonus: click the heart to spawn confetti.
              </div>
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
            <SpotifyPeek />
            <HUDDock />
          </>
        )}
      </div>
    </main>
  );
}
