import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Send, CheckCircle } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import { CONTACT_INFO, SOCIAL_LINKS } from "../../utils/data";
import TextInput from "../Input/TextInput";
import SuccessModal from "../SuccessModal";

gsap.registerPlugin(ScrollTrigger);

const API_URL = import.meta.env.VITE_BACK_API_URL;

const ContactSection = () => {
    const { isDarkMode } = useTheme();
    const [formData, setFormData] = useState({ name: "", email: "", message: "" });
    const [showSuccess, setShowSuccess] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const sectionRef = useRef(null);

    const accent = "var(--accent)";
    const bg = isDarkMode ? "#030712" : "#f9fafb";
    const text = isDarkMode ? "#f9fafb" : "#111827";
    const sub = isDarkMode ? "#9ca3af" : "#6b7280";
    const card = isDarkMode ? "rgba(255,255,255,0.04)" : "#ffffff";
    const cardBorder = isDarkMode ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)";

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(".contact-header", { opacity: 0, y: 40 }, {
                opacity: 1, y: 0, duration: 0.8, ease: "power3.out",
                scrollTrigger: { trigger: ".contact-header", start: "top 85%" }
            });
            gsap.fromTo(".contact-form-card", { opacity: 0, x: -40 }, {
                opacity: 1, x: 0, duration: 0.8, ease: "power3.out",
                scrollTrigger: { trigger: ".contact-form-card", start: "top 88%" }
            });
            gsap.fromTo(".contact-info-card", { opacity: 0, x: 40 }, {
                opacity: 1, x: 0, duration: 0.8, ease: "power3.out",
                scrollTrigger: { trigger: ".contact-info-card", start: "top 88%" }
            });
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    const handleInputChange = (key, value) => setFormData({ ...formData, [key]: value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const res = await fetch(`${API_URL}/send-email`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            if (!res.ok) throw new Error("Network error");
            setShowSuccess(true);
            setFormData({ name: "", email: "", message: "" });
            setTimeout(() => setShowSuccess(false), 3000);
        } catch (err) {
            console.error("Falha ao enviar:", err);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section
            id="contact"
            ref={sectionRef}
            style={{ background: bg, padding: "120px 40px" }}
        >
            <div style={{ maxWidth: 1200, margin: "0 auto" }}>
                {/* Header */}
                <div className="contact-header" style={{ marginBottom: 72 }}>
                    <div style={{
                        fontSize: 12, letterSpacing: "0.2em", textTransform: "uppercase",
                        color: accent, fontWeight: 600, marginBottom: 16,
                        fontFamily: "'DM Sans', sans-serif"
                    }}>
                        Contato
                    </div>
                    <h2 style={{
                        fontFamily: "'Syne', sans-serif",
                        fontSize: "clamp(32px, 4vw, 52px)",
                        fontWeight: 700, color: text, lineHeight: 1.1, marginBottom: 16
                    }}>
                        Vamos <span style={{ color: accent }}>conversar</span>
                    </h2>
                    <p style={{ fontSize: 16, color: sub, fontWeight: 300, maxWidth: 480 }}>
                        Pronto para começar seu próximo projeto? Envie uma mensagem e te retorno em até 24h.
                    </p>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "start" }}>
                    {/* Form */}
                    <div
                        className="contact-form-card"
                        style={{
                            background: card, border: `1px solid ${cardBorder}`,
                            borderRadius: 24, padding: "36px 32px"
                        }}
                    >
                        <h3 style={{ fontFamily: "'Syne', sans-serif", fontSize: 20, fontWeight: 700, color: text, marginBottom: 28 }}>
                            Me envie uma mensagem
                        </h3>
                        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                                <TextInput
                                    isDarkMode={isDarkMode}
                                    value={formData.name}
                                    handleInputChange={(v) => handleInputChange("name", v)}
                                    label="Seu Nome"
                                />
                                <TextInput
                                    isDarkMode={isDarkMode}
                                    value={formData.email}
                                    handleInputChange={(v) => handleInputChange("email", v)}
                                    label="Email"
                                />
                            </div>
                            <TextInput
                                isDarkMode={isDarkMode}
                                value={formData.message}
                                textarea
                                handleInputChange={(v) => handleInputChange("message", v)}
                                label="Sua Mensagem"
                                style={{ padding: "12px" }}
                            />
                            <button
                                onClick={handleSubmit}
                                disabled={isSubmitting}
                                className="btn-primary"
                                style={{ width: "100%", justifyContent: "center" }}
                            >
                                {isSubmitting ? (
                                    <span>Enviando...</span>
                                ) : (
                                    <>
                                        <Send size={16} />
                                        <span>Enviar Mensagem</span>
                                    </>
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Info */}
                    <div className="contact-info-card" style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                        {/* Contact Info */}
                        <div style={{ background: card, border: `1px solid ${cardBorder}`, borderRadius: 20, padding: "28px 28px" }}>
                            <h3 style={{ fontFamily: "'Syne', sans-serif", fontSize: 18, fontWeight: 700, color: text, marginBottom: 20 }}>
                                Informações de Contato
                            </h3>
                            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                                {CONTACT_INFO.map((info, i) => (
                                    <div key={i} style={{ display: "flex", alignItems: "center", gap: 16 }}>
                                        <div style={{
                                            width: 40, height: 40, borderRadius: 12,
                                            background: `rgba(59,130,246,0.1)`,
                                            display: "flex", alignItems: "center", justifyContent: "center",
                                            color: accent, flexShrink: 0
                                        }}>
                                            <info.icon size={16} />
                                        </div>
                                        <span style={{ fontSize: 14, color: sub }}>{info.value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Social */}
                        <div style={{ background: card, border: `1px solid ${cardBorder}`, borderRadius: 20, padding: "28px 28px" }}>
                            <h3 style={{ fontFamily: "'Syne', sans-serif", fontSize: 18, fontWeight: 700, color: text, marginBottom: 20 }}>
                                Me Siga
                            </h3>
                            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                                {SOCIAL_LINKS.map((s) => (
                                    <a
                                        key={s.name}
                                        href={s.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{
                                            display: "flex", alignItems: "center", gap: 12,
                                            padding: "14px 18px", borderRadius: 14,
                                            background: isDarkMode ? "rgba(255,255,255,0.04)" : "#f1f5f9",
                                            border: `1px solid ${cardBorder}`,
                                            color: text, textDecoration: "none", fontSize: 14, fontWeight: 500,
                                            transition: "all 0.25s ease"
                                        }}
                                        onMouseEnter={e => { e.currentTarget.style.background = accent; e.currentTarget.style.color = "white"; e.currentTarget.style.borderColor = accent; e.currentTarget.style.transform = "translateY(-3px)"; }}
                                        onMouseLeave={e => { e.currentTarget.style.background = isDarkMode ? "rgba(255,255,255,0.04)" : "#f1f5f9"; e.currentTarget.style.color = text; e.currentTarget.style.borderColor = cardBorder; e.currentTarget.style.transform = "none"; }}
                                    >
                                        <s.icon size={18} />
                                        {s.name}
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Availability */}
                        <div style={{
                            background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.2)",
                            borderRadius: 16, padding: "20px 24px"
                        }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                                <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#22c55e", boxShadow: "0 0 8px #22c55e" }} />
                                <span style={{ fontWeight: 600, color: "#22c55e", fontSize: 14 }}>Disponível para trabalhar</span>
                            </div>
                            <p style={{ fontSize: 13, color: sub, fontWeight: 300 }}>
                                Aberto a projetos freelance e oportunidades full-time.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <SuccessModal showSuccess={showSuccess} setShowSuccess={setShowSuccess} isDarkMode={isDarkMode} />
        </section>
    );
};

export default ContactSection;