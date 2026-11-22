import { signIn } from "@/app/admin-actions";
import { Logo } from "@/components/Logo";
import { deskPasswordIsSet } from "@/lib/admin-session";

export const metadata = {
  title: "Desk sign in",
  robots: { index: false, follow: false },
};

export const instant = false;

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;
  const ready = deskPasswordIsSet();

  return (
    <main className="mx-auto flex min-h-full w-full max-w-md flex-col justify-center px-5 py-20">
      <Logo />
      <h1 className="mt-3 font-display text-4xl font-bold tracking-tight">Sign in</h1>
      <p className="mt-3 text-sm leading-6 text-muted">
        Clients, blogs, and walkthrough messages live here. This page is not part of the public site.
      </p>
      {ready ? (
        <form action={signIn} className="mt-8 grid gap-4">
          <label className="grid gap-2 text-sm font-semibold">
            Password
            <input
              name="password"
              type="password"
              required
              autoComplete="current-password"
              className="h-12 rounded-2xl border border-line bg-card px-4 font-normal text-foreground"
            />
          </label>
          {error ? (
            <p role="alert" className="text-sm text-alert">
              That password did not match.
            </p>
          ) : null}
          <button
            type="submit"
            className="inline-flex h-12 items-center justify-center rounded-full bg-lime px-6 font-semibold text-background"
          >
            Open the desk
          </button>
        </form>
      ) : (
        <p className="mt-8 text-sm leading-6 text-muted">
          Set ADMIN_PASSWORD in .env.local to a password of at least 8 characters, then restart the site.
        </p>
      )}
    </main>
  );
}
