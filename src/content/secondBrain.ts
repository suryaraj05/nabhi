export type SecondBrainPart = {
  id: string;
  n: string;
  title: string;
  question: string;
};

export const SECOND_BRAIN_PARTS: SecondBrainPart[] = [
  { id: "what-is-this", n: "01", title: "What is this", question: "What is this?" },
  { id: "my-problem", n: "02", title: "My problem", question: "Is this my problem?" },
  { id: "what-it-does", n: "03", title: "What it does", question: "What does it do?" },
  {
    id: "how-it-works",
    n: "04",
    title: "How it works",
    question: "How does it actually work?",
  },
  {
    id: "where-data-lives",
    n: "05",
    title: "Where data lives",
    question: "Where does my data live?",
  },
  { id: "who-for", n: "06", title: "Who for", question: "Who is it for?" },
  { id: "begin", n: "07", title: "Begin", question: "How do I begin?" },
];

/** Reused from homepage Ch03 — not invented. */
export const CAPTURE_CONNECT_RECALL = [
  {
    key: "Capture",
    value: "Anything you read, hear or half-remember goes in without ceremony.",
  },
  {
    key: "Connect",
    value:
      "It finds the relationship between today's note and something you wrote a year ago.",
  },
  {
    key: "Recall",
    value: "You ask a question in plain language. It answers from your own thinking.",
  },
] as const;
