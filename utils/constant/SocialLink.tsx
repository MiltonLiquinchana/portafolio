import type { ReactNode } from "react";

/**
 * Interface para la definición de enlaces a redes o medios de contacto
 */
interface SocialLink {
    label: string;          // Etiqueta descriptiva (ej. "Email", "Teléfono")
    href: string;           // URI o enlace de contacto
    value: string;          // Valor visible para el usuario
    icon: ReactNode;        // Elemento SVG para el icono
    accent: string;         // Color de acento para la tarjeta visual
}

/**
 * Lista de enlaces sociales y medios de contacto directo
 */
export const SOCIAL_LINKS: SocialLink[] = [
    {
        label: "Email",
        href: "mailto:100070nfelipe@gmail.com",
        value: "100070nfelipe@gmail.com",
        icon: (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <rect x="2" y="4" width="16" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" />
                <path d="M2 7l8 5 8-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
        ),
        accent: "#00d4b4",
    },
    {
        label: "Teléfono",
        href: "tel:+593995883099",
        value: "0995883099",
        icon: (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <path d="M5.2 3.5 7.5 3l1.2 3-1.5 1.2a10.5 10.5 0 0 0 5.6 5.6L14 11.3l3 1.2-.5 2.3c-.2.9-1.1 1.5-2 1.3A12.5 12.5 0 0 1 4 5.5c-.2-.9.3-1.8 1.2-2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        ),
        accent: "#3b82f6",
    },
];
