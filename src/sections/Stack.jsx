import { useEffect, useRef, useState } from "react";
import { STACK } from "../data";

const Stack = () => {
    const [active, setActive] = useState(0);
    const listRef = useRef(null);

    // The row crossing the middle of the viewport becomes active while scrolling.
    useEffect(() => {
        const rows = [...listRef.current.querySelectorAll(".stack-row")];
        const io = new IntersectionObserver(
            (entries) => entries.forEach((e) => e.isIntersecting && setActive(rows.indexOf(e.target))),
            { rootMargin: "-45% 0px -45% 0px" }
        );
        rows.forEach((r) => io.observe(r));
        return () => io.disconnect();
    }, []);

    return (
        <section className="stack" id="stack">
            <h2 className="head stack-title" data-reveal>Stack e IA</h2>
            <div className="stack-field" aria-hidden="true">
                {STACK.map((s, i) => (
                    <ul className={`set${i === active ? " on" : ""}`} key={s.name}>
                        <li className="k">{s.name}</li>
                        {s.tools.map((t) => <li key={t}>{t}</li>)}
                    </ul>
                ))}
            </div>
            <div className="stack-list" ref={listRef}>
                {STACK.map((s, i) => (
                    <button
                        type="button"
                        key={s.name}
                        className={`stack-row${i === active ? " on" : ""}`}
                        aria-expanded={i === active}
                        onClick={() => setActive(i)}
                        onMouseEnter={() => setActive(i)}
                        onFocus={() => setActive(i)}
                    >
                        <span className="nm">{s.name}<span className="ct">{s.tools.length} ferramentas</span></span>
                        <span className="desc"><span>{s.note} {s.tools.join(", ")}.</span></span>
                    </button>
                ))}
            </div>
        </section>
    );
};

export default Stack;
