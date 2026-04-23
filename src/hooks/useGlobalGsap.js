import { useEffect } from "react";
import { gsap } from "gsap";

/**
 * Sets up the global GSAP-powered cursor tracking
 * and scroll progress bar. Call once at the application root.
 */
const useGlobalGsap = () => {
    useEffect(() => {
        const dot  = document.getElementById("cursor-dot");
        const ring = document.getElementById("cursor-ring");
        const progress = document.getElementById("scroll-progress");

        if (!dot || !ring) return;

        let rafId;
        let mx = 0, my = 0;
        let rx = 0, ry = 0;

        const onMouseMove = (e) => {
            mx = e.clientX;
            my = e.clientY;
            gsap.to(dot, { x: mx, y: my, duration: 0.05, ease: "none" });
        };

        const animateRing = () => {
            rx += (mx - rx) * 0.12;
            ry += (my - ry) * 0.12;
            gsap.set(ring, { x: rx, y: ry });
            rafId = requestAnimationFrame(animateRing);
        };

        window.addEventListener("mousemove", onMouseMove, { passive: true });
        rafId = requestAnimationFrame(animateRing);

        // Scroll progress bar
        const onScroll = () => {
            if (!progress) return;
            const total = document.documentElement.scrollHeight - window.innerHeight;
            const pct = window.scrollY / total;
            gsap.to(progress, { scaleX: pct, duration: 0.1, ease: "none" });
        };
        window.addEventListener("scroll", onScroll, { passive: true });

        return () => {
            window.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("scroll", onScroll);
            cancelAnimationFrame(rafId);
        };
    }, []);
};

export default useGlobalGsap;
