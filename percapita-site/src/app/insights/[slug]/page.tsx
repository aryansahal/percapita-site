import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ClientLoginProvider } from "@/components/ClientLogin";
import { MdxContent } from "@/components/MdxContent";
import { SiteFooter } from "@/components/SiteFooter";
import { WhatsAppFab } from "@/components/WhatsAppFab";
import { SiteHeader } from "@/components/SiteHeader";
import { CONTACT } from "@/lib/content";
import { formatPostDate, getPost, publishedPosts } from "@/lib/insights";
import { SITE_URL } from "@/lib/seo";

export function generateStaticParams() {
  return publishedPosts().map((post) => ({ slug: post.slug }));
}

/** Drafts and unknown slugs 404 rather than rendering. */
export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};

  const url = `${SITE_URL}/insights/${post.slug}`;
  return {
    title: post.title,
    description: post.summary,
    alternates: { canonical: `/insights/${post.slug}` },
    openGraph: {
      type: "article",
      url,
      title: post.title,
      description: post.summary,
      publishedTime: post.date,
      authors: [post.author],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.summary,
    },
  };
}

export default async function InsightPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.summary,
    datePublished: post.date,
    dateModified: post.date,
    inLanguage: "en-IN",
    author: { "@type": "Organization", name: post.author },
    publisher: { "@id": `${SITE_URL}/#organization` },
    mainEntityOfPage: `${SITE_URL}/insights/${post.slug}`,
  };

  return (
    <ClientLoginProvider>
      <SiteHeader />
      <main>
        <article className="bg-white">
          <div className="shell section-y">
            <header className="mx-auto max-w-[720px]">
              <Link
                href="/insights"
                className="text-[12px] font-semibold text-violet transition-colors duration-150 hover:text-purple"
              >
                &larr; All insights
              </Link>
              <h1 className="mt-5 text-[clamp(27px,3.8vw,38px)] leading-[1.18] font-bold tracking-[-0.03em] text-plum">
                {post.title}
              </h1>
              <p className="mt-4 text-[12.5px] text-muted">
                <time dateTime={post.date}>{formatPostDate(post.date)}</time>
                {" · "}
                {post.readingMinutes} min read
                {" · "}
                {post.author}
              </p>
            </header>

            <div className="mx-auto mt-[clamp(28px,3.5vw,40px)] max-w-[720px] border-t border-hair pt-[clamp(20px,2.5vw,28px)]">
              <MdxContent source={post.body} />
            </div>

            {/* Every post carries the advisory-only line. Percapita is an
                AMFI-registered distributor, and published commentary must not
                read as investment advice. Do not remove it per-post. */}
            <div className="mx-auto mt-[clamp(36px,4.5vw,52px)] max-w-[720px] border-t border-hair pt-[clamp(22px,3vw,28px)]">
              <p className="text-[11px] leading-[1.85] text-muted">
                Disclaimer : This article is for information only and is not
                investment advice or a recommendation to buy or sell any
                security. Investments are subject to market risks; read all
                scheme-related documents carefully before investing. No
                investment outcome is guaranteed. Percapita is an AMFI
                registered mutual fund distributor, {CONTACT.arn}.
              </p>

              <Link
                href="/#contact"
                className="mt-[clamp(22px,3vw,30px)] inline-block rounded-[2px] bg-purple px-6 py-[14px] text-[13px] font-semibold text-white transition-colors duration-150 hover:bg-purple-hover"
              >
                Talk to an Advisor
              </Link>
            </div>
          </div>
        </article>
      </main>
      <WhatsAppFab />
      <SiteFooter />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
    </ClientLoginProvider>
  );
}
