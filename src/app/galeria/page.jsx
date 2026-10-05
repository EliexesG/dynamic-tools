import PageTitle from "../components/page-title";
import ImagesGallery from "./components/gallery-images";
import GalleryVideos from "./components/gallery-videos";

import { galleryMedia } from "@/lib/data";
import { pageMetadata } from "@/lib/page-metadata";

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
      {/* Page hero — title banner from gallery imagery */}
      <PageTitle
        imageSrc="/images/galeria/galeria_page.jpg"
        title="Galería"
        subtitle="En este apartado podrás encontrar nuestra galería de presentación"
      />
      {/* Images gallery — thumbnails grid with lightbox viewer */}
      <ImagesGallery images={galleryMedia.images} />
      {/* Divider before the videos section */}
      <hr className="my-6 border-t border-border" />
      {/* Videos gallery — single-player playlist */}
      <GalleryVideos videos={galleryMedia.videos} />
    </>
  );
}
