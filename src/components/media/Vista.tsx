"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";

export type VistaLayer = "deep-sky" | "far-cloud" | "near-cloud" | "land" | "haze";

type Props = {
  /** Transparent WebP layers. Omit any (or all) until assets exist. */
  layers?: Partial<Record<VistaLayer, string>>;
  className?: string;
};

const ORDER: VistaLayer[] = ["deep-sky", "far-cloud", "near-cloud", "land", "haze"];

/** Scroll travel in px — farther layers move less. */
const TRAVEL: Record<VistaLayer, number> = {
  "deep-sky": 18,
  "far-cloud": 40,
  "near-cloud": 72,
  land: 110,
  haze: 140,
};

function Layer({
  src,
  name,
  y,
}: {
  src: string;
  name: VistaLayer;
  y: MotionValue<number>;
}) {
  return (
    <motion.div
      aria-hidden
      style={{
        y,
        position: "absolute",
        inset: "-8% -4%",
        // Tint into the sunrise rather than sitting on top of it
        backgroundColor: "color-mix(in srgb, var(--bg) 28%, transparent)",
      }}
    >
      <Image
        src={src}
        alt=""
        fill
        sizes="100vw"
        loading="lazy"
        style={{
          objectFit: "cover",
          mixBlendMode: name === "haze" ? "soft-light" : "multiply",
          opacity: name === "haze" ? 0.55 : 0.85,
          filter: "sepia(0.25) saturate(0.7)",
        }}
      />
      {/* Amber wash so layers resolve into --amber / --bg */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, color-mix(in srgb, var(--amber) 12%, transparent), color-mix(in srgb, var(--bg) 40%, transparent))",
          pointerEvents: "none",
        }}
      />
    </motion.div>
  );
}

function Fallback() {
  return (
    <div
      aria-hidden
      style={{
        position: "absolute",
        inset: 0,
        // Allowed hex fallback when layers are absent (DoD)
        background:
          "linear-gradient(180deg, #141428 0%, #4A3A48 42%, #8A6B62 68%, #F2EDE4 100%)",
      }}
    />
  );
}

/**
 * The only cinematic image on the site.
 * Layered WebP parallax — never a video. Falls back to a static gradient
 * when layers are missing or the visitor prefers reduced motion.
 */
export default function Vista({ layers = {}, className = "" }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const present = ORDER.filter((k) => Boolean(layers[k]));
  const useParallax = !reduce && present.length > 0;

  const yDeep = useTransform(scrollYProgress, [0, 1], [TRAVEL["deep-sky"], -TRAVEL["deep-sky"]]);
  const yFar = useTransform(scrollYProgress, [0, 1], [TRAVEL["far-cloud"], -TRAVEL["far-cloud"]]);
  const yNear = useTransform(scrollYProgress, [0, 1], [TRAVEL["near-cloud"], -TRAVEL["near-cloud"]]);
  const yLand = useTransform(scrollYProgress, [0, 1], [TRAVEL.land, -TRAVEL.land]);
  const yHaze = useTransform(scrollYProgress, [0, 1], [TRAVEL.haze, -TRAVEL.haze]);

  const ys: Record<VistaLayer, MotionValue<number>> = {
    "deep-sky": yDeep,
    "far-cloud": yFar,
    "near-cloud": yNear,
    land: yLand,
    haze: yHaze,
  };

  return (
    <div
      ref={ref}
      className={className}
      style={{
        position: "relative",
        width: "100%",
        aspectRatio: "16 / 9",
        overflow: "hidden",
        borderRadius: 0,
      }}
    >
      {!useParallax ? (
        <Fallback />
      ) : (
        present.map((name) => (
          <Layer key={name} name={name} src={layers[name]!} y={ys[name]} />
        ))
      )}

      {present.length === 0 ? (
        <div
          className="placeholder"
          style={{
            position: "absolute",
            left: 16,
            bottom: 16,
            maxWidth: "42ch",
            zIndex: 1,
          }}
        >
          Placeholder — vista layers needed (WebP with alpha, ≤400KB total): deep-sky,
          far-cloud, near-cloud, land, haze. No laptop in frame. Figure, if any, small and
          still.
        </div>
      ) : null}
    </div>
  );
}
