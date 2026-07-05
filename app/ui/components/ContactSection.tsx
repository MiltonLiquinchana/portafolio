"use client";

import { useState } from "react";
import ScrollReveal from "./ScrollReveal";

interface FormState {
  name: string;
  email: string;
  message: string;
}

const SOCIAL_LINKS = [
  {
    label: "Email",
    href: "mailto:liquinchana@hotmail.es",
    value: "liquinchana@hotmail.es",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <rect x="2" y="4" width="16" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <path d="M2 7l8 5 8-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    accent: "#00d4b4",
  },
  {
    label: "LinkedIn",
    href: "#",
    value: "linkedin.com/in/milton-liquinchana",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <rect x="2" y="2" width="16" height="16" rx="3" stroke="currentColor" strokeWidth="1.5" />
        <path d="M6 9v5M6 6.5v.01M10 14v-3a1 1 0 0 1 2 0v3M10 11v3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    accent: "#3b82f6",
  },
  {
    label: "GitHub",
    href: "#",
    value: "github.com/milton-liquinchana",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path
          d="M10 2a8 8 0 0 0-2.531 15.591c.4.074.547-.174.547-.386l-.011-1.517c-2.225.484-2.695-1.073-2.695-1.073-.364-.924-.889-1.17-.889-1.17-.727-.497.055-.487.055-.487.803.057 1.226.825 1.226.825.714 1.223 1.873.87 2.329.665.073-.517.279-.87.508-1.07-1.777-.202-3.645-.888-3.645-3.953 0-.874.312-1.588.823-2.147-.082-.202-.357-1.016.078-2.117 0 0 .672-.215 2.2.82A7.662 7.662 0 0 1 10 6.82c.68.003 1.364.092 2.003.27 1.527-1.035 2.198-.82 2.198-.82.436 1.101.161 1.915.08 2.117.512.559.822 1.273.822 2.147 0 3.073-1.871 3.749-3.653 3.947.288.248.544.735.544 1.481l-.01 2.196c0 .214.145.464.55.386A8.001 8.001 0 0 0 10 2Z"
          fill="currentColor"
        />
      </svg>
    ),
    accent: "#8b5cf6",
  },
];

/**
 * @function ContactSection
 * @description Interfaz visual del formulario de contacto que permite a los usuarios enviar mensajes.
 * 
 * WHY: Siguiendo la Clean Architecture (Capa de Presentación UI), este componente solo recolecta el estado y
 * realiza el 'fetch' al Controller (/api/contact). No contiene la lógica de negocio del envío de correo (Resend),
 * delegándola totalmente al backend para proteger las claves de API y asegurar la estabilidad.
 */
export default function ContactSection() {
  const [form, setForm] = useState<FormState>({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);
    setErrorMsg("");
    
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Error al enviar el mensaje");
      }

      setSubmitted(true);
      setForm({ name: "", email: "", message: "" });
    } catch (err: unknown) {
      if (err instanceof Error) {
        setErrorMsg(err.message || "Hubo un problema. Intenta nuevamente.");
      } else {
        setErrorMsg("Hubo un problema. Intenta nuevamente.");
      }
    } finally {
      setSending(false);
    }
  };
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="section-wrapper"
      style={{
        background:
          "linear-gradient(180deg, var(--bg-primary) 0%, #060a10 100%)",
      }}
    >
      <div className="container">
        <ScrollReveal>
          <div style={{ textAlign: "center", marginBottom: "clamp(2.5rem, 6vw, 4rem)" }}>
            <p className="section-label" style={{ justifyContent: "center" }}>
              Contacto
            </p>
            <h2 id="contact-heading" className="heading-lg">
              Hablemos de tu{" "}
              <span className="text-accent">próximo proyecto</span>
            </h2>
            <p
              style={{
                color: "var(--text-secondary)",
                marginTop: "1rem",
                fontSize: "1rem",
                maxWidth: "480px",
                marginInline: "auto",
              }}
            >
              ¿Tienes un proyecto en mente? Estoy disponible para nuevas
              oportunidades. Escríbeme y te respondo pronto.
            </p>
          </div>
        </ScrollReveal>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 380px), 1fr))",
            gap: "clamp(2rem, 5vw, 4rem)",
            alignItems: "start",
          }}
        >
          {/* Form */}
          <ScrollReveal>
            <div className="glass-card" style={{ padding: "2rem" }}>
              {submitted ? (
                <div
                  style={{
                    textAlign: "center",
                    padding: "2rem 1rem",
                  }}
                >
                  <div
                    style={{
                      width: "56px",
                      height: "56px",
                      borderRadius: "50%",
                      background: "var(--accent-teal-dim)",
                      border: "1px solid var(--border-accent)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginInline: "auto",
                      marginBottom: "1rem",
                      fontSize: "1.5rem",
                    }}
                  >
                    ✓
                  </div>
                  <h3
                    style={{
                      fontWeight: 700,
                      fontSize: "1.1rem",
                      color: "var(--text-primary)",
                      marginBottom: "0.5rem",
                    }}
                  >
                    ¡Mensaje enviado!
                  </h3>
                  <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem" }}>
                    Gracias por escribirme. Te responderé a la brevedad.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="btn-secondary"
                    style={{ marginTop: "1.5rem", fontSize: "0.85rem" }}
                  >
                    Enviar otro mensaje
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  noValidate
                  aria-label="Formulario de contacto"
                >
                  <div
                    style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}
                  >
                    <div>
                      <label
                        htmlFor="contact-name"
                        style={{
                          display: "block",
                          fontSize: "0.82rem",
                          fontWeight: 600,
                          color: "var(--text-secondary)",
                          marginBottom: "0.5rem",
                          letterSpacing: "0.02em",
                        }}
                      >
                        Nombre
                      </label>
                      <input
                        id="contact-name"
                        name="name"
                        type="text"
                        autoComplete="name"
                        required
                        placeholder="Tu nombre completo"
                        value={form.name}
                        onChange={handleChange}
                        className="form-field"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="contact-email"
                        style={{
                          display: "block",
                          fontSize: "0.82rem",
                          fontWeight: 600,
                          color: "var(--text-secondary)",
                          marginBottom: "0.5rem",
                          letterSpacing: "0.02em",
                        }}
                      >
                        Email
                      </label>
                      <input
                        id="contact-email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        placeholder="tu@email.com"
                        value={form.email}
                        onChange={handleChange}
                        className="form-field"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="contact-message"
                        style={{
                          display: "block",
                          fontSize: "0.82rem",
                          fontWeight: 600,
                          color: "var(--text-secondary)",
                          marginBottom: "0.5rem",
                          letterSpacing: "0.02em",
                        }}
                      >
                        Mensaje
                      </label>
                      <textarea
                        id="contact-message"
                        name="message"
                        rows={5}
                        required
                        placeholder="Cuéntame sobre tu proyecto..."
                        value={form.message}
                        onChange={handleChange}
                        className="form-field"
                      />
                    </div>

                    <button
                      type="submit"
                      className="btn-primary"
                      disabled={sending}
                      style={{
                        width: "100%",
                        justifyContent: "center",
                        opacity: sending ? 0.7 : 1,
                      }}
                    >
                      {sending ? (
                        <>
                          <span
                            style={{
                              width: "14px",
                              height: "14px",
                              borderRadius: "50%",
                              border: "2px solid currentColor",
                              borderTopColor: "transparent",
                              animation: "spin 0.7s linear infinite",
                              display: "inline-block",
                            }}
                          />
                          Enviando...
                        </>
                      ) : (
                        "Enviar mensaje"
                      )}
                    </button>
                    {errorMsg && (
                      <p style={{ color: "#ef4444", fontSize: "0.85rem", marginTop: "0.5rem", textAlign: "center" }}>
                        {errorMsg}
                      </p>
                    )}
                  </div>
                </form>
              )}
            </div>
          </ScrollReveal>

          {/* Social links */}
          <ScrollReveal delay={120}>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {SOCIAL_LINKS.map(({ label, href, value, icon, accent }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={`Contactar por ${label}: ${value}`}
                  target={href.startsWith("mailto") ? undefined : "_blank"}
                  rel={href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                  className="glass-card"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "1rem",
                    padding: "1.25rem 1.5rem",
                    textDecoration: "none",
                    color: "inherit",
                  }}
                >
                  <div
                    style={{
                      width: "44px",
                      height: "44px",
                      borderRadius: "10px",
                      background: `${accent}15`,
                      border: `1px solid ${accent}30`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: accent,
                      flexShrink: 0,
                    }}
                  >
                    {icon}
                  </div>
                  <div>
                    <p
                      style={{
                        fontWeight: 600,
                        fontSize: "0.85rem",
                        color: "var(--text-primary)",
                        marginBottom: "0.2rem",
                      }}
                    >
                      {label}
                    </p>
                    <p
                      style={{
                        fontSize: "0.8rem",
                        color: "var(--text-secondary)",
                      }}
                    >
                      {value}
                    </p>
                  </div>
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    aria-hidden="true"
                    style={{ marginLeft: "auto", color: "var(--text-muted)" }}
                  >
                    <path
                      d="M2.5 11.5L11.5 2.5M11.5 2.5H7M11.5 2.5V7"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>

      <style jsx>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  );
}
