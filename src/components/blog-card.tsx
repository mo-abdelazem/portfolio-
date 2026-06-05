import { Link } from "@/i18n/navigation";
import type { BlogPost } from "@/lib/blog";

interface BlogCardProps {
  post: BlogPost;
  tagsLabel: string;
  date: string;
  readingLabel: string;
  featured?: boolean;
  featuredLabel?: string;
}

function Arrow() {
  return (
    <svg
      className="post-card__arrow"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M5 12h14M13 6l6 6-6 6"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function BlogCard({
  post,
  tagsLabel,
  date,
  readingLabel,
  featured = false,
  featuredLabel,
}: BlogCardProps) {
  const Heading = featured ? "h2" : "h3";

  return (
    <article className={`post-card ${featured ? "post-card--featured" : ""}`}>
      <div className="post-card__meta">
        {featured && featuredLabel && (
          <span className="post-card__badge">{featuredLabel}</span>
        )}
        <time dateTime={post.metadata.publishedAt}>{date}</time>
        <span className="post-card__sep" aria-hidden="true" />
        <span>{readingLabel}</span>
      </div>

      <Heading className="post-card__title">
        <Link href={`/blog/${post.slug}`}>{post.metadata.title}</Link>
      </Heading>

      <p className="post-card__desc">{post.metadata.description}</p>

      <div className="post-card__footer">
        <div className="post-card__tags" aria-label={tagsLabel}>
          {post.metadata.tags.map((tag) => (
            <span key={tag} className="tag-chip tag-chip--static">
              {tag}
            </span>
          ))}
        </div>
        <Arrow />
      </div>
    </article>
  );
}
