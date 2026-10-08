import Link from "next/link";
import Masthead from "@/components/Masthead";
import Footer from "@/components/Footer";

const stages = [
  {
    number: "01",
    title: "Interest",
    text: "A player becomes a credible target. Reports may identify the club, the player or the agent, but nothing is agreed merely because interest is public.",
  },
  {
    number: "02",
    title: "Talks",
    text: "The parties are discussing terms. This can mean negotiations between clubs, conversations with the player, or both. The shape of a deal can still change.",
  },
  {
    number: "03",
    title: "Here we go",
    text: "The reporting has reached the point represented by “Here we go”. It is a reporter's call, not a club announcement or a substitute for the official confirmation.",
  },
  {
    number: "04",
    title: "Medical",
    text: "The player completes the medical process and the remaining contractual work moves towards completion. A medical does not itself equal an official announcement.",
  },
  {
    number: "05",
    title: "Official",
    text: "The club formally announces the transfer. This is the point at which the move becomes official in the club's own public record.",
  },
];

const glossary = [
  ["Interest", "Public reporting that a club is considering or monitoring a player."],
  ["Talks", "Negotiations or discussions between the relevant parties."],
  ["Advanced talks", "Reporting that negotiations have progressed beyond an initial approach."],
  ["Verbal agreement", "A reported agreement in principle before the remaining formal work is completed."],
  ["Medical", "The player's medical examination as part of completing a transfer."],
  ["Documents signed", "The relevant contracts have been formally executed."],
  ["Official", "The club has publicly announced the transfer."],
  ["Here we go", "A reporter's confirmation that the major parts of a deal are agreed."],
];

export default function MethodPage() {
  return (
    <>
      <Masthead />

      <main>
        {/* HERO */}
        <section className="site-container section">
          <div className="border-t-4 border-[var(--ink)] pt-6">
            <p className="ui text-sm uppercase tracking-[0.16em]">
              The method / How we read a saga
            </p>

            <h1 className="display mt-8 max-w-6xl text-[clamp(4.5rem,12vw,12rem)] leading-[0.8]">
              How a saga
              <br />
              ends.
            </h1>

            <p className="reading mt-10 max-w-2xl text-xl leading-relaxed">
              Transfer stories rarely move in a straight line. This archive
              reads the public reporting as a sequence of stages, then marks
              the point where the reporting says a deal is done and the point
              where the club makes it official.
            </p>
          </div>
        </section>

        {/* STAGES */}
        <section className="site-container section">
          <div className="border-t-2 border-[var(--ink)]">
            {stages.map((stage) => (
              <article
                key={stage.number}
                className="grid grid-cols-12 border-b-2 border-[var(--ink)] py-8 md:py-10"
              >
                <div className="col-span-2 md:col-span-1">
                  <span className="ui text-sm">{stage.number}</span>
                </div>

                <div className="col-span-10 md:col-span-4">
                  <h2 className="display text-4xl uppercase md:text-6xl">
                    {stage.title}
                  </h2>
                </div>

                <div className="col-span-10 col-start-3 mt-5 md:col-span-6 md:col-start-7 md:mt-0">
                  <p className="reading text-lg leading-relaxed">
                    {stage.text}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* CAVEAT */}
        <section className="bg-[var(--ink)] text-[var(--paper)]">
          <div className="site-container section">
            <div className="grid grid-cols-12 gap-6">
              <div className="col-span-12 md:col-span-5">
                <p className="ui text-sm uppercase tracking-[0.16em]">
                  The honest bit
                </p>

                <h2 className="display mt-5 text-5xl leading-[0.9] md:text-7xl">
                  A report is
                  <br />
                  not a club.
                </h2>
              </div>

              <div className="col-span-12 md:col-span-6 md:col-start-7">
                <p className="reading text-lg leading-relaxed">
                  Clubs have occasionally disputed a reported “Here we go” in
                  public. That is part of the story too. The Ledger records the
                  reporting date and, where sourced, the official announcement
                  date separately.
                </p>

                <p className="reading mt-6 text-lg leading-relaxed">
                  The point is not to pretend every saga is perfectly linear.
                  It is to preserve what was publicly reported and show how the
                  story moved towards its final word.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* PHRASE ORIGIN */}
        <section className="site-container section">
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 md:col-span-4">
              <p className="ui text-sm uppercase tracking-[0.16em]">
                Phrase origin
              </p>
            </div>

            <div className="col-span-12 md:col-span-7 md:col-start-6">
              <h2 className="display text-5xl leading-[0.9] md:text-7xl">
                “Here we go”
              </h2>

              <p className="reading mt-8 text-lg leading-relaxed">
                Fabrizio Romano has described how the phrase became part of
                his transfer reporting style and eventually became closely
                associated with his final confirmation of a deal.
              </p>

              <p className="reading mt-5 text-lg leading-relaxed">
                The phrase now functions as a recognisable marker in transfer
                coverage: a reporter's confirmation that the major pieces of a
                deal have been agreed, while the formal club announcement may
                still be ahead.
              </p>

              <a
                href="https://sportingtribune.com/how-i-started-here-we-go-catchphrase-for-football-transfers-fabrizio-romano/"
                target="_blank"
                rel="noreferrer"
                className="ui mt-8 inline-block border-b-2 border-current pb-1 text-sm uppercase"
              >
                Read the background →
              </a>
            </div>
          </div>
        </section>

        {/* GLOSSARY */}
        <section className="border-y-2 border-[var(--ink)]">
          <div className="site-container section">
            <p className="ui text-sm uppercase tracking-[0.16em]">
              A fan's glossary, not official definitions.
            </p>

            <dl className="mt-8">
              {glossary.map(([term, definition]) => (
                <div
                  key={term}
                  className="grid grid-cols-12 border-t-2 border-[var(--ink)] py-6"
                >
                  <dt className="display col-span-12 text-3xl uppercase md:col-span-4 md:text-4xl">
                    {term}
                  </dt>

                  <dd className="reading col-span-12 mt-3 text-lg leading-relaxed md:col-span-7 md:col-start-6 md:mt-0">
                    {definition}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* WHAT THIS SITE IS */}
        <section className="site-container section">
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 md:col-span-5">
              <p className="ui text-sm uppercase tracking-[0.16em]">
                What this site is
              </p>

              <h2 className="display mt-5 text-5xl leading-[0.9] md:text-7xl">
                A fan archive.
              </h2>
            </div>

            <div className="col-span-12 md:col-span-6 md:col-start-7">
              <p className="reading text-lg leading-relaxed">
                The Last Word is an unofficial, fan-built archive of transfer
                sagas. It is interested in the reporting around a move:
                what was said, when the story changed, and how the final
                outcome compared with the noise that came before it.
              </p>

              <p className="reading mt-6 text-lg leading-relaxed">
                This site does not reproduce articles or claim ownership of
                other people's reporting. Sources are linked so readers can
                follow the original coverage.
              </p>

              <div className="mt-10 border-t-2 border-[var(--ink)] pt-6">
                <p className="ui text-sm uppercase tracking-[0.16em]">
                  Builder's note
                </p>

                <p className="reading mt-4 text-lg leading-relaxed">
                  Built by a football fan as an independent archive project.
                  Corrections and additions will be handled through the
                  Suggest page. Before public launch, this note should be
                  updated with the builder's name, course and contact address.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SOURCES */}
        <section className="bg-[var(--paper-deep,var(--paper))] border-t-2 border-[var(--ink)]">
          <div className="site-container section">
            <div className="grid grid-cols-12 gap-6">
              <div className="col-span-12 md:col-span-4">
                <p className="ui text-sm uppercase tracking-[0.16em]">
                  Follow the reporting
                </p>
              </div>

              <div className="col-span-12 md:col-span-7 md:col-start-6">
                <div className="border-t-2 border-[var(--ink)]">
                  <a
                    href="https://x.com/FabrizioRomano"
                    target="_blank"
                    rel="noreferrer"
                    className="ui block border-b-2 border-[var(--ink)] py-4 uppercase"
                  >
                    X / Fabrizio Romano →
                  </a>

                  <a
                    href="https://www.instagram.com/fabriziorom/"
                    target="_blank"
                    rel="noreferrer"
                    className="ui block border-b-2 border-[var(--ink)] py-4 uppercase"
                  >
                    Instagram / Fabrizio Romano →
                  </a>

                  <a
                    href="https://www.youtube.com/@FabrizioRomanoYT"
                    target="_blank"
                    rel="noreferrer"
                    className="ui block border-b-2 border-[var(--ink)] py-4 uppercase"
                  >
                    YouTube / Fabrizio Romano →
                  </a>

                  <a
                    href="https://podcasts.apple.com/us/podcast/the-here-we-go-podcast/id1554785643"
                    target="_blank"
                    rel="noreferrer"
                    className="ui block border-b-2 border-[var(--ink)] py-4 uppercase"
                  >
                    The Here We Go Podcast →
                  </a>

                  <a
                    href="https://thedailybriefing.io/newsletters"
                    target="_blank"
                    rel="noreferrer"
                    className="ui block border-b-2 border-[var(--ink)] py-4 uppercase"
                  >
                    Daily Briefing →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* BACK */}
        <section className="site-container py-12">
          <Link
            href="/"
            className="ui inline-block border-b-2 border-[var(--ink)] pb-1 text-sm uppercase"
          >
            ← Back to the front page
          </Link>
        </section>
      </main>

      <Footer />
    </>
  );
}