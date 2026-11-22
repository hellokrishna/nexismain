import Link from "next/link";
import type { Post } from "@/content/types";
import { BlogCard } from "@/components/BlogCard";
import { SectionHeading } from "@/components/SectionHeading";

export function BlogPreview({ posts, total }: { posts: Post[]; total: number }) {
  return (
    <section id="journal" className="scroll-mt-24 border-t border-line">
      <div className="mx-auto w-full max-w-6xl px-5 py-20 sm:py-28">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading index="05 — Blog" title="Latest from the blog.">
            <p>
              Short notes on gym software in Nepal, memberships, the door, and the desk.{" "}
              {total} {total === 1 ? "article" : "articles"} published.
            </p>
          </SectionHeading>
          <div className="flex items-center gap-4">
            <p className="text-sm text-muted">
              Latest · <span className="font-semibold text-foreground">{total}</span> total
            </p>
            <Link href="/blog" className="text-sm font-semibold text-lime">
              All articles
            </Link>
          </div>
        </div>
        <ul className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {posts.map((post) => (
            <li key={post.slug}>
              <BlogCard post={post} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
