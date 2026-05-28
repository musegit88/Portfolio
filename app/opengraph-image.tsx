import { readFile } from "fs/promises";
import { ImageResponse } from "next/og";
import path from "path";

// Image metadata
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

// Image generation function
export default async function Image() {
  const fontData = await readFile(
    path.join(
      process.cwd(),
      "/public/fonts/EncodeSansSemiExpanded-SemiBold.ttf",
    ),
  );
  return new ImageResponse(
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        textAlign: "center",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        flexWrap: "nowrap",
        backgroundColor: "white",
        backgroundImage:
          "radial-gradient(circle at 25px 25px, lightgray 2%, transparent 0%), radial-gradient(circle at 75px 75px, lightgray 2%, transparent 0%)",
        backgroundSize: "100px 100px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <h1
          style={{
            fontSize: 80,
            fontFamily: "EncodeSansSemiExpanded",
            fontWeight: 900,
            backgroundColor: "black",
            color: "#ffffff",
            padding: "8px",
            borderTopLeftRadius: "8px",
            borderBottomLeftRadius: "8px",
          }}
        >
          M4
        </h1>
        <h1
          style={{
            fontSize: 80,
            backgroundColor: "white",
            color: "#000000",
            padding: "8px",
            borderTopRightRadius: "8px",
            borderBottomRightRadius: "8px",
            border: "1px solid black",
          }}
        >
          Dev
        </h1>
      </div>
      <p style={{ padding: "0px", margin: "0px", fontSize: "24px" }}>
        Full Stack Web Developer
      </p>
    </div>,
    {
      ...size,
      fonts: [
        {
          name: "EncodeSansSemiExpanded",
          weight: 900,
          data: fontData,
        },
      ],
    },
  );
}
