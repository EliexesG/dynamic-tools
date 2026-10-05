"use client";

import { useState } from "react";

import Image from "@/app/components/image";
import TitleBanner from "@/app/components/title-banner";

/**
 * Videos gallery: single-player playlist with a thumbnail selector strip.
 *
 * This is deliberately NOT a carousel. Embla (the `ui/carousel` engine)
 * keeps every slide mounted, so a video left playing on a non-visible slide
 * would bleed its audio — the exact bug the old Bootstrap fade carousel
 * caused. Exactly one `<video>` is mounted at a time: changing the selection
 * remounts the player via `key`, which stops and tears down the outgoing
 * element. No autoplay.
 *
 * User-visible text stays Spanish (site language contract).
 *
 * @param {Object}  props         Component props.
 * @param {Array}   props.videos  Gallery items: `{ id, url, poster? }` (data contract from `src/lib/data.js`).
 * @returns {JSX.Element|null} The videos section, or `null` when the list is empty.
 */
export default function GalleryVideos({ videos }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const total = videos?.length ?? 0;

  if (total === 0) {
    return null;
  }

  const active = videos[activeIndex];

  return (
    <section>
      {/* Section banner — teal band, mirrored from the images gallery */}
      <TitleBanner className="mb-12 rounded-md p-4">
        Videos (Trabajos)
      </TitleBanner>
      {/* Active player — remounted per selection (`key`) to avoid audio bleed */}
      <div className="mx-auto w-full">
        <video
          key={active.id ?? active.url}
          className="aspect-video w-full rounded-xl bg-black object-contain text-white"
          controls
          playsInline
          preload="metadata"
          poster={active.poster}
        >
          <source src={active.url} type="video/mp4" />
          Tu navegador no soporta la reproducción de video.
        </video>

        {/* Thumbnail selector strip — opens the corresponding video */}
        {total > 1 && (
          <ul className="mt-4 flex gap-3 overflow-x-auto">
            {videos.map((video, i) => (
              <li key={video.id ?? video.url ?? i}>
                <button
                  type="button"
                  onClick={() => setActiveIndex(i)}
                  aria-label={`Ver video ${i + 1}`}
                  aria-current={i === activeIndex ? "true" : undefined}
                  className={`block w-28 overflow-hidden rounded-md transition-shadow focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring ${
                    i === activeIndex
                      ? "ring-2 ring-secondary"
                      : "ring-1 ring-border hover:ring-secondary/60"
                  }`}
                >
                  {video.poster ? (
                    <Image
                      src={video.poster}
                      alt=""
                      width={320}
                      height={180}
                      sizes="112px"
                      className="aspect-video w-full object-cover"
                    />
                  ) : (
                    <video
                      className="aspect-video w-full object-cover"
                      muted
                      preload="metadata"
                      aria-hidden="true"
                    >
                      <source src={video.url} type="video/mp4" />
                    </video>
                  )}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
