"use client";

import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import { reducedMotion } from "@/components/Motion";
import { Arrow } from "@/components/ui";
import { sectors } from "@/lib/site";

/* The live site's market tabs, reworked: a list of the seven sectors on the left, the chosen sector's
   photograph and copy on the right. Hover or focus picks a sector; the image swaps behind a clip wipe. */
export default function Markets() {
  const [active, setActive] = useState(0);
  const stage = useRef<HTMLDivElement>(null);
  const first = useRef(true);

  useEffect(() => {
    if (first.current) { first.current = false; return; }
    const el = stage.current; if (!el || reducedMotion()) return;
    const tl = gsap.timeline();
    tl.fromTo(el.querySelector(".market-image"), { clipPath: "inset(0 0 0 100%)" }, { clipPath: "inset(0 0 0 0%)", duration: .9, ease: "power4.inOut" })
      .fromTo(el.querySelectorAll(".market-copy > *"), { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: .6, ease: "power3.out", stagger: .06 }, .25);
    return () => { tl.kill(); };
  }, [active]);

  const sector = sectors[active];
  return <div className="markets">
    <ul className="market-list" role="tablist" aria-label="Market sectors">
      {sectors.map((item, index) => <li key={item.name}>
        <button role="tab" id={`market-tab-${index}`} aria-selected={active === index} aria-controls="market-panel" onMouseEnter={() => setActive(index)} onFocus={() => setActive(index)} onClick={() => setActive(index)}>
          <span className="market-index">0{index + 1}</span>{item.name}
        </button>
      </li>)}
    </ul>
    <div className="market-stage" ref={stage} id="market-panel" role="tabpanel" aria-labelledby={`market-tab-${active}`}>
      <div className="market-frame" data-clip>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="market-image" key={sector.image} src={sector.image} alt="" />
      </div>
      <div className="market-copy" key={sector.name}>
        <h3>{sector.name}</h3>
        <p>{sector.text}</p>
        <a className="text-link" href={sector.href}><span>Read more</span><Arrow /></a>
      </div>
    </div>
  </div>;
}
