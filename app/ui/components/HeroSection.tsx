import Link from "next/link";

// =============================================================================
// COMPONENT
// =============================================================================

/**
 * Componente HeroSection
 * 
 * Componente principal de presentación (Hero) que se muestra al inicio del portafolio.
 * 
 * CARACTERÍSTICAS:
 * - Primera Impresión Impactante: Utiliza tipografía grande y orbes de gradiente animados.
 * - Llamada a la Acción (CTA): Encapsula botones directos hacia Proyectos y Contacto.
 * - Accesibilidad (a11y): Etiqueta semántica `<section>` con identificadores y texto claro.
 * - Indicador Visual: Muestra animación interactiva de scroll en la parte inferior.
 * 
 * @returns {JSX.Element} Sección Hero de presentación con fondo animado.
 */
export default function HeroSection() {
    return (
        <section
            id="hero"
            aria-label="Presentación"
            style={{
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                position: "relative",
                overflow: "hidden",
                background: "linear-gradient(160deg, #0a0a0a 0%, #0a0f1a 50%, #0a0a0a 100%)",
            }}
        >
            {/* Orbes de gradiente decorativos en el fondo */}
            <div aria-hidden="true" style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
                {/* Orbe color Teal */}
                <div
                    style={{
                        position: "absolute",
                        top: "15%",
                        right: "8%",
                        width: "clamp(280px, 35vw, 560px)",
                        height: "clamp(280px, 35vw, 560px)",
                        borderRadius: "50%",
                        background:
                            "radial-gradient(circle, rgba(0,212,180,0.14) 0%, rgba(0,212,180,0.04) 50%, transparent 70%)",
                        filter: "blur(40px)",
                        animation: "float-slow 8s ease-in-out infinite",
                    }}
                />
                {/* Orbe color Púrpura */}
                <div
                    style={{
                        position: "absolute",
                        bottom: "10%",
                        right: "25%",
                        width: "clamp(180px, 22vw, 380px)",
                        height: "clamp(180px, 22vw, 380px)",
                        borderRadius: "50%",
                        background:
                            "radial-gradient(circle, rgba(124,58,237,0.15) 0%, rgba(124,58,237,0.04) 50%, transparent 70%)",
                        filter: "blur(50px)",
                        animation: "float-slow 10s ease-in-out infinite reverse",
                    }}
                />
                {/* Malla de cuadrícula decorativa */}
                <div
                    style={{
                        position: "absolute",
                        inset: 0,
                        backgroundImage:
                            "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
                        backgroundSize: "60px 60px",
                        maskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 20%, transparent 100%)",
                    }}
                />
            </div>

            {/* Contenido principal del Hero */}
            <div className="container" style={{ position: "relative", zIndex: 1 }}>
                <div style={{ maxWidth: "780px" }}>
                    {/* Badge de disponibilidad */}
                    <div
                        style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "0.5rem",
                            fontSize: "0.78rem",
                            fontWeight: 600,
                            letterSpacing: "0.14em",
                            textTransform: "uppercase",
                            color: "var(--accent-teal)",
                            marginBottom: "1.5rem",
                            animation: "hero-fade-in 0.8s ease-out both",
                        }}
                    >
                        <span
                            style={{
                                width: "8px",
                                height: "8px",
                                borderRadius: "50%",
                                background: "var(--accent-teal)",
                                animation: "pulse-dot 2.5s ease-in-out infinite",
                            }}
                        />
                        Disponible para proyectos
                    </div>

                    {/* Nombre del profesional */}
                    <h1
                        className="heading-xl"
                        style={{
                            marginBottom: "0.5rem",
                            animation: "hero-fade-in 0.8s ease-out 0.1s both",
                        }}
                    >
                        Milton Liquinchana
                    </h1>

                    {/* Rol y especialidad */}
                    <p
                        style={{
                            fontSize: "clamp(1.25rem, 3.5vw, 2rem)",
                            fontWeight: 600,
                            marginBottom: "1.5rem",
                            animation: "hero-fade-in 0.8s ease-out 0.2s both",
                        }}
                    >
                        <span className="gradient-text">Programador de Software</span>
                        <span style={{ color: "var(--text-secondary)" }}> / Full Stack Developer</span>
                    </p>

                    {/* Propuesta de valor */}
                    <p
                        style={{
                            fontSize: "clamp(1rem, 2vw, 1.15rem)",
                            color: "var(--text-secondary)",
                            lineHeight: 1.7,
                            maxWidth: "580px",
                            marginBottom: "2.5rem",
                            animation: "hero-fade-in 0.8s ease-out 0.3s both",
                        }}
                    >
                        Desarrollo web full-stack con Java, Spring Boot, Node.js, React y Next.js,
                        respaldado por microservicios, bases de datos y despliegues automatizados.
                    </p>

                    {/* Botones de acción principales (CTA) */}
                    <div
                        style={{
                            display: "flex",
                            flexWrap: "wrap",
                            gap: "1rem",
                            animation: "hero-fade-in 0.8s ease-out 0.4s both",
                        }}
                    >
                        <Link href="#projects" className="btn-primary">
                            Ver proyectos
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </Link>
                        <Link href="#contact" className="btn-secondary">
                            Contactarme
                        </Link>
                    </div>

                    {/* Ubicación geográfica */}
                    <p
                        style={{
                            marginTop: "2.5rem",
                            fontSize: "0.85rem",
                            color: "var(--text-muted)",
                            display: "flex",
                            alignItems: "center",
                            gap: "0.4rem",
                            animation: "hero-fade-in 0.8s ease-out 0.5s both",
                        }}
                    >
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                            <path
                                d="M7 1a4 4 0 0 1 4 4c0 3-4 8-4 8S3 8 3 5a4 4 0 0 1 4-4Z"
                                stroke="currentColor"
                                strokeWidth="1.2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <circle cx="7" cy="5" r="1.2" stroke="currentColor" strokeWidth="1.2" />
                        </svg>
                        Cayambe, Ecuador
                    </p>
                </div>
            </div>

            {/* Indicador de desplazamiento (Scroll indicator) */}
            <div
                aria-hidden="true"
                style={{
                    position: "absolute",
                    bottom: "2rem",
                    left: "50%",
                    transform: "translateX(-50%)",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "0.375rem",
                    animation: "hero-fade-in 1s ease-out 1s both",
                }}
            >
                <span style={{ fontSize: "0.7rem", color: "var(--text-muted)", letterSpacing: "0.1em" }}>
                    SCROLL
                </span>
                <div
                    style={{
                        width: "1px",
                        height: "40px",
                        background: "linear-gradient(to bottom, var(--accent-teal), transparent)",
                        animation: "scroll-line 2s ease-in-out infinite",
                    }}
                />
            </div>
        </section>
    );
}
