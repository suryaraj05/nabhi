"use client";

import { useState, type FormEvent } from "react";
import Chapter from "@/components/ui/Chapter";
import Reveal from "@/components/ui/Reveal";
import type { ContactError, ContactResponse } from "@/lib/contact";

type Status = "idle" | "loading" | "sent" | "error";

export default function Ch09Begin() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setError("");

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          message: data.get("message"),
        }),
      });

      const json = (await res.json()) as ContactResponse;

      if (!res.ok || !json.ok) {
        const message =
          !json.ok ? json.error : "Something went wrong. Try hello@nabhi.com instead.";
        setError(message);
        setStatus("error");
        return;
      }

      setStatus("sent");
    } catch {
      setError("Could not reach the server. Try hello@nabhi.com instead.");
      setStatus("error");
    }
  }

  return (
    <Chapter
      id="begin"
      n="09"
      title="Begin"
      question="How do I work with them?"
      className="py-[14vh]"
    >
      <Reveal as="h2" className="display">
        <span style={{ maxWidth: "15ch", display: "block" }}>
          Let&rsquo;s understand your <span className="accent">problem.</span>
        </span>
      </Reveal>
      <Reveal as="p" className="lede mt-9" delay={0.06}>
        Tell us what has become too complicated. No brief required — a paragraph in your
        own words is more useful to us than a specification.
      </Reveal>

      <div className="mt-[clamp(48px,9vh,110px)] grid gap-[clamp(36px,6vw,90px)] md:grid-cols-[minmax(0,1fr)_minmax(0,0.72fr)]">
        <Reveal>
          {status === "sent" ? (
            <p className="display-sm" style={{ fontSize: "clamp(1.3rem,2.4vw,2rem)" }}>
              Thank you — we&rsquo;ll read this properly and reply within one working day.
            </p>
          ) : (
            <form className="space-y-9" onSubmit={onSubmit} noValidate>
              <label className="field">
                <span className="label">Your name</span>
                <input type="text" name="name" required autoComplete="name" />
              </label>
              <label className="field">
                <span className="label">Email</span>
                <input type="email" name="email" required autoComplete="email" />
              </label>
              <label className="field">
                <span className="label">What has become too complicated?</span>
                <textarea name="message" rows={4} required />
              </label>
              {status === "error" && error ? (
                <p
                  className="text-[0.95rem] font-light"
                  style={{ color: "var(--amber)", maxWidth: "38ch" }}
                  role="alert"
                >
                  {error}
                </p>
              ) : null}
              <button type="submit" className="cta-primary" disabled={status === "loading"}>
                {status === "loading" ? "Sending…" : "Start the conversation"}
              </button>
            </form>
          )}
        </Reveal>

        <Reveal delay={0.08} className="space-y-10">
          <div>
            <p className="label mb-3">Write to us</p>
            <a href="mailto:hello@nabhi.com" className="cta-quiet">hello@nabhi.com</a>
          </div>
          <div>
            <p className="label mb-3">Or book a conversation</p>
            <a href="#" className="cta-quiet">Thirty minutes, no agenda</a>
          </div>
          <p className="text-[0.95rem] font-light opacity-55" style={{ maxWidth: "30ch" }}>
            We reply to everything ourselves. If we&rsquo;re not the right people for your
            problem, we&rsquo;ll tell you that too.
          </p>
        </Reveal>
      </div>
    </Chapter>
  );
}
