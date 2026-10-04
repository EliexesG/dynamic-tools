import Link from "next/link";

export const metadata = {
  title: "Página no encontrada",
  description:
    "La página que buscas no existe o fue movida. Vuelve al inicio de A&M Dynamic Tools S.A.",
};

export default function NotFound() {
  return (
    <div className="text-center py-5">
      <p className="display-1 fw-bold mb-0 text-primary">404</p>
      <h1 className="fw-bold mb-3">Página no encontrada</h1>
      <p className="mb-4">
        Lo sentimos, la página que buscas no existe o fue movida.
      </p>
      <Link className="btn btn-secondary text-white" href="/">
        Volver al inicio
      </Link>
    </div>
  );
}
