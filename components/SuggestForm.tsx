"use client";

import { FormEvent, useState } from "react";

type FormState = {
  player: string;
  fromClub: string;
  toClub: string;
  window: string;
  sourceUrl: string;
  note: string;
  creditName: string;
  creditOk: boolean;
  email: string;
  website: string;
};

type Errors = Record<string, string>;

const windows = [
  "Summer 2025",
  "Winter 2025/26",
  "Summer 2026",
  "Winter 2026/27",
  "Earlier",
];

const clubs = [
  "Arsenal",
  "Bayern Munich",
  "Barcelona",
  "Borussia Dortmund",
  "Brighton & Hove Albion",
  "Chelsea",
  "Manchester City",
  "Manchester United",
  "Paris Saint-Germain",
  "Real Madrid",
  "Tottenham Hotspur",
  "West Ham United",
  "Al Nassr",
];

const initialForm: FormState = {
  player: "",
  fromClub: "",
  toClub: "",
  window: "",
  sourceUrl: "",
  note: "",
  creditName: "",
  creditOk: false,
  email: "",
  website: "",
};

export default function SuggestForm() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const [refNo, setRefNo] = useState<number | null>(null);
  const [serverError, setServerError] = useState("");

  function updateField(
    field: keyof FormState,
    value: string | boolean
  ) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));

    setErrors((current) => {
      const next = { ...current };
      delete next[field];
      return next;
    });

    setServerError("");
  }

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setSubmitting(true);
    setErrors({});
    setServerError("");

    try {
      const response = await fetch("/api/suggest", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (response.status === 422) {
        setErrors(data.errors || {});
        return;
      }

      if (!response.ok) {
        setServerError(
          "The desk couldn't receive this suggestion. Try again."
        );
        return;
      }

      setRefNo(data.refNo);
    } catch {
      setServerError(
        "The desk couldn't be reached. Check your connection and try again."
      );
    } finally {
      setSubmitting(false);
    }
  }

  // ----------------------------------------
  // SUCCESS STATE
  // ----------------------------------------

  if (refNo !== null) {
    return (
      <section className="border-4 border-[var(--ink)] bg-[var(--paper-deep)] p-8 md:p-14">
        <div className="ui text-xs font-semibold uppercase tracking-[0.1em] text-[var(--go)]">
          Submission received
        </div>

        <h2 className="display mt-4 text-6xl md:text-8xl">
          Received.
        </h2>

        <div className="mt-10 border-y-2 border-[var(--ink)] py-8">
          <div className="ui text-xs font-semibold uppercase tracking-[0.1em] text-[var(--ink-soft)]">
            Suggestion reference
          </div>

          <div className="display mt-2 text-5xl md:text-7xl">
            No. {String(refNo).padStart(4, "0")}
          </div>
        </div>

        <p className="reading mt-8 max-w-xl text-xl leading-relaxed">
          It joins the desk queue. Thanks for helping keep the Ledger
          complete.
        </p>

        <button
          type="button"
          onClick={() => {
            setRefNo(null);
            setForm(initialForm);
          }}
          className="button-primary mt-8"
        >
          Suggest another
          <span className="button-arrow">→</span>
        </button>
      </section>
    );
  }

  // ----------------------------------------
  // FORM
  // ----------------------------------------

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="border-t-4 border-[var(--ink)]"
    >
      {/* HONEYPOT */}

      <div
        aria-hidden="true"
        className="absolute -left-[9999px] h-px w-px overflow-hidden"
      >
        <label htmlFor="website">
          Website
        </label>

        <input
          id="website"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={form.website}
          onChange={(event) =>
            updateField("website", event.target.value)
          }
        />
      </div>

      {/* PLAYER */}

      <div className="grid grid-cols-1 border-b border-[var(--ink)] md:grid-cols-12">
        <div className="ui border-b border-[var(--ink)] p-4 text-xs font-semibold uppercase tracking-[0.08em] md:col-span-3 md:border-b-0 md:border-r">
          Player
        </div>

        <div className="p-4 md:col-span-9">
          <input
            id="player"
            name="player"
            type="text"
            required
            value={form.player}
            onChange={(event) =>
              updateField("player", event.target.value)
            }
            placeholder="e.g. Jude Bellingham"
            className="reading w-full bg-transparent text-xl outline-none placeholder:text-[var(--ink-soft)]"
          />

          {errors.player && (
            <p className="ui mt-2 text-xs font-semibold text-[var(--siren)]">
              {errors.player}
            </p>
          )}
        </div>
      </div>

      {/* FROM */}

      <div className="grid grid-cols-1 border-b border-[var(--ink)] md:grid-cols-12">
        <div className="ui border-b border-[var(--ink)] p-4 text-xs font-semibold uppercase tracking-[0.08em] md:col-span-3 md:border-b-0 md:border-r">
          From club
        </div>

        <div className="p-4 md:col-span-9">
          <input
            id="fromClub"
            name="fromClub"
            type="text"
            required
            list="club-list"
            value={form.fromClub}
            onChange={(event) =>
              updateField("fromClub", event.target.value)
            }
            placeholder="e.g. Borussia Dortmund"
            className="reading w-full bg-transparent text-xl outline-none placeholder:text-[var(--ink-soft)]"
          />

          {errors.fromClub && (
            <p className="ui mt-2 text-xs font-semibold text-[var(--siren)]">
              {errors.fromClub}
            </p>
          )}
        </div>
      </div>

      {/* TO */}

      <div className="grid grid-cols-1 border-b border-[var(--ink)] md:grid-cols-12">
        <div className="ui border-b border-[var(--ink)] p-4 text-xs font-semibold uppercase tracking-[0.08em] md:col-span-3 md:border-b-0 md:border-r">
          To club
        </div>

        <div className="p-4 md:col-span-9">
          <input
            id="toClub"
            name="toClub"
            type="text"
            required
            list="club-list"
            value={form.toClub}
            onChange={(event) =>
              updateField("toClub", event.target.value)
            }
            placeholder="e.g. Real Madrid"
            className="reading w-full bg-transparent text-xl outline-none placeholder:text-[var(--ink-soft)]"
          />

          {errors.toClub && (
            <p className="ui mt-2 text-xs font-semibold text-[var(--siren)]">
              {errors.toClub}
            </p>
          )}
        </div>
      </div>

      <datalist id="club-list">
        {clubs.map((club) => (
          <option key={club} value={club} />
        ))}
      </datalist>

      {/* WINDOW */}

      <div className="grid grid-cols-1 border-b border-[var(--ink)] md:grid-cols-12">
        <div className="ui border-b border-[var(--ink)] p-4 text-xs font-semibold uppercase tracking-[0.08em] md:col-span-3 md:border-b-0 md:border-r">
          Transfer window
        </div>

        <div className="p-4 md:col-span-9">
          <select
            id="window"
            name="window"
            required
            value={form.window}
            onChange={(event) =>
              updateField("window", event.target.value)
            }
            className="ui w-full bg-transparent py-1 text-base outline-none"
          >
            <option value="">
              Select a window
            </option>

            {windows.map((window) => (
              <option key={window} value={window}>
                {window}
              </option>
            ))}
          </select>

          {errors.window && (
            <p className="ui mt-2 text-xs font-semibold text-[var(--siren)]">
              {errors.window}
            </p>
          )}
        </div>
      </div>

      {/* SOURCE */}

      <div className="grid grid-cols-1 border-b border-[var(--ink)] md:grid-cols-12">
        <div className="ui border-b border-[var(--ink)] p-4 text-xs font-semibold uppercase tracking-[0.08em] md:col-span-3 md:border-b-0 md:border-r">
          Original source
        </div>

        <div className="p-4 md:col-span-9">
          <input
            id="sourceUrl"
            name="sourceUrl"
            type="url"
            required
            value={form.sourceUrl}
            onChange={(event) =>
              updateField("sourceUrl", event.target.value)
            }
            placeholder="https://..."
            className="ui w-full bg-transparent text-base outline-none placeholder:text-[var(--ink-soft)]"
          />

          <p className="ui mt-2 text-[11px] uppercase tracking-[0.05em] text-[var(--ink-soft)]">
            Link to the original post or source. HTTPS required.
          </p>

          {errors.sourceUrl && (
            <p className="ui mt-2 text-xs font-semibold text-[var(--siren)]">
              {errors.sourceUrl}
            </p>
          )}
        </div>
      </div>

      {/* NOTE */}

      <div className="grid grid-cols-1 border-b border-[var(--ink)] md:grid-cols-12">
        <div className="ui border-b border-[var(--ink)] p-4 text-xs font-semibold uppercase tracking-[0.08em] md:col-span-3 md:border-b-0 md:border-r">
          Note
        </div>

        <div className="p-4 md:col-span-9">
          <textarea
            id="note"
            name="note"
            maxLength={140}
            value={form.note}
            onChange={(event) =>
              updateField("note", event.target.value)
            }
            placeholder="Anything the desk should know?"
            rows={3}
            className="reading w-full resize-none bg-transparent text-lg outline-none placeholder:text-[var(--ink-soft)]"
          />

          <div className="ui mt-2 text-right text-[10px] uppercase tracking-[0.05em] text-[var(--ink-soft)]">
            {form.note.length}/140
          </div>

          {errors.note && (
            <p className="ui mt-2 text-xs font-semibold text-[var(--siren)]">
              {errors.note}
            </p>
          )}
        </div>
      </div>

      {/* CREDIT */}

      <div className="grid grid-cols-1 border-b border-[var(--ink)] md:grid-cols-12">
        <div className="ui border-b border-[var(--ink)] p-4 text-xs font-semibold uppercase tracking-[0.08em] md:col-span-3 md:border-b-0 md:border-r">
          Credit
        </div>

        <div className="space-y-4 p-4 md:col-span-9">
          <input
            id="creditName"
            name="creditName"
            type="text"
            value={form.creditName}
            onChange={(event) =>
              updateField("creditName", event.target.value)
            }
            placeholder="Your name, if you'd like credit"
            className="ui w-full border-b border-[var(--ink)] bg-transparent py-2 text-base outline-none placeholder:text-[var(--ink-soft)]"
          />

          <label className="ui flex cursor-pointer items-start gap-3 text-sm">
            <input
              type="checkbox"
              name="creditOk"
              checked={form.creditOk}
              onChange={(event) =>
                updateField(
                  "creditOk",
                  event.target.checked
                )
              }
              className="mt-1 h-4 w-4 accent-[var(--ink)]"
            />

            <span>
              I consent to being credited by this name if the
              suggestion is published.
            </span>
          </label>

          {errors.creditName && (
            <p className="ui text-xs font-semibold text-[var(--siren)]">
              {errors.creditName}
            </p>
          )}
        </div>
      </div>

      {/* EMAIL */}

      <div className="grid grid-cols-1 border-b border-[var(--ink)] md:grid-cols-12">
        <div className="ui border-b border-[var(--ink)] p-4 text-xs font-semibold uppercase tracking-[0.08em] md:col-span-3 md:border-b-0 md:border-r">
          Email
        </div>

        <div className="p-4 md:col-span-9">
          <input
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={(event) =>
              updateField("email", event.target.value)
            }
            placeholder="Optional"
            className="ui w-full bg-transparent text-base outline-none placeholder:text-[var(--ink-soft)]"
          />

          <p className="ui mt-2 text-[11px] uppercase tracking-[0.05em] text-[var(--ink-soft)]">
            Optional. Used only if the desk needs clarification.
          </p>

          {errors.email && (
            <p className="ui mt-2 text-xs font-semibold text-[var(--siren)]">
              {errors.email}
            </p>
          )}
        </div>
      </div>

      {/* SERVER ERROR */}

      {serverError && (
        <div
          role="alert"
          className="border-b-2 border-[var(--siren)] bg-[var(--siren)]/10 p-4"
        >
          <p className="ui text-sm font-semibold text-[var(--siren)]">
            {serverError}
          </p>
        </div>
      )}

      {/* SUBMIT */}

      <div className="flex flex-col justify-between gap-6 border-b-4 border-[var(--ink)] py-6 sm:flex-row sm:items-center">
        <p className="reading max-w-xl text-base">
          By submitting, you confirm that the source link is
          public and that this suggestion can be reviewed by
          the desk.
        </p>

        <button
          type="submit"
          disabled={submitting}
          className="button-primary shrink-0 disabled:cursor-wait disabled:opacity-50"
        >
          {submitting ? "Sending..." : "Send to the desk"}

          {!submitting && (
            <span className="button-arrow">
              →
            </span>
          )}
        </button>
      </div>
    </form>
  );
}