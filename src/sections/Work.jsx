import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { CASES } from "../data";

// Grounds alternate so the pinned name (teal) stays legible on the first two panels.
const GROUNDS = [
    { g: "var(--surface)" },
    { g: "var(--pale)" },
    { g: "var(--ink)", dark: true },
    { g: "var(--bg)" },
    { g: "var(--deep)", dark: true },
    { g: "var(--surface)" },
    { g: "var(--ink)", dark: true },
    { g: "var(--pale)" },
];

// Illustrations of what each product does — not screenshots of the real products.
// Markup is the finished state; ANIM below replays how it gets there.
const UI = {
    auth: (
        <div data-ui="auth">
            <div className="t">Inno Auth</div>
            <div className="field"><span className="ty1">voce@empresa.com</span></div>
            <div className="field"><span className="ty2">••••••••••</span></div>
            <div className="go">Continuar</div>
            <div className="ok">Sessão aberta em todos os produtos</div>
        </div>
    ),
    hub: (
        <div data-ui="hub">
            <div className="t">Treinamento em IA</div>
            <div className="tiles">
                <div className="tile"><span className="play" /></div>
                <div className="tile">Skills</div>
                <div className="tile">Conteúdos</div>
            </div>
            <div className="row"><span>Videoaula em andamento</span><span className="tag">IA</span></div>
            <div className="bar"><i /></div>
        </div>
    ),
    sonar: (
        <div data-ui="sonar">
            <div className="t">Buscar startups</div>
            <div className="field"><span className="ty1">startups de IA para o varejo</span></div>
            <div className="split">
                <svg className="radar" viewBox="0 0 120 120" aria-hidden="true">
                    <circle cx="60" cy="60" r="56" fill="#e3efec" />
                    <circle cx="60" cy="60" r="38" fill="none" stroke="#b9d3ce" />
                    <circle cx="60" cy="60" r="20" fill="none" stroke="#b9d3ce" />
                    <path className="sweep" d="M60 60 L60 4 A56 56 0 0 1 108 32 Z" fill="#06525c" opacity="0.25" />
                    <circle className="blip" cx="84" cy="38" r="4" fill="#06525c" />
                    <circle className="blip" cx="40" cy="78" r="4" fill="#06525c" />
                    <circle className="blip" cx="72" cy="88" r="4" fill="#06525c" />
                </svg>
                <div className="results">
                    <div className="row res"><span>Varejo</span><span className="tag">relevante</span></div>
                    <div className="row res"><span>Logística</span><span className="tag">relevante</span></div>
                    <div className="row res"><span>Pagamentos</span><span className="tag">similar</span></div>
                </div>
            </div>
        </div>
    ),
    ideas: (
        <div data-ui="ideas">
            <div className="t">Nova ideia</div>
            <div className="field"><span className="ty1">Reaproveitar sobras da produção</span></div>
            <div className="sub">Semelhantes no seu ambiente</div>
            <div className="match"><span>Reciclagem de retalhos</span><span className="meter"><i style={{ "--v": 0.86 }} /></span><span className="tag">alta</span></div>
            <div className="match"><span>Economia de insumos</span><span className="meter"><i style={{ "--v": 0.58 }} /></span><span className="tag">média</span></div>
        </div>
    ),
    case: (
        <div data-ui="case">
            <div className="t">Business case</div>
            {["Problema", "Solução", "Investimento", "Retorno"].map((s, i) => (
                <div className="line" key={s}><span>{s}</span><span className="meter"><i style={{ "--v": [0.9, 0.75, 0.6, 0.82][i] }} /></span></div>
            ))}
            <div className="go">Business case gerado</div>
        </div>
    ),
    itsa: (
        <div className="ui-target" aria-hidden="true">
            <svg viewBox="0 0 200 200">
                {[96, 78, 60, 42, 24].map((r, i) => (
                    <circle key={r} cx="100" cy="100" r={r} fill={i % 2 ? "#f7f9f8" : "#043a41"} />
                ))}
                <circle cx="100" cy="100" r="9" fill="#f7f9f8" />
                {[[108, 94], [88, 112], [118, 120], [97, 82]].map(([x, y]) => (
                    <g key={x + "-" + y}>
                        <circle className="ripple" cx={x} cy={y} r="5" fill="none" stroke="#d9e8e4" strokeWidth="2" />
                        <circle className="hit" cx={x} cy={y} r="4.5" fill="#d9e8e4" />
                    </g>
                ))}
            </svg>
        </div>
    ),
    bs: (
        <div data-ui="bs">
            <div className="t">Alunos</div>
            <div className="rows">
                <span className="scan" />
                {["Ana", "Bruno", "Carla"].map((n, i) => (
                    <div className="row" key={n}>
                        <span>{n}</span><span>Turma {"ABC"[i]}</span>
                        <span className="swap"><span className="tag old">lento</span><span className="tag new">otimizado</span></span>
                    </div>
                ))}
            </div>
        </div>
    ),
    job: (
        <div data-ui="job">
            <div className="t">Desenvolvedor(a) Frontend <span className="tag badge">novo</span></div>
            <div className="row"><span>Florianópolis</span><span className="tag">remoto</span></div>
            <div className="go">Candidatar-se</div>
            <div className="ok">Candidatura enviada</div>
        </div>
    ),
};

const type = (sel, steps, duration) => ({ sel, vars: { clipPath: "inset(0 100% 0 0)", ease: `steps(${steps})`, duration } });
const press = (tl, sel) => tl.to(sel, { scale: 0.95, duration: 0.12, yoyo: true, repeat: 1 });

// One looping timeline per case, each telling what that product does.
const ANIM = {
    auth: (tl) => {
        for (const t of [type(".ty1", 16, 1), type(".ty2", 10, 0.6)]) tl.from(t.sel, t.vars);
        press(tl, ".go");
        tl.from(".ok", { opacity: 0, y: 10, duration: 0.4 });
    },
    hub: (tl) => {
        tl.from(".tile", { y: 24, opacity: 0, stagger: 0.12, duration: 0.5, ease: "back.out(2)" })
            .to(".play", { scale: 1.35, duration: 0.25, yoyo: true, repeat: 1 })
            .from(".bar i", { scaleX: 0, duration: 2.4, ease: "none" }, "<");
    },
    sonar: (tl, el) => {
        gsap.to(el.querySelector(".sweep"), { rotation: 360, svgOrigin: "60 60", duration: 2.6, repeat: -1, ease: "none" });
        const t = type(".ty1", 28, 1.2);
        tl.from(t.sel, t.vars)
            .from(".blip", { scale: 0, opacity: 0, transformOrigin: "50% 50%", stagger: 0.45, duration: 0.3, ease: "back.out(3)" })
            .from(".res", { x: -14, opacity: 0, stagger: 0.45, duration: 0.35 }, "<");
    },
    ideas: (tl) => {
        const t = type(".ty1", 30, 1.1);
        tl.from(t.sel, t.vars)
            .from(".match", { y: 14, opacity: 0, stagger: 0.3, duration: 0.4 })
            .from(".meter i", { scaleX: 0, stagger: 0.3, duration: 0.9, ease: "power2.out" }, "<0.2");
    },
    case: (tl) => {
        tl.from(".line", { opacity: 0, x: -10, stagger: 0.25, duration: 0.3 })
            .from(".meter i", { scaleX: 0, stagger: 0.3, duration: 0.7, ease: "power2.out" }, "<")
            .from(".go", { opacity: 0, y: 10, duration: 0.4 });
    },
    itsa: (tl, el) => {
        el.querySelectorAll(".hit").forEach((hit, i) => {
            tl.from(hit, { scale: 0, transformOrigin: "50% 50%", duration: 0.25, ease: "back.out(4)" }, i * 0.6)
                .fromTo(hit.previousSibling, { scale: 1, opacity: 0.9, transformOrigin: "50% 50%" }, { scale: 4, opacity: 0, duration: 0.8 }, "<");
        });
    },
    bs: (tl) => {
        tl.fromTo(".scan", { yPercent: -100, opacity: 1 }, { yPercent: 300, duration: 1.8, ease: "none" })
            .fromTo(".old", { opacity: 1 }, { opacity: 0, stagger: 0.5, duration: 0.2 }, "<0.4")
            .fromTo(".new", { opacity: 0, scale: 0.6 }, { opacity: 1, scale: 1, stagger: 0.5, duration: 0.3, ease: "back.out(3)" }, "<")
            .set(".scan", { opacity: 0 });
    },
    job: (tl) => {
        tl.from(".badge", { scale: 0, duration: 0.35, ease: "back.out(3)" });
        press(tl, ".go");
        tl.from(".ok", { opacity: 0, y: 10, duration: 0.4 });
    },
};

const Work = ({ from = 0, to, id }) => {
    const ref = useRef(null);

    // Each loop plays only while its panel is on screen.
    useLayoutEffect(() => {
        const mm = gsap.matchMedia();
        mm.add("(prefers-reduced-motion: no-preference)", () => {
            const loops = [...ref.current.querySelectorAll(".panel")].map((panel) => {
                const ui = panel.querySelector("[data-anim]");
                let tl;
                gsap.context(() => {
                    tl = gsap.timeline({ paused: true, repeat: -1, repeatDelay: 2.2 });
                    ANIM[ui.dataset.anim](tl, ui);
                }, ui);
                return { panel, tl };
            });
            const io = new IntersectionObserver((entries) => entries.forEach((e) => {
                const loop = loops.find((l) => l.panel === e.target);
                if (e.isIntersecting) loop.tl.play(); else loop.tl.pause();
            }), { threshold: 0.35 });
            loops.forEach((l) => io.observe(l.panel));
            return () => io.disconnect();
        });
        return () => mm.revert();
    }, []);

    return (
        <section id={id} aria-label={id ? "Cases" : undefined} ref={ref}>
            {CASES.slice(from, to).map((c, j) => {
                const i = from + j;
                const { g, dark } = GROUNDS[i];
                return (
                    <article key={c.title} className={`panel${dark ? " on-dark" : ""}`} style={{ "--g": g }}>
                        <div className="panel-inner" data-panel-inner>
                            <div className="panel-ui" aria-hidden="true" data-reveal data-anim={c.ui}>{UI[c.ui]}</div>
                            <div className="panel-row" data-reveal>
                                <span className="small bold">{c.role}</span>
                                <h2 className="head">{c.title}</h2>
                                <span className="small bold">{c.kind}</span>
                            </div>
                            <div className="panel-text" data-reveal>
                                <p className="lead">{c.purpose}</p>
                                <p>{c.contribution}</p>
                            </div>
                        </div>
                    </article>
                );
            })}
        </section>
    );
};

export default Work;
