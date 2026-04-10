import LearnWithMe from "@/components/sections/LearnWithMe";
import Navbar from "@/components/sections/Navbar";

export const metadata = {
  title: "Learn With Me | Sohail Patel",
  description:
    "Explore the technologies I've worked on, learn my favorite patterns, and discover how I structure production-grade applications.",
  keywords: [
    "learn web development",
    "react native tutorials",
    "next.js patterns",
    "framer motion guide",
    "frontend developer",
    "software engineering tips",
  ],
};

export default function LearnPage() {
  return (
    <>
      <Navbar />
      <LearnWithMe />
    </>
  );
}
