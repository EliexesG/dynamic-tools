import { galeriaInfo } from "@/lib/data";
import { pageMetadata } from "@/lib/page-metadata";

import PageTitle from "../components/page-title";
import ImagesGallery from "./components/gallery-images";
import GalleryVideos from "./components/gallery-videos";

export const metadata = pageMetadata({
  title: "Galería",
  description:
    "Página referente a la galería de imágenes y videos de los trabajos y proyectos de A&M Dynamic Tools S.A.",
  path: "/galeria",
});

/**
 * Gallery page: page hero, image grid with lightbox and the videos
 * playlist. Server component; interactivity lives in the gallery child
 * components (`ImagesGallery`, `GalleryVideos`).
 *
 * @param {Object} props Component props. This component takes no props.
 * @returns {JSX.Element} The galería page content.
 */
export default function GalleryPage() {
  return (
    <>
      {/* Page hero — title banner from data.js */}
      <PageTitle
        imageSrc={galeriaInfo.urlImagenPresentacion}
        title={galeriaInfo.titulo}
        subtitle={galeriaInfo.descripcion}
      />
      {/* Images gallery — thumbnails grid with lightbox viewer */}
      <ImagesGallery images={galeriaInfo.imagenes} />
      {/* Divider before the videos section */}
      <hr className="my-6 border-t border-border" />
      {/* Videos gallery — single-player playlist */}
      <GalleryVideos videos={galeriaInfo.videos} />
    </>
  );
}
