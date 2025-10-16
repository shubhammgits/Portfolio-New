"use client";

import { useDarkMode } from "@/hooks/useDarkMode";
import Link from "next/link";

export default function Header() {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <header className="fixed w-full bg-[#1414149c] backdrop-blur-sm z-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4">
        {/* Dynamic island style navigation bar */}
        <nav className="flex justify-center items-center bg-[#1414149c] backdrop-blur-md border border-[#ffffff20] rounded-2xl px-6 py-3 shadow-lg">
          <div className="flex space-x-8">
            <Link href="#about" className="text-[var(--white-icon)] hover:text-[var(--white)] transition duration-300 ease-in-out font-medium">
              About
            </Link>
            <Link href="#projects" className="text-[var(--white-icon)] hover:text-[var(--white)] transition duration-300 ease-in-out font-medium">
              Projects
            </Link>
            <Link href="#contact" className="text-[var(--white-icon)] hover:text-[var(--white)] transition duration-300 ease-in-out font-medium">
              Contact
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}