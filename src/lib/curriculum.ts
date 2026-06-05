import { getBlogPostByKey, type BlogPost } from "@/lib/blog";
import type { Locale, RoadmapCategory, RoadmapSection } from "@/lib/types";

export interface CategorySummary {
  readonly key: string;
  readonly title: string;
  readonly description: string;
  readonly total: number;
  readonly done: number;
}

// One entry per category for the blog index, with published/total counts.
export function summarizeCategories(
  categories: readonly RoadmapCategory[],
  locale: Locale,
): CategorySummary[] {
  return categories.map((category) => {
    const topics = category.sections.flatMap((section) => section.topics);
    return {
      key: category.key,
      title: category.title,
      description: category.description,
      total: topics.length,
      done: topics.filter((topic) => getBlogPostByKey(locale, topic.key)).length,
    };
  });
}

export interface CurriculumTopic {
  readonly key: string;
  readonly title: string;
  readonly post: BlogPost | undefined;
}

export interface CurriculumSection {
  readonly key: string;
  readonly title: string;
  readonly description: string;
  readonly topics: readonly CurriculumTopic[];
  readonly doneCount: number;
}

// Join the curriculum skeleton (from messages) with the posts that exist for
// each topic key. A topic is "published" when a post shares its translationKey.
export function buildCurriculum(
  sections: readonly RoadmapSection[],
  locale: Locale,
): CurriculumSection[] {
  return sections.map((section) => {
    const topics = section.topics.map((topic) => ({
      key: topic.key,
      title: topic.title,
      post: getBlogPostByKey(locale, topic.key),
    }));

    return {
      key: section.key,
      title: section.title,
      description: section.description,
      topics,
      doneCount: topics.filter((topic) => topic.post).length,
    };
  });
}

export interface PathNeighbor {
  readonly slug: string;
  readonly title: string;
}

// Walk the whole path in curriculum order, skipping unwritten topics, to find
// the previous/next published post and the section the current post lives in.
export function getCurriculumNeighbors(
  sections: readonly RoadmapSection[],
  locale: Locale,
  translationKey: string,
): {
  sectionTitle: string | undefined;
  prev: PathNeighbor | null;
  next: PathNeighbor | null;
} {
  const published: { key: string; post: BlogPost }[] = [];
  let sectionTitle: string | undefined;

  for (const section of sections) {
    for (const topic of section.topics) {
      if (topic.key === translationKey) sectionTitle = section.title;
      const post = getBlogPostByKey(locale, topic.key);
      if (post) published.push({ key: topic.key, post });
    }
  }

  const index = published.findIndex((entry) => entry.key === translationKey);
  const prev = index > 0 ? published[index - 1] : undefined;
  const next =
    index >= 0 && index < published.length - 1 ? published[index + 1] : undefined;

  const toNeighbor = (entry?: { post: BlogPost }): PathNeighbor | null =>
    entry ? { slug: entry.post.slug, title: entry.post.metadata.title } : null;

  return { sectionTitle, prev: toNeighbor(prev), next: toNeighbor(next) };
}
