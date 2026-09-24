"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";
import { reducedMotion } from "@/components/Motion";
import PostCard from "@/components/PostCard";
import type { Post } from "@/lib/posts";

type Category = { name: string; slug: string; count: number };

/* Every post, filterable by the live site's categories. The filter lives in ?category= so menu links can deep-link it. */
export default function NewsIndex({ posts, categories }: { posts: Post[]; categories: Category[] }) {
  const [active, setActive] = useState("all");
  const grid = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const read = () => setActive(new URLSearchParams(location.search).get("category") ?? "all");
    read();
    window.addEventListener("popstate", read);
    return () => window.removeEventListener("popstate", read);
  }, []);

  /* The grid re-renders on every filter change, so it runs its own reveal rather than the page-wide one. */
  useEffect(() => {
    const el = grid.current; if (!el) return;
    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.refresh();
    if (reducedMotion()) return;
    const cards = el.querySelectorAll(".post-card");
    gsap.set(cards, { opacity: 0, y: 28 });
    const batch = ScrollTrigger.batch(cards, { start: "top 92%", once: true, onEnter: (items) => gsap.to(items, { opacity: 1, y: 0, duration: .9, ease: "power3.out", stagger: .07, clearProps: "transform" }) });
    return () => batch.forEach((trigger) => trigger.kill());
  }, [active]);

  const choose = (slug: string) => {
    setActive(slug);
    const url = slug === "all" ? location.pathname : `${location.pathname}?category=${slug}`;
    history.replaceState(null, "", url);
  };

  const name = categories.find((c) => c.slug === active)?.name;
  const shown = name ? posts.filter((post) => post.categories.includes(name)) : posts;

  return <>
    <div className="filters" role="toolbar" aria-label="Filter by category">
      <button aria-pressed={active === "all"} onClick={() => choose("all")}>All <sup>{posts.length}</sup></button>
      {categories.map((c) => <button key={c.slug} aria-pressed={active === c.slug} onClick={() => choose(c.slug)}>{c.name} <sup>{c.count}</sup></button>)}
    </div>
    <p className="sr-only" aria-live="polite">{shown.length} stories</p>
    <div className="post-grid" ref={grid}>{shown.map((post, i) => <PostCard key={post.slug} post={post} priority={i < 3} rise={false} />)}</div>
  </>;
}
