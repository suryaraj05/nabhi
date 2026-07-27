/**
 * The spine of the site. Ten questions a visitor asks, in the order they ask them.
 * Every chapter answers exactly one. Nothing is here because it looks good.
 */
export const CHAPTERS = [
  { id: "arrival",       n: "01", title: "Arrival",       question: "Why should I stop here?",          emotion: "Pause" },
  { id: "philosophy",    n: "02", title: "Philosophy",    question: "What makes these people different?", emotion: "Recognition" },
  { id: "second-brain",  n: "03", title: "Second Brain",  question: "What have you actually built?",     emotion: "Belief" },
  { id: "what-we-build", n: "04", title: "What We Build", question: "Can you solve my problem?",         emotion: "Possibility" },
  { id: "intelligence",  n: "05", title: "Intelligence",  question: "Are you technically capable?",      emotion: "Trust" },
  { id: "proof",         n: "06", title: "Proof",         question: "Can I believe you?",                emotion: "Evidence" },
  { id: "why-nabhi",     n: "07", title: "Why Nabhi",     question: "Why you instead of someone else?",  emotion: "Certainty" },
  { id: "our-story",     n: "08", title: "Our Story",     question: "Who are the people behind this?",   emotion: "Connection" },
  { id: "begin",         n: "09", title: "Begin",         question: "What happens next?",                emotion: "Commitment" },
  { id: "continuation",  n: "10", title: "Continuation",  question: "",                                  emotion: "Beginning" },
] as const;

export type Chapter = (typeof CHAPTERS)[number];
