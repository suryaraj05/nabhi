import Chapter from "@/components/ui/Chapter";
import Reveal from "@/components/ui/Reveal";
import { PROJECTS } from "@/content/projects";

export default function Ch06Proof() {
  return (
    <Chapter id="proof" n="06" title="Proof" question="Can I believe them?" className="py-[14vh]">
      <Reveal as="h2" className="display">
        <span style={{ maxWidth: "13ch", display: "block" }}>
          The work, and <span className="accent">nothing else.</span>
        </span>
      </Reveal>

      <div className="mt-[clamp(48px,9vh,120px)]">
        {PROJECTS.map((p, i) => (
          <Reveal
            key={p.slug}
            delay={i * 0.05}
            className={`rule border-b py-[clamp(32px,5.5vh,72px)] ${i === 0 ? "border-t" : ""}`}
          >
            <a href={`/work/${p.slug}`} className="block no-underline" style={{ color: "inherit" }}>
              <div className="grid gap-x-[clamp(20px,5vw,80px)] gap-y-4 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1fr)]">
                <div>
                  <h3 className="font-serif text-[clamp(1.7rem,3.6vw,3rem)] font-normal leading-[1.08]">
                    {p.name}
                  </h3>
                  <p className="label mt-3">{p.meta}</p>
                </div>
                <p className="lede self-center">{p.oneLiner}</p>
              </div>
            </a>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.1}>
        <p className="placeholder mt-10">
          Case-study body copy and images are still placeholders. Fill
          src/content/projects.ts when the real stories arrive. Do not invent metrics for
          <code> changed</code>.
        </p>
      </Reveal>
    </Chapter>
  );
}
