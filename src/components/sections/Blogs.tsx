import ScrollReveal from "@/components/effects/ScrollReveal";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import EditorialLink from "@/components/ui/EditorialLink";
import SectionLabel from "@/components/ui/SectionLabel";
import type { BlogPost } from "@/types/blog";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function Blogs({ posts }: { posts: BlogPost[] }) {
  return (
    <section className="relative py-16 sm:py-20 lg:py-24">
      <Container>
        <ScrollReveal mode="inView" className="max-w-2xl">
          <SectionLabel>Blog</SectionLabel>
          <div className="mt-4 flex flex-wrap items-end justify-between gap-6">
            <h1 className="text-section font-sans font-semibold leading-[1.1] text-[var(--color-text-primary)]">
              Writing &amp; notes.
            </h1>
            <Button href="/blogs/new" variant="secondary" size="sm">
              Write a post
            </Button>
          </div>
          <p className="mt-5 text-sm leading-6 text-[var(--color-text-secondary)] sm:text-base">
            Anyone can publish here. Share what you are building, shipping, or learning.
          </p>
        </ScrollReveal>

        {posts.length === 0 ? (
          <p className="mt-12 text-sm text-[var(--color-text-muted)]">
            No posts yet. Be the first to write one.
          </p>
        ) : (
          <div className="mt-10 grid gap-6 sm:mt-12 md:grid-cols-2">
            {posts.map((post, index) => (
              <ScrollReveal key={post.id} mode="inView" direction="up" delay={0.03 * index}>
                <Card className="flex h-full flex-col justify-between p-6 sm:p-8">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-[var(--color-border)] px-3 py-1 font-mono text-xs uppercase tracking-[0.14em] text-[var(--color-text-muted)]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <h2 className="mt-4 text-xl font-semibold leading-snug text-[var(--color-text-primary)]">
                      {post.title}
                    </h2>
                    <p className="mt-3 text-sm leading-6 text-[var(--color-text-secondary)]">
                      {post.excerpt}
                    </p>
                  </div>

                  <div className="mt-6 flex items-center justify-between border-t border-[var(--color-border)] pt-5">
                    <div className="text-xs text-[var(--color-text-muted)]">
                      <span className="text-[var(--color-text-primary)]">{post.author}</span>
                      {" · "}
                      {formatDate(post.createdAt)}
                    </div>
                    <EditorialLink href={`/blogs/${post.slug}`}>Read</EditorialLink>
                  </div>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}
