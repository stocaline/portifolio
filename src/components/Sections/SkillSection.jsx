import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ClipboardList, Palette, Code2, FlaskConical, Rocket } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import RadialOrbitalTimeline from "../ui/radial-orbital-timeline";

gsap.registerPlugin(ScrollTrigger);

const SOFTWARE_PROCESS = [
    {
        id: 1,
        title: "Planejamento",
        date: "Fase 01",
        content: "Antes de qualquer linha de código, mapeio o problema real. Conduzo sessões de descoberta com stakeholders, defino o escopo com precisão cirúrgica e identifico riscos antecipadamente — transformando incerteza em um roadmap claro e executável.",
        category: "Processo",
        icon: ClipboardList,
        relatedIds: [5, 2],
        status: "completed",
        energy: 100,
        mindset: "Outcome-Driven",
        deliverables: [
            "Documento de Requisitos (BRD/PRD)",
            "Mapa de User Stories priorizado",
            "Estimativas e cronograma de entregas",
        ],
    },
    {
        id: 2,
        title: "Design",
        date: "Fase 02",
        content: "Prototipo antes de construir. Valido ideias com wireframes rápidos e evoluo para protótipos de alta fidelidade no Figma, garantindo que a solução faça sentido para o usuário antes de qualquer investimento técnico.",
        category: "Processo",
        icon: Palette,
        relatedIds: [1, 3],
        status: "completed",
        energy: 80,
        mindset: "User-First",
        deliverables: [
            "Wireframes e protótipos navigáveis (Figma)",
            "Sistema de design com tokens e componentes",
            "Fluxos validados com usuários reais",
        ],
    },
    {
        id: 3,
        title: "Desenvolvimento",
        date: "Fase 03",
        content: "Construo com arquitetura pensada para escalar. Priorizo código limpo, componentização reutilizável e integrações robustas — garantindo que o produto seja mantível hoje e pronto para crescer amanhã.",
        category: "Processo",
        icon: Code2,
        relatedIds: [2, 4],
        status: "in-progress",
        energy: 95,
        mindset: "Clean Code",
        deliverables: [
            "Código-fonte versionado e documentado (Git)",
            "APIs integradas e testadas",
            "CI/CD configurado e Pull Requests revisados",
        ],
    },
    {
        id: 4,
        title: "Testes",
        date: "Fase 04",
        content: "Qualidade não é opcional. Implemento estratégias de teste em múltiplas camadas — unitários, integração e E2E — e conduzo auditorias de performance e acessibilidade, garantindo que o que vai para produção realmente funciona.",
        category: "Processo",
        icon: FlaskConical,
        relatedIds: [3, 5],
        status: "in-progress",
        energy: 20,
        mindset: "Zero Bugs",
        deliverables: [
            "Suíte de testes automatizados (unitários e E2E)",
            "Relatório de bugs corrigidos e cobertura de código",
            "Audit Lighthouse: performance e acessibilidade",
        ],
    },
    {
        id: 5,
        title: "Lançamento",
        date: "Fase 05",
        content: "Deploy não é o fim — é o começo. Configuro pipelines de CI/CD, monitoro métricas críticas no pós-lançamento e estruturo ciclos de feedback para garantir que o produto evolua com inteligência.",
        category: "Processo",
        icon: Rocket,
        relatedIds: [4, 1],
        status: "pending",
        energy: 10,
        mindset: "Ship It",
        deliverables: [
            "Deploy automatizado em produção (CI/CD)",
            "Dashboard de monitoramento e alertas",
            "Relatório de métricas e plano de iteração",
        ],
    },
];

const SkillSection = () => {
    const { isDarkMode } = useTheme();

    // DOM refs
    const wrapperRef  = useRef(null); // scroll-space wrapper (tall, 300vh)
    const stickyRef   = useRef(null); // sticky viewport panel
    const headerRef   = useRef(null); // title block that fades out
    const orbitalRef  = useRef(null); // orbital that fades in

    const accent = "var(--accent)";
    const bg     = isDarkMode ? "#030712" : "#f9fafb";
    const text   = isDarkMode ? "#f9fafb" : "#111827";
    const sub    = isDarkMode ? "#9ca3af" : "#6b7280";

    useEffect(() => {
        const ctx = gsap.context(() => {
            // ── 1. Header entrance (before pinning starts) ────────────────
            gsap.fromTo(
                ".proc-eyebrow, .proc-title, .proc-desc",
                { autoAlpha: 0, y: 30 },
                {
                    autoAlpha: 1, y: 0,
                    duration: 0.7, ease: "power3.out",
                    stagger: 0.1,
                    scrollTrigger: {
                        trigger: wrapperRef.current,
                        start: "top 80%",
                        toggleActions: "play none none reverse",
                    }
                }
            );

            // ── 2. Scroll-scrubbed reveal: header fades → orbital fades in ─
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: wrapperRef.current,
                    start: "top top",      // pin starts when section hits viewport top
                    end: "+=100%",         // pin lasts for 1 full viewport-height of scroll
                    pin: stickyRef.current,
                    scrub: 1,
                    anticipatePin: 1,
                }
            });

            // Phase 1 (0 → 0.4): header exits upward
            tl.to(headerRef.current, {
                autoAlpha: 0,
                y: -60,
                ease: "power2.in",
                duration: 0.4,
            });

            // Phase 2 (0.4 → 1): orbital enters
            tl.fromTo(
                orbitalRef.current,
                { autoAlpha: 0, scale: 0.92 },
                { autoAlpha: 1, scale: 1, ease: "power2.out", duration: 0.6 },
                "<+0.1" // tiny overlap so transition is snappy
            );
        }, wrapperRef);

        return () => ctx.revert();
    }, []);

    return (
        /*
         * Outer wrapper: tall so it creates scroll distance.
         * The sticky child fills the viewport and stays fixed during the pin.
         */
        <div
            id="skills"
            ref={wrapperRef}
            style={{ background: bg, position: "relative" }}
        >
            {/* Sticky viewport panel */}
            <div
                ref={stickyRef}
                style={{
                    width: "100%",
                    height: "100vh",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "relative",
                    overflow: "hidden",
                    background: bg,
                }}
            >
                {/* ── Header layer ── */}
                <div
                    ref={headerRef}
                    style={{
                        position: "absolute",
                        top: 0, left: 0, right: 0, bottom: 0,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        textAlign: "center",
                        padding: "0 clamp(24px, 5vw, 80px)",
                        pointerEvents: "none",
                    }}
                >
                    <div
                        className="proc-eyebrow"
                        style={{
                            fontSize: 12, letterSpacing: "0.22em",
                            textTransform: "uppercase",
                            color: accent, fontWeight: 600, marginBottom: 20,
                            fontFamily: "'DM Sans', sans-serif",
                        }}
                    >
                        Como trabalho
                    </div>

                    <h2
                        className="proc-title"
                        style={{
                            fontFamily: "'Syne', sans-serif",
                            fontSize: "clamp(40px, 6vw, 80px)",
                            fontWeight: 700, color: text,
                            lineHeight: 1.05, marginBottom: 24,
                            letterSpacing: "-0.02em",
                            maxWidth: 800,
                        }}
                    >
                        Processo de{" "}
                        <span style={{ color: accent }}>Software</span>
                    </h2>

                    <p
                        className="proc-desc"
                        style={{
                            fontSize: "clamp(15px, 1.5vw, 18px)",
                            color: sub, fontWeight: 300,
                            maxWidth: 560, lineHeight: 1.7,
                            fontFamily: "'DM Sans', sans-serif",
                        }}
                    >
                        Cada projeto segue um fluxo estruturado — do levantamento de requisitos até o lançamento em produção.{" "}
                        <em style={{ color: accent, fontStyle: "normal", fontWeight: 500 }}>
                            Role para explorar.
                        </em>
                    </p>
                </div>

                {/* ── Orbital layer (starts invisible) ── */}
                <div
                    ref={orbitalRef}
                    style={{
                        width: "100%", height: "100%",
                        opacity: 0, pointerEvents: "auto",
                        display: "flex", alignItems: "center", justifyContent: "center",
                    }}
                >
                    <RadialOrbitalTimeline
                        timelineData={SOFTWARE_PROCESS}
                        isDarkMode={isDarkMode}
                        effortLabel="Esforço necessário"
                        fullHeight
                    />
                </div>
            </div>
        </div>
    );
};

export default SkillSection;