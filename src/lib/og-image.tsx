import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };

export function createOgImage({
  kicker,
  title,
}: {
  kicker: string;
  title: string;
}) {
  const titleSize = title.length > 42 ? 52 : 64;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#f3efe4",
          padding: 72,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              color: "#1a5c4a",
              fontSize: 26,
              letterSpacing: 6,
            }}
          >
            {kicker}
          </div>
          <div
            style={{
              display: "flex",
              color: "#14221f",
              fontSize: titleSize,
              lineHeight: 1.15,
              fontWeight: 700,
              marginTop: 28,
              maxWidth: 980,
            }}
          >
            {title}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
          }}
        >
          <div
            style={{
              display: "flex",
              color: "#1a5c4a",
              fontSize: 36,
              fontWeight: 700,
            }}
          >
            REGNEKLAR
          </div>
          <div style={{ display: "flex", color: "#3d4f4a", fontSize: 28 }}>
            regneklar.no
          </div>
        </div>
      </div>
    ),
    ogSize,
  );
}
