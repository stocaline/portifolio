import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon, Menu, X } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import LOGO from "../assets/images/logo.png";

const Navbar = () => {
    const { isDarkMode, toggleDarkMode } = useTheme();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const fn = () => setScrolled(window.scrollY > 40);
        window.addEventListener("scroll", fn, { passive: true });
        return () => window.removeEventListener("scroll", fn);
    }, []);

    const menuItems = [
        { id: "home", text: "Início" },
        { id: "about", text: "Sobre" },
        { id: "skills", text: "Skills" },
        { id: "projects", text: "Projetos" },
        { id: "contact", text: "Contato" },
    ];

    const scrollToSection = (sectionId) => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
        setIsMenuOpen(false);
    };

    const navBg = isDarkMode
        ? scrolled ? "rgba(3,7,18,0.9)" : "transparent"
        : scrolled ? "rgba(249,250,251,0.9)" : "transparent";
    const textColor = isDarkMode ? "#e5e7eb" : "#374151";
    const borderColor = isDarkMode ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)";

    return (
        <nav style={{
            position: "fixed", top: 0, left: 0, right: 0, zIndex: 500,
            background: navBg,
            backdropFilter: scrolled ? "blur(20px)" : "none",
            borderBottom: scrolled ? `1px solid ${borderColor}` : "none",
            transition: "all 0.4s ease",
            padding: "12px 40px",
            fontFamily: "'DM Sans', sans-serif"
        }}>
            <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                {/* Logo */}
                <div style={{ cursor: "none" }} onClick={() => scrollToSection("home")}>
                    <img
                        src={LOGO}
                        alt="RSB"
                        style={{
                            width: 36, height: 36, objectFit: "contain"
                        }}
                    />
                </div>

                {/* Desktop Nav */}
                <div className="desktop-nav" style={{ display: "flex", gap: 40, alignItems: "center" }}>
                    {menuItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => scrollToSection(item.id)}
                            className="nav-link"
                            style={{
                                background: "none", border: "none", color: textColor,
                                fontFamily: "'DM Sans', sans-serif", fontWeight: 500, fontSize: 14, padding: 0
                            }}
                        >
                            {item.text}
                        </button>
                    ))}
                </div>

                {/* Right side */}
                <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                    <button
                        onClick={() => toggleDarkMode(isDarkMode ? "light" : "dark")}
                        style={{
                            background: isDarkMode ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.06)",
                            border: "none", borderRadius: "50%", width: 38, height: 38,
                            display: "flex", alignItems: "center", justifyContent: "center",
                            cursor: "none", color: textColor, transition: "all 0.2s"
                        }}
                    >
                        {isDarkMode ? <Sun size={16} /> : <Moon size={16} />}
                    </button>

                    {/* Mobile hamburger */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="md:hidden"
                        style={{
                            background: isDarkMode ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.06)",
                            border: "none", borderRadius: "50%", width: 38, height: 38,
                            display: "none", alignItems: "center", justifyContent: "center",
                            cursor: "none", color: textColor
                        }}
                    >
                        {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
                    </button>

                    <button
                        onClick={() => scrollToSection("contact")}
                        className="btn-primary"
                        style={{ padding: "10px 22px", fontSize: 12 }}
                    >
                        Contato
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        style={{
                            marginTop: 12, padding: 20, borderRadius: 16,
                            background: isDarkMode ? "#1f2937" : "#ffffff",
                            border: `1px solid ${borderColor}`
                        }}
                    >
                        {menuItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => scrollToSection(item.id)}
                                style={{
                                    display: "block", width: "100%", textAlign: "left",
                                    padding: "10px 0", background: "none", border: "none",
                                    color: textColor, fontFamily: "'DM Sans', sans-serif",
                                    fontSize: 14, fontWeight: 500, cursor: "none",
                                    borderBottom: `1px solid ${borderColor}`
                                }}
                            >
                                {item.text}
                            </button>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;