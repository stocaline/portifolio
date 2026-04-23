import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTheme } from "../../context/ThemeContext";
import { PROJECTS } from "../../utils/data";
import { FiGithub } from "react-icons/fi";
import { ExternalLink } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const ProjectSection = () => {
    const { isDarkMode } = useTheme();
    const sectionRef = useRef(null);

    const accent = "var(--accent)";
    const bg = isDarkMode ? "#111827" : "#ffffff";
    const text = isDarkMode ? "#f9fafb" : "#111827";
    const sub = isDarkMode ? "#9ca3af" : "#6b7280";
    const card = isDarkMode ? "rgba(255,255,255,0.04)" : "#f8fafc";
    const cardBorder = isDarkMode ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)";

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(".projects-header", { opacity: 0, y: 40 }, {
                opacity: 1, y: 0, duration: 0.8, ease: "power3.out",
                scrollTrigger: { trigger: ".projects-header", start: "top 85%" }
            });
            document.querySelectorAll(".project-card").forEach((el, i) => {
                gsap.fromTo(el, { opacity: 0, y: 60 }, {
                    opacity: 1, y: 0, duration: 0.7, ease: "power3.out",
                    delay: i * 0.12,
                    scrollTrigger: { trigger: el, start: "top 88%" }
                });
            });
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    const onCardMove = (e, el) => {
        const rect = el.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width - 0.5) * 16;
        const y = ((e.clientY - rect.top) / rect.height - 0.5) * -16;
        el.style.transform = `perspective(800px) rotateX(${y}deg) rotateY(${x}deg) translateY(-6px)`;
        el.style.boxShadow = `${-x / 2}px ${y / 2 + 12}px 40px rgba(0,0,0,0.15)`;
    };
    const onCardLeave = (el) => {
        el.style.transform = "perspective(800px) rotateX(0) rotateY(0) translateY(0)";
        el.style.boxShadow = "none";
        el.style.transition = "transform 0.4s ease, box-shadow 0.4s ease";
        setTimeout(() => (el.style.transition = ""), 400);
    };

    return (
        <section
            id="projects"
            ref={sectionRef}
            style={{ background: bg, padding: "120px 40px" }}
        >
            <div style={{ maxWidth: 1200, margin: "0 auto" }}>
                {/* Header */}
                <div className="projects-header" style={{ marginBottom: 72 }}>
                    <div style={{
                        fontSize: 12, letterSpacing: "0.2em", textTransform: "uppercase",
                        color: accent, fontWeight: 600, marginBottom: 16,
                        fontFamily: "'DM Sans', sans-serif"
                    }}>
                        Trabalhos
                    </div>
                    <h2 style={{
                        fontFamily: "'Syne', sans-serif",
                        fontSize: "clamp(32px, 4vw, 52px)",
                        fontWeight: 700, color: text, lineHeight: 1.1, marginBottom: 16
                    }}>
                        Projetos <span style={{ color: accent }}>Selecionados</span>
                    </h2>
                    <p style={{ fontSize: 16, color: sub, fontWeight: 300, maxWidth: 480 }}>
                        Uma curadoria dos projetos que mais me orgulho — cada um resolve um problema real.
                    </p>
                </div>

                {/* Cards Grid */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 28 }}>
                    {PROJECTS.map((p) => (
                        <div
                            key={p.id}
                            className="project-card"
                            style={{
                                background: card, border: `1px solid ${cardBorder}`,
                                borderRadius: 20, overflow: "hidden",
                                cursor: "none", transition: "transform 0.1s ease"
                            }}
                            onMouseMove={e => { e.currentTarget.style.transition = ""; onCardMove(e, e.currentTarget); }}
                            onMouseLeave={e => onCardLeave(e.currentTarget)}
                        >
                            {/* Image */}
                            <div style={{ position: "relative", height: 220, overflow: "hidden" }}>
                                <img
                                    src={p.image}
                                    alt={p.title}
                                    style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s ease" }}
                                    onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.08)")}
                                    onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
                                />
                                {p.featured && (
                                    <div style={{
                                        position: "absolute", top: 16, left: 16,
                                        background: accent, color: "white",
                                        fontSize: 11, fontWeight: 600,
                                        letterSpacing: "0.1em", textTransform: "uppercase",
                                        padding: "4px 12px", borderRadius: 100
                                    }}>
                                        Destaque
                                    </div>
                                )}
                                {/* Action buttons */}
                                <div style={{ position: "absolute", top: 16, right: 16, display: "flex", gap: 8 }}>
                                    {[
                                        { href: p.githubUrl, icon: <FiGithub size={14} /> },
                                        { href: p.liveUrl, icon: <ExternalLink size={14} /> }
                                    ].map((btn, bi) => (
                                        <a
                                            key={bi}
                                            href={btn.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            style={{
                                                width: 36, height: 36, borderRadius: "50%",
                                                background: "rgba(0,0,0,0.6)", backdropFilter: "blur(8px)",
                                                display: "flex", alignItems: "center", justifyContent: "center",
                                                color: "white", textDecoration: "none",
                                                transition: "background 0.2s, transform 0.2s"
                                            }}
                                            onMouseEnter={e => { e.currentTarget.style.background = accent; e.currentTarget.style.transform = "scale(1.1)"; }}
                                            onMouseLeave={e => { e.currentTarget.style.background = "rgba(0,0,0,0.6)"; e.currentTarget.style.transform = "none"; }}
                                        >
                                            {btn.icon}
                                        </a>
                                    ))}
                                </div>
                            </div>

                            {/* Content */}
                            <div style={{ padding: "24px 24px 28px" }}>
                                <div style={{
                                    fontSize: 11, color: accent, fontWeight: 600,
                                    letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 10
                                }}>
                                    {p.category}
                                </div>
                                <h3 style={{
                                    fontFamily: "'Syne', sans-serif",
                                    fontSize: 20, fontWeight: 700, color: text, marginBottom: 12
                                }}>
                                    {p.title}
                                </h3>
                                <p style={{ fontSize: 14, color: sub, lineHeight: 1.7, marginBottom: 20, fontWeight: 300 }}>
                                    {p.description}
                                </p>
                                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                                    {p.tags.map(t => (
                                        <span key={t} style={{
                                            fontSize: 11, color: sub,
                                            background: isDarkMode ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.05)",
                                            padding: "4px 12px", borderRadius: 100, fontWeight: 500
                                        }}>
                                            {t}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* GitHub CTA */}
                <div style={{ textAlign: "center", marginTop: 56 }}>
                    <a
                        href="https://github.com/stocaline"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-secondary"
                        style={{
                            border: `1.5px solid ${isDarkMode ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.15)"}`,
                            color: text, display: "inline-flex", gap: 10
                        }}
                        onMouseEnter={e => { e.currentTarget.style.background = isDarkMode ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.04)"; }}
                        onMouseLeave={e => { e.currentTarget.style.background = "transparent"; }}
                    >
                        <FiGithub size={18} /> Ver todos no GitHub
                    </a>
                </div>
            </div>
        </section>
    );
};

export default ProjectSection;