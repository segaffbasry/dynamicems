import data from "@/content/posts.json";

export type Post = {
  slug: string; title: string; date: string; author: string; readingTime: string;
  categories: string[]; excerpt: string; html: string; original: string;
  image: { src: string; alt: string; width: number | null; height: number | null } | null;
};

/* House style: no en or em dashes anywhere on the site. The crawled copy keeps them verbatim in posts.json,
   so they are rewritten here: ranges become "to", a dash after a short lead-in (a heading or label) becomes
   a colon, a trailing dash becomes a colon, and any other dash becomes a comma. */
const D = "[\u2013\u2014]";
export function undash(text: string) {
  return text
    .replace(new RegExp(`(\\d)\\s*${D}\\s*(\\d)`, "g"), "$1 to $2")
    .replace(new RegExp(`\\s*${D}\\s*(?=<\\/|$)`, "g"), ":")
    .replace(new RegExp(`(^|>)([^<>.!?;:]{1,48}?)[\\s\\u00a0]+${D}[\\s\\u00a0]+`, "g"), "$1$2: ")
    .replace(/Dynamic EMS[\s\u00a0]+[\u2013\u2014][\s\u00a0]+/g, "Dynamic EMS: ")
    .replace(new RegExp(`[\\s\\u00a0]*${D}[\\s\\u00a0]*`, "g"), ", ");
}

// All 68 posts from the live site's post sitemap, newest first.
export const posts = (data as Post[]).map((post) => ({ ...post, title: undash(post.title), excerpt: undash(post.excerpt), html: undash(post.html) }));

export const categorySlug = (name: string) => name.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

export const categories = Array.from(new Set(posts.flatMap((post) => post.categories)))
  .map((name) => ({ name, slug: categorySlug(name), count: posts.filter((post) => post.categories.includes(name)).length }))
  .sort((a, b) => b.count - a.count);

export const getPost = (slug: string) => posts.find((post) => post.slug === slug);

export const formatDate = (iso: string) => new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });

/* Posts that share a category, falling back to the most recent. */
export function related(post: Post, count = 3) {
  const others = posts.filter((item) => item.slug !== post.slug);
  const same = others.filter((item) => item.categories.some((name) => post.categories.includes(name)) && !item.categories.every((name) => name === "News"));
  return [...same, ...others].filter((item, i, list) => list.indexOf(item) === i).slice(0, count);
}
