import type { MetadataRoute } from "next";
import { getPosts } from "@/lib/cms";
import { getSiteUrl } from "@/lib/site-url";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = getSiteUrl();
  const posts = await getPosts();
  const latest = posts.reduce((current, post) => (post.updated > current ? post.updated : current), "2026-09-16");

  return [
    {
      url: siteUrl,
      lastModified: latest,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteUrl}/blog`,
      lastModified: latest,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...posts.map((post) => ({
      url: `${siteUrl}/blog/${post.slug}`,
      lastModified: post.updated,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
