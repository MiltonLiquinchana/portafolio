"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const NAV_LINKS = [
  { href: "#about", label: "Sobre mí" },
  { href: "#stack", label: "Stack" },
  { href: "#projects", label: "Proyectos" },
  { href: "#experience", label: "Experiencia" },
  { href: "#contact", label: "Contacto" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header
      role="banner"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        transition: "background 0.4s ease, border-color 0.4s ease, backdrop-filter 0.4s ease",
        background: scrolled ? "rgba(10,10,10,0.85)" : "transparent",
        borderBottom: scrolled ? "1px solid var(--border-subtle)" : "1px solid transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(16px)" : "none",
      }}
    >
      <div
        className="container"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: "64px",
        }}
      >
        {/* Logo */}
        <Link
          href="#hero"
          aria-label="Inicio — Milton Liquinchana"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "40px",
            height: "40px",
            background: "linear-gradient(135deg, var(--accent-teal), #00a8ff)",
            borderRadius: "10px",
            fontWeight: 800,
            fontSize: "0.95rem",
            letterSpacing: "-0.04em",
            color: "var(--bg-primary)",
            textDecoration: "none",
            flexShrink: 0,
          }}
        >
          ML
        </Link>

        {/* Desktop Nav */}
        <nav
          aria-label="Navegación principal"
          style={{
            display: "flex",
            gap: "2rem",
            alignItems: "center",
          }}
          className="hidden-mobile"
        >
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              style={{
                fontSize: "0.875rem",
                fontWeight: 500,
                color: "var(--text-secondary)",
                textDecoration: "none",
                transition: "color 0.2s ease",
                letterSpacing: "0.01em",
              }}
              onMouseEnter={(e) =>
                ((e.target as HTMLElement).style.color = "var(--text-primary)")
              }
              onMouseLeave={(e) =>
                ((e.target as HTMLElement).style.color = "var(--text-secondary)")
              }
            >
              {label}
            </Link>
          ))}
          <Link
            href="#contact"
            className="btn-primary"
            style={{ padding: "0.5rem 1.25rem", fontSize: "0.875rem" }}
          >
            Contratarme
          </Link>
        </nav>

        {/* Mobile hamburger */}
        <button
          aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen(!menuOpen)}
          className="show-mobile"
          style={{
            background: "transparent",
            border: "none",
            cursor: "pointer",
            padding: "0.5rem",
            color: "var(--text-primary)",
            display: "none",
          }}
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 22 22"
            fill="none"
            aria-hidden="true"
          >
            {menuOpen ? (
              <>
                <line x1="2" y1="2" x2="20" y2="20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <line x1="20" y1="2" x2="2" y2="20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </>
            ) : (
              <>
                <line x1="2" y1="6" x2="20" y2="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <line x1="2" y1="11" x2="20" y2="11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <line x1="2" y1="16" x2="20" y2="16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <nav
          id="mobile-menu"
          aria-label="Menú móvil"
          style={{
            background: "rgba(10,10,10,0.97)",
            borderTop: "1px solid var(--border-subtle)",
            padding: "1.5rem",
            display: "flex",
            flexDirection: "column",
            gap: "1.25rem",
          }}
        >
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={closeMenu}
              style={{
                fontSize: "1rem",
                fontWeight: 500,
                color: "var(--text-secondary)",
                textDecoration: "none",
              }}
            >
              {label}
            </Link>
          ))}
          <Link
            href="#contact"
            onClick={closeMenu}
            className="btn-primary"
            style={{ textAlign: "center" }}
          >
            Contratarme
          </Link>
        </nav>
      )}

    </header>
  );
}
