import Chapter from "@/components/ui/Chapter";
import Reveal from "@/components/ui/Reveal";

const SERVICES = [
  { n: "01", t: "AI Products", d: "Systems that reason over your own data, built to be trusted rather than demonstrated." },
  { n: "02", t: "Hospital Systems", d: "Clinical software where the constraint is never the technology — it's the ten seconds a nurse has." },
  { n: "03", t: "Healthcare Websites", d: "Places patients arrive at frightened and leave from informed." },
  { n: "04", t: "E-commerce", d: "Storefronts built around the decision a buyer is actually making." },
  { n: "05", t: "Full Stack Applications", d: "End-to-end products, owned from the database to the last pixel." },
  { n: "06", t: "Custom Software", d: "For the problem that doesn't have a category yet." },
];

export default function Ch04WhatWeBuild() {
  return (
    <Chapter
      id="what-we-build"
      n="04"
      title="What We Build"
      question="Can they solve my problem?"
      className="py-[14vh]"
    >
      <Reveal as="h2" className="display">
        <span style={{ maxWidth: "14ch", display: "block" }}>
          Different industries. One <span className="accent">philosophy.</span>
        </span>
      </Reveal>

      <div className="mt-[clamp(48px,9vh,120px)]">
        {SERVICES.map((s, i) => (
          <Reveal
            key={s.n}
            delay={i * 0.05}
            className={`rule grid grid-cols-[40px_1fr] items-baseline gap-x-[clamp(16px,4vw,56px)] gap-y-3 border-b py-[clamp(26px,4vh,48px)] md:grid-cols-[56px_1fr_auto] ${
              i === 0 ? "border-t" : ""
            }`}
          >
            <span className="font-mono text-[11px] tracking-[0.16em] opacity-40">{s.n}</span>
            <h3 className="font-serif text-[clamp(1.5rem,3.2vw,2.7rem)] font-normal leading-[1.1]">
              {s.t}
            </h3>
            <p
              className="col-start-2 text-[0.95rem] font-light opacity-60 md:col-start-3"
              style={{ maxWidth: "36ch" }}
            >
              {s.d}
            </p>
          </Reveal>
        ))}
      </div>
    </Chapter>
  );
}
