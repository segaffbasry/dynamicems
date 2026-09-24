import type { Metadata } from "next";
import NewsIndex from "@/components/NewsIndex";
import { categories, posts } from "@/lib/posts";

export const metadata: Metadata = { title: "Media Hub", description: "News, press releases, case studies, technical papers, films and podcasts from Dynamic EMS." };

export default function NewsPage() {
  const lead = posts[0];
  return <>
    <section className="page-hero" data-scene="charcoal">
      <div className="wrap">
        <p className="eyebrow">Media Hub</p>
        <h1 className="display page-title">Dynamic news</h1>
        <p className="page-intro">Operating across diversified markets, our many years of experience and investment in state of the art technology enables us to support your PCB Assembly and electronic product build throughout the product life cycle, from prototype, through test and customer delivery, anywhere around the globe.</p>
      </div>
    </section>
    <section className="section section-news" data-scene="white">
      <div className="wrap">
        <a className="feature" href={`/news/${lead.slug}`}>
          <div className="feature-media" data-clip>{lead.image && /* eslint-disable-next-line @next/next/no-img-element */ <img data-parallax src={lead.image.src} alt={lead.image.alt} />}</div>
          <div className="feature-copy">
            <p className="eyebrow">Latest · {lead.categories[0]}</p>
            <h2 className="heading">{lead.title}</h2>
            <p>{lead.excerpt}</p>
          </div>
        </a>
        <NewsIndex posts={posts} categories={categories} />
      </div>
    </section>
  </>;
}
