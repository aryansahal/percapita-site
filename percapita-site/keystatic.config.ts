import { config, fields, collection } from "@keystatic/core";

/**
 * The /keystatic editor for Insights posts.
 *
 * It writes the same Markdown files `src/lib/insights.ts` reads, so the site
 * has no database and no second copy of a post. In development it edits
 * `content/insights` on disk; in production it commits to GitHub, where a post
 * still needs a reviewed pull request before it reaches `main` - that review is
 * the compliance read, so the editor deliberately has no "publish" of its own.
 *
 * NEXT_PUBLIC_KEYSTATIC_STORAGE=github forces GitHub mode in development, which
 * the one-time GitHub App setup needs. See docs/INSIGHTS-EDITOR.md.
 */
export default config({
  storage:
    process.env.NODE_ENV === "development" &&
    process.env.NEXT_PUBLIC_KEYSTATIC_STORAGE !== "github"
      ? { kind: "local" }
      : {
          kind: "github",
          repo: "aryansahal/percapita-site",
          // The app lives in a subfolder of the repository.
          pathPrefix: "percapita-site",
          branchPrefix: "insights/",
        },
  ui: {
    brand: { name: "Percapita Insights" },
  },
  collections: {
    insights: collection({
      label: "Insights",
      slugField: "title",
      path: "content/insights/*",
      format: { contentField: "body" },
      entryLayout: "content",
      columns: ["title", "date"],
      schema: {
        title: fields.slug({
          name: { label: "Title", validation: { isRequired: true } },
          slug: {
            label: "URL slug",
            description: "The post lives at /insights/<slug>. Changing it after publishing breaks shared links.",
          },
        }),
        summary: fields.text({
          label: "Summary",
          description: "Shown on the index card and as the search-result description. One or two sentences.",
          multiline: true,
          validation: { isRequired: true, length: { max: 200 } },
        }),
        date: fields.date({
          label: "Date",
          defaultValue: { kind: "today" },
          validation: { isRequired: true },
        }),
        author: fields.text({
          label: "Author",
          defaultValue: "Percapita Advisors",
        }),
        topic: fields.text({
          label: "Topic",
          description: "Optional. Shown as the eyebrow on the index card, e.g. Fees.",
        }),
        draft: fields.checkbox({
          label: "Draft",
          description: "Hidden from the site, sitemap and search while ticked.",
          defaultValue: true,
        }),
        // Only what MdxContent styles. Images, code blocks and strikethrough
        // stay off until it has a mapping for them.
        body: fields.mdx({
          label: "Body",
          extension: "md",
          options: {
            heading: [2, 3],
            strikethrough: false,
            image: false,
            codeBlock: false,
          },
        }),
      },
    }),
  },
});
