type Props = {
  size?: "sm" | "lg";
  className?: string;
  /** Decorative by default — hide from assistive tech. */
  decorative?: boolean;
};

/**
 * The navel. A filled circle — nothing clever inside it.
 * Large sizes get one thin concentric ring; small sizes are the dot alone.
 */
export default function Mark({
  size = "sm",
  className = "",
  decorative = true,
}: Props) {
  const withRing = size === "lg";
  // ViewBox units: dot radius 10 → ring at ~3.2× = radius 32
  const vb = withRing ? 72 : 24;
  const cx = vb / 2;
  const r = 10;
  const ringR = r * 3.2;

  return (
    <svg
      viewBox={`0 0 ${vb} ${vb}`}
      width={withRing ? 36 : 12}
      height={withRing ? 36 : 12}
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden={decorative ? true : undefined}
      role={decorative ? undefined : "img"}
      focusable="false"
    >
      <circle cx={cx} cy={cx} r={r} fill="var(--amber)" />
      {withRing ? (
        <circle
          cx={cx}
          cy={cx}
          r={ringR}
          stroke="var(--amber)"
          strokeWidth={1}
          fill="none"
          opacity={0.55}
        />
      ) : null}
    </svg>
  );
}
