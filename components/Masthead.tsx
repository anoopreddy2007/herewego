import Link from "next/link";

export default function Masthead() {
  return (
    <header className="site-container pt-6">
      <div className="double-rule" />

      <div className="flex min-h-20 items-center justify-between gap-6 py-4">
        <Link
          href="/"
          className="display text-4xl leading-none md:text-5xl"
        >
          THE LAST WORD<span className="text-[var(--go)]">.</span>
        </Link>

        <nav
          aria-label="Main navigation"
          className="ui flex items-center gap-5 text-xs font-semibold uppercase tracking-[0.08em] sm:gap-7 sm:text-sm"
        >
          <Link
            href="/archive"
            className="border-b border-transparent pb-1 hover:border-[var(--ink)]"
          >
            Archive
          </Link>



          <Link
            href="/suggest"
            className="bg-[var(--ink)] px-3 py-2 text-[var(--paper)] hover:bg-[var(--go)]"
          >
            Suggest
          </Link>
        </nav>
      </div>

      <div className="rule" />

      <div className="ui flex min-h-10 items-center justify-between gap-4 py-2 text-[10px] font-semibold uppercase tracking-[0.08em] text-[var(--ink-soft)]">
        <span>Transfer desk / Archive</span>
        <span>Unofficial fan tribute</span>
      </div>

      <div className="rule" />
    </header>
  );
}