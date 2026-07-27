"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Wordmark from "@/components/brand/Wordmark";

export default function Preloader() {
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    document.body.style.overflow = "hidden";

    if (reduce) {
      setCount(100);
      const t = setTimeout(() => setDone(true), 320);
      return () => {
        clearTimeout(t);
        document.body.style.overflow = "";
      };
    }

    const start = performance.now();
    const DURATION = 2100;

    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / DURATION);
      const eased = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
      setCount(Math.round(eased * 100));
      if (t < 1) raf = requestAnimationFrame(tick);
      else setTimeout(() => setDone(true), 260);
    };
    raf = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(raf);
  }, [reduce]);

  useEffect(() => {
    if (done) {
      const t = setTimeout(() => {
        document.body.style.overflow = "";
      }, reduce ? 0 : 700);
      return () => clearTimeout(t);
    }
  }, [done, reduce]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center"
          style={{ background: "var(--bg)" }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduce ? 0.35 : 0.9, ease: [0.22, 0.61, 0.36, 1] }}
        >
          <motion.div
            className={`h-1.5 w-1.5 rounded-full breathe ${reduce ? "" : ""}`}
            style={{ background: "var(--amber)" }}
            exit={reduce ? { opacity: 0 } : { scale: 26, opacity: 0 }}
            transition={{ duration: reduce ? 0.3 : 1.3, ease: [0.65, 0, 0.35, 1] }}
          />
          {!reduce ? (
            <>
              <div
                className="absolute bottom-[var(--gut)] left-[var(--gut)] font-mono text-[11px] tracking-[0.14em]"
                style={{ color: "color-mix(in srgb, var(--ink) 40%, transparent)" }}
              >
                {String(count).padStart(2, "0")}
              </div>
              <div
                className="absolute bottom-[var(--gut)] right-[var(--gut)] text-[11px]"
                style={{ color: "color-mix(in srgb, var(--ink) 40%, transparent)" }}
              >
                <Wordmark variant="interface" />
              </div>
            </>
          ) : null}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
