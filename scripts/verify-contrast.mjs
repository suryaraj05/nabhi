/**
 * Samples bg/ink (and muted text stops) at 100 scroll points.
 * Fails if any contrast ratio drops below 4.5:1.
 *
 * Run: npm run verify:contrast
 */

const SKY = [
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

const INK_DARK = [242, 237, 228];
const INK_LIGHT = [28, 26, 23];
const MIN_RATIO = 4.5;
const SAMPLES = 100;

const lerp = (a, b, t) => a + (b - a) * t;
const clamp01 = (n) => Math.min(1, Math.max(0, n));

function rgbAt(stops, p) {
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

function mix(a, b, t) {
  return [
    Math.round(lerp(a[0], b[0], t)),
    Math.round(lerp(a[1], b[1], t)),
    Math.round(lerp(a[2], b[2], t)),
  ];
}

function luminance([r, g, b]) {
  const [rs, gs, bs] = [r, g, b].map((v) => {
    const c = v / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

function contrast(fg, bg) {
  const l1 = luminance(fg);
  const l2 = luminance(bg);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

const AMBER = [
  [0.0, [233, 183, 124]],
  [0.74, [233, 183, 124]],
  [0.75, [68, 40, 9]],
  [0.82, [58, 34, 8]],
  [0.9, [104, 64, 20]],
  [1.0, [128, 78, 28]],
];

function inkAt(p) {
  const inkT = clamp01((p - 0.74) / 0.01);
  return mix(INK_DARK, INK_LIGHT, inkT);
}

function amberAt(p) {
  return rgbAt(AMBER, p);
}

/** color-mix(ink X%, transparent) over solid bg */
function mutedInk(ink, bg, inkPercent) {
  return mix(ink, bg, 1 - inkPercent / 100);
}

const checks = [
  { name: "body (--ink)", inkPct: 100 },
  { name: ".lede (85% ink)", inkPct: 85 },
  { name: ".question (76% ink)", inkPct: 76 },
  { name: ".label (72% ink)", inkPct: 72 },
  { name: ".placeholder (70% ink)", inkPct: 70 },
];

let worst = { ratio: Infinity, p: 0, check: "" };

for (let i = 0; i <= SAMPLES; i++) {
  const p = i / SAMPLES;
  const bg = rgbAt(SKY, p);
  const ink = inkAt(p);
  const amber = amberAt(p);

  for (const { name, inkPct } of checks) {
    const fg = mutedInk(ink, bg, inkPct);
    const ratio = contrast(fg, bg);
    if (ratio < worst.ratio) worst = { ratio, p, check: name };
  }

  const amberRatio = contrast(amber, bg);
  if (amberRatio < worst.ratio) {
    worst = { ratio: amberRatio, p, check: ".accent (--amber)" };
  }

  // Inverted CTA: --bg text on --ink background
  const ctaRatio = contrast(bg, ink);
  if (ctaRatio < worst.ratio) {
    worst = { ratio: ctaRatio, p, check: ".cta-primary (bg on ink)" };
  }
}

console.log(`Contrast audit (${SAMPLES + 1} samples, minimum required ${MIN_RATIO}:1)`);
console.log(
  `Worst: ${worst.ratio.toFixed(2)}:1 at progress ${worst.p.toFixed(2)} (${worst.check})`
);

if (worst.ratio < MIN_RATIO) {
  console.error("\nFAIL — adjust stops in src/lib/color.ts");
  process.exit(1);
}

console.log("\nPASS — all sampled points meet WCAG AA (4.5:1)");
