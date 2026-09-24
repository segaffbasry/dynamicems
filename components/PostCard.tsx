import { formatDate, type Post } from "@/lib/posts";

export default function PostCard({ post, priority = false, rise = true }: { post: Post; priority?: boolean; rise?: boolean }) {
  return <a className="post-card" href={`/news/${post.slug}`} data-rise={rise ? "" : undefined}>
    <div className="post-card-media">
      {post.image
        ? /* eslint-disable-next-line @next/next/no-img-element */ <img src={post.image.src} alt={post.image.alt} loading={priority ? "eager" : "lazy"} />
        : <span className="post-card-fallback" aria-hidden="true">Dynamic<i>.</i></span>}
    </div>
    <p className="post-meta"><span>{post.categories[0]}</span><time dateTime={post.date}>{formatDate(post.date)}</time></p>
    <h3>{post.title}</h3>
  </a>;
}
