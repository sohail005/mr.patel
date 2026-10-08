import type { Metadata } from "next";
import Footer from "@/components/sections/Footer";
import Navbar from "@/components/sections/Navbar";
import Blogs from "@/components/sections/Blogs";
import { getAllBlogs } from "@/lib/blogs";

export const metadata: Metadata = {
  title: "Blog | Sohail Patel",
  description: "Writing and notes from Sohail Patel, open for anyone to contribute.",
};

export default async function BlogsPage() {
  const posts = await getAllBlogs();

  return (
    <main className="relative pt-16">
      <Navbar />
      <Blogs posts={posts} />
      <Footer />
    </main>
  );
}
