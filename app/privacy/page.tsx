import Link from "next/link";
import Masthead from "@/components/Masthead";
import Footer from "@/components/Footer";

export default function PrivacyPage() {
  return (
    <>
      <Masthead />

      <main>
        <section className="site-container section">
          <div className="border-t-4 border-[var(--ink)] pt-6">
            <p className="ui text-sm uppercase tracking-[0.16em]">
              The small print
            </p>

            <h1 className="display mt-8 max-w-5xl text-[clamp(4.5rem,12vw,11rem)] leading-[0.8]">
              Privacy.
            </h1>

            <p className="reading mt-10 max-w-2xl text-xl leading-relaxed">
              This is a small fan archive, so the privacy policy should be
              small and clear too. Here is what happens when you send something
              to The Last Word.
            </p>
          </div>
        </section>

        <section className="site-container section">
          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-12 md:col-span-4">
              <p className="ui text-sm uppercase tracking-[0.16em]">
                What we collect
              </p>
            </div>

            <div className="col-span-12 md:col-span-7 md:col-start-6">
              <p className="reading text-lg leading-relaxed">
                The Suggest form collects the fields you choose to submit:
                player, clubs, transfer window, source URL, optional note,
                optional credit name and consent, and optional email address.
              </p>

              <p className="reading mt-6 text-lg leading-relaxed">
                We do not intentionally collect your IP address, device
                fingerprint or precise location.
              </p>
            </div>
          </div>
        </section>

        <section className="border-y-2 border-[var(--ink)]">
          <div className="site-container section">
            <div className="grid grid-cols-12 gap-8">
              <div className="col-span-12 md:col-span-4">
                <p className="ui text-sm uppercase tracking-[0.16em]">
                  Why we collect it
                </p>
              </div>

              <div className="col-span-12 md:col-span-7 md:col-start-6">
                <p className="reading text-lg leading-relaxed">
                  Suggestions are used to review possible additions or
                  corrections to the archive. An email address, if provided,
                  may be used to contact you about that submission.
                </p>

                <p className="reading mt-6 text-lg leading-relaxed">
                  Your credit name is only made public if you explicitly give
                  permission and the suggested saga is added.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="site-container section">
          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-12 md:col-span-4">
              <p className="ui text-sm uppercase tracking-[0.16em]">
                How long we keep it
              </p>
            </div>

            <div className="col-span-12 md:col-span-7 md:col-start-6">
              <p className="reading text-lg leading-relaxed">
                Optional email addresses are used only for the submission
                review process and are deleted after review or within 30 days,
                whichever comes first.
              </p>

             


            </div>
          </div>
        </section>

        <section className="bg-[var(--ink)] text-[var(--paper)]">
          <div className="site-container section">
            <div className="grid grid-cols-12 gap-8">
              <div className="col-span-12 md:col-span-4">
                <p className="ui text-sm uppercase tracking-[0.16em]">
                  Who sees it
                </p>
              </div>

              <div className="col-span-12 md:col-span-7 md:col-start-6">
                <p className="reading text-lg leading-relaxed">
                  Suggestions are stored in Supabase, the database service
                  used by this project. They are accessed only for operating,
                  reviewing and maintaining the archive.
                </p>

                <p className="reading mt-6 text-lg leading-relaxed">
                  Analytics are not currently configured.
                </p>

                <p className="reading mt-6 text-lg leading-relaxed">
                  The production hosting provider will be named here before
                  public launch.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="site-container section">
          <div className="grid grid-cols-12 gap-8">
            

          </div>
        </section>

        <section className="border-t-2 border-[var(--ink)]">
          <div className="site-container section">
            <div className="max-w-3xl">
              <p className="ui text-sm uppercase tracking-[0.16em]">
                About the project
              </p>

              <p className="reading mt-6 text-lg leading-relaxed">
                The Last Word is an unofficial, fan-built project. It is not
                affiliated with, endorsed by or connected to Fabrizio Romano.
                Nobody connected to Fabrizio Romano has reviewed or endorsed
                this project.
              </p>

              <p className="reading mt-6 text-lg leading-relaxed">
                This project is built independently as a fan archive of
                publicly reported football transfer sagas. Sources are linked
                rather than reproduced.
              </p>
            </div>
          </div>
        </section>

        <section className="site-container pb-16">
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