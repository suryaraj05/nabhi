"use client";

import { useState } from "react";

/** Part 07 — single-field waitlist. Placeholder until endpoint exists. */
export default function SecondBrainWaitlist() {
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <p className="display-sm" style={{ fontSize: "clamp(1.3rem,2.4vw,2rem)" }}>
        Thank you — we&rsquo;ll be in touch when access opens.
      </p>
    );
  }

  return (
    <form
      className="space-y-9"
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
    >
      <label className="field">
        <span className="label">Email</span>
        <input type="email" name="email" required autoComplete="email" />
      </label>
      <button type="submit" className="cta-primary">
        Join the waitlist
      </button>
      <p className="placeholder">
        Placeholder — one field only. Wire to your waitlist endpoint or route handler when
        ready.
      </p>
    </form>
  );
}
