import Image from "next/image";

type Props = {
  src?: string;
  alt: string;
  width: number;
  height: number;
  /** First/hero frame only — skips lazy loading. */
  priority?: boolean;
  className?: string;
};

/**
 * A real product screenshot, flat on the page.
 * No mockup, no tilt — directional .lit-frame shadow only (from the door).
 */
export default function ProductFrame({
  src,
  alt,
  width,
  height,
  priority = false,
  className = "",
}: Props) {
  if (!src) {
    return (
      <div
        className={`placeholder ${className}`}
        style={{
          width: "100%",
          aspectRatio: `${width} / ${height}`,
          display: "flex",
          alignItems: "center",
        }}
      >
        Placeholder — product screenshot required: {width}&times;{height}px.
        {alt ? ` (${alt})` : ""}
      </div>
    );
  }

  return (
    <div
      className={`lit-frame ${className}`}
      style={{
        width: "100%",
        border: "1px solid color-mix(in srgb, var(--ink) 12%, transparent)",
      }}
    >
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        loading={priority ? undefined : "lazy"}
        style={{ width: "100%", height: "auto", display: "block" }}
      />
    </div>
  );
}
