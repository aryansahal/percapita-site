import { MDXRemote } from "next-mdx-remote/rsc";
import type { ComponentPropsWithoutRef } from "react";

/**
 * Markdown rendered through the site's own type scale.
 *
 * Every element is mapped explicitly rather than dropped into a generic prose
 * class, so a post cannot introduce a heading size or link colour that exists
 * nowhere else on the site. If a post needs something new, add it here.
 */
const components = {
  h2: (props: ComponentPropsWithoutRef<"h2">) => (
    <h2
      className="mt-[clamp(34px,4vw,48px)] text-[clamp(21px,2.6vw,26px)] leading-[1.25] font-bold tracking-[-0.025em] text-plum"
      {...props}
    />
  ),
  h3: (props: ComponentPropsWithoutRef<"h3">) => (
    <h3
      className="mt-[clamp(26px,3vw,34px)] text-[17px] leading-[1.35] font-bold text-plum"
      {...props}
    />
  ),
  p: (props: ComponentPropsWithoutRef<"p">) => (
    <p className="mt-4 text-[15.5px] leading-[1.8] text-ink-3" {...props} />
  ),
  ul: (props: ComponentPropsWithoutRef<"ul">) => (
    <ul
      className="mt-4 flex list-none flex-col gap-2.5 text-[15.5px] leading-[1.7] text-ink-3"
      {...props}
    />
  ),
  ol: (props: ComponentPropsWithoutRef<"ol">) => (
    <ol
      className="mt-4 flex list-decimal flex-col gap-2.5 pl-5 text-[15.5px] leading-[1.7] text-ink-3 marker:font-bold marker:text-violet"
      {...props}
    />
  ),
  // Flex, not an inline ::before: an inline marker lets the second line of a
  // wrapped bullet start back at the margin instead of under the first word.
  li: (props: ComponentPropsWithoutRef<"li">) => (
    <li
      className="[ul>&]:flex [ul>&]:gap-2.5 [ul>&]:before:mt-[9px] [ul>&]:before:flex-none [ul>&]:before:text-[7px] [ul>&]:before:leading-none [ul>&]:before:text-lilac [ul>&]:before:content-['◆']"
      {...props}
    />
  ),
  a: (props: ComponentPropsWithoutRef<"a">) => (
    <a
      className="font-medium text-purple underline decoration-field underline-offset-[3px] transition-colors duration-150 hover:text-purple-accent hover:decoration-purple-accent"
      {...props}
    />
  ),
  strong: (props: ComponentPropsWithoutRef<"strong">) => (
    <strong className="font-semibold text-plum" {...props} />
  ),
  blockquote: (props: ComponentPropsWithoutRef<"blockquote">) => (
    <blockquote
      className="mt-6 border-l-2 border-violet pl-5 text-[clamp(16px,2vw,19px)] leading-[1.6] font-semibold text-plum [&>p]:mt-0"
      {...props}
    />
  ),
  hr: () => <hr className="mt-10 border-0 border-t border-hair" />,
  code: (props: ComponentPropsWithoutRef<"code">) => (
    <code
      className="rounded-[2px] bg-surface px-1.5 py-0.5 font-mono text-[13.5px] text-plum"
      {...props}
    />
  ),
  table: (props: ComponentPropsWithoutRef<"table">) => (
    <div className="mt-6 overflow-x-auto">
      <table className="w-full border-collapse text-[14px]" {...props} />
    </div>
  ),
  th: (props: ComponentPropsWithoutRef<"th">) => (
    <th
      className="border-b border-hair pb-2.5 text-left text-[11px] font-bold tracking-[0.12em] uppercase text-violet"
      {...props}
    />
  ),
  td: (props: ComponentPropsWithoutRef<"td">) => (
    <td
      className="border-b border-hair py-3 pr-5 align-top leading-[1.7] text-ink-3"
      {...props}
    />
  ),
};

export function MdxContent({ source }: { source: string }) {
  return <MDXRemote source={source} components={components} />;
}
