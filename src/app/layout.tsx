import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  weight: ["400", "500", "600", "700"],
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
        className={`${jetBrainsMono.className} ${jetBrainsMono.variable} antialiased`}
      >
        <div className="noise-overlay" />
        {children}
      </body>
    </html>
  );
}
