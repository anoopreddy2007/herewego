"use client";

import { useState } from "react";

export default function Stamp() {
  const [key, setKey] = useState(0);

  function replay() {
    setKey((value) => value + 1);
  }

  return (
    <button
      type="button"
      onClick={replay}
      aria-label="Replay Here We Go stamp"
      className="group cursor-pointer border-0 bg-transparent p-0"
    >
      <span
        key={key}
        className="stamp stamp-animate"
        aria-hidden="true"
      >
        <span className="stamp-inner">
          HERE
          <br />
          WE
          <br />
          GO
        </span>
      </span>

      <span className="ui mt-4 block text-center text-xs font-semibold uppercase tracking-[0.08em]">
        Status: Here we go
      </span>
    </button>
  );
}