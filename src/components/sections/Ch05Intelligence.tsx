"use client";

import { useCallback, useEffect, useRef } from "react";
import { useScroll, useMotionValueEvent } from "framer-motion";
import Chapter from "@/components/ui/Chapter";
import Reveal from "@/components/ui/Reveal";
import { lerp } from "@/lib/color";

type Pt = { cx: number; cy: number; tx: number; ty: number; ph: number };

const CAPABILITIES = [
  { t: "We build systems that remember.", d: "Retrieval over your own knowledge, so answers come from your context and not from a stranger's average." },
  { t: "We build systems that listen.", d: "Voice and language interfaces for the moments when a keyboard is the wrong tool." },
  { t: "We build systems that reason.", d: "Agents that hold a goal across many steps, and stop when they should." },
];

/** Complexity resolving into clarity — the argument made without a single buzzword. */
export default function Ch05Intelligence() {
  const ref = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pts = useRef<Pt[]>([]);
  const size = useRef({ w: 0, h: 0 });
  const progress = useRef(0);

  const seed = useCallback(() => {
    const cv = canvasRef.current;
    const ctx = cv?.getContext("2d");
    if (!cv || !ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = cv.clientWidth;
    const h = cv.clientHeight;
    size.current = { w, h };
    cv.width = w * dpr;
    cv.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const count = window.innerWidth < 760 ? 120 : 240;
    const r = Math.min(w, h) * 0.33;
    pts.current = Array.from({ length: count }, (_, i) => {
      const a = (i / count) * Math.PI * 2;
      return {
        cx: Math.random() * w,
        cy: h / 2 + (Math.random() - 0.5) * h * 1.05,
        tx: w / 2 + Math.cos(a) * r,
        ty: h / 2 + Math.sin(a) * r,
        ph: Math.random() * Math.PI * 2,
      };
    });
  }, []);

  const draw = useCallback(() => {
    const cv = canvasRef.current;
    const ctx = cv?.getContext("2d");
    const { w, h } = size.current;
    if (!cv || !ctx || !w) return;

    const p = progress.current;
    const e = p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2;
    const base = p > 0.6 ? "rgba(233,183,124," : "rgba(242,237,228,";

    ctx.clearRect(0, 0, w, h);
    for (const pt of pts.current) {
      const drift = (1 - e) * 9;
      const x = lerp(pt.cx, pt.tx, e) + Math.sin(pt.ph + p * 4) * drift;
      const y = lerp(pt.cy, pt.ty, e) + Math.cos(pt.ph + p * 4) * drift;
      ctx.beginPath();
      ctx.arc(x, y, 1.15, 0, Math.PI * 2);
      ctx.fillStyle = `${base}${(0.14 + e * 0.42).toFixed(3)})`;
      ctx.fill();
    }

    if (e > 0.86) {
      ctx.beginPath();
      ctx.arc(w / 2, h / 2, Math.min(w, h) * 0.33, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(233,183,124,${(((e - 0.86) / 0.14) * 0.3).toFixed(3)})`;
      ctx.lineWidth = 1;
      ctx.stroke();
    }
  }, []);

  useEffect(() => {
    seed();
    draw();
    const onResize = () => { seed(); draw(); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [seed, draw]);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  useMotionValueEvent(scrollYProgress, "change", (p) => {
    progress.current = p;
    draw();
  });

  return (
    <>
      <section ref={ref} id="intelligence" data-chapter="05 — Intelligence" className="relative h-[190vh]">
        <div className="sticky top-0 h-screen overflow-hidden">
          <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
          <div className="relative flex h-screen flex-col justify-center gut">
            <div className="mx-auto text-center" style={{ maxWidth: "28ch" }}>
              <Reveal as="p" className="label mb-5">05 — Intelligence</Reveal>
              <Reveal as="p" className="question mx-auto mb-11" delay={0.05}>
                Are they technically capable?
              </Reveal>
              <Reveal as="h2" className="display-sm" delay={0.1}>
                We use complexity to create <span className="accent">simplicity.</span>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <section data-chapter="05 — Intelligence" className="relative gut pb-[14vh]">
        <div className="shell">
          {CAPABILITIES.map((c, i) => (
            <Reveal
              key={c.t}
              delay={i * 0.07}
              className={`rule grid gap-x-[clamp(20px,5vw,80px)] gap-y-4 border-b py-[clamp(30px,5vh,64px)] md:grid-cols-[minmax(0,1fr)_minmax(0,0.8fr)] ${
                i === 0 ? "border-t" : ""
              }`}
            >
              <h3 className="display-sm" style={{ fontSize: "clamp(1.4rem,2.8vw,2.3rem)" }}>
                {c.t}
              </h3>
              <p className="text-[0.95rem] font-light opacity-60" style={{ maxWidth: "38ch" }}>
                {c.d}
              </p>
            </Reveal>
          ))}
          <Reveal delay={0.1}>
            <p className="lede mt-12">
              We describe what a system can do, never what it is made of. If the
              architecture matters to you, we will happily go as deep as you like — but it
              is never the first thing we say.
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
