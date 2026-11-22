import Image from "next/image";
import Link from "next/link";
import type { Post } from "@/content/types";
import { formatDate } from "@/lib/format";
import { SectionHeading } from "@/components/SectionHeading";

export function BlogPreview({ posts }: { posts: Post[] }) {
  return (
    <section id="journal" className="scroll-mt-24 border-t border-line">
      <div className="mx-auto w-full max-w-6xl px-5 py-20 sm:py-28">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading index="05 — Blog" title="Notes on running the floor.">
            <p>
              Practical writing on memberships, absentees, access, diet plans, and the money
              side. New articles are how this site stays useful in search.
            </p>
          </SectionHeading>
          <Link href="/blog" className="text-sm font-semibold text-lime">
            All articles
          </Link>
        </div>
        <ul className="mt-12 grid gap-4 lg:grid-cols-3">
          {posts.map((post) => (
            <li key={post.slug}>
              <article className="flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-card">
                {post.image ? (
                  <Image
                    src={post.image}
                    alt=""
                    width={800}
                    height={500}
                    className="aspect-[16/10] w-full object-cover"
                  />
                ) : null}
                <div className="flex flex-1 flex-col p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-lime">
                  {formatDate(post.date)} · {post.readingMinutes} min
                </p>
                <h3 className="mt-4 font-display text-2xl font-bold tracking-tight">
                  <Link href={`/blog/${post.slug}`} className="hover:text-lime">
                    {post.title}
                  </Link>
                </h3>
                <p className="mt-3 flex-1 text-sm leading-6 text-muted">{post.description}</p>
                <Link href={`/blog/${post.slug}`} className="mt-6 text-sm font-semibold">
                  Read article
                </Link>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
