import Link from "next/link";
import { formatPostDate, publishedPosts } from "@/lib/insights";

/**
 * Recent Insights on the homepage.
 *
 * A server component reading the filesystem at build time, so it costs no
 * client JavaScript - same as the Insights index itself.
 *
 * Renders nothing at all when there are no published posts. An empty
 * "Insights" heading with a lone "read more" link is worse than no section,
 * and the site ships with a single post.
 *
 * OPEN ITEM: the headline is ours, not the client's, as with Services and
 * FAQs. See OPEN-ITEMS.md.
 */
export function InsightsTiles() {
  const posts = publishedPosts().slice(0, 3);
  if (posts.length === 0) return null;

  return (
    <section className="bg-white">
      <div className="shell section-y">
        <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-6">
          <div className="min-w-0">
            <p className="eyebrow eyebrow-gap text-violet">Insights</p>
            <h2 className="h2-display text-plum">Notes from our desk.</h2>
          </div>
          <Link
            href="/insights"
            className="flex-none rounded-[2px] border border-outline px-6 py-[14px] text-[13px] font-semibold text-purple transition-colors duration-150 hover:border-purple"
          >
            Read all insights
          </Link>
        </div>

        {/* Columns capped at the number of posts: a three-column grid holding
            one card leaves two empty cells and reads as a broken layout. */}
        <ul
          className={`mt-[clamp(32px,4vw,44px)] grid list-none grid-cols-1 gap-x-[clamp(24px,3vw,40px)] gap-y-[clamp(28px,3.5vw,40px)] ${
            posts.length === 1
              ? "max-w-[520px]"
              : posts.length === 2
                ? "sm:grid-cols-2"
                : "sm:grid-cols-2 lg:grid-cols-3"
          }`}
        >
          {posts.map((post) => (
            <li key={post.slug} className="flex border-t border-hair">
              {/* The whole card is the link, so the target is the card rather
                  than a few words of title text. */}
              <Link
                href={`/insights/${post.slug}`}
                className="group flex w-full flex-col pt-[clamp(20px,2.4vw,26px)]"
              >
                <p className="text-[10px] font-bold tracking-[0.16em] uppercase text-violet">
                  {post.topic ?? "Insight"}
                </p>
                <h3 className="mt-3 text-[clamp(17px,2vw,19px)] leading-[1.3] font-bold tracking-[-0.02em] text-plum transition-colors duration-150 group-hover:text-purple-accent">
                  {post.title}
                </h3>
                {post.summary ? (
                  <p className="mt-2.5 text-[13.5px] leading-[1.75] text-ink-3">
                    {post.summary}
                  </p>
                ) : null}
                <p className="mt-auto pt-[22px] text-[11.5px] text-muted">
                  <time dateTime={post.date}>{formatPostDate(post.date)}</time>
                  {" · "}
                  {post.readingMinutes} min read
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
