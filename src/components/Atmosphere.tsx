"use client";

import { useEffect, useRef } from "react";
import { useScroll, useMotionValueEvent } from "framer-motion";
import { SKY, rgbAt, css, clamp01, inkAt, amberAt } from "@/lib/color";

type Props = {
  /** Map page scroll 0→1 to this slice of the sky (default: full sunrise). */
  progressStart?: number;
  progressEnd?: number;
};

function mapProgress(p: number, start: number, end: number) {
  if (end <= start) return start;
  return start + clamp01(p) * (end - start);
}

function applyLight(root: HTMLElement, mp: number, refs: {
  sky: HTMLDivElement | null;
  sun: HTMLDivElement | null;
  horizon: HTMLDivElement | null;
}) {
  const sky = css(rgbAt(SKY, mp));
  if (refs.sky) refs.sky.style.background = sky;
  root.style.setProperty("--bg", sky);

  root.style.setProperty("--ink", css(inkAt(mp)));
  root.style.setProperty("--amber", css(amberAt(mp)));

  const sunT = clamp01((mp - 0.42) / 0.48);
  if (refs.sun) {
    refs.sun.style.opacity = String(sunT * 0.95);
    refs.sun.style.transform = `translate(-50%, ${48 - sunT * 78}vh)`;
  }

  const hT = clamp01((mp - 0.34) / 0.2) * (1 - clamp01((mp - 0.72) / 0.18));
  if (refs.horizon) refs.horizon.style.opacity = String(hT);
}

/**
 * The whole site sits inside one continuous sunrise.
 * Nothing here is decoration — the light is the narrative.
 */
export default function Atmosphere({
  progressStart = 0,
  progressEnd = 1,
}: Props) {
  const skyRef = useRef<HTMLDivElement>(null);
  const sunRef = useRef<HTMLDivElement>(null);
  const horizonRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    applyLight(document.documentElement, mapProgress(0, progressStart, progressEnd), {
      sky: skyRef.current,
      sun: sunRef.current,
      horizon: horizonRef.current,
    });
  }, [progressStart, progressEnd]);

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    applyLight(
      document.documentElement,
      mapProgress(p, progressStart, progressEnd),
      { sky: skyRef.current, sun: sunRef.current, horizon: horizonRef.current }
    );
  });

  return (
    <>
      <div
        ref={skyRef}
        aria-hidden
        className="fixed inset-0 z-0 pointer-events-none"
        style={{ background: "var(--bg)", transition: "background 120ms linear" }}
      />
      <div
        ref={sunRef}
        aria-hidden
        className="fixed left-1/2 bottom-[-40vh] z-[1] pointer-events-none opacity-0"
        style={{
          width: "150vmax",
          height: "150vmax",
          transform: "translate(-50%, 48vh)",
          background:
            "radial-gradient(circle at 50% 50%, rgba(255,214,164,.55) 0%, rgba(233,183,124,.28) 18%, rgba(180,120,110,.12) 34%, rgba(0,0,0,0) 62%)",
        }}
      />
      <div
        ref={horizonRef}
        aria-hidden
        className="fixed left-0 right-0 top-[64%] h-px z-[2] pointer-events-none opacity-0"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(233,183,124,.45), transparent)",
        }}
      />
    </>
  );
}
