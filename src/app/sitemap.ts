import type { MetadataRoute } from "next";
import { publishedPosts } from "@/lib/insights";
import { SITE_URL } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = publishedPosts();

  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/insights`,
      // The index changes whenever the newest post does.
      lastModified: posts[0] ? new Date(posts[0].date) : new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    ...posts.map((post) => ({
      url: `${SITE_URL}/insights/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  ];
}
