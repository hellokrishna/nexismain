import Image from "next/image";
import Link from "next/link";
import { site } from "@/content/site";

const stills = [
  {
    href: "#messaging",
    src: "/dashboards/messaging-send.png",
    width: 1024,
    height: 381,
    title: "Messaging",
    caption: "Absentees, expired members, loyal members, credits, and lockers.",
    alt: "Nexfit send-message screen with a template, schedule, contacts, and SMS balance.",
  },
  {
    href: "#classes",
    src: "/dashboards/classes.png",
    width: 1024,
    height: 450,
    title: "Classes",
    caption: "The schedule, trainers, saved groups, and members.",
    alt: "Nexfit classes screen with upcoming classes, trainers, saved groups, and members.",
  },
  {
    href: "#analytics",
    src: "/dashboards/analytics-dark.png",
    width: 1024,
    height: 509,
    title: "Analytics",
    caption: "Traffic, revenue, cash, bank, and who pays.",
    alt: "Dark Nexfit analytics with revenue growth, cash, bank, credits, and a daily traffic chart.",
  },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="floor-grid pointer-events-none absolute inset-0" aria-hidden="true" />
      <div
        className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-lime/10 blur-3xl"
        aria-hidden="true"
      />
      <div className="relative mx-auto w-full max-w-6xl px-5 pb-16 pt-16 sm:pb-24 sm:pt-24">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-lime">
            Gym software in Nepal
          </p>
          <h1 className="mt-4 font-display text-5xl font-bold leading-[0.95] tracking-tight text-balance sm:text-6xl lg:text-7xl">
            Best gym software. Complete gym software.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-muted">
            Nexfit is the complete gym management solution for Kathmandu, Chitwan, and gyms across
            Nepal. Members, the door, accounting, analytics, and the other essentials run on one
            cloud desk.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a
              href={site.portal.register}
              className="inline-flex h-12 items-center justify-center rounded-full bg-lime px-6 font-semibold text-background"
            >
              Try free demo
            </a>
            <a
              href={site.portal.login}
              className="inline-flex h-12 items-center justify-center rounded-full border border-line px-6 font-semibold"
            >
              Login to gym portal
            </a>
            <Link
              href="/#dashboards"
              className="inline-flex h-12 items-center justify-center rounded-full border border-line px-6 font-semibold"
            >
              See the dashboards
            </Link>
          </div>
        </div>

        <div className="mt-14 grid gap-8">
          <figure>
            <Link
              href="/#member-desk"
              className="block overflow-hidden rounded-[1.75rem] border border-line bg-[#0b1020] shadow-2xl shadow-black/40"
            >
              <Image
                src="/dashboards/desk-dark.jpg"
                alt="Nexfit dark dashboard with member totals, admissions, renewals, earnings, and birthdays."
                width={1280}
                height={720}
                priority
                className="h-auto w-full"
              />
            </Link>
            <figcaption className="mt-3 flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
              <span className="font-display text-lg font-bold">The member desk</span>
              <span className="max-w-xl text-sm leading-6 text-muted">
                Active members, expired plans, admissions, renewals, and what came in today.
              </span>
            </figcaption>
          </figure>

          <ul className="grid gap-6 sm:grid-cols-3">
            {stills.map((still) => (
              <li key={still.src}>
                <figure>
                  <Link
                    href={still.href}
                    className="block overflow-hidden rounded-2xl border border-line bg-[#0b1020]"
                  >
                    <Image
                      src={still.src}
                      alt={still.alt}
                      width={still.width}
                      height={still.height}
                      className="h-auto w-full"
                    />
                  </Link>
                  <figcaption className="mt-3">
                    <span className="font-display text-base font-bold">{still.title}</span>
                    <span className="mt-1 block text-sm leading-6 text-muted">{still.caption}</span>
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
