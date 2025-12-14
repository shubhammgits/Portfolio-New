import type { Metadata } from "next";
import "./globals.css";
import LenisWrapper from "@/components/LenisWrapper";

export const metadata: Metadata = {
  title: "Shubham Portfolio",
  description: "My Portfolio Website",
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
