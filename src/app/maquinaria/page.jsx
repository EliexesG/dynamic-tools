import { maquinariaInfo } from "@/lib/data";
import { pageMetadata } from "@/lib/page-metadata";
import MachineCard from "./components/machine-card";
import PageTitle from "../components/page-title";

export const metadata = pageMetadata({
  title: "Maquinaria",
  description:
    "Página referente a la información de las máquinas con las que contamos en A&M Dynamic Tools S.A.",
  path: "/maquinaria",
});

/**
 * Machinery page: page hero plus one detail card per machine from
 * `data.js` (carousel with fullscreen + expandable description; both are
 * islands inside `machine-card`).
 *
 * @param {Object} props Component props. This component takes no props.
 * @returns {JSX.Element} The maquinaria page content.
 */
export default function MachineryPage() {
  return (
    <>
      {/* Page hero — title banner from data.js */}
      <PageTitle
        imageSrc={maquinariaInfo.urlImagenPresentacion}
        title={maquinariaInfo.titulo}
        subtitle={maquinariaInfo.descripcion}
      />
      {/* Machine cards — one section per entry; stable keys from the title */}
      <div className="px-2">
        {maquinariaInfo.maquinas.map((maquina) => (
          <section key={maquina.titulo}>
            <MachineCard
              title={maquina.titulo}
              description={maquina.descripcion}
              images={maquina.imagenes}
            />
          </section>
        ))}
      </div>
    </>
  );
}
