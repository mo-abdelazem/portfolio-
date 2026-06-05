import { posts as allPosts } from "#site/content";
import type { Locale } from "@/lib/types";

export type BlogPost = (typeof allPosts)[number];

export interface TocItem {
  readonly id: string;
  readonly text: string;
  readonly depth: 2 | 3;
}

export interface TagInfo {
  readonly tag: string;
  readonly slug: string;
  readonly count: number;
}

// URL-safe slug for a tag (e.g. "Box Model" -> "box-model").
export function tagSlug(tag: string): string {
  return tag
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

// Sorted once at module load — newest first. Every listing reads this; no post
// body is touched until a single post page renders <MDXContent code={...} />.
const sorted = [...allPosts].sort(
  (a, b) =>
    new Date(b.metadata.publishedAt).getTime() -
    new Date(a.metadata.publishedAt).getTime(),
);

export function getAllBlogPosts(): BlogPost[] {
  return sorted;
}

export function getBlogPosts(locale: Locale): BlogPost[] {
  return sorted.filter((post) => post.locale === locale);
}

export function getBlogPost(locale: Locale, slug: string): BlogPost | undefined {
  return sorted.find((post) => post.locale === locale && post.slug === slug);
}

// Look up the post that fills a curriculum topic (topic.key === translationKey).
export function getBlogPostByKey(
  locale: Locale,
  key: string,
): BlogPost | undefined {
  return sorted.find(
    (post) => post.locale === locale && post.translationKey === key,
  );
}

// Locale-relative path for next-intl <Link> (it adds the locale prefix).
// Posts are flat — one canonical URL regardless of which path references them.
export function getBlogPostPath(post: Pick<BlogPost, "slug">): string {
  return `/blog/${post.slug}`;
}

// Absolute path including the locale prefix — for canonicals, sitemap, hreflang.
export function getBlogPostUrl(post: Pick<BlogPost, "locale" | "slug">) {
  return post.locale === "ar" ? `/ar/blog/${post.slug}` : `/blog/${post.slug}`;
}

// All tags in a locale with post counts, most-used first.
export function getAllTags(locale: Locale): TagInfo[] {
  const counts = new Map<string, number>();
  for (const post of getBlogPosts(locale)) {
    for (const tag of post.metadata.tags) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1);
    }
  }

  return [...counts.entries()]
    .map(([tag, count]) => ({ tag, slug: tagSlug(tag), count }))
    .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag));
}

export function getPostsByTagSlug(locale: Locale, slug: string): BlogPost[] {
  return getBlogPosts(locale).filter((post) =>
    post.metadata.tags.some((tag) => tagSlug(tag) === slug),
  );
}

// Display name for a tag slug (first matching tag), or the slug itself.
export function getTagName(locale: Locale, slug: string): string | undefined {
  for (const post of getBlogPosts(locale)) {
    const match = post.metadata.tags.find((tag) => tagSlug(tag) === slug);
    if (match) return match;
  }
  return undefined;
}

export function getBlogPostAlternates(
  post: BlogPost,
): Partial<Record<Locale, string>> {
  const translations = sorted.filter(
    (candidate) => candidate.translationKey === post.translationKey,
  );

  return Object.fromEntries(
    translations.map((translation) => [
      translation.locale,
      `https://mohamed.work${getBlogPostUrl(translation)}`,
    ]),
  ) as Partial<Record<Locale, string>>;
}

// Flatten Velite's nested TOC tree into the flat list the UI renders. The ids
// come from rehype-slug, so the same github-slugger output backs both.
export function getBlogPostToc(post: BlogPost): TocItem[] {
  type VeliteToc = { title: string; url: string; items?: VeliteToc[] };

  const flatten = (entries: VeliteToc[], depth: 2 | 3): TocItem[] =>
    entries.flatMap((entry) => [
      { id: entry.url.replace(/^#/, ""), text: entry.title, depth },
      ...(depth < 3 && entry.items ? flatten(entry.items, 3) : []),
    ]);

  return flatten(post.toc as VeliteToc[], 2);
}
