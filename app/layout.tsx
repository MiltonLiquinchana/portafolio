import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./ui/css/Global.css";

// Configuración de la fuente Inter con subconjuntos y variable CSS
const inter = Inter({
    variable: "--font-inter",
    subsets: ["latin"],
    display: "swap",
});

/**
 * Metadatos globales de la aplicación para SEO y OpenGraph
 */
export const metadata: Metadata = {
    title: "Milton Liquinchana | Full Stack Developer",
    description:
        "Portafolio profesional de Milton Liquinchana — Full Stack Developer con experiencia en Java, Spring Boot, Node.js, React, Next.js, AWS y DevOps. Basado en Cayambe, Ecuador.",
    keywords: [
        "Full Stack Developer",
        "Milton Liquinchana",
        "Java",
        "Spring Boot",
        "Node.js",
        "React",
        "Next.js",
        "AWS",
        "Ecuador",
    ],
    authors: [{ name: "Milton Liquinchana", url: "mailto:mi100070n2019@outlook.com" }],
    openGraph: {
        title: "Milton Liquinchana | Full Stack Developer",
        description:
            "Full Stack Developer — Backend robusto, frontend moderno, CI/CD y buenas prácticas. Cayambe, Ecuador.",
        type: "website",
        locale: "es_EC",
    },
};

/**
 * Componente RootLayout
 * 
 * Layout raíz que envuelve todas las páginas de la aplicación Next.js.
 * Configura la fuente global, idioma del documento y contenedores HTML base.
 * 
 * @param {Readonly<{ children: React.ReactNode }>} props - Hijos de la jerarquía de páginas
 * @returns {JSX.Element} Estructura HTML raíz.
 */
export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="es" className={`${inter.variable} h-full`}>
            <body className="min-h-full">{children}</body>
            
        </html>
    );
}
