import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col px-5 py-24">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-lime">404</p>
      <h1 className="mt-3 font-display text-5xl font-bold tracking-tight">That page is not on the floor.</h1>
      <p className="mt-4 max-w-xl text-lg leading-8 text-muted">
        The link may be old. The home page and the blog are both still here.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link
          href="/"
          className="inline-flex h-12 items-center justify-center rounded-full bg-lime px-6 font-semibold text-background"
        >
          Back home
        </Link>
        <Link
          href="/blog"
          className="inline-flex h-12 items-center justify-center rounded-full border border-line px-6 font-semibold"
        >
          Read the blog
        </Link>
      </div>
    </div>
  );
}
