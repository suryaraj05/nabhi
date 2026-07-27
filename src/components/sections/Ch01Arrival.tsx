"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef, type ReactNode } from "react";
import Wordmark from "@/components/brand/Wordmark";

/**
 * Arrival answers "why should I stop here?" without ever asking it out loud.
 * The hero is the only chapter that doesn't name its question — because the
 * visitor hasn't finished forming it yet.
 */
export default function Ch01Arrival() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  const y = useTransform(scrollYProgress, [0, 1], [0, -70]);
  const fade = useTransform(scrollYProgress, [0, 1], [1, 0.12]);
  const cue = useTransform(scrollYProgress, [0, 0.33], [1, 0]);

  const motionProps = reduce ? {} : { style: { y, opacity: fade } };
  const cueProps = reduce ? {} : { style: { opacity: cue } };

  const line = (text: string, delay: number, className = "") => {
    if (reduce) {
      return <span className={`block ${className}`}>{text}</span>;
    }
    return (
      <motion.span
        className={`block ${className}`}
        initial={{ opacity: 0, y: "0.4em" }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay, duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
      >
        {text}
      </motion.span>
    );
  };

  const fadeIn = (delay: number, className: string, children: ReactNode) => {
    if (reduce) return <div className={className}>{children}</div>;
    return (
      <motion.div
        className={className}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay, duration: 1.4 }}
      >
        {children}
      </motion.div>
    );
  };

  return (
    <section
      ref={ref}
      id="arrival"
      data-chapter="01 — Arrival"
      className="relative flex min-h-screen flex-col justify-center gut"
    >
      <motion.div {...motionProps} className="shell">
        {reduce ? (
          <p className="label mb-[clamp(28px,5vh,54px)]">
            <Wordmark variant="primary" />
          </p>
        ) : (
          <motion.p
            className="label mb-[clamp(28px,5vh,54px)]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.6, duration: 1.2 }}
          >
            <Wordmark variant="primary" />
          </motion.p>
        )}

        <h1 className="display" style={{ maxWidth: "17ch" }}>
          {line("The world doesn't need", 2.75)}
          {line("more technology.", 2.87)}
          {line("It needs more", 3.05, "mt-[0.28em]")}
          {reduce ? (
            <span className="accent block">understanding.</span>
          ) : (
            <motion.span
              className="accent block"
              initial={{ opacity: 0, y: "0.4em" }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 3.17, duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
            >
              understanding.
            </motion.span>
          )}
        </h1>

        {reduce ? (
          <p className="lede mt-[clamp(30px,5vh,56px)]">
            Every meaningful solution begins there. Not with a stack, not with a scope —
            with someone taking the time to understand what has actually gone wrong.
          </p>
        ) : (
          <motion.p
            className="lede mt-[clamp(30px,5vh,56px)]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3.5, duration: 1.4 }}
          >
            Every meaningful solution begins there. Not with a stack, not with a scope —
            with someone taking the time to understand what has actually gone wrong.
          </motion.p>
        )}

        {fadeIn(
          3.7,
          "mt-[clamp(38px,6vh,68px)] flex flex-wrap items-center gap-x-9 gap-y-5",
          <>
            <a href="#begin" className="cta-primary">
              Let&rsquo;s understand your problem
            </a>
            <a href="#second-brain" className="cta-quiet">
              See what we&rsquo;ve built
            </a>
          </>
        )}

        {reduce ? (
          <p
            className="label mt-[clamp(34px,6vh,70px)]"
            style={{ letterSpacing: "0.06em", textTransform: "none", fontSize: 11.5 }}
          >
            Founder-led · Products shipped across healthcare, commerce and logistics
          </p>
        ) : (
          <motion.p
            className="label mt-[clamp(34px,6vh,70px)]"
            style={{ letterSpacing: "0.06em", textTransform: "none", fontSize: 11.5 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3.9, duration: 1.4 }}
          >
            Founder-led · Products shipped across healthcare, commerce and logistics
          </motion.p>
        )}
      </motion.div>

      {!reduce ? (
        <motion.div
          {...cueProps}
          className="absolute bottom-[38px] left-1/2 flex -translate-x-1/2 flex-col items-center gap-3"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 4.1, duration: 1.2 }}
            className="flex flex-col items-center gap-3"
          >
            <span className="label">Scroll</span>
            <span
              className="h-[52px] w-px opacity-40"
              style={{ background: "linear-gradient(180deg, transparent, var(--ink))" }}
            />
          </motion.div>
        </motion.div>
      ) : null}
    </section>
  );
}
