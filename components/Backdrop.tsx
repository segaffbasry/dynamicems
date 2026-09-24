"use client";

import { useEffect } from "react";
import gsap from "gsap";

/* One fixed field behind the whole page. Each [data-scene] names a gradient; as you scroll the field blends
   between them every frame, so there are no hard section edges. Text and header colours follow its luminance.
   Palette: black, charcoal, white (coral is the only accent and is never a background).
   Values: top rgb, bottom rgb. "sky" is Heart Aerospace's wordmark gradient, recut in charcoal. */
const scenes: Record<string, number[]> = {
  black: [10, 10, 11, 10, 10, 11],
  charcoal: [44, 44, 46, 30, 30, 32],
  sky: [66, 66, 68, 238, 238, 238],
  white: [255, 255, 255, 255, 255, 255],
  mist: [246, 246, 246, 236, 236, 237],
};

const light = [255, 255, 255];
const dark = [18, 18, 20];
const clamp = (v: number) => Math.max(0, Math.min(1, v));
const smooth = (v: number) => { const t = clamp(v); return t * t * (3 - 2 * t); };
const luminance = (c: number[]) => (.2126 * c[0] + .7152 * c[1] + .0722 * c[2]) / 255;
const rgb = (values: number[]) => values.map(Math.round).join(" ");
const mix = (a: number[], b: number[], t: number) => a.map((v, i) => v + (b[i] - v) * t);

export default function Backdrop() {
  useEffect(() => {
    const style = document.documentElement.style;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    let anchors: { top: number; scene: number[] }[] = [];
    let lastY = -1, lastH = -1;

    const measure = () => {
      anchors = Array.from(document.querySelectorAll<HTMLElement>("[data-scene]"))
        .map((el) => ({ top: el.getBoundingClientRect().top + scrollY, scene: scenes[el.dataset.scene ?? "white"] ?? scenes.white }))
        .sort((a, b) => a.top - b.top);
      lastY = -1;
    };

    const render = () => {
      const y = scrollY, h = innerHeight;
      if ((y === lastY && h === lastH) || !anchors.length) return;
      lastY = y; lastH = h;
      const focus = y + h * .5;
      let i = 0;
      while (i < anchors.length - 1 && focus >= anchors[i + 1].top) i++;
      let mixed = anchors[i].scene;
      const next = anchors[i + 1];
      if (next) {
        const t = reduced.matches ? (focus > next.top - h * .2 ? 1 : 0) : smooth((focus - (next.top - h * .2)) / (h * .5));
        mixed = mix(mixed, next.scene, t);
      }
      const top = mixed.slice(0, 3), bottom = mixed.slice(3, 6);
      const body = smooth(((luminance(top) + luminance(bottom)) / 2 - .38) / .2);
      // The header sits at the very top, so it reads only the top colour.
      const head = smooth((luminance(top) - .38) / .2);
      style.setProperty("--bg-top", rgb(top));
      style.setProperty("--bg-bot", rgb(bottom));
      style.setProperty("--fg", rgb(mix(light, dark, body)));
      style.setProperty("--bg", rgb(mix(dark, light, body)));
      style.setProperty("--hfg", rgb(mix(light, dark, head)));
    };

    const resize = new ResizeObserver(() => { measure(); render(); });
    resize.observe(document.body);
    gsap.ticker.add(render);
    measure(); render();
    return () => { resize.disconnect(); gsap.ticker.remove(render); };
  }, []);

  return <div className="backdrop" aria-hidden="true" />;
}
