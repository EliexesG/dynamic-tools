import Link from "next/link";

export const metadata = {
  title: "Página no encontrada",
  description:
    "La página que buscas no existe o fue movida. Vuelve al inicio de A&M Dynamic Tools S.A.",
};

export default function NotFound() {
  return (
    <div className="py-16 text-center">
      <p className="mb-0 text-7xl leading-none font-bold text-primary">404</p>
      <h1 className="mb-3 font-bold">Página no encontrada</h1>
      <p className="mb-4">
        Lo sentimos, la página que buscas no existe o fue movida.
      </p>
      <Link
        className="inline-block rounded-md bg-secondary px-4 py-2 font-medium text-white transition-colors hover:bg-primary focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        href="/"
      >
        Volver al inicio
      </Link>
    </div>
  );
}
