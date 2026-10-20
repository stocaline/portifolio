import { useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Hero, { NamePin } from "./sections/Hero";
import Work from "./sections/Work";
import Journey from "./sections/Journey";
import Stack from "./sections/Stack";
import Voices from "./sections/Voices";
import Contact from "./sections/Contact";
import Footer from "./sections/Footer";

gsap.registerPlugin(ScrollTrigger);

// Motion layer. Everything is visible without it; gsap.from only runs when JS does.
const useMotion = () => {
    useLayoutEffect(() => {
        const mm = gsap.matchMedia();
        mm.add("(prefers-reduced-motion: no-preference)", () => {
            // Signature: the name lands letter by letter, then holds the corners over the first cases.
            gsap.from(".namepin .ch", { yPercent: 105, duration: 0.9, ease: "power4.out", stagger: 0.035 });
            gsap.from("[data-hero-photo] img", { scale: 1.18, duration: 1.6, ease: "power3.out" });

            // Entrances: each part of a section rises in turn.
            gsap.utils.toArray("[data-reveal]").forEach((el) => {
                const parts = el.children.length > 1 ? el.children : [el];
                gsap.from(parts, {
                    y: 28, opacity: 0, duration: 0.8, ease: "power3.out", stagger: 0.08,
                    scrollTrigger: { trigger: el, start: "top 88%", once: true },
                });
            });

            // Each case recedes as the next one slides over it.
            gsap.utils.toArray(".panel").forEach((panel) => {
                const next = panel.nextElementSibling;
                if (!next) return;
                gsap.to(panel.querySelector("[data-panel-inner]"), {
                    scale: 0.94, yPercent: 8, ease: "none",
                    scrollTrigger: { trigger: next, start: "top bottom", end: "top 20%", scrub: true },
                });
            });

            gsap.fromTo("[data-drift]", { scale: 1.15 }, {
                scale: 1, ease: "none",
                scrollTrigger: { trigger: "#contato", start: "top bottom", end: "bottom top", scrub: true },
            });
            gsap.from("[data-word]", {
                xPercent: 12, ease: "none",
                scrollTrigger: { trigger: ".footer", start: "top bottom", end: "bottom bottom", scrub: true },
            });
        });

        return () => {
            mm.revert();
        };
    }, []);
};

const App = () => {
    useMotion();
    return (
        <>
            <main>
                <div className="namerun">
                    <NamePin />
                    <Hero />
                    <Work id="cases" to={2} />
                </div>
                <Work from={2} />
                <Journey />
                <Stack />
                <Voices />
                <Contact />
            </main>
            <Footer />
        </>
    );
};

export default App;
