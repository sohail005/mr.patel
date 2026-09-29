import { ImageResponse } from "next/og";

export const alt = "Sohail Patel — Software Developer";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#071310",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            background:
              "radial-gradient(circle at 50% 0%, rgba(105,211,176,0.16), transparent 55%)",
          }}
        />
        <div
          style={{
            display: "flex",
            fontFamily: "monospace",
            fontSize: 22,
            fontWeight: 600,
            letterSpacing: 8,
            textTransform: "uppercase",
            color: "#69D3B0",
            marginBottom: 28,
          }}
        >
          SOFTWARE DEVELOPER
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 108,
            fontWeight: 700,
            letterSpacing: -2,
            color: "#F3F1E8",
          }}
        >
          SOHAIL PATEL
        </div>
        <div
          style={{
            display: "flex",
            width: 160,
            height: 3,
            background: "#69D3B0",
            marginTop: 40,
          }}
        />
      </div>
    ),
    {
      ...size,
    }
  );
}
