import { steps } from "@/content/steps";
import { SectionHeading } from "@/components/SectionHeading";

export function Steps() {
  return (
    <section id="how" className="scroll-mt-24 border-t border-line">
      <div className="mx-auto w-full max-w-6xl px-5 py-20 sm:py-28">
        <SectionHeading index="03 — A visit" title="We visit the gym and set it up.">
          <p>
            Switching from the old software is easy. Give us the member data. We handle the
            migration, manage the rest, and leave you a system that is ready to go.
          </p>
        </SectionHeading>
        <ol className="mt-12 grid gap-4 md:grid-cols-2">
          {steps.map((step) => (
            <li key={step.number} className="rounded-3xl border border-line bg-background p-6">
              <p className="font-display text-sm font-semibold text-lime">{step.number}</p>
              <h3 className="mt-3 font-display text-2xl font-bold tracking-tight">{step.title}</h3>
              <p className="mt-2 leading-7 text-muted">{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
