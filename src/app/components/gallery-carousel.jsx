"use client";

import { useCallback, useEffect, useState } from "react";

import { ChevronLeft, ChevronRight, Maximize, Minimize } from "lucide-react";

import Image from "@/app/components/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/app/components/ui/carousel";
import { Dialog, DialogContent, DialogTitle } from "@/app/components/ui/dialog";

/**
 * Accessible image carousel for the machinery and services galleries.
 *
 * Renders an aspect-ratio-aware stage (no letterbox), indicators below the
 * stage, a screen-reader live counter and an optional fullscreen modal.
 * Built on the `ui/carousel` primitive (embla): embla provides ←/→ keyboard,
 * native drag/swipe and no autoplay (WCAG 2.2.2); Home/End are added here;
 * Radix Dialog provides scroll lock, Escape-to-close and focus restoration
 * in fullscreen.
 *
 * All user-visible text is in Spanish (site language contract).
 *
 * @param {Object}   props               Component props.
 * @param {Array}    props.items         Gallery items: `{ id, url, alt? }`.
 * @param {string}   [props.ariaLabel]   Accessible name of the carousel. Defaults to "Galería de imágenes".
 * @param {string}   [props.sizes]       next/image `sizes` hint for slide images.
 * @param {number}   [props.imageWidth]  Intrinsic width hint for slide images.
 * @param {number}   [props.imageHeight] Intrinsic height hint for slide images.
 * @param {boolean}  [props.allowFullscreen] When true, adds a fullscreen toggle that opens the carousel in a modal.
 * @param {string}   [props.className]   Extra classes for the carousel root (inline mode only).
 * @returns {JSX.Element|null} The carousel markup, or `null` when `items` is empty.
 */
export default function GalleryCarousel({
  items,
  ariaLabel = "Galería de imágenes",
  sizes = "(max-width: 767px) 100vw, 60vw",
  imageWidth = 1000,
  imageHeight = 1000,
  allowFullscreen = false,
  className = "",
}) {
  const total = items?.length ?? 0;
  const [emblaApi, setEmblaApi] = useState(null);
  const [index, setIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  /**
   * Keeps `index` in sync with the embla selection, so indicators,
   * `aria-hidden` per slide and the live counter stay accurate.
   */
  useEffect(() => {
    if (!emblaApi) {
      return undefined;
    }

    const onSelection = () => setIndex(emblaApi.selectedScrollSnap());

    onSelection();
    emblaApi.on("select", onSelection);

    return () => emblaApi.off("select", onSelection);
  }, [emblaApi]);

  /**
   * Scrolls the carousel to a zero-based slide position.
   *
   * @param {number} destination Zero-based slide index to scroll to.
   * @returns {void}
   */
  const scrollToIndex = useCallback(
    (destination) => {
      if (!emblaApi || total < 2) return;
      emblaApi.scrollTo(destination);
    },
    [emblaApi, total],
  );

  /**
   * Scrolls the carousel relative to the current slide, wrapping at both ends.
   *
   * @param {number} delta Relative offset (-1 = previous, 1 = next).
   * @returns {void}
   */
  const scrollBy = useCallback(
    (delta) => {
      if (!emblaApi || total < 2) return;
      const destination = (index + delta + total) % total;
      emblaApi.scrollTo(destination);
    },
    [emblaApi, index, total],
  );

  /**
   * Enters or leaves fullscreen modal mode (rendered via Radix Dialog).
   *
   * @param {boolean} active True to enter fullscreen mode.
   * @returns {void}
   */
  const setFullscreen = useCallback((active) => {
    setIsFullscreen(active);
  }, []);

  /**
   * Handles Home/End keyboard jumps; ←/→ are handled by embla itself.
   *
   * @param {KeyboardEvent} event The platform key event from React.
   * @returns {void}
   */
  const handleKeyDown = useCallback(
    (event) => {
      if (event.key === "Home") {
        event.preventDefault();
        scrollToIndex(0);
      } else if (event.key === "End") {
        event.preventDefault();
        scrollToIndex(total - 1);
      }
    },
    [scrollToIndex, total],
  );

  if (total === 0) {
    return null;
  }

  /**
   * Renders the stage, arrows, indicators and live counter.
   *
   * In fullscreen the stage becomes a bounded flex slot (`min-h-0 flex-1`)
   * instead of an aspect box, and the embla viewport is absolutely positioned
   * inside the stage in both modes so slides always resolve to a definite
   * height (fixes photos rendering larger than the stage).
   *
   * @param {boolean} fullscreen Whether to render the fullscreen variant.
   * @returns {JSX.Element} The stage subtree.
   */
  const imageStage = (fullscreen) => (
    <>
      {/* Image stage — aspect-ratio box (inline) / bounded flex slot (fullscreen).
          The embla viewport is absolutely positioned inside so slides always
          resolve to a definite height (fixes oversized photos). */}
      <div
        className={
          fullscreen
            ? "relative h-full w-full min-h-0 flex-1 overflow-hidden rounded-xl bg-surface-inset"
            : "relative aspect-4/3 w-full overflow-hidden rounded-xl bg-surface-inset lg:aspect-video"
        }
      >
        {/* Embla viewport + slides */}
        <CarouselContent className="absolute inset-0 m-0 h-full">
          {items.map((item, i) => (
            <CarouselItem
              key={item.id ?? item.url ?? i}
              aria-label={`${i + 1} de ${total}`}
              aria-hidden={i !== index || undefined}
              className="relative h-full w-full p-0"
            >
              <Image
                src={item.url}
                alt={item.alt ?? `Imagen ${i + 1}`}
                width={imageWidth}
                height={imageHeight}
                sizes={sizes}
                priority={i === 0}
                className={`h-full w-full ${
                  fullscreen ? "object-contain" : "object-cover"
                }`}
              />
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Prev / next arrow buttons */}
        {total > 1 && (
          <>
            <button
              type="button"
              onClick={() => scrollBy(-1)}
              aria-label="Imagen anterior"
              className="absolute top-1/2 left-2 inline-flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-primary shadow-md transition-colors hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              <ChevronLeft aria-hidden="true" className="size-5" />
            </button>
            <button
              type="button"
              onClick={() => scrollBy(1)}
              aria-label="Imagen siguiente"
              className="absolute top-1/2 right-2 inline-flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-primary shadow-md transition-colors hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              <ChevronRight aria-hidden="true" className="size-5" />
            </button>
          </>
        )}

        {/* Fullscreen toggle button */}
        {allowFullscreen && (
          <button
            type="button"
            onClick={() => setFullscreen(!isFullscreen)}
            aria-pressed={isFullscreen}
            aria-label={
              isFullscreen
                ? "Salir de pantalla completa"
                : "Ver en pantalla completa"
            }
            className="absolute top-2 right-2 inline-flex size-11 items-center justify-center rounded-full bg-white/90 text-primary shadow-md transition-colors hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            {isFullscreen ? (
              <Minimize aria-hidden="true" className="size-5" />
            ) : (
              <Maximize aria-hidden="true" className="size-5" />
            )}
          </button>
        )}
      </div>

      {/* Indicators (dots) — below the stage, never overlaid on the photo */}
      {total > 1 && (
        <div className="mt-3 flex justify-center gap-2">
          {items.map((item, i) => (
            <button
              key={item.id ?? item.url ?? i}
              type="button"
              onClick={() => scrollToIndex(i)}
              aria-label={`Ir a la imagen ${i + 1}`}
              aria-current={i === index ? "true" : undefined}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === index
                  ? "w-6 bg-secondary"
                  : "w-2 bg-border hover:bg-secondary/60"
              }`}
            />
          ))}
        </div>
      )}

      {/* Live region — announces the current image for screen readers */}
      <span className="sr-only" aria-live="polite">
        {`Imagen ${index + 1} de ${total}`}
      </span>
    </>
  );

  /**
   * The inline carousel root: embla instance plus the Home/End keyboard
   * surface and the fullscreen maximized wrapper when active.
   */
  const carousel = (
    <Carousel
      setApi={setEmblaApi}
      opts={{ startIndex: index }}
      aria-label={ariaLabel}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      className={
        isFullscreen ? "flex h-full w-full min-h-0 flex-col" : className
      }
      data-carousel
    >
      {imageStage(isFullscreen)}
    </Carousel>
  );

  /**
   * Fullscreen return path: the same carousel subtree mounted inside a
   * Radix Dialog (scroll lock, Escape, focus restoration for free).
   */
  if (isFullscreen) {
    return (
      <Dialog
        open
        onOpenChange={(open) => {
          if (!open) setFullscreen(false);
        }}
      >
        <DialogContent
          showCloseButton={false}
          className="fixed inset-0 top-0 left-0 grid h-full w-full max-w-none translate-x-0 translate-y-0 rounded-none border-0 bg-transparent p-0 shadow-none sm:max-w-none"
          onInteractOutside={(e) => e.preventDefault()}
        >
          <DialogTitle className="sr-only">
            {`${ariaLabel} en pantalla completa`}
          </DialogTitle>
          <div className="flex h-full w-full flex-col items-center justify-center gap-3 p-4">
            {carousel}
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return carousel;
}
