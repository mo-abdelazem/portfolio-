"use client";

import { useMemo, useState } from "react";
import { Link } from "@/i18n/navigation";
import { Card } from "@/components/ui/card";
import { TagChip, TagCount, tagChipVariants } from "@/components/ui/tag-chip";
import { cn } from "@/lib/utils";

export interface ExplorerPost {
  slug: string;
  title: string;
  description: string;
  tags: readonly string[];
  publishedAt: string;
  date: string;
  readingLabel: string;
}

interface ExplorerTag {
  tag: string;
  slug: string;
  count: number;
}

interface BlogExplorerProps {
  posts: readonly ExplorerPost[];
  tags: readonly ExplorerTag[];
  searchLabel: string;
  allLabel: string;
  tagsLabel: string;
  emptyLabel: string;
  moreLabel: string;
  lessLabel: string;
}

export function BlogExplorer({
  posts,
  tags,
  searchLabel,
  allLabel,
  tagsLabel,
  emptyLabel,
  moreLabel,
  lessLabel,
}: BlogExplorerProps) {
  const [query, setQuery] = useState("");
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [showAllTags, setShowAllTags] = useState(false);

  // Tags used more than once make useful filters; the long tail of
  // single-use tags is hidden behind a toggle so it doesn't wall off the grid.
  const frequentTags = useMemo(() => tags.filter((t) => t.count > 1), [tags]);
  const hasTail = frequentTags.length > 0 && tags.length > frequentTags.length;
  const visibleTags =
    showAllTags || !hasTail
      ? tags
      : // keep the active tag visible even if it's in the tail
        activeTag && !frequentTags.some((t) => t.tag === activeTag)
        ? [...frequentTags, ...tags.filter((t) => t.tag === activeTag)]
        : frequentTags;

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return posts.filter((post) => {
      const matchesTag = !activeTag || post.tags.includes(activeTag);
      const matchesQuery =
        !needle ||
        post.title.toLowerCase().includes(needle) ||
        post.description.toLowerCase().includes(needle) ||
        post.tags.some((tag) => tag.toLowerCase().includes(needle));
      return matchesTag && matchesQuery;
    });
  }, [posts, query, activeTag]);

  return (
    <>
      <div className="explorer__search">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.6" />
          <path
            d="m20 20-3-3"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={searchLabel}
          aria-label={searchLabel}
        />
      </div>

      {tags.length > 0 && (
        <div className="explorer__tags" role="group" aria-label={tagsLabel}>
          <button
            type="button"
            className={cn(tagChipVariants({ active: activeTag === null }))}
            aria-pressed={activeTag === null}
            onClick={() => setActiveTag(null)}
          >
            {allLabel}
          </button>
          {visibleTags.map((tag) => {
            const active = activeTag === tag.tag;
            return (
              <button
                key={tag.slug}
                type="button"
                className={cn(tagChipVariants({ active }))}
                aria-pressed={active}
                onClick={() => setActiveTag(active ? null : tag.tag)}
              >
                {tag.tag}
                <TagCount active={active}>{tag.count}</TagCount>
              </button>
            );
          })}
          {hasTail && (
            <button
              type="button"
              className="explorer__more"
              aria-expanded={showAllTags}
              onClick={() => setShowAllTags((v) => !v)}
            >
              {showAllTags ? lessLabel : moreLabel}
            </button>
          )}
        </div>
      )}

      {filtered.length === 0 ? (
        <p className="blog-home__empty" style={{ marginTop: "28px" }}>
          {emptyLabel}
        </p>
      ) : (
        <div className="post-grid">
          {filtered.map((post) => (
            <Card
              key={post.slug}
              as="article"
              interactive
              className="relative flex flex-col gap-2.5 p-6"
            >
              <div className="flex flex-wrap items-center gap-2.5 text-[13px] text-muted-foreground">
                <time dateTime={post.publishedAt}>{post.date}</time>
                <span className="post-card__sep" aria-hidden="true" />
                <span>{post.readingLabel}</span>
              </div>
              <h3 className="text-xl font-normal leading-[1.3] tracking-[-0.2px] text-foreground">
                <Link
                  href={`/blog/${post.slug}`}
                  className="after:absolute after:inset-0 after:content-['']"
                >
                  {post.title}
                </Link>
              </h3>
              <p className="text-[14.5px] leading-[1.6] text-secondary-foreground">
                {post.description}
              </p>
              <div className="relative z-[1] mt-auto flex flex-wrap gap-[7px] pt-1">
                {post.tags.slice(0, 3).map((tag) => (
                  <TagChip key={tag}>{tag}</TagChip>
                ))}
              </div>
            </Card>
          ))}
        </div>
      )}
    </>
  );
}
