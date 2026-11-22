import { districtFor, dummyLogo, places } from "@/content/places";
import type { GymClient } from "@/content/types";

export type ClientCardModel = {
  key: string;
  title: string;
  place: string;
  logo: string;
  image: string;
  /** Real gym from the desk, not a place placeholder. */
  real?: boolean;
};

function isRasterPhoto(src: string) {
  // Local paths and Supabase public URLs both end with a file name.
  return /\.(png|jpe?g|webp)(\?|$)/i.test(src);
}

export function clientCards(clients: GymClient[]): ClientCardModel[] {
  const cards: ClientCardModel[] = [];

  // Real gyms first, so uploaded logos and photos are easy to spot.
  for (const client of clients) {
    cards.push({
      key: `gym-${client.id}`,
      title: client.name,
      place: districtFor(client.district),
      logo: client.logo,
      image: client.image,
      real: true,
    });
  }

  for (const place of places) {
    const hasGymHere = clients.some((client) => client.district === place);
    if (hasGymHere) continue;
    cards.push({
      key: place.toLowerCase(),
      title: place,
      place: districtFor(place),
      logo: dummyLogo(place),
      image: "",
      real: false,
    });
  }

  return cards;
}

export function ClientCard({ card, className = "" }: { card: ClientCardModel; className?: string }) {
  const hasLogo = Boolean(card.logo);
  const hasPhoto = Boolean(card.image);
  // Prefer logo; if none, show the gym photo as a real image; else dummy mark.
  const media = hasLogo ? card.logo : hasPhoto ? card.image : card.logo;
  const showAsPhoto = !hasLogo && hasPhoto && isRasterPhoto(card.image);

  return (
    <article
      className={`flex w-44 flex-col overflow-hidden rounded-2xl border border-line bg-card text-center ${className}`}
    >
      {showAsPhoto ? (
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-background">
          <img
            src={card.image}
            alt={card.title}
            width={320}
            height={240}
            className="h-full w-full object-cover"
          />
          {/* Soft dark filter so the photo reads as a real gym shot on the card. */}
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/80 via-background/15 to-transparent"
            aria-hidden="true"
          />
          <p className="absolute bottom-2 left-2 rounded-full bg-background/70 px-2 py-0.5 text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-lime">
            Photo
          </p>
        </div>
      ) : (
        <div className="flex justify-center px-3 pt-4">
          <div className="grid h-20 w-20 place-items-center overflow-hidden rounded-2xl border border-line bg-white">
            {media ? (
              <img
                src={media}
                alt={card.title}
                width={80}
                height={80}
                className="h-full w-full object-contain p-2"
              />
            ) : (
              <span className="text-xs text-muted">Logo</span>
            )}
          </div>
        </div>
      )}
      <div className="px-3 py-4">
        <h3 className="font-display text-sm font-bold leading-tight tracking-tight">{card.title}</h3>
        <p className="mt-1 text-xs text-muted">{card.place}</p>
        {card.real && hasLogo ? (
          <p className="mt-2 text-[0.65rem] uppercase tracking-[0.14em] text-muted">Logo</p>
        ) : null}
      </div>
    </article>
  );
}
