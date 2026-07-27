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

export type HorizonLayer = "sky" | "far-cloud" | "near-cloud" | "ridge" | "haze";

type Props = {
  layers?: Partial<Record<HorizonLayer, string>>;
  className?: string;
};

const ORDER: HorizonLayer[] = ["sky", "far-cloud", "near-cloud", "ridge", "haze"];

const TRAVEL: Record<HorizonLayer, number> = {
  sky: 16,
  "far-cloud": 36,
  "near-cloud": 68,
  ridge: 100,
  haze: 130,
};

function Layer({
  src,
  name,
  y,
}: {
  src: string;
  name: HorizonLayer;
  y: MotionValue<number>;
}) {
  return (
    <motion.div
      aria-hidden
      style={{
        y,
        position: "absolute",
        inset: "-10% -4%",
        backgroundColor: "color-mix(in srgb, var(--bg) 22%, transparent)",
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
          opacity: name === "haze" ? 0.5 : 0.88,
          filter: "sepia(0.2) saturate(0.75)",
        }}
      />
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background:
            "linear-gradient(180deg, color-mix(in srgb, var(--amber) 14%, transparent), color-mix(in srgb, var(--bg) 35%, transparent))",
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
          "linear-gradient(180deg, #8A6B62 0%, #D9C3A8 45%, #F2EDE4 100%)",
      }}
    />
  );
}

/**
 * Morning above a sea of cloud — what lies beyond the door.
 * Layered WebP parallax, never video. ≤400KB total when assets arrive.
 */
export default function Horizon({ layers = {}, className = "" }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const present = ORDER.filter((k) => Boolean(layers[k]));
  const useParallax = !reduce && present.length > 0;

  const ySky = useTransform(scrollYProgress, [0, 1], [TRAVEL.sky, -TRAVEL.sky]);
  const yFar = useTransform(scrollYProgress, [0, 1], [TRAVEL["far-cloud"], -TRAVEL["far-cloud"]]);
  const yNear = useTransform(scrollYProgress, [0, 1], [TRAVEL["near-cloud"], -TRAVEL["near-cloud"]]);
  const yRidge = useTransform(scrollYProgress, [0, 1], [TRAVEL.ridge, -TRAVEL.ridge]);
  const yHaze = useTransform(scrollYProgress, [0, 1], [TRAVEL.haze, -TRAVEL.haze]);

  const ys: Record<HorizonLayer, MotionValue<number>> = {
    sky: ySky,
    "far-cloud": yFar,
    "near-cloud": yNear,
    ridge: yRidge,
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
      {!useParallax ? <Fallback /> : null}
      {useParallax
        ? present.map((name) => (
            <Layer key={name} name={name} src={layers[name]!} y={ys[name]} />
          ))
        : null}

      {present.length === 0 ? (
        <div
          className="placeholder"
          style={{
            position: "absolute",
            left: 16,
            bottom: 16,
            maxWidth: "44ch",
            zIndex: 1,
          }}
        >
          Placeholder — Horizon layers required (WebP with alpha, ≤400KB total): sky,
          far-cloud, near-cloud, ridge, haze. Suggested ~1920×1080 each. No laptop in
          frame. Figure, if any: small, still.
        </div>
      ) : null}
    </div>
  );
}
