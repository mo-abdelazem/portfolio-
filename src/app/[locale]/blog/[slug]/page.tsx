import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { BlogToc } from "@/components/blog-toc";
import { MDXContent } from "@/components/mdx-content";
import { ReadingProgress } from "@/components/reading-progress";
import { Reveal } from "@/components/reveal";

function NavArrow({ dir }: { dir: "prev" | "next" }) {
  return (
    <svg
      className="blog-post__nav-arrow"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d={dir === "next" ? "M5 12h14M13 6l6 6-6 6" : "M19 12H5M11 18l-6-6 6-6"}
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
import {
  getAllBlogPosts,
  getBlogPost,
  getBlogPostAlternates,
  getBlogPostToc,
  getBlogPostUrl,
  tagSlug,
} from "@/lib/blog";
import { getCurriculumNeighbors } from "@/lib/curriculum";
import { categoryKeyForTopic } from "@/lib/curriculum-structure";
import type { Locale, RoadmapCategory } from "@/lib/types";

type Props = {
  params: Promise<{ locale: Locale; slug: string }>;
};

export async function generateStaticParams() {
  return getAllBlogPosts().map((post) => ({
    locale: post.locale,
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = await getBlogPost(locale, slug);

  if (!post) {
    return {};
  }

  const canonical = getBlogPostUrl(post);
  const alternates = await getBlogPostAlternates(post);

  return {
    title: post.metadata.title,
    description: post.metadata.description,
    alternates: {
      canonical,
      languages: alternates,
    },
    openGraph: {
      type: "article",
      title: post.metadata.title,
      description: post.metadata.description,
      url: `https://mohamed.work${canonical}`,
      publishedTime: post.metadata.publishedAt,
      modifiedTime: post.metadata.updatedAt,
      tags: [...post.metadata.tags],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const post = await getBlogPost(locale, slug);
  if (!post) {
    notFound();
  }

  const t = await getTranslations("Blog");

  // If this post is a topic in a learning path, surface that context.
  const categoryKey = categoryKeyForTopic(post.translationKey);
  let backHref = "/blog";
  let backLabel = t("indexTitle");
  let sectionTitle: string | undefined;
  let prev: { slug: string; title: string } | null = null;
  let next: { slug: string; title: string } | null = null;

  if (categoryKey) {
    const tr = await getTranslations("Roadmap");
    const category = (tr.raw("categories") as RoadmapCategory[]).find(
      (entry) => entry.key === categoryKey,
    );
    if (category) {
      backHref = `/blog/learn/${categoryKey}`;
      backLabel = category.title;
      const neighbors = getCurriculumNeighbors(
        category.sections,
        locale,
        post.translationKey,
      );
      sectionTitle = neighbors.sectionTitle;
      prev = neighbors.prev;
      next = neighbors.next;
    }
  }

  const toc = getBlogPostToc(post);

  return (
    <main id="main" className="blog-post">
      <ReadingProgress topLabel={t("backToTop")} />
      <div className="blog-post__layout">
        <article className="blog-post__main">
          <Link href={backHref} className="blog-post__back">
            <NavArrow dir="prev" />
            {backLabel}
          </Link>
          <Reveal>
            <header className="blog-post__header">
              {sectionTitle && (
                <p className="section__label blog-post__category">{sectionTitle}</p>
              )}
              <div className="blog-card__meta">
                <time dateTime={post.metadata.publishedAt}>
                  {new Intl.DateTimeFormat(locale, {
                    dateStyle: "long",
                  }).format(new Date(post.metadata.publishedAt))}
                </time>
                <span className="post-card__sep" aria-hidden="true" />
                <span>
                  {t("readingTime", { minutes: post.metadata.readingMinutes })}
                </span>
              </div>
              <h1 className="blog-post__title">{post.metadata.title}</h1>
              <p className="blog-post__description">{post.metadata.description}</p>
              <div className="blog-post__tags" aria-label={t("tagsLabel")}>
                {post.metadata.tags.map((tag) => (
                  <Link
                    key={tag}
                    href={`/blog/tag/${tagSlug(tag)}`}
                    className="tag-chip"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            </header>
          </Reveal>
          <div className="blog-content">
            <MDXContent code={post.code} />
          </div>

          {(prev || next) && (
            <nav className="blog-post__nav" aria-label={t("morePostsLabel")}>
              {prev ? (
                <Link
                  href={`/blog/${prev.slug}`}
                  className="blog-post__nav-link blog-post__nav-link--prev"
                >
                  <NavArrow dir="prev" />
                  <span className="blog-post__nav-text">
                    <span className="blog-post__nav-label">
                      {t("previousTopic")}
                    </span>
                    <span className="blog-post__nav-title">{prev.title}</span>
                  </span>
                </Link>
              ) : (
                <span />
              )}
              {next && (
                <Link
                  href={`/blog/${next.slug}`}
                  className="blog-post__nav-link blog-post__nav-link--next"
                >
                  <span className="blog-post__nav-text">
                    <span className="blog-post__nav-label">{t("nextTopic")}</span>
                    <span className="blog-post__nav-title">{next.title}</span>
                  </span>
                  <NavArrow dir="next" />
                </Link>
              )}
            </nav>
          )}
        </article>

        <aside className="blog-post__aside">
          <BlogToc items={toc} label={t("onThisPage")} />
        </aside>
      </div>
    </main>
  );
}
