import { LINKS } from "../data";

const Footer = () => (
    <footer className="footer on-dark">
        <div className="footer-invite" data-reveal>
            <h2>Vamos construir o próximo?</h2>
            <a className="btn btn-paper" href={`mailto:${LINKS.email}?subject=Vamos%20conversar`}>
                Mandar um e-mail <span className="arrow" aria-hidden="true">→</span>
            </a>
        </div>
        <ul className="footer-links" data-reveal>
            <li><a className="link" href={LINKS.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
            <li><a className="link" href={LINKS.github} target="_blank" rel="noopener noreferrer">GitHub</a></li>
            <li><a className="link" href={`mailto:${LINKS.email}`}>E-mail</a></li>
            <li><a className="link" href={LINKS.cv} target="_blank" rel="noopener noreferrer">Currículo</a></li>
        </ul>
        <div className="footer-legal">
            <span>© {new Date().getFullYear()} Richard Bercheli. As telas dos cases são ilustrações, não capturas dos produtos.</span>
            <span>
                Foto: “Ponte Hercílio Luz” por Agnaldo Servo,{" "}
                <a className="link" href="https://commons.wikimedia.org/w/index.php?curid=152344294" target="_blank" rel="noopener noreferrer">CC BY-SA 4.0</a>
            </span>
        </div>
        <div className="footer-word" aria-hidden="true" data-word>Bercheli</div>
    </footer>
);

export default Footer;
