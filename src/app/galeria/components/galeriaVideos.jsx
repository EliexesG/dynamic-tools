"use client";

import "./galeriaVideos.css";

const Indicador = ({ video }) => {
  return (
    <>
      {video.id === 1 && (
        <button
          key={video.id}
          type="button"
          data-bs-target="#galeriaVideos"
          data-bs-slide-to={video.id - 1}
          className="active"
          aria-current="true"
          aria-label={`Slide ${video.id}`}
        ></button>
      )}
      {video.id !== 1 && (
        <button
          key={video.id}
          type="button"
          data-bs-target="#galeriaVideos"
          data-bs-slide-to={video.id - 1}
          aria-label={`Slide ${video.id}`}
        ></button>
      )}
    </>
  );
};

export default function GaleriaVideos({ videos }) {
  return (
    <section>
      <h2 className="text-center p-3 rounded bg-primary text-white fw-bold mb-5">
        Videos (Trabajos)
      </h2>
      <div
        id="galeriaVideos"
        className="carousel slide carousel-fade"
        data-mdb-ride="carousel"
      >
        <div className="carousel-indicators">
          {videos.map((video) => (
            <Indicador key={video.id} video={video} />
          ))}
        </div>

        <div className="carousel-inner h-100 w-100 bg-black">
          {videos.map((video) => (
            <div
              key={video.id}
              className={`carousel-item ${video.id === 1 ? "active" : ""}`}
            >
              <video className="img-fluid video" controls={true}>
                <source src={video.url} type="video/mp4" />
              </video>
            </div>
          ))}
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-mdb-target="#galeriaVideos"
          data-mdb-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-mdb-target="#galeriaVideos"
          data-mdb-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </section>
  );
}
