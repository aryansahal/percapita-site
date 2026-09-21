import Image from "next/image";

/**
 * A photo that fills its (positioned) container.
 *
 * No attribution chip: the Unsplash Licence covers commercial use "without
 * permission from or attributing the photographer". The images are still
 * placeholders that need replacing before launch — see OPEN-ITEMS.md.
 */
export function Photo({
  src,
  alt,
  priority = false,
  sizes = "100vw",
}: {
  src: string;
  alt: string;
  priority?: boolean;
  sizes?: string;
}) {
  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      className="object-cover"
    />
  );
}
