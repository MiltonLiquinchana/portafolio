import ScrollReveal from "./ScrollReveal";

// =============================================================================
// TYPES & INTERFACES
// =============================================================================

/** Interface para definir un elemento en la experiencia laboral */
interface ExperienceItem {
    company: string;        // Nombre de la empresa u organización
    role: string;           // Cargo o rol desempeñado
    period: string;         // Rango de fechas del periodo laborado
    type: string;           // Tipo de contrato o área (ej. "Área de TI", "Contrato")
    description: string[];  // Lista de responsabilidades y logros
}

// =============================================================================
// CONSTANTS
// =============================================================================

/** Historial de experiencia laboral */
const EXPERIENCE: ExperienceItem[] = [
    {
        company: "NUBE Corporation",
        role: "Desarrollador Full Stack",
        period: "Oct 2023 — Nov 2025",
        type: "Área de TI",
        description: [
            "Desarrollo de endpoints REST con Node.js y TypeScript usando arquitectura Serverless en AWS y DynamoDB.",
            "Desarrollo y refactorización de microservicios con Spring Boot y Spring Data REST.",
            "Conversión de diseños de Figma a HTML, CSS y JavaScript.",
            "Documentación de APIs con OpenAPI/Swagger y desarrollo de procedimientos almacenados en Oracle PL/SQL.",
            "Gestión de despliegues con Docker, Kubernetes y Jenkins.",
        ],
    },
    {
        company: "INT Nelson Torres",
        role: "Webmaster / Administrador Web",
        period: "Jun 2019 — Nov 2019",
        type: "Contrato",
        description: [
            "Configuración y administración de la página web institucional utilizando herramientas CMS.",
            "Mantenimiento del contenido web para mantener informada a la comunidad sobre las actividades institucionales.",
        ],
    },
];

// =============================================================================
// COMPONENT
// =============================================================================

/**
 * Componente ExperienceSection
 * 
 * Línea de tiempo visual que muestra la trayectoria laboral, roles y responsabilidades.
 * 
 * CARACTERÍSTICAS:
 * - Diseño Timeline: Indicador vertical de gradiente con nodos interactivos.
 * - Estructura Clara: Presenta cargo, empresa, período y lista de logros.
 * - Animaciones: Revelado escalonado mediante `ScrollReveal`.
 * 
 * @returns {JSX.Element} Sección de experiencia laboral en formato timeline.
 */
export default function ExperienceSection() {
    return (
        <section
            id="experience"
            aria-labelledby="experience-heading"
            className="section-wrapper"
        >
            <div className="container">
                {/* Encabezado de la sección */}
                <ScrollReveal>
                    <div style={{ textAlign: "center", marginBottom: "clamp(2.5rem, 6vw, 4rem)" }}>
                        <p className="section-label" style={{ justifyContent: "center" }}>
                            Experiencia Laboral
                        </p>
                        <h2 id="experience-heading" className="heading-lg">
                            Mi trayectoria <span className="text-accent">profesional</span>
                        </h2>
                    </div>
                </ScrollReveal>

                {/* Contenedor de la línea de tiempo */}
                <div
                    style={{
                        position: "relative",
                        maxWidth: "720px",
                        marginInline: "auto",
                    }}
                >
                    {/* Línea vertical decorativa */}
                    <div
                        aria-hidden="true"
                        style={{
                            position: "absolute",
                            left: "0",
                            top: "0",
                            bottom: "0",
                            width: "1px",
                            background:
                                "linear-gradient(to bottom, var(--accent-teal), var(--accent-purple), transparent)",
                            opacity: 0.4,
                        }}
                    />

                    {/* Lista de experiencias */}
                    <div
                        style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}
                    >
                        {EXPERIENCE.map((exp, idx) => (
                            <ScrollReveal key={exp.company} delay={idx * 100}>
                                <div
                                    style={{
                                        paddingLeft: "2.5rem",
                                        position: "relative",
                                    }}
                                >
                                    {/* Punto con resplandor en la línea de tiempo */}
                                    <div
                                        aria-hidden="true"
                                        style={{
                                            position: "absolute",
                                            left: "-6px",
                                            top: "1.5rem",
                                            width: "12px",
                                            height: "12px",
                                            borderRadius: "50%",
                                            background: "var(--accent-teal)",
                                            border: "2px solid var(--bg-primary)",
                                            boxShadow: "0 0 12px var(--accent-teal-glow)",
                                        }}
                                    />

                                    {/* Tarjeta con los detalles de la experiencia */}
                                    <article className="glass-card" style={{ padding: "1.75rem" }}>
                                        {/* Encabezado del rol y periodo */}
                                        <div
                                            style={{
                                                display: "flex",
                                                justifyContent: "space-between",
                                                alignItems: "flex-start",
                                                flexWrap: "wrap",
                                                gap: "0.5rem",
                                                marginBottom: "0.5rem",
                                            }}
                                        >
                                            <div>
                                                <h3
                                                    className="heading-sm"
                                                    style={{ fontSize: "1rem", marginBottom: "0.25rem" }}
                                                >
                                                    {exp.role}
                                                </h3>
                                                <p
                                                    style={{
                                                        fontWeight: 600,
                                                        color: "var(--accent-teal)",
                                                        fontSize: "0.9rem",
                                                    }}
                                                >
                                                    {exp.company}
                                                </p>
                                            </div>
                                            <div style={{ textAlign: "right", flexShrink: 0 }}>
                                                <span
                                                    style={{
                                                        display: "block",
                                                        fontSize: "0.8rem",
                                                        color: "var(--text-muted)",
                                                        marginBottom: "0.25rem",
                                                    }}
                                                >
                                                    {exp.period}
                                                </span>
                                                <span className="tech-badge" style={{ fontSize: "0.72rem" }}>
                                                    {exp.type}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Descripción y lista de responsabilidades */}
                                        <ul
                                            style={{
                                                listStyle: "none",
                                                padding: 0,
                                                margin: "1rem 0 0",
                                                display: "flex",
                                                flexDirection: "column",
                                                gap: "0.5rem",
                                            }}
                                        >
                                            {exp.description.map((item) => (
                                                <li
                                                    key={item}
                                                    style={{
                                                        display: "flex",
                                                        alignItems: "flex-start",
                                                        gap: "0.6rem",
                                                        fontSize: "0.875rem",
                                                        color: "var(--text-secondary)",
                                                        lineHeight: 1.6,
                                                    }}
                                                >
                                                    <span
                                                        aria-hidden="true"
                                                        style={{
                                                            width: "4px",
                                                            height: "4px",
                                                            borderRadius: "50%",
                                                            background: "var(--accent-teal)",
                                                            marginTop: "8px",
                                                            flexShrink: 0,
                                                        }}
                                                    />
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                    </article>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
