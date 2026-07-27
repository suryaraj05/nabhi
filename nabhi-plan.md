# Nabhi — Design & Build Plan

*Version 1.0 · Locked before a single screen is designed.*

---

## 0 · The rule everything answers to

> **Does this make the world a little easier to understand?**

Applied literally. Every chapter, every image, every animation, every line of copy gets
asked this question. If the answer is no, it doesn't ship. This document exists so that
question can be asked *before* the work, not after.

Three decisions were locked before planning:

| Decision | Choice |
| --- | --- |
| Visual register | Quiet open, one vista late |
| Structure | One scroll (home) + deeper pages |
| Brand | Nothing exists — proposed here |
| Content | Almost nothing ready — placeholders planned for |

---

# PART ONE — THE BRAND SYSTEM

Nothing exists yet, so this is a proposal. It is deliberately small. A studio whose thesis
is restraint should not arrive with a large identity.

## 1.1 The mark

**A single filled circle.** The navel. The centre from which everything grows.

At large sizes it may carry one concentric ring, drawn thin, sitting far out — the first
ripple. At small sizes (favicon, nav, 16px) the ring drops away and it is simply a dot.

This is close to the least amount of logo it is possible to have, which is the argument.
A company that says *the best design doesn't impress, it clarifies* cannot show up with a
mark that impresses.

```
Primary        ◯ with one wide concentric ring, amber on dark
Compact        ● solid dot
Favicon        ● solid dot, amber on near-black
```

**Do not:** add a swoosh, a gradient, a hexagon, a brain, a spiral, or letterforms inside
the circle. The moment it becomes clever it stops being a centre and becomes a logo.

## 1.2 The wordmark

Two lockups, no others.

| Lockup | Use | Setting |
| --- | --- | --- |
| **Primary** | Hero, printed matter, anywhere it is the subject | `nabhi` — lowercase, display serif, letterspacing −0.02em |
| **Interface** | Nav, footer, chapter markers, favicon pairing | `NABHI` — uppercase, mono, letterspacing 0.34em |

Lowercase for the brand, uppercase-mono for the machine. The site already uses this split:
serif carries meaning, mono carries structure.

## 1.3 Typography

| Role | Face | Notes |
| --- | --- | --- |
| Display | **Instrument Serif** | Free, Google. High contrast, warm, slightly literary. Carries every statement and every visitor question (in italic). |
| Body | **Inter**, weight 300 | Free. Light weight only — 400 and above read as corporate at these sizes. |
| Structure | **JetBrains Mono**, 400 | Chapter numbers, labels, CTAs, metadata. |

**Upgrade path if budget appears:** swap the display face for a licensed serif with more
personality in the italic — GT Sectra, Canela, or Editorial New. The system is built on
CSS variables, so this is a one-line change in `layout.tsx`. Do not swap the body face;
Inter at 300 is genuinely correct here.

**Scale** (fluid, all `clamp()`):

```
display      clamp(2.6rem,  7.4vw, 7.4rem)   line-height 1.02
display-sm   clamp(1.9rem,  4.2vw, 3.9rem)   line-height 1.14
question     clamp(1.25rem, 2.4vw, 1.9rem)   italic serif
lede         clamp(1.02rem, 1.55vw, 1.36rem) max-width 38ch
body         0.95–0.98rem                    max-width 34–38ch
label        10.5px mono, tracking 0.3em, uppercase
```

Measure never exceeds 38ch. Ever. Long lines are the single most common way a site stops
being readable while still looking designed.

## 1.4 Colour — the sunrise as a token system

There is no palette. There is one continuous light, sampled by scroll position.

| Stop | Progress | Hex | Where it lands |
| --- | --- | --- | --- |
| Night | 0.00 | `#07080A` | Arrival |
| Deep night | 0.18 | `#0B0D16` | Philosophy |
| Indigo | 0.36 | `#141428` | Second Brain |
| Violet | 0.54 | `#26203A` | What We Build / Intelligence |
| First warmth | 0.68 | `#4A3A48` | Proof |
| Dawn | 0.80 | `#8A6B62` | Why Nabhi |
| Morning | 0.90 | `#D9C3A8` | Our Story |
| Full light | 1.00 | `#F2EDE4` | Begin / Continuation |

**Ink** interpolates `#F2EDE4 → #1C1A17` between progress 0.74 and 0.86 — the text
inverts exactly as dawn breaks, during Our Story. That timing is intentional: the site
becomes human and legible in the same moment.

**Accent** — amber, and only amber. `#E9B77C` on dark, deepening to `#B2712F` once the
background passes 50% lightness so it stays legible. One accent colour for the entire
brand. No secondary, no success-green, no error-red beyond form validation.

> **Risk flagged:** interpolated colour means contrast changes continuously. Every text
> style must clear 4.5:1 at *every* scroll position, not just at the stops. This needs a
> dedicated verification pass (Phase 7) — it is the most likely place this design fails an
> audit.

## 1.5 Motion principles

1. **Nothing bounces.** Easing is `cubic-bezier(0.16, 1, 0.3, 1)` or `power3.out`. No
   spring, no overshoot, no elastic.
2. **Nothing is fast.** Reveal duration floor is 1.2s. If it feels slow in isolation it is
   probably right in context.
3. **Everything is scroll-linked or once-only.** Only three things loop: film grain, the
   navel ripples, and the breathing centre point.
4. **One primitive.** All reveals use the same component with the same easing. Variety in
   motion reads as indecision.
5. **`prefers-reduced-motion` is honoured everywhere**, not as an afterthought.
6. **Every animation must answer the north star question.** Motion that only delights gets
   cut.

## 1.6 Voice

**Rules:**

- Short declaratives. Line breaks used as punctuation.
- Never name a technology before naming a capability. *"We build systems that remember"*
  precedes any mention of retrieval.
- The first sentence after a chapter question must answer that question. No throat-clearing.
- Second person for the visitor's problem, first person plural for us. Never third person
  about ourselves ("Nabhi delivers…").

**Banned words:** cutting-edge, leverage, solutions, seamless, empower, revolutionise,
best-in-class, transform (as a verb), unlock, supercharge, game-changing, robust,
end-to-end *as a filler*, journey (unless literal).

---

# PART TWO — THE ARCHITECTURE

## 2.1 Sitemap

```
/                              Home — the ten-chapter conversation
│
├── /second-brain              Flagship product (its own seven-part conversation)
│
├── /work/second-brain         Case study
├── /work/tighthug             Case study
├── /work/prestalux-monaco     Case study
├── /work/parcelhorse          Case study
├── /work/bharatmart           Case study
│
├── /privacy
└── /terms
```

**No `/work` index page.** Chapter 06 on home *is* the index. Building a separate listing
page would duplicate it and give the visitor two doors to the same room.

**No `/about` page.** Chapter 08 is the about page. Pulling it out of the conversation
would break the sequence.

**No `/contact` page.** Chapter 09 is contact. Same reason.

This is the discipline the whole plan rests on: home is not a summary of deeper pages.
Home is the argument. Deeper pages are evidence for people who want it.

## 2.2 How depth works

Every deeper page is reached from exactly one place, and every deeper page returns to the
conversation rather than dead-ending:

```
Home Ch03 ──→ /second-brain ──→ back to Home Ch09 (Begin)
Home Ch06 ──→ /work/[slug]  ──→ next case study ──→ back to Home Ch09
```

Case studies chain to each other. A visitor who reads three of them arrives at Begin
already convinced, which is the entire point of the ordering.

---

# PART THREE — HOME, CHAPTER BY CHAPTER

Each chapter opens identically: **number → name → the visitor's question**, in italic serif
against a thin amber rule. Then the answer. The repetition *is* the format of a
conversation; it never varies.

**One exception:** Chapter 01 does not print its question. The visitor hasn't finished
forming it yet.

---

### 01 · ARRIVAL — *Why should I stop here?*

| | |
| --- | --- |
| **Light** | `#07080A` — deepest night |
| **Emotion** | Noise → Pause |
| **Imagery** | None. Type and light only. |
| **Height** | 100vh |

**Content**

- Wordmark, small, top of the composition
- Headline, four lines, arriving one at a time:
  *The world doesn't need more technology. It needs more **understanding**.*
- One supporting paragraph, ≤ 38ch measure
- Primary CTA — *Let's understand your problem* → `#begin`
- Secondary CTA — *See what we've built* → `#second-brain`
- Trust line, mono, small — founder-led, industries shipped in
- Scroll cue

**Motion** — preloader resolves into a single point of light; headline lines rise in at
0.13s stagger; everything else fades. Hero drifts up and dims on scroll rather than
scrolling away.

**Forbidden here:** feature lists, service names, logos of tools, any image.

---

### 02 · PHILOSOPHY — *What makes these people different?*

| | |
| --- | --- |
| **Light** | `#0B0D16` |
| **Emotion** | Curiosity → Recognition |
| **Imagery** | Generative only — the navel ripples |
| **Height** | ~2.5 screens |

**Content**

1. The navel — concentric ripples from a breathing centre point, with *Nabhi means the
   navel* centred inside them
2. Two-column: what the name means, why a beginning rather than a technology
3. Full-width statement: *Before intelligence comes **understanding**.*
4. **What we refuse to do** — four rules, listed plainly:
   - We don't sell technology to people who haven't been listened to.
   - We don't ship complexity and call it capability.
   - We don't build things that make people dependent on us.
   - We don't start a project we don't understand.

The refusals are the most important block on the page. Anyone can claim values; refusals
cost something, which is why visitors believe them.

---

### 03 · SECOND BRAIN — *Okay, but what have you actually built?*

| | |
| --- | --- |
| **Light** | `#141428` — indigo |
| **Emotion** | Belief |
| **Imagery** | **First real image of the site** — actual product UI, flat, uncropped, no device mockup |
| **Height** | ~2 screens |

**Content**

- Statement: *A system that **remembers** for you.*
- The problem / the transformation, two columns
- The constellation — scattered nodes wiring themselves together as you scroll (holds the
  visual until real screens exist, then sits alongside them)
- Capture · Connect · Recall, three columns
- CTA → `/second-brain`

**Image rule:** the product screenshot sits **flat on the page**. No perspective tilt, no
floating laptop, no gradient behind it. A tilted MacBook render says *we're selling this*.
A flat crop says *this exists, look at it*.

---

### 04 · WHAT WE BUILD — *Can they solve my problem?*

| | |
| --- | --- |
| **Light** | `#1E1B33` |
| **Emotion** | Possibility |
| **Imagery** | None |
| **Height** | ~2 screens |

**Content** — statement *Different industries. One **philosophy**.*, then six rows:

| | Service | The line under it is about the constraint, not the tech |
| --- | --- | --- |
| 01 | AI Products | trusted rather than demonstrated |
| 02 | Hospital Systems | the ten seconds a nurse has |
| 03 | Healthcare Websites | arrive frightened, leave informed |
| 04 | E-commerce | the decision a buyer is actually making |
| 05 | Full Stack Applications | database to last pixel |
| 06 | Custom Software | the problem without a category |

Rows, not cards. Cards imply a menu you pick from; rows imply a list of things that are
true.

---

### 05 · INTELLIGENCE — *Are they technically capable?*

| | |
| --- | --- |
| **Light** | `#26203A` — violet. **The horizon line appears here.** |
| **Emotion** | Trust |
| **Imagery** | Generative — the convergence canvas |
| **Height** | ~3 screens (pinned canvas + rows) |

**Content**

- Pinned: 240 scattered points resolving into a single ring as you scroll. Statement
  centred over it: *We use complexity to create **simplicity**.*
- Then three capabilities, described as behaviour:
  - We build systems that **remember**.
  - We build systems that **listen**.
  - We build systems that **reason**.
- Closing note: architecture available on request, never volunteered first

**The rule this chapter exists to demonstrate:** never name RAG, LLMs, vector databases or
agent frameworks on this page. Describe what a system *does*. Technical readers recognise
the capability instantly; non-technical readers aren't excluded.

---

### 06 · PROOF — *Can I believe them?*

| | |
| --- | --- |
| **Light** | `#4A3A48` — first warmth |
| **Emotion** | Evidence |
| **Imagery** | **Five real project screens**, one per row |
| **Height** | ~3 screens |

**Content** — statement *The work, and **nothing else**.*, then five rows. Each row:
project name, one metadata line, one sentence of story, one real image, link to the case
study.

One sentence per project is deliberate. The sentence's job is to make you click, not to
summarise.

> **Highest-risk content in the plan.** The five one-liners currently in the build are
> inferences, not facts. Proof is where a sceptical visitor decides. These five sentences
> and five screenshots are the single most valuable thing to get right.

---

### 07 · WHY NABHI — *Why choose them over someone else?*

| | |
| --- | --- |
| **Light** | `#8A6B62` — dawn |
| **Emotion** | Certainty |
| **Imagery** | None. Deliberate silence before the human chapter. |
| **Height** | ~2 screens |

**Content** — statement *Because of how we **think** — not just what we build.*, then five
reasons in a two-column grid: Founder-led · End-to-end ownership · AI-first · Product
thinking · Global collaboration.

---

### 08 · OUR STORY — *Who are the people behind this?*

| | |
| --- | --- |
| **Light** | `#D9C3A8` → **the text inverts to dark here** |
| **Emotion** | Connection |
| **Imagery** | **The four founders. Real faces.** |
| **Height** | ~2 screens |

**Content** — statement *Four people who kept meeting the same **problem**.* Then prose,
not a timeline: where you came from, what you kept watching happen, why the order felt
wrong, what you want to change.

**Photography direction:** low window light, grainy, nobody looking at the camera, caught
mid-thought rather than posed. A phone in real light beats a studio shoot, because polish
reads as distance and this chapter's whole job is closing distance.

**Never:** headshots on white, arms folded, a boardroom, matching shirts.

---

### 09 · BEGIN — *How do I work with them?*

| | |
| --- | --- |
| **Light** | `#F2EDE4` — full morning |
| **Emotion** | Commitment |
| **Imagery** | None |
| **Height** | ~1.5 screens |

**Content**

- Statement: *Let's understand your **problem**.*
- Three fields only: name, email, *what has become too complicated?*
- Alongside: email, booking link, and the honest line — *if we're not the right people for
  your problem, we'll tell you that too*

Three fields. Every additional field measurably reduces submissions, and a company that
opens with a form asking for budget range and company size has already contradicted its
own philosophy.

---

### 10 · CONTINUATION — *(no question)*

| | |
| --- | --- |
| **Light** | `#F2EDE4` |
| **Emotion** | Beginning |
| **Imagery** | **THE VISTA — the only cinematic image on the site** |
| **Height** | ~1.5 screens |

Not a footer. The world doesn't end; it continues past the screen.

**Content** — closing statement, the vista, then quiet navigation, wordmark, legal links.

**The vista, specified:**

- Wide, warm, first light. Sky and land.
- **No laptop.** If a figure appears at all they are very small and completely still,
  looking at the light. A person hunched over a glowing screen puts technology in the
  foreground, which contradicts the entire brief. A person simply sitting is the brand in
  one frame.
- **Layered, not video.** Four to five transparent WebP layers (deep sky, far cloud, near
  cloud, land, foreground haze) moved at different rates on scroll. The camera move comes
  free from parallax. Target ≤ 400KB total versus 5–8MB for an mp4.
- Tinted by the same scroll variable that drives the whole sunrise, so the colours resolve
  into the site rather than sitting on top of it.

**Why last and not first:** a site that gives you its most beautiful image at the very end
is doing something almost nobody does — and it fits *Arrival = pause* far better than
opening at full volume. The brief says explicitly: *the feeling we want isn't excitement,
it isn't hype, it isn't wow.*

---

# PART FOUR — DEEPER PAGES

## 4.1 `/second-brain`

The product gets its own conversation, seven parts, same grammar as home. It runs its own
shorter light cycle — starting at indigo (where Chapter 03 left off) and ending in morning
— so it feels like a continuation rather than a new site.

| # | Question | Content |
| --- | --- | --- |
| 01 | What is this? | One screen, one sentence, one real full-bleed UI shot |
| 02 | Is this my problem? | The scattered-knowledge problem in the visitor's own life |
| 03 | What does it do? | Capture · Connect · Recall, each with a real screen |
| 04 | How does it actually work? | Honest and restrained. Technical readers get depth here — this is the one page where naming the architecture is allowed, because they came looking for it. |
| 05 | Where does my data live? | **Non-negotiable.** A knowledge product that doesn't answer this loses the exact audience it wants. |
| 06 | Who is it for? | Two or three honest portraits, plus who it is *not* for |
| 07 | Begin | Waitlist or access, single field |

## 4.2 `/work/[slug]` — one template, five instances

| Section | Content |
| --- | --- |
| Opening | Project name, one line, one full-bleed real screen |
| *What was actually wrong?* | What the client said, and what turned out to be true underneath. These are rarely the same, and the gap is the story. |
| *What we understood* | The insight. The reason the eventual build was obvious. |
| *What we built* | Restrained. Screens, not feature lists. |
| *What changed* | Numbers if they exist; honest qualitative outcome if they don't. Never invent a metric. |
| Continuation | Next case study, then Begin |

The template's spine is *problem understood before problem solved*, so every case study
re-proves the philosophy without ever restating it.

---

# PART FIVE — THE IMAGE SYSTEM

**The rule: abstraction in the dark, literalness in the light.** Image honesty increases as
the sun comes up. Early chapters have nothing because you haven't earned the right to show
yourself yet; by morning the visitor trusts you enough for real faces and real screens.

| Chapter | Light | Image |
| --- | --- | --- |
| 01 Arrival | night | — |
| 02 Philosophy | night | generative only |
| 03 Second Brain | indigo | **real product UI** |
| 04 What We Build | indigo | — |
| 05 Intelligence | violet | generative only |
| 06 Proof | pre-dawn | **five real project screens** |
| 07 Why Nabhi | first light | — |
| 08 Our Story | dawn | **real founder photography** |
| 09 Begin | morning | — |
| 10 Continuation | morning | **the vista** |

Four image moments across ten chapters. The restraint communicates the philosophy faster
than any of the copy does.

**Three permitted sources, no others:**

1. **Product truth** — real interfaces, flat, full resolution, no mockups
2. **Documentary human** — real people, real light, unposed, grainy
3. **Generative** — computed from something real (the constellation, the convergence), never decorative

**Explicitly forbidden:** 3D gradient blobs, glowing neural meshes, wireframe brains,
abstract AI orbs, floating device mockups, stock photography of any kind, and any image of
a person looking at a screen.

---

# PART SIX — TECHNICAL

## 6.1 Stack

| Layer | Choice | Why |
| --- | --- | --- |
| Framework | Next.js 15, App Router, TypeScript | Static export for everything; case studies benefit from real routes and metadata |
| Styling | Tailwind + CSS custom properties | The sunrise lives in CSS variables; Tailwind never touches colour directly |
| Motion | Framer Motion | `useScroll` drives the whole light system |
| Smooth scroll | Lenis | |
| Content | Typed TS/MDX under `/content` | No CMS at launch. Five case studies do not justify Sanity. Add it only when someone who isn't a developer needs to publish. |
| Forms | Route handler → Resend | Owns the reply address, no third-party branding |
| Analytics | Plausible | Privacy-respecting, no cookie banner — a cookie banner would contradict the brand on first contact |
| Hosting | Vercel | |
| Fonts | `next/font`, self-hosted | No layout shift, no Google request |

## 6.2 Budgets

| Metric | Target |
| --- | --- |
| LCP | < 2.0s on 4G |
| First-load JS | < 180KB |
| Home total weight | < 1.2MB including the vista |
| Vista layers | ≤ 400KB combined |
| Lighthouse performance | ≥ 95 |
| Lighthouse accessibility | 100 |

## 6.3 Accessibility

- `prefers-reduced-motion` disables grain, ripples, breathing, parallax, and reduces the
  preloader to a fade
- **Contrast verified at every scroll position**, not just at colour stops — dedicated pass
- Full keyboard navigation, visible focus states in amber, skip-to-content link
- Chapter indicator is `aria-hidden` — decorative
- The canvas and constellation are `aria-hidden` with the meaning carried in adjacent text
- Form labels are real `<label>` elements, errors announced

## 6.4 SEO & sharing

- Per-page metadata; the ten chapters give home a genuinely rich `h2` structure
- OG images: one per page, generated from the sunrise palette — dark, type-only, no logo soup
- `Organization` and `WebSite` JSON-LD on home, `CreativeWork` on case studies
- Sitemap, robots, canonical URLs

---

# PART SEVEN — WHAT YOU NEED TO SUPPLY

Ordered by how much each one blocks. Everything here has a visible dashed placeholder in
the build until it arrives.

| Priority | Item | Blocks |
| --- | --- | --- |
| **1** | Five project one-liners + what actually went wrong in each | Ch06, all five case studies |
| **2** | Second Brain screenshots (5–8, full resolution) | Ch03, `/second-brain` |
| **3** | Project screenshots, 1–3 each | Ch06, case studies |
| **4** | Founder names, roles, and the true story of how you met | Ch08 |
| **5** | Founder photographs (phone, window light, unposed) | Ch08 |
| **6** | Where Second Brain data lives — the honest answer | `/second-brain` 05 |
| **7** | Domain, email address, booking link | Ch09 |
| **8** | The vista source image | Ch10 |
| **9** | Privacy policy and terms | Legal |

**On the vista:** generate or commission a single wide frame, then cut it into 4–5 layers
in Photoshop and export each as WebP with alpha. I can specify the exact layer breakdown
and export settings when we get there.

---

# PART EIGHT — BUILD SEQUENCE

Built in one pass, but in this order — each phase depends on the one above it.

| Phase | Work | Output |
| --- | --- | --- |
| **0** | Lock brand: mark, wordmark, type, colour stops | Design tokens |
| **1** | System: tokens, type scale, motion primitive, layout shell, atmosphere engine | Nothing visible, everything depends on it |
| **2** | Home, all ten chapters, with placeholders | The full conversation, walkable |
| **3** | `/second-brain`, seven parts | |
| **4** | Case study template + five instances | |
| **5** | The vista — layer cutting, parallax, tinting | |
| **6** | Forms, email, analytics, SEO, OG images, legal | |
| **7** | Accessibility + performance pass, **contrast verification at every scroll position** | Ship-ready |

Phases 2–4 are where content placeholders get replaced as your material arrives. Nothing
in phases 5–7 depends on content, so they can proceed in parallel with you writing.

---

# PART NINE — OPEN DECISIONS

Things I've made a call on that are genuinely reversible. Worth a look before Phase 0.

1. **Chapter 01 doesn't show its question.** Every other chapter does. One line to change
   if you'd rather it be uniform.
2. **Amber as the only accent.** A second accent would give case studies room to feel
   distinct from each other. I'd resist it, but it's a real option.
3. **Lowercase `nabhi` as the primary wordmark.** Uppercase would read more established and
   less intimate. This is a positioning choice more than a design one.
4. **No CMS.** Correct today, wrong the moment a non-developer needs to publish a case
   study. Worth deciding now whether that day is coming.
5. **The scroll is long** — roughly 20 screens on home. Deliberate, and tunable per chapter
   without touching the structure.
6. **Second Brain appears twice** — as Chapter 03 and as a case study in Chapter 06. That
   repetition may be a feature (product *and* proof) or may feel redundant. Worth a look
   once it's real.

---

*Nothing in this document is difficult to change. The point of writing it down is that we
change it here, where it costs a sentence, rather than in the build, where it costs a week.*
