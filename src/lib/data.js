/**
 * Entity data only — the business data that actually changes with the
 * operation (services, machinery, contacts, values, gallery media).
 *
 * Page copy (titles, heroes, about paragraphs) does NOT live here: each
 * page declares its own "Page copy" const block — see `data-copy-plan.md`.
 *
 * Sentinel contract: a `contacts[].contacts[].type` of `"Cel"` renders as a
 * `tel:+506…` link (see `contact-card.jsx`); any other type renders as
 * `mailto:`. Type/detail are data-shape keys — rename only together with
 * the card that consumes them.
 */
export const contacts = [
  {
    id: 1,
    title: "A&M Dynamic Tools S.A.",
    specialty: "Empresa",
    contacts: [{ type: "Email", detail: "dynamictoolscr@gmail.com" }],
  },
  {
    id: 2,
    title: "Ing. Mauricio Alfaro Martínez",
    specialty: "Tool Room Manager",
    contacts: [{ type: "Cel", detail: "8923 1003" }],
  },
  {
    id: 3,
    title: "Jose Enrique Alfaro Martínez",
    specialty: "Tool & Die Specialist",
    contacts: [
      { id: 1, type: "Cel", detail: "8989 3653" },
      { id: 2, type: "Email", detail: "jalfarodynamictools@gmail.com" },
    ],
  },
];

export const directContact = {
  telephone: "8923 1003",
  telephoneHref: "tel:+50689231003",
  whatsappHref: "https://wa.me/50689231003",
};

export const services = [
  {
    id: 1,
    title: "Mecanizado CNC y convencional.",
    description:
      "Ofrecemos mecanizado CNC y convencional. El CNC asegura alta calidad y repetibilidad mediante programación digital, reduciendo costos vs el control manual. Automatiza los procesos para ser más eficientes, flexibles y escalables; satisfaciendo necesidades de producción modernas. Representa una opción tecnológica superior para la optimización de procesos productivos.",
  },
  {
    id: 2,
    title: "Programación y diseño de partes.",
    description:
      "Nuestro equipo de ingenieros se especializa en programar máquinas herramienta CNC para mecanizar todo tipo de piezas. Utilizamos software de diseño 3D y programación de código G para crear programas optimizados que permiten gestionar de forma eficiente las operaciones de torneado, fresado y rectificado con alta precisión. También contamos con una amplia experiencia  en el diseño de equipos electromecánicos mediante modelado CAD 2D y 3D.",
  },
  {
    id: 3,
    title: "Diseño y mantenimiento de moldes",
    description:
      "Ofrecemos servicios profesionales de diseño, fabricación, reparación y mantenimiento preventivo de moldes plásticos e inyección. Contamos con ingenieros mecánicos expertos en modelado 3D, análisis de elementos finitos, selección de materiales y proceso de moldeo. Realizamos trabajos de fresado CNC de alta precisión para moldes. Además, brindamos asistencia técnica continua para garantizar un funcionamiento óptimo de sus sistemas de inyección, alargando la vida útil de los moldes y mejorando la productividad.",
  },
  {
    id: 4,
    title: "Fabricación de pistones hidráulicos",
    description:
      "Contamos con una amplia experiencia en la fabricación de pistones hidráulicos para diferentes equipos e industrias. Ofrecemos un servicio que incluye el diseño y análisis FEM de las piezas, mecanizado CNC de alta precisión, tratamientos térmicos y terminaciones superficiales. Trabajamos con materiales como aceros al carbono, aceros aleados y aluminio para cubrir todos los requerimientos técnicos. Nuestro proceso garantiza un estricto control dimensional y máxima resistencia a la presión y desgaste. Contáctenos para conocer soluciones a medida y presupuestos competitivos para su proyecto.",
  },
  {
    id: 5,
    title: "Ingeniería e integración de sistemas electromecánicos",
    description:
      "Contamos con amplia experiencia en el diseño, fabricación y puesta en marcha de sistemas electromecánicos automatizados para diversas industrias. Nuestro servicio abarca todas las etapas del proyecto: análisis de requerimientos, ingeniería conceptual y de detalle, selección de componentes mecánicos y eléctricos, programación, ensamblaje, integración y entrega en sitio con soporte técnico. Contamos con personal altamente calificado en ingeniería, automatización industrial y control numérico. Ofrecemos soluciones flexibles que maximizan la productividad de procesos mediante tecnología de punta. Contacte a nuestros ingenieros para conocer cómo integrar sistemas a la medida de su operación.",
  },
  {
    id: 6,
    title: "Mantenimiento industrial",
    description:
      "Nuestros servicios abarcan el mantenimiento preventivo  y correctivo para garantizar la máxima disponibilidad y rendimiento de su planta industrial. Contamos con un staff técnico certificado en áreas como ingeniería mecánica y electromecánica. Realizamos diagnósticos, revisiones periódicas, reparaciones y actualizaciones de sistemas. Cuente con nuestro soporte profesional para mantener sus activos productivos en perfecto estado y optimizar su proceso productivo.",
  },
  {
    id: 7,
    title: "Rectificado plano y de formas",
    description:
      "Contamos con máquinaria para el rectificado de superficies planas y formas complejas. Realizamos operaciones de rectificado final para ajustes dimensionales precisos, rugosidades superficiales específicas y estados de acabado de alta calidad. Nuestro personal altamente calificado garantiza el más estricto cumplimiento de planos y tolerancias solicitadas en todo tipo de piezas y volúmenes de producción.",
  },
  {
    id: 8,
    title: "Fabricación y ensamble de fixtures",
    description:
      "Contamos con una área equipada para la producción de todo tipo de fixtures y montajes especiales. Nuestros ingenieros realizan el diseño y análisis de fixtures mediante modelado 3D. Fabricamos piezas metálicas mediante procesos de mecanizado CNC, conformado y soldadura. Montamos sistemas completos de fixtures teniendo en cuenta la ergonomía y requisitos de instalación. Brindamos servicio para pruebas y ajustes.",
  },
  {
    id: 9,
    title:
      "Soldadura estructural TIG/Electrodo. Especialistas en acero inoxidable",
    description:
      "Contamos con una amplia experiencia en la soldadura por arco de estructuras metálicas mediante los procesos TIG y electrodo revestido, siendo nuestra especialidad el acero inoxidable. Ofrecemos presupuestos a medida para satisfacer las necesidades de cada proyecto de manera segura y eficiente.",
  },
  {
    id: 10,
    title: "Fabricación de piñones en acero inoxidable",
    description:
      "Somos especialistas en la fabricación de engranajes e piñones para sectores industriales exigentes. Contamos con una línea de producción equipada para el mecanizado. Nuestro diseño y programación CNC garantiza máxima precisión en los modulos, tolerancias geometricas y rugosidades superficiales. Contamos con personal calificado y una amplia experiencia en estándares como DIN, ANSI, AGMA. Realizamos trabajos de acuerdo a planos del cliente u órdenes de fabricación propias. Nuestro objetivo es brindar soluciones de alta calidad y fiabilidad a la medida de su aplicación.",
  },
];

export const machines = [
  {
    id: 1,
    title: "Fresadora CNC",
    description:
      "La fresadora CNC es una máquina de control numérico computarizado utilizada para realizar operaciones de fresado de manera automatizada.",
    images: [{ id: 1, url: "/images/maquinaria/maquinaria_fresadora_CNC.jpg" }],
  },
  {
    id: 2,
    title: "Torno Convencional",
    description:
      "El torno convencional es una máquina esencial en ingeniería de precisión. Mediante la rotación de la pieza, permite cortar y dar forma a materiales metálicos. Es ampliamente utilizado en la industria para producir piezas con alta precisión.",
    images: [
      {
        id: 1,
        url: "/images/maquinaria/maquinaria_torno_convencional_1.jpg",
      },
      {
        id: 2,
        url: "/images/maquinaria/maquinaria_torno_convencional_2.jpg",
      },
    ],
  },
  {
    id: 3,
    title: "Rectificadora Plana",
    description:
      "La rectificadora plana es una máquina utilizada en ingeniería de precisión para rectificar superficies planas de piezas metálicas, logrando una mayor precisión dimensional y una superficie más uniforme.",
    images: [
      {
        id: 1,
        url: "/images/maquinaria/maquinaria_rectificadora_plana1.jpg",
      },
      {
        id: 2,
        url: "/images/maquinaria/maquinaria_rectificadora_plana2.jpg",
      },
    ],
  },
  {
    id: 4,
    title: "Torno de Boquilla",
    description:
      "El torno convencional es una máquina esencial en ingeniería de precisión que permite cortar y dar forma a piezas metálicas mediante rotación. El torno de boquilla, por otro lado, se utiliza para mecanizar piezas de pequeño tamaño, como instrumentos médicos y componentes de microelectrónica.",
    images: [
      { id: 1, url: "/images/maquinaria/maquinaria_torno_boquilla.jpg" },
    ],
  },
  {
    id: 5,
    title: "Proyector Optico de Perfiles",
    description:
      "El proyector óptico de perfiles es una máquina utilizada en ingeniería de precisión para medir y analizar perfiles y dimensiones de piezas.",
    images: [
      {
        id: 1,
        url: "/images/maquinaria/maquinaria_proyector_optico_perfiles.jpg",
      },
    ],
  },
  {
    id: 6,
    title: "Instrumentos de Medición",
    description:
      "Los instrumentos de medición son herramientas utilizadas para obtener mediciones precisas de magnitudes físicas. Incluyen dispositivos como calibradores, micrómetros y reglas, entre otros. Son esenciales en la ingeniería de precisión y en la fabricación de componentes y productos.",
    images: [
      {
        id: 1,
        url: "/images/maquinaria/maquinaria_instrumentos_medicion.jpg",
      },
    ],
  },
  {
    id: 7,
    title: "Fresadora Convencional",
    description:
      "La fresadora convencional es una máquina utilizada en ingeniería de precisión para realizar operaciones de fresado en diferentes materiales.",
    images: [
      {
        id: 1,
        url: "/images/maquinaria/maquinaria_fresadora_convencional.jpg",
      },
    ],
  },
  {
    id: 8,
    title: "Sierra Horizontal",
    description:
      "La sierra horizontal es una máquina utilizada para realizar cortes horizontales en diversos materiales.",
    images: [
      { id: 1, url: "/images/maquinaria/maquinaria_cierra_horizontal.jpg" },
    ],
  },
  {
    id: 9,
    title: "Area de Soldadura",
    description:
      "El área de soldadura es el espacio físico designado y equipado para llevar a cabo operaciones de soldadura. Es un entorno de trabajo específicamente diseñado para garantizar la seguridad del soldador y la calidad del proceso de soldadura.",
    images: [
      { id: 1, url: "/images/maquinaria/maquinaria_area_soldadura.jpg" },
    ],
  },
];

/** Company values — consumed only by /nosotros (ValueCard grid). */
export const companyValues = [
  {
    id: 1,
    title: "Confianza",
    description:
      "Comprometidos a brindar siempre nuestro máximo esfuerzo en cada aplicación",
  },
  {
    id: 2,
    title: "Excelencia",
    description:
      "Comprometidos con la mejora continúa en nuestros procesos diariamente",
  },
  {
    id: 3,
    title: "Integridad",
    description: "Operamos con honestidad, respeto y apoyo hacia los demás",
  },
  {
    id: 4,
    title: "Seguridad",
    description:
      "Garantizamos un entorno compartido limpio, seguro y organizado",
  },
  {
    id: 5,
    title: "Responsabilidad",
    description:
      "Nos responsabilizamos de manera absoluta y realizamos esfuerzos proactivos para asegurar su éxito",
  },
];

export const galleryMedia = {
  images: [
    { id: 1, url: "/images/galeria/imagenes/galeria_1.jpg" },
    { id: 2, url: "/images/galeria/imagenes/galeria_2.jpg" },
    { id: 3, url: "/images/galeria/imagenes/galeria_3.jpg" },
    { id: 4, url: "/images/galeria/imagenes/galeria_4.jpg" },
    { id: 5, url: "/images/galeria/imagenes/galeria_5.jpg" },
    { id: 6, url: "/images/galeria/imagenes/galeria_6.jpg" },
    { id: 7, url: "/images/galeria/imagenes/galeria_7.jpg" },
    { id: 8, url: "/images/galeria/imagenes/galeria_8.jpg" },
    { id: 9, url: "/images/galeria/imagenes/galeria_9.jpg" },
    { id: 10, url: "/images/galeria/imagenes/galeria_10.jpg" },
    { id: 11, url: "/images/galeria/imagenes/galeria_11.jpg" },
    { id: 12, url: "/images/galeria/imagenes/galeria_12.jpg" },
    { id: 13, url: "/images/galeria/imagenes/galeria_13.jpg" },
    { id: 14, url: "/images/galeria/imagenes/galeria_14.jpg" },
    { id: 15, url: "/images/galeria/imagenes/galeria_15.jpg" },
    { id: 16, url: "/images/galeria/imagenes/galeria_16.jpg" },
    { id: 17, url: "/images/galeria/imagenes/galeria_17.jpg" },
    { id: 18, url: "/images/galeria/imagenes/galeria_18.jpg" },
    { id: 19, url: "/images/galeria/imagenes/galeria_19.jpg" },
    { id: 20, url: "/images/galeria/imagenes/galeria_20.jpg" },
    { id: 21, url: "/images/galeria/imagenes/galeria_21.jpg" },
    { id: 22, url: "/images/galeria/imagenes/galeria_22.jpg" },
    { id: 23, url: "/images/galeria/imagenes/galeria_23.jpg" },
  ],
  videos: [
    {
      id: 1,
      url: "/images/galeria/videos/galeria_video_1.mp4",
      poster: "/images/galeria/videos/galeria_video_1_poster.jpg",
    },
  ],
};
