import type { Metadata } from "next";
import "./globals.css";
import LenisWrapper from "@/components/LenisWrapper";

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
    <html lang="en">
      <body className="font-sans">
        <LenisWrapper>
          {children}
        </LenisWrapper>
      </body>
    </html>
  );
}
