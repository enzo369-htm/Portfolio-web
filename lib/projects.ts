export type Project = {
  slug: string
  name: string
  desc: string
  tech: string
  img: string
  url: string
  status: string
  /** Párrafos del relato (historia detrás del proyecto) */
  relato: string[]
  /** Si es true, en /relatos/[slug] la imagen se muestra entera (object-contain) sin recorte fijo */
  relatoImageContain?: boolean
  /** Fondo detrás de la imagen cuando `relatoImageContain` es true */
  relatoImageContainBg?: string
  /** Solo en /relatos/[slug]; el home y /relatos siguen usando `img` */
  relatoDetailImg?: string
}

export const projects: Project[] = [
  {
    slug: "cresciente",
    name: "Cresciente",
    desc: "Academia de composición musical online. Cursos, metodología propia y comunidad.",
    tech: "WordPress, PHP",
    img: "/images/cresciente .png",
    url: "https://cresciente.net/",
    status: "",
    relato: [
      "Cresciente nació como la necesidad de llevar una enseñanza musical seria al entorno digital: no bastaba con subir videos; hacía falta una estructura de cursos, una identidad clara y un sitio que transmitiera la misma rigurosidad que las clases presenciales.",
      "Trabajamos en una arquitectura pensada para crecer: páginas de programa, funnel hacia la matrícula y espacio para la comunidad. WordPress y PHP permitieron iterar con rapidez mientras el negocio definía nuevas ofertas y formatos.",
      "El resultado es una academia viva: quien entra entiende de inmediato el valor del método, puede recorrer el catálogo y confiar en la plataforma como base de su aprendizaje a largo plazo.",
    ],
  },
  {
    slug: "rocio-cerda",
    name: "Rocío Cerdá",
    desc: "Portfolio web interactivo para comunicadora, trabajo realizado junto a diseñador.",
    tech: "WordPress, Figma, HTML, CSS",
    img: "/images/rocio.png",
    url: "",
    status: "En desarrollo",
    relato: [
      "El portfolio de una comunicadora no puede ser un PDF estático: tiene que permitir actualizar casos, tono y servicios sin depender de un desarrollador en cada pequeño cambio.",
      "Coordinamos implementación con diseño en Figma: la estructura en WordPress respeta la jerarquía visual acordada, con bloques y estilos que Rocío puede mantener a medida que crece su práctica.",
      "El proyecto está en evolución porque el relato profesional también cambia; la base técnica está pensada para que el sitio acompañe esos giros sin romper lo ya construido.",
    ],
  },
  {
    slug: "cardinal-sur",
    name: "Cardinal Sur",
    desc: "Plataforma de dirección musical creativa para shows en vivo (Buenos Aires): manifiesto, equipo, casos con artistas, talleres con inscripción y contacto. Experiencia pensada para pantalla ancha.",
    tech: "Next.js, TypeScript, Tailwind CSS",
    img: "/images/cardinal-sur-cover.png",
    relatoDetailImg: "/images/cardinal-sur-relato.png",
    url: "https://cardinal-sur.vercel.app/",
    status: "En desarrollo",
    relatoImageContain: true,
    relatoImageContainBg: "#000000",
    relato: [
      "Estado: esta web figura como en desarrollo en el portfolio; contenidos, secciones y detalle de interacción pueden seguir evolucionando mientras el equipo ajusta la versión pública.",
      "Cardinal Sur define la dirección musical creativa como identificar y señalar posibles direcciones para cada idea y ayudar a recorrer los caminos: el contenido define la forma de la obra y no al revés. Afirman que las obras se revelan por experimentación y lectura colectiva del proceso, y que su rol es acompañar sin imponer una estética cerrada, como puente entre técnica y práctica artesanal frente a la hiper-especialización.",
      "El sitio en cardinal-sur.vercel.app articula servicios, artistas con los que trabajan, un bloque Universo con el manifiesto (Est. 2024, Buenos Aires), talleres con formulario de inscripción y vías de contacto como hola@cardinalsur.com y redes. La experiencia está pensada para computadora, con mínimo sugerido de ancho y video en el hero.",
      "Técnicamente es una aplicación Next.js con App Router, React, TypeScript, Tailwind CSS, Framer Motion, scroll suavizado con Lenis cuando aplica, formularios validados y API para inscripciones a talleres; la estética refuerza marca, textura y motion alineados con el nivel de cuidado de los shows que diseñan.",
    ],
  },
  {
    slug: "diana-villabona-ceramica",
    name: "Diana Villabona Cerámica",
    desc: "Sitio para la ceramista en Colombia: piezas en vitrina, bitácora, talleres presenciales y un espacio creativo alrededor de raku, saggar y obvara.",
    tech: "Next.js, TypeScript",
    img: "/images/diana-villabona-ceramica.png",
    url: "https://diana-villabona.vercel.app/",
    status: "En desarrollo",
    relato: [
      "Estado: el sitio público se considera en desarrollo; pueden sumarse secciones, textos o ajustes visuales a medida que Diana consolida la presencia digital del estudio.",
      "Diana Villabona necesitaba una web que sintiera como su estudio: tierras, humo del horno y piezas que cuentan proceso, no solo catálogo. La web plantea un refugio para la exploración, con una parrilla visual que mezcla cocción al aire libre, piezas en sala y detalle de pastas y esmaltes.",
      "La estructura recorre lo esencial de su práctica: vitrina con obras emblemáticas, bitácora para el relato en curso, talleres con fechas e inscripción, y un hilo narrativo que nombra técnicas como Raku, Saggar y Obvara para quien ya habla el idioma del barro.",
      "Construido en Next.js y desplegado en Vercel, el sitio prioriza lectura clara y fotografía protagonista; el texto incorpora su mirada de que la cerámica es medio para que la naturaleza se exprese, con margen para crecer en catálogo y agenda.",
    ],
  },
  {
    slug: "web-ibv",
    name: "Web IBV",
    desc: "Muestra web del Instituto Brutal Visual: maqueta dinámica de estética brutalista con piezas audiovisuales del colectivo. Pensada para escritorio.",
    tech: "Next.js, TypeScript",
    img: "/images/web-ibv.png",
    url: "https://brutavisual.vercel.app/",
    status: "",
    relato: [
      "IBV (Instituto Brutal Visual) plantea un manifiesto audiovisual: imágenes sin composición clásica, ejecutores que intervienen el material y una presencia digital que tiene que sentirse tan cruda como el trabajo en pantalla.",
      "Esta entrega es una muestra inicial hecha con código desde cero: tipografía experimental, alto contraste y recorrido por proyectos, información, talleres y contacto, usando material tomado del Instagram del colectivo como base visual.",
      "La web está pensada solo para computadora en esta fase — es una base viva, lista para rediseñar secciones, tono e interacciones hasta alinearla con la visión de los ejecutores; el despliegue en Vercel permite iterar y compartir la demo con claridad.",
    ],
  },
  {
    slug: "sun-salvador-festival",
    name: "Sun Salvador Festival",
    desc: "Landing para festival de música. Evento, artistas y entradas.",
    tech: "Next.js, TypeScript",
    img: "/images/Sun-Salvador-festival.png",
    url: "https://sun-salvador.vercel.app/",
    status: "",
    relato: [
      "Un festival necesita una primera impresión que compita con el ruido de las redes: fecha, lineup y sensación tienen que leerse en segundos, con un diseño que invite a comprar o guardar el evento.",
      "Elegimos Next.js para una landing ultrarrápida, buena SEO social al compartir y despliegue estable en cada pico de visitas antes del show.",
      "La pieza cuenta la historia del evento como experiencia: no solo información, sino el clima que el público va a encontrar cuando llegue a la puerta.",
    ],
  },
  {
    slug: "entramado",
    name: "Entramado",
    desc: "Plataforma web para divulgadores de arte.",
    tech: "Next.js, TypeScript",
    img: "/images/entramado.png",
    url: "",
    status: "En desarrollo",
    relato: [
      "Entramado responde a una pregunta incómoda del ecosistema cultural: cómo dar visibilidad a quienes explican y conectan obras sin quedar atrapados en redes que entierran el contenido al día siguiente.",
      "La plataforma está pensada como red de relatos y perfiles: cada divulgador puede anclar su voz en un lugar que le pertenece, con herramientas pensadas para el público que busca profundidad, no solo scroll infinito.",
      "El desarrollo sigue abierto porque el producto crece con las primeras voces que lo habitan; cada iteración prioriza claridad, accesibilidad y una estética que no compita con el arte, sino que lo enmarque.",
    ],
  },
  {
    slug: "mutuo-agencia",
    name: "Mutuo Agencia",
    desc: "Sitio de la agencia Mutuo: comunicación integral, mirada de profesionales creativos y piezas destacadas —incluye proyectos como la pieza visual para Vesta Estudio.",
    tech: "Next.js, TypeScript",
    img: "/images/mutuo-agencia.png",
    url: "https://mutuo-five.vercel.app/",
    status: "En desarrollo",
    relato: [
      "Estado: la web de Mutuo también se muestra en el portfolio como en desarrollo; proyectos destacados, copy y secciones pueden actualizarse mientras la agencia cierra el mensaje y el tono con el que salen al mercado.",
      "Mutuo se presenta como una agencia que reúne la mirada de distintos profesionales creativos para ofrecer soluciones integrales en comunicación; la web tenía que transmitir esa idea de equipo y calidad sin recurrir a un brochure plano.",
      "El sitio combina secciones claras —qué hacen, proyectos, servicios, contacto— con una estética muy cinematográfica: fondos oscuros, tipografía contundente y piezas destacadas donde cada proyecto puede ocupar el mismo nivel de importancia que en una presentación a cliente.",
      "En el despliegue en Vercel, el foco está en rendimiento y una navegación que invite a explorar; el contacto público (como hola@mutuoagencia.com) cierra el circuito para quien busca una agencia con lectura integral del mensaje y la imagen.",
    ],
  },
  {
    slug: "catalogo-talleres",
    name: "Catálogo de talleres",
    desc: "PDF dinámico y editable, donde los usuarios eligen el taller que quieren tomar.",
    tech: "Gamma.app",
    img: "/images/catalogo-talleres.png",
    url: "https://gamma.app/docs/TODOS-LOS-TALLERES-b6dzbrh0fht9wvp?mode=doc",
    status: "",
    relato: [
      "Muchas ofertas de talleres viven en PDFs estáticos o en cadenas de mensajes: el alumno no elige con claridad y el equipo vuelve a explicar lo mismo en cada consulta.",
      "Este catálogo apuesta por un documento vivo en Gamma: estructura clara, fácil de actualizar cuando cambian fechas o contenidos, y una lectura pensada para que cada persona encuentre el taller que le encaja.",
      "El enlace público concentra “todos los talleres” en un solo lugar; el modo doc permite recorrer la información con la sensación de una guía, no de un archivo cerrado.",
    ],
  },
  {
    slug: "turnos-in",
    name: "Turnos In",
    desc: "Gestión de turnos y citas online.",
    tech: "Next.js, TypeScript",
    img: "/images/Turnos In.png",
    url: "",
    status: "En desarrollo",
    relato: [
      "Detrás de cada turno hay tiempo real de personas: recepciones saturadas, mensajes de WhatsApp perdidos y clientes que desisten. Turnos In apunta a devolver previsibilidad sin perder el trato humano.",
      "El producto encarna una promesa simple: elegir horario, recibir confirmación y recordatorios, y que el negocio vea su agenda en un solo lugar. La complejidad técnica queda oculta detrás de flujos cortos.",
      "Al estar en desarrollo activo, cada decisión de UI se contrasta con talleres reales y consultorios: el relato del proyecto es tan importante como el código — es la historia de recuperar horas para lo que importa.",
    ],
  },
]

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug)
}
