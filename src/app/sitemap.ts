import type { MetadataRoute } from "next";
import {
  getAllBlogPosts,
  getAllTags,
  getBlogPostAlternates,
  getBlogPostUrl,
} from "@/lib/blog";
import { CATEGORY_KEYS } from "@/lib/curriculum-structure";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getAllBlogPosts();
  const postEntries = await Promise.all(
    posts.map(async (post) => ({
      url: `https://mohamed.work${getBlogPostUrl(post)}`,
      lastModified: new Date(post.metadata.updatedAt ?? post.metadata.publishedAt),
      changeFrequency: "monthly" as const,
      priority: 0.7,
      alternates: {
        languages: await getBlogPostAlternates(post),
      },
    })),
  );

  const categoryEntries = CATEGORY_KEYS.map((key) => ({
    url: `https://mohamed.work/blog/learn/${key}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
    alternates: {
      languages: {
        en: `https://mohamed.work/blog/learn/${key}`,
        ar: `https://mohamed.work/ar/blog/learn/${key}`,
      },
    },
  }));

  const tagEntries = getAllTags("en").map(({ slug }) => ({
    url: `https://mohamed.work/blog/tag/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.5,
    alternates: {
      languages: {
        en: `https://mohamed.work/blog/tag/${slug}`,
        ar: `https://mohamed.work/ar/blog/tag/${slug}`,
      },
    },
  }));

  return [
    {
      url: "https://mohamed.work",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
      alternates: {
        languages: {
          en: "https://mohamed.work",
          ar: "https://mohamed.work/ar",
        },
      },
    },
    {
      url: "https://mohamed.work/ar",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
      alternates: {
        languages: {
          en: "https://mohamed.work",
          ar: "https://mohamed.work/ar",
        },
      },
    },
    {
      url: "https://mohamed.work/blog",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
      alternates: {
        languages: {
          en: "https://mohamed.work/blog",
          ar: "https://mohamed.work/ar/blog",
        },
      },
    },
    {
      url: "https://mohamed.work/ar/blog",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
      alternates: {
        languages: {
          en: "https://mohamed.work/blog",
          ar: "https://mohamed.work/ar/blog",
        },
      },
    },
    ...categoryEntries,
    ...tagEntries,
    ...postEntries,
  ];
}
