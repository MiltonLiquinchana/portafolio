"use client";

import ScrollReveal from "./ScrollReveal";

interface LinkDef {
  url: string;
  label: string;
}

interface Project {
  title: string;
  description: string;
  stack: string[];
  highlights: string[];
  accent: string;
  type: string;
  links?: LinkDef[];
  statusNote?: string;
}

const PROJECTS: Project[] = [
  {
    title: "Plataforma Full Stack Personal",
    type: "Proyecto Personal",
    description:
      "Aplicación completa con autenticación moderna, arquitectura de microservicios y pipeline CI/CD totalmente automatizado desde el commit hasta el despliegue en producción.",
    stack: ["Next.js", "Clerk", "Spring Boot", "MySQL", "Docker", "Kubernetes", "Jenkins"],
    highlights: [
      "Frontend en Next.js con autenticación Clerk",
      "Backend Spring Boot — arquitectura microservicios",
      "CI/CD con Jenkins + Docker + Kubernetes (Minikube)",
      "Despliegue automático vía webhooks de GitHub",
    ],
    accent: "#00d4b4",
    statusNote: "🚧 En desarrollo. Repositorios de BD, Front y Back privados. Frontend disponible en Vercel (Backend inactivo temporalmente).",
    links: [
      { url: "#", label: "Ver Frontend en Vercel" }
    ]
  },
  {
    title: "Sistema de Gestión Hospitalaria (Auna)",
    type: "API REST & Serverless",
    description:
      "Sistema backend para gestión hospitalaria con endpoints REST en Node.js/TypeScript, arquitectura serverless en AWS y base de datos DynamoDB para alta disponibilidad.",
    stack: ["Node.js", "TypeScript", "Express", "AWS", "Serverless", "DynamoDB"],
    highlights: [
      "Endpoints REST con Node.js y TypeScript",
      "Arquitectura Serverless en AWS Lambda",
      "DynamoDB para persistencia NoSQL",
      "Alta disponibilidad y escalabilidad automática",
    ],
    accent: "#3b82f6",
    links: [
      { url: "https://auna.org/pe", label: "Auna Portal" },
      { url: "https://mi.auna.pe", label: "Mi Auna" }
    ]
  },
  {
    title: "Plataforma Web con Microservicios",
    type: "Enterprise Platform",
    description:
      "Migración y modernización de plataforma empresarial a Spring Data REST con microservicios, documentación OpenAPI/Swagger, procedimientos almacenados en Oracle PL/SQL y despliegue con Kubernetes.",
    stack: ["Spring Data REST", "Oracle PL/SQL", "OpenAPI", "Kubernetes", "Jenkins"],
    highlights: [
      "Migración a Spring Data REST",
      "Documentación con OpenAPI / Swagger",
      "Procedimientos almacenados Oracle PL/SQL",
      "Despliegue con Kubernetes y Jenkins",
    ],
    accent: "#8b5cf6",
  },
];

function ExternalLinkIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M2 12L12 2M12 2H7M12 2v5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * @function ProjectsSection
 * @description Muestra una cuadrícula de proyectos destacados, combinando enlaces, estados e imágenes representativas.
 * 
 * WHY: Organizar los proyectos en una estructura de datos local (o en el futuro de una API) permite iterar y
 * renderizar "cards" de forma predecible y estandarizada, manteniendo un diseño consistente para el portafolio.
 */
export default function ProjectsSection() {
  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="section-wrapper"
      style={{
        background:
          "linear-gradient(180deg, var(--bg-primary) 0%, var(--bg-secondary) 50%, var(--bg-primary) 100%)",
      }}
    >
      <div className="container">
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
                {/* Top accent line */}
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

                {/* Type badge */}
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

                <h3
                  className="heading-sm"
                  style={{ marginBottom: "0.75rem", fontSize: "1.1rem" }}
                >
                  {project.title}
                </h3>

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

                {/* Highlights */}
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

                {/* Stack pills */}
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

                {/* Links and Status */}
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
