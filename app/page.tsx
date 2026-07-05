import Navbar from "./ui/components/Navbar";
import HeroSection from "./ui/components/HeroSection";
import AboutSection from "./ui/components/AboutSection";
import StackSection from "./ui/components/StackSection";
import ProjectsSection from "./ui/components/ProjectsSection";
import ExperienceSection from "./ui/components/ExperienceSection";
import EducationSection from "./ui/components/EducationSection";
import ContactSection from "./ui/components/ContactSection";
import Footer from "./ui/components/Footer";
export default function Page() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <HeroSection />
        <AboutSection />
        <StackSection />
        <ProjectsSection />
        <ExperienceSection />
        <EducationSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
