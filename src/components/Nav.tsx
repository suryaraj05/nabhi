"use client";

import { motion, useReducedMotion } from "framer-motion";
import Wordmark from "@/components/brand/Wordmark";

/** Home chapter anchors — prefixed so nav works from every route. */
const links = [
  { href: "/#philosophy", label: "Philosophy" },
  { href: "/second-brain", label: "Second Brain" },
  { href: "/#proof", label: "Proof" },
  { href: "/#begin", label: "Begin" },
];

export default function Nav() {
  const reduce = useReducedMotion();

  return (
    <motion.nav
      initial={reduce ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: reduce ? 0 : 4.0, duration: reduce ? 0 : 1.2 }}
      className="fixed inset-x-0 top-0 z-[60] flex items-center justify-between px-[var(--gut)] py-[26px] mix-blend-difference"
    >
      <a href="/" className="text-[12px] no-underline" style={{ color: "var(--ink)" }}>
        <Wordmark variant="interface" />
      </a>
      <div className="flex gap-[clamp(18px,2.4vw,34px)]">
        {links.map((l, i) => (
          <a
            key={l.href}
            href={l.href}
            className={`font-mono text-[11px] uppercase tracking-[0.18em] opacity-[0.65] transition-opacity duration-500 hover:opacity-100 ${
              i < links.length - 1 ? "hidden md:inline" : ""
            }`}
            style={{ color: "var(--ink)" }}
          >
            {l.label}
          </a>
        ))}
      </div>
    </motion.nav>
  );
}
