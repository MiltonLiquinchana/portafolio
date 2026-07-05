import Link from "next/link";

/**
 * @function Footer
 * @description Pie de página estático con derechos de autor e información complementaria.
 * 
 * WHY: Se abstrae de la estructura general para poder inyectarlo fácilmente en `layout.tsx` 
 * o en páginas individuales sin ensuciar el código del contenedor principal.
 */
export default function Footer() {
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
        {/* Logo + copyright */}
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

        {/* Right side */}
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
