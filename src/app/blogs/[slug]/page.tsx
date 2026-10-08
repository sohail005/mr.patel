import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Footer from "@/components/sections/Footer";
import Navbar from "@/components/sections/Navbar";
import ScrollReveal from "@/components/effects/ScrollReveal";
import Container from "@/components/ui/Container";
import SectionLabel from "@/components/ui/SectionLabel";
import { getBlogBySlug } from "@/lib/blogs";
import { linkifyText } from "@/lib/linkify";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogBySlug(slug);

  if (!post) {
    return { title: "Post not found | Sohail Patel" };
  }

  return {
    title: `${post.title} | Sohail Patel`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getBlogBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="relative pt-16">
      <Navbar />

      <section className="relative py-16 sm:py-20 lg:py-24">
        <Container>
          <ScrollReveal mode="inView" className="max-w-3xl">
            <Link
              href="/blogs"
              className="group inline-flex items-center gap-1.5 rounded-sm text-sm font-medium text-[var(--color-text-primary)] transition-colors hover:text-[var(--color-primary-accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-background)]"
            >
              <ArrowLeft
                size={16}
                strokeWidth={1.75}
                className="transition-transform duration-200 group-hover:-translate-x-1"
              />
              Back to blog
            </Link>

            <SectionLabel className="mt-8 block">Blog</SectionLabel>
            <h1
              className="mt-4 font-sans font-semibold leading-[1.1] text-[var(--color-text-primary)]"
              style={{ fontSize: "clamp(1.25rem, 2.5vw, 2.5rem)" }}
            >
              {post.title}
            </h1>

            <div className="mt-5 flex flex-wrap items-center gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-[var(--color-border)] px-3 py-1 font-mono text-xs uppercase tracking-[0.14em] text-[var(--color-text-muted)]"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="mt-5 text-sm text-[var(--color-text-muted)]">
              <span className="text-[var(--color-text-primary)]">{post.author}</span>
              {" · "}
              {formatDate(post.createdAt)}
            </div>

            <div className="mt-10 whitespace-pre-wrap text-base leading-7 text-[var(--color-text-secondary)]">
              {linkifyText(
                post.content,
                "text-[var(--color-primary-accent)] underline underline-offset-2 hover:text-[var(--color-text-primary)]"
              )}
            </div>
          </ScrollReveal>
        </Container>
      </section>

      <Footer />
    </main>
  );
}
