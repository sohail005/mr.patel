import { NextResponse } from "next/server";
import { createBlog, getAllBlogs } from "@/lib/blogs";

export const runtime = "nodejs";

const MAX_CONTENT_LENGTH = 50_000; // bytes
const MAX_TITLE_LENGTH = 150;
const MAX_AUTHOR_LENGTH = 100;
const MAX_BODY_LENGTH = 20_000;
const MAX_TAGS = 8;
const MAX_TAG_LENGTH = 30;
const CONTROL_CHARS_PATTERN = /[\x00-\x1f\x7f]/;

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const RATE_LIMIT_MAX_REQUESTS = 5;
const rateLimitBuckets = new Map<string, { count: number; resetAt: number }>();

function pruneRateLimitBuckets(now: number) {
  if (rateLimitBuckets.size < 500) return;
  for (const [key, bucket] of rateLimitBuckets) {
    if (bucket.resetAt <= now) rateLimitBuckets.delete(key);
  }
}

function isRateLimited(key: string): boolean {
  const now = Date.now();
  pruneRateLimitBuckets(now);

  const bucket = rateLimitBuckets.get(key);
  if (!bucket || bucket.resetAt <= now) {
    rateLimitBuckets.set(key, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  bucket.count += 1;
  return bucket.count > RATE_LIMIT_MAX_REQUESTS;
}

function getClientIp(req: Request): string {
  const forwardedFor = req.headers.get("x-forwarded-for");
  if (forwardedFor) return forwardedFor.split(",")[0].trim();
  return req.headers.get("x-real-ip") ?? "unknown";
}

function isTrustedOrigin(req: Request): boolean {
  const host = req.headers.get("host");
  if (!host) return false;

  const origin = req.headers.get("origin");
  if (origin) {
    try {
      return new URL(origin).host === host;
    } catch {
      return false;
    }
  }

  const referer = req.headers.get("referer");
  if (referer) {
    try {
      return new URL(referer).host === host;
    } catch {
      return false;
    }
  }

  return false;
}

function badRequest(error: string) {
  return NextResponse.json({ success: false, error }, { status: 400 });
}

export async function GET() {
  try {
    const posts = await getAllBlogs();
    return NextResponse.json({ success: true, posts });
  } catch (error) {
    console.error("Blog list error:", error);
    return NextResponse.json(
      { success: false, error: "Unable to load blog posts right now." },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    if (!isTrustedOrigin(req)) {
      return NextResponse.json(
        { success: false, error: "Request origin could not be verified." },
        { status: 403 }
      );
    }

    const contentLength = Number(req.headers.get("content-length") ?? "0");
    if (contentLength > MAX_CONTENT_LENGTH) {
      return NextResponse.json(
        { success: false, error: "Request body is too large." },
        { status: 413 }
      );
    }

    if (isRateLimited(getClientIp(req))) {
      return NextResponse.json(
        { success: false, error: "Too many posts submitted. Please try again later." },
        { status: 429 }
      );
    }

    let body: unknown;
    try {
      body = await req.json();
    } catch {
      return badRequest("Invalid request body.");
    }

    if (typeof body !== "object" || body === null) {
      return badRequest("Invalid request body.");
    }

    const raw = body as Record<string, unknown>;
    const title = typeof raw.title === "string" ? raw.title.trim() : "";
    const author = typeof raw.author === "string" ? raw.author.trim() : "";
    const content = typeof raw.content === "string" ? raw.content.trim() : "";
    const tagsInput = Array.isArray(raw.tags) ? raw.tags : [];

    if (!title || !author || !content) {
      return badRequest("Title, author, and content are required.");
    }

    if (
      title.length > MAX_TITLE_LENGTH ||
      author.length > MAX_AUTHOR_LENGTH ||
      content.length > MAX_BODY_LENGTH
    ) {
      return badRequest("One or more fields exceed the allowed length.");
    }

    if (
      CONTROL_CHARS_PATTERN.test(title) ||
      CONTROL_CHARS_PATTERN.test(author)
    ) {
      return badRequest("Invalid characters in submitted fields.");
    }

    const tags = tagsInput
      .filter((tag): tag is string => typeof tag === "string")
      .map((tag) => tag.trim())
      .filter(Boolean)
      .slice(0, MAX_TAGS)
      .map((tag) => tag.slice(0, MAX_TAG_LENGTH));

    const post = await createBlog({ title, author, content, tags });

    return NextResponse.json({ success: true, post });
  } catch (error) {
    console.error("Blog create error:", error);
    return NextResponse.json(
      { success: false, error: "Unable to publish your post right now." },
      { status: 500 }
    );
  }
}
