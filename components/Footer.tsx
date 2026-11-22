import Link from "next/link";
import { nav, site } from "@/content/site";
import type { Post } from "@/content/types";
import { Logo } from "@/components/Logo";

export function Footer({ posts }: { posts: Post[] }) {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-5 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div className="sm:col-span-2 lg:col-span-1">
          <Logo />
          <p className="mt-4 max-w-xs text-sm leading-6 text-muted">
            Cloud-based gym software in Nepal for the visit, the membership, and the follow-up.
          </p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-lime">On this site</p>
          <ul className="mt-4 grid gap-2 text-sm text-muted">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-foreground">
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/#contact" className="hover:text-foreground">
                Contact
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-lime">From the blog</p>
          <ul className="mt-4 grid gap-2 text-sm text-muted">
            {posts.map((post) => (
              <li key={post.slug}>
                <Link href={`/blog/${post.slug}`} className="hover:text-foreground">
                  {post.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-lime">Gym portal</p>
          <ul className="mt-4 grid gap-2 text-sm text-muted">
            <li>
              <a href={site.portal.register} className="hover:text-foreground">
                Try free demo / Register
              </a>
            </li>
            <li>
              <a href={site.portal.login} className="hover:text-foreground">
                Login
              </a>
            </li>
            <li>
              <Link href="/#contact" className="hover:text-foreground">
                Contact us
              </Link>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="hover:text-foreground">
                {site.email}
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-line">
        <p className="mx-auto w-full max-w-6xl px-5 py-5 text-sm text-muted">
          © 2026 {site.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
