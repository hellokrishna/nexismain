import { deleteClient, saveClient } from "@/app/admin-actions";
import { places } from "@/content/places";
import { deskCanPersistFiles, readDeskClients } from "@/lib/desk";

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
  const canSave = deskCanPersistFiles();

  return (
    <>
      <h1 className="font-display text-4xl font-bold tracking-tight">Client gyms</h1>
      <p className="mt-3 max-w-2xl text-sm leading-6 text-muted">
        Add the gym name, logo, and a photo. It shows on that place: {places.join(", ")}. Use PNG,
        JPG, or WEBP under 1.5 MB each. Prefer the desk at{" "}
        <code className="text-foreground">http://localhost:3001/admin/clients</code> while developing.
      </p>
      {!canSave ? (
        <p role="status" className="mt-4 rounded-2xl border border-line bg-card px-4 py-3 text-sm leading-6 text-muted">
          This Vercel deploy cannot save gyms, logos, or photos to disk. Add clients on your computer
          at <code className="text-foreground">/admin/clients</code>, then commit{" "}
          <code className="text-foreground">data/clients.json</code> and files under{" "}
          <code className="text-foreground">public/clients/</code>, and push so the live site updates.
        </p>
      ) : null}
      {error ? (
        <p role="alert" className="mt-4 text-sm text-alert">
          {error === "host"
            ? "This host cannot save client files. Use the desk on your computer, then push the files."
            : error === "logo"
              ? "Use a PNG, JPG, or WEBP under 1.5 MB for each image."
              : "Gym name and place are required. Choose a place from the list."}
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
        {current?.logo ? (
          <div className="flex items-center gap-3">
            <img
              src={current.logo}
              alt=""
              width={72}
              height={72}
              className="h-16 w-16 rounded-2xl border border-line bg-white object-contain p-2"
            />
            <p className="text-sm text-muted">Current logo. Upload a new file to replace it.</p>
          </div>
        ) : null}
        <label className="grid gap-2 text-sm font-semibold">
          Photo of the gym
          <input name="image" type="file" accept="image/png,image/jpeg,image/webp" className="text-sm font-normal" />
        </label>
        {current?.image ? (
          <div className="flex items-center gap-3">
            <img
              src={current.image}
              alt=""
              width={72}
              height={72}
              className="h-16 w-16 rounded-2xl border border-line bg-white object-cover"
            />
            <p className="text-sm text-muted">Current gym photo. Upload a new file to replace it.</p>
          </div>
        ) : null}
        <button
          type="submit"
          disabled={!canSave}
          className="inline-flex h-12 w-fit items-center justify-center rounded-full bg-lime px-6 font-semibold text-background disabled:cursor-not-allowed disabled:opacity-50"
        >
          {current ? "Update this gym" : "Add this gym"}
        </button>
      </form>
      <ul className="mt-8 grid gap-3">
        {clients.map((client) => (
          <li key={client.id} className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-line px-4 py-3">
            <div className="flex items-center gap-3">
              {client.logo ? (
                <img
                  src={client.logo}
                  alt=""
                  width={48}
                  height={48}
                  className="h-12 w-12 rounded-xl border border-line bg-white object-contain p-1"
                />
              ) : client.image ? (
                <img
                  src={client.image}
                  alt=""
                  width={48}
                  height={48}
                  className="h-12 w-12 rounded-xl border border-line object-cover"
                />
              ) : (
                <div className="grid h-12 w-12 place-items-center rounded-xl border border-line text-xs text-muted">
                  No media
                </div>
              )}
              <div>
                <p className="font-semibold">{client.name}</p>
                <p className="text-sm text-muted">
                  {client.district}
                  {client.logo ? " · logo" : client.image ? " · photo" : ""}
                </p>
              </div>
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
