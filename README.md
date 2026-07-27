# Nabhi

Not a sitemap. A conversation.

The site is ten chapters, and each one answers exactly one question the visitor is
already asking. The whole thing sits inside a single continuous sunrise: it begins in
darkness and ends in morning light, driven by scroll progress rather than time —
because understanding grows, it doesn't elapse.

## Run it

```bash
npm install
npm run dev
```

Open http://localhost:3000

## The ten chapters

| # | Chapter | The visitor asks | Emotion | Light |
| --- | --- | --- | --- | --- |
| 01 | Arrival | Why should I stop here? | Pause | deepest night |
| 02 | Philosophy | What makes these people different? | Recognition | night |
| 03 | Second Brain | What have you actually built? | Belief | deep indigo |
| 04 | What We Build | Can you solve my problem? | Possibility | indigo |
| 05 | Intelligence | Are you technically capable? | Trust | violet, horizon appears |
| 06 | Proof | Can I believe you? | Evidence | pre-dawn warmth |
| 07 | Why Nabhi | Why you instead of someone else? | Certainty | first light |
| 08 | Our Story | Who are the people behind this? | Connection | dawn breaks, text inverts |
| 09 | Begin | What happens next? | Commitment | morning |
| 10 | Continuation | — | Beginning | full morning |

Arrival is the only chapter that doesn't print its question on screen. The visitor
hasn't finished forming it yet — the hero answers it before they can ask. Every other
chapter opens with the same three beats: number, name, question. That repetition *is*
the format of a conversation, so it should never vary.

## Where things live

| Piece | File |
| --- | --- |
| Chapter list, questions, emotions | `src/lib/chapters.ts` |
| The chapter opening (number / name / question) | `src/components/ui/Chapter.tsx` |
| The sunrise | `src/components/Atmosphere.tsx` |
| Colour stops for night → morning | `src/lib/color.ts` |
| Where-am-I marker, bottom left | `src/components/ChapterIndicator.tsx` |
| The single motion primitive | `src/components/ui/Reveal.tsx` |
| Smooth scroll | `src/components/SmoothScroll.tsx` |
| Opening sequence | `src/components/Preloader.tsx` |
| Chapters | `src/components/sections/Ch01…Ch10` |

## Two moments that carry weight

- **03 · Second Brain** — a constellation of scattered nodes wires itself together as you
  scroll. Stand-in for real product imagery.
- **05 · Intelligence** — 240 scattered points resolve into one ring. Complexity becoming
  clarity, argued without a single buzzword.

## What still needs you

Every placeholder is visibly boxed on the page (dashed border, `.placeholder` in
`globals.css`). Delete the class as you fill each one in.

- Second Brain product screenshots or a screen recording
- Real case-study copy and links for the five projects
- The true account of how the four founders met, with names and roles
- Form endpoint in `Ch09Begin.tsx` — it currently only updates the screen
- Calendly or booking link, and `hello@nabhi.com`

## Notes

- Fonts are Instrument Serif / Inter / JetBrains Mono via `next/font`. Swap in
  `src/app/layout.tsx`.
- No imagery is used anywhere. The atmosphere carries the site, so photography can be
  added later without disturbing the structure.
- Every animation is scroll-linked or once-only. Only the grain, the ripples and the
  breathing centre point loop — all respect `prefers-reduced-motion`.
