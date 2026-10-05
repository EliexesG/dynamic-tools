"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import Image from "@/app/components/image";
import { Button } from "@/app/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/app/components/ui/dialog";
import TitleBanner from "@/app/components/title-banner";

const GRID_SIZES =
  "(max-width: 639.98px) 100vw, (max-width: 1023.98px) 50vw, 33vw";
const LIGHTBOX_SIZES = "(max-width: 1024px) 100vw, 1024px";
const ZOOM_MAX = 3;
const ZOOM_STEP = 0.5;
const SWIPE_MIN = 50;

/**
 * Image gallery grid with a viewer (lightbox): thumbnails open a fullscreen
 * Radix Dialog where the active image can be zoomed (buttons or +/− keys),
 * panned while zoomed (pointer drag) and swiped (touch). Radix Dialog
 * provides scroll lock, Escape-to-close, Tab trapping and focus restoration;
 * ←/→ arrows and the keyboard zoom shortcuts are handled here.
 *
 * All styles are Tailwind utilities (the former co-located stylesheet was
 * fully removed); user-visible text stays Spanish.
 *
 * @param {Object}  props          Component props.
 * @param {Array}   props.images   Gallery items: `{ id, url, alt? }` (data contract from `src/lib/data.js`).
 * @returns {JSX.Element} The thumbnails grid plus the dialog-based lightbox.
 */
export default function ImagesGallery({ images }) {
  const [activeIndex, setActiveIndex] = useState(null);
  const [zoom, setZoom] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const dragRef = useRef(null);
  const touchRef = useRef(null);

  const total = images.length;
  const isOpen = activeIndex !== null;

  /**
   * Closes the viewer and resets zoom/pan state.
   *
   * @returns {void}
   */
  const closeViewer = useCallback(() => {
    setActiveIndex(null);
    setZoom(1);
    setOffset({ x: 0, y: 0 });
  }, []);

  /**
   * Moves to a relative position, wrapping at both ends; resets zoom/pan.
   *
   * @param {number} delta Relative offset (-1 = previous, 1 = next).
   * @returns {void}
   */
  const navigate = useCallback(
    (delta) => {
      setZoom(1);
      setOffset({ x: 0, y: 0 });
      setActiveIndex((current) =>
        current === null ? current : (current + delta + total) % total,
      );
    },
    [total],
  );

  const previous = useCallback(() => navigate(-1), [navigate]);
  const next = useCallback(() => navigate(1), [navigate]);

  /**
   * Changes the zoom level, clamped to [1, ZOOM_MAX].
   *
   * @param {number} delta Zoom step (+ zoom in, - zoom out).
   * @returns {void}
   */
  const zoomBy = useCallback((delta) => {
    setZoom((current) => Math.min(ZOOM_MAX, Math.max(1, current + delta)));
  }, []);

  /**
   * Resets the pan offset whenever zoom goes back to 1 (image is unclipped).
   */
  useEffect(() => {
    if (zoom === 1) {
      setOffset({ x: 0, y: 0 });
    }
  }, [zoom]);

  /**
   * Opens the viewer on a given thumbnail.
   *
   * @param {number} index Zero-based thumbnail index to show.
   * @returns {void}
   */
  const openViewer = (index) => {
    setZoom(1);
    setOffset({ x: 0, y: 0 });
    setActiveIndex(index);
  };

  /**
   * Keyboard shortcuts of the viewer. Escape (close), the Tab trap, scroll
   * locking and focus restoration are provided by Radix Dialog.
   */
  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const handleKeyDown = (event) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        previous();
        return;
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        next();
        return;
      }
      if (event.key === "+" || event.key === "=") {
        event.preventDefault();
        zoomBy(ZOOM_STEP);
        return;
      }
      if (event.key === "-" || event.key === "_") {
        event.preventDefault();
        zoomBy(-ZOOM_STEP);
        return;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, previous, next, zoomBy]);

  /**
   * Starts panning the image while zoomed (pointer capture for smooth drag).
   *
   * @param {React.PointerEvent<HTMLDivElement>} event Pointer sequence opener.
   * @returns {void}
   */
  const startDrag = (event) => {
    if (zoom <= 1) {
      return;
    }
    dragRef.current = {
      x: event.clientX,
      y: event.clientY,
      startOffsetX: offset.x,
      startOffsetY: offset.y,
    };
    event.currentTarget.setPointerCapture?.(event.pointerId);
  };

  /**
   * Moves the pan offset while dragging (the start anchor lives in `dragRef`).
   *
   * @param {React.PointerEvent<HTMLDivElement>} event Pointer move event.
   * @returns {void}
   */
  const onDrag = (event) => {
    if (!dragRef.current) {
      return;
    }
    setOffset({
      x: dragRef.current.startOffsetX + (event.clientX - dragRef.current.x),
      y: dragRef.current.startOffsetY + (event.clientY - dragRef.current.y),
    });
  };

  /**
   * Finishes the pan gesture (pointer up / cancel).
   *
   * @returns {void}
   */
  const endDrag = () => {
    dragRef.current = null;
  };

  /**
   * Records the touch start position when not zoomed (swipe detection).
   *
   * @param {React.TouchEvent<HTMLDivElement>} event Touch sequence opener.
   * @returns {void}
   */
  const handleTouchStart = (event) => {
    if (zoom > 1) {
      return;
    }
    const touch = event.changedTouches[0];
    touchRef.current = { x: touch.clientX, y: touch.clientY };
  };

  /**
   * Ends the swipe gesture: navigates when displacement exceeds the
   * horizontal threshold.
   *
   * @param {React.TouchEvent<HTMLDivElement>} event Touch sequence closer.
   * @returns {void}
   */
  const handleTouchEnd = (event) => {
    if (zoom > 1 || !touchRef.current) {
      return;
    }
    const touch = event.changedTouches[0];
    const dx = touch.clientX - touchRef.current.x;
    const dy = touch.clientY - touchRef.current.y;
    touchRef.current = null;
    if (Math.abs(dx) > SWIPE_MIN && Math.abs(dx) > Math.abs(dy)) {
      if (dx < 0) {
        next();
      } else {
        previous();
      }
    }
  };

  /**
   * Builds the alt text of every image from data (id-based fallback).
   *
   * @param {Object} image Gallery item.
   * @returns {string} The Spanish alt text.
   */
  const getAltText = (image) => image.alt ?? `Imagen de galería ${image.id}`;

  const activeImage = isOpen ? images[activeIndex] : null;
  const activeAlt = activeImage ? getAltText(activeImage) : "";

  return (
    <section>
      {/* Section banner — teal band from data-driven title */}
      <TitleBanner className="mb-12 rounded-md p-4">
        Imágenes (Trabajos)
      </TitleBanner>
      {/* Thumbnails grid — buttons are direct grid children (no extra wrapper);
          gap covers both axes; tokens over hardcoded grays */}
      <div className="grid grid-cols-1 gap-3 bg-surface-muted sm:grid-cols-2 md:grid-cols-3">
        {images.map((image, index) => {
          const alt = getAltText(image);
          return (
            <button
              key={image.id}
              type="button"
              onClick={() => openViewer(index)}
              aria-label={`Ampliar ${alt}`}
              className="block w-full overflow-hidden bg-transparent p-0 border-0 rounded-2xl cursor-zoom-in focus-visible:[outline-width:3px] transition-[transform,box-shadow] duration-200 ease-in-out hover:scale-[1.02] hover:shadow-lg"
            >
              <Image
                src={image.url}
                className="block h-55 max-sm:h-60 w-full object-cover"
                width={1000}
                height={1000}
                alt=""
                sizes={GRID_SIZES}
              />
            </button>
          );
        })}
      </div>

      {/* Lightbox modal (Radix Dialog) — fullscreen viewer */}
      <Dialog
        open={isOpen}
        onOpenChange={(open) => {
          if (!open) closeViewer();
        }}
      >
        {isOpen && (
          <DialogContent
            showCloseButton={false}
            className="fixed top-0 left-0 inset-0 z-1080 h-full w-full max-w-none translate-x-0 translate-y-0 rounded-none border-0 bg-[#101010] p-0 gap-0 overflow-hidden sm:max-w-none"
            onInteractOutside={(e) => e.preventDefault()}
            role="dialog"
            aria-label="Visor de imágenes de la galería"
          >
            <DialogTitle className="sr-only">
              Visor de imágenes de la galería
            </DialogTitle>
            {/* Inner flex column — pins toolbar to top and caption to bottom;
                the stage row (`flex-1 min-h-0`) is the only elastic slot, so
                toolbar/caption never move regardless of image height */}
            <div className="flex h-full w-full flex-col overflow-hidden">
              {/* Toolbar — counter + zoom/close controls */}
              <div className="flex items-center justify-between gap-2 px-3 py-2 text-white">
                <span className="font-semibold" aria-live="polite">
                  {activeIndex + 1} / {total}
                </span>
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="lightbox"
                    onClick={() => zoomBy(-ZOOM_STEP)}
                    disabled={zoom <= 1}
                    aria-label="Reducir zoom"
                  >
                    −
                  </Button>
                  <Button
                    type="button"
                    variant="lightbox"
                    onClick={() => zoomBy(ZOOM_STEP)}
                    disabled={zoom >= ZOOM_MAX}
                    aria-label="Aumentar zoom"
                  >
                    +
                  </Button>
                  <Button
                    type="button"
                    variant="lightbox"
                    onClick={closeViewer}
                    aria-label="Cerrar visor"
                  >
                    ✕
                  </Button>
                </div>
              </div>

              {/* Stage — drag-pannable active image with side arrows */}
              <div
                className="relative flex-1 min-h-0 flex items-center justify-center overflow-hidden touch-none"
                onPointerDown={startDrag}
                onPointerMove={onDrag}
                onPointerUp={endDrag}
                onPointerCancel={endDrag}
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
              >
                <Button
                  type="button"
                  variant="lightbox"
                  className="absolute top-1/2 -translate-y-1/2 z-2 left-3 max-sm:left-1"
                  onClick={previous}
                  aria-label="Imagen anterior"
                >
                  ‹
                </Button>
                <Image
                  src={activeImage.url}
                  alt={activeAlt}
                  width={1600}
                  height={1600}
                  sizes={LIGHTBOX_SIZES}
                  className={`max-w-[92vw] max-sm:max-w-full max-h-full w-auto h-auto object-contain rounded-lg select-none will-change-transform ${
                    zoom > 1 ? "cursor-grab" : ""
                  }`}
                  style={{
                    transform: `translate(${offset.x}px, ${offset.y}px) scale(${zoom})`,
                  }}
                />
                <Button
                  type="button"
                  variant="lightbox"
                  className="absolute top-1/2 -translate-y-1/2 z-2 right-3 max-sm:right-1"
                  onClick={next}
                  aria-label="Imagen siguiente"
                >
                  ›
                </Button>
              </div>

              {/* Caption — active image alt text */}
              <p className="py-3 px-4 pb-5 text-center text-white/95 mb-0">
                {activeAlt}
              </p>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </section>
  );
}
