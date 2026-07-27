/**
 * Samples bg/ink (and muted text) at 100 scroll points, including door-glow
 * contribution behind text. Fails if any contrast drops below 4.5:1.
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

/** Mirror of acts.ts end-values across page progress (Act V deliberately longer). */
const SPATIAL = [
  { p: 0.0, doorScale: 2.2, lightStrength: 0.06 },
  { p: 0.16, doorScale: 3.5, lightStrength: 0.12 },
  { p: 0.28, doorScale: 5.5, lightStrength: 0.28 },
  { p: 0.38, doorScale: 10, lightStrength: 0.38 },
  { p: 0.48, doorScale: 32, lightStrength: 0.62 },
  { p: 0.72, doorScale: 72, lightStrength: 0.92 },
  { p: 1.0, doorScale: 120, lightStrength: 1 },
];

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

function spatialAt(p) {
  if (p <= SPATIAL[0].p) return SPATIAL[0];
  for (let i = 0; i < SPATIAL.length - 1; i++) {
    const a = SPATIAL[i];
    const b = SPATIAL[i + 1];
    if (p >= a.p && p <= b.p) {
      const t = (p - a.p) / (b.p - a.p);
      return {
        doorScale: lerp(a.doorScale, b.doorScale, t),
        lightStrength: lerp(a.lightStrength, b.lightStrength, t),
      };
    }
  }
  return SPATIAL[SPATIAL.length - 1];
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

function mutedInk(ink, bg, inkPercent) {
  return mix(ink, bg, 1 - inkPercent / 100);
}

/**
 * Effective background when text sits over the door centre.
 * Glow alpha capped at 0.30 through Acts I–V; lifts only after threshold.
 */
function bgWithDoorGlow(bg, amber, p) {
  const { doorScale, lightStrength } = spatialAt(p);
  const thresholdT = clamp01((doorScale - 72) / 48);
  const glowCap = thresholdT > 0.25 ? 0.35 : 0.1;
  // Door opacity is (1 - threshold-t); glow gone once the arch has opened
  const doorPresence = clamp01(1 - thresholdT / 0.35);
  const mixAmt = glowCap * doorPresence;
  return mix(bg, amber, mixAmt);
}

const checks = [
  { name: "body (--ink)", inkPct: 100 },
  { name: ".lede (85% ink)", inkPct: 85 },
  { name: ".question (76% ink)", inkPct: 76 },
  { name: ".label (72% ink)", inkPct: 72 },
  { name: ".placeholder (70% ink)", inkPct: 70 },
];

let worst = { ratio: Infinity, p: 0, check: "" };

function consider(ratio, p, check) {
  if (ratio < worst.ratio) worst = { ratio, p, check };
}

for (let i = 0; i <= SAMPLES; i++) {
  const p = i / SAMPLES;
  const bg = rgbAt(SKY, p);
  const ink = inkAt(p);
  const amber = amberAt(p);
  const doorBg = bgWithDoorGlow(bg, amber, p);

  for (const { name, inkPct } of checks) {
    const fg = mutedInk(ink, bg, inkPct);
    consider(contrast(fg, bg), p, name);
    // Text over door glow (worst-case mid-corridor)
    const fgDoor = mutedInk(ink, doorBg, inkPct);
    consider(contrast(fgDoor, doorBg), p, `${name} + door glow`);
  }

  consider(contrast(amber, bg), p, ".accent (--amber)");
  consider(contrast(amber, doorBg), p, ".accent + door glow");
  consider(contrast(bg, ink), p, ".cta-primary (bg on ink)");
}

console.log(`Contrast audit (${SAMPLES + 1} samples, incl. door glow, min ${MIN_RATIO}:1)`);
console.log(
  `Worst: ${worst.ratio.toFixed(2)}:1 at progress ${worst.p.toFixed(2)} (${worst.check})`
);

if (worst.ratio < MIN_RATIO) {
  console.error("\nFAIL — adjust stops in src/lib/color.ts or lower door glow cap");
  process.exit(1);
}

console.log("\nPASS — all sampled points meet WCAG AA (4.5:1)");
