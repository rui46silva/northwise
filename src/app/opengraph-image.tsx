import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site";

export const runtime = "edge";
export const alt = `${siteConfig.name} — ${siteConfig.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background:
            "radial-gradient(circle at 50% 120%, #1f6bff 0%, #0a2a6b 30%, #020410 60%)",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 26,
            letterSpacing: 6,
            textTransform: "uppercase",
            color: "#9cbeff",
          }}
        >
          Web Development Studio / Northern Portugal
        </div>
        <div style={{ fontSize: 88, fontWeight: 700, marginTop: 24 }}>
          {siteConfig.tagline}
        </div>
        <div
          style={{
            fontSize: 30,
            marginTop: 28,
            color: "#cdd9f5",
            maxWidth: 820,
            textAlign: "center",
          }}
        >
          Strategic websites, landing pages and custom web platforms.
        </div>
      </div>
    ),
    { ...size },
  );
}
