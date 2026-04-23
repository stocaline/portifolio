import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Mail, ArrowUp, Heart } from "lucide-react";
import { FiGithub, FiLinkedin } from "react-icons/fi";
import { useTheme } from "../context/ThemeContext";
import LOGO from "../assets/images/logo.png";

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
    const { isDarkMode } = useTheme();
    const footerRef = useRef(null);

    const bg = isDarkMode ? "#030712" : "#f1f5f9";
    const text = isDarkMode ? "#f9fafb" : "#111827";
    const sub = isDarkMode ? "#6b7280" : "#9ca3af";
    const border = isDarkMode ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.08)";
    const accent = "var(--accent)";

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(".footer-content", { opacity: 0, y: 30 }, {
                opacity: 1, y: 0, duration: 0.8, ease: "power3.out",
                scrollTrigger: { trigger: ".footer-content", start: "top 92%" }
            });
        }, footerRef);
        return () => ctx.revert();
    }, []);

    const social = [
        { icon: FiGithub, url: "https://github.com/stocaline", label: "GitHub" },
        { icon: FiLinkedin, url: "https://www.linkedin.com/in/richard-de-souza-bercheli/", label: "LinkedIn" },
        { icon: Mail, url: "mailto:richardbercheli@gmail.com", label: "Email" },
    ];

    return (
        <footer
            ref={footerRef}
            style={{
                background: bg,
                borderTop: `1px solid ${border}`,
                padding: "60px 40px 36px",
                fontFamily: "'DM Sans', sans-serif"
            }}
        >
            <div className="footer-content" style={{ maxWidth: 1200, margin: "0 auto" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 48, marginBottom: 48 }}>
                    {/* Brand */}
                    <div>
                        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                            <img src={LOGO} alt="RSB" style={{ width: 32 }} />
                            <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, color: text, fontSize: 16 }}>
                                Richard Bercheli
                            </span>
                        </div>
                        <p style={{ fontSize: 13, color: sub, lineHeight: 1.7, fontWeight: 300 }}>
                            Criando experiências digitais com paixão, precisão e um toque de mágica.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <div style={{ fontSize: 12, letterSpacing: "0.15em", textTransform: "uppercase", color: accent, fontWeight: 600, marginBottom: 20 }}>
                            Navegação
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                            {["Sobre", "Skills", "Projetos", "Contato"].map((item) => (
                                <button
                                    key={item}
                                    onClick={() => document.getElementById(item.toLowerCase())?.scrollIntoView({ behavior: "smooth" })}
                                    style={{
                                        background: "none", border: "none", cursor: "none",
                                        textAlign: "left", fontSize: 14, color: sub,
                                        fontFamily: "'DM Sans', sans-serif", padding: 0,
                                        transition: "color 0.2s"
                                    }}
                                    onMouseEnter={e => (e.currentTarget.style.color = accent)}
                                    onMouseLeave={e => (e.currentTarget.style.color = sub)}
                                >
                                    {item}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Social */}
                    <div>
                        <div style={{ fontSize: 12, letterSpacing: "0.15em", textTransform: "uppercase", color: accent, fontWeight: 600, marginBottom: 20 }}>
                            Contato
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                            {social.map((s) => (
                                <a
                                    key={s.label}
                                    href={s.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{
                                        display: "flex", alignItems: "center", gap: 10,
                                        color: sub, textDecoration: "none", fontSize: 14,
                                        transition: "color 0.2s"
                                    }}
                                    onMouseEnter={e => (e.currentTarget.style.color = accent)}
                                    onMouseLeave={e => (e.currentTarget.style.color = sub)}
                                >
                                    <s.icon size={16} /> {s.label}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Bottom row */}
                <div style={{
                    borderTop: `1px solid ${border}`, paddingTop: 24,
                    display: "flex", justifyContent: "space-between", alignItems: "center"
                }}>
                    <p style={{ fontSize: 12, color: sub }}>
                        © {new Date().getFullYear()} Richard Bercheli — Todos os direitos reservados.
                    </p>
                    <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
                        <span style={{ fontSize: 12, color: sub, display: "flex", alignItems: "center", gap: 6 }}>
                            Feito com <Heart size={12} fill="currentColor" style={{ color: "#ef4444" }} /> &amp; GSAP
                        </span>
                        <button
                            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                            style={{
                                width: 36, height: 36, borderRadius: "50%", border: `1px solid ${border}`,
                                background: "none", cursor: "none", color: sub,
                                display: "flex", alignItems: "center", justifyContent: "center",
                                transition: "all 0.2s"
                            }}
                            onMouseEnter={e => { e.currentTarget.style.background = accent; e.currentTarget.style.color = "white"; e.currentTarget.style.borderColor = accent; }}
                            onMouseLeave={e => { e.currentTarget.style.background = "none"; e.currentTarget.style.color = sub; e.currentTarget.style.borderColor = border; }}
                        >
                            <ArrowUp size={16} />
                        </button>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;