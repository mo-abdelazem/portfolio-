import type { MetadataRoute } from "next";
import {
  getAllBlogPosts,
  getAllTags,
  getBlogPostAlternates,
  getBlogPostUrl,
  getBlogPosts,
  getPostsByTagSlug,
  type BlogPost,
} from "@/lib/blog";
import { CATEGORY_KEYS } from "@/lib/curriculum-structure";
import type { Locale } from "@/lib/types";

const BASE = "https://mohamed.work";
const LOCALES: readonly Locale[] = ["en", "ar"];

const localeUrl = (locale: Locale, path = "") =>
  locale === "ar" ? `${BASE}/ar${path}` : `${BASE}${path}`;

// Real content date for listing pages: the newest publish/update among the
// posts they list. A stable lastmod keeps Google trusting the field, unlike
// new Date(), which stamps every build time and gets ignored as noise.
function newestDate(posts: BlogPost[]): Date | undefined {
  if (posts.length === 0) return undefined;
  return new Date(
    Math.max(
      ...posts.map((post) =>
        new Date(post.metadata.updatedAt ?? post.metadata.publishedAt).getTime(),
      ),
    ),
  );
}

export default function sitemap(): MetadataRoute.Sitemap {
  const postEntries = getAllBlogPosts().map((post) => ({
    url: `${BASE}${getBlogPostUrl(post)}`,
    lastModified: new Date(post.metadata.updatedAt ?? post.metadata.publishedAt),
    changeFrequency: "monthly" as const,
    priority: 0.7,
    alternates: {
      languages: getBlogPostAlternates(post),
    },
  }));

  // Listing pages change when a post is added or updated in that locale.
  const latestByLocale = Object.fromEntries(
    LOCALES.map((locale) => [locale, newestDate(getBlogPosts(locale))]),
  ) as Record<Locale, Date | undefined>;

  const blogEntries = LOCALES.map((locale) => ({
    url: localeUrl(locale, "/blog"),
    lastModified: latestByLocale[locale],
    changeFrequency: "weekly" as const,
    priority: 0.8,
    alternates: {
      languages: {
        en: localeUrl("en", "/blog"),
        ar: localeUrl("ar", "/blog"),
      },
    },
  }));

  const categoryEntries = LOCALES.flatMap((locale) =>
    CATEGORY_KEYS.map((key) => ({
      url: localeUrl(locale, `/blog/learn/${key}`),
      lastModified: latestByLocale[locale],
      changeFrequency: "weekly" as const,
      priority: 0.8,
      alternates: {
        languages: {
          en: localeUrl("en", `/blog/learn/${key}`),
          ar: localeUrl("ar", `/blog/learn/${key}`),
        },
      },
    })),
  );

  // A tag page only exists in a locale that has posts carrying that tag, so
  // entries and hreflang alternates are built per locale from real data.
  const tagEntries = LOCALES.flatMap((locale) =>
    getAllTags(locale).map(({ slug }) => {
      const localesWithTag = LOCALES.filter(
        (candidate) => getPostsByTagSlug(candidate, slug).length > 0,
      );

      return {
        url: localeUrl(locale, `/blog/tag/${slug}`),
        lastModified: newestDate(getPostsByTagSlug(locale, slug)),
        changeFrequency: "weekly" as const,
        priority: 0.5,
        alternates: {
          languages: Object.fromEntries(
            localesWithTag.map((candidate) => [
              candidate,
              localeUrl(candidate, `/blog/tag/${slug}`),
            ]),
          ),
        },
      };
    }),
  );

  const homeEntries = LOCALES.map((locale, i) => ({
    url: localeUrl(locale),
    changeFrequency: "monthly" as const,
    priority: i === 0 ? 1 : 0.9,
    alternates: {
      languages: {
        en: localeUrl("en"),
        ar: localeUrl("ar"),
      },
    },
  }));

  return [...homeEntries, ...blogEntries, ...categoryEntries, ...tagEntries, ...postEntries];
}
