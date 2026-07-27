"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  type ReactNode,
} from "react";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import {
  ACTS,
  actIndex,
  actStartValues,
  type Act as ActDef,
} from "@/lib/acts";
import { lerp } from "@/lib/color";

type Props = {
  act: ActDef;
  children: ReactNode;
};

/** Which act currently owns the spatial CSS variables. */
let owningActId: string | null = null;

function distanceToViewportCentre(el: HTMLElement): number {
  const rect = el.getBoundingClientRect();
  const mid = rect.top + rect.height / 2;
  return Math.abs(mid - window.innerHeight / 2);
}

function claimOwnership(id: string, el: HTMLElement): boolean {
  const mine = distanceToViewportCentre(el);
  let best = mine;
  let bestId = id;

  for (const a of ACTS) {
    if (a.id === id) continue;
    const node = document.querySelector<HTMLElement>(`[data-act-id="${a.id}"]`);
    if (!node) continue;
    const d = distanceToViewportCentre(node);
    if (d < best) {
      best = d;
      bestId = a.id;
    }
  }

  owningActId = bestId;
  return bestId === id;
}

function writeSpatial(
  from: ReturnType<typeof actStartValues>,
  to: ActDef,
  t: number
) {
  const root = document.documentElement;
  const p = Math.min(1, Math.max(0, t));
  root.style.setProperty("--light-angle", `${lerp(from.lightAngle, to.lightAngle, p)}deg`);
  root.style.setProperty(
    "--light-strength",
    String(lerp(from.lightStrength, to.lightStrength, p))
  );
  root.style.setProperty("--door-scale", String(lerp(from.doorScale, to.doorScale, p)));
}

/**
 * One spatial act — container for its chapters.
 * Owns --light-angle / --light-strength / --door-scale only while nearest viewport centre.
 * Lateral drift via translateX; never hijacks scroll.
 */
export default function Act({ act, children }: Props) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const index = actIndex(act.id);
  const from = useMemo(() => actStartValues(index), [index]);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const apply = useCallback(
    (t: number) => {
      const el = ref.current;
      if (!el) return;
      if (!claimOwnership(act.id, el)) return;
      writeSpatial(from, act, t);
    },
    [act, from]
  );

  useMotionValueEvent(scrollYProgress, "change", apply);

  useEffect(() => {
    apply(scrollYProgress.get());
    const onScroll = () => apply(scrollYProgress.get());
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("hashchange", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("hashchange", onScroll);
      if (owningActId === act.id) owningActId = null;
    };
  }, [act.id, apply, scrollYProgress]);

  const drifts =
    !reduce && (act.motion === "drift-left" || act.motion === "drift-right");

  // Sit opposite the turn, then drift into it — reads as walking a curve
  const xFrom = act.motion === "drift-right" ? "-6vw" : act.motion === "drift-left" ? "6vw" : "0vw";
  const x = useTransform(scrollYProgress, [0.15, 0.85], [xFrom, `${act.drift}vw`]);

  const slowed = act.id === "the-work";

  return (
    <section
      ref={ref}
      data-act={`${act.n} · ${act.name}`}
      data-act-id={act.id}
      data-motion={act.motion}
      className={`relative ${slowed ? "py-[clamp(12vh,18vh,24vh)]" : ""}`}
      style={drifts ? { willChange: "transform" } : undefined}
    >
      {drifts ? (
        <motion.div
          style={{ x, willChange: "transform" }}
          transformTemplate={({ x: xv }) => `translate3d(${xv}, 0, 0)`}
          className="relative"
        >
          <div
            className={
              act.motion === "drift-right"
                ? "md:mr-auto md:max-w-[min(100%,38rem+12vw)]"
                : "md:ml-auto md:max-w-[min(100%,38rem+12vw)]"
            }
          >
            {children}
          </div>
        </motion.div>
      ) : (
        children
      )}
    </section>
  );
}

/** Force every act to re-evaluate ownership (after programmatic scroll). */
export function recomputeSpatial() {
  owningActId = null;
  window.dispatchEvent(new Event("scroll"));
  // Threshold syncs from --door-scale on the next scroll tick
  window.dispatchEvent(new Event("resize"));
}
