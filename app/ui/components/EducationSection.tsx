import ScrollReveal from "./ScrollReveal";

// =============================================================================
// TYPES & INTERFACES
// =============================================================================

/** Interface para definir un elemento de educación formal */
interface EducationItem {
    type: string;        // Categoría ("education")
    title: string;       // Título o grado académico obtenido
    institution: string; // Nombre de la institución educativa
    period: string;      // Año o periodo de titulación
    icon: string;        // Icono o emoji representativo
    accent: string;      // Color de acento para el borde e icono
}

/** Interface para definir una capacitación o curso */
interface CourseItem {
    type: string;        // Categoría ("course")
    title: string;       // Nombre del curso o capacitación
    institution: string; // Plataforma o centro de formación
    details: string;     // Tecnologías o temas cubiertos
    icon: string;        // Icono o emoji representativo
    accent: string;      // Color de acento
}

// =============================================================================
// CONSTANTS
// =============================================================================

/** Lista de títulos de educación formal */
const EDUCATION: EducationItem[] = [
    {
        type: "education",
        title: "Tecnólogo Superior en Desarrollo de Software",
        institution: "Instituto Tecnológico Superior Nelson Torres",
        period: "2020",
        icon: "🎓",
        accent: "#00d4b4",
    },
];

/** Lista de cursos y certificaciones completadas */
const COURSES: CourseItem[] = [
    {
        type: "course",
        title: "DevOps Integral",
        institution: "Udemy",
        details: "Docker · Kubernetes · Jenkins · GitFlow · CI/CD",
        icon: "📦",
        accent: "#8b5cf6",
    },
    {
        type: "course",
        title: "Mantenimiento de Computadores",
        institution: "Americano Centro de Formación Profesional",
        details: "Hardware y software · Diagnóstico y reparación",
        icon: "🖥️",
        accent: "#f59e0b",
    },
    {
        type: "course",
        title: "Instalaciones Eléctricas Residenciales",
        institution: "Secap",
        details: "Circuitos eléctricos · Normas de seguridad",
        icon: "🔌",
        accent: "#3b82f6",
    },
];

// =============================================================================
// COMPONENT
// =============================================================================

/**
 * Componente EducationSection
 * 
 * Exhibe certificaciones, títulos académicos y cursos completados.
 * 
 * CARACTERÍSTICAS:
 * - Separación Semántica: Divide la Educación Formal de las Capacitaciones Continuas.
 * - Tarjetas Interactivas: Muestra la institución, periodo e íconos distintivos.
 * - Animaciones escalonadas: Integrado con `ScrollReveal`.
 * 
 * @returns {JSX.Element} Sección descriptiva de formación académica y cursos.
 */
export default function EducationSection() {
    return (
        <section
            id="education"
            aria-labelledby="education-heading"
            className="section-wrapper"
            style={{
                background:
                    "linear-gradient(180deg, var(--bg-primary) 0%, var(--bg-secondary) 50%, var(--bg-primary) 100%)",
            }}
        >
            <div className="container">
                {/* Encabezado de la sección */}
                <ScrollReveal>
                    <div style={{ textAlign: "center", marginBottom: "clamp(2.5rem, 6vw, 4rem)" }}>
                        <p className="section-label" style={{ justifyContent: "center" }}>
                            Formación
                        </p>
                        <h2 id="education-heading" className="heading-lg">
                            Educación &amp;{" "}
                            <span className="text-accent">Capacitaciones</span>
                        </h2>
                    </div>
                </ScrollReveal>

                {/* Grid de 2 columnas: Educación Formal vs Capacitaciones */}
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 520px), 1fr))",
                        gap: "clamp(2rem, 5vw, 4rem)",
                    }}
                >
                    {/* Columna: Educación formal */}
                    <div>
                        <ScrollReveal>
                            <h3
                                style={{
                                    fontSize: "0.75rem",
                                    fontWeight: 600,
                                    letterSpacing: "0.12em",
                                    textTransform: "uppercase",
                                    color: "var(--text-muted)",
                                    marginBottom: "1.25rem",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "0.5rem",
                                }}
                            >
                                <span
                                    style={{
                                        width: "1.5rem",
                                        height: "1px",
                                        background: "currentColor",
                                    }}
                                />
                                Educación Formal
                            </h3>
                        </ScrollReveal>

                        {EDUCATION.map((item) => (
                            <ScrollReveal key={item.title} delay={80}>
                                <article
                                    className="glass-card"
                                    style={{ padding: "1.75rem" }}
                                >
                                    <div
                                        style={{
                                            display: "flex",
                                            gap: "1rem",
                                            alignItems: "flex-start",
                                        }}
                                    >
                                        <div
                                            aria-hidden="true"
                                            style={{
                                                width: "48px",
                                                height: "48px",
                                                borderRadius: "12px",
                                                background: `${item.accent}15`,
                                                border: `1px solid ${item.accent}30`,
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                fontSize: "1.4rem",
                                                flexShrink: 0,
                                            }}
                                        >
                                            {item.icon}
                                        </div>
                                        <div>
                                            <h4
                                                style={{
                                                    fontWeight: 600,
                                                    fontSize: "0.95rem",
                                                    color: "var(--text-primary)",
                                                    marginBottom: "0.3rem",
                                                    lineHeight: 1.4,
                                                }}
                                            >
                                                {item.title}
                                            </h4>
                                            <p
                                                style={{
                                                    fontSize: "0.85rem",
                                                    color: item.accent,
                                                    fontWeight: 500,
                                                    marginBottom: "0.25rem",
                                                }}
                                            >
                                                {item.institution}
                                            </p>
                                            <p
                                                style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}
                                            >
                                                Año de titulación: {item.period}
                                            </p>
                                        </div>
                                    </div>
                                </article>
                            </ScrollReveal>
                        ))}
                    </div>

                    {/* Columna: Capacitaciones */}
                    <div>
                        <ScrollReveal>
                            <h3
                                style={{
                                    fontSize: "0.75rem",
                                    fontWeight: 600,
                                    letterSpacing: "0.12em",
                                    textTransform: "uppercase",
                                    color: "var(--text-muted)",
                                    marginBottom: "1.25rem",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "0.5rem",
                                }}
                            >
                                <span
                                    style={{
                                        width: "1.5rem",
                                        height: "1px",
                                        background: "currentColor",
                                    }}
                                />
                                Capacitaciones
                            </h3>
                        </ScrollReveal>

                        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                            {COURSES.map((course, idx) => (
                                <ScrollReveal key={course.title} delay={idx * 70}>
                                    <article
                                        className="glass-card"
                                        style={{ padding: "1.25rem 1.5rem" }}
                                    >
                                        <div
                                            style={{
                                                display: "flex",
                                                gap: "1rem",
                                                alignItems: "center",
                                            }}
                                        >
                                            <div
                                                aria-hidden="true"
                                                style={{
                                                    width: "40px",
                                                    height: "40px",
                                                    borderRadius: "10px",
                                                    background: `${course.accent}15`,
                                                    border: `1px solid ${course.accent}30`,
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    fontSize: "1.2rem",
                                                    flexShrink: 0,
                                                }}
                                            >
                                                {course.icon}
                                            </div>
                                            <div>
                                                <p
                                                    style={{
                                                        fontWeight: 600,
                                                        fontSize: "0.9rem",
                                                        color: "var(--text-primary)",
                                                        marginBottom: "0.2rem",
                                                    }}
                                                >
                                                    {course.title}
                                                </p>
                                                <p
                                                    style={{
                                                        fontSize: "0.78rem",
                                                        color: course.accent,
                                                        fontWeight: 500,
                                                        marginBottom: "0.15rem",
                                                    }}
                                                >
                                                    {course.institution}
                                                </p>
                                                <p
                                                    style={{
                                                        fontSize: "0.75rem",
                                                        color: "var(--text-muted)",
                                                    }}
                                                >
                                                    {course.details}
                                                </p>
                                            </div>
                                        </div>
                                    </article>
                                </ScrollReveal>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
