import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/JsonLd";
import { PostBody } from "@/components/PostBody";
import { getPost, getPosts } from "@/lib/cms";
import { formatDate } from "@/lib/format";
import { articleJsonLd, breadcrumbJsonLd } from "@/lib/schema";

type ArticleProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: ArticleProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return { title: "Article" };

  const url = `/blog/${post.slug}`;
  return {
    title: post.title,
    description: post.description,
    authors: [{ name: post.author }],
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      title: `${post.title} | Nexfit`,
      description: post.description,
      url,
      publishedTime: post.date,
      modifiedTime: post.updated,
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: `${post.title} | Nexfit`,
      description: post.description,
    },
  };
}

export default async function ArticlePage({ params }: ArticleProps) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const posts = await getPosts();
  const related = posts.filter((item) => post.relatedSlugs.includes(item.slug));

  return (
    <article className="mx-auto w-full max-w-3xl px-5 py-16 sm:py-24">
      <JsonLd data={articleJsonLd(post)} />
      <JsonLd data={breadcrumbJsonLd(post)} />
      <nav aria-label="Breadcrumb" className="text-sm text-muted">
        <Link href="/" className="hover:text-foreground">
          Home
        </Link>
        <span aria-hidden="true"> / </span>
        <Link href="/blog" className="hover:text-foreground">
          Blog
        </Link>
      </nav>
      <header className="mt-6">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-lime">
          {formatDate(post.date)}
          {post.updated !== post.date ? ` · Updated ${formatDate(post.updated)}` : ""} ·{" "}
          {post.readingMinutes} min read
        </p>
        <h1 className="mt-4 font-display text-4xl font-bold tracking-tight text-balance sm:text-6xl">
          {post.title}
        </h1>
        <p className="mt-5 text-lg leading-8 text-muted">{post.description}</p>
        <p className="mt-4 text-sm text-muted">By {post.author}</p>
        {post.image ? (
          <Image
            src={post.image}
            alt=""
            width={1200}
            height={750}
            priority
            className="mt-8 h-auto w-full rounded-3xl border border-line object-cover"
          />
        ) : null}
      </header>
      <div className="mt-10 border-t border-line pt-6">
        <PostBody blocks={post.blocks} />
      </div>
      {related.length > 0 ? (
        <aside className="mt-14 border-t border-line pt-8">
          <h2 className="font-display text-2xl font-bold">Keep reading</h2>
          <ul className="mt-4 grid gap-3">
            {related.map((item) => (
              <li key={item.slug}>
                <Link href={`/blog/${item.slug}`} className="font-semibold hover:text-lime">
                  {item.title}
                </Link>
                <p className="mt-1 text-sm text-muted">{item.description}</p>
              </li>
            ))}
          </ul>
        </aside>
      ) : null}
    </article>
  );
}
