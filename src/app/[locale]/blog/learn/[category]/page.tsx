import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { buildCurriculum } from "@/lib/curriculum";
import { CATEGORY_KEYS } from "@/lib/curriculum-structure";
import type { Locale, RoadmapCategory } from "@/lib/types";

type Props = {
  params: Promise<{ locale: Locale; category: string }>;
};

function Arrow({
  className,
  dir = "next",
}: {
  className: string;
  dir?: "prev" | "next";
}) {
  return (
    <svg
      className={className}
      width="18"
      height="18"
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

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    CATEGORY_KEYS.map((category) => ({ locale, category })),
  );
}

async function findCategory(locale: Locale, key: string) {
  const t = await getTranslations({ locale, namespace: "Roadmap" });
  const categories = t.raw("categories") as RoadmapCategory[];
  return categories.find((category) => category.key === key);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, category: categoryKey } = await params;
  const category = await findCategory(locale, categoryKey);

  if (!category) return {};

  const path = `/blog/learn/${categoryKey}`;
  const canonical = locale === "ar" ? `/ar${path}` : path;

  return {
    title: category.title,
    description: category.description,
    alternates: {
      canonical,
      languages: { en: path, ar: `/ar${path}` },
    },
    openGraph: {
      title: category.title,
      description: category.description,
      url: `https://mohamed.work${canonical}`,
    },
  };
}

export default async function LearningPathPage({ params }: Props) {
  const { locale, category: categoryKey } = await params;
  setRequestLocale(locale);

  const category = await findCategory(locale, categoryKey);
  if (!category) {
    notFound();
  }

  const t = await getTranslations("Roadmap");
  const tb = await getTranslations("Blog");
  const curriculum = buildCurriculum(category.sections, locale);
  const doneTopics = curriculum.reduce((n, s) => n + s.doneCount, 0);
  const totalTopics = curriculum.reduce((n, s) => n + s.topics.length, 0);
  const pct = totalTopics > 0 ? Math.round((doneTopics / totalTopics) * 100) : 0;

  return (
    <main id="main" className="blog-index roadmap">
      <section className="blog-hero">
        <div className="blog-shell">
          <Link href="/blog" className="blog-post__back">
            <Arrow className="blog-post__nav-arrow" dir="prev" />
            {tb("indexTitle")}
          </Link>
          <p className="section__label">
            {t("progress", { done: doneTopics, total: totalTopics })}
          </p>
          <h1 className="blog-hero__title">{category.title}</h1>
          <p className="blog-hero__description">{category.description}</p>
          <div className="path-progress" aria-hidden="true">
            <span className="path-progress__fill" style={{ width: `${pct}%` }} />
          </div>
        </div>
      </section>

      <div className="blog-shell roadmap__shell">
        {curriculum.map((section, si) => (
          <section key={section.key} className="roadmap-section">
            <header className="roadmap-section__head">
              <span className="roadmap-section__index" aria-hidden="true">
                {String(si + 1).padStart(2, "0")}
              </span>
              <div className="roadmap-section__heading">
                <h2 className="roadmap-section__title">{section.title}</h2>
                <p className="roadmap-section__desc">{section.description}</p>
              </div>
              <span className="roadmap-section__progress">
                {t("progress", {
                  done: section.doneCount,
                  total: section.topics.length,
                })}
              </span>
            </header>

            <ol className="roadmap-list">
              {section.topics.map((topic, ti) => {
                const num = String(ti + 1).padStart(2, "0");

                if (topic.post) {
                  return (
                    <li
                      key={topic.key}
                      className="roadmap-item roadmap-item--done"
                    >
                      <Link
                        href={`/blog/${topic.post.slug}`}
                        className="roadmap-item__link"
                      >
                        <span className="roadmap-item__num">{num}</span>
                        <span className="roadmap-item__title">{topic.title}</span>
                        <span className="roadmap-item__meta">
                          {tb("readingTime", {
                            minutes: topic.post.metadata.readingMinutes,
                          })}
                        </span>
                        <Arrow className="roadmap-item__arrow" dir="next" />
                      </Link>
                    </li>
                  );
                }

                return (
                  <li key={topic.key} className="roadmap-item roadmap-item--soon">
                    <span className="roadmap-item__num">{num}</span>
                    <span className="roadmap-item__title">{topic.title}</span>
                    <span className="roadmap-item__meta">{t("comingSoon")}</span>
                  </li>
                );
              })}
            </ol>
          </section>
        ))}
      </div>
    </main>
  );
}
