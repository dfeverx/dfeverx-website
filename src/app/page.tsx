import { EMAIL, EYEBROW, INTRO, LINKS, TAGLINE } from "./site";

export default function Home() {
  return (
    <>
      <main className="flex flex-1 items-center px-6 py-24 sm:px-10">
        <div className="rise mx-auto w-full max-w-[46rem]">
          <p className="text-[0.6875rem] uppercase tracking-[0.28em] text-muted">
            {EYEBROW}
          </p>

          <h1 className="mt-6 text-[clamp(3rem,14vw,7.5rem)] font-medium leading-[0.9] tracking-[-0.045em]">
            dfeverx
          </h1>

          <p className="mt-7 max-w-[26rem] text-balance text-[clamp(1.375rem,4.5vw,2rem)] font-medium leading-[1.15] tracking-[-0.02em]">
            {TAGLINE}
          </p>

          <p className="mt-6 max-w-[34rem] text-balance text-lg leading-relaxed text-muted sm:text-xl">
            {INTRO}
          </p>

          <p className="mt-10">
            <a
              href={`mailto:${EMAIL}`}
              className="text-base underline decoration-line underline-offset-[6px] transition-colors hover:decoration-fg sm:text-lg"
            >
              {EMAIL}
            </a>
          </p>
        </div>
      </main>

      <footer className="border-t border-line px-6 py-8 sm:px-10">
        <div className="mx-auto flex w-full max-w-[46rem] flex-col gap-4 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
          <nav className="flex flex-wrap gap-x-6 gap-y-2">
            {LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer noopener"
                className="transition-colors hover:text-fg"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <p>© {new Date().getFullYear()} dfeverx</p>
        </div>
      </footer>
    </>
  );
}
