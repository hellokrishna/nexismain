export type Feature = {
  title: string;
  summary: string;
};

export type Package = {
  id: string;
  name: string;
  audience: string;
  price: string;
  period: string;
  device: string;
  monthly: string;
  yearly: string;
  description: string;
  features: string[];
  highlighted: boolean;
  cta: string;
};

export type GymClient = {
  id: string;
  name: string;
  district: string;
  logo: string;
  image: string;
};

export type Review = {
  id: string;
  quote: string;
  name: string;
  role: string;
  gym: string;
  image: string;
};

export type Faq = {
  question: string;
  answer: string;
};

export type PostBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "image"; src: string; alt: string };

export type Post = {
  slug: string;
  title: string;
  description: string;
  date: string;
  updated: string;
  author: string;
  tags: string[];
  readingMinutes: number;
  relatedSlugs: string[];
  image?: string;
  blocks: PostBlock[];
};

export type Step = {
  number: string;
  title: string;
  body: string;
};
