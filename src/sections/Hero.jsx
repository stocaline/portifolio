import { useEffect, useState } from "react";
import PORTRAIT from "../assets/images/profile-img1.webp";
import { LINKS } from "../data";

const floripaTime = () =>
    new Intl.DateTimeFormat("pt-BR", { hour: "2-digit", minute: "2-digit", timeZone: "America/Sao_Paulo" }).format(new Date());

const Letters = ({ word }) => (
    <span className="clip" aria-hidden="true">
        {[...word].map((c, i) => <span className="ch" key={i}>{c}</span>)}
    </span>
);

// Sticky inside the wrapper App puts around the hero and the first two cases.
export const NamePin = () => (
    <div className="namepin">
        <span className="a display"><Letters word="Richard" /></span>
        <span className="b display"><Letters word="Bercheli" /></span>
    </div>
);

const Hero = () => {
    const [time, setTime] = useState(floripaTime);

    useEffect(() => {
        const id = setInterval(() => setTime(floripaTime()), 15000);
        return () => clearInterval(id);
    }, []);

    return (
        <header className="hero" id="topo">
            <h1 className="sr-only">Richard Bercheli, engenheiro de software</h1>
            <div className="hero-photo" data-hero-photo>
                <img src={PORTRAIT} alt="Richard Bercheli em um escritório, braços cruzados e mão no queixo" width="683" height="1024" />
            </div>

            <div className="hero-copy" data-reveal>
                <p className="lead">
                    Engenheiro de software na Innoscience. Construo plataformas e produtos com IA, do login central à busca de startups.
                </p>
                <a className="btn" href="#cases">Ver os cases <span className="arrow" aria-hidden="true">↓</span></a>
                <p className="hero-live">
                    <span className="dot" aria-hidden="true" />
                    {time} em Florianópolis · disponível para conversar
                </p>
            </div>

            <nav aria-label="Principal">
                <ul className="hero-nav">
                    <li><a className="link" href="#cases">Cases</a></li>
                    <li><a className="link" href="#trajetoria">Trajetória</a></li>
                    <li><a className="link" href="#stack">Stack</a></li>
                    <li className="keep"><a className="link" href="#contato">Contato</a></li>
                    <li><a className="link" href={LINKS.cv} target="_blank" rel="noopener noreferrer">Currículo</a></li>
                </ul>
            </nav>
        </header>
    );
};

export default Hero;
