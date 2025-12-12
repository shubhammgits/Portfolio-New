import type { Metadata } from "next";
import "./globals.css";
import LenisWrapper from "@/components/LenisWrapper";

export const metadata: Metadata = {
  title: "Shubham — 3D Portfolio",
  description: "A playful, deep-purple 3D portfolio with cinematic scrolling and WebGL vibes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans">
        <LenisWrapper>
          {children}
        </LenisWrapper>
      </body>
    </html>
  );
}
