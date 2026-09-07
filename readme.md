# dfeverx.com

Single-page static site for **dfeverx**, a two-person product studio. One hero section, one footer, monochromatic, follows the visitor's system light/dark preference.

Built with Next.js 16 (App Router), TypeScript and Tailwind CSS v4, exported as fully static HTML for Firebase Hosting.

## Develop

```bash
npm install
npm run dev      # http://localhost:3000
```

## Build

```bash
npm run build    # static export written to ./out
```

## Deploy to Firebase Hosting

```bash
npm run deploy    # next build && firebase deploy --only hosting
```

Live at https://dfeverx-com.web.app (project `dfeverx-com`).

`firebase-tools` is a pinned devDependency, so the deploy toolchain is versioned
and integrity-checked via `package-lock.json`. Do **not** use a globally installed
Firebase CLI here — see the note below.

### Note: the Homebrew Firebase CLI is broken on macOS 26

`brew install firebase-cli` ships a `fsevents.node` that Homebrew thinned to
arm64-only without re-signing, leaving a stale ad-hoc signature. On macOS 26 the
code-signing monitor SIGKILLs node the moment `firebase deploy` `dlopen()`s it:

```
zsh: killed     firebase deploy --only hosting
```

Do not "fix" this with `codesign --force` — that rubber-stamps a binary whose
integrity can't be verified. Use `npm run deploy` instead, and optionally
`brew uninstall firebase-cli` to remove the broken copy.

### Dependency audit

`npm audit` reports moderate advisories inside `firebase-tools`' own transitive
dependencies. `npm audit --omit=dev` is clean — nothing vulnerable is served to
visitors. The suggested autofix downgrades `firebase-tools` to 10.1.1, which is
worse; leave it pinned.

## Security headers

Set in `firebase.json` and applied to every response: CSP, `X-Content-Type-Options`,
`X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`, `Cross-Origin-Opener-Policy`,
`Cross-Origin-Resource-Policy`, HSTS.

The CSP needs `script-src 'unsafe-inline'` because Next.js emits an inline
hydration payload and a static export has no server to issue per-request nonces.
Everything else is locked to `'self'`, with `object-src`, `frame-ancestors` and
`form-action` set to `'none'`.

## Content to update

- Site-wide constants — domain, title, tagline, description, contact email, social links, palette — live in `src/app/site.ts`. Everything else derives from that one file.
- The social handles there are still **placeholders**. Once they are real, also add them as `sameAs` on the Organization node in `src/app/structured-data.tsx`.
- Hero copy — eyebrow, tagline, intro — lives in `src/app/site.ts` alongside the metadata strings; `src/app/page.tsx` only lays it out.

## SEO

| Concern | Where |
| --- | --- |
| Title, description, canonical, OG/Twitter tags, robots directives | `src/app/layout.tsx` |
| Organization + WebSite JSON-LD | `src/app/structured-data.tsx` |
| 1200x630 share image (generated at build with `next/og`) | `src/app/opengraph-image.tsx` |
| Favicon / PWA icons (generated at build) | `src/app/icon.tsx`, `src/app/apple-icon.tsx`, `src/app/favicon.ico` |
| `robots.txt`, `sitemap.xml`, web manifest | `src/app/robots.ts`, `src/app/sitemap.ts`, `src/app/manifest.ts` |

The OG image and icons use Geist TTFs committed to `src/app/fonts/` — `next/og` needs raw font
bytes on disk and cannot reuse the `next/font/google` loader.

Under `output: "export"` Next writes these generated images without a file extension
(`out/opengraph-image`), which Firebase would otherwise serve with no content type and every
social crawler would reject. `firebase.json` sets `Content-Type: image/png` for those three
paths — keep that rule if you rename them or move to another host.
