import Link from "next/link";
import Masthead from "@/components/Masthead";
import Stamp from "@/components/Stamp";
import StageRail from "@/components/StageRail";
import Footer from "@/components/Footer";

const featured = [
  {
    number: "001",
    player: "Jude Bellingham",
    from: "Borussia Dortmund",
    to: "Real Madrid",
    window: "Summer 2023",
    slug: "jude-bellingham-real-madrid-summer-2023",
  },
  {
    number: "002",
    player: "Harry Kane",
    from: "Tottenham Hotspur",
    to: "Bayern Munich",
    window: "Summer 2023",
    slug: "harry-kane-bayern-munich-summer-2023",
  },
  {
    number: "003",
    player: "Declan Rice",
    from: "West Ham United",
    to: "Arsenal",
    window: "Summer 2023",
    slug: "declan-rice-arsenal-summer-2023",
  },
];

export default function Home() {
  return (
    <>
      <Masthead />

      <main>
        {/* HERO */}
        <section className="site-container py-16 md:py-24 lg:py-32">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-8">
              <div className="ui mb-6 text-xs font-semibold uppercase tracking-[0.12em] text-[var(--ink-soft)]">
                Transfer desk / Issue 001
              </div>

              <h1 className="display max-w-5xl text-[clamp(4.5rem,13vw,13.5rem)]">
                Every saga
                <br />
                has a{" "}
                <span className="relative inline-block">
                  last word.
                  <span className="absolute bottom-[-8px] left-0 h-[6px] w-full bg-[var(--ink)]" />
                </span>
              </h1>

              <p className="reading mt-10 max-w-2xl text-xl leading-relaxed md:text-2xl">
                Weeks of rumours, then three words: Here we go. An unofficial,
                fan-built archive of how big transfers ended, and how to read
                everything that came before.
              </p>

              <div className="mt-10 flex flex-wrap items-center gap-4">
                <Link
                  href="/archive"
                  className="button-primary"
                >
                  Open the ledger
                  <span className="button-arrow">→</span>
                </Link>

                
              </div>
            </div>

            <div className="flex justify-center lg:col-span-4 lg:justify-end">
              <Stamp />
            </div>
          </div>
        </section>

        {/* FEATURED */}
        <section className="site-container section">
          <div className="mb-8 flex items-end justify-between gap-6">
            <div>
              <div className="ui mb-2 text-xs font-semibold uppercase tracking-[0.1em] text-[var(--ink-soft)]">
                Selected entries
              </div>

              <h2 className="display text-5xl md:text-7xl">
                From the ledger
              </h2>
            </div>

            <Link
              href="/archive"
              className="ui hidden border-b border-[var(--ink)] pb-1 text-xs font-semibold uppercase tracking-[0.08em] sm:block"
            >
              See all 8 sagas →
            </Link>
          </div>

          <div className="border-t-4 border-[var(--ink)]">
            {featured.map((saga) => (
              <Link
                key={saga.slug}
                href={`/archive/${saga.slug}`}
                className="group block border-b border-[var(--ink)] py-7"
              >
                <div className="grid grid-cols-12 items-center gap-4">
                  <div className="display col-span-2 text-4xl md:text-6xl">
                    {saga.number}
                  </div>

                  <div className="col-span-10 md:col-span-6">
                    <h3 className="display text-3xl md:text-5xl">
                      {saga.player}
                    </h3>

                    <p className="ui mt-2 text-sm uppercase text-[var(--ink-soft)]">
                      {saga.from} → {saga.to}
                    </p>
                  </div>

                  <div className="ui col-span-7 col-start-3 text-xs font-semibold uppercase tracking-[0.08em] text-[var(--ink-soft)] md:col-span-2 md:col-start-auto">
                    {saga.window}
                  </div>

                  <div className="ui col-span-5 text-right text-xs font-semibold uppercase tracking-[0.08em] text-[var(--go)]">
                    Here we go →
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* METHOD */}
        <section className="site-container section">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <div className="ui mb-4 text-xs font-semibold uppercase tracking-[0.1em] text-[var(--ink-soft)]">
                Read the signals
              </div>

              <h2 className="display text-5xl md:text-7xl">
                How to read the news
              </h2>

              <p className="reading mt-6 max-w-xl text-lg leading-relaxed">
                A transfer story changes shape before it reaches the final
                announcement. The Ledger tracks the public stages without
                pretending every rumour is a fact.
              </p>
            </div>

            <div className="lg:col-span-7 lg:pt-12">
              <StageRail />
            </div>
          </div>
        </section>

        {/* CTA BAND */}
        <section className="bg-[var(--ink)] py-16 text-[var(--paper)] md:py-24">
          <div className="site-container">
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-end">
              <div className="lg:col-span-7">
                <div className="display text-6xl md:text-8xl">
                  Missing one?
                </div>

                <p className="reading mt-5 text-xl">
                  Tell the desk.
                </p>
              </div>

              <div className="lg:col-span-5">
                <Link
                  href="/suggest"
                  className="inline-flex min-h-14 w-full items-center justify-between border-2 border-[var(--paper)] px-5 font-[var(--font-display)] text-xl font-extrabold uppercase transition hover:bg-[var(--paper)] hover:text-[var(--ink)]"
                >
                  Suggest a saga
                  <span>→</span>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}