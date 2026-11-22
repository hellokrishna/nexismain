import Image from "next/image";
import Link from "next/link";
import type { Post } from "@/content/types";
import { formatDate } from "@/lib/format";

export function BlogCard({ post }: { post: Post }) {
  const tagline = post.description;
  const tag = post.tags[0];

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-card">
      <Link href={`/blog/${post.slug}`} className="block">
        {post.image ? (
          <Image
            src={post.image}
            alt=""
            width={640}
            height={400}
            className="aspect-[16/10] w-full object-cover"
          />
        ) : (
          <div className="flex aspect-[16/10] w-full items-end bg-gradient-to-br from-[#1a1f18] via-card to-[#0c0e0b] p-4">
            <span className="rounded-full border border-line/80 px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-lime">
              {tag || "Nexfit"}
            </span>
          </div>
        )}
      </Link>
      <div className="flex flex-1 flex-col p-4">
        <p className="text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-lime">
          {formatDate(post.date)} · {post.readingMinutes} min
        </p>
        <h3 className="mt-2 font-display text-lg font-bold leading-snug tracking-tight">
          <Link href={`/blog/${post.slug}`} className="hover:text-lime">
            {post.title}
          </Link>
        </h3>
        <p className="mt-2 line-clamp-2 flex-1 text-sm leading-6 text-muted">{tagline}</p>
        {tag ? (
          <p className="mt-3 text-xs text-muted">
            <span className="text-foreground/80">{tag}</span>
          </p>
        ) : null}
      </div>
    </article>
  );
}
