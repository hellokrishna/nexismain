import { cacheLife, cacheTag } from "next/cache";
import { faqs as localFaqs } from "@/content/faqs";
import { features as localFeatures } from "@/content/features";
import { packages as localPackages } from "@/content/packages";
import { posts as localPosts } from "@/content/posts";
import { clients as localClients } from "@/content/clients";
import { reviews as localReviews } from "@/content/reviews";
import type { Faq, Feature, GymClient, Package, Post, PostBlock, Review } from "@/content/types";
import { readDeskClients, readDeskPosts, readDeskReviews } from "@/lib/desk";

/**
 * Content for the public site.
 *
 * With LARAVEL_API_URL unset, these functions return the files in /content.
 * Point that variable at your Laravel origin (no trailing slash) and the
 * site will prefer JSON from:
 *   GET /api/features
 *   GET /api/packages
 *   GET /api/clients
 *   GET /api/reviews
 *   GET /api/posts
 *   GET /api/faqs
 * Each route may return a bare array or { data: [...] }.
 * Send LARAVEL_API_TOKEN as a Bearer token when the API requires one.
 * Post bodies stay structured blocks ({ type: "p" | "h2" | "ul" | "image" }), not HTML.
 */

const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

function apiOrigin() {
  const value = process.env.LARAVEL_API_URL?.trim();
  return value ? value.replace(/\/$/, "") : null;
}

function authHeaders(): HeadersInit {
  const token = process.env.LARAVEL_API_TOKEN?.trim();
  return token
    ? { Accept: "application/json", Authorization: `Bearer ${token}` }
    : { Accept: "application/json" };
}

async function readJson(path: string): Promise<unknown | null> {
  const origin = apiOrigin();
  if (!origin) return null;

  try {
    const response = await fetch(`${origin}${path}`, { headers: authHeaders() });
    if (!response.ok) return null;
    return await response.json();
  } catch {
    return null;
  }
}

function asList(payload: unknown): unknown[] | null {
  if (Array.isArray(payload)) return payload;
  if (
    payload &&
    typeof payload === "object" &&
    "data" in payload &&
    Array.isArray((payload as { data: unknown }).data)
  ) {
    return (payload as { data: unknown[] }).data;
  }
  return null;
}

function asFeature(value: unknown): Feature | null {
  if (!value || typeof value !== "object") return null;
  const item = value as Record<string, unknown>;
  if (typeof item.title !== "string" || typeof item.summary !== "string") return null;
  return { title: item.title, summary: item.summary };
}

function asPackage(value: unknown): Package | null {
  if (!value || typeof value !== "object") return null;
  const item = value as Record<string, unknown>;
  if (typeof item.id !== "string" || typeof item.name !== "string") return null;
  if (!slugPattern.test(item.id)) return null;
  if (!Array.isArray(item.features) || !item.features.every((entry) => typeof entry === "string")) {
    return null;
  }
  return {
    id: item.id,
    name: item.name,
    audience: typeof item.audience === "string" ? item.audience : "",
    price: typeof item.price === "string" ? item.price : "",
    period: typeof item.period === "string" ? item.period : "",
    device: typeof item.device === "string" ? item.device : "",
    monthly: typeof item.monthly === "string" ? item.monthly : "",
    yearly: typeof item.yearly === "string" ? item.yearly : "",
    description: typeof item.description === "string" ? item.description : "",
    features: item.features,
    highlighted: Boolean(item.highlighted),
    cta: typeof item.cta === "string" ? item.cta : "Try free demo",
  };
}

function asClient(value: unknown): GymClient | null {
  if (!value || typeof value !== "object") return null;
  const item = value as Record<string, unknown>;
  if (typeof item.id !== "string" || !slugPattern.test(item.id)) return null;
  if (typeof item.name !== "string" || typeof item.district !== "string") return null;
  if (!item.name.trim() || !item.district.trim()) return null;
  return {
    id: item.id,
    name: item.name,
    district: item.district,
    logo: typeof item.logo === "string" ? item.logo : "",
    image: typeof item.image === "string" ? item.image : "",
  };
}

function asReview(value: unknown): Review | null {
  if (!value || typeof value !== "object") return null;
  const item = value as Record<string, unknown>;
  if (typeof item.id !== "string" || !slugPattern.test(item.id)) return null;
  if (typeof item.quote !== "string" || typeof item.name !== "string") return null;
  const gym = typeof item.gym === "string" ? item.gym : typeof item.studio === "string" ? item.studio : "";
  return {
    id: item.id,
    quote: item.quote,
    name: item.name,
    role: typeof item.role === "string" ? item.role : "",
    gym,
    image: typeof item.image === "string" ? item.image : "",
  };
}

function asFaq(value: unknown): Faq | null {
  if (!value || typeof value !== "object") return null;
  const item = value as Record<string, unknown>;
  if (typeof item.question !== "string" || typeof item.answer !== "string") return null;
  return { question: item.question, answer: item.answer };
}

function asBlocks(value: unknown): PostBlock[] | null {
  if (!Array.isArray(value) || value.length === 0) return null;
  const blocks: PostBlock[] = [];
  for (const block of value) {
    if (!block || typeof block !== "object") return null;
    const item = block as Record<string, unknown>;
    if ((item.type === "p" || item.type === "h2") && typeof item.text === "string") {
      blocks.push({ type: item.type, text: item.text });
      continue;
    }
    if (
      item.type === "ul" &&
      Array.isArray(item.items) &&
      item.items.every((entry) => typeof entry === "string")
    ) {
      blocks.push({ type: "ul", items: item.items });
      continue;
    }
    if (
      item.type === "image" &&
      typeof item.src === "string" &&
      item.src.startsWith("/") &&
      typeof item.alt === "string"
    ) {
      blocks.push({ type: "image", src: item.src, alt: item.alt });
      continue;
    }
    return null;
  }
  return blocks;
}

function asPost(value: unknown): Post | null {
  if (!value || typeof value !== "object") return null;
  const item = value as Record<string, unknown>;
  if (typeof item.slug !== "string" || !slugPattern.test(item.slug)) return null;
  if (typeof item.title !== "string" || typeof item.description !== "string") return null;
  if (typeof item.date !== "string" || typeof item.updated !== "string") return null;
  const blocks = asBlocks(item.blocks);
  if (!blocks) return null;
  const related = Array.isArray(item.relatedSlugs)
    ? item.relatedSlugs.filter((slug): slug is string => typeof slug === "string" && slugPattern.test(slug))
    : [];
  const tags = Array.isArray(item.tags)
    ? item.tags.filter((tag): tag is string => typeof tag === "string")
    : [];
  return {
    slug: item.slug,
    title: item.title,
    description: item.description,
    date: item.date,
    updated: item.updated,
    author: typeof item.author === "string" ? item.author : "Nexfit",
    tags,
    readingMinutes:
      typeof item.readingMinutes === "number" && item.readingMinutes > 0
        ? Math.round(item.readingMinutes)
        : 4,
    relatedSlugs: related,
    image: typeof item.image === "string" ? item.image : "",
    blocks,
  };
}

function mapList<T>(payload: unknown, parse: (value: unknown) => T | null, fallback: T[]): T[] {
  const list = asList(payload);
  if (!list) return fallback;
  const parsed = list.map(parse);
  if (parsed.some((item) => item === null)) return fallback;
  return parsed as T[];
}

function byDateDesc(left: Post, right: Post) {
  if (left.date === right.date) return left.title.localeCompare(right.title);
  return left.date < right.date ? 1 : -1;
}

async function readFeatures() {
  const payload = await readJson("/api/features");
  if (payload === null) return localFeatures;
  return mapList(payload, asFeature, localFeatures);
}

async function readPackages() {
  const payload = await readJson("/api/packages");
  if (payload === null) return localPackages;
  return mapList(payload, asPackage, localPackages);
}

async function readClients() {
  const payload = await readJson("/api/clients");
  if (payload !== null) return mapList(payload, asClient, localClients);
  return mapList(await readDeskClients(), asClient, localClients);
}

async function readReviews() {
  const payload = await readJson("/api/reviews");
  if (payload !== null) return mapList(payload, asReview, localReviews);
  return mapList(await readDeskReviews(), asReview, localReviews);
}

async function readFaqs() {
  const payload = await readJson("/api/faqs");
  if (payload === null) return localFaqs;
  return mapList(payload, asFaq, localFaqs);
}

async function readPosts() {
  const payload = await readJson("/api/posts");
  if (payload !== null) return [...mapList(payload, asPost, localPosts)].sort(byDateDesc);
  const posts = mapList(await readDeskPosts(), asPost, localPosts);
  return [...posts].sort(byDateDesc);
}

export async function getFeatures() {
  "use cache";
  cacheLife("hours");
  cacheTag("features");
  return readFeatures();
}

export async function getPackages() {
  "use cache";
  cacheLife("hours");
  cacheTag("packages");
  return await readPackages();
}

export async function getClients() {
  "use cache";
  cacheLife("hours");
  cacheTag("clients");
  const clients = await readClients();
  return clients;
}

export async function getReviews() {
  "use cache";
  cacheLife("hours");
  cacheTag("reviews");
  const reviews = await readReviews();
  return reviews;
}

export async function getFaqs() {
  "use cache";
  cacheLife("hours");
  cacheTag("faqs");
  const faqs = await readFaqs();
  return faqs;
}

export async function getPosts() {
  "use cache";
  cacheLife("hours");
  cacheTag("posts");
  const posts = await readPosts();
  return posts;
}

export async function getPost(slug: string) {
  "use cache";
  cacheLife("hours");
  cacheTag("posts");
  const posts = await readPosts();
  return posts.find((post) => post.slug === slug) ?? null;
}

