"use client";

import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { ContactControllerInterface } from "@/controllers/ContactControllerInterface";
import { ContactController } from "@/controllers/ContactController";
import { SUCCESS_TOAST_CONFIG, ERROR_TOAST_CONFIG } from "@/utils/ToastConfiguration";
import { SOCIAL_LINKS } from "@/utils/constant/SocialLink";
import ScrollReveal from "./ScrollReveal";

// =============================================================================
// TYPES & INTERFACES
// =============================================================================

/**
 * Interface que representa el estado del formulario de contacto
 */
interface FormState {
    name: string;    // Nombre completo del usuario
    email: string;   // Correo electrónico de contacto
    message: string; // Mensaje o descripción de la consulta
}

// =============================================================================
// COMPONENT
// =============================================================================

/**
 * Componente ContactSection
 * 
 * Interfaz visual del formulario de contacto que permite a los usuarios enviar mensajes.
 * 
 * CARACTERÍSTICAS & ARQUITECTURA:
 * - Capa UI (Clean Architecture): Instancia directamente el controlador mediante `useRef` + `useEffect`.
 * - Estado Reactivo: Controla los campos del formulario y estados visuales de carga.
 * - Accesibilidad (a11y): Cumple WCAG 2.1 AA con etiquetas ARIA e identificadores únicos en campos de entrada.
 * - Animaciones: Utiliza `ScrollReveal` para revelado progresivo en pantalla.
 * 
 * // WHY: Garantiza una separación estricta entre la UI y los servicios de backend, instanciando ContactController
 * mediante useRef para preservar la misma suscripción de errores a lo largo del ciclo de vida del componente.
 * 
 * @returns {JSX.Element} Sección de contacto responsiva con formulario e información de redes.
 * @layer UI
 */
export default function ContactSection() {
    // Estado local para los campos del formulario
    const [form, setForm] = useState<FormState>({
        name: "",
        email: "",
        message: "",
    });

    // Estado local para verificar si la solicitud se completó exitosamente
    const [submitted, setSubmitted] = useState<boolean>(false);

    // Estado local de carga
    const [sending, setSending] = useState<boolean>(false);

    /**
     * Referencia persistente al controlador de Contacto.
     * 
     * // WHY: useRef mantiene la misma instancia del controlador a través de re-renders de React,
     * // evitando registrar callbacks duplicados en ExceptionHandler.
     */
    const controladorContact = useRef<ContactControllerInterface | null>(null);

    /**
     * Effect de montaje: Inicializa la instancia del controlador pasando la función de toast.
     */
    useEffect(() => {
        /**
         * Función callback para mostrar mensajes de error capturados por ExceptionHandler
         */
        const mostrarMensajeError = (mensajeError: string) => toast.error(mensajeError, ERROR_TOAST_CONFIG);

        // Inicializa el controlador solo si no existe previa instancia (Lazy Initialization)
        controladorContact.current ??= new ContactController(mostrarMensajeError);
    }, []);

    /**
     * Manejador de cambios en los inputs del formulario
     * Actualiza el estado local de los campos según el nombre del target
     * 
     * @param {React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>} e - Evento de cambio del input o textarea
     */
    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setForm((prevForm) => ({
            ...prevForm,
            [name]: value,
        }));
    };

    /**
     * Manejador para el envío del formulario.
     * 
     * // WHY: Delega la lógica de negocio al Controller y evalúa el flag `response.success`
     * // para notificar al usuario y desactivar el estado de carga (`setSending(false)`).
     * 
     * @param {React.SyntheticEvent<HTMLFormElement>} e - Evento de envío del formulario
     */
    const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Guarda de seguridad si el controlador no se ha instanciado
        if (!controladorContact.current) {
            return;
        }

        // Validación visual inmediata en cliente antes de realizar la petición HTTP
        if (form.name === "" || form.email === "" || form.message === "") {
            toast.error("Por favor, complete todos los campos", ERROR_TOAST_CONFIG);
            return;
        }

        // Activa el indicador visual de carga (loader / spinner)
        setSending(true);

        // Transmite el formulario al controlador de Clean Architecture
        const response = await controladorContact.current.sendMessage(form);

        // NOTE: apiClient devuelve { success: false } en caso de fallo, por lo que la UI
        // puede evaluar response.success con seguridad sin requerir un bloque try/catch.
        if (response.success) {
            setSubmitted(true);
            setForm({ name: "", email: "", message: "" });
            toast.success("¡Mensaje enviado con éxito!", SUCCESS_TOAST_CONFIG);
        } else {
            toast.error("No se pudo enviar el mensaje. Intenta nuevamente.", ERROR_TOAST_CONFIG);
        }

        // Desactiva el estado de carga al finalizar la operación
        setSending(false);
    };

    /**
     * Restablece el formulario para permitir enviar otro mensaje
     */
    const handleReset = () => {
        setSubmitted(false);
    };

    return (
        <section
            id="contact"
            aria-labelledby="contact-heading"
            className="section-wrapper"
            style={{
                background: "linear-gradient(180deg, var(--bg-primary) 0%, #060a10 100%)",
            }}
        >
            <div className="container">
                {/* Encabezado de la sección */}
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

                {/* Contenido principal: Formulario e Información de contacto */}
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                        gap: "2rem",
                        alignItems: "start",
                    }}
                >
                    {/* Tarjeta del formulario */}
                    <ScrollReveal delay={60}>
                        <div className="glass-card" style={{ padding: "clamp(1.5rem, 4vw, 2.5rem)" }}>
                            {submitted ? (
                                <div style={{ textAlign: "center", padding: "2rem 1rem" }}>
                                    <div
                                        style={{
                                            width: "56px",
                                            height: "56px",
                                            borderRadius: "50%",
                                            background: "rgba(0, 212, 180, 0.15)",
                                            border: "1px solid rgba(0, 212, 180, 0.3)",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            color: "var(--accent-teal)",
                                            margin: "0 auto 1.25rem",
                                        }}
                                    >
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                                            <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </div>
                                    <h3 style={{ fontSize: "1.25rem", fontWeight: 700, marginBottom: "0.5rem" }}>
                                        ¡Mensaje enviado!
                                    </h3>
                                    <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", marginBottom: "1.5rem" }}>
                                        Gracias por escribir. Te responderé lo antes posible.
                                    </p>
                                    <button
                                        type="button"
                                        onClick={handleReset}
                                        className="btn-primary"
                                        style={{ width: "100%", justifyContent: "center" }}
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
                                        {/* Campo: Nombre */}
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

                                        {/* Campo: Email */}
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

                                        {/* Campo: Mensaje */}
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

                                        {/* Botón de envío */}
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
                                                    <span>Enviando...</span>
                                                </>
                                            ) : (
                                                "Enviar mensaje"
                                            )}
                                        </button>
                                    </div>
                                </form>
                            )}
                        </div>
                    </ScrollReveal>

                    {/* Enlaces de contacto social */}
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
