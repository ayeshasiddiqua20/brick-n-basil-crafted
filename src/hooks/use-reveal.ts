import { useEffect, useRef } from "react";

/** Adds .is-visible to elements with .reveal as they enter the viewport. */
export function useRevealAll() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        }
      },
      { threshold: 0.12 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  useRevealAll();
  return ref;
}
