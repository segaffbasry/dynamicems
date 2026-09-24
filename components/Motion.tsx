"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { useEffect } from "react";
import { getLenis, setLenis } from "@/lib/scroll";

// Registered on import, so components whose effects run before the shell's (the hero) already have ScrollTrigger.
if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

export const reducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* Site-wide motion. Lenis smooths the scroll and drives ScrollTrigger.
   - [data-rise]      headings and copy: one calm fade and rise, once.
   - [data-clip]      image frames: open from an inset clip as they arrive.
   - [data-parallax]  images inside a frame: drift about 10% against the scroll. */
export function usePageMotion() {
  useEffect(() => {
    const reduced = reducedMotion();
    let lenis: Lenis | null = null;
    let tick: ((time: number) => void) | null = null;
    if (!reduced) {
      lenis = new Lenis({ duration: 1.2, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
      setLenis(lenis);
      lenis.on("scroll", ScrollTrigger.update);
      tick = (time) => lenis!.raf(time * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
    }

    const ctx = gsap.context(() => {
      const rise = gsap.utils.toArray<HTMLElement>("[data-rise]");
      rise.forEach((el) => el.setAttribute("data-ready", ""));
      if (!reduced) {
        gsap.set(rise, { opacity: 0, y: 28 });
        ScrollTrigger.batch(rise, { start: "top 90%", once: true, onEnter: (batch) => gsap.to(batch, { opacity: 1, y: 0, duration: 1, ease: "power3.out", stagger: .08, clearProps: "transform" }) });
      }

      gsap.utils.toArray<HTMLElement>("[data-clip]").forEach((el) => {
        el.setAttribute("data-ready", "");
        if (reduced) return;
        gsap.fromTo(el, { clipPath: "inset(12% 8% 12% 8%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.4, ease: "power3.inOut", scrollTrigger: { trigger: el, start: "top 88%", once: true } });
      });

      if (!reduced) gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
        gsap.fromTo(el, { yPercent: -10 }, { yPercent: 10, ease: "none", scrollTrigger: { trigger: el.parentElement, scrub: true, start: "top bottom", end: "bottom top" } });
      });
    });

    const onClick = (event: MouseEvent) => {
      const link = (event.target as Element).closest<HTMLAnchorElement>('a[href^="#"]');
      if (!link || event.defaultPrevented) return;
      const id = link.getAttribute("href") ?? "";
      const target = id.length > 1 ? document.querySelector<HTMLElement>(id) : null;
      if (id.length > 1 && !target) return;
      event.preventDefault();
      if (lenis) lenis.scrollTo(target ?? 0, { duration: 1.6 });
      else if (target) target.scrollIntoView(); else window.scrollTo(0, 0);
    };
    document.addEventListener("click", onClick);
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    document.fonts?.ready.then(refresh);

    return () => {
      document.removeEventListener("click", onClick);
      window.removeEventListener("load", refresh);
      ctx.revert();
      if (tick) gsap.ticker.remove(tick);
      lenis?.destroy(); setLenis(null);
    };
  }, []);
}

/* Traps focus inside an overlay, pauses smooth scroll and locks the page while it is open. */
export function focusOverlay(container: HTMLElement, close: () => void) {
  const previous = document.activeElement as HTMLElement | null;
  const overflow = document.body.style.overflow;
  document.body.style.overflow = "hidden";
  getLenis()?.stop();
  const focusable = () => Array.from(container.querySelectorAll<HTMLElement>('a[href], button:not([disabled])'));
  focusable()[0]?.focus({ preventScroll: true });
  const onKey = (event: KeyboardEvent) => {
    if (event.key === "Escape") close();
    if (event.key !== "Tab") return;
    const items = focusable(), first = items[0], last = items[items.length - 1];
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
  };
  document.addEventListener("keydown", onKey);
  return () => { document.body.style.overflow = overflow; getLenis()?.start(); document.removeEventListener("keydown", onKey); previous?.focus({ preventScroll: true }); };
}
