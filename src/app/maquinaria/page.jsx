import MachineCard from "./components/machine-card";
import PageTitle from "../components/page-title";

import { machines } from "@/lib/data";
import { pageMetadata } from "@/lib/page-metadata";

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
      {/* Page hero — title banner from machinery imagery */}
      <PageTitle
        imageSrc="/images/maquinaria/maquinaria_page.jpg"
        title="Maquinaria"
        subtitle="En este apartado podrás encontrar los equipos con los que contamos"
      />
      {/* Machine cards — one section per entry; stable keys from the title */}
      <div className="px-2">
        {machines.map((maquina) => (
          <section key={maquina.title}>
            <MachineCard
              title={maquina.title}
              description={maquina.description}
              images={maquina.images}
            />
          </section>
        ))}
      </div>
    </>
  );
}
