"use client";

import ScrollReveal from "./ScrollReveal";

// =============================================================================
// TYPES & INTERFACES
// =============================================================================

/** Interface para definir un enlace externo de proyecto */
interface LinkDef {
    url: string;    // URL de destino (GitHub, Sitio Web, etc.)
    label: string;  // Etiqueta del enlace
}

/** Interface para definir los datos de un proyecto */
interface Project {
    title: string;          // Título del proyecto
    description: string;    // Descripción del alcance y propósito
    stack: string[];        // Tecnologías principales utilizadas
    highlights: string[];   // Logros o características destacadas
    accent: string;         // Color hexadecimal de acento para la tarjeta
    type: string;           // Categoría (ej. "Proyecto Personal", "Empresarial")
    links?: LinkDef[];      // Enlaces externos opcionales
    statusNote?: string;    // Nota sobre el estado de visibilidad o despliegue
}

// =============================================================================
// CONSTANTS & HELPERS
// =============================================================================

/** Lista de proyectos destacados a mostrar */
const PROJECTS: Project[] = [
    {
        title: "Aplicación Full Stack Personal",
        type: "Proyecto Personal",
        description: "Sistema web desarrollado en Next.js con Clean Architecture, Redux Toolkit para estado global y API de contacto integrada.",
        stack: ["Next.js", "TypeScript", "Redux Toolkit", "SASS", "Vitest"],
        highlights: [
            "Arquitectura limpia por capas (UI, Controller, Service, Repository)",
            "Integración de pruebas unitarias y calidad con SonarQube",
            "Monitoreo con Knowledge Graph (Graphify)"
        ],
        accent: "#00d4b4",
        links: [
            { url: "https://github.com/miltonliquinchana", label: "Ver en GitHub" }
        ],
    },
    {
        title: "Sistema de Gestión de Agua",
        type: "Proyecto Empresarial",
        description: "Plataforma para la gestión de lectura de medidores, facturación de servicios de agua y cobranza centralizada.",
        stack: ["Spring Boot", "Next.js", "MySQL", "Docker", "Tailwind CSS"],
        highlights: [
            "Flujo estricto de control de lectura e historial de medidores",
            "Generación automática de facturas y reportes de recaudo",
            "Manejo centralizado de excepciones con ExceptionHandler"
        ],
        accent: "#3b82f6",
        statusNote: "Repositorio privado de la organización"
    }
];

/** Componente SVG reutilizable para icono de enlace externo */
function ExternalLinkIcon() {
    return (
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path
                d="M2.5 11.5L11.5 2.5M11.5 2.5H7M11.5 2.5V7"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

// =============================================================================
// COMPONENT
// =============================================================================

/**
 * Componente ProjectsSection
 * 
 * Muestra el catálogo de proyectos destacados en formato de tarjetas interactivas.
 * 
 * CARACTERÍSTICAS:
 * - Tarjetas Interactivas: Resalta detalles del stack, logros clave y enlaces externos.
 * - Soporte de Proyectos Privados/Públicos: Muestra notas sobre la disponibilidad del repositorio.
 * - Animaciones: Integrado con `ScrollReveal` para animación escalonada por índice.
 * 
 * @returns {JSX.Element} Sección visual con la cuadrícula de proyectos.
 */
export default function ProjectsSection() {
    return (
        <section
            id="projects"
            aria-labelledby="projects-heading"
            className="section-wrapper"
            style={{
                background: "var(--bg-primary)",
            }}
        >
            <div className="container">
                {/* Encabezado de la sección */}
                <ScrollReveal>
                    <div style={{ textAlign: "center", marginBottom: "clamp(2.5rem, 6vw, 4rem)" }}>
                        <p className="section-label" style={{ justifyContent: "center" }}>
                            Proyectos
                        </p>
                        <h2 id="projects-heading" className="heading-lg">
                            Trabajo que me <span className="text-accent">define</span>
                        </h2>
                    </div>
                </ScrollReveal>

                {/* Cuadrícula de proyectos */}
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 360px), 1fr))",
                        gap: "1.5rem",
                    }}
                >
                    {PROJECTS.map((project, idx) => (
                        <ScrollReveal key={project.title} delay={idx * 80}>
                            <article
                                className="glass-card"
                                style={{
                                    padding: "2rem",
                                    display: "flex",
                                    flexDirection: "column",
                                    height: "100%",
                                    position: "relative",
                                    overflow: "hidden",
                                }}
                            >
                                {/* Línea de acento superior */}
                                <div
                                    aria-hidden="true"
                                    style={{
                                        position: "absolute",
                                        top: 0,
                                        left: 0,
                                        right: 0,
                                        height: "2px",
                                        background: `linear-gradient(90deg, ${project.accent}, transparent)`,
                                    }}
                                />

                                {/* Badge de categoría */}
                                <span
                                    style={{
                                        display: "inline-flex",
                                        alignItems: "center",
                                        padding: "0.25rem 0.7rem",
                                        fontSize: "0.7rem",
                                        fontWeight: 600,
                                        letterSpacing: "0.08em",
                                        textTransform: "uppercase",
                                        borderRadius: "6px",
                                        background: `${project.accent}15`,
                                        color: project.accent,
                                        border: `1px solid ${project.accent}30`,
                                        marginBottom: "1rem",
                                        alignSelf: "flex-start",
                                    }}
                                >
                                    {project.type}
                                </span>

                                {/* Título del proyecto */}
                                <h3
                                    className="heading-sm"
                                    style={{ marginBottom: "0.75rem", fontSize: "1.1rem" }}
                                >
                                    {project.title}
                                </h3>

                                {/* Descripción del proyecto */}
                                <p
                                    style={{
                                        color: "var(--text-secondary)",
                                        fontSize: "0.9rem",
                                        lineHeight: 1.7,
                                        marginBottom: "1.25rem",
                                        flex: 1,
                                    }}
                                >
                                    {project.description}
                                </p>

                                {/* Lista de características y logros */}
                                <ul
                                    style={{
                                        listStyle: "none",
                                        padding: 0,
                                        margin: "0 0 1.5rem",
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: "0.4rem",
                                    }}
                                >
                                    {project.highlights.map((h) => (
                                        <li
                                            key={h}
                                            style={{
                                                fontSize: "0.82rem",
                                                color: "var(--text-secondary)",
                                                display: "flex",
                                                alignItems: "flex-start",
                                                gap: "0.5rem",
                                            }}
                                        >
                                            <span
                                                style={{
                                                    width: "4px",
                                                    height: "4px",
                                                    borderRadius: "50%",
                                                    background: project.accent,
                                                    marginTop: "6px",
                                                    flexShrink: 0,
                                                }}
                                            />
                                            {h}
                                        </li>
                                    ))}
                                </ul>

                                {/* Badges del stack tecnológico */}
                                <div
                                    style={{
                                        display: "flex",
                                        flexWrap: "wrap",
                                        gap: "0.4rem",
                                        marginBottom: "1.5rem",
                                    }}
                                >
                                    {project.stack.map((tech) => (
                                        <span
                                            key={tech}
                                            style={{
                                                padding: "0.25rem 0.6rem",
                                                fontSize: "0.75rem",
                                                fontWeight: 500,
                                                borderRadius: "5px",
                                                background: "rgba(255,255,255,0.05)",
                                                color: "var(--text-secondary)",
                                                border: "1px solid var(--border-subtle)",
                                            }}
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>

                                {/* Nota de visibilidad y enlaces de acceso */}
                                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                                    {project.statusNote && (
                                        <div style={{
                                            fontSize: "0.8rem",
                                            color: "var(--text-muted)",
                                            background: "rgba(255,255,255,0.03)",
                                            padding: "0.6rem 0.8rem",
                                            borderRadius: "6px",
                                            border: "1px solid var(--border-subtle)",
                                            lineHeight: 1.5,
                                        }}>
                                            {project.statusNote}
                                        </div>
                                    )}

                                    <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
                                        {project.links ? (
                                            project.links.map((link) => (
                                                <a
                                                    key={link.url}
                                                    href={link.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    aria-label={`Visitar ${link.label}`}
                                                    style={{
                                                        display: "inline-flex",
                                                        alignItems: "center",
                                                        gap: "0.4rem",
                                                        fontSize: "0.85rem",
                                                        fontWeight: 600,
                                                        color: project.accent,
                                                        textDecoration: "none",
                                                        transition: "opacity 0.2s ease",
                                                    }}
                                                    onMouseOver={(e) => (e.currentTarget.style.opacity = "0.8")}
                                                    onMouseOut={(e) => (e.currentTarget.style.opacity = "1")}
                                                    onFocus={(e) => (e.currentTarget.style.opacity = "0.8")}
                                                    onBlur={(e) => (e.currentTarget.style.opacity = "1")}
                                                >
                                                    <ExternalLinkIcon />
                                                    {link.label}
                                                </a>
                                            ))
                                        ) : (
                                            <span
                                                style={{
                                                    display: "inline-flex",
                                                    alignItems: "center",
                                                    gap: "0.4rem",
                                                    fontSize: "0.82rem",
                                                    fontWeight: 600,
                                                    color: project.accent,
                                                    opacity: 0.5,
                                                    cursor: "default",
                                                }}
                                            >
                                                <ExternalLinkIcon />
                                                Repositorio Privado
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </article>
                        </ScrollReveal>
                    ))}
                </div>
            </div>
        </section>
    );
}
