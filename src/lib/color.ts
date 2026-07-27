export type Stop = [number, [number, number, number]];

/** The sky of the site: night at the top, morning at the bottom. */
export const SKY: Stop[] = [
  [0.0, [7, 8, 10]],
  [0.18, [11, 13, 22]],
  [0.36, [20, 20, 40]],
  [0.54, [38, 32, 58]],
  [0.68, [74, 58, 72]],
  [0.74, [74, 58, 72]],
  [0.75, [212, 194, 178]],
  [0.82, [230, 216, 200]],
  [0.9, [238, 232, 220]],
  [1.0, [242, 237, 228]],
];

export const INK_DARK: [number, number, number] = [242, 237, 228];
export const INK_LIGHT: [number, number, number] = [28, 26, 23];

/** Accent deepens as the sky warms — keeps 4.5:1 on interpolated backgrounds. */
export const AMBER: Stop[] = [
  [0.0, [233, 183, 124]],
  [0.74, [233, 183, 124]],
  [0.75, [68, 40, 9]],
  [0.82, [58, 34, 8]],
  [0.9, [104, 64, 20]],
  [1.0, [128, 78, 28]],
];

export function inkAt(p: number): [number, number, number] {
  // Hard flip with the sky cliff at 0.74–0.75 — never both mid-tone.
  const inkT = clamp01((p - 0.74) / 0.01);
  return mix(INK_DARK, INK_LIGHT, inkT);
}

export function amberAt(p: number): [number, number, number] {
  return rgbAt(AMBER, p);
}

export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

export const clamp01 = (n: number) => Math.min(1, Math.max(0, n));

export function rgbAt(stops: Stop[], p: number): [number, number, number] {
  if (p <= stops[0][0]) return stops[0][1];
  for (let i = 0; i < stops.length - 1; i++) {
    const [p0, c0] = stops[i];
    const [p1, c1] = stops[i + 1];
    if (p >= p0 && p <= p1) {
      const t = (p - p0) / (p1 - p0);
      return [
        Math.round(lerp(c0[0], c1[0], t)),
        Math.round(lerp(c0[1], c1[1], t)),
        Math.round(lerp(c0[2], c1[2], t)),
      ];
    }
  }
  return stops[stops.length - 1][1];
}

export const css = (c: [number, number, number]) => `rgb(${c[0]},${c[1]},${c[2]})`;

export function mix(
  a: [number, number, number],
  b: [number, number, number],
  t: number
): [number, number, number] {
  return [
    Math.round(lerp(a[0], b[0], t)),
    Math.round(lerp(a[1], b[1], t)),
    Math.round(lerp(a[2], b[2], t)),
  ];
}
