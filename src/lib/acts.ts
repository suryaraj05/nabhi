export type Motion = "forward" | "drift-left" | "drift-right" | "threshold";

export type Act = {
  id: string;
  n: string;
  name: string;
  motion: Motion;
  /** Degrees: negative = light from left, positive = from right, 0 = centred. */
  lightAngle: number;
  /** 0–1 */
  lightStrength: number;
  /** Target door height in vh at the END of this act. */
  doorScale: number;
  /** vw of lateral travel, signed. 0 for forward acts. */
  drift: number;
  /** chapter ids from chapters.ts */
  chapters: string[];
};

/**
 * Six spatial acts containing the ten chapters.
 * Single source of truth for corridor state — never hardcode these in components.
 */
export const ACTS: Act[] = [
  {
    id: "threshold",
    n: "I",
    name: "The Threshold",
    motion: "forward",
    lightAngle: 0,
    lightStrength: 0.15,
    doorScale: 4,
    drift: 0,
    chapters: ["arrival", "philosophy"],
  },
  {
    id: "curve-one",
    n: "II",
    name: "Curve One",
    motion: "drift-right",
    lightAngle: -45,
    lightStrength: 0.35,
    doorScale: 8,
    drift: 7.5,
    chapters: ["second-brain"],
  },
  {
    id: "curve-two",
    n: "III",
    name: "Curve Two",
    motion: "drift-left",
    lightAngle: 45,
    lightStrength: 0.4,
    doorScale: 16,
    drift: -7.5,
    chapters: ["what-we-build"],
  },
  {
    id: "approach",
    n: "IV",
    name: "The Approach",
    motion: "forward",
    lightAngle: 0,
    lightStrength: 0.65,
    doorScale: 34,
    drift: 0,
    chapters: ["intelligence"],
  },
  {
    id: "the-work",
    n: "V",
    name: "The Work",
    motion: "forward",
    lightAngle: 0,
    lightStrength: 0.95,
    doorScale: 62,
    drift: 0,
    chapters: ["proof", "why-nabhi"],
  },
  {
    id: "horizon",
    n: "VI",
    name: "The Horizon",
    motion: "threshold",
    lightAngle: 0,
    lightStrength: 1,
    doorScale: 120,
    drift: 0,
    chapters: ["our-story", "begin", "continuation"],
  },
];

export function getAct(id: string): Act | undefined {
  return ACTS.find((a) => a.id === id);
}

export function actForChapter(chapterId: string): Act | undefined {
  return ACTS.find((a) => a.chapters.includes(chapterId));
}

export function actIndex(id: string): number {
  return ACTS.findIndex((a) => a.id === id);
}

/** Values at the start of an act = previous act's end values (or night defaults). */
export function actStartValues(index: number): Pick<
  Act,
  "lightAngle" | "lightStrength" | "doorScale" | "drift"
> {
  if (index <= 0) {
    return { lightAngle: 0, lightStrength: 0.08, doorScale: 2.5, drift: 0 };
  }
  const prev = ACTS[index - 1];
  return {
    lightAngle: prev.lightAngle,
    lightStrength: prev.lightStrength,
    doorScale: prev.doorScale,
    drift: prev.drift,
  };
}
