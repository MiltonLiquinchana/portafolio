import ScrollReveal from "./ScrollReveal";

// =============================================================================
// TYPES & INTERFACES
// =============================================================================

/** Interface para los datos de métricas o logros principales */
interface HighlightItem {
    value: string;  // Valor cuantitativo o distintivo
    label: string;  // Etiqueta descriptiva del logro
}

// =============================================================================
// CONSTANTS
// =============================================================================

/** Métricas y aspectos destacados del perfil profesional */
const HIGHLIGHTS: HighlightItem[] = [
    { value: "2", label: "Experiencias laborales" },
    { value: "4+", label: "Áreas técnicas" },
    { value: "Intermedio", label: "Nivel de inglés" },
];

// =============================================================================
// COMPONENT
// =============================================================================

/**
 * Componente AboutSection
 * 
 * Sección "Sobre Mí" que resume la biografía, el rol actual y los objetivos profesionales.
 * 
 * CARACTERÍSTICAS:
 * - Diseño Responsivo: Layout en cuadrícula adaptable según el tamaño del viewport.
 * - Tarjetas Informativas: Muestra métricas clave sobre experiencia y competencias.
 * - Etiquetado Técnico: Badges destacados con principios de Clean Code y CI/CD.
 * 
 * @returns {JSX.Element} Sección descriptiva con biografía y métricas principales.
 */
export default function AboutSection() {
    return (
        <section
            id="about"
            aria-labelledby="about-heading"
            className="section-wrapper"
            style={{
                background:
                    "linear-gradient(180deg, var(--bg-primary) 0%, var(--bg-secondary) 50%, var(--bg-primary) 100%)",
            }}
        >
            <div className="container">
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 420px), 1fr))",
                        gap: "clamp(2rem, 6vw, 5rem)",
                        alignItems: "center",
                    }}
                >
                    {/* Columna de texto descriptivo */}
                    <div>
                        <ScrollReveal>
                            <p className="section-label">Sobre mí</p>
                            <h2 id="about-heading" className="heading-lg" style={{ marginBottom: "1.5rem" }}>
                                Construyendo soluciones{" "}
                                <span className="text-accent">que importan</span>
                            </h2>
                        </ScrollReveal>

                        <ScrollReveal delay={100}>
                            <p
                                style={{
                                    color: "var(--text-secondary)",
                                    fontSize: "1rem",
                                    lineHeight: 1.8,
                                    marginBottom: "1.25rem",
                                }}
                            >
                                Soy Tecnólogo Superior en Desarrollo de Software y desarrollador Full Stack,
                                con experiencia en desarrollo web, APIs REST, microservicios y gestión de bases
                                de datos. Estoy orientado a resultados y disponible para nuevas oportunidades.
                            </p>
                            <p
                                style={{
                                    color: "var(--text-secondary)",
                                    fontSize: "1rem",
                                    lineHeight: 1.8,
                                    marginBottom: "1.25rem",
                                }}
                            >
                                He trabajado con Java, Spring Boot, Node.js y TypeScript, además de bases de datos
                                SQL Server, MySQL, Oracle PL/SQL y DynamoDB. También implemento flujos de CI/CD
                                con Docker, Kubernetes y Jenkins.
                            </p>
                            <p
                                style={{
                                    color: "var(--text-secondary)",
                                    fontSize: "1rem",
                                    lineHeight: 1.8,
                                }}
                            >
                                Mi perfil incluye AWS, Serverless, desarrollo móvil y herramientas de desarrollo
                                asistido por IA como{" "}
                                <span style={{ color: "var(--text-primary)", fontWeight: 500 }}>
                                    Google Antigravity
                                </span>{" "}
                                y{" "}
                                <span style={{ color: "var(--text-primary)", fontWeight: 500 }}>VS Code</span>,
                                priorizando siempre la calidad del código y el impacto real en el producto.
                            </p>
                        </ScrollReveal>
                    </div>

                    {/* Columna de estadísticas y habilidades clave */}
                    <div>
                        <ScrollReveal delay={150}>
                            <div
                                style={{
                                    display: "grid",
                                    gridTemplateColumns: "1fr",
                                    gap: "1rem",
                                    marginBottom: "1.5rem",
                                }}
                            >
                                {HIGHLIGHTS.map(({ value, label }) => (
                                    <div
                                        key={label}
                                        className="glass-card"
                                        style={{
                                            padding: "1.5rem",
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "1.5rem",
                                        }}
                                    >
                                        <span
                                            style={{
                                                fontSize: "2rem",
                                                fontWeight: 800,
                                                letterSpacing: "-0.03em",
                                                color: "var(--accent-teal)",
                                                flexShrink: 0,
                                                minWidth: "64px",
                                                textAlign: "center",
                                            }}
                                        >
                                            {value}
                                        </span>
                                        <span
                                            style={{
                                                fontSize: "0.9rem",
                                                color: "var(--text-secondary)",
                                                fontWeight: 500,
                                            }}
                                        >
                                            {label}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            {/* Etiquetas de valores profesionales */}
                            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                                {[
                                    "Orientado a resultados",
                                    "Clean Code",
                                    "CI/CD",
                                    "Microservicios",
                                    "AWS & Serverless",
                                    "Desarrollo móvil",
                                    "Aprendizaje continuo",
                                ].map((tag) => (
                                    <span key={tag} className="tech-badge">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </ScrollReveal>
                    </div>
                </div>
            </div>
        </section>
    );
}
