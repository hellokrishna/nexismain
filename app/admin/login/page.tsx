import { Logo } from "@/components/Logo";
import { LoginForm } from "@/components/LoginForm";
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
        <LoginForm error={Boolean(error)} />
      ) : (
        <p className="mt-8 text-sm leading-6 text-muted">
          Set ADMIN_PASSWORD in .env.local to a password of at least 8 characters, then restart the site.
        </p>
      )}
    </main>
  );
}
