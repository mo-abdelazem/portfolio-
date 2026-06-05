import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Reveal } from "@/components/reveal";
import { BlogCard } from "@/components/blog-card";
import { getAllTags, getBlogPosts } from "@/lib/blog";
import { summarizeCategories } from "@/lib/curriculum";
import type { Locale, RoadmapCategory } from "@/lib/types";

type Props = {
  params: Promise<{ locale: Locale }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Blog" });
  const isArabic = locale === "ar";

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: {
      canonical: isArabic ? "/ar/blog" : "/blog",
      languages: { en: "/blog", ar: "/ar/blog" },
    },
    openGraph: {
      title: t("metaTitle"),
      description: t("metaDescription"),
      url: isArabic ? "https://mohamed.work/ar/blog" : "https://mohamed.work/blog",
    },
  };
}

export default async function BlogHomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("Blog");
  const tr = await getTranslations("Roadmap");
  const posts = getBlogPosts(locale);
  const [featured, ...rest] = posts;
  const categories = summarizeCategories(
    tr.raw("categories") as RoadmapCategory[],
    locale,
  );
  const tags = getAllTags(locale);
  const dateFormatter = new Intl.DateTimeFormat(locale, { dateStyle: "medium" });

  const cardProps = (post: (typeof posts)[number]) => ({
    post,
    tagsLabel: t("tagsLabel"),
    date: dateFormatter.format(new Date(post.metadata.publishedAt)),
    readingLabel: t("readingTime", { minutes: post.metadata.readingMinutes }),
  });

  return (
    <main id="main" className="blog-index">
      <div className="blog-home__shell">
        <header className="blog-home__hero">
          <Reveal>
            <p className="blog-home__eyebrow">{t("indexTitle")}</p>
            <h1 className="blog-home__title">{t("indexDescription")}</h1>
          </Reveal>
        </header>

        <div className="blog-home__layout">
          <div className="blog-home__main">
            {posts.length === 0 ? (
              <p className="blog-home__empty">{t("emptyArticles")}</p>
            ) : (
              <>
                {featured && (
                  <Reveal className="blog-home__featured">
                    <BlogCard
                      {...cardProps(featured)}
                      featured
                      featuredLabel={t("featuredLabel")}
                    />
                  </Reveal>
                )}

                {rest.length > 0 && (
                  <div className="blog-home__list">
                    <h2 className="blog-home__heading">{t("recentHeading")}</h2>
                    {rest.map((post, i) => (
                      <Reveal key={post.slug} delay={80 + i * 60}>
                        <BlogCard {...cardProps(post)} />
                      </Reveal>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>

          <aside className="blog-home__sidebar">
            {categories.length > 0 && (
              <Reveal delay={120} className="sidebar-block">
                <h2 className="sidebar-block__title">{t("pathsHeading")}</h2>
                <div className="sidebar-paths">
                  {categories.map((category) => {
                    const pct =
                      category.total > 0
                        ? Math.round((category.done / category.total) * 100)
                        : 0;
                    return (
                      <Link
                        key={category.key}
                        href={`/blog/learn/${category.key}`}
                        className="path-card"
                      >
                        <span className="path-card__title">{category.title}</span>
                        <span className="path-card__count">
                          {tr("progress", {
                            done: category.done,
                            total: category.total,
                          })}
                        </span>
                        <span className="path-card__track" aria-hidden="true">
                          <span
                            className="path-card__fill"
                            style={{ width: `${pct}%` }}
                          />
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </Reveal>
            )}

            {tags.length > 0 && (
              <Reveal delay={200} className="sidebar-block">
                <h2 className="sidebar-block__title">{t("tagsHeading")}</h2>
                <div className="sidebar-tags">
                  {tags.map((tag) => (
                    <Link
                      key={tag.slug}
                      href={`/blog/tag/${tag.slug}`}
                      className="tag-chip"
                    >
                      {tag.tag}
                      <span className="tag-chip__count">{tag.count}</span>
                    </Link>
                  ))}
                </div>
              </Reveal>
            )}
          </aside>
        </div>
      </div>
    </main>
  );
}
