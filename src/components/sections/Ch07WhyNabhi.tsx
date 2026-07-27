import Chapter from "@/components/ui/Chapter";
import Reveal from "@/components/ui/Reveal";

const REASONS = [
  { t: "Founder-led", d: "The people who understand your problem are the people who build the answer. Nothing is handed down a chain." },
  { t: "End-to-end ownership", d: "One team from the first conversation to the thing running in production. No seams for a problem to hide in." },
  { t: "AI-first", d: "Not as a feature we add at the end, but as an assumption we design from the beginning." },
  { t: "Product thinking", d: "We ask what should exist before we ask what to build. Often the answer is less." },
  { t: "Global collaboration", d: "We work across time zones the way good teams always have — in writing, with clarity, without theatre." },
];

export default function Ch07WhyNabhi() {
  return (
    <Chapter
      id="why-nabhi"
      n="07"
      title="Why Nabhi"
      question="Why choose them over someone else?"
      className="py-[14vh]"
    >
      <Reveal as="h2" className="display">
        <span style={{ maxWidth: "15ch", display: "block" }}>
          Because of how we <span className="accent">think</span> — not just what we build.
        </span>
      </Reveal>

      <div className="mt-[clamp(48px,9vh,120px)] grid gap-x-[clamp(28px,5vw,80px)] gap-y-[clamp(36px,6vh,72px)] md:grid-cols-2">
        {REASONS.map((r, i) => (
          <Reveal key={r.t} delay={i * 0.06} className="rule border-t pt-8">
            <h3 className="font-serif text-[clamp(1.4rem,2.6vw,2.1rem)] font-normal">{r.t}</h3>
            <p className="mt-4 text-[0.98rem] font-light opacity-[0.62]" style={{ maxWidth: "34ch" }}>
              {r.d}
            </p>
          </Reveal>
        ))}
      </div>
    </Chapter>
  );
}
