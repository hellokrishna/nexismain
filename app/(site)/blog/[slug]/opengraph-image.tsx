import { ImageResponse } from "next/og";
import { OgCard } from "@/components/OgCard";
import { posts } from "@/content/posts";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Nexfit blog";

export default async function BlogOpenGraphImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = posts.find((item) => item.slug === slug);

  return new ImageResponse(
    (
      <OgCard
        kicker="NEXIS FITNESS"
        title={post?.title ?? "Notes on running the floor"}
        footer="Notes on running a gym"
      />
    ),
    { ...size },
  );
}
