import { useState } from "react";
import PONTE from "../assets/images/ponte.jpg";
import { LINKS } from "../data";

const API_URL = import.meta.env.VITE_BACK_API_URL;

const MESSAGES = {
    sending: "Enviando…",
    sent: "Mensagem enviada. Respondo em até 24h.",
    error: `Não consegui enviar agora. Escreva direto para ${LINKS.email}.`,
};

const Contact = () => {
    const [status, setStatus] = useState("idle");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.currentTarget;
        setStatus("sending");
        try {
            const res = await fetch(`${API_URL}/send-email`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(Object.fromEntries(new FormData(form))),
            });
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            form.reset();
            setStatus("sent");
        } catch (err) {
            console.error("Falha ao enviar:", err);
            setStatus("error");
        }
    };

    return (
        <section className="contact" id="contato">
            <div className="contact-photo">
                <img src={PONTE} alt="Ponte Hercílio Luz sobre a baía de Florianópolis ao entardecer" width="1920" height="1080" loading="lazy" data-drift />
            </div>
            <div className="card" data-reveal>
                <h2>Vamos conversar</h2>
                <dl>
                    <dt>Base</dt><dd>Florianópolis, SC</dd>
                    <dt>E-mail</dt><dd><a className="link" href={`mailto:${LINKS.email}`}>{LINKS.email}</a></dd>
                    <dt>Telefone</dt><dd>{LINKS.phone}</dd>
                    <dt>Resposta</dt><dd>em até 24h</dd>
                </dl>
                <form onSubmit={handleSubmit}>
                    <label>Seu nome<input name="name" required autoComplete="name" /></label>
                    <label>E-mail<input name="email" type="email" required autoComplete="email" /></label>
                    <label>Mensagem<textarea name="message" required /></label>
                    <p className="status" role="status">{MESSAGES[status]}</p>
                    <button className="btn" disabled={status === "sending"}>
                        Enviar mensagem <span className="arrow" aria-hidden="true">→</span>
                    </button>
                </form>
            </div>
        </section>
    );
};

export default Contact;
