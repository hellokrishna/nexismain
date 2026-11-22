import { deleteClient, saveClient } from "@/app/admin-actions";
import { places } from "@/content/places";
import { readDeskClients } from "@/lib/desk";

export const metadata = { title: "Clients" };

export const instant = false;

const field = "h-12 rounded-2xl border border-line bg-background px-4 font-normal text-foreground";

export default async function ClientsPage({
  searchParams,
}: {
  searchParams: Promise<{ id?: string; error?: string }>;
}) {
  const { id, error } = await searchParams;
  const clients = await readDeskClients();
  const current = clients.find((item) => item.id === id);

  return (
    <>
      <h1 className="font-display text-4xl font-bold tracking-tight">Client gyms</h1>
      <p className="mt-3 max-w-2xl text-sm leading-6 text-muted">
        Add the gym name, logo, and a photo. It shows on that place: {places.join(", ")}.
      </p>
      {error ? (
        <p role="alert" className="mt-4 text-sm text-alert">
          {error === "logo" ? "Use a PNG, JPG, or WEBP under 1.5 MB." : "Gym name and place are required."}
        </p>
      ) : null}
      <form action={saveClient} className="mt-8 grid gap-4 rounded-3xl border border-line bg-card p-5">
        <input type="hidden" name="id" value={current?.id ?? ""} />
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="grid gap-2 text-sm font-semibold">
            Gym name
            <input name="name" required defaultValue={current?.name ?? ""} className={field} />
          </label>
          <label className="grid gap-2 text-sm font-semibold">
            Place
            <select name="district" required defaultValue={current?.district ?? ""} className={field}>
              <option value="">Choose a place</option>
              {places.map((place) => (
                <option key={place} value={place}>
                  {place}
                </option>
              ))}
            </select>
          </label>
        </div>
        <label className="grid gap-2 text-sm font-semibold">
          Logo
          <input name="logo" type="file" accept="image/png,image/jpeg,image/webp" className="text-sm font-normal" />
        </label>
        <label className="grid gap-2 text-sm font-semibold">
          Photo of the gym
          <input name="image" type="file" accept="image/png,image/jpeg,image/webp" className="text-sm font-normal" />
        </label>
        <button
          type="submit"
          className="inline-flex h-12 w-fit items-center justify-center rounded-full bg-lime px-6 font-semibold text-background"
        >
          {current ? "Update this gym" : "Add this gym"}
        </button>
      </form>
      <ul className="mt-8 grid gap-3">
        {clients.map((client) => (
          <li key={client.id} className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-line px-4 py-3">
            <div>
              <p className="font-semibold">{client.name}</p>
              <p className="text-sm text-muted">{client.district}</p>
            </div>
            <div className="flex gap-3 text-sm font-semibold">
              <a href={`/admin/clients?id=${client.id}`}>Edit</a>
              <form action={deleteClient}>
                <input type="hidden" name="id" value={client.id} />
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
