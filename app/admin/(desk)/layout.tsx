import Link from "next/link";
import { Suspense } from "react";
import { signOut } from "@/app/admin-actions";
import { Logo } from "@/components/Logo";
import { deskIsSignedIn } from "@/lib/admin-session";
import { redirect } from "next/navigation";

export const instant = false;

export const metadata = {
  robots: { index: false, follow: false },
};

const links = [
  { href: "/admin", label: "Desk" },
  { href: "/admin/clients", label: "Clients" },
  { href: "/admin/reviews", label: "Reviews" },
  { href: "/admin/blogs", label: "Blogs" },
  { href: "/admin/messages", label: "Messages" },
];

export default function DeskLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<p className="px-5 py-10 text-sm text-muted">Opening the desk…</p>}>
      <DeskFrame>{children}</DeskFrame>
    </Suspense>
  );
}

async function DeskFrame({ children }: { children: React.ReactNode }) {
  if (!(await deskIsSignedIn())) redirect("/admin/login");

  return (
    <div className="mx-auto w-full max-w-5xl px-5 py-10">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <Logo />
        <form action={signOut}>
          <button type="submit" className="text-sm font-semibold text-muted">
            Sign out
          </button>
        </form>
      </div>
      <nav className="mt-6 flex flex-wrap gap-2">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="rounded-full border border-line px-4 py-2 text-sm font-semibold"
          >
            {link.label}
          </Link>
        ))}
      </nav>
      <div className="mt-10">{children}</div>
    </div>
  );
}
