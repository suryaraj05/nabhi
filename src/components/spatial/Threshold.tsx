"use client";

import { useEffect } from "react";
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "framer-motion";
import { clamp01 } from "@/lib/color";

/**
 * Passage into Act VI — the arch expands past the viewport and becomes the page.
 * Driven by --door-scale (owned by Act) so it stays in sync with the corridor.
 * CSS transform scale only. No video, no canvas.
 */
export default function Threshold() {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scale = useMotionValue(1);
  const fade = useMotionValue(1);

  function sync() {
    const raw = document.documentElement.style.getPropertyValue("--door-scale");
    const door = parseFloat(raw || "4");
    // Act V ends at 72; Act VI climbs toward 120
    const t = clamp01((door - 72) / 48);
    scale.set(1 + t * 17);
    fade.set(t < 0.5 ? 1 : clamp01(1 - (t - 0.5) / 0.5));
    document.documentElement.style.setProperty("--threshold-t", String(t));
    document.documentElement.style.setProperty(
      "--door-glow-cap",
      // Stay capped until well through the door (morning has arrived)
      String(t > 0.25 ? 0.35 : 0.1)
    );
  }

  useMotionValueEvent(scrollYProgress, "change", sync);

  useEffect(() => {
    document.documentElement.style.setProperty("--threshold-t", "0");
    document.documentElement.style.setProperty("--door-glow-cap", "0.1");
    sync();
  }, []);

  if (reduce) return null;

  return (
    <motion.div className="threshold" aria-hidden style={{ scale, opacity: fade }}>
      <div className="threshold__arch" />
    </motion.div>
  );
}
