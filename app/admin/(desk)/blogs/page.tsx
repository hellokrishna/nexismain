import { deletePost, savePost } from "@/app/admin-actions";
import { blocksToText, readDeskPosts } from "@/lib/desk";

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

  return (
    <>
      <h1 className="font-display text-4xl font-bold tracking-tight">Blog posts</h1>
      <p className="mt-3 max-w-2xl text-sm leading-6 text-muted">
        Publish here to show a small card on the site: cover thumbnail, title, and short tagline.
        Posts are stored in <code className="text-foreground">data/posts.json</code>, covers in{" "}
        <code className="text-foreground">public/blog/</code>. A blank line starts a new paragraph.
        ## is a heading. Lines that start with - are a list. A line that starts with ! is a picture;
        the uploads below fill those pictures in order.
      </p>
      {error ? (
        <p role="alert" className="mt-4 text-sm text-alert">
          {error === "logo"
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
        <label className="grid gap-2 text-sm font-semibold">
          Pictures inside the article, in the same order as the ! lines
          <input name="images" type="file" accept="image/png,image/jpeg,image/webp" multiple className="text-sm font-normal" />
        </label>
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
          className="inline-flex h-12 w-fit items-center justify-center rounded-full bg-lime px-6 font-semibold text-background"
        >
          {current ? "Update this post" : "Publish this post"}
        </button>
      </form>
      <ul className="mt-8 grid gap-3">
        {posts.map((post) => (
          <li key={post.slug} className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-line px-4 py-3">
            <div>
              <p className="font-semibold">{post.title}</p>
              <p className="text-sm text-muted">{post.date}</p>
            </div>
            <div className="flex gap-3 text-sm font-semibold">
              <a href={`/blog/${post.slug}`}>View</a>
              <a href={`/admin/blogs?slug=${post.slug}`}>Edit</a>
              <form action={deletePost}>
                <input type="hidden" name="slug" value={post.slug} />
                <button type="submit" className="text-alert">
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
