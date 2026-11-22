import type { GymClient } from "@/content/types";
import { ClientCard, clientCards } from "@/components/ClientCard";

export function ClientMarquee({ clients }: { clients: GymClient[] }) {
  const cards = clientCards(clients);
  if (cards.length === 0) return null;

  return (
    <section aria-label="Clients across Nepal" className="border-t border-line py-8">
      <p className="mx-auto w-full max-w-6xl px-5 text-xs font-semibold uppercase tracking-[0.22em] text-lime">
        Clients all over Nepal
      </p>
      <div className="client-marquee mt-5 overflow-hidden">
        <div className="client-track">
          <ul className="flex gap-4 pr-4">
            {cards.map((card) => (
              <li key={card.key}>
                <ClientCard card={card} />
              </li>
            ))}
          </ul>
          <ul className="flex gap-4 pr-4" aria-hidden="true">
            {cards.map((card) => (
              <li key={`${card.key}-copy`}>
                <ClientCard card={card} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
