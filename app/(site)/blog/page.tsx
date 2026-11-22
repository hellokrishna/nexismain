import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getPosts } from "@/lib/cms";
import { formatDate } from "@/lib/format";

const description =
  "Notes from Nexfit on memberships, attendance, absentees, door access, diet plans, and gym accounts.";

export const metadata: Metadata = {
  title: "Blog",
  description,
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Blog | Nexfit",
    description,
    url: "/blog",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog | Nexfit",
    description,
  },
};

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-16 sm:py-24">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-lime">Journal</p>
      <h1 className="mt-3 max-w-3xl font-display text-5xl font-bold tracking-tight text-balance sm:text-6xl">
        Notes on running the floor.
      </h1>
      <p className="mt-5 max-w-2xl text-lg leading-8 text-muted">{description}</p>
      <ul className="mt-12 grid gap-4">
        {posts.map((post) => (
          <li key={post.slug}>
            <article className="overflow-hidden rounded-3xl border border-line bg-card sm:grid sm:grid-cols-[16rem_1fr]">
              {post.image ? (
                <Image
                  src={post.image}
                  alt=""
                  width={640}
                  height={480}
                  className="aspect-[16/10] h-full w-full object-cover sm:aspect-auto"
                />
              ) : null}
              <div className="p-6 sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-lime">
                {formatDate(post.date)} · {post.readingMinutes} min read
              </p>
              <h2 className="mt-3 font-display text-3xl font-bold tracking-tight">
                <Link href={`/blog/${post.slug}`} className="hover:text-lime">
                  {post.title}
                </Link>
              </h2>
              <p className="mt-3 max-w-2xl leading-7 text-muted">{post.description}</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <li key={tag} className="rounded-full border border-line px-3 py-1 text-xs text-muted">
                    {tag}
                  </li>
                ))}
              </ul>
              </div>
            </article>
          </li>
        ))}
      </ul>
    </div>
  );
}
