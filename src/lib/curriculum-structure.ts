import enMessages from "../../messages/en.json";

// The curriculum's *structure* (category/section/topic keys) is identical
// across locales — only the titles differ. We read it from one locale so that
// locale-independent concerns (URLs, which category a topic belongs to) have a
// single source without needing a request context.
interface StructureTopic {
  readonly key: string;
}
interface StructureSection {
  readonly key: string;
  readonly topics: readonly StructureTopic[];
}
interface StructureCategory {
  readonly key: string;
  readonly sections: readonly StructureSection[];
}

export const CATEGORY_KEYS: readonly string[] =
  enMessages.Roadmap.categories.map((category) => category.key);

const topicToCategory = new Map<string, string>();
for (const category of enMessages.Roadmap
  .categories as readonly StructureCategory[]) {
  for (const section of category.sections) {
    for (const topic of section.topics) {
      topicToCategory.set(topic.key, category.key);
    }
  }
}

// Which category a topic (translationKey) belongs to. Undefined if the post is
// not part of any curriculum category.
export function categoryKeyForTopic(topicKey: string): string | undefined {
  return topicToCategory.get(topicKey);
}
