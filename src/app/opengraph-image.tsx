import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { EYEBROW, INTRO, PALETTE, SITE_NAME, TAGLINE, TITLE } from "./site";

export const alt = TITLE;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const dynamic = "force-static";

const fontDir = join(process.cwd(), "src/app/fonts");
const geistRegular = await readFile(join(fontDir, "Geist-Regular.ttf"));
const geistMedium = await readFile(join(fontDir, "Geist-Medium.ttf"));

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          background: PALETTE.bg,
          color: PALETTE.fg,
          fontFamily: "Geist",
          padding: "0 96px",
        }}
      >
        <div
          style={{
            fontSize: 22,
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            color: PALETTE.muted,
          }}
        >
          {EYEBROW}
        </div>

        <div
          style={{
            marginTop: 28,
            fontSize: 168,
            fontWeight: 500,
            letterSpacing: "-0.045em",
            lineHeight: 0.9,
          }}
        >
          {SITE_NAME}
        </div>

        <div
          style={{
            marginTop: 32,
            maxWidth: 760,
            fontSize: 46,
            fontWeight: 500,
            letterSpacing: "-0.02em",
            lineHeight: 1.15,
          }}
        >
          {TAGLINE}
        </div>

        <div
          style={{
            marginTop: 24,
            maxWidth: 780,
            fontSize: 28,
            lineHeight: 1.45,
            color: PALETTE.muted,
          }}
        >
          {INTRO}
        </div>

        <div
          style={{
            position: "absolute",
            right: 96,
            bottom: 88,
            width: 120,
            height: 1,
            background: PALETTE.fg,
          }}
        />
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Geist", data: geistRegular, style: "normal", weight: 400 },
        { name: "Geist", data: geistMedium, style: "normal", weight: 500 },
      ],
    },
  );
}
