import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import LenisWrapper from "@/components/LenisWrapper";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Dark Matter - Portfolio",
  description: "A high-fidelity 3D portfolio experience crafted with advanced materiality and cinematic physics.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="font-sans">
        <LenisWrapper>
          {children}
        </LenisWrapper>
      </body>
    </html>
  );
}
