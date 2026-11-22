import { site } from "@/content/site";
import type { Package } from "@/content/types";
import { SectionHeading } from "@/components/SectionHeading";
import { ContactForm } from "@/components/ContactForm";

export function Contact({ packages }: { packages: Package[] }) {
  return (
    <section id="contact" className="scroll-mt-24 border-t border-line">
      <div className="mx-auto grid w-full max-w-6xl gap-12 px-5 py-20 sm:py-28 lg:grid-cols-2">
        <div>
          <SectionHeading index="07 — Walkthrough" title="Bring one messy membership list.">
            <p>
              We will look at how you take attendance, open the door, chase expiries, and match
              payments. You leave with a package that fits the floor you have.
            </p>
          </SectionHeading>
          <p className="mt-8 text-sm text-muted">
            Or write directly to{" "}
            <a className="font-semibold text-foreground underline" href={`mailto:${site.email}`}>
              {site.email}
            </a>
            .
          </p>
        </div>
        <ContactForm packages={packages} />
      </div>
    </section>
  );
}
