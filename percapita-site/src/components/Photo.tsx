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
  objectPosition,
}: {
  src: string;
  alt: string;
  priority?: boolean;
  sizes?: string;
  /** Which part of the photo survives the crop, e.g. "70% 50%". Defaults to
   *  centre. Set it when centring cuts a face off. */
  objectPosition?: string;
}) {
  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      style={objectPosition ? { objectPosition } : undefined}
      className="object-cover"
    />
  );
}
