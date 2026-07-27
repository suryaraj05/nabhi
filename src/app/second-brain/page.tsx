import type { Metadata } from "next";
import Atmosphere from "@/components/Atmosphere";
import ProductFrame from "@/components/media/ProductFrame";
import Portrait from "@/components/media/Portrait";
import SecondBrainWaitlist from "@/components/sections/second-brain/SecondBrainWaitlist";
import Chapter from "@/components/ui/Chapter";
import Reveal from "@/components/ui/Reveal";
import { CAPTURE_CONNECT_RECALL } from "@/content/secondBrain";

/** Indigo (Ch03) through morning — a continuation, not a new site. */
const LIGHT_START = 0.36;
const LIGHT_END = 1;

export const metadata: Metadata = {
  title: "Second Brain",
  description:
    "A system that remembers for you. Capture what you learn, connect it, recall it in plain language.",
  alternates: { canonical: "/second-brain" },
};

export default function SecondBrainPage() {
  return (
    <>
      <Atmosphere progressStart={LIGHT_START} progressEnd={LIGHT_END} />

      {/* 01 · What is this? */}
      <Chapter
        id="what-is-this"
        n="01"
        title="What is this"
        question="What is this?"
        className="py-[14vh] pt-[22vh]"
      >
        <Reveal as="h2" className="display">
          <span style={{ maxWidth: "16ch", display: "block" }}>
            A system that <span className="accent">remembers</span> for you.
          </span>
        </Reveal>
        <Reveal delay={0.08} className="mt-[clamp(44px,8vh,100px)]">
          <ProductFrame
            alt="Second Brain — main interface"
            width={1440}
            height={900}
            priority
          />
        </Reveal>
      </Chapter>

      {/* 02 · Is this my problem? */}
      <Chapter
        id="my-problem"
        n="02"
        title="My problem"
        question="Is this my problem?"
        className="py-[14vh]"
      >
        <Reveal as="p" className="lede">
          People don&rsquo;t forget because they&rsquo;re careless. They forget because what
          they know is scattered across a dozen places that were never designed to talk to
          each other.
        </Reveal>
        <Reveal as="p" className="lede mt-8" delay={0.06}>
          If your notes live in five apps, your bookmarks in three, and the thing you read
          last month is already gone from memory — the problem isn&rsquo;t discipline. It&rsquo;s
          architecture.
        </Reveal>
      </Chapter>

      {/* 03 · What does it do? */}
      <Chapter
        id="what-it-does"
        n="03"
        title="What it does"
        question="What does it do?"
        className="py-[14vh]"
      >
        <div className="space-y-[clamp(48px,9vh,110px)]">
          {CAPTURE_CONNECT_RECALL.map((item, i) => (
            <Reveal key={item.key} delay={i * 0.06}>
              <div className="grid gap-[clamp(28px,5vw,64px)] md:grid-cols-2 md:items-center">
                <div>
                  <h3 className="font-serif text-[clamp(1.5rem,3vw,2.4rem)] font-normal">
                    {item.key}
                  </h3>
                  <p className="lede mt-4">{item.value}</p>
                </div>
                <ProductFrame
                  alt={`Second Brain — ${item.key}`}
                  width={1280}
                  height={800}
                  priority={i === 0}
                />
              </div>
            </Reveal>
          ))}
        </div>
      </Chapter>

      {/* 04 · How does it actually work? — architecture naming allowed here only */}
      <Chapter
        id="how-it-works"
        n="04"
        title="How it works"
        question="How does it actually work?"
        className="py-[14vh]"
      >
        <Reveal as="p" className="lede">
          You came here to understand the machinery — not a metaphor. This is the one place
          on the site where naming retrieval, embeddings, and models is allowed.
        </Reveal>
        <Reveal delay={0.06} className="mt-10">
          <p className="placeholder">
            Placeholder — supply the honest architecture: ingestion paths, embedding model,
            vector store, retrieval strategy, and which language model answers from your
            corpus. This is the one page where naming those pieces is allowed; do not
            publish guesses.
          </p>
        </Reveal>
      </Chapter>

      {/* 05 · Where does my data live? — non-negotiable */}
      <Chapter
        id="where-data-lives"
        n="05"
        title="Where data lives"
        question="Where does my data live?"
        className="py-[14vh]"
      >
        <Reveal as="p" className="lede">
          This answer is not written yet — and we will not guess at it.
        </Reveal>
        <Reveal delay={0.06} className="mt-10">
          <p className="placeholder">
            Placeholder — required before launch: region, hosting provider, encryption at
            rest and in transit, who can access raw data, retention policy, and whether
            notes are used to train models. A knowledge product that skips this loses the
            audience it wants.
          </p>
        </Reveal>
      </Chapter>

      {/* 06 · Who is it for? */}
      <Chapter
        id="who-for"
        n="06"
        title="Who for"
        question="Who is it for?"
        className="py-[14vh]"
      >
        <Reveal as="p" className="lede">
          Two or three honest portraits of who this is for — and who it is not for.
        </Reveal>
        <Reveal delay={0.08} className="mt-[clamp(36px,6vh,80px)] grid gap-8 md:grid-cols-2">
          <Portrait alt="Second Brain user portrait — still needed" width={800} height={1000} />
          <Portrait alt="Second Brain user portrait — still needed" width={800} height={1000} />
        </Reveal>
        <Reveal delay={0.12} className="mt-10">
          <p className="placeholder">
            Placeholder — two or three honest portraits of who this is for, plus who it is
            not for. Names, roles, and real photographs when available.
          </p>
        </Reveal>
      </Chapter>

      {/* 07 · Begin */}
      <Chapter
        id="begin"
        n="07"
        title="Begin"
        question="How do I begin?"
        className="py-[14vh] pb-[18vh]"
      >
        <Reveal as="h2" className="display-sm">
          <span style={{ maxWidth: "18ch", display: "block" }}>
            Access is <span className="accent">opening gradually.</span>
          </span>
        </Reveal>
        <Reveal delay={0.08} className="mt-[clamp(40px,8vh,90px)]">
          <SecondBrainWaitlist />
        </Reveal>
      </Chapter>
    </>
  );
}
