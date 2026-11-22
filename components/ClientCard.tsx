import { districtFor } from "@/content/places";
import type { GymClient } from "@/content/types";

export type ClientCardModel = {
  key: string;
  title: string;
  place: string;
  logo: string;
  image: string;
  /** Real gym from the desk / database. */
  real?: boolean;
};

function isRasterPhoto(src: string) {
  // Local paths and Supabase public URLs both end with a file name.
  return /\.(png|jpe?g|webp)(\?|$)/i.test(src);
}

/** Only real gyms from the desk / Supabase — no place placeholders. */
export function clientCards(clients: GymClient[]): ClientCardModel[] {
  return clients.map((client) => ({
    key: `gym-${client.id}`,
    title: client.name,
    place: districtFor(client.district),
    logo: client.logo,
    image: client.image,
    real: true,
  }));
}

export function ClientCard({ card, className = "" }: { card: ClientCardModel; className?: string }) {
  const hasLogo = Boolean(card.logo);
  const hasPhoto = Boolean(card.image);
  const media = hasLogo ? card.logo : hasPhoto ? card.image : "";
  const showAsPhoto = !hasLogo && hasPhoto && isRasterPhoto(card.image);

  return (
    <article
      className={`flex h-full w-44 flex-col overflow-hidden rounded-2xl border border-line bg-card text-center ${className}`}
    >
      {showAsPhoto ? (
        <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden bg-background">
          <img
            src={card.image}
            alt={card.title}
            width={320}
            height={240}
            className="h-full w-full object-cover"
          />
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/80 via-background/15 to-transparent"
            aria-hidden="true"
          />
          <p className="absolute bottom-2 left-2 rounded-full bg-background/70 px-2 py-0.5 text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-lime">
            Photo
          </p>
        </div>
      ) : (
        <div className="flex shrink-0 justify-center px-3 pt-4">
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
      <div className="flex flex-1 flex-col px-3 py-4">
        <h3 className="line-clamp-2 min-h-[2.5rem] font-display text-sm font-bold leading-tight tracking-tight">
          {card.title}
        </h3>
        <p className="mt-1 text-xs text-muted">{card.place}</p>
      </div>
    </article>
  );
}
