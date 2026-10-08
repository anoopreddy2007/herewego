const stages = [
  "Interest",
  "Talks",
  "Agreed",
  "Medical",
  "Official",
];

export default function StageRail() {
  return (
    <ol className="ui grid grid-cols-1 border-l border-[var(--ink)] md:grid-cols-5 md:border-l-0 md:border-t">
      {stages.map((stage, index) => (
        <li
          key={stage}
          className={`relative px-4 py-5 ${
            index !== 0
              ? "border-t border-[var(--ink)] md:border-l md:border-t-0"
              : ""
          }`}
        >
          <div className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[var(--ink-soft)]">
            0{index + 1}
          </div>

          <div className="mt-2 text-sm font-semibold uppercase">
            {stage}
          </div>

          {index === 2 && (
            <div className="mt-2 text-xs font-semibold uppercase text-[var(--go)]">
              Here we go
            </div>
          )}
        </li>
      ))}
    </ol>
  );
}