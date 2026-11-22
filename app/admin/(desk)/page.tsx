import Link from "next/link";
import {
  deskUsesSupabase,
  readDeskClients,
  readDeskMessages,
  readDeskPosts,
  readDeskReviews,
} from "@/lib/desk";

export const metadata = { title: "Desk" };

export const instant = false;

export default async function DeskHome() {
  const [clients, reviews, posts, messages] = await Promise.all([
    readDeskClients(),
    readDeskReviews(),
    readDeskPosts(),
    readDeskMessages(),
  ]);
  const onSupabase = deskUsesSupabase();

  const cards = [
    { href: "/admin/clients", label: "Client gyms", count: clients.length, note: "Name, logo, photo, and the place in Nepal." },
    { href: "/admin/reviews", label: "Reviews", count: reviews.length, note: "A quote, the person, and a photo." },
    { href: "/admin/blogs", label: "Blog posts", count: posts.length, note: "The article, a cover, and pictures inside it." },
    { href: "/admin/messages", label: "Messages", count: messages.length, note: "Walkthrough notes from the contact form." },
  ];

  return (
    <>
      <h1 className="font-display text-4xl font-bold tracking-tight">What is on the site</h1>
      <p className="mt-3 max-w-2xl text-sm leading-6 text-muted">
        {onSupabase ? (
          <>
            Connected to Supabase. Clients, reviews, blogs, and messages live in the database; logos
            and photos go in the <code className="text-foreground">desk-media</code> bucket. Saving
            from this desk updates the live site.
          </>
        ) : (
          <>
            Clients, reviews, and blogs are stored as JSON in the project{" "}
            <code className="text-foreground">data/</code> folder, with images under{" "}
            <code className="text-foreground">public/</code>. On Vercel, add Supabase (see the README)
            so saves work without committing files. Demo requests stay on this desk as messages.
          </>
        )}
      </p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {cards.map((card) => (
          <Link key={card.href} href={card.href} className="rounded-3xl border border-line bg-card p-5">
            <p className="text-sm text-muted">{card.label}</p>
            <p className="mt-2 font-display text-4xl font-bold">{card.count}</p>
            <p className="mt-3 text-sm leading-6 text-muted">{card.note}</p>
          </Link>
        ))}
      </div>
    </>
  );
}
