import FreeTools from "@/components/sections/FreeTools";

export const metadata = {
  title: "Free Tools | Sohail Patel",
  description:
    "A curated collection of the best free, browser-based web utilities — Color Palette Generator, JSON Formatter, Password Generator, QR Code Generator, and more. No login, no limits.",
  keywords: [
    "free web tools",
    "color palette generator",
    "json formatter",
    "password generator",
    "qr code generator",
    "base64 encoder",
    "css gradient builder",
    "unit converter",
    "markdown previewer",
    "css box shadow",
    "word counter",
  ],
};

import Navbar from "@/components/sections/Navbar";

export default function FreeToolsPage() {
  return (
    <>
      <Navbar />
      <FreeTools />
    </>
  );
}
