import type { Metadata } from "next";
import Link from "next/link";
import { ClientLoginProvider } from "@/components/ClientLogin";
import { SiteFooter } from "@/components/SiteFooter";
import { WhatsAppFab } from "@/components/WhatsAppFab";
import { SiteHeader } from "@/components/SiteHeader";
import { formatPostDate, publishedPosts } from "@/lib/insights";

export const metadata: Metadata = {
  title: "Insights",
  description:
    "Plain-English notes on financial planning, investing and the decisions around them, from Percapita Advisors. ARN 142346.",
  alternates: { canonical: "/insights" },
};

export default function InsightsIndex() {
  const posts = publishedPosts();

  return (
    <ClientLoginProvider>
      <SiteHeader />
      <main>
        <section className="bg-white">
          <div className="shell section-y">
            <header className="max-w-[760px]">
              <p className="eyebrow eyebrow-gap text-violet">Insights</p>
              <h1 className="h2-display text-plum">
                Less noise. More context.
              </h1>
              <p className="mt-5 text-[15.5px] leading-[1.8] text-ink-3">
                Notes on financial planning, investing and the decisions around
                them. Written plainly, without the jargon.
              </p>
            </header>

            {posts.length === 0 ? (
              <p className="mt-[clamp(32px,4vw,44px)] border-t border-hair pt-8 text-[15px] leading-[1.8] text-ink-3">
                Nothing published yet. In the meantime, the{" "}
                <Link
                  href="/#faqs"
                  className="font-medium text-purple underline decoration-field underline-offset-[3px] hover:text-purple-accent"
                >
                  FAQs
                </Link>{" "}
                answer what clients ask most.
              </p>
            ) : (
              /* A rule per card, not gap-px over a tinted container: that
                 trick needs the cells to fill the grid, and with one post the
                 exposed background reads as a large empty block. */
              <ul className="mt-[clamp(32px,4vw,44px)] grid list-none grid-cols-1 gap-x-[clamp(24px,3vw,40px)] gap-y-[clamp(28px,3.5vw,40px)] sm:grid-cols-2 lg:grid-cols-3">
                {posts.map((post) => (
                  <li key={post.slug} className="flex border-t border-hair">
                    {/* The whole card is the link, so the target is the card
                        rather than a few words of title text. */}
                    <Link
                      href={`/insights/${post.slug}`}
                      className="group flex w-full flex-col pt-[clamp(20px,2.4vw,26px)]"
                    >
                      <p className="text-[10px] font-bold tracking-[0.16em] uppercase text-violet">
                        {post.topic ?? "Insight"}
                      </p>
                      <h2 className="mt-3 text-[clamp(17px,2vw,19px)] leading-[1.3] font-bold tracking-[-0.02em] text-plum transition-colors duration-150 group-hover:text-purple-accent">
                        {post.title}
                      </h2>
                      {post.summary ? (
                        <p className="mt-2.5 text-[13.5px] leading-[1.75] text-ink-3">
                          {post.summary}
                        </p>
                      ) : null}
                      <p className="mt-auto pt-[22px] text-[11.5px] text-muted">
                        <time dateTime={post.date}>
                          {formatPostDate(post.date)}
                        </time>
                        {" · "}
                        {post.readingMinutes} min read
                      </p>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>
      </main>
      <WhatsAppFab />
      <SiteFooter />
    </ClientLoginProvider>
  );
}
