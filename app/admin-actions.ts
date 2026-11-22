"use server";

import { updateTag } from "next/cache";
import { redirect, unstable_rethrow } from "next/navigation";
import type { GymClient, Post, PostBlock, Review } from "@/content/types";
import { deskIsSignedIn, signInToDesk, signOutOfDesk } from "@/lib/admin-session";
import {
  addDeskMessage,
  deleteDeskMessage,
  deskCanPersistFiles,
  readDeskClients,
  readDeskPosts,
  readDeskReviews,
  readingMinutes,
  slugify,
  storeDeskMedia,
  textToBlocks,
  writeDeskClients,
  writeDeskPosts,
  writeDeskReviews,
} from "@/lib/desk";

async function requireDesk() {
  if (!(await deskIsSignedIn())) redirect("/admin/login");
}

function text(formData: FormData, name: string) {
  const value = formData.get(name);
  return typeof value === "string" ? value.trim() : "";
}

async function storeImage(file: FormDataEntryValue | null, folder: string, basename: string) {
  if (!(file instanceof File) || file.size === 0) return { src: "" };
  return storeDeskMedia(file, folder, basename);
}

function redirectDeskSaveError(path: string, result: { error?: true; host?: true }) {
  if ("host" in result && result.host) redirect(`${path}?error=host`);
  redirect(`${path}?error=logo`);
}

export async function signIn(formData: FormData) {
  const ok = await signInToDesk(text(formData, "password"));
  if (!ok) redirect("/admin/login?error=1");
  redirect("/admin");
}

export async function signOut() {
  await signOutOfDesk();
  redirect("/admin/login");
}

export async function saveClient(formData: FormData) {
  await requireDesk();
  const name = text(formData, "name");
  const district = text(formData, "district");
  const id = slugify(text(formData, "id") || name);
  if (!id || !name || !district) redirect("/admin/clients?error=1");

  if (!deskCanPersistFiles()) redirect("/admin/clients?error=host");

  try {
    const clients = await readDeskClients();
    const current = clients.find((item) => item.id === id);
    const logo = await storeImage(formData.get("logo"), "clients", `${id}-logo`);
    const image = await storeImage(formData.get("image"), "clients", `${id}-photo`);
    if ("error" in logo) redirectDeskSaveError("/admin/clients", logo);
    if ("error" in image) redirectDeskSaveError("/admin/clients", image);

    const next: GymClient = {
      id,
      name,
      district,
      logo: logo.src || current?.logo || "",
      image: image.src || current?.image || "",
    };
    await writeDeskClients([next, ...clients.filter((item) => item.id !== id)]);
    updateTag("clients");
  } catch (error) {
    unstable_rethrow(error);
    redirect("/admin/clients?error=host");
  }
  redirect("/admin/clients");
}

export async function deleteClient(formData: FormData) {
  await requireDesk();
  const id = text(formData, "id");
  if (!deskCanPersistFiles()) redirect("/admin/clients?error=host");
  try {
    const clients = await readDeskClients();
    await writeDeskClients(clients.filter((item) => item.id !== id));
    updateTag("clients");
  } catch (error) {
    unstable_rethrow(error);
    redirect("/admin/clients?error=host");
  }
  redirect("/admin/clients");
}

export async function saveReview(formData: FormData) {
  await requireDesk();
  const quote = text(formData, "quote");
  const name = text(formData, "name");
  const gym = text(formData, "gym");
  const id = slugify(text(formData, "id") || `${name}-${gym}`);
  if (!id || !quote || !name) redirect("/admin/reviews?error=1");

  if (!deskCanPersistFiles()) redirect("/admin/reviews?error=host");

  try {
    const reviews = await readDeskReviews();
    const current = reviews.find((item) => item.id === id);
    const image = await storeImage(formData.get("image"), "reviews", id);
    if ("error" in image) redirectDeskSaveError("/admin/reviews", image);

    const next: Review = {
      id,
      quote,
      name,
      role: text(formData, "role"),
      gym,
      image: image.src || current?.image || "",
    };
    await writeDeskReviews([next, ...reviews.filter((item) => item.id !== id)]);
    updateTag("reviews");
  } catch (error) {
    unstable_rethrow(error);
    redirect("/admin/reviews?error=host");
  }
  redirect("/admin/reviews");
}

export async function deleteReview(formData: FormData) {
  await requireDesk();
  const id = text(formData, "id");
  if (!deskCanPersistFiles()) redirect("/admin/reviews?error=host");
  try {
    const reviews = await readDeskReviews();
    await writeDeskReviews(reviews.filter((item) => item.id !== id));
    updateTag("reviews");
  } catch (error) {
    unstable_rethrow(error);
    redirect("/admin/reviews?error=host");
  }
  redirect("/admin/reviews");
}

export async function savePost(formData: FormData) {
  await requireDesk();
  const title = text(formData, "title");
  const description = text(formData, "description");
  const slug = slugify(text(formData, "slug") || title);
  const date = text(formData, "date") || new Date().toISOString().slice(0, 10);
  const tags = text(formData, "tags")
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);
  const drafted = textToBlocks(text(formData, "body"));
  if (!slug || !title || !description || !date || drafted.length === 0) redirect("/admin/blogs?error=1");

  if (!deskCanPersistFiles()) redirect("/admin/blogs?error=host");

  try {
    const posts = await readDeskPosts();
    const current = posts.find((item) => item.slug === slug);
    const cover = await storeImage(formData.get("cover"), "blog", `${slug}-cover`);
    if ("error" in cover) redirectDeskSaveError("/admin/blogs", cover);

    const uploads = formData.getAll("images");
    const stored: string[] = [];
    for (let index = 0; index < uploads.length; index += 1) {
      const saved = await storeImage(uploads[index], "blog", `${slug}-${index + 1}`);
      if ("error" in saved) redirectDeskSaveError("/admin/blogs", saved);
      if (saved.src) stored.push(saved.src);
    }

    let uploadIndex = 0;
    const previousImages = current?.blocks.filter((block) => block.type === "image") ?? [];
    let previousIndex = 0;
    const blocks: PostBlock[] = [];
    for (const block of drafted) {
      if (block.type !== "image") {
        blocks.push(block);
        continue;
      }
      const src = stored[uploadIndex] || previousImages[previousIndex]?.src || "";
      if (stored[uploadIndex]) uploadIndex += 1;
      else previousIndex += 1;
      if (!src) redirect("/admin/blogs?error=logo");
      blocks.push({ type: "image", src, alt: block.alt || title });
    }

    const next: Post = {
      slug,
      title,
      description,
      date,
      updated: new Date().toISOString().slice(0, 10),
      author: current?.author ?? "Nexfit",
      tags,
      readingMinutes: readingMinutes(blocks),
      relatedSlugs: current?.relatedSlugs ?? [],
      image: cover.src || current?.image || "",
      blocks,
    };
    const without = posts.filter((item) => item.slug !== slug);
    await writeDeskPosts([next, ...without]);
    updateTag("posts");
  } catch (error) {
    unstable_rethrow(error);
    redirect("/admin/blogs?error=host");
  }
  redirect("/admin/blogs");
}

export async function deletePost(formData: FormData) {
  await requireDesk();
  const slug = text(formData, "slug");
  if (!deskCanPersistFiles()) redirect("/admin/blogs?error=host");
  try {
    const posts = await readDeskPosts();
    await writeDeskPosts(posts.filter((item) => item.slug !== slug));
    updateTag("posts");
  } catch (error) {
    unstable_rethrow(error);
    redirect("/admin/blogs?error=host");
  }
  redirect("/admin/blogs");
}

export async function removeMessage(formData: FormData) {
  await requireDesk();
  if (!deskCanPersistFiles()) redirect("/admin/messages?error=host");
  try {
    await deleteDeskMessage(text(formData, "id"));
    updateTag("messages");
  } catch (error) {
    unstable_rethrow(error);
    redirect("/admin/messages?error=host");
  }
  redirect("/admin/messages");
}

export async function recordInquiry(input: {
  name: string;
  studio: string;
  email: string;
  phone: string;
  packageInterest: string;
  message: string;
}) {
  if (!deskCanPersistFiles()) return;
  try {
    await addDeskMessage(input);
    updateTag("messages");
  } catch (error) {
    unstable_rethrow(error);
  }
}
