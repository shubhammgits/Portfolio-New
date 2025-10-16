"use client";

import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Spotify from "@/components/Spotify";
import LikeButton from "@/components/LikeButton";

export default function Home() {
  return (
    <div className="min-h-screen bg-[--background]">
      <Header />
      <main>
        <Hero />
        <Projects />
        <Contact />
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row items-start justify-between gap-8">
            <div className="mt-8">
              <LikeButton />
            </div>
            <div className="w-full">
              <Spotify />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}