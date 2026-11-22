"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { nav } from "@/content/site";
import { Logo } from "@/components/Logo";

export function Header() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="sticky top-0 z-40 border-b border-line border-t-2 border-t-lime bg-background/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-5">
        <Logo />
        <nav className="hidden items-center gap-6 text-sm text-muted lg:flex" aria-label="Primary">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="transition-colors hover:text-foreground">
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Link
            href="/#contact"
            className="hidden rounded-full bg-lime px-4 py-2 text-sm font-semibold text-background transition-transform hover:-translate-y-0.5 sm:inline-flex"
          >
            Book a walkthrough
          </Link>
          <button
            type="button"
            className="inline-flex h-10 items-center rounded-full border border-line px-3 text-sm lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((value) => !value)}
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </div>
      {open ? (
        <nav id="mobile-nav" className="border-t border-line px-5 py-4 lg:hidden" aria-label="Mobile">
          <ul className="grid gap-1">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="block rounded-xl px-3 py-3 text-base hover:bg-card"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/#contact"
                className="mt-2 block rounded-full bg-lime px-3 py-3 text-center font-semibold text-background"
                onClick={() => setOpen(false)}
              >
                Book a walkthrough
              </Link>
            </li>
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
