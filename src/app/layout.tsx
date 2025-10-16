import type { Metadata } from "next";
import "./globals.css";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Shubham | Data Science Portfolio",
  description: "I am Shubham, a B.Tech CSE student, passionate about data science, AI, and machine learning, with a strong base in Python programming, data preprocessing, visualisation, and model building.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.cdnfonts.com/css/montserrat" rel="stylesheet" />
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=G-YOUR-GA-ID`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-YOUR-GA-ID');
          `}
        </Script>
      </head>
      <body className="bg-[--background] sm:px-28 lg:px-20 px-9">
        {children}
      </body>
    </html>
  );
}