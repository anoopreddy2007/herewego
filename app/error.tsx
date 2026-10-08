"use client";

import Link from "next/link";
import Masthead from "@/components/Masthead";
import Footer from "@/components/Footer";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <>
      <Masthead />

      <main className="site-container min-h-[70vh] py-20 md:py-28">
        <div className="border-t-4 border-[var(--ink)] pt-6">
          <p className="ui text-sm uppercase tracking-[0.16em]">
            Server error / 500
          </p>

          <h1 className="display mt-8 text-[clamp(5rem,15vw,15rem)] leading-[0.78]">
            THAT ONE&apos;S
            <br />
            ON US.
          </h1>

          <p className="reading mt-10 max-w-xl text-xl leading-relaxed">
            That one&apos;s on us, not you. Try again in a minute.
          </p>

          <div className="mt-10 flex flex-wrap gap-6">
            <button
              onClick={() => reset()}
              className="ui border-2 border-[var(--ink)] px-5 py-3 text-sm uppercase hover:bg-[var(--ink)] hover:text-[var(--paper)]"
            >
              Try again →
            </button>

            <Link
              href="/"
              className="ui border-b-2 border-[var(--ink)] px-1 py-3 text-sm uppercase"
            >
              Back to the front page →
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}