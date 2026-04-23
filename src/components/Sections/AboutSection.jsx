import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTheme } from "../../context/ThemeContext";
import { JOURNEY_STEPS, STATS } from "../../utils/data";
import PROFILE_PIC from "../../assets/images/profile-img1.png";
import PROFILE_PIC_DARK from "../../assets/images/profile-img3.png";

gsap.registerPlugin(ScrollTrigger);

// Map Tailwind color class → hex to match the reference HTML
const COLOR_MAP = {
    "bg-blue-500": "#3b82f6",
    "bg-red-500": "#ef4444",
    "bg-green-500": "#22c55e",
    "bg-orange-500": "#f97316",
    "bg-purple-500": "#a855f7",
};

const parseNum = (str) => { const m = str.match(/^(\d+)/); return m ? parseInt(m[1]) : 0; };
const getSuffix = (str) => str.replace(/^\d+/, "");

const AboutSection = () => {
    const { isDarkMode } = useTheme();
    const sectionRef = useRef(null);
    const imgSrc = isDarkMode ? PROFILE_PIC_DARK : PROFILE_PIC;

    const accent = "var(--accent)";
    const bg = isDarkMode ? "#111827" : "#ffffff";
    const text = isDarkMode ? "#f9fafb" : "#111827";
    const sub = isDarkMode ? "#9ca3af" : "#6b7280";
    const card = isDarkMode ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.02)";
    const cardBorder = isDarkMode ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)";

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Header
            gsap.fromTo(".about-header", { opacity: 0, y: 40 }, {
                opacity: 1, y: 0, duration: 0.8, ease: "power3.out",
                scrollTrigger: { trigger: ".about-header", start: "top 85%" }
            });

            // Mission card
            const aboutCard = sectionRef.current?.querySelector(".about-card");
            if (aboutCard) {
                gsap.fromTo(aboutCard, { opacity: 0, y: 40 }, {
                    opacity: 1, y: 0, duration: 0.8, ease: "power3.out",
                    scrollTrigger: { trigger: aboutCard, start: "top 85%" }
                });
            }

            // Stats counter
            sectionRef.current?.querySelectorAll(".stat-card").forEach((card, i) => {
                const target = parseInt(card.dataset.target);
                const suffix = card.dataset.suffix;
                const numEl = card.querySelector(".stat-num");
                gsap.fromTo(card, { opacity: 0, y: 30 }, {
                    opacity: 1, y: 0, duration: 0.6, ease: "power3.out", delay: i * 0.08,
                    scrollTrigger: {
                        trigger: card, start: "top 88%",
                        onEnter: () => {
                            gsap.to({ val: 0 }, {
                                val: target, duration: 1.5, ease: "power2.out",
                                onUpdate: function () { numEl.textContent = Math.round(this.targets()[0].val) + suffix; }
                            });
                        }
                    }
                });
            });

            // Timeline title
            const timelineTitle = sectionRef.current?.querySelector(".timeline-title");
            if (timelineTitle) {
                gsap.fromTo(timelineTitle, { opacity: 0, x: -30 }, {
                    opacity: 1, x: 0, duration: 0.7, ease: "power3.out",
                    scrollTrigger: { trigger: timelineTitle, start: "top 85%" }
                });
            }

            // Timeline line scale
            const timelineLine = sectionRef.current?.querySelector(".timeline-line");
            if (timelineLine) {
                gsap.fromTo(timelineLine, { scaleY: 0 }, {
                    scaleY: 1, duration: 1.2, ease: "power2.inOut",
                    scrollTrigger: { trigger: "#about", start: "top 60%" }
                });
            }

            // Timeline items
            sectionRef.current?.querySelectorAll(".timeline-item").forEach((item, i) => {
                gsap.fromTo(item, { opacity: 0, x: 30 }, {
                    opacity: 1, x: 0, duration: 0.6, ease: "power3.out", delay: i * 0.12,
                    scrollTrigger: { trigger: item, start: "top 88%" }
                });
            });
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    return (
        <section
            id="about"
            ref={sectionRef}
            style={{ background: bg, padding: "120px 40px", position: "relative", overflow: "hidden" }}
        >
            <div style={{ maxWidth: 1200, margin: "0 auto" }}>
                {/* Header */}
                <div className="about-header" style={{ marginBottom: 80 }}>
                    <div style={{
                        fontSize: 12, letterSpacing: "0.2em", textTransform: "uppercase",
                        color: accent, fontWeight: 600, marginBottom: 16,
                        fontFamily: "'DM Sans', sans-serif"
                    }}>
                        Sobre mim
                    </div>
                    <h2 style={{
                        fontFamily: "'Syne', sans-serif",
                        fontSize: "clamp(32px, 4vw, 52px)",
                        fontWeight: 700, color: text, lineHeight: 1.1
                    }}>
                        Engenheiro de software<br />
                        <span style={{ color: accent }}>apaixonado por tecnologia.</span>
                    </h2>
                </div>

                {/* Two-column layout: left = mission card + stats, right = timeline */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "start" }}>

                    {/* LEFT COLUMN */}
                    <div>
                        {/* Mission card */}
                        <div
                            className="about-card"
                            style={{
                                background: card, border: `1px solid ${cardBorder}`,
                                borderRadius: 20, padding: 36, marginBottom: 28, opacity: 0
                            }}
                        >
                            <h3 style={{ fontFamily: "'Syne', sans-serif", fontSize: 22, fontWeight: 600, color: text, marginBottom: 20 }}>
                                Minha missão
                            </h3>
                            <p style={{ fontSize: 16, lineHeight: 1.8, color: sub, marginBottom: 16, fontWeight: 300 }}>
                                Acredito que a tecnologia deve ser uma ponte que conecta pessoas e resolve problemas reais. Minha paixão é criar experiências digitais que não sejam apenas funcionais, mas também encantadoras e acessíveis.
                            </p>
                            <p style={{ fontSize: 15, lineHeight: 1.8, color: isDarkMode ? "#6b7280" : "#9ca3af", fontWeight: 300 }}>
                                Quando não estou codificando, estou estudando engenharia de sistemas, contribuindo com projetos open source ou explorando padrões de arquitetura de software.
                            </p>
                        </div>

                        {/* Stats 2×2 grid */}
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                            {STATS.map((stat, i) => (
                                <div
                                    key={stat.label}
                                    className="stat-card"
                                    data-target={parseNum(stat.number)}
                                    data-suffix={getSuffix(stat.number)}
                                    style={{
                                        background: card, border: `1px solid ${cardBorder}`,
                                        borderRadius: 16, padding: "24px 20px", textAlign: "center",
                                        transition: "border-color 0.2s, transform 0.2s",
                                        opacity: 0
                                    }}
                                    onMouseEnter={e => {
                                        e.currentTarget.style.borderColor = "var(--accent)55";
                                        e.currentTarget.style.transform = "translateY(-4px)";
                                    }}
                                    onMouseLeave={e => {
                                        e.currentTarget.style.borderColor = cardBorder;
                                        e.currentTarget.style.transform = "none";
                                    }}
                                >
                                    <div
                                        className="stat-num"
                                        style={{
                                            fontFamily: "'Syne', sans-serif",
                                            fontSize: 40, fontWeight: 800, color: accent, lineHeight: 1
                                        }}
                                    >
                                        0{getSuffix(stat.number)}
                                    </div>
                                    <div style={{ fontSize: 13, color: sub, marginTop: 8, fontWeight: 500 }}>
                                        {stat.label}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* RIGHT COLUMN — Timeline */}
                    <div>
                        <h3
                            className="timeline-title"
                            style={{
                                fontFamily: "'Syne', sans-serif",
                                fontSize: 22, fontWeight: 600, color: text, marginBottom: 36,
                                opacity: 0
                            }}
                        >
                            Jornada Profissional
                        </h3>
                        <div style={{ position: "relative" }}>
                            {/* Vertical line */}
                            <div
                                className="timeline-line"
                                style={{
                                    position: "absolute", left: 20, top: 8, bottom: 8, width: 1,
                                    background: isDarkMode ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)",
                                    transformOrigin: "top", scaleY: 0
                                }}
                            />
                            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                                {JOURNEY_STEPS.map((step, i) => {
                                    const color = COLOR_MAP[step.color] ?? "#3b82f6";
                                    return (
                                        <div
                                            key={i}
                                            className="timeline-item"
                                            style={{ display: "flex", gap: 24, position: "relative", opacity: 0 }}
                                        >
                                            {/* Colored circle dot */}
                                            <div
                                                style={{
                                                    width: 40, height: 40, borderRadius: "50%",
                                                    background: color, flexShrink: 0,
                                                    display: "flex", alignItems: "center", justifyContent: "center",
                                                    fontSize: 12, color: "white", fontWeight: 700, zIndex: 1,
                                                    transition: "transform 0.2s, box-shadow 0.2s"
                                                }}
                                                onMouseEnter={e => {
                                                    e.currentTarget.style.transform = "scale(1.15)";
                                                    e.currentTarget.style.boxShadow = `0 0 20px ${color}66`;
                                                }}
                                                onMouseLeave={e => {
                                                    e.currentTarget.style.transform = "none";
                                                    e.currentTarget.style.boxShadow = "none";
                                                }}
                                            >
                                                {step.year.slice(2, 4)}
                                            </div>

                                            {/* Card */}
                                            <div
                                                style={{
                                                    background: card, border: `1px solid ${cardBorder}`,
                                                    borderRadius: 14, padding: "16px 20px", flex: 1,
                                                    transition: "border-color 0.2s"
                                                }}
                                                onMouseEnter={e => e.currentTarget.style.borderColor = color + "44"}
                                                onMouseLeave={e => e.currentTarget.style.borderColor = cardBorder}
                                            >
                                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 4, gap: 8 }}>
                                                    <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 600, fontSize: 15, color: text }}>
                                                        {step.title}
                                                    </div>
                                                    <div style={{
                                                        fontSize: 11, color: sub, whiteSpace: "nowrap",
                                                        background: isDarkMode ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.05)",
                                                        padding: "3px 10px", borderRadius: 100, flexShrink: 0
                                                    }}>
                                                        {step.year}
                                                    </div>
                                                </div>
                                                <div style={{ fontSize: 13, color: color, fontWeight: 600, marginBottom: 8 }}>
                                                    {step.company}
                                                </div>
                                                <p style={{ fontSize: 13, lineHeight: 1.6, color: sub, fontWeight: 300 }}>
                                                    {step.description}
                                                </p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;