import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

/**
 * Insights posts, authored as Markdown in `content/insights`.
 *
 * Filesystem-backed on purpose: every post arrives through a pull request,
 * which is also the compliance read. Percapita is an AMFI-registered
 * distributor, not an adviser, so published commentary needs a check before it
 * goes live rather than a publish button.
 *
 * Node APIs only - import this from server components and route handlers.
 */

const CONTENT_DIR = path.join(process.cwd(), "content", "insights");

export interface PostMeta {
  slug: string;
  title: string;
  /** Shown on the index card and used as the meta description. */
  summary: string;
  /** ISO date. Sorting and `datePublished` both read it. */
  date: string;
  author: string;
  /** Optional grouping shown as the card eyebrow. */
  topic?: string;
  /** Minutes, computed from the body if the file does not state it. */
  readingMinutes: number;
  /** Excluded from listings, the sitemap and search while true. */
  draft: boolean;
}

export interface Post extends PostMeta {
  body: string;
}

function readPost(file: string): Post | null {
  const raw = fs.readFileSync(path.join(CONTENT_DIR, file), "utf8");
  const { data, content } = matter(raw);
  if (!data.title || !data.date) return null;

  // ~200wpm, rounded up, floor of one minute.
  const words = content.trim().split(/\s+/).length;

  return {
    slug: file.replace(/\.mdx?$/, ""),
    title: String(data.title),
    summary: String(data.summary ?? ""),
    date: new Date(data.date).toISOString(),
    author: String(data.author ?? "Percapita Advisors"),
    topic: data.topic ? String(data.topic) : undefined,
    readingMinutes: Number(data.readingMinutes) || Math.max(1, Math.round(words / 200)),
    draft: Boolean(data.draft),
    body: content,
  };
}

function allPosts(): Post[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => /\.mdx?$/.test(f))
    .map(readPost)
    .filter((p): p is Post => p !== null)
    .sort((a, b) => b.date.localeCompare(a.date));
}

/** Published posts, newest first. Drafts are never included. */
export function publishedPosts(): Post[] {
  return allPosts().filter((p) => !p.draft);
}

/** A single published post, or null. Drafts 404 rather than leaking. */
export function getPost(slug: string): Post | null {
  return publishedPosts().find((p) => p.slug === slug) ?? null;
}

/** "23 September 2026" - written out, since posts are dated content. */
export function formatPostDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
