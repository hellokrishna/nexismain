import { deletePost, savePost } from "@/app/admin-actions";
import {
  blocksToText,
  deskCanPersistFiles,
  deskUsesSupabase,
  readDeskPosts,
} from "@/lib/desk";

export const metadata = { title: "Blogs" };

export const instant = false;

const field = "h-12 rounded-2xl border border-line bg-background px-4 font-normal text-foreground";

export default async function BlogsPage({
  searchParams,
}: {
  searchParams: Promise<{ slug?: string; error?: string }>;
}) {
  const { slug, error } = await searchParams;
  const posts = await readDeskPosts();
  const current = posts.find((item) => item.slug === slug);
  const canSave = deskCanPersistFiles();
  const onSupabase = deskUsesSupabase();
  const bodyImages =
    current?.blocks.filter((block) => block.type === "image").map((block) => block.src) ?? [];

  return (
    <>
      <h1 className="font-display text-4xl font-bold tracking-tight">Blog posts</h1>
      <p className="mt-3 max-w-2xl text-sm leading-6 text-muted">
        Publish here to show a small card on the site: cover thumbnail, title, and short tagline. A
        blank line starts a new paragraph. ## is a heading. Lines that start with - are a list. A
        line that starts with ! is a picture; the uploads below fill those pictures in order.
      </p>
      {onSupabase ? (
        <p role="status" className="mt-4 rounded-2xl border border-line bg-card px-4 py-3 text-sm leading-6 text-muted">
          Connected to Supabase. Post text is saved in the <code className="text-foreground">posts</code>{" "}
          table; cover and article images go in the <code className="text-foreground">desk-media</code>{" "}
          bucket under <code className="text-foreground">blog/</code>.
        </p>
      ) : !canSave ? (
        <p role="status" className="mt-4 rounded-2xl border border-line bg-card px-4 py-3 text-sm leading-6 text-muted">
          This Vercel deploy cannot save blogs to disk. Connect Supabase (see README), or publish on
          your computer and push <code className="text-foreground">data/posts.json</code> and{" "}
          <code className="text-foreground">public/blog/</code>.
        </p>
      ) : (
        <p className="mt-4 text-sm leading-6 text-muted">
          Locally, posts go to <code className="text-foreground">data/posts.json</code> and images to{" "}
          <code className="text-foreground">public/blog/</code>. Add Supabase env vars to use the same
          cloud store as Vercel.
        </p>
      )}
      {error ? (
        <p role="alert" className="mt-4 text-sm text-alert">
          {error === "host"
            ? "This host cannot save blog files. Connect Supabase, or publish on your computer and push the files."
            : error === "logo"
              ? "Use a PNG, JPG, or WEBP under 1.5 MB, and upload a picture for every ! line."
              : "Title, description, date, and a body are required."}
        </p>
      ) : null}
      <form action={savePost} className="mt-8 grid gap-4 rounded-3xl border border-line bg-card p-5">
        <input type="hidden" name="slug" value={current?.slug ?? ""} />
        <label className="grid gap-2 text-sm font-semibold">
          Title
          <input name="title" required defaultValue={current?.title ?? ""} className={field} />
        </label>
        <label className="grid gap-2 text-sm font-semibold">
          Short tagline
          <input
            name="description"
            required
            defaultValue={current?.description ?? ""}
            className={field}
            placeholder="One short line under the title on the card"
          />
        </label>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="grid gap-2 text-sm font-semibold">
            Date
            <input name="date" type="date" required defaultValue={current?.date ?? ""} className={field} />
          </label>
          <label className="grid gap-2 text-sm font-semibold">
            Tags, separated by commas
            <input name="tags" defaultValue={current?.tags.join(", ") ?? ""} className={field} />
          </label>
        </div>
        <label className="grid gap-2 text-sm font-semibold">
          Blog thumbnail / cover image
          <input name="cover" type="file" accept="image/png,image/jpeg,image/webp" className="text-sm font-normal" />
        </label>
        <p className="text-sm text-muted">
          This image is the card thumbnail on the home page and /blog.
          {current?.image ? " Current cover stays unless you choose a new one." : ""}
        </p>
        {current?.image ? (
          <div className="flex items-center gap-3">
            <img
              src={current.image}
              alt=""
              width={120}
              height={75}
              className="h-[75px] w-[120px] rounded-2xl border border-line object-cover"
            />
            <p className="text-sm text-muted">Current cover</p>
          </div>
        ) : null}
        <label className="grid gap-2 text-sm font-semibold">
          Pictures inside the article, in the same order as the ! lines
          <input name="images" type="file" accept="image/png,image/jpeg,image/webp" multiple className="text-sm font-normal" />
        </label>
        {bodyImages.length > 0 ? (
          <div className="flex flex-wrap gap-3">
            {bodyImages.map((src) => (
              <img
                key={src}
                src={src}
                alt=""
                width={96}
                height={72}
                className="h-[72px] w-24 rounded-xl border border-line object-cover"
              />
            ))}
          </div>
        ) : null}
        <label className="grid gap-2 text-sm font-semibold">
          Article
          <textarea
            name="body"
            required
            rows={12}
            defaultValue={current ? blocksToText(current.blocks) : ""}
            className="rounded-2xl border border-line bg-background px-4 py-3 font-normal leading-6 text-foreground"
          />
        </label>
        <button
          type="submit"
          disabled={!canSave}
          className="inline-flex h-12 w-fit items-center justify-center rounded-full bg-lime px-6 font-semibold text-background disabled:cursor-not-allowed disabled:opacity-50"
        >
          {current ? "Update this post" : "Publish this post"}
        </button>
      </form>
      <ul className="mt-8 grid gap-3">
        {posts.map((post) => (
          <li key={post.slug} className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-line px-4 py-3">
            <div className="flex items-center gap-3">
              {post.image ? (
                <img
                  src={post.image}
                  alt=""
                  width={64}
                  height={40}
                  className="h-10 w-16 rounded-lg border border-line object-cover"
                />
              ) : (
                <div className="grid h-10 w-16 place-items-center rounded-lg border border-line text-[0.65rem] text-muted">
                  No cover
                </div>
              )}
              <div>
                <p className="font-semibold">{post.title}</p>
                <p className="text-sm text-muted">{post.date}</p>
              </div>
            </div>
            <div className="flex gap-3 text-sm font-semibold">
              <a href={`/blog/${post.slug}`}>View</a>
              <a href={`/admin/blogs?slug=${post.slug}`}>Edit</a>
              <form action={deletePost}>
                <input type="hidden" name="slug" value={post.slug} />
                <button type="submit" className="text-alert" disabled={!canSave}>
                  Delete
                </button>
              </form>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
