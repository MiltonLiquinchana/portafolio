import ScrollReveal from "./ScrollReveal";

// =============================================================================
// TYPES & INTERFACES
// =============================================================================

/** Interface para definir una tecnología dentro de una categoría */
interface TechItem {
    name: string;   // Nombre de la tecnología o herramienta
    icon?: string;  // Icono opcional
}

/** Interface para agrupar tecnologías por categoría */
interface TechGroup {
    category: string;   // Nombre de la categoría (Backend, Frontend, DevOps, etc.)
    color: string;      // Color de acento hexadecimal
    icon: string;       // Emoji o icono descriptivo
    items: TechItem[];  // Lista de tecnologías del grupo
}

// =============================================================================
// CONSTANTS
// =============================================================================

/** Grupos de tecnologías clasificadas por especialidad */
const TECH_GROUPS: TechGroup[] = [
    {
        category: "Backend",
        color: "#f59e0b",
        icon: "⚙️",
        items: [
            { name: "Java" },
            { name: "Spring Boot" },
            { name: "Node.js" },
            { name: "APIs REST" },
            { name: "Microservicios" },
        ],
    },
    {
        category: "Frontend",
        color: "#00d4b4",
        icon: "🖥️",
        items: [
            { name: "HTML5" },
            { name: "CSS3" },
            { name: "JavaScript" },
            { name: "TypeScript" },
            { name: "React" },
            { name: "Next.js" },
            { name: "Bootstrap" },
        ],
    },
    {
        category: "Bases de Datos",
        color: "#3b82f6",
        icon: "🗄️",
        items: [
            { name: "SQL Server" },
            { name: "MySQL" },
            { name: "Oracle PL/SQL" },
            { name: "DynamoDB" },
        ],
    },
    {
        category: "DevOps & Cloud",
        color: "#8b5cf6",
        icon: "☁️",
        items: [
            { name: "AWS" },
            { name: "Serverless" },
            { name: "Docker" },
            { name: "Kubernetes" },
            { name: "Jenkins" },
            { name: "Git" },
            { name: "GitHub / GitLab" },
        ],
    },
    {
        category: "Mobile",
        color: "#ec4899",
        icon: "📱",
        items: [{ name: "Desarrollo Móvil" }],
    },
    {
        category: "Otros",
        color: "#10b981",
        icon: "✨",
        items: [
            { name: "Clerk (Auth)" },
            { name: "OpenAPI / Swagger" },
            { name: "Spring Data REST" },
            { name: "Desarrollo asistido IA" },
            { name: "Linux" },
        ],
    },
];

// =============================================================================
// COMPONENT
// =============================================================================

/**
 * Componente StackSection
 * 
 * Muestra las tecnologías y herramientas dominadas, agrupadas por categorías.
 * 
 * CARACTERÍSTICAS:
 * - Organización Categórica: Presenta Backend, Frontend, DBs, DevOps y Cloud.
 * - Diseño Visual con Acentos: Tarjetas interactivas con colores distintivos por grupo.
 * - Animaciones: Integrado con `ScrollReveal` con retrasos progresivos.
 * 
 * @returns {JSX.Element} Sección descriptiva del stack tecnológico.
 */
export default function StackSection() {
    return (
        <section
            id="stack"
            aria-labelledby="stack-heading"
            className="section-wrapper"
        >
            <div className="container">
                {/* Encabezado de la sección */}
                <ScrollReveal>
                    <div style={{ textAlign: "center", marginBottom: "clamp(2.5rem, 6vw, 4rem)" }}>
                        <p className="section-label" style={{ justifyContent: "center" }}>
                            Stack Tecnológico
                        </p>
                        <h2 id="stack-heading" className="heading-lg">
                            Herramientas con las que{" "}
                            <span className="text-accent">construyo</span>
                        </h2>
                    </div>
                </ScrollReveal>

                {/* Cuadrícula de categorías del stack */}
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 320px), 1fr))",
                        gap: "1.25rem",
                    }}
                >
                    {TECH_GROUPS.map(({ category, color, icon, items }, groupIdx) => (
                        <ScrollReveal key={category} delay={groupIdx * 60}>
                            <article
                                className="glass-card"
                                style={{ padding: "1.75rem", height: "100%" }}
                            >
                                {/* Encabezado de la tarjeta de categoría */}
                                <div
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "0.75rem",
                                        marginBottom: "1.25rem",
                                    }}
                                >
                                    <div
                                        aria-hidden="true"
                                        style={{
                                            width: "40px",
                                            height: "40px",
                                            borderRadius: "10px",
                                            background: `${color}18`,
                                            border: `1px solid ${color}30`,
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            fontSize: "1.2rem",
                                            flexShrink: 0,
                                        }}
                                    >
                                        {icon}
                                    </div>
                                    <h3
                                        className="heading-sm"
                                        style={{ fontSize: "0.95rem", color: "var(--text-primary)" }}
                                    >
                                        {category}
                                    </h3>
                                </div>

                                {/* Badges de tecnologías */}
                                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                                    {items.map(({ name }) => (
                                        <span
                                            key={name}
                                            style={{
                                                display: "inline-block",
                                                padding: "0.3rem 0.75rem",
                                                fontSize: "0.8rem",
                                                fontWeight: 500,
                                                borderRadius: "6px",
                                                background: `${color}10`,
                                                color: color,
                                                border: `1px solid ${color}25`,
                                            }}
                                        >
                                            {name}
                                        </span>
                                    ))}
                                </div>
                            </article>
                        </ScrollReveal>
                    ))}
                </div>
            </div>
        </section>
    );
}
