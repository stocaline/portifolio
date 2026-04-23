import { useEffect, useRef } from "react";
import { Mail, Download } from "lucide-react";
import { FiGithub, FiLinkedin } from "react-icons/fi";
import { useTheme } from "../../context/ThemeContext";
import PROFILE_PIC from "../../assets/images/profile-img1.png";
import PROFILE_PIC_DARK from "../../assets/images/profile-img3.png";
import CURRICULO_PDF from "../../assets/pdfs/curriculo.pdf";
import { gsap } from "gsap";

const HeroSection = () => {
    const { isDarkMode } = useTheme();
    const sectionRef = useRef(null);
    const tlRef = useRef(null);

    const accent = "var(--accent)";
    const bg = isDarkMode ? "#030712" : "#f9fafb";
    const text = isDarkMode ? "#f9fafb" : "#111827";
    const sub = isDarkMode ? "#9ca3af" : "#6b7280";
    const imgSrc = isDarkMode ? PROFILE_PIC_DARK : PROFILE_PIC;

    const scrollToSection = (id) => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    };

    // Social links
    const socialLinks = [
        { icon: <FiGithub size={18} />, href: "https://github.com/stocaline", label: "GitHub" },
        { icon: <FiLinkedin size={18} />, href: "https://www.linkedin.com/in/richard-de-souza-bercheli/", label: "LinkedIn" },
        { icon: <Mail size={18} />, href: "mailto:richardbercheli@gmail.com", label: "Email" },
    ];

    useEffect(() => {
        // GSAP entrance animation
        const tl = gsap.timeline({ delay: 0.15 });
        tl.fromTo(".hero-eyebrow", { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" })
            .fromTo(".hero-word", { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.08, ease: "power3.out" }, "-=0.3")
            .fromTo(".hero-desc", { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }, "-=0.3")
            .fromTo(".hero-ctas", { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }, "-=0.3")
            .fromTo(".hero-social", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }, "-=0.3")
            .fromTo(".hero-image", { opacity: 0, x: 60 }, { opacity: 1, x: 0, duration: 0.9, ease: "power3.out" }, 0.2)
            .fromTo(".hero-scroll-indicator", { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }, "-=0.2");

        tlRef.current = tl;
        return () => tl.kill();
    }, []);

    const titleLines = [
        { text: "Construindo", highlight: false },
        { text: "experiências", highlight: true },
        { text: "que importam.", highlight: false },
    ];

    return (
        <section
            id="home"
            ref={sectionRef}
            style={{
                minHeight: "100vh",
                background: bg,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
                padding: "80px 40px 60px",
                overflow: "hidden"
            }}
        >
            {/* Parallax blobs */}
            <div style={{
                position: "absolute", top: "10%", right: "10%",
                width: 500, height: 500, borderRadius: "50%",
                background: accent, opacity: 0.07, filter: "blur(90px)",
                animation: "pulse 8s ease-in-out infinite", willChange: "transform"
            }} />
            <div style={{
                position: "absolute", bottom: "15%", left: "5%",
                width: 350, height: 350, borderRadius: "50%",
                background: "#a855f7", opacity: 0.06, filter: "blur(80px)",
                animation: "pulse 10s 2s ease-in-out infinite", willChange: "transform"
            }} />

            <div style={{
                maxWidth: 1200, margin: "0 auto", width: "100%",
                display: "grid", gridTemplateColumns: "1fr auto",
                gap: 80, alignItems: "center", position: "relative", zIndex: 1
            }}>
                {/* Left content */}
                <div>
                    <div className="hero-eyebrow" style={{
                        fontSize: 12, letterSpacing: "0.2em", textTransform: "uppercase",
                        color: accent, fontWeight: 600, marginBottom: 24
                    }}>
                        Engenheiro de Software
                    </div>

                    {/* Word-split title */}
                    <h1 style={{
                        fontFamily: "'Syne', sans-serif",
                        fontSize: "clamp(42px, 6vw, 80px)",
                        fontWeight: 700, lineHeight: 1.05,
                        color: text, marginBottom: 28
                    }}>
                        {titleLines.map((line, li) => (
                            <span key={li} style={{ display: "block" }}>
                                {line.text.split(" ").map((word, wi) => (
                                    <span key={wi} className="word-wrap" style={{ marginRight: "0.25em" }}>
                                        <span
                                            className="hero-word"
                                            style={{ color: line.highlight ? accent : "inherit" }}
                                        >
                                            {word}
                                        </span>
                                    </span>
                                ))}
                            </span>
                        ))}
                    </h1>

                    <p className="hero-desc" style={{
                        fontSize: 18, lineHeight: 1.7, color: sub,
                        maxWidth: 500, marginBottom: 40, fontWeight: 300
                    }}>
                        Projeto e construo sistemas de software robustos — do levantamento de requisitos ao deploy em produção — com foco em qualidade, escalabilidade e experiência do usuário.
                    </p>

                    <div className="hero-ctas" style={{ display: "flex", gap: 16, marginBottom: 48, flexWrap: "wrap" }}>
                        <a
                            href={CURRICULO_PDF}
                            download="Richard_Bercheli_CV.pdf"
                            className="btn-primary"
                            style={{ display: "inline-flex", alignItems: "center", gap: 8, textDecoration: "none" }}
                        >
                            <Download size={16} />
                            Baixar CV
                        </a>
                        <button
                            onClick={() => scrollToSection("contact")}
                            className="btn-secondary"
                            style={{
                                border: `1.5px solid ${isDarkMode ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.15)"}`,
                                color: text
                            }}
                        >
                            Entrar em Contato
                        </button>
                    </div>

                    <div className="hero-social" style={{ display: "flex", gap: 12, alignItems: "center" }}>
                        {socialLinks.map((s) => (
                            <a
                                key={s.label}
                                href={s.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="social-btn"
                                style={{
                                    width: 44, height: 44, borderRadius: "50%",
                                    display: "flex", alignItems: "center", justifyContent: "center",
                                    background: isDarkMode ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.05)",
                                    color: sub, textDecoration: "none", transition: "all 0.25s ease"
                                }}
                                onMouseEnter={e => {
                                    e.currentTarget.style.background = "var(--accent)";
                                    e.currentTarget.style.color = "white";
                                    e.currentTarget.style.transform = "translateY(-4px) scale(1.1)";
                                }}
                                onMouseLeave={e => {
                                    e.currentTarget.style.background = isDarkMode ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.05)";
                                    e.currentTarget.style.color = sub;
                                    e.currentTarget.style.transform = "none";
                                }}
                            >
                                {s.icon}
                            </a>
                        ))}
                    </div>
                </div>

                {/* Profile image */}
                <div className="hero-image" style={{ position: "relative" }}>
                    <div style={{ position: "relative", width: 320, height: 400 }}>
                        <div style={{
                            position: "absolute", inset: -16, borderRadius: 28,
                            border: "1px solid rgba(59,130,246,0.13)",
                            animation: "spin 20s linear infinite"
                        }} />
                        <div style={{
                            position: "absolute", inset: -32, borderRadius: 36,
                            border: "1px solid rgba(168,85,247,0.1)",
                            animation: "spinReverse 25s linear infinite"
                        }} />
                        <img
                            src={imgSrc}
                            alt="Richard Bercheli"
                            style={{
                                width: "100%", height: "100%", objectFit: "cover",
                                borderRadius: 20,
                                border: `3px solid ${isDarkMode ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)"}`
                            }}
                        />
                        {/* Available badge */}
                        <div style={{
                            position: "absolute", bottom: -20, left: -20,
                            background: isDarkMode ? "#1f2937" : "white",
                            borderRadius: 16, padding: "12px 20px",
                            boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
                            display: "flex", alignItems: "center", gap: 10,
                            animation: "floatBadge 3s ease-in-out infinite"
                        }}>
                            <div style={{
                                width: 10, height: 10, borderRadius: "50%",
                                background: "#22c55e", boxShadow: "0 0 10px #22c55e"
                            }} />
                            <span style={{ fontSize: 13, fontWeight: 600, color: isDarkMode ? "#f9fafb" : "#111827" }}>
                                Disponível para projetos
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Scroll indicator */}
            <div
                className="hero-scroll-indicator"
                style={{
                    position: "absolute", bottom: 32, left: "50%",
                    transform: "translateX(-50%)", color: sub, cursor: "none",
                    display: "flex", flexDirection: "column", alignItems: "center", gap: 8
                }}
                onClick={() => scrollToSection("about")}
            >
                <span style={{ fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", fontWeight: 500 }}>
                    Scroll
                </span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                    <path d="M12 5v14M5 12l7 7 7-7" />
                </svg>
            </div>
        </section>
    );
};

export default HeroSection;