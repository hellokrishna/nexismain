import type { Metadata } from "next";
import { BlogPreview } from "@/components/BlogPreview";
import { Contact } from "@/components/Contact";
import { Dashboards } from "@/components/Dashboards";
import { Faq } from "@/components/Faq";
import { Features } from "@/components/Features";
import { Hero } from "@/components/Hero";
import { JsonLd } from "@/components/JsonLd";
import { Pricing } from "@/components/Pricing";
import { ClientMarquee } from "@/components/ClientMarquee";
import { Steps } from "@/components/Steps";
import {
  getFaqs,
  getFeatures,
  getPackages,
  getPosts,
  getReviews,
  getClients,
} from "@/lib/cms";
import { faqJsonLd, softwareJsonLd } from "@/lib/schema";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  openGraph: { url: "/" },
};

export default async function HomePage() {
  const [features, packages, clients, reviews, posts, faqs] = await Promise.all([
    getFeatures(),
    getPackages(),
    getClients(),
    getReviews(),
    getPosts(),
    getFaqs(),
  ]);

  return (
    <>
      <JsonLd data={softwareJsonLd()} />
      <JsonLd data={faqJsonLd(faqs)} />
      <Hero />
      <ClientMarquee clients={clients} />
      <Dashboards clients={clients} reviews={reviews} />
      <Features features={features} />
      <Steps />
      <Pricing packages={packages} />
      <BlogPreview posts={posts.slice(0, 3)} />
      <Faq faqs={faqs} />
      <Contact packages={packages} />
    </>
  );
}
