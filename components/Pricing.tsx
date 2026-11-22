import { site } from "@/content/site";
import type { Package } from "@/content/types";
import { SectionHeading } from "@/components/SectionHeading";

export function Pricing({ packages }: { packages: Package[] }) {
  return (
    <section id="packages" className="scroll-mt-24 border-t border-line">
      <div className="mx-auto w-full max-w-6xl px-5 py-20 sm:py-28">
        <SectionHeading index="04 — Packages" title="A device once. Software by the month or the year.">
          <p>
            Two packages. One device for 500 active members, one for 1,500 active members. The
            software is unlimited members: Rs 1,500 a month, or the yearly price on the card.
          </p>
        </SectionHeading>
        <ul className="mt-12 grid gap-4 lg:grid-cols-2">
          {packages.map((item) => (
            <li
              key={item.id}
              className={
                item.highlighted
                  ? "flex flex-col rounded-3xl bg-lime p-6 text-background"
                  : "flex flex-col rounded-3xl border border-line bg-card p-6"
              }
            >
              <p
                className={
                  item.highlighted
                    ? "text-xs font-semibold uppercase tracking-[0.18em]"
                    : "text-xs font-semibold uppercase tracking-[0.18em] text-lime"
                }
              >
                {item.audience}
              </p>
              <h3 className="mt-3 font-display text-3xl font-bold">{item.name}</h3>
              <div className="mt-6">
                <p className="text-xs font-semibold uppercase tracking-[0.18em]">Device</p>
                <p className="mt-1 font-display text-4xl font-bold tracking-tight">{item.device}</p>
                <p className={item.highlighted ? "mt-1 text-sm text-background/70" : "mt-1 text-sm text-muted"}>
                  one time
                </p>
              </div>
              <div className="mt-5 grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em]">Monthly</p>
                  <p className="mt-1 font-display text-2xl font-bold tracking-tight">{item.monthly}</p>
                  <p className={item.highlighted ? "mt-1 text-sm text-background/70" : "mt-1 text-sm text-muted"}>
                    unlimited members
                  </p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em]">Yearly</p>
                  <p className="mt-1 font-display text-2xl font-bold tracking-tight">{item.yearly}</p>
                  <p className={item.highlighted ? "mt-1 text-sm text-background/70" : "mt-1 text-sm text-muted"}>
                    unlimited members
                  </p>
                </div>
              </div>
              <p className={item.highlighted ? "mt-4 leading-7 text-background/80" : "mt-4 leading-7 text-muted"}>
                {item.description}
              </p>
              <ul className="mt-6 grid flex-1 gap-2 text-sm">
                {item.features.map((feature) => (
                  <li key={feature} className="flex gap-2">
                    <span aria-hidden="true" className="mt-0.5 font-semibold">
                      +
                    </span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <a
                href={site.portal.register}
                className={
                  item.highlighted
                    ? "mt-8 inline-flex h-12 items-center justify-center rounded-full bg-background px-5 font-semibold text-foreground"
                    : "mt-8 inline-flex h-12 items-center justify-center rounded-full bg-lime px-5 font-semibold text-background"
                }
              >
                {item.cta}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
