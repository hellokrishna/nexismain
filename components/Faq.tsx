import type { Faq } from "@/content/types";
import { SectionHeading } from "@/components/SectionHeading";

export function Faq({ faqs }: { faqs: Faq[] }) {
  return (
    <section id="faq" className="scroll-mt-24 border-t border-line">
      <div className="mx-auto grid w-full max-w-6xl gap-12 px-5 py-20 sm:py-28 lg:grid-cols-[0.8fr_1.2fr]">
        <SectionHeading index="06 — FAQ" title="Questions from the front desk.">
          <p>Short answers about what shares a member record, and who the packages are for.</p>
        </SectionHeading>
        <div className="border-t border-line">
          {faqs.map((faq) => (
            <details key={faq.question} className="group border-b border-line">
              <summary className="flex cursor-pointer items-center justify-between gap-4 py-5 text-left font-display text-xl font-bold tracking-tight">
                {faq.question}
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-line text-lime transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="max-w-2xl pb-5 leading-7 text-muted">{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
