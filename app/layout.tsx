import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./ui/css/Global.css";
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

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
  authors: [{ name: "Milton Liquinchana", url: "mailto:liquinchana@hotmail.es" }],
  openGraph: {
    title: "Milton Liquinchana | Full Stack Developer",
    description:
      "Full Stack Developer — Backend robusto, frontend moderno, CI/CD y buenas prácticas. Cayambe, Ecuador.",
    type: "website",
    locale: "es_EC",
  },
};

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
