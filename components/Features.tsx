import type { Feature } from "@/content/types";
import { SectionHeading } from "@/components/SectionHeading";

export function Features({ features }: { features: Feature[] }) {
  return (
    <section id="modules" className="scroll-mt-24 border-t border-line">
      <div className="mx-auto w-full max-w-6xl px-5 py-20 sm:py-28">
        <SectionHeading index="02 — Modules" title="Everything you need, on one desk.">
          <p>
            Accounting, analytics, and the other essentials share the same member. A change in one
            place is the change everywhere.
          </p>
        </SectionHeading>
        <ul className="mt-12 grid gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <li key={feature.title} className="bg-card p-6">
              <p className="font-display text-sm font-semibold text-lime">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-3 font-display text-2xl font-bold tracking-tight">{feature.title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted">{feature.summary}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
