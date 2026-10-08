import type { Metadata } from "next";
import Footer from "@/components/sections/Footer";
import Navbar from "@/components/sections/Navbar";
import BlogForm from "@/components/sections/BlogForm";

export const metadata: Metadata = {
  title: "Write a post | Sohail Patel",
  description: "Publish a blog post. Open to anyone.",
};

export default function NewBlogPage() {
  return (
    <main className="relative pt-16">
      <Navbar />
      <BlogForm />
      <Footer />
    </main>
  );
}
