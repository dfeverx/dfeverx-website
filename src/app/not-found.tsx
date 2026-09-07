import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main className="flex flex-1 items-center px-6 py-24 sm:px-10">
      <div className="mx-auto w-full max-w-[46rem]">
        <p className="text-[0.6875rem] uppercase tracking-[0.28em] text-muted">
          404
        </p>
        <h1 className="mt-6 text-[clamp(2rem,8vw,4rem)] font-medium leading-[0.95] tracking-[-0.04em]">
          Page not found
        </h1>
        <p className="mt-8">
          <Link
            href="/"
            className="text-base underline decoration-line underline-offset-[6px] transition-colors hover:decoration-fg sm:text-lg"
          >
            Back to dfeverx
          </Link>
        </p>
      </div>
    </main>
  );
}
