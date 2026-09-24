"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import { reducedMotion } from "@/components/Motion";
import { Pill } from "@/components/ui";
import { film } from "@/lib/site";

const words = ["EMS", "Development", "Supply Chain", "Markets", "Quality", "People"];

/* The opening is the one place heavy motion is allowed: the photograph opens out of an inset frame,
   the coral diagonal (the live site's signature) cuts across, and the headline lines rise through masks.
   After that the "Dynamic ___" line keeps cycling through the six pillars, as the live rotator does. */
export default function Hero() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current; if (!el) return;
    const q = gsap.utils.selector(el);
    const reduced = reducedMotion();
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      if (!reduced) {
        const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
        tl.fromTo(q(".hero-media"), { clipPath: "inset(18% 22% 18% 22%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.6, ease: "expo.inOut" }, 0)
          .fromTo(q(".hero-media img"), { scale: 1.3 }, { scale: 1.06, duration: 2.2, ease: "expo.out" }, .2)
          .fromTo(q(".hero-diagonal"), { clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)" }, { clipPath: "polygon(0 0, 46% 0, 22% 100%, 0 100%)", duration: 1.4, ease: "expo.inOut" }, .7)
          .fromTo(q(".hero-line > span"), { yPercent: 110 }, { yPercent: 0, duration: 1.3, stagger: .09 }, 1.05)
          .fromTo(q(".hero-kicker, .hero-foot > *, .hero .pill"), { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 1, ease: "power3.out", stagger: .06 }, 1.5);
        gsap.to(q(".hero-media img"), { yPercent: 10, ease: "none", scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: true } });
        gsap.to(q(".hero-copy"), { yPercent: -18, opacity: .2, ease: "none", scrollTrigger: { trigger: el, start: "center center", end: "bottom top", scrub: true } });
      }
      const items = q(".ticker-word");
      gsap.set(items, { yPercent: (n: number) => (n === 0 ? 0 : 100), opacity: (n: number) => (n === 0 ? 1 : 0) });
      const loop = gsap.timeline({ repeat: -1, delay: reduced ? 0 : 2.4 });
      items.forEach((_, n) => {
        const next = (n + 1) % items.length;
        loop.to(items[n], { yPercent: -100, opacity: 0, duration: .7, ease: "power3.inOut" }, "+=1.8")
          .fromTo(items[next], { yPercent: 100, opacity: 0 }, { yPercent: 0, opacity: 1, duration: .7, ease: "power3.inOut" }, "<");
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return <section className="hero" ref={root} data-scene="black">
    <div className="hero-media">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/brand/DEMS-MainHero1.jpg" alt="A Dynamic EMS engineer inspecting a PCB assembly under a magnifier" fetchPriority="high" />
      <span className="hero-diagonal" aria-hidden="true" />
      <span className="hero-shade" aria-hidden="true" />
    </div>
    <div className="hero-copy wrap">
      <Pill href={film} external>Play film</Pill>
      <p className="hero-kicker"><span>Dynamic</span><span className="ticker" aria-live="off">{words.map((word) => <span className="ticker-word" key={word}>{word}</span>)}</span></p>
      <h1 className="display hero-title">
        <span className="hero-line"><span>Enabling scale,</span></span>
        <span className="hero-line"><span>scope and speed</span></span>
      </h1>
      <div className="hero-foot">
        <p>Electronic Manufacturing Services</p>
        <a href="#welcome" className="scroll-cue">Scroll <span aria-hidden="true">↓</span></a>
      </div>
    </div>
  </section>;
}
