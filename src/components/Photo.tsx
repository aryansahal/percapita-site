import Image from "next/image";

/**
 * Placeholder photography with its attribution chip.
 *
 * The credit only exists because the current images are Unsplash-licensed
 * stand-ins. Once licensed client photography is dropped in, pass
 * `credit={null}` (or delete the prop) and the chip disappears.
 */
export function Photo({
  src,
  alt,
  credit,
  creditHref,
  priority = false,
  sizes = "100vw",
  creditAlign = "left",
}: {
  src: string;
  alt: string;
  credit?: string | null;
  creditHref?: string;
  priority?: boolean;
  sizes?: string;
  creditAlign?: "left" | "right";
}) {
  return (
    <>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover"
      />
      {credit ? (
        <a
          href={creditHref}
          target="_blank"
          rel="noopener noreferrer"
          className={`absolute bottom-[6px] z-10 max-w-[calc(100%-12px)] truncate rounded-[5px] bg-black/55 px-[7px] py-[3px] text-[10px] leading-[1.2] text-white backdrop-blur-[6px] hover:underline ${
            creditAlign === "right" ? "right-[6px]" : "left-[6px]"
          }`}
        >
          {credit}
        </a>
      ) : null}
    </>
  );
}
