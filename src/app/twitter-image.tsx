import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Mohamed Abdelazem — Frontend Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function TwitterImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "80px",
        background:
          "linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)",
        fontFamily: "Inter, sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <div
          style={{
            fontSize: 22,
            fontWeight: 500,
            letterSpacing: "3px",
            textTransform: "uppercase",
            color: "#888",
          }}
        >
          Portfolio
        </div>
        <div
          style={{
            fontSize: 64,
            fontWeight: 300,
            color: "#fff",
            letterSpacing: "-1px",
            lineHeight: 1.1,
          }}
        >
          Mohamed Abdelazem
        </div>
        <div
          style={{
            fontSize: 28,
            fontWeight: 400,
            color: "#aaa",
            lineHeight: 1.4,
          }}
        >
          Frontend Developer — React, Vue, Next.js, TypeScript
        </div>
        <div
          style={{
            display: "flex",
            gap: "12px",
            marginTop: "20px",
          }}
        >
          {["React", "Vue", "Next.js", "TypeScript", "i18n/RTL"].map((tag) => (
            <div
              key={tag}
              style={{
                padding: "8px 20px",
                borderRadius: "9999px",
                fontSize: 16,
                fontWeight: 500,
                color: "#ccc",
                border: "1px solid #333",
                background: "rgba(255,255,255,0.05)",
              }}
            >
              {tag}
            </div>
          ))}
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          bottom: "40px",
          right: "80px",
          fontSize: 18,
          color: "#555",
        }}
      >
        mohamed.work
      </div>
    </div>,
    { ...size },
  );
}
