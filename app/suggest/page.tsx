import Masthead from "@/components/Masthead";
import Footer from "@/components/Footer";
import SuggestForm from "@/components/SuggestForm";

export default function SuggestPage() {
  return (
    <>
      <Masthead />

      <main className="site-container">

        {/* HEADER */}

        <section className="py-16 md:py-24">

          <div className="ui text-xs font-semibold uppercase tracking-[0.1em] text-[var(--ink-soft)]">
            The desk / Open submission
          </div>

          <h1 className="display mt-4 max-w-5xl text-[clamp(4rem,10vw,9rem)]">
            Suggest a saga
          </h1>

          <p className="reading mt-8 max-w-2xl text-xl leading-relaxed md:text-2xl">
            Know a deal the Ledger is missing? Send it in with
            a link to the original source. The desk will check
            it before anything is added.
          </p>

        </section>


        {/* FORM */}

        <section className="pb-20 md:pb-28">

          <SuggestForm />

        </section>


        {/* METHOD NOTE */}

        <section className="border-t-2 border-[var(--ink)] py-10">

          <div className="grid grid-cols-1 gap-8 md:grid-cols-12">

            <div className="md:col-span-3">
              <div className="ui text-xs font-semibold uppercase tracking-[0.1em] text-[var(--ink-soft)]">
                Before you send
              </div>
            </div>

            <div className="md:col-span-7">

              <ul className="reading space-y-4 text-lg leading-relaxed">

                <li>
                  <strong>1.</strong> Link to the original
                  public source.
                </li>

                <li>
                  <strong>2.</strong> Give us the player and
                  clubs involved.
                </li>

                <li>
                  <strong>3.</strong> The desk verifies the
                  source before publication.
                </li>

              </ul>

            </div>

          </div>

        </section>

      </main>

      <Footer />
    </>
  );
}