"use client";

import { useEffect, useState } from "react";
import { actForChapter } from "@/lib/acts";

/** Format: II · CURVE ONE — 03 Second Brain */
function formatLabel(chapterEl: HTMLElement): string {
  const chapterAttr = chapterEl.getAttribute("data-chapter") ?? "";
  const chapterId = chapterEl.id;
  const act = actForChapter(chapterId);

  const chapterPart = chapterAttr.replace(" — ", " ");
  if (!act) return chapterPart;

  return `${act.n} · ${act.name.toUpperCase()} — ${chapterPart}`;
}

/** A quiet reminder of where you are in the conversation — and which act. */
export default function ChapterIndicator() {
  const [label, setLabel] = useState("");

  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>("[data-chapter]"));
    if (!nodes.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target instanceof HTMLElement) {
          setLabel(formatLabel(visible.target));
        }
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.01, 0.5, 1] }
    );

    nodes.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed bottom-6 left-[var(--gut)] z-[55] hidden font-mono text-[10.5px] uppercase tracking-[0.28em] transition-opacity duration-700 md:block"
      style={{ color: "color-mix(in srgb, var(--ink) 34%, transparent)", opacity: label ? 1 : 0 }}
    >
      {label}
    </div>
  );
}
