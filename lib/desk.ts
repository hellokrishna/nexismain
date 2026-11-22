import { randomUUID } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { posts as samplePosts } from "@/content/posts";
import type { GymClient, Post, PostBlock, Review } from "@/content/types";

export type DeskMessage = {
  id: string;
  name: string;
  studio: string;
  email: string;
  phone: string;
  packageInterest: string;
  message: string;
  receivedAt: string;
};

const dataDir = path.join(process.cwd(), "data");

async function readJson<T>(file: string): Promise<T | null> {
  try {
    const raw = await readFile(path.join(dataDir, file), "utf8");
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

async function writeJson(file: string, value: unknown) {
  await mkdir(dataDir, { recursive: true });
  await writeFile(path.join(dataDir, file), `${JSON.stringify(value, null, 2)}\n`, "utf8");
}

export async function readDeskClients(): Promise<GymClient[]> {
  const saved = await readJson<GymClient[]>("clients.json");
  return Array.isArray(saved) ? saved : [];
}

export async function writeDeskClients(clients: GymClient[]) {
  await writeJson("clients.json", clients);
}

export async function readDeskReviews(): Promise<Review[]> {
  const saved = await readJson<Review[]>("reviews.json");
  return Array.isArray(saved) ? saved : [];
}

export async function writeDeskReviews(reviews: Review[]) {
  await writeJson("reviews.json", reviews);
}

export async function readDeskPosts(): Promise<Post[]> {
  const saved = await readJson<Post[]>("posts.json");
  if (Array.isArray(saved)) return saved;
  return samplePosts;
}

export async function writeDeskPosts(posts: Post[]) {
  await writeJson("posts.json", posts);
}

export async function readDeskMessages(): Promise<DeskMessage[]> {
  const saved = await readJson<DeskMessage[]>("messages.json");
  return Array.isArray(saved) ? saved : [];
}

export async function addDeskMessage(input: Omit<DeskMessage, "id" | "receivedAt">) {
  const messages = await readDeskMessages();
  messages.unshift({
    ...input,
    id: randomUUID(),
    receivedAt: new Date().toISOString(),
  });
  await writeJson("messages.json", messages);
}

export async function deleteDeskMessage(id: string) {
  const messages = (await readDeskMessages()).filter((item) => item.id !== id);
  await writeJson("messages.json", messages);
}

export function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 70);
}

export function blocksToText(blocks: PostBlock[]) {
  return blocks
    .map((block) => {
      if (block.type === "h2") return `## ${block.text}`;
      if (block.type === "ul") return block.items.map((item) => `- ${item}`).join("\n");
      if (block.type === "image") return `! ${block.alt}`;
      return block.text;
    })
    .join("\n\n");
}

export function textToBlocks(text: string): PostBlock[] {
  const chunks = text
    .split(/\n\s*\n/)
    .map((chunk) => chunk.trim())
    .filter(Boolean);

  return chunks.map((chunk) => {
    if (chunk.startsWith("## ")) return { type: "h2", text: chunk.slice(3).trim() };
    if (chunk.startsWith("! ")) return { type: "image", src: "", alt: chunk.slice(2).trim() };
    const lines = chunk.split("\n").map((line) => line.trim());
    if (lines.every((line) => line.startsWith("- "))) {
      return { type: "ul", items: lines.map((line) => line.slice(2).trim()).filter(Boolean) };
    }
    return { type: "p", text: chunk.replace(/\s*\n\s*/g, " ") };
  });
}

export function readingMinutes(blocks: PostBlock[]) {
  const words = blocks
    .map((block) => {
      if (block.type === "ul") return block.items.join(" ");
      if (block.type === "image") return block.alt;
      return block.text;
    })
    .join(" ")
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}
