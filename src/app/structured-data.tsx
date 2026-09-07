import { DESCRIPTION, EMAIL, SITE_NAME, SITE_URL, TAGLINE } from "./site";

const ORGANIZATION_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;

// TODO: once the real social profiles in site.ts are confirmed, add them here as
// `sameAs: [...]` on the Organization node.
const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": ORGANIZATION_ID,
      name: SITE_NAME,
      url: `${SITE_URL}/`,
      description: DESCRIPTION,
      slogan: TAGLINE,
      email: EMAIL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/icon`,
        width: 512,
        height: 512,
      },
    },
    {
      "@type": "WebSite",
      "@id": WEBSITE_ID,
      url: `${SITE_URL}/`,
      name: SITE_NAME,
      description: DESCRIPTION,
      inLanguage: "en",
      publisher: { "@id": ORGANIZATION_ID },
    },
  ],
};

export function StructuredData() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
      }}
    />
  );
}
