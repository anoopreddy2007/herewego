import Link from "next/link";
import Masthead from "@/components/Masthead";
import Footer from "@/components/Footer";

export default function NotFound() {
  return (
    <>
      <Masthead />

      <main className="site-container min-h-[70vh] py-20 md:py-28">
        <div className="border-t-4 border-[var(--ink)] pt-6">
          <p className="ui text-sm uppercase tracking-[0.16em]">
            404 / Offside
          </p>

          <h1 className="display mt-8 text-[clamp(5rem,16vw,15rem)] leading-[0.78]">
            OFFSIDE.
          </h1>

          <p className="reading mt-10 max-w-xl text-xl leading-relaxed">
            This page isn&apos;t on the pitch.
          </p>

          <div className="mt-10 flex flex-wrap gap-6">
            <Link
              href="/"
              className="ui border-2 border-[var(--ink)] px-5 py-3 text-sm uppercase hover:bg-[var(--ink)] hover:text-[var(--paper)]"
            >
              Back to the front page →
            </Link>

            <Link
              href="/archive"
              className="ui border-b-2 border-[var(--ink)] px-1 py-3 text-sm uppercase"
            >
              Open the ledger →
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}