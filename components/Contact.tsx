import { site } from "@/content/site";
import type { Package } from "@/content/types";
import { SectionHeading } from "@/components/SectionHeading";
import { ContactForm } from "@/components/ContactForm";

export function Contact({ packages }: { packages: Package[] }) {
  return (
    <section id="contact" className="scroll-mt-24 border-t border-line">
      <div className="mx-auto grid w-full max-w-6xl gap-12 px-5 py-20 sm:py-28 lg:grid-cols-2">
        <div>
          <SectionHeading index="07 — Demo" title="Try the free demo.">
            <p>
              Open the gym portal to register for a free demo, or log in if you already have an
              account. Prefer a visit first? Send a note and we will show the desk for your gym in
              Kathmandu, Chitwan, or anywhere in Nepal.
            </p>
          </SectionHeading>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href={site.portal.register}
              className="inline-flex h-12 items-center justify-center rounded-full bg-lime px-6 font-semibold text-background"
            >
              Try free demo / Register
            </a>
            <a
              href={site.portal.login}
              className="inline-flex h-12 items-center justify-center rounded-full border border-line px-6 font-semibold"
            >
              Login to gym portal
            </a>
          </div>
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
