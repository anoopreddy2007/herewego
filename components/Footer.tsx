import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-24 border-t-4 border-[var(--ink)]">
      <div className="site-container">
        <div className="py-8">
          <div className="ui flex flex-wrap items-center justify-between gap-6 text-xs font-semibold uppercase tracking-[0.08em]">
            <nav className="flex gap-6" aria-label="Footer navigation">
              <Link href="/archive" className="hover:underline">
                Archive
              </Link>

              <Link href="/method" className="hover:underline">
                Method
              </Link>

              <Link href="/suggest" className="hover:underline">
                Suggest
              </Link>

              <Link href="/privacy" className="hover:underline">
                Privacy
              </Link>
            </nav>

            <span>Built as a fan tribute.</span>
          </div>

          <div className="mt-8 border-t border-[var(--ink)] pt-6">
            <p className="reading max-w-2xl text-base leading-relaxed">
              An unofficial fan tribute. Not affiliated with, endorsed by or
              connected to Fabrizio Romano.
            </p>
          </div>
        </div>

    
      </div>
    </footer>
  );
}