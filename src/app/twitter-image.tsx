import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Mohamed Abdelazem — Frontend Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function TwitterImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          position: "relative",
          overflow: "hidden",
          background: "#0a0a0a",
          fontFamily: "Inter, sans-serif",
        }}
      >
        {/* Gradient glow */}
        <div
          style={{
            position: "absolute",
            right: -120,
            top: -120,
            width: 500,
            height: 500,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 70%)",
          }}
        />

        {/* Corner accent — vertical */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: 4,
            height: 100,
            background: "linear-gradient(to bottom, #fff, transparent)",
          }}
        />
        {/* Corner accent — horizontal */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: 100,
            height: 4,
            background: "linear-gradient(to right, #fff, transparent)",
          }}
        />

        {/* MA monogram */}
        <div
          style={{
            position: "absolute",
            top: 48,
            left: 60,
            fontSize: 22,
            fontWeight: 700,
            letterSpacing: "0.15em",
            color: "#ffffff",
            opacity: 0.9,
            border: "1.5px solid #666",
            borderRadius: 6,
            padding: "6px 12px",
            lineHeight: 1,
            display: "flex",
          }}
        >
          MA
        </div>

        {/* Domain */}
        <div
          style={{
            position: "absolute",
            top: 54,
            right: 60,
            fontSize: 14,
            color: "#666",
            letterSpacing: "0.08em",
            fontWeight: 500,
            display: "flex",
          }}
        >
          mohamed.work
        </div>

        {/* Main content */}
        <div
          style={{
            position: "absolute",
            left: 60,
            bottom: 80,
            right: 60,
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Page label */}
          <div
            style={{
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#666",
              marginBottom: 16,
              display: "flex",
            }}
          >
            Portfolio
          </div>

          {/* Title */}
          <div
            style={{
              fontSize: 64,
              fontWeight: 700,
              color: "#ffffff",
              lineHeight: 1.1,
              marginBottom: 10,
              letterSpacing: "-0.02em",
              display: "flex",
            }}
          >
            Mohamed Abdelazem
          </div>

          {/* Description */}
          <div
            style={{
              fontSize: 18,
              color: "#e2e2e2",
              opacity: 0.6,
              maxWidth: 700,
              lineHeight: 1.5,
              fontWeight: 400,
              display: "flex",
            }}
          >
            Building performant web experiences with React, Vue & TypeScript.
          </div>
        </div>

        {/* Bottom border accent */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 3,
            background: "linear-gradient(to right, #ffffff, transparent 60%)",
          }}
        />

        {/* Decorative dots */}
        <div
          style={{
            position: "absolute",
            right: 60,
            bottom: 80,
            display: "flex",
            flexWrap: "wrap",
            width: 62,
            gap: 10,
            opacity: 0.15,
          }}
        >
          {Array.from({ length: 16 }).map((_, i) => (
            <div
              key={i}
              style={{
                width: 5,
                height: 5,
                borderRadius: "50%",
                background: "#fff",
              }}
            />
          ))}
        </div>
      </div>
    ),
    { ...size },
  );
}
