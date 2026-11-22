import Image from "next/image";
import type { GymClient, Review } from "@/content/types";
import { ClientCard, clientCards } from "@/components/ClientCard";
import { SectionHeading } from "@/components/SectionHeading";

type Shot = {
  id: string;
  src: string;
  width: number;
  height: number;
  title: string;
  caption: string;
  alt: string;
};

const groups: { title: string; caption: string; shots: Shot[] }[] = [
  {
    title: "Members",
    caption: "Who is active, who expired, who registered from home, and who still needs a call.",
    shots: [
      {
        id: "member-desk",
        src: "/dashboards/desk-dark.jpg",
        width: 1280,
        height: 720,
        title: "The member desk",
        caption:
          "Total, active, and expired members, pending admissions and renewals, today's earnings, and birthdays.",
        alt: "Dark Nexfit dashboard with member totals, pending admissions, pending renewals, today's earnings, and birthdays.",
      },
      {
        id: "applications",
        src: "/dashboards/applications.png",
        width: 1024,
        height: 209,
        title: "Remote registration and renewals",
        caption:
          "Members register or renew from home. Each application is only a few entries.",
        alt: "Nexfit applications screen with registration and renewal tabs for membership requests.",
      },
      {
        id: "followups",
        src: "/dashboards/followups.png",
        width: 1024,
        height: 404,
        title: "Follow-ups",
        caption: "Who is active or expired, and whether the call was already made.",
        alt: "Nexfit member follow-up table with membership status, reasons, and follow-up actions. Phone numbers are blurred.",
      },
    ],
  },
  {
    title: "Messages",
    caption:
      "One send screen for absentees, expired members, loyal members, credits, lockers, and retention.",
    shots: [
      {
        id: "messaging",
        src: "/dashboards/messaging-send.png",
        width: 1024,
        height: 381,
        title: "Messaging",
        caption: "A template, a schedule, a filter, and the balance before it goes out.",
        alt: "Nexfit send-message screen with a template, schedule, contacts, and SMS balance.",
      },
      {
        id: "retention",
        src: "/dashboards/retention.png",
        width: 1024,
        height: 443,
        title: "Customer retention",
        caption: "A campaign, the leads, and the marketing message, with the logs beside them.",
        alt: "Nexfit customer retention screen for campaigns, leads, SMS balance, and marketing messages.",
      },
    ],
  },
  {
    title: "The floor",
    caption: "Classes, day-by-day diet and workout plans, and the gym shop or cafe.",
    shots: [
      {
        id: "classes",
        src: "/dashboards/classes.png",
        width: 1024,
        height: 450,
        title: "Classes",
        caption: "Upcoming classes, trainers, saved groups, and an SMS from the class.",
        alt: "Nexfit classes screen with upcoming classes, trainers, saved groups, and members.",
      },
      {
        id: "plans",
        src: "/dashboards/plans.png",
        width: 1024,
        height: 414,
        title: "Diet and workout plans",
        caption: "A goal, a difficulty, a day-by-day list, and the members who should follow it.",
        alt: "Nexfit plan screen for creating a 30-day diet and workout plan and assigning it to members.",
      },
      {
        id: "shop",
        src: "/dashboards/shop.png",
        width: 1024,
        height: 346,
        title: "Shop and cafe",
        caption: "Products, stock, point of sale, and shop credit settled against the member.",
        alt: "Nexfit shop management screen with sales, stock purchases, cash expenses, and shop credit.",
      },
    ],
  },
  {
    title: "The numbers",
    caption: "Traffic, loyal members, demographics, and who pays, next to cash, bank, and credit.",
    shots: [
      {
        id: "analytics",
        src: "/dashboards/analytics-dark.png",
        width: 1024,
        height: 509,
        title: "Advanced analytics",
        caption:
          "Revenue growth, cash, bank, and credit, plus member traffic and payment-wise totals.",
        alt: "Dark Nexfit analytics with revenue growth, gym growth, cash, bank, credits, and a daily traffic chart.",
      },
    ],
  },
];

function Still({ shot }: { shot: Shot }) {
  return (
    <figure id={shot.id} className="scroll-mt-28">
      <div className="overflow-hidden rounded-2xl border border-line bg-[#0b1020]">
        <Image
          src={shot.src}
          alt={shot.alt}
          width={shot.width}
          height={shot.height}
          className="h-auto w-full"
        />
      </div>
      <figcaption className="mt-3">
        <span className="font-display text-lg font-bold">{shot.title}</span>
        <span className="mt-1 block text-sm leading-6 text-muted">{shot.caption}</span>
      </figcaption>
    </figure>
  );
}

export function Dashboards({ clients, reviews }: { clients: GymClient[]; reviews: Review[] }) {
  const cards = clientCards(clients);

  return (
    <section id="dashboards" className="scroll-mt-24 border-t border-line">
      <div className="mx-auto w-full max-w-6xl px-5 py-20 sm:py-28">
        <SectionHeading index="01 — Dashboards" title="The desk, as the gym actually opens it.">
          <p>Flat stills of the screens, grouped the way the desk uses them.</p>
        </SectionHeading>
        <div className="mt-16 grid gap-20">
          {groups.map((group) => (
            <div key={group.title}>
              <h3 className="font-display text-3xl font-bold tracking-tight">{group.title}</h3>
              <p className="mt-3 max-w-2xl text-lg leading-8 text-muted">{group.caption}</p>
              <div
                className={
                  group.shots.length === 1
                    ? "mt-8"
                    : "mt-8 grid gap-8 lg:grid-cols-2"
                }
              >
                {group.shots.map((shot, index) => (
                  <div
                    key={shot.src}
                    className={
                      group.shots.length > 2 && index === 0 ? "lg:col-span-2" : undefined
                    }
                  >
                    <Still shot={shot} />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div id="stories" className="mt-20 scroll-mt-24">
          <h3 className="font-display text-3xl font-bold tracking-tight">Clients</h3>
          <p className="mt-3 max-w-2xl text-lg leading-8 text-muted">
            Gyms powered by and proudly using Nexfit — fitness centers and studios all around
            Nepal that run memberships, attendance, and the front desk on one system.
          </p>
          {cards.length > 0 ? (
            <ul className="mt-8 flex flex-wrap items-stretch gap-3">
              {cards.map((card) => (
                <li key={card.key} className="flex">
                  <ClientCard card={card} />
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-8 text-sm text-muted">Client gyms will show here once they are added in the desk.</p>
          )}
          {reviews.length > 0 ? (
            <div className="mt-12" id="reviews">
              <h3 className="font-display text-3xl font-bold tracking-tight">Reviews</h3>
              <ul className="mt-8 grid gap-4 lg:grid-cols-3">
                {reviews.map((review) => (
                  <li key={review.id} className="rounded-3xl border border-line bg-card p-6">
                    <figure>
                      {review.image ? (
                        <Image
                          src={review.image}
                          alt=""
                          width={640}
                          height={480}
                          className="mb-5 aspect-[4/3] w-full rounded-2xl border border-line object-cover"
                        />
                      ) : null}
                      <blockquote>
                        <p className="font-display text-2xl font-bold leading-snug tracking-tight">“{review.quote}”</p>
                      </blockquote>
                      <figcaption className="mt-6 text-sm text-muted">
                        <span className="font-semibold text-foreground">{review.name}</span>
                        {review.role ? `, ${review.role}` : ""}
                        {review.gym ? ` · ${review.gym}` : ""}
                      </figcaption>
                    </figure>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
