import PORTRAIT from "../assets/images/profile-img3.webp";
import { JOURNEY } from "../data";

const Journey = () => (
    <section className="journey" id="trajetoria">
        <div className="journey-title">
            <h2 className="display">Trajetória</h2>
        </div>
        <ol className="journey-list">
            <li className="journey-item" data-reveal>
                <img src={PORTRAIT} alt="Retrato de Richard Bercheli em luz azul noturna" width="832" height="1248" loading="lazy" />
                <p className="statement">
                    Entendo o negócio antes do código e uso IA para entregar mais rápido.
                </p>
            </li>
            {JOURNEY.map((s) => (
                <li className="journey-item" key={s.year + s.title} data-reveal>
                    <span className="year">{s.year}</span>
                    <h3 className="lead bold">{s.title}</h3>
                    <span className="who">{s.company}</span>
                    <p>{s.text}</p>
                </li>
            ))}
        </ol>
    </section>
);

export default Journey;
