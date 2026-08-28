import Navbar from "./ui/components/Navbar";
import HeroSection from "./ui/components/HeroSection";
import AboutSection from "./ui/components/AboutSection";
import StackSection from "./ui/components/StackSection";
import ProjectsSection from "./ui/components/ProjectsSection";
import ExperienceSection from "./ui/components/ExperienceSection";
import EducationSection from "./ui/components/EducationSection";
import ContactSection from "./ui/components/ContactSection";
import Footer from "./ui/components/Footer";
import { ToastContainer } from "react-toastify";

/**
 * Componente Principal (Page)
 * 
 * Orquesta y renderiza todas las secciones del portafolio en secuencia vertical.
 * 
 * @returns {JSX.Element} Vista principal landing del portafolio.
 */
export default function Page() {
    return (
        <>
            {/* Barra de navegación superior persistente */}
            <Navbar />

            {/* Contenido principal de la página */}
            <main id="main-content">
                {/* Sección 1: Presentación principal */}
                <HeroSection />

                {/* Sección 2: Biografía y resumen profesional */}
                <AboutSection />

                {/* Sección 3: Stack tecnológico y herramientas */}
                <StackSection />

                {/* Sección 4: Catálogo de proyectos destacados */}
                <ProjectsSection />

                {/* Sección 5: Historial de experiencia laboral */}
                <ExperienceSection />

                {/* Sección 6: Formación académica y capacitaciones */}
                <EducationSection />

                {/* Sección 7: Formulario de contacto directo */}
                <ContactSection />
            </main>

            {/* Pie de página estático */}
            <Footer />
            <ToastContainer/>
        </>
    );
}
