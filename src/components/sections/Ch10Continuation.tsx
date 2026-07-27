import Wordmark from "@/components/brand/Wordmark";
import Horizon from "@/components/spatial/Horizon";
import Reveal from "@/components/ui/Reveal";

const LINKS = [
  { h: "#philosophy", l: "Philosophy" },
  { h: "#second-brain", l: "Second Brain" },
  { h: "#proof", l: "Proof" },
  { h: "#begin", l: "Begin" },
];

/** Not a footer. The world doesn't end — it continues past the screen. */
export default function Ch10Continuation() {
  return (
    <section
      id="continuation"
      data-chapter="10 — Continuation"
      className="relative gut pb-[54px] pt-[16vh]"
    >
      <div className="shell">
        <Reveal as="h2" className="display-sm">
          <span style={{ maxWidth: "20ch", display: "block" }}>
            Understanding doesn&rsquo;t end at the edge of a screen. It just carries on
            somewhere <span className="accent">quieter.</span>
          </span>
        </Reveal>

        <Reveal delay={0.08} className="mt-[clamp(48px,9vh,110px)]">
          {/* Layers omitted until WebP assets arrive — Horizon shows gradient + placeholder */}
          <Horizon />
        </Reveal>

        <div className="mt-[clamp(56px,11vh,140px)] flex flex-wrap items-end justify-between gap-x-12 gap-y-10">
          <div>
            <p className="label mb-4">
              <Wordmark variant="interface" />
            </p>
            <p className="text-[0.95rem] font-light opacity-55" style={{ maxWidth: "26ch" }}>
              Before intelligence comes understanding.
            </p>
          </div>

          <nav className="flex flex-wrap gap-x-8 gap-y-3">
            {LINKS.map((x) => (
              <a key={x.h} href={x.h} className="cta-quiet" style={{ fontSize: 11 }}>
                {x.l}
              </a>
            ))}
          </nav>

          <p className="label" style={{ letterSpacing: "0.06em", textTransform: "none", fontSize: 11 }}>
            © 2026 Nabhi — All rights reserved
          </p>
        </div>
      </div>
    </section>
  );
}
