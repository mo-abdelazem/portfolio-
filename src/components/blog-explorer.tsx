"use client";

import { useMemo, useState } from "react";
import { Link } from "@/i18n/navigation";

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
}

export function BlogExplorer({
  posts,
  tags,
  searchLabel,
  allLabel,
  tagsLabel,
  emptyLabel,
}: BlogExplorerProps) {
  const [query, setQuery] = useState("");
  const [activeTag, setActiveTag] = useState<string | null>(null);

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
            className={`tag-chip ${activeTag === null ? "tag-chip--active" : ""}`}
            aria-pressed={activeTag === null}
            onClick={() => setActiveTag(null)}
          >
            {allLabel}
          </button>
          {tags.map((tag) => {
            const active = activeTag === tag.tag;
            return (
              <button
                key={tag.slug}
                type="button"
                className={`tag-chip ${active ? "tag-chip--active" : ""}`}
                aria-pressed={active}
                onClick={() => setActiveTag(active ? null : tag.tag)}
              >
                {tag.tag}
                <span className="tag-chip__count">{tag.count}</span>
              </button>
            );
          })}
        </div>
      )}

      {filtered.length === 0 ? (
        <p className="blog-home__empty" style={{ marginTop: "28px" }}>
          {emptyLabel}
        </p>
      ) : (
        <div className="post-grid">
          {filtered.map((post) => (
            <article key={post.slug} className="grid-card">
              <div className="grid-card__meta">
                <time dateTime={post.publishedAt}>{post.date}</time>
                <span className="post-card__sep" aria-hidden="true" />
                <span>{post.readingLabel}</span>
              </div>
              <h3 className="grid-card__title">
                <Link href={`/blog/${post.slug}`}>{post.title}</Link>
              </h3>
              <p className="grid-card__desc">{post.description}</p>
              <div className="grid-card__tags">
                {post.tags.slice(0, 3).map((tag) => (
                  <span key={tag} className="tag-chip tag-chip--static">
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      )}
    </>
  );
}
