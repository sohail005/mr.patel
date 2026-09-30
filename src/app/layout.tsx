import type { Metadata } from "next";
import { Geist, JetBrains_Mono } from "next/font/google";
import { headers } from "next/headers";
import "./globals.css";
import { sohailContact } from "@/data/sohail";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  weight: ["400", "500", "600"],
  display: "swap",
});

const SITE_DESCRIPTION =
  "I engineer modern, production-ready web & mobile experiences. React Native, Next.js, React.js, Firebase, SEO, and production deployment.";

export const metadata: Metadata = {
  // TODO: update to the real production domain once it's live.
  metadataBase: new URL("https://sohailpatel.dev"),
  title: "Sohail Patel | Software Developer",
  description: SITE_DESCRIPTION,
  keywords: [
    "developer portfolio",
    "React Native developer",
    "Next.js developer",
    "React developer",
    "mobile app development",
    "web development",
    "full-stack developer",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Sohail Patel | Software Developer",
    description: SITE_DESCRIPTION,
    siteName: "Sohail Patel",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sohail Patel | Software Developer",
    description: SITE_DESCRIPTION,
  },
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Sohail Patel",
  jobTitle: "Software Developer",
  url: "https://sohailpatel.dev",
  email: `mailto:${sohailContact.email}`,
  sameAs: [
    sohailContact.github,
    sohailContact.linkedin,
    sohailContact.threads,
    sohailContact.instagram,
    sohailContact.youtube,
  ],
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const nonce = (await headers()).get("x-nonce") ?? undefined;

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          nonce={nonce}
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
      </head>
      <body className={`${geist.variable} ${jetBrainsMono.variable} antialiased`}>
        <div className="noise-overlay" />
        {children}
      </body>
    </html>
  );
}
