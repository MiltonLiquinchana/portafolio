"use client";

import { useEffect, useRef } from "react";
import type { ReactNode } from "react";

interface ScrollRevealProps {
  readonly children: ReactNode;
  readonly className?: string;
  readonly delay?: number; // ms
  readonly as?: keyof React.JSX.IntrinsicElements;
}

/**
 * Wrapper que aplica fade-in + slide-up al entrar al viewport.
 *
 * Estrategia:
 * 1. Si el navegador soporta CSS Scroll-Driven Animations, aplica la clase `scroll-reveal`
 *    (definida en globals.css) — compositor-thread, cero JS en tiempo de ejecución.
 * 2. Fallback: IntersectionObserver para Firefox y navegadores sin soporte.
 *
 * WHY: Mantener compatibilidad cross-browser sin framer-motion (sin dependencias extra).
 */
export default function ScrollReveal({
  children,
  className = "",
  delay = 0,
  as: Tag = "div",
}: ScrollRevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Feature detect: si el browser soporta CSS scroll-driven animations,
    // la clase scroll-reveal del CSS ya se encarga — no necesitamos JS.
    const supportsNative =
      typeof CSS !== "undefined" &&
      CSS.supports("(animation-timeline: view()) and (animation-range: entry)");

    if (supportsNative) return;

    // Fallback: IntersectionObserver
    const prefersReducedMotion = globalThis.matchMedia?.(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    el.classList.add("reveal-hidden");

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add("revealed");
            }, delay);
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.12 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return (
    // @ts-expect-error — dynamic tag with generic ref
    <Tag ref={ref} className={`scroll-reveal ${className}`}>
      {children}
    </Tag>
  );
}
