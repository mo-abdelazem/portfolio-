import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Reveal } from "@/components/reveal";
import { BlogExplorer, type ExplorerPost } from "@/components/blog-explorer";
import { getAllTags, getBlogPosts } from "@/lib/blog";
import { buildCurriculum } from "@/lib/curriculum";
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

function ArrowRight() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M5 12h14M13 6l6 6-6 6"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default async function BlogHomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("Blog");
  const tr = await getTranslations("Roadmap");
  const posts = getBlogPosts(locale);
  const tags = getAllTags(locale);
  const hiddenTagCount = tags.filter((tag) => tag.count <= 1).length;

  const categoriesRaw = tr.raw("categories") as RoadmapCategory[];
  const path = categoriesRaw[0];
  const sections = path ? buildCurriculum(path.sections, locale) : [];
  const doneTopics = sections.reduce((n, s) => n + s.doneCount, 0);
  const totalTopics = sections.reduce((n, s) => n + s.topics.length, 0);
  const pct = totalTopics > 0 ? Math.round((doneTopics / totalTopics) * 100) : 0;
  const pathHref = path ? `/blog/learn/${path.key}` : "/blog";

  const dateFormatter = new Intl.DateTimeFormat(locale, { dateStyle: "medium" });
  const explorerPosts: ExplorerPost[] = posts.map((post) => ({
    slug: post.slug,
    title: post.metadata.title,
    description: post.metadata.description,
    tags: post.metadata.tags,
    publishedAt: post.metadata.publishedAt,
    date: dateFormatter.format(new Date(post.metadata.publishedAt)),
    readingLabel: t("readingTime", { minutes: post.metadata.readingMinutes }),
  }));

  return (
    <main id="main" className="blog-index">
      <div className="blog-home__shell">
        <header className="blog-index-hero">
          <Reveal className="blog-index-hero__intro">
            <p className="blog-home__eyebrow">{t("indexTitle")}</p>
            <h1 className="blog-home__title">{t("indexDescription")}</h1>
          </Reveal>

          {totalTopics > 0 && (
            <Reveal delay={120} className="progress-card">
              <div className="progress-card__row">
                <span className="progress-card__label">{t("progressLabel")}</span>
                <span className="progress-card__count">
                  {tr("progress", { done: doneTopics, total: totalTopics })}
                </span>
              </div>
              <span className="progress-card__track" aria-hidden="true">
                <span
                  className="progress-card__fill"
                  style={{ width: `${pct}%` }}
                />
              </span>
              <Link href={pathHref} className="progress-card__cta">
                {t("continueLearning")}
                <ArrowRight />
              </Link>
            </Reveal>
          )}
        </header>

        {sections.length > 0 && (
          <section className="path-section">
            <h2 className="blog-home__heading">{t("pathsHeading")}</h2>
            <div className="path-grid">
              {sections.map((section) => {
                const total = section.topics.length;
                const done = section.doneCount;
                const fillPct = total > 0 ? Math.round((done / total) * 100) : 0;
                return (
                  <Link
                    key={section.key}
                    href={`${pathHref}#sec-${section.key}`}
                    className="path-tile"
                  >
                    <span className="path-tile__head">
                      <span className="path-tile__name">{section.title}</span>
                      {done === 0 && (
                        <span className="path-tile__badge path-tile__badge--soon">
                          {t("sectionSoon")}
                        </span>
                      )}
                    </span>
                    <span className="path-tile__count">
                      {t("topicCount", { count: total })}
                    </span>
                    <span className="path-tile__track" aria-hidden="true">
                      <span
                        className="path-tile__fill"
                        style={{ width: `${fillPct}%` }}
                      />
                    </span>
                  </Link>
                );
              })}
            </div>
          </section>
        )}

        <section className="posts-section">
          <h2 className="blog-home__heading">{t("recentHeading")}</h2>
          {posts.length === 0 ? (
            <p className="blog-home__empty">{t("emptyArticles")}</p>
          ) : (
            <BlogExplorer
              posts={explorerPosts}
              tags={tags}
              searchLabel={t("searchLabel")}
              allLabel={t("allTopics")}
              tagsLabel={t("tagsHeading")}
              emptyLabel={t("noResults")}
              moreLabel={t("showAllTags", { count: hiddenTagCount })}
              lessLabel={t("showFewerTags")}
            />
          )}
        </section>
      </div>
    </main>
  );
}
