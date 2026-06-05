import { defineConfig, defineCollection, s } from "velite";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";

const posts = defineCollection({
  name: "Post",
  pattern: "blog/**/*.mdx",
  schema: s
    .object({
      title: s.string().max(140),
      description: s.string(),
      publishedAt: s.isodate(),
      updatedAt: s.isodate().optional(),
      tags: s.array(s.string()).default([]),
      translationKey: s.string().optional(),
      // Derived, no compile needed for the first three:
      path: s.path(),
      toc: s.toc(),
      meta: s.metadata(),
      // Compiled MDX body (function-body output) — only read on the post page:
      code: s.mdx(),
    })
    .transform((data) => {
      // path looks like "blog/en/html-semantic"
      const segments = data.path.split("/");
      const locale = segments[1] ?? "en";
      const slug = segments[2] ?? data.path;

      return {
        slug,
        locale,
        translationKey: data.translationKey ?? slug,
        toc: data.toc,
        code: data.code,
        metadata: {
          title: data.title,
          description: data.description,
          publishedAt: data.publishedAt,
          updatedAt: data.updatedAt,
          tags: data.tags,
          readingMinutes: Math.max(1, Math.round(data.meta.readingTime)),
        },
      };
    }),
});

export default defineConfig({
  root: "src/content",
  output: {
    data: ".velite",
    assets: "public/static",
    base: "/static/",
    name: "[name]-[hash:6].[ext]",
    clean: true,
  },
  collections: { posts },
  mdx: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypeSlug],
  },
});
