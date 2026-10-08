import Link from "next/link";
import { Suspense } from "react";

import Masthead from "@/components/Masthead";
import Footer from "@/components/Footer";

import sagas from "@/content/sagas.json";

type SearchParams = {
  q?: string;
  window?: string;
  league?: string;
  sort?: string;
};

function normalise(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

/*
 * This component intentionally reads searchParams.
 * It is rendered inside Suspense below because this project
 * has Next.js 16 cacheComponents enabled.
 */
async function ArchiveContent({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;

  const query = params.q?.trim() || "";
  const selectedWindow = params.window || "";
  const selectedLeague = params.league || "";
  const selectedSort = params.sort || "newest";

  let results = [...sagas];

  // ----------------------------------------
  // SEARCH
  // ----------------------------------------

  if (query) {
    const q = normalise(query);

    results = results.filter((saga) => {
      const searchable = normalise(
        `${saga.player} ${saga.from} ${saga.to}`
      );

      return searchable.includes(q);
    });
  }

  // ----------------------------------------
  // WINDOW FILTER
  // ----------------------------------------

  if (selectedWindow) {
    results = results.filter(
      (saga) => saga.window === selectedWindow
    );
  }

  // ----------------------------------------
  // LEAGUE FILTER
  // ----------------------------------------

  if (selectedLeague) {
    results = results.filter(
      (saga) => saga.toLeague === selectedLeague
    );
  }

  // ----------------------------------------
  // SORT
  // ----------------------------------------

  if (selectedSort === "az") {
    results.sort((a, b) =>
      a.player.localeCompare(b.player)
    );
  }

  if (selectedSort === "oldest") {
    results.reverse();
  }

  // ----------------------------------------
  // FILTER OPTIONS
  // ----------------------------------------

  const windows = [
    ...new Set(sagas.map((saga) => saga.window)),
  ];

  const leagues = [
    ...new Set(sagas.map((saga) => saga.toLeague)),
  ];

  // ----------------------------------------
  // PAGE
  // ----------------------------------------

  return (
    <>
      <Masthead />

      <main className="site-container">

        {/* ==================================
            HEADER
        ================================== */}

        <section className="py-16 md:py-24">

          <div className="ui text-xs font-semibold uppercase tracking-[0.1em] text-[var(--ink-soft)]">
            The archive / Transfer desk
          </div>

          <h1 className="display mt-4 text-[clamp(4rem,10vw,9rem)]">
            The Ledger
          </h1>

          <p className="reading mt-6 max-w-2xl text-xl leading-relaxed">
            {sagas.length} sagas ·{" "}
            {new Set(sagas.map((saga) => saga.to)).size} destinations ·
            2022 to 2024
          </p>

        </section>


        {/* ==================================
            FILTERS
        ================================== */}

        <section className="border-y-4 border-[var(--ink)] py-5">

          <form
            method="GET"
            action="/archive"
            className="grid grid-cols-1 gap-4 md:grid-cols-12 md:items-end"
          >

            {/* SEARCH */}

            <div className="md:col-span-5">

              <label
                htmlFor="q"
                className="ui mb-2 block text-xs font-semibold uppercase tracking-[0.08em]"
              >
                Search player or club
              </label>

              <input
                id="q"
                name="q"
                type="search"
                defaultValue={query}
                placeholder="e.g. Real Madrid"
                className="ui h-12 w-full border-b-2 border-[var(--ink)] bg-transparent px-0 text-base outline-none placeholder:text-[var(--ink-soft)] focus:border-[var(--go)]"
              />

            </div>


            {/* WINDOW */}

            <div className="md:col-span-3">

              <label
                htmlFor="window"
                className="ui mb-2 block text-xs font-semibold uppercase tracking-[0.08em]"
              >
                Window
              </label>

              <select
                id="window"
                name="window"
                defaultValue={selectedWindow}
                className="ui h-12 w-full border-b-2 border-[var(--ink)] bg-[var(--paper)] text-sm outline-none"
              >

                <option value="">
                  All windows
                </option>

                {windows.map((window) => (
                  <option
                    key={window}
                    value={window}
                  >
                    {window}
                  </option>
                ))}

              </select>

            </div>


            {/* LEAGUE */}

            <div className="md:col-span-3">

              <label
                htmlFor="league"
                className="ui mb-2 block text-xs font-semibold uppercase tracking-[0.08em]"
              >
                Destination league
              </label>

              <select
                id="league"
                name="league"
                defaultValue={selectedLeague}
                className="ui h-12 w-full border-b-2 border-[var(--ink)] bg-[var(--paper)] text-sm outline-none"
              >

                <option value="">
                  All leagues
                </option>

                {leagues.map((league) => (
                  <option
                    key={league}
                    value={league}
                  >
                    {league}
                  </option>
                ))}

              </select>

            </div>


            {/* SORT */}

            <div className="md:col-span-1">

              <label
                htmlFor="sort"
                className="ui mb-2 block text-xs font-semibold uppercase tracking-[0.08em]"
              >
                Sort
              </label>

              <select
                id="sort"
                name="sort"
                defaultValue={selectedSort}
                className="ui h-12 w-full border-b-2 border-[var(--ink)] bg-[var(--paper)] text-sm outline-none"
              >

                <option value="newest">
                  New
                </option>

                <option value="oldest">
                  Old
                </option>

                <option value="az">
                  A–Z
                </option>

              </select>

            </div>


            {/* FILTER BUTTON */}

            <div className="md:col-span-12">

              <button
                type="submit"
                className="button-primary"
              >
                Filter

                <span className="button-arrow">
                  →
                </span>

              </button>

            </div>

          </form>

        </section>


        {/* ==================================
            RESULT COUNT
        ================================== */}

        <div className="ui flex items-center justify-between border-b border-[var(--ink)] py-4 text-xs font-semibold uppercase tracking-[0.08em]">

          <span>
            {results.length}{" "}
            {results.length === 1
              ? "saga"
              : "sagas"}
          </span>


          {(query ||
            selectedWindow ||
            selectedLeague) && (

            <Link
              href="/archive"
              className="border-b border-[var(--ink)]"
            >
              Clear filters
            </Link>

          )}

        </div>


        {/* ==================================
            RESULTS
        ================================== */}

        <section aria-label="Transfer archive">

          {results.length === 0 ? (

            <div className="py-24">

              <h2 className="display text-5xl">
                Nothing matches.
              </h2>

              <p className="reading mt-4 text-xl">
                Loosen a filter, or suggest the saga.
              </p>

              <Link
                href="/suggest"
                className="button-primary mt-8"
              >
                Suggest the saga

                <span className="button-arrow">
                  →
                </span>

              </Link>

            </div>

          ) : (

            <div className="border-b-4 border-[var(--ink)]">

              {results.map((saga, index) => (

                <Link
                  key={saga.slug}
                  href={`/archive/${saga.slug}`}
                  className="group block border-b border-[var(--ink)] py-7 transition-colors hover:bg-[var(--paper-deep)]"
                >

                  <div className="grid grid-cols-12 gap-4 md:items-center">

                    {/* NUMBER */}

                    <div className="display col-span-2 text-4xl md:text-6xl">
                      {String(index + 1).padStart(3, "0")}
                    </div>


                    {/* PLAYER */}

                    <div className="col-span-10 md:col-span-5">

                      <h2 className="display text-3xl md:text-5xl">
                        {saga.player}
                      </h2>

                      <p className="ui mt-2 text-sm uppercase text-[var(--ink-soft)]">
                        {saga.from} → {saga.to}
                      </p>

                    </div>


                    {/* WINDOW */}

                    <div className="ui col-span-6 col-start-3 text-xs font-semibold uppercase tracking-[0.08em] text-[var(--ink-soft)] md:col-span-2 md:col-start-auto">
                      {saga.window}
                    </div>


                    {/* LEAGUE */}

                    <div className="ui col-span-4 text-xs font-semibold uppercase tracking-[0.08em] md:col-span-2">
                      {saga.toLeague}
                    </div>


                    {/* ARROW */}

                    <div className="col-span-2 text-right text-[var(--go)] md:col-span-1">
                      →
                    </div>

                  </div>

                </Link>

              ))}

            </div>

          )}

        </section>


        {/* ==================================
            BOTTOM CTA
        ================================== */}

        <section className="py-16">

          <div className="flex flex-col justify-between gap-6 border-t-2 border-[var(--ink)] pt-6 sm:flex-row sm:items-center">

            <div>

              <div className="display text-4xl">
                Missing one?
              </div>

              <p className="reading mt-2 text-lg">
                Tell the desk.
              </p>

            </div>


            <Link
              href="/suggest"
              className="button-primary"
            >
              Suggest a saga

              <span className="button-arrow">
                →
              </span>

            </Link>

          </div>

        </section>

      </main>

      <Footer />
    </>
  );
}


/*
 * Page wrapper.
 *
 * Next.js 16 with cacheComponents requires request-time
 * searchParams access to be behind Suspense.
 */
export default function ArchivePage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  return (
    <Suspense
      fallback={
        <div className="site-container py-24">
          <div className="display text-5xl">
            Opening the ledger...
          </div>
        </div>
      }
    >
      <ArchiveContent
        searchParams={searchParams}
      />
    </Suspense>
  );
}