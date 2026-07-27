"use client";

import { useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { ReactLenis } from "lenis/react";

export default function SmoothScroll({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion();

  if (reduce) return <>{children}</>;

  return (
    <ReactLenis root options={{ duration: 1.15, smoothWheel: true }}>
      {children}
    </ReactLenis>
  );
}
