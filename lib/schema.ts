import type { Faq, Post } from "@/content/types";
import { places } from "@/content/places";
import { site } from "@/content/site";
import { getSiteUrl } from "@/lib/site-url";

const nepalPlaces = places.map((name) => ({
  "@type": "Place" as const,
  name,
  address: {
    "@type": "PostalAddress" as const,
    addressLocality: name,
    addressCountry: "NP",
  },
}));

export function organizationJsonLd() {
  const url = getSiteUrl();
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    url,
    logo: `${url}/brand/nexis-logo.png`,
    email: site.email,
    description: site.description,
    areaServed: [{ "@type": "Country", name: "Nepal" }, ...nepalPlaces],
    knowsAbout: site.keywords,
  };
}

export function websiteJsonLd() {
  const url = getSiteUrl();
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.name,
    url,
    description: site.description,
    inLanguage: "en-NP",
    publisher: {
      "@type": "Organization",
      name: site.name,
      url,
    },
  };
}

export function softwareJsonLd() {
  const url = getSiteUrl();
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: site.name,
    applicationCategory: "BusinessApplication",
    applicationSubCategory: "Gym management software",
    operatingSystem: "Web",
    url,
    description: site.description,
    keywords: site.keywords.join(", "),
    featureList: [
      "Membership management",
      "Door access",
      "Attendance",
      "Accounting",
      "Analytics",
      "Messaging",
      "Remote registration",
    ],
    areaServed: [{ "@type": "Country", name: "Nepal" }, ...nepalPlaces],
    offers: {
      "@type": "Offer",
      url: `${url}/#packages`,
      availability: "https://schema.org/InStock",
      priceCurrency: "NPR",
    },
  };
}

export function faqJsonLd(faqs: Faq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function articleJsonLd(post: Post) {
  const url = `${getSiteUrl()}/blog/${post.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.updated,
    keywords: post.tags.join(", "),
    articleSection: "Gym operations",
    mainEntityOfPage: url,
    url,
    ...(post.image ? { image: `${getSiteUrl()}${post.image}` } : {}),
    author: {
      "@type": "Organization",
      name: post.author,
      url: getSiteUrl(),
    },
    publisher: {
      "@type": "Organization",
      name: site.name,
      url: getSiteUrl(),
    },
  };
}

export function breadcrumbJsonLd(post: Post) {
  const origin = getSiteUrl();
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: origin,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: `${origin}/blog`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: `${origin}/blog/${post.slug}`,
      },
    ],
  };
}
