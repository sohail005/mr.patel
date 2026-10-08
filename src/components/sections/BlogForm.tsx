"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import ScrollReveal from "@/components/effects/ScrollReveal";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import SectionLabel from "@/components/ui/SectionLabel";

const inputClasses =
  "mt-2 w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-3 text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] outline-none transition-colors focus:border-[var(--color-primary-accent)]";

export default function BlogForm() {
  const router = useRouter();
  const [formState, setFormState] = useState({
    title: "",
    author: "",
    tags: "",
    content: "",
  });
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (!formState.title.trim() || !formState.author.trim() || !formState.content.trim()) {
      setError("Please fill in title, author, and content.");
      return;
    }

    setSending(true);
    setError("");

    try {
      const response = await fetch("/api/blogs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: formState.title,
          author: formState.author,
          content: formState.content,
          tags: formState.tags
            .split(",")
            .map((tag) => tag.trim())
            .filter(Boolean),
        }),
      });
      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error || "Unable to publish your post.");
      }

      router.push(`/blogs/${result.post.slug}`);
    } catch (caughtError) {
      setError(
        caughtError instanceof Error
          ? caughtError.message
          : "Unable to publish your post right now."
      );
      setSending(false);
    }
  };

  return (
    <section className="relative py-16 sm:py-20 lg:py-24">
      <Container>
        <ScrollReveal mode="inView" className="max-w-2xl">
          <SectionLabel>Blog</SectionLabel>
          <h1 className="text-section mt-4 font-sans font-semibold leading-[1.1] text-[var(--color-text-primary)]">
            Write a post.
          </h1>
          <p className="mt-5 text-sm leading-6 text-[var(--color-text-secondary)] sm:text-base">
            Anyone can publish here. Share something useful.
          </p>
        </ScrollReveal>

        <ScrollReveal mode="inView" direction="up" className="mt-10 sm:mt-12">
          <form
            onSubmit={handleSubmit}
            className="mx-auto flex max-w-2xl flex-col rounded-2xl border border-[var(--color-border)] p-6 sm:p-8"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="block">
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--color-text-muted)]">
                  Title
                </span>
                <input
                  type="text"
                  name="title"
                  placeholder="Post title"
                  aria-label="Title"
                  value={formState.title}
                  onChange={(event) =>
                    setFormState((state) => ({ ...state, title: event.target.value }))
                  }
                  className={inputClasses}
                />
              </label>

              <label className="block">
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--color-text-muted)]">
                  Your name
                </span>
                <input
                  type="text"
                  name="author"
                  placeholder="Author name"
                  aria-label="Author"
                  value={formState.author}
                  onChange={(event) =>
                    setFormState((state) => ({ ...state, author: event.target.value }))
                  }
                  className={inputClasses}
                />
              </label>
            </div>

            <label className="mt-5 block">
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--color-text-muted)]">
                Tags (comma separated)
              </span>
              <input
                type="text"
                name="tags"
                placeholder="Next.js, React, Notes"
                aria-label="Tags"
                value={formState.tags}
                onChange={(event) =>
                  setFormState((state) => ({ ...state, tags: event.target.value }))
                }
                className={inputClasses}
              />
            </label>

            <label className="mt-5 block">
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--color-text-muted)]">
                Content
              </span>
              <textarea
                required
                rows={10}
                placeholder="Write your post..."
                value={formState.content}
                onChange={(event) =>
                  setFormState((state) => ({ ...state, content: event.target.value }))
                }
                className={inputClasses}
              />
            </label>

            {error ? <p className="mt-4 text-sm text-red-300">{error}</p> : null}

            <Button
              type="submit"
              variant="primary"
              className="mt-6 w-full text-(--color-text-primary)"
            >
              {sending ? (
                <>
                  <span
                    aria-hidden="true"
                    className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-current border-t-transparent"
                  />
                  <span>Publishing...</span>
                </>
              ) : (
                "Publish post"
              )}
            </Button>
          </form>
        </ScrollReveal>
      </Container>
    </section>
  );
}
