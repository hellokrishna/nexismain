import { randomUUID } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { posts as samplePosts } from "@/content/posts";
import type { GymClient, Post, PostBlock, Review } from "@/content/types";
import { deskMediaBucket, getSupabase, supabaseConfigured } from "@/lib/supabase";

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

export function deskCanPersistFiles() {
  // Local disk, or Supabase when the Vercel app is connected.
  if (supabaseConfigured()) return true;
  return process.env.VERCEL !== "1";
}

export function deskUsesSupabase() {
  return supabaseConfigured();
}

async function writeJson(file: string, value: unknown) {
  if (process.env.VERCEL === "1" && !supabaseConfigured()) {
    throw new Error("Desk file writes are not available on this host.");
  }
  await mkdir(dataDir, { recursive: true });
  await writeFile(path.join(dataDir, file), `${JSON.stringify(value, null, 2)}\n`, "utf8");
}

export async function readDeskClients(): Promise<GymClient[]> {
  const db = getSupabase();
  if (db) {
    const { data, error } = await db.from("clients").select("id,name,district,logo,image").order("name");
    if (error) throw error;
    return (data ?? []).map((row) => ({
      id: row.id,
      name: row.name,
      district: row.district,
      logo: row.logo ?? "",
      image: row.image ?? "",
    }));
  }
  const saved = await readJson<GymClient[]>("clients.json");
  return Array.isArray(saved) ? saved : [];
}

export async function writeDeskClients(clients: GymClient[]) {
  const db = getSupabase();
  if (db) {
    const { data: existing, error: readError } = await db.from("clients").select("id");
    if (readError) throw readError;
    const keep = new Set(clients.map((client) => client.id));
    const remove = (existing ?? []).map((row) => row.id).filter((id) => !keep.has(id));
    if (remove.length > 0) {
      const { error } = await db.from("clients").delete().in("id", remove);
      if (error) throw error;
    }
    if (clients.length > 0) {
      const { error } = await db.from("clients").upsert(
        clients.map((client) => ({
          ...client,
          updated_at: new Date().toISOString(),
        })),
      );
      if (error) throw error;
    }
    return;
  }
  await writeJson("clients.json", clients);
}

export async function readDeskReviews(): Promise<Review[]> {
  const db = getSupabase();
  if (db) {
    const { data, error } = await db.from("reviews").select("id,quote,name,role,gym,image").order("name");
    if (error) throw error;
    return (data ?? []).map((row) => ({
      id: row.id,
      quote: row.quote,
      name: row.name,
      role: row.role ?? "",
      gym: row.gym ?? "",
      image: row.image ?? "",
    }));
  }
  const saved = await readJson<Review[]>("reviews.json");
  return Array.isArray(saved) ? saved : [];
}

export async function writeDeskReviews(reviews: Review[]) {
  const db = getSupabase();
  if (db) {
    const { data: existing, error: readError } = await db.from("reviews").select("id");
    if (readError) throw readError;
    const keep = new Set(reviews.map((review) => review.id));
    const remove = (existing ?? []).map((row) => row.id).filter((id) => !keep.has(id));
    if (remove.length > 0) {
      const { error } = await db.from("reviews").delete().in("id", remove);
      if (error) throw error;
    }
    if (reviews.length > 0) {
      const { error } = await db.from("reviews").upsert(
        reviews.map((review) => ({
          ...review,
          updated_at: new Date().toISOString(),
        })),
      );
      if (error) throw error;
    }
    return;
  }
  await writeJson("reviews.json", reviews);
}

export async function readDeskPosts(): Promise<Post[]> {
  const db = getSupabase();
  if (db) {
    const { data, error } = await db.from("posts").select("*").order("date", { ascending: false });
    if (error) throw error;
    if (!data || data.length === 0) return samplePosts;
    return data.map((row) => ({
      slug: row.slug,
      title: row.title,
      description: row.description,
      date: row.date,
      updated: row.updated,
      author: row.author ?? "Nexfit",
      tags: Array.isArray(row.tags) ? row.tags : [],
      readingMinutes: row.reading_minutes ?? 4,
      relatedSlugs: Array.isArray(row.related_slugs) ? row.related_slugs : [],
      image: row.image ?? "",
      blocks: Array.isArray(row.blocks) ? row.blocks : [],
    }));
  }
  const saved = await readJson<Post[]>("posts.json");
  if (Array.isArray(saved)) return saved;
  return samplePosts;
}

export async function writeDeskPosts(posts: Post[]) {
  const db = getSupabase();
  if (db) {
    const { data: existing, error: readError } = await db.from("posts").select("slug");
    if (readError) throw readError;
    const keep = new Set(posts.map((post) => post.slug));
    const remove = (existing ?? []).map((row) => row.slug).filter((slug) => !keep.has(slug));
    if (remove.length > 0) {
      const { error } = await db.from("posts").delete().in("slug", remove);
      if (error) throw error;
    }
    if (posts.length > 0) {
      const { error } = await db.from("posts").upsert(
        posts.map((post) => ({
          slug: post.slug,
          title: post.title,
          description: post.description,
          date: post.date,
          updated: post.updated,
          author: post.author,
          tags: post.tags,
          reading_minutes: post.readingMinutes,
          related_slugs: post.relatedSlugs,
          image: post.image ?? "",
          blocks: post.blocks,
        })),
      );
      if (error) throw error;
    }
    return;
  }
  await writeJson("posts.json", posts);
}

export async function readDeskMessages(): Promise<DeskMessage[]> {
  const db = getSupabase();
  if (db) {
    const { data, error } = await db.from("messages").select("*").order("received_at", { ascending: false });
    if (error) throw error;
    return (data ?? []).map((row) => ({
      id: row.id,
      name: row.name,
      studio: row.studio ?? "",
      email: row.email,
      phone: row.phone ?? "",
      packageInterest: row.package_interest ?? "",
      message: row.message,
      receivedAt: row.received_at,
    }));
  }
  const saved = await readJson<DeskMessage[]>("messages.json");
  return Array.isArray(saved) ? saved : [];
}

export async function addDeskMessage(input: Omit<DeskMessage, "id" | "receivedAt">) {
  const message: DeskMessage = {
    ...input,
    id: randomUUID(),
    receivedAt: new Date().toISOString(),
  };
  const db = getSupabase();
  if (db) {
    const { error } = await db.from("messages").insert({
      id: message.id,
      name: message.name,
      studio: message.studio,
      email: message.email,
      phone: message.phone,
      package_interest: message.packageInterest,
      message: message.message,
      received_at: message.receivedAt,
    });
    if (error) throw error;
    return;
  }
  const messages = await readDeskMessages();
  messages.unshift(message);
  await writeJson("messages.json", messages);
}

export async function deleteDeskMessage(id: string) {
  const db = getSupabase();
  if (db) {
    const { error } = await db.from("messages").delete().eq("id", id);
    if (error) throw error;
    return;
  }
  const messages = (await readDeskMessages()).filter((item) => item.id !== id);
  await writeJson("messages.json", messages);
}

export async function storeDeskMedia(file: File, folder: string, basename: string) {
  const imageKinds: Record<string, string> = {
    "image/png": "png",
    "image/jpeg": "jpg",
    "image/webp": "webp",
  };
  if (file.size > 1_500_000 || !imageKinds[file.type]) {
    return { error: true as const };
  }
  const filename = `${basename}.${imageKinds[file.type]}`;
  const bytes = Buffer.from(await file.arrayBuffer());

  const db = getSupabase();
  if (db) {
    const objectPath = `${folder}/${filename}`;
    const { error } = await db.storage.from(deskMediaBucket).upload(objectPath, bytes, {
      contentType: file.type,
      upsert: true,
    });
    if (error) return { error: true as const, host: true as const };
    const { data } = db.storage.from(deskMediaBucket).getPublicUrl(objectPath);
    return { src: data.publicUrl };
  }

  if (process.env.VERCEL === "1") return { error: true as const, host: true as const };

  try {
    const dir = path.join(process.cwd(), "public", folder);
    await mkdir(dir, { recursive: true });
    await writeFile(path.join(dir, filename), bytes);
    return { src: `/${folder}/${filename}` };
  } catch {
    return { error: true as const, host: true as const };
  }
}

export function slugify(value: string) {
  const slug = value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 70);
  return slug || randomUUID().slice(0, 8);
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
