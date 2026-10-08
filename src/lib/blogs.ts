import fs from "fs/promises";
import path from "path";
import type { BlogPost } from "@/types/blog";

const DATA_FILE = path.join(process.cwd(), "src/data/blogs.json");

async function readBlogs(): Promise<BlogPost[]> {
  const raw = await fs.readFile(DATA_FILE, "utf-8");
  return JSON.parse(raw) as BlogPost[];
}

async function writeBlogs(posts: BlogPost[]): Promise<void> {
  await fs.writeFile(DATA_FILE, JSON.stringify(posts, null, 2) + "\n", "utf-8");
}

export function slugify(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export async function getAllBlogs(): Promise<BlogPost[]> {
  const posts = await readBlogs();
  return posts.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export async function getBlogBySlug(slug: string): Promise<BlogPost | undefined> {
  const posts = await readBlogs();
  return posts.find((post) => post.slug === slug);
}

export type CreateBlogInput = {
  title: string;
  author: string;
  content: string;
  tags: string[];
};

export async function createBlog(input: CreateBlogInput): Promise<BlogPost> {
  const posts = await readBlogs();

  const baseSlug = slugify(input.title) || "post";
  let slug = baseSlug;
  let suffix = 2;
  while (posts.some((post) => post.slug === slug)) {
    slug = `${baseSlug}-${suffix}`;
    suffix += 1;
  }

  const excerpt =
    input.content.length > 180 ? `${input.content.slice(0, 180).trim()}...` : input.content;

  const post: BlogPost = {
    id: slug,
    slug,
    title: input.title,
    author: input.author,
    excerpt,
    content: input.content,
    tags: input.tags,
    createdAt: new Date().toISOString(),
  };

  posts.push(post);
  await writeBlogs(posts);

  return post;
}
