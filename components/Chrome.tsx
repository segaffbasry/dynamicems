"use client";

import gsap from "gsap";
import type { ReactNode } from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import Backdrop from "@/components/Backdrop";
import { focusOverlay, reducedMotion, usePageMotion } from "@/components/Motion";
import { Arrow, BrandIcon, Logo, Social } from "@/components/ui";
import { contact, footerColumns, menu, socials } from "@/lib/site";

const isExternal = (href: string) => /^https?:/.test(href);

/* Full-screen menu. A black sheet drops from the top edge, a coral rule draws across,
   then the section title and its links rise in. Switching sections replays only the links. */
function Menu({ open, tab, setTab, close }: { open: boolean; tab: number; setTab: (tab: number) => void; close: () => void }) {
  const root = useRef<HTMLDivElement>(null);
  const timeline = useRef<gsap.core.Timeline | null>(null);
  const wasOpen = useRef(false);
  const group = menu[tab];

  useEffect(() => {
    const el = root.current; if (!el) return;
    const tl = gsap.timeline({ paused: true, onReverseComplete: () => { el.style.visibility = "hidden"; } });
    tl.fromTo(el, { clipPath: "inset(0 0 100% 0)" }, { clipPath: "inset(0 0 0% 0)", duration: .9, ease: "power4.inOut" }, 0)
      .fromTo(el.querySelector(".menu-rule"), { scaleX: 0 }, { scaleX: 1, duration: 1, ease: "power3.inOut" }, .35)
      .fromTo(el.querySelectorAll(".menu-top > *, .menu-tab"), { opacity: 0, y: -12 }, { opacity: 1, y: 0, duration: .6, ease: "power2.out", stagger: .05 }, .5);
    timeline.current = tl;
    return () => { tl.kill(); };
  }, []);

  useEffect(() => {
    const el = root.current, tl = timeline.current; if (!el || !tl) return;
    if (open) {
      el.style.visibility = "visible";
      tl.timeScale(reducedMotion() ? 20 : 1).play();
      return focusOverlay(el, close);
    }
    if (wasOpen.current) tl.timeScale(reducedMotion() ? 20 : 1.4).reverse();
    wasOpen.current = false;
  }, [open, close]);

  useEffect(() => {
    const el = root.current; if (!el || !open) return;
    const fresh = !wasOpen.current;
    wasOpen.current = true;
    const items = el.querySelectorAll("[data-m]");
    if (reducedMotion()) { gsap.set(items, { opacity: 1, yPercent: 0 }); return; }
    gsap.fromTo(items, { opacity: 0, yPercent: 60 }, { opacity: 1, yPercent: 0, duration: .8, ease: "power3.out", stagger: .04, delay: fresh ? .7 : 0, overwrite: true });
  }, [open, tab]);

  return <div className="menu" id="site-menu" ref={root} role="dialog" aria-modal="true" aria-label="Site menu" aria-hidden={!open} inert={!open} data-lenis-prevent>
    <div className="menu-top wrap">
      <a href="/" className="brand" aria-label="Dynamic EMS home" onClick={close}><Logo /></a>
      <button className="menu-close" onClick={close}>Close <span aria-hidden="true" /></button>
    </div>
    <div className="menu-rule" aria-hidden="true" />
    <div className="menu-body wrap">
      <nav className="menu-tabs" aria-label="Menu sections">
        {menu.map((entry, index) => <button key={entry.id} className="menu-tab" aria-current={tab === index} onClick={() => setTab(index)}>
          <span className="menu-tab-index">0{index + 1}</span>{entry.label}
        </button>)}
      </nav>
      <div className="menu-panel" key={group.id}>
        <div className="menu-intro">
          <h2 data-m>{group.title}</h2>
          <p data-m>{group.blurb}</p>
        </div>
        <ul className="menu-links">
          {group.links.map((link) => <li key={link.name}><a data-m href={link.href} onClick={isExternal(link.href) ? undefined : close}>{link.name}<Arrow /></a></li>)}
        </ul>
      </div>
    </div>
    <div className="menu-foot wrap">
      <p>{contact.company} · {contact.address.join(", ")}</p>
      <div className="socials">{socials.map((s) => <Social key={s.name} {...s} />)}</div>
    </div>
  </div>;
}

/* Frameless header. No bar or box: the logo and items take the colour of whatever is behind them,
   slide away on scroll down and return on scroll up (Heart Aerospace: translateY(-100%), transform 0.3s). */
function Header() {
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState(0);
  const header = useRef<HTMLElement>(null);
  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    const bar = header.current; if (!bar) return;
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY, delta = y - last;
      if (y < 80) { bar.classList.remove("is-hidden"); last = y; return; }
      if (Math.abs(delta) < 6) return;
      bar.classList.toggle("is-hidden", delta > 0); last = y;
    };
    const reveal = () => bar.classList.remove("is-hidden");
    bar.addEventListener("focusin", reveal);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { bar.removeEventListener("focusin", reveal); window.removeEventListener("scroll", onScroll); };
  }, []);

  const show = (index: number) => { setTab(index); setOpen(true); };
  return <>
    <header className="site-header" ref={header}>
      <div className="wrap header-inner">
        <a href="/" className="brand" aria-label="Dynamic EMS home"><Logo /></a>
        <nav className="header-nav" aria-label="Main">
          {menu.map((entry, index) => <button key={entry.id} aria-haspopup="dialog" aria-expanded={open && tab === index} aria-controls="site-menu" onClick={() => show(index)}>{entry.label}</button>)}
        </nav>
        <button className="burger" aria-label="Open menu" aria-expanded={open} aria-controls="site-menu" onClick={() => show(0)}><span /><span /></button>
      </div>
    </header>
    <Menu open={open} tab={tab} setTab={setTab} close={close} />
  </>;
}

/* Black footer after Heart Aerospace: link columns, follow, address, then a thin legal bar. */
function Footer() {
  return <footer className="site-footer" data-scene="black">
    <div className="wrap">
      <div className="footer-lead">
        <h2 data-rise>We are Dynamic<span className="coral">.</span></h2>
        <a className="footer-cta" href="https://dynamic-ems.com/contact/" data-rise>Start a conversation <Arrow /></a>
      </div>
      <div className="footer-cols">
        {footerColumns.map((column) => <div key={column.title}>
          <h3>{column.title}</h3>
          <ul>{column.links.map((link) => <li key={link.name}><a href={link.href}>{link.name}</a></li>)}</ul>
        </div>)}
        <div>
          <h3>Follow</h3>
          <ul>{socials.map((s) => <li key={s.name}><a href={s.href} target="_blank" rel="noopener" className="footer-social"><BrandIcon icon={s.icon} />{s.name}</a></li>)}</ul>
        </div>
        <div>
          <h3>Address</h3>
          <address>{contact.company}<br />{contact.address.map((line) => <span key={line}>{line}<br /></span>)}</address>
          <p className="footer-contact"><a href={contact.phoneHref}>T. {contact.phone}</a><span>F. {contact.fax}</span><a href={`mailto:${contact.email}`}>E. {contact.email}</a></p>
        </div>
      </div>
      <div className="footer-bar">
        <p>Copyright {new Date().getFullYear()}. All rights reserved</p>
        <a href="https://dynamic-ems.com/cookies-privacy/">Cookies & privacy policy</a>
      </div>
    </div>
  </footer>;
}

export function Shell({ children }: { children: ReactNode }) {
  usePageMotion();
  return <>
    <Backdrop />
    <a className="skip-link" href="#main">Skip to content</a>
    <Header />
    <main id="main">{children}</main>
    <Footer />
  </>;
}
