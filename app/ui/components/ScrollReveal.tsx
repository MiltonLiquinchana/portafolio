"use client";

import { useEffect, useRef } from "react";
import type { ReactNode } from "react";

// =============================================================================
// TYPES & INTERFACES
// =============================================================================

/**
 * Propiedades del componente ScrollReveal
 */
interface ScrollRevealProps {
    readonly children: ReactNode;                       // Nodos React envueltos para la animación
    readonly className?: string;                        // Clases CSS adicionales opcionales
    readonly delay?: number;                            // Retardo en milisegundos
    readonly as?: keyof React.JSX.IntrinsicElements;   // Tag HTML dinámico
}

// =============================================================================
// COMPONENT
// =============================================================================

/**
 * Componente ScrollReveal
 * 
 * Wrapper que aplica fade-in + slide-up al entrar los elementos al viewport.
 * 
 * CARACTERÍSTICAS:
 * - Detección nativa CSS: Si el navegador soporta scroll-driven animations, usa CSS puro sin costo de JS.
 * - Fallback IntersectionObserver: Soporte para navegadores legacy o Firefox.
 * - Accesibilidad: Respeta las preferencias de movimiento reducido (`prefers-reduced-motion`).
 * 
 * @param {ScrollRevealProps} props - Propiedades del componente
 * @returns {JSX.Element} Wrapper animado dinámico.
 */
export default function ScrollReveal({
    children,
    className = "",
    delay = 0,
    as: Tag = "div",
}: Readonly<ScrollRevealProps>) {
    const ref = useRef<HTMLElement>(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        // Detección de soporte nativo CSS scroll-driven animations
        const supportsNative =
            typeof CSS !== "undefined" &&
            CSS.supports("(animation-timeline: view()) and (animation-range: entry)");

        if (supportsNative) return;

        // Respeta preferencia de movimiento reducido del sistema operativo
        const prefersReducedMotion = globalThis.matchMedia?.(
            "(prefers-reduced-motion: reduce)"
        ).matches;

        if (prefersReducedMotion) return;

        el.classList.add("reveal-hidden");

        // Configuración de IntersectionObserver para navegadores sin soporte nativo
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
        // @ts-expect-error — tag dinámico con ref genérica
        <Tag ref={ref} className={`scroll-reveal ${className}`}>
            {children}
        </Tag>
    );
}
