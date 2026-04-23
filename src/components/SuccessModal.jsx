import { useEffect, useRef } from "react";
import { CheckCircle, X, Sparkles } from "lucide-react";

const SuccessModal = ({ showSuccess, setShowSuccess, isDarkMode }) => {
    const overlayRef = useRef(null);
    const cardRef    = useRef(null);
    const iconRef    = useRef(null);

    // ── Theme tokens ────────────────────────────────────────────────
    const bg         = isDarkMode ? "#111827"              : "#ffffff";
    const text       = isDarkMode ? "#f9fafb"              : "#111827";
    const sub        = isDarkMode ? "#9ca3af"              : "#6b7280";
    const cardBorder = isDarkMode ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)";

    // ── Animate-in on open ──────────────────────────────────────────
    useEffect(() => {
        if (!showSuccess) return;

        const overlay = overlayRef.current;
        const card    = cardRef.current;
        const icon    = iconRef.current;
        if (!overlay || !card || !icon) return;

        // Reset
        overlay.style.opacity = "0";
        card.style.opacity    = "0";
        card.style.transform  = "scale(0.88) translateY(20px)";
        icon.style.transform  = "scale(0)";

        // Overlay fade-in
        requestAnimationFrame(() => {
            overlay.style.transition = "opacity 0.25s ease";
            overlay.style.opacity    = "1";

            // Card spring-in (slight delay)
            setTimeout(() => {
                card.style.transition = "opacity 0.35s ease, transform 0.45s cubic-bezier(0.34,1.56,0.64,1)";
                card.style.opacity    = "1";
                card.style.transform  = "scale(1) translateY(0)";
            }, 60);

            // Icon pop-in
            setTimeout(() => {
                icon.style.transition = "transform 0.45s cubic-bezier(0.34,1.56,0.64,1)";
                icon.style.transform  = "scale(1)";
            }, 200);
        });
    }, [showSuccess]);

    const handleClose = () => {
        const overlay = overlayRef.current;
        const card    = cardRef.current;
        if (!overlay || !card) return;

        card.style.transition = "opacity 0.2s ease, transform 0.2s ease";
        card.style.opacity    = "0";
        card.style.transform  = "scale(0.92) translateY(12px)";

        overlay.style.transition = "opacity 0.3s ease";
        overlay.style.opacity    = "0";

        setTimeout(() => setShowSuccess(false), 300);
    };

    if (!showSuccess) return null;

    return (
        <>
            {/* Keyframes */}
            <style>{`
                @keyframes sparkle-spin {
                    0%   { transform: rotate(0deg)   scale(1);    opacity: 0.8; }
                    50%  { transform: rotate(180deg) scale(1.15); opacity: 1;   }
                    100% { transform: rotate(360deg) scale(1);    opacity: 0.8; }
                }
            `}</style>

            {/* Backdrop */}
            <div
                ref={overlayRef}
                onClick={handleClose}
                style={{
                    position: "fixed", inset: 0, zIndex: 9999,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    padding: 24,
                    background: "rgba(0,0,0,0.55)",
                    backdropFilter: "blur(6px)",
                    WebkitBackdropFilter: "blur(6px)",
                }}
            >
                {/* Card */}
                <div
                    ref={cardRef}
                    onClick={(e) => e.stopPropagation()}
                    style={{
                        position: "relative",
                        width: "100%", maxWidth: 400,
                        background: bg,
                        border: `1px solid ${cardBorder}`,
                        borderRadius: 24,
                        padding: "48px 40px 40px",
                        textAlign: "center",
                        boxShadow: isDarkMode
                            ? "0 32px 80px rgba(0,0,0,0.6)"
                            : "0 32px 80px rgba(0,0,0,0.14)",
                    }}
                >
                    {/* Close button */}
                    <button
                        onClick={handleClose}
                        style={{
                            position: "absolute", top: 16, right: 16,
                            width: 32, height: 32, borderRadius: "50%",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            border: `1px solid ${cardBorder}`,
                            background: "transparent", cursor: "pointer",
                            color: sub, transition: "all 0.2s ease",
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.background = "var(--accent)";
                            e.currentTarget.style.color      = "white";
                            e.currentTarget.style.borderColor = "var(--accent)";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.background  = "transparent";
                            e.currentTarget.style.color       = sub;
                            e.currentTarget.style.borderColor = cardBorder;
                        }}
                    >
                        <X size={15} />
                    </button>

                    {/* Check icon */}
                    <div
                        ref={iconRef}
                        style={{
                            width: 72, height: 72, borderRadius: "50%",
                            background: "linear-gradient(135deg, var(--accent), #22c55e)",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            margin: "0 auto 28px",
                            boxShadow: "0 0 40px rgba(34,197,94,0.25)",
                        }}
                    >
                        <CheckCircle size={36} style={{ color: "white" }} />
                    </div>

                    {/* Title */}
                    <h3 style={{
                        fontFamily: "'Syne', sans-serif",
                        fontSize: 24, fontWeight: 700,
                        color: text, marginBottom: 12,
                        letterSpacing: "-0.01em",
                    }}>
                        Mensagem enviada!
                    </h3>

                    {/* Body */}
                    <p style={{
                        fontSize: 15, lineHeight: 1.7,
                        color: sub, fontWeight: 300,
                        fontFamily: "'DM Sans', sans-serif",
                        marginBottom: 32,
                    }}>
                        Obrigado por entrar em contato! Entrarei em contato com você em até{" "}
                        <span style={{ color: "var(--accent)", fontWeight: 500 }}>24 horas</span>.
                    </p>

                    {/* Sparkles */}
                    <div style={{ display: "flex", justifyContent: "center" }}>
                        <Sparkles
                            size={22}
                            style={{
                                color: "var(--accent)",
                                animation: "sparkle-spin 3s linear infinite",
                            }}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default SuccessModal;