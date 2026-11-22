import { deleteReview, saveReview } from "@/app/admin-actions";
import { deskCanPersistFiles, deskUsesSupabase, readDeskReviews } from "@/lib/desk";

export const metadata = { title: "Reviews" };

export const instant = false;

const field = "h-12 rounded-2xl border border-line bg-background px-4 font-normal text-foreground";

export default async function ReviewsPage({
  searchParams,
}: {
  searchParams: Promise<{ id?: string; error?: string }>;
}) {
  const { id, error } = await searchParams;
  const reviews = await readDeskReviews();
  const current = reviews.find((item) => item.id === id);
  const canSave = deskCanPersistFiles();
  const onSupabase = deskUsesSupabase();

  return (
    <>
      <h1 className="font-display text-4xl font-bold tracking-tight">Reviews</h1>
      <p className="mt-3 max-w-2xl text-sm leading-6 text-muted">
        A review is the quote, the person, and the gym. Add a photo when you have one. It shows under
        the client places.
      </p>
      {onSupabase ? (
        <p role="status" className="mt-4 rounded-2xl border border-line bg-card px-4 py-3 text-sm leading-6 text-muted">
          Connected to Supabase. Reviews save in the database; photos go in{" "}
          <code className="text-foreground">desk-media/reviews/</code>.
        </p>
      ) : !canSave ? (
        <p role="status" className="mt-4 rounded-2xl border border-line bg-card px-4 py-3 text-sm leading-6 text-muted">
          This host cannot save review photos to disk. Connect Supabase (see README), or add reviews
          on your computer and push the files.
        </p>
      ) : null}
      {error ? (
        <p role="alert" className="mt-4 text-sm text-alert">
          {error === "host"
            ? "This host cannot save review files. Connect Supabase, or use the desk on your computer."
            : error === "logo"
              ? "Use a PNG, JPG, or WEBP under 1.5 MB."
              : "The quote and the person’s name are required."}
        </p>
      ) : null}
      <form action={saveReview} className="mt-8 grid gap-4 rounded-3xl border border-line bg-card p-5">
        <input type="hidden" name="id" value={current?.id ?? ""} />
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="grid gap-2 text-sm font-semibold">
            Person
            <input name="name" required defaultValue={current?.name ?? ""} className={field} />
          </label>
          <label className="grid gap-2 text-sm font-semibold">
            Role
            <input name="role" defaultValue={current?.role ?? ""} className={field} />
          </label>
        </div>
        <label className="grid gap-2 text-sm font-semibold">
          Gym
          <input name="gym" defaultValue={current?.gym ?? ""} className={field} />
        </label>
        <label className="grid gap-2 text-sm font-semibold">
          Review
          <textarea
            name="quote"
            required
            rows={4}
            defaultValue={current?.quote ?? ""}
            className="rounded-2xl border border-line bg-background px-4 py-3 font-normal leading-6 text-foreground"
          />
        </label>
        <label className="grid gap-2 text-sm font-semibold">
          Photo
          <input name="image" type="file" accept="image/png,image/jpeg,image/webp" className="text-sm font-normal" />
        </label>
        {current?.image ? (
          <div className="flex items-center gap-3">
            <img
              src={current.image}
              alt=""
              width={72}
              height={72}
              className="h-16 w-16 rounded-2xl border border-line object-cover"
            />
            <p className="text-sm text-muted">Current photo. Upload a new file to replace it.</p>
          </div>
        ) : null}
        <button
          type="submit"
          disabled={!canSave}
          className="inline-flex h-12 w-fit items-center justify-center rounded-full bg-lime px-6 font-semibold text-background disabled:cursor-not-allowed disabled:opacity-50"
        >
          {current ? "Update this review" : "Add this review"}
        </button>
      </form>
      <ul className="mt-8 grid gap-3">
        {reviews.map((review) => (
          <li key={review.id} className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-line px-4 py-3">
            <div className="flex items-center gap-3">
              {review.image ? (
                <img
                  src={review.image}
                  alt=""
                  width={48}
                  height={48}
                  className="h-12 w-12 rounded-xl border border-line object-cover"
                />
              ) : null}
              <div>
                <p className="font-semibold">{review.name}</p>
                <p className="text-sm text-muted">{review.gym || "No gym named"}</p>
              </div>
            </div>
            <div className="flex gap-3 text-sm font-semibold">
              <a href={`/admin/reviews?id=${review.id}`}>Edit</a>
              <form action={deleteReview}>
                <input type="hidden" name="id" value={review.id} />
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
