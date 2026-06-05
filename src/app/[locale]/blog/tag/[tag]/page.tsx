import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { BlogCard } from "@/components/blog-card";
import { routing } from "@/i18n/routing";
import { getAllTags, getPostsByTagSlug, getTagName } from "@/lib/blog";
import type { Locale } from "@/lib/types";

type Props = {
  params: Promise<{ locale: Locale; tag: string }>;
};

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    getAllTags(locale).map((tag) => ({ locale, tag: tag.slug })),
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, tag: tagSlugParam } = await params;
  const name = getTagName(locale, tagSlugParam);
  if (!name) return {};

  const t = await getTranslations({ locale, namespace: "Blog" });
  const path = `/blog/tag/${tagSlugParam}`;

  return {
    title: t("taggedTitle", { tag: name }),
    description: t("taggedDescription", { tag: name }),
    alternates: {
      canonical: locale === "ar" ? `/ar${path}` : path,
      languages: { en: path, ar: `/ar${path}` },
    },
  };
}

export default async function TagPage({ params }: Props) {
  const { locale, tag: tagSlugParam } = await params;
  setRequestLocale(locale);

  const name = getTagName(locale, tagSlugParam);
  const posts = getPostsByTagSlug(locale, tagSlugParam);
  if (!name || posts.length === 0) {
    notFound();
  }

  const t = await getTranslations("Blog");
  const dateFormatter = new Intl.DateTimeFormat(locale, { dateStyle: "medium" });

  return (
    <main id="main" className="blog-index">
      <section className="blog-hero">
        <div className="blog-shell">
          <Link href="/blog" className="blog-post__back">
            {t("allArticles")}
          </Link>
          <p className="section__label">{t("tagsHeading")}</p>
          <h1 className="blog-hero__title">{t("taggedTitle", { tag: name })}</h1>
        </div>
      </section>

      <section className="blog-list">
        <div className="blog-shell">
          <div className="blog-home__list">
            {posts.map((post) => (
              <BlogCard
                key={post.slug}
                post={post}
                tagsLabel={t("tagsLabel")}
                date={dateFormatter.format(new Date(post.metadata.publishedAt))}
                readingLabel={t("readingTime", {
                  minutes: post.metadata.readingMinutes,
                })}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
