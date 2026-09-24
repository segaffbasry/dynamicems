import type { ReactNode } from "react";
import { brandIcons } from "@/lib/brand-icons";

export function Arrow({ className = "" }: { className?: string }) {
  return <svg className={`arrow ${className}`} width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true"><path d="M2 9h13.5M10 3.5 15.5 9 10 14.5" stroke="currentColor" strokeWidth="1.5" /></svg>;
}

/* Heart Aerospace's video pill, replicated from its computed styles: 1px border, 6px/12px padding,
   uppercase caption at weight 500, an 8px dot, 44px minimum hit area, opacity/background over 0.2s. */
export function Pill({ href, children, external = false }: { href: string; children: ReactNode; external?: boolean }) {
  return <a className="pill" href={href} {...(external ? { target: "_blank", rel: "noopener" } : {})}><span className="pill-dot" aria-hidden="true" />{children}</a>;
}

export function Eyebrow({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <p className={`eyebrow ${className}`} data-rise>{children}</p>;
}

export function TextLink({ href, children, external = false }: { href: string; children: ReactNode; external?: boolean }) {
  return <a className="text-link" href={href} {...(external ? { target: "_blank", rel: "noopener" } : {})}><span>{children}</span><Arrow /></a>;
}

export function BrandIcon({ icon }: { icon: keyof typeof brandIcons }) {
  return <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true"><path d={brandIcons[icon]} /></svg>;
}

export function Social({ icon, name, href }: { icon: keyof typeof brandIcons; name: string; href: string }) {
  return <a className="social" href={href} target="_blank" rel="noopener" aria-label={`Dynamic EMS on ${name}`}><BrandIcon icon={icon} /></a>;
}

/* The live "We are Dynamic." lockup, rebuilt as text so it can take on the header's colour. */
export function Logo({ className = "" }: { className?: string }) {
  return <span className={`logo ${className}`} aria-hidden="true">
    <span className="logo-row logo-coral">We</span>
    <span className="logo-row logo-coral">Are</span>
    <span className="logo-row">Dynamic<i>.</i></span>
  </span>;
}
