import type { Metadata } from "next";
import Script from "next/script";
import { JetBrains_Mono } from "next/font/google";
import ClickSpark from "@/components/effects/ClickSpark";
import ThemeSwitcher from "@/components/effects/ThemeSwitcher";
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
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html:
              'try{var t=localStorage.getItem("portfolio-theme")||"midnight";document.documentElement.dataset.theme=t;}catch(e){}',
          }}
        />
      </head>
      <body
        className={`${jetBrainsMono.variable} antialiased`}
      >
        <ClickSpark
          sparkColor="#cce6ff"
          sparkSize={12}
          sparkRadius={20}
          sparkCount={10}
          duration={460}
          extraScale={1.15}
        >
          <div className="noise-overlay" />
          {children}
          <ThemeSwitcher />
        </ClickSpark>
        <Script
          async
          strategy="afterInteractive"
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7274193441004898"
          crossOrigin="anonymous"
        />
      </body>
    </html>
  );
}
