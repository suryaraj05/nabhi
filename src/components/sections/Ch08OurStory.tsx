import Portrait from "@/components/media/Portrait";
import Chapter from "@/components/ui/Chapter";
import Reveal from "@/components/ui/Reveal";

export default function Ch08OurStory() {
  return (
    <Chapter
      id="our-story"
      n="08"
      title="Our Story"
      question="Who are the people behind this?"
      className="py-[14vh]"
    >
      <Reveal as="h2" className="display">
        <span style={{ maxWidth: "16ch", display: "block" }}>
          Four people who kept meeting the same <span className="accent">problem.</span>
        </span>
      </Reveal>

      <div className="mt-[clamp(48px,9vh,120px)] grid gap-[clamp(28px,5vw,80px)] md:grid-cols-2">
        <div className="space-y-8">
          <Reveal as="p" className="lede">
            We came from different rooms — engineering, design, healthcare, commerce — and
            kept arriving at the same moment. Someone would describe a problem, and long
            before anyone had understood it, a solution was already being sold to them.
          </Reveal>
          <Reveal as="p" className="lede" delay={0.06}>
            We watched good organisations buy software that made their work heavier. We
            watched people apologise for not understanding a tool that had been designed
            without them in mind.
          </Reveal>
        </div>
        <div className="space-y-8">
          <Reveal as="p" className="lede" delay={0.1}>
            Nabhi exists because we thought the order was wrong. Not because the technology
            was bad — because nobody had begun at the beginning.
          </Reveal>
          <Reveal as="p" className="lede" delay={0.16}>
            What we want to change is small and stubborn: that the first hour of every
            project belongs to understanding, and that the person with the problem should
            leave the room feeling lighter than when they walked in.
          </Reveal>
        </div>
      </div>

      <Reveal delay={0.1} className="mt-12">
        <Portrait
          alt="The founding team — documentary photograph still needed"
          width={1600}
          height={1000}
        />
      </Reveal>

      <Reveal delay={0.14}>
        <p className="placeholder mt-8">
          Placeholder — replace with the real account of how the four of you met and what
          each of you brought. Names and roles belong beside the photograph above.
        </p>
      </Reveal>
    </Chapter>
  );
}
