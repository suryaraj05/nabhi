import Chapter from "@/components/ui/Chapter";
import Reveal from "@/components/ui/Reveal";

const REFUSALS = [
  "We don't sell technology to people who haven't been listened to.",
  "We don't ship complexity and call it capability.",
  "We don't build things that make people dependent on us.",
  "We don't start a project we don't understand.",
];

export default function Ch02Philosophy() {
  return (
    <Chapter
      id="philosophy"
      n="02"
      title="Philosophy"
      question="What makes these people different?"
      className="py-[14vh]"
    >
      {/* the navel — a centre, and everything that grows outward from it */}
      <div className="relative mb-[clamp(60px,12vh,140px)] flex items-center justify-center">
        <div
          aria-hidden
          className="pointer-events-none relative"
          style={{ width: "min(62vmin, 520px)", aspectRatio: "1" }}
        >
          {[0, 2, 4, 6].map((d) => (
            <span key={d} className="ripple" style={{ animationDelay: `${d}s` }} />
          ))}
          <span
            className="breathe absolute left-1/2 top-1/2 h-[9px] w-[9px] -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{ background: "var(--amber)" }}
          />
        </div>
        <div className="absolute inset-0 flex items-center justify-center px-6 text-center">
          <Reveal as="h2" className="display-sm" >
            <span style={{ maxWidth: "17ch", display: "block" }}>
              <span className="accent">Nabhi</span> means the navel.
            </span>
          </Reveal>
        </div>
      </div>

      <div className="grid gap-[clamp(28px,5vw,80px)] md:grid-cols-2">
        <Reveal as="p" className="lede">
          Not as anatomy. As the first connection every human has ever experienced — the
          place where nourishment, growth and life began. It is the reason we are named
          after a beginning rather than a technology.
        </Reveal>
        <Reveal as="p" className="lede" delay={0.08}>
          Every meaningful creation starts from a centre of understanding. Not from noise.
          Not from speed. Not from complexity. From connection.
        </Reveal>
      </div>

      <Reveal as="h3" className="display mt-[clamp(70px,14vh,170px)]" delay={0.05}>
        <span style={{ maxWidth: "15ch", display: "block" }}>
          Before intelligence comes <span className="accent">understanding.</span>
        </span>
      </Reveal>
      <Reveal as="p" className="lede mt-9" delay={0.1}>
        Before software comes empathy. Before building comes listening. Our role is not to
        overwhelm you with technology — it is to understand your problem so deeply that the
        right technology becomes obvious.
      </Reveal>

      <div className="mt-[clamp(70px,14vh,170px)]">
        <Reveal as="p" className="label mb-10">
          What we refuse to do
        </Reveal>
        {REFUSALS.map((r, i) => (
          <Reveal
            key={r}
            delay={i * 0.06}
            className={`rule border-b py-[clamp(22px,3.4vh,40px)] ${i === 0 ? "border-t" : ""}`}
          >
            <p className="display-sm" style={{ fontSize: "clamp(1.15rem, 2.2vw, 1.85rem)" }}>
              {r}
            </p>
          </Reveal>
        ))}
      </div>
    </Chapter>
  );
}
