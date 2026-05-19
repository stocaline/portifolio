import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Quote } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import AVATAR_1 from "../../assets/images/avatar-1.png";
import AVATAR_2 from "../../assets/images/avatar-2.png";
import AVATAR_3 from "../../assets/images/avatar-3.png";

gsap.registerPlugin(ScrollTrigger);

const TESTIMONIALS = [
    {
        id: 1,
        name: "Erick Gabriel de Paula",
        role: "Analista TI · Portobello",
        avatar: AVATAR_1,
        comment:
            "O Richard foi fundamental na minha transição de carreira. Quando eu estava perdido tentando conseguir minha primeira oportunidade, ele não só me deu as dicas técnicas certas, como me ajudou a entender o que as empresas realmente buscavam. Se hoje sou desenvolvedor, é porque tive o apoio de alguém que realmente sabe ensinar e quer ver os outros crescerem.",
        accent: "#3b82f6",
    },
    {
        id: 2,
        name: "Pedro Henrique Garcia",
        role: "Product Designer · Innoscience",
        avatar: AVATAR_2,
        comment:
            "Tive o privilégio de fazer parte da mesma equipe e acompanhar de perto sua agilidade nas entregas e sua confiabilidade em cada etapa do processo. Richard é, sem dúvida, uma inspiração pela forma como resolve problemas com clareza e competência.",
        accent: "#a855f7",
    },
    {
        id: 3,
        name: "Alex Minoru Abe",
        role: "Tech Lead · Innoscience",
        avatar: AVATAR_3,
        comment:
            "Trabalhar com o Richard na Innoscience tem sido uma experiência excelente. O ambiente de inovação corporativa exige muita agilidade e a habilidade de transformar incertezas em soluções tecnológicas viáveis, e ele domina isso com maestria. Além de sua sólida competência técnica, o que realmente diferencia o Richard é a sua postura consultiva e sua resiliência diante de desafios complexos. Ele não apenas entrega código de alta qualidade, mas entende o impacto de negócio por trás de cada projeto. É um profissional de extrema confiança, colaborativo e que eleva o nível de qualquer equipe.",
        accent: "#22c55e",
    },
];

const TestimonialsSection = () => {
    const { isDarkMode } = useTheme();
    const wrapperRef = useRef(null);
    const stickyRef = useRef(null);
    const cardRefs = useRef([]);

    const accent = "var(--accent)";
    const bg = isDarkMode ? "#030712" : "#f9fafb";
    const text = isDarkMode ? "#f9fafb" : "#111827";
    const sub = isDarkMode ? "#9ca3af" : "#6b7280";
    const card = isDarkMode ? "rgba(255,255,255,0.04)" : "#ffffff";
    const cardBorder = isDarkMode ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)";

    const N = TESTIMONIALS.length;

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Header entrance
            gsap.fromTo(
                ".test-header > *",
                { autoAlpha: 0, y: 30 },
                {
                    autoAlpha: 1, y: 0, duration: 0.7, ease: "power3.out", stagger: 0.1,
                    scrollTrigger: { trigger: wrapperRef.current, start: "top 80%", toggleActions: "play none none reverse" }
                }
            );

            // For each card except the last: on scroll it flies up
            // The wrapper has height = 100vh * (N+1) giving N "scroll steps"
            // Each step is 1 full viewport height of scroll
            cardRefs.current.forEach((card, i) => {
                if (i === N - 1) return; // last card stays

                const startProgress = i / (N - 1); // normalized 0 → 1
                const endProgress = (i + 1) / (N - 1);

                // map to absolute scroll px within the pin
                const pinHeight = window.innerHeight * N; // total pin scroll distance

                gsap.fromTo(
                    card,
                    { y: 0, autoAlpha: 1, scale: 1 },
                    {
                        y: "-110%",
                        autoAlpha: 0,
                        scale: 0.95,
                        ease: "none",
                        scrollTrigger: {
                            trigger: wrapperRef.current,
                            start: `top+=${startProgress * pinHeight} top`,
                            end: `top+=${endProgress * pinHeight} top`,
                            scrub: 1,
                        },
                    }
                );
            });

            // Pin the sticky panel
            ScrollTrigger.create({
                trigger: wrapperRef.current,
                start: "top top",
                end: `+=${window.innerHeight * N}`,
                pin: stickyRef.current,
                anticipatePin: 1,
                pinSpacing: true,
            });

        }, wrapperRef);

        return () => ctx.revert();
    }, [isDarkMode]);

    return (
        <div
            ref={wrapperRef}
            id="testimonials"
            style={{ background: bg, position: "relative" }}
        >
            {/* Sticky panel */}
            <div
                ref={stickyRef}
                style={{
                    height: "100vh",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "80px 40px",
                    position: "relative",
                    overflow: "hidden",
                }}
            >
                {/* Ambient blob */}
                <div style={{
                    position: "absolute", top: "20%", left: "50%", transform: "translateX(-50%)",
                    width: 500, height: 500, borderRadius: "50%",
                    background: "var(--accent)", opacity: isDarkMode ? 0.04 : 0.03,
                    filter: "blur(100px)", pointerEvents: "none",
                }} />

                {/* Header */}
                <div
                    className="test-header"
                    style={{ textAlign: "center", marginBottom: 56, position: "relative", zIndex: 1 }}
                >
                    <div style={{
                        fontSize: 12, letterSpacing: "0.22em", textTransform: "uppercase",
                        color: accent, fontWeight: 600, marginBottom: 16,
                        fontFamily: "'DM Sans', sans-serif",
                    }}>
                        Testemunhas
                    </div>
                    <h2 style={{
                        fontFamily: "'Syne', sans-serif",
                        fontSize: "clamp(32px, 4vw, 52px)",
                        fontWeight: 700, color: text, lineHeight: 1.1,
                    }}>
                        O que dizem sobre{" "}
                        <span style={{ color: accent }}>meu trabalho</span>
                    </h2>
                </div>

                {/* Stacked cards */}
                <div style={{
                    position: "relative",
                    width: "100%",
                    maxWidth: 680,
                    height: 320,
                    zIndex: 1,
                }}>
                    {TESTIMONIALS.map((t, i) => {
                        // i=0 → top card (no offset, full scale, highest z)
                        // i=N-1 → bottom card (most offset, smallest, lowest z)
                        const stackOffset = i * 14;
                        const stackScale = 1 - i * 0.04;

                        return (
                            <div
                                key={t.id}
                                ref={(el) => (cardRefs.current[i] = el)}
                                style={{
                                    position: "absolute",
                                    top: stackOffset,
                                    left: 0,
                                    right: 0,
                                    zIndex: N - i,
                                    transform: `scale(${stackScale})`,
                                    transformOrigin: "center bottom",
                                    padding: "36px 40px",
                                    borderRadius: 24,
                                    background: card,
                                    border: `1px solid ${cardBorder}`,
                                    backdropFilter: "blur(12px)",
                                    boxShadow: isDarkMode
                                        ? "0 24px 64px rgba(0,0,0,0.5)"
                                        : "0 24px 64px rgba(0,0,0,0.10)",
                                    transition: "box-shadow 0.3s ease",
                                }}
                            >
                                {/* Quote icon */}
                                <Quote
                                    size={28}
                                    style={{ color: t.accent, opacity: 0.6, marginBottom: 20 }}
                                />

                                {/* Comment */}
                                <p style={{
                                    fontSize: 16, lineHeight: 1.8,
                                    color: text, fontWeight: 300,
                                    fontFamily: "'DM Sans', sans-serif",
                                    marginBottom: 28,
                                    fontStyle: "italic",
                                }}>
                                    "{t.comment}"
                                </p>

                                {/* Author */}
                                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                                    <img
                                        src={t.avatar}
                                        alt={t.name}
                                        style={{
                                            width: 48, height: 48, borderRadius: "50%",
                                            objectFit: "cover",
                                            border: `2px solid ${t.accent}`,
                                            flexShrink: 0,
                                        }}
                                    />
                                    <div>
                                        <div style={{
                                            fontFamily: "'Syne', sans-serif",
                                            fontWeight: 700, fontSize: 15, color: text,
                                            marginBottom: 2,
                                        }}>
                                            {t.name}
                                        </div>
                                        <div style={{
                                            fontSize: 12, color: sub,
                                            fontFamily: "'DM Sans', sans-serif",
                                            fontWeight: 400,
                                        }}>
                                            {t.role}
                                        </div>
                                    </div>

                                    {/* Accent dot */}
                                    <div style={{
                                        marginLeft: "auto",
                                        width: 8, height: 8, borderRadius: "50%",
                                        background: t.accent,
                                        boxShadow: `0 0 12px ${t.accent}`,
                                    }} />
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Scroll indicator dots */}
                <div style={{
                    position: "absolute", bottom: 32,
                    display: "flex", gap: 8, alignItems: "center",
                }}>
                    {TESTIMONIALS.map((t) => (
                        <div
                            key={t.id}
                            style={{
                                width: 6, height: 6, borderRadius: "50%",
                                background: t.accent, opacity: 0.4,
                            }}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TestimonialsSection;
