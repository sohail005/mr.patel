import type { Metadata } from "next";
import Footer from "@/components/sections/Footer";
import Navbar from "@/components/sections/Navbar";
import Contact from "@/components/sections/Contact";

export const metadata: Metadata = {
  title: "Contact | Sohail Patel",
  description:
    "Get in touch with Sohail Patel to discuss app deployment, development, or website projects.",
};

export default function ContactPage() {
  return (
    <main className="relative pt-16">
      <Navbar />
      <Contact />
      <Footer />
    </main>
  );
}
