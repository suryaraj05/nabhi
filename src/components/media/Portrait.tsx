import Image from "next/image";

type Props = {
  src?: string;
  alt: string;
  width: number;
  height: number;
  priority?: boolean;
  className?: string;
};

/**
 * Documentary founder photography — flat, uncropped, slightly grainy.
 * No rounded corners, no circular crops.
 */
export default function Portrait({
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
        Placeholder — founder photograph required: {width}&times;{height}px.
        {alt ? ` (${alt})` : ""} Low window light, grainy, unposed.
      </div>
    );
  }

  return (
    <div
      className={`lit-frame ${className}`}
      style={{
        position: "relative",
        width: "100%",
        overflow: "hidden",
        borderRadius: 0,
      }}
    >
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        loading={priority ? undefined : "lazy"}
        style={{
          width: "100%",
          height: "auto",
          display: "block",
          borderRadius: 0,
        }}
      />
      {/* Subtle grain — documentary feel, not a filter effect */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          opacity: 0.22,
          mixBlendMode: "overlay",
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='3'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23n)' opacity='.55'/%3E%3C/svg%3E\")",
        }}
      />
    </div>
  );
}
