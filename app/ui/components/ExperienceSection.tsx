import ScrollReveal from "./ScrollReveal";

interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  type: string;
  description: string[];
}

const EXPERIENCE: ExperienceItem[] = [
  {
    company: "CreaTuImagenDigital",
    role: "Full Stack Developer",
    period: "May 2020 — Oct 2023",
    type: "Freelancer",
    description: [
      "Desarrollo full stack de aplicaciones web a medida para clientes.",
      "Diseño e implementación de interfaces de usuario con tecnologías modernas (React, Next.js).",
      "Construcción de APIs REST y gestión de bases de datos relacionales.",
      "Configuración y mantenimiento de pipelines de despliegue.",
    ],
  },
  {
    company: "INT Nelson Torres",
    role: "Webmaster / Administrador Web",
    period: "Jun 2019 — Nov 2019",
    type: "Contrato",
    description: [
      "Configuración y administración de la página web institucional con CMS.",
      "Mantenimiento del contenido digital y optimización del sitio.",
      "Soporte técnico a usuarios internos relacionados con la plataforma web.",
    ],
  },
];

/**
 * @function ExperienceSection
 * @description Línea de tiempo visual que muestra la trayectoria laboral, roles y responsabilidades.
 * 
 * WHY: El formato de línea de tiempo facilita la lectura cronológica. Separar esta sección ayuda a 
 * focalizar las actualizaciones del currículum digital sin tocar otros componentes estructurales.
 */
export default function ExperienceSection() {
  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      className="section-wrapper"
    >
      <div className="container">
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

        {/* Timeline */}
        <div
          style={{
            position: "relative",
            maxWidth: "720px",
            marginInline: "auto",
          }}
        >
          {/* Vertical line */}
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
                  {/* Dot */}
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

                  <article className="glass-card" style={{ padding: "1.75rem" }}>
                    {/* Header */}
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

                    {/* Description */}
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
