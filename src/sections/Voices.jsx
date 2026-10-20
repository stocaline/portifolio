import { useEffect, useRef, useState } from "react";
import { TESTIMONIALS } from "../data";

const GROUNDS = ["var(--bg)", "var(--pale)", "var(--ink)"];

const Voices = () => {
    const [step, setStep] = useState(0);
    const stepsRef = useRef(null);

    // Each spacer below the sticky stage advances one quotation; no scroll hijacking.
    useEffect(() => {
        const spacers = [...stepsRef.current.children];
        const io = new IntersectionObserver(
            (entries) => entries.forEach((e) => e.isIntersecting && setStep(spacers.indexOf(e.target))),
            { rootMargin: "-50% 0px -49% 0px" }
        );
        spacers.forEach((s) => io.observe(s));
        return () => io.disconnect();
    }, []);

    const dark = step === 2;

    return (
        <section className="voices" id="depoimentos">
            <div className={`voices-stage${dark ? " on-dark" : ""}`} style={{ background: GROUNDS[step], color: dark ? "var(--deep-ink)" : "var(--ink)" }}>
                <h2 className="voices-title display">Depoimentos</h2>
                {TESTIMONIALS.map((t, i) => (
                    <figure key={t.name} className={`voice${i === step ? " on" : ""}${dark ? " on-dark" : ""}`}>
                        <img src={t.avatar} alt={`Retrato de ${t.name}`} width="300" height="300" loading="lazy" />
                        <blockquote>
                            <p>{t.quote}</p>
                            <footer><strong>{t.name}</strong><br />{t.role}</footer>
                        </blockquote>
                    </figure>
                ))}
            </div>
            <div className="voices-steps" ref={stepsRef} aria-hidden="true">
                {TESTIMONIALS.map((t) => <div key={t.name} />)}
            </div>
        </section>
    );
};

export default Voices;
