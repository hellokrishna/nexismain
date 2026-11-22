import Image from "next/image";
import { districtFor, dummyLogo, places } from "@/content/places";
import type { GymClient } from "@/content/types";

export type ClientCardModel = {
  key: string;
  title: string;
  place: string;
  logo: string;
  image: string;
};

export function clientCards(clients: GymClient[]): ClientCardModel[] {
  const known = new Set<string>(places);
  const cards: ClientCardModel[] = [];

  for (const place of places) {
    const here = clients.filter((client) => client.district === place);
    if (here.length === 0) {
      cards.push({
        key: place.toLowerCase(),
        title: place,
        place: districtFor(place),
        logo: dummyLogo(place),
        image: "",
      });
      continue;
    }
    for (const client of here) {
      cards.push({
        key: client.id,
        title: client.name,
        place: districtFor(client.district),
        logo: client.logo || dummyLogo(client.district),
        image: client.image,
      });
    }
  }

  for (const client of clients) {
    if (known.has(client.district)) continue;
    cards.push({
      key: client.id,
      title: client.name,
      place: districtFor(client.district),
      logo: client.logo || dummyLogo(client.district),
      image: client.image,
    });
  }

  return cards;
}

export function ClientCard({ card, className = "" }: { card: ClientCardModel; className?: string }) {
  const logo = card.logo || card.image;

  return (
    <article className={`flex w-36 flex-col items-center rounded-2xl border border-line bg-card px-3 py-4 text-center ${className}`}>
      {logo ? (
        logo.endsWith(".svg") ? (
          <img src={logo} alt="" width={56} height={56} className="h-14 w-14 rounded-2xl border border-line bg-background object-cover" />
        ) : (
          <Image
            src={logo}
            alt=""
            width={56}
            height={56}
            className="h-14 w-14 rounded-2xl border border-line object-cover"
          />
        )
      ) : null}
      <h3 className="mt-3 font-display text-sm font-bold leading-tight tracking-tight">{card.title}</h3>
      <p className="mt-1 text-xs text-muted">{card.place}</p>
    </article>
  );
}
