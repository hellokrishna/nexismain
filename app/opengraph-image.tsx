import { ImageResponse } from "next/og";
import { OgCard } from "@/components/OgCard";

export const alt = "Best gym software and complete gym software in Nepal — Nexfit";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <OgCard
        kicker="BEST GYM SOFTWARE"
        title="Complete gym software for Nepal."
        footer="Kathmandu, Chitwan, and gyms across the country on one cloud desk."
      />
    ),
    { ...size },
  );
}
