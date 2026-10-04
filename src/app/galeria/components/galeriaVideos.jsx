"use client";

import { useState } from "react";

import Imagen from "@/app/components/Imagen";

/*
 * Single-player video gallery (token sheet SOL-50 §12.11).
 *
 * The old Bootstrap fade carousel kept every hidden slide mounted, so a video
 * left playing in a non-visible slide bled its audio. Here exactly one
 * <video> is mounted at a time: changing the selection remounts the player via
 * `key`, which stops and tears down the outgoing element. No autoplay.
 */
export default function GaleriaVideos({ videos }) {
  const [indice, setIndice] = useState(0);
  const total = videos?.length ?? 0;

  if (total === 0) {
    return null;
  }

  const activo = videos[indice];

  return (
    <section>
      <h2 className="mb-12 rounded-md bg-primary p-4 text-center font-bold text-white">
        Videos (Trabajos)
      </h2>
      <div className="mx-auto w-full max-w-4xl">
        <video
          key={activo.id ?? activo.url}
          className="aspect-video w-full rounded-xl bg-black object-contain text-white"
          controls
          playsInline
          preload="metadata"
          poster={activo.poster}
        >
          <source src={activo.url} type="video/mp4" />
          Tu navegador no soporta la reproducción de video.
        </video>

        {total > 1 && (
          <ul className="mt-4 flex gap-3 overflow-x-auto">
            {videos.map((video, i) => (
              <li key={video.id ?? video.url ?? i}>
                <button
                  type="button"
                  onClick={() => setIndice(i)}
                  aria-label={`Ver video ${i + 1}`}
                  aria-current={i === indice ? "true" : undefined}
                  className={`block w-28 overflow-hidden rounded-md transition-shadow focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring ${
                    i === indice
                      ? "ring-2 ring-secondary"
                      : "ring-1 ring-border hover:ring-secondary/60"
                  }`}
                >
                  {video.poster ? (
                    <Imagen
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
