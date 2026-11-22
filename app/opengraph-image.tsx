import { ImageResponse } from "next/og";
import { OgCard } from "@/components/OgCard";

export const alt = "Nexfit, the complete gym management solution";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <OgCard
        kicker="NEXFIT"
        title="The complete gym management solution."
        footer="Members, the door, accounting, analytics, and the other essentials."
      />
    ),
    { ...size },
  );
}
