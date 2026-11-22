import type { Metadata } from "next";
import { getPosts } from "@/lib/cms";
import { BlogCard } from "@/components/BlogCard";

const description =
  "Guides from Nexfit on gym software in Nepal, gym management in Kathmandu and Chitwan, memberships, attendance, door access, and accounts.";

export const metadata: Metadata = {
  title: "Blog | Gym software in Nepal",
  description,
  keywords: [
    "best gym software",
    "complete gym software",
    "gym software in Nepal",
    "gym management in Nepal",
    "gym software in Kathmandu",
    "gym software in Chitwan",
    "cloud based gym software",
  ],
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Blog | Gym software in Nepal | Nexfit",
    description,
    url: "/blog",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog | Gym software in Nepal | Nexfit",
    description,
  },
};

export default async function BlogPage() {
  const posts = await getPosts();
  const total = posts.length;

  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-16 sm:py-24">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-lime">Blog</p>
      <h1 className="mt-3 max-w-3xl font-display text-5xl font-bold tracking-tight text-balance sm:text-6xl">
        Latest articles.
      </h1>
      <p className="mt-5 max-w-2xl text-lg leading-8 text-muted">
        {description}{" "}
        <span className="font-semibold text-foreground">
          {total} {total === 1 ? "article" : "articles"} total.
        </span>
      </p>
      <ul className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {posts.map((post) => (
          <li key={post.slug}>
            <BlogCard post={post} />
          </li>
        ))}
      </ul>
    </div>
  );
}
