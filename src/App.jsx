import { ThemeProvider } from "./context/ThemeContext";
import Navbar from "./components/Navbar";
import HeroSection from "./components/Sections/HeroSection";
import MarqueeSection from "./components/MarqueeSection";
import AboutSection from "./components/Sections/AboutSection";
import SkillSection from "./components/Sections/SkillSection";
import ProjectSection from "./components/Sections/ProjectSection";
import ContactSection from "./components/Sections/ContactSection";
import TestimonialsSection from "./components/Sections/TestimonialsSection";
import Footer from "./components/Footer";
import useGlobalGsap from "./hooks/useGlobalGsap";

const AppContent = () => {
    useGlobalGsap();
    return (
        <>
            <Navbar />
            <HeroSection />
            <MarqueeSection />
            <AboutSection />
            <SkillSection />
            <ProjectSection />
            <TestimonialsSection />
            <ContactSection />
            <Footer />
        </>
    );
};

const App = () => (
    <ThemeProvider>
        <AppContent />
    </ThemeProvider>
);

export default App;