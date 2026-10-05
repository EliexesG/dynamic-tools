import NextImage from "next/image";

/**
 * Shared image wrapper — the only sanctioned way to render site images.
 * Wraps `next/image` with a fixed blur placeholder (1px transparent GIF)
 * applied to every usage, so asynchronous image decoding never flashes an
 * empty box while the real image streams in.
 *
 * Do not import raw `next/image` in pages/features; extend this wrapper
 * instead when a new next/image prop is needed.
 *
 * `alt` texts stay in Spanish (site language contract); gallery captions
 * surface them in the lightbox.
 *
 * @param {Object}  props         Component props (all passed to next/image except `style` merge notes below).
 * @param {string}  [props.id]    Optional DOM id.
 * @param {string}  props.src     Image URL or public path.
 * @param {number}  props.width   Intrinsic width (hint for aspect ratio).
 * @param {number}  props.height  Intrinsic height (hint for aspect ratio).
 * @param {string}  [props.className] Tailwind classes applied to the img element.
 * @param {string}  props.alt     Accessible alternative text (Spanish).
 * @param {string}  [props.sizes] next/image `sizes` hint controlling responsive candidate sizes.
 * @param {boolean} [props.priority] When true, the image is preloaded (used for hero/LCP images).
 * @param {Object}  [props.style] Inline style passthrough.
 * @param {...Object} rest        Any other next/image prop (`loading`, `unoptimized`, `objectPosition`, …) is forwarded.
 * @returns {JSX.Element} The rendered next/image element with blur placeholder.
 */
export default function Image({
  id,
  src,
  width,
  height,
  className,
  alt,
  sizes,
  priority,
  style,
  ...rest
}) {
  return (
    <NextImage
      id={id}
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      sizes={sizes}
      priority={priority}
      style={style}
      placeholder="blur"
      blurDataURL="data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNU0lCqBwABzQDtAzswxwAAAABJRU5ErkJggg=="
      {...rest}
    />
  );
}
