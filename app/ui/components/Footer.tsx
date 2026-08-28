import Link from "next/link";

// =============================================================================
// COMPONENT
// =============================================================================

/**
 * Componente Footer
 * 
 * Pie de página estático con derechos de autor e información complementaria.
 * 
 * CARACTERÍSTICAS:
 * - Semántica HTML5: Utiliza `<footer role="contentinfo">`.
 * - Año Dinámico: Calcula el año actual mediante `new Date().getFullYear()`.
 * - Enlace a Inicio: Logo interactivo que desplaza al usuario al Hero.
 * 
 * @returns {JSX.Element} Pie de página de la aplicación.
 */
export default function Footer() {
    // Año actual dinámico para el copyright
    const year = new Date().getFullYear();

    return (
        <footer
            role="contentinfo"
            style={{
                borderTop: "1px solid var(--border-subtle)",
                background: "#060a10",
                padding: "2rem 0",
            }}
        >
            <div
                className="container"
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    flexWrap: "wrap",
                    gap: "1rem",
                }}
            >
                {/* Logo e información de copyright */}
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.75rem",
                    }}
                >
                    <Link
                        href="#hero"
                        aria-label="Volver al inicio"
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            width: "32px",
                            height: "32px",
                            background: "linear-gradient(135deg, var(--accent-teal), #00a8ff)",
                            borderRadius: "8px",
                            fontWeight: 800,
                            fontSize: "0.75rem",
                            letterSpacing: "-0.04em",
                            color: "var(--bg-primary)",
                            textDecoration: "none",
                            flexShrink: 0,
                        }}
                    >
                        ML
                    </Link>
                    <p
                        style={{
                            fontSize: "0.8rem",
                            color: "var(--text-muted)",
                        }}
                    >
                        © {year} Milton Liquinchana. Todos los derechos reservados.
                    </p>
                </div>

                {/* Crédito de ubicación y autoría */}
                <p
                    style={{
                        fontSize: "0.8rem",
                        color: "var(--text-muted)",
                        display: "flex",
                        alignItems: "center",
                        gap: "0.35rem",
                    }}
                >
                    Hecho con
                    <span style={{ color: "#e53e3e" }} aria-label="amor">
                        ♥
                    </span>
                    en Cayambe, Ecuador
                </p>
            </div>
        </footer>
    );
}
