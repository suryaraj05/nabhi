import { ImageResponse } from "next/og";
import { SITE_NAME, SITE_TAGLINE } from "@/lib/seo";

export const alt = `${SITE_NAME} — ${SITE_TAGLINE}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Dark, type-only OG image from the sunrise palette. Hex allowed here only. */
export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: "72px 80px",
          background: "#07080A",
          color: "#F2EDE4",
        }}
      >
        <div
          style={{
            width: 18,
            height: 18,
            borderRadius: "9999px",
            background: "#E9B77C",
            marginBottom: 48,
          }}
        />
        <div
          style={{
            fontSize: 88,
            fontWeight: 400,
            letterSpacing: "-0.02em",
            lineHeight: 1.02,
            marginBottom: 20,
          }}
        >
          {SITE_NAME}
        </div>
        <div
          style={{
            fontSize: 28,
            fontWeight: 300,
            letterSpacing: "0.04em",
            color: "#E9B77C",
            maxWidth: 720,
            lineHeight: 1.35,
          }}
        >
          {SITE_TAGLINE}
        </div>
      </div>
    ),
    { ...size }
  );
}
