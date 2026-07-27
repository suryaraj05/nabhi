import type { ReactNode } from "react";
import Reveal from "./Reveal";

type Props = {
  id: string;
  n: string;
  title: string;
  question?: string;
  children: ReactNode;
  className?: string;
};

/**
 * Every chapter opens the same way: a number, a name, and the question the
 * visitor is already asking. The answer follows. That repetition is the format
 * of a conversation, so it should never vary.
 */
export default function Chapter({ id, n, title, question, children, className = "" }: Props) {
  return (
    <section id={id} data-chapter={`${n} — ${title}`} className={`relative gut ${className}`}>
      <div className="shell">
        {question ? (
          <Reveal className="mb-[clamp(46px,9vh,120px)]">
            <p className="label mb-5">
              {n} — {title}
            </p>
            <p className="question">{question}</p>
          </Reveal>
        ) : null}
        {children}
      </div>
    </section>
  );
}
