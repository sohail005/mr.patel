import type { Metadata } from "next";
import Script from "next/script";
import { Fira_Code } from "next/font/google";
import ClickSpark from "@/components/effects/ClickSpark";
import LiquidGlassTracker from "@/components/effects/LiquidGlassTracker";
import StartExperience from "@/components/effects/StartExperience";
import PortfolioChat from "@/components/portfolio-chat/PortfolioChat";
import "./globals.css";

const inter = Fira_Code({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const jetBrainsMono = Fira_Code({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const playfairDisplay = Fira_Code({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const fraunce = Fira_Code({
  subsets: ["latin"],
  variable: "--font-fraunce",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const poppins = Fira_Code({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["400", "500", "600", "700"],
  display: "swap",
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
        <meta name="google-adsense-account" content="ca-pub-7274193441004898" />
        <script
          dangerouslySetInnerHTML={{
            __html:
              'try{var t=localStorage.getItem("portfolio-theme");if(t!=="midnight"&&t!=="daylight"){t="midnight";}document.documentElement.dataset.theme=t;}catch(e){}',
          }}
        />
      </head>
      <body
        className={`${inter.variable} ${jetBrainsMono.variable} ${playfairDisplay.variable} ${fraunce.variable} ${poppins.variable} antialiased`}
      >
        <ClickSpark
          sparkColor="#e8dcc4"
          sparkSize={12}
          sparkRadius={20}
          sparkCount={10}
          duration={460}
          extraScale={1.15}
        >
          <div className="noise-overlay" />
          <StartExperience />
          {children}
          <PortfolioChat />
          <LiquidGlassTracker />
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
