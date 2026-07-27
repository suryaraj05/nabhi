"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import Chapter from "@/components/ui/Chapter";
import Reveal from "@/components/ui/Reveal";

/** Scattered thoughts finding each other — drawn, not decorated. */
const NODES = [
  [18, 26], [34, 14], [52, 30], [70, 18], [86, 34],
  [12, 58], [30, 48], [48, 62], [66, 50], [84, 66],
  [24, 82], [44, 90], [62, 78], [78, 92],
];
const EDGES: [number, number][] = [
  [0, 1], [1, 2], [2, 3], [3, 4], [2, 6], [6, 5], [6, 7],
  [7, 8], [8, 9], [8, 4], [5, 10], [10, 11], [11, 12], [12, 13], [12, 8], [7, 11],
];

const BENEFITS = [
  { k: "Capture", v: "Anything you read, hear or half-remember goes in without ceremony." },
  { k: "Connect", v: "It finds the relationship between today's note and something you wrote a year ago." },
  { k: "Recall", v: "You ask a question in plain language. It answers from your own thinking." },
];

export default function Ch03SecondBrain() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 40%"] });
  const draw = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const drawn = reduce ? 1 : draw;

  return (
    <Chapter
      id="second-brain"
      n="03"
      title="Second Brain"
      question="Okay — but what have you actually built?"
      className="py-[14vh]"
    >
      <Reveal as="h2" className="display">
        <span style={{ maxWidth: "16ch", display: "block" }}>
          A system that <span className="accent">remembers</span> for you.
        </span>
      </Reveal>

      <div className="mt-[clamp(44px,8vh,110px)] grid items-center gap-[clamp(36px,6vw,90px)] md:grid-cols-2">
        <div>
          <Reveal as="p" className="label mb-4">The problem</Reveal>
          <Reveal as="p" className="lede" delay={0.06}>
            People don&rsquo;t forget because they&rsquo;re careless. They forget because
            what they know is scattered across a dozen places that were never designed to
            talk to each other.
          </Reveal>

          <Reveal as="p" className="label mb-4 mt-12" delay={0.1}>The transformation</Reveal>
          <Reveal as="p" className="lede" delay={0.14}>
            Second Brain gathers it into one place that thinks the way you do — and then
            gets out of the way. You stop managing your knowledge and start using it.
          </Reveal>
        </div>

        {/* the constellation — decorative; meaning is in the prose */}
        <div ref={ref} className="relative" aria-hidden>
          <svg viewBox="0 0 100 100" className="w-full" style={{ overflow: "visible" }}>
            {EDGES.map(([a, b], i) => (
              <motion.line
                key={i}
                x1={NODES[a][0]} y1={NODES[a][1]}
                x2={NODES[b][0]} y2={NODES[b][1]}
                stroke="var(--amber)"
                strokeWidth={0.22}
                strokeOpacity={0.55}
                style={{ pathLength: drawn }}
              />
            ))}
            {NODES.map(([x, y], i) => (
              <motion.circle
                key={i}
                cx={x} cy={y} r={0.85}
                fill="var(--amber)"
                style={{ opacity: drawn }}
              />
            ))}
          </svg>
        </div>
      </div>

      <div className="mt-[clamp(56px,10vh,130px)] grid gap-[clamp(24px,4vw,64px)] md:grid-cols-3">
        {BENEFITS.map((b, i) => (
          <Reveal key={b.k} delay={i * 0.07} className="rule border-t pt-7">
            <h3 className="font-serif text-[clamp(1.3rem,2.2vw,1.8rem)] font-normal">{b.k}</h3>
            <p className="mt-3 text-[0.95rem] font-light opacity-60">{b.v}</p>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.1}>
        <a href="/second-brain" className="cta-primary mt-[clamp(44px,8vh,100px)] inline-block">
          See Second Brain in use
        </a>
      </Reveal>

      <Reveal delay={0.14}>
        <p className="placeholder mt-8">
          Placeholder — drop product screenshots or a short screen recording here. The
          constellation above is a stand-in for real interface imagery.
        </p>
      </Reveal>
    </Chapter>
  );
}
