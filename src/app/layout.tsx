import type { Metadata } from "next";
import { Inter, Outfit, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
});

export const metadata: Metadata = {
  title: "Sohail Patel | Software Developer",
  description:
    "Explore the portfolio of Sohail Patel — a software developer crafting scalable digital products with modern web and mobile technologies.",
  keywords: [
    "developer portfolio",
    "full-stack developer",
    "React",
    "Next.js",
    "Three.js",
    "3D web",
  ],
  openGraph: {
    title: "Sohail Patel | Developer Portfolio",
    description: "Software Developer",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} ${outfit.variable} ${jetbrainsMono.variable} antialiased`}
      >
        <div className="noise-overlay" />
        {children}
      </body>
    </html>
  );
}
