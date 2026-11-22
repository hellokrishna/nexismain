import { removeMessage } from "@/app/admin-actions";
import { readDeskMessages } from "@/lib/desk";

export const metadata = { title: "Messages" };

export const instant = false;

export default async function MessagesPage() {
  const messages = await readDeskMessages();

  return (
    <>
      <h1 className="font-display text-4xl font-bold tracking-tight">Messages</h1>
      <p className="mt-3 max-w-2xl text-sm leading-6 text-muted">
        These come from the walkthrough form on the site. They are not published.
      </p>
      {messages.length === 0 ? (
        <p className="mt-8 text-sm text-muted">No messages yet.</p>
      ) : (
        <ul className="mt-8 grid gap-4">
          {messages.map((item) => (
            <li key={item.id} className="rounded-3xl border border-line bg-card p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-sm text-muted">
                    {item.studio || "No gym named"} · {item.email}
                    {item.phone ? ` · ${item.phone}` : ""}
                  </p>
                </div>
                <p className="text-xs text-muted">{item.receivedAt.slice(0, 16).replace("T", " ")}</p>
              </div>
              {item.packageInterest ? (
                <p className="mt-3 text-sm text-muted">Package: {item.packageInterest}</p>
              ) : null}
              <p className="mt-3 whitespace-pre-wrap text-sm leading-6">{item.message}</p>
              <form action={removeMessage} className="mt-4">
                <input type="hidden" name="id" value={item.id} />
                <button type="submit" className="text-sm font-semibold text-alert">
                  Delete
                </button>
              </form>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
