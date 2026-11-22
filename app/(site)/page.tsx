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
  title: {
    absolute: "Gym Software in Nepal | Nexfit Gym Management System",
  },
  description:
    "Nexfit is the best gym software and complete gym software in Nepal. Cloud-based gym management for Kathmandu, Chitwan, and gyms across Nepal: members, door access, accounting, and analytics on one desk.",
  keywords: [
    "gym software",
    "best gym software",
    "complete gym software",
    "best gym softwares",
    "gym software in Nepal",
    "gym management in Nepal",
    "gym management system in Nepal",
    "cloud based gym software",
    "gym software in Kathmandu",
    "gym software in Chitwan",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    url: "/",
    title: "Best Gym Software in Nepal | Nexfit",
    description:
      "Best gym software and complete gym software for Kathmandu, Chitwan, and gyms across Nepal.",
  },
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
      <BlogPreview posts={posts.slice(0, 8)} total={posts.length} />
      <Faq faqs={faqs} />
      <Contact packages={packages} />
    </>
  );
}
