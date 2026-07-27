type Props = {
  variant: "primary" | "interface";
  className?: string;
};

/**
 * Two lockups only.
 * primary  — lowercase serif (the brand as subject)
 * interface — uppercase mono (nav, footer, structure)
 */
export default function Wordmark({ variant, className = "" }: Props) {
  if (variant === "primary") {
    return (
      <span
        className={className}
        style={{
          fontFamily: "var(--font-serif), Georgia, serif",
          letterSpacing: "-0.02em",
          fontWeight: 400,
          textTransform: "lowercase",
        }}
      >
        nabhi
      </span>
    );
  }

  return (
    <span
      className={className}
      style={{
        fontFamily: "var(--font-mono), ui-monospace, monospace",
        letterSpacing: "0.34em",
        fontWeight: 400,
        textTransform: "uppercase",
      }}
    >
      NABHI
    </span>
  );
}
