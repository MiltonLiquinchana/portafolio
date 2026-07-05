import ScrollReveal from "./ScrollReveal";

const HIGHLIGHTS = [
  { value: "5+", label: "Años de experiencia" },
  { value: "10+", label: "Tecnologías dominadas" },
  { value: "B2", label: "Nivel de inglés" },
];

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
          {/* Text column */}
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
                Soy un desarrollador Full Stack con experiencia en diseño, desarrollo y
                mantenimiento de aplicaciones web de extremo a extremo. Me especializo en
                construir backends robustos y escalables junto a interfaces de usuario modernas
                e intuitivas.
              </p>
              <p
                style={{
                  color: "var(--text-secondary)",
                  fontSize: "1rem",
                  lineHeight: 1.8,
                  marginBottom: "1.25rem",
                }}
              >
                Tengo sólida experiencia en gestión y optimización de bases de datos
                relacionales y NoSQL, arquitecturas orientadas a microservicios, y flujos de
                CI/CD automatizados con Docker, Kubernetes y Jenkins.
              </p>
              <p
                style={{
                  color: "var(--text-secondary)",
                  fontSize: "1rem",
                  lineHeight: 1.8,
                }}
              >
                Me adapto de forma continua a las tendencias del sector — incluyendo el
                desarrollo asistido por IA con herramientas como{" "}
                <span style={{ color: "var(--text-primary)", fontWeight: 500 }}>
                  Google Antigravity
                </span>{" "}
                y{" "}
                <span style={{ color: "var(--text-primary)", fontWeight: 500 }}>VS Code</span>,
                priorizando siempre la calidad del código y el impacto real en el producto.
              </p>
            </ScrollReveal>
          </div>

          {/* Stats column */}
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

              {/* Tags */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                {[
                  "Orientado a resultados",
                  "Clean Code",
                  "CI/CD",
                  "Microservicios",
                  "Inglés intermedio",
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
