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
