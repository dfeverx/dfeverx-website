# Deploying dfeverx.com

The site is a **static export** — `next build` writes plain HTML/CSS/JS to `out/`,
and Firebase Hosting serves that directory. There is no server, no SSR, no
runtime environment variables.

| | |
| --- | --- |
| Firebase project | `dfeverx-com` |
| Hosting site | `dfeverx-com` → https://dfeverx-com.web.app |
| Served directory | `out/` |
| Hosting config | `firebase.json` |
| Project pointer | `.firebaserc` |

---

## The short version

```bash
npm run deploy
```

That runs `next build && firebase deploy --only hosting`. Takes about 30 seconds.

---

## First-time setup on a new machine

```bash
git clone <repo> && cd dfeverx-webiste
npm install                       # installs Next.js and the pinned firebase-tools
npx firebase login                # opens a browser; use the account that owns dfeverx-com
npx firebase projects:list        # should list dfeverx-com
```

`.firebaserc` already points at `dfeverx-com`, so no `firebase init` is needed —
running it would overwrite `firebase.json` and lose the security headers.

---

## Deploying

```bash
npm run deploy
```

Expected output ends with:

```
✔  hosting[dfeverx-com]: release complete
✔  Deploy complete!
Hosting URL: https://dfeverx-com.web.app
```

The deploy is atomic: Firebase uploads a new version, then flips the release.
Visitors never see a half-updated site.

### Build and deploy separately

Useful when you want to inspect the output before it goes live:

```bash
npm run build                              # writes out/
npx serve out                              # preview the real static files
npx firebase deploy --only hosting         # ship it
```

### Preview channel (deploy without touching production)

```bash
npx firebase hosting:channel:deploy preview --expires 7d
```

Prints a temporary URL. Good for sharing a change before releasing it.

---

## Verifying a deploy

```bash
curl -s -o /dev/null -w "%{http_code}\n" https://dfeverx-com.web.app/        # 200
curl -s -o /dev/null -w "%{http_code}\n" https://dfeverx-com.web.app/nope    # 404
curl -sI https://dfeverx-com.web.app/ | grep -i content-security-policy      # header present
curl -sI https://dfeverx-com.web.app/opengraph-image | grep -i content-type  # image/png
```

The last one matters. Under `output: "export"` Next writes the generated images
without a file extension (`out/opengraph-image`, `out/icon`, `out/apple-icon`).
Firebase would serve those with no content type and every social crawler would
reject them, so `firebase.json` sets `Content-Type: image/png` for those three
paths explicitly. **Keep that rule** if you rename them or move hosts — and don't
rely on Firebase's content sniffing to cover for it, since `X-Content-Type-Options:
nosniff` is set site-wide.

---

## Rolling back

Releases are kept in the console:
https://console.firebase.google.com/project/dfeverx-com/hosting/sites

Open the Hosting tab, find the previous version in the release history, and use
**⋮ → Rollback**. It takes effect immediately. There is no CLI rollback command.

---

## Use `npm run deploy`, not a global `firebase`

`firebase-tools` is pinned as an exact devDependency, so the deploy toolchain is
versioned with the project and integrity-checked through `package-lock.json`.

A globally installed CLI is not just redundant here — the Homebrew one is broken.
`brew install firebase-cli` ships an `fsevents.node` that Homebrew thinned from a
universal binary to arm64-only without re-signing it, leaving a stale ad-hoc
signature. On macOS 26 the code-signing monitor SIGKILLs node the moment
`firebase deploy` `dlopen()`s that file:

```
$ firebase deploy --only hosting
zsh: killed     firebase deploy --only hosting
```

No error, no log, exit code 137. The evidence is in the crash report
(`~/Library/Logs/DiagnosticReports/node-*.ips`):

```
signal:      SIGKILL (Code Signature Invalid)
termination: CODESIGNING, "Invalid Page"
stack:       node::binding::DLOpen → dlopen() → dyld
```

Lighter commands like `firebase --version` never load the addon, which is why
they appear to work.

Do **not** work around this with `codesign --force --sign -` — that rubber-stamps
a binary whose integrity you cannot verify. Run `npm run deploy`, and optionally
`brew uninstall firebase-cli` to remove the broken copy.

---

## Dependency advisories

`npm audit` reports moderate advisories inside `firebase-tools`' own transitive
dependencies. `npm audit --omit=dev` is clean — **nothing vulnerable is served to
visitors**, since the site ships no runtime dependencies at all. The suggested
`npm audit fix --force` downgrades `firebase-tools` to 10.1.1, five majors back,
which is worse than the advisories. Leave it pinned.

---

## Custom domain (not yet connected)

The site currently lives only at `dfeverx-com.web.app`. To put it on
`dfeverx.com`, add the domain under Hosting in the Firebase console, then add the
A/TXT records it gives you at your DNS provider. Firebase provisions the TLS
certificate automatically once the records propagate.

Note that `SITE_URL` in `src/app/site.ts` already claims `https://dfeverx.com`,
so the canonical URL, sitemap and OG tags point at a domain that is not live yet.
Connect the domain, or change `SITE_URL`, before the site is indexed.
