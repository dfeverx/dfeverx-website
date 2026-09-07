import type { MetadataRoute } from "next";
import { DESCRIPTION, PALETTE, SITE_NAME, TITLE } from "./site";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: TITLE,
    short_name: SITE_NAME,
    description: DESCRIPTION,
    start_url: "/",
    display: "standalone",
    background_color: PALETTE.bg,
    theme_color: PALETTE.bg,
    icons: [
      // Next emits these metadata images without a file extension under
      // `output: "export"`; firebase.json sets their Content-Type to image/png.
      { src: "/icon", sizes: "512x512", type: "image/png" },
      { src: "/apple-icon", sizes: "180x180", type: "image/png" },
    ],
  };
}
