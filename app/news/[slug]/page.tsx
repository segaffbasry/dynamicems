import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PostCard from "@/components/PostCard";
import { TextLink } from "@/components/ui";
import { categorySlug, formatDate, getPost, posts, related } from "@/lib/posts";

export const dynamicParams = false;
export const generateStaticParams = () => posts.map(({ slug }) => ({ slug }));

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const post = getPost((await params).slug);
  return post ? { title: post.title, description: post.excerpt } : {};
}

/* YouTube placeholders from the crawl become privacy-enhanced embeds. */
const withVideos = (html: string) => html.replace(/<div data-video="([\w-]{11})"><\/div>/g,
  '<div class="video"><iframe src="https://www.youtube-nocookie.com/embed/$1" title="Dynamic EMS video" loading="lazy" allow="accelerometer; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>');

export default async function Article({ params }: { params: Promise<{ slug: string }> }) {
  const post = getPost((await params).slug);
  if (!post) notFound();
  const index = posts.indexOf(post);
  const newer = posts[index - 1], older = posts[index + 1];

  return <>
    <article>
      <header className="article-hero" data-scene="charcoal">
        <div className="wrap">
          <a className="back" href="/news">← Media Hub</a>
          <p className="eyebrow">{post.categories.map((name, i) => <a key={name} href={`/news?category=${categorySlug(name)}`}>{i ? " · " : ""}{name}</a>)}</p>
          <h1 className="display article-title">{post.title}</h1>
          <dl className="article-meta">
            <div><dt>Published</dt><dd><time dateTime={post.date}>{formatDate(post.date)}</time></dd></div>
            <div><dt>Written by</dt><dd>{post.author}</dd></div>
            <div><dt>Reading time</dt><dd>{post.readingTime}</dd></div>
          </dl>
        </div>
      </header>
      <div className="article-body-wrap" data-scene="white">
        {post.image && <figure className="article-image wrap" data-clip>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img data-parallax src={post.image.src} alt={post.image.alt} width={post.image.width ?? undefined} height={post.image.height ?? undefined} />
        </figure>}
        <div className="wrap article-grid">
          <aside className="article-aside">
            <p className="eyebrow">Filed under</p>
            <ul className="article-tags">{post.categories.map((name) => <li key={name}><a href={`/news?category=${categorySlug(name)}`}>{name}</a></li>)}</ul>
            <TextLink href="/news">All stories</TextLink>
          </aside>
          <div className="prose" dangerouslySetInnerHTML={{ __html: withVideos(post.html) }} />
        </div>
        <nav className="wrap article-pager" aria-label="More stories">
          {older ? <a href={`/news/${older.slug}`}><span>Previous story</span>{older.title}</a> : <span />}
          {newer ? <a href={`/news/${newer.slug}`} className="next"><span>Next story</span>{newer.title}</a> : <span />}
        </nav>
      </div>
    </article>
    <section className="section" data-scene="mist" aria-labelledby="related">
      <div className="wrap">
        <div className="section-head section-head-row"><h2 className="heading" id="related" data-rise>More from Dynamic EMS</h2><div data-rise><TextLink href="/news">All stories</TextLink></div></div>
        <div className="post-grid">{related(post).map((item) => <PostCard key={item.slug} post={item} />)}</div>
      </div>
    </section>
  </>;
}
