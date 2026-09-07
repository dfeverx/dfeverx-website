import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { PALETTE } from "./site";

export const size = { width: 512, height: 512 };
export const contentType = "image/png";
export const dynamic = "force-static";

const geistMedium = await readFile(
  join(process.cwd(), "src/app/fonts/Geist-Medium.ttf"),
);

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: PALETTE.fg,
          color: PALETTE.bg,
          fontFamily: "Geist",
          fontSize: 360,
          fontWeight: 500,
          letterSpacing: "-0.045em",
          lineHeight: 1,
          // optical centring: the "d" carries more sidebearing on its right
          paddingRight: 26,
        }}
      >
        d
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Geist", data: geistMedium, style: "normal", weight: 500 },
      ],
    },
  );
}
