import type { Faq, Post } from "@/content/types";
import { site } from "@/content/site";
import { getSiteUrl } from "@/lib/site-url";

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
    operatingSystem: "Web",
    url,
    description: site.description,
    offers: {
      "@type": "Offer",
      url: `${url}/#packages`,
      availability: "https://schema.org/InStock",
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
