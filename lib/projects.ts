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
      "Cresciente, teoría musical: una academia online increíble. En este proyecto se combinaron dos mundos, lo digital y la música, ya que trabajaba con WordPress (que aprendí a usar en este trabajo), Reaper, Gimp y Notion.",
      "Específicamente me contrataron para hacer una actualización inmensa en el sitio: actualizar los ciclos de estudio de la academia, es decir, actualizar cientos de clases en menos de un año. Lo que hacía era subir las clases de texto, y eso incluía: Revisar las tareas manuales en Notion donde hay todo un sistema creado con el equipo, de ahí extraer el material y procesar imágenes en Gimp en donde preparaba cada parte de las partituras, luego tenía que leer las partitura y procesar audio en Reaper uniendo cada audio con cada figura de partitura teniendo un orden muy claro en las carpetas de mi mac (ya que sí alguna partitura no tenía su audio correspondiente se desordenaba todo), y por último subir todo el texto + las partituras + los audios, en donde ahí agregaba los custom post types en los diferentes elementos de la clase de texto para el diseño final en la web.",
      "La experiencia fue genial y, de hecho, en el transcurso nos volvimos grandes amigos con los creadores de Cresciente <3. Aprendí qué es la gestión y organización de lo que es literalmente una empresa, y la verdadera ganancia para mí en eso fue integrar en mi vida la organización y continuidad que tiene Cresciente.",
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
    desc: "",
    tech: "Next.js, TypeScript, Tailwind CSS",
    img: "/images/cardinal-sur-cover.png",
    relatoDetailImg: "/images/cardinal-sur-relato.png",
    url: "https://cardinal-sur.vercel.app/",
    status: "En desarrollo",
    relatoImageContain: true,
    relatoImageContainBg: "#000000",
    relato: [
      "Estado: esta web figura como en desarrollo en el portfolio; contenidos, secciones y detalle de interacción pueden seguir evolucionando mientras el equipo ajusta la versión pública.",
      "El sitio en cardinal-sur.vercel.app articula servicios, artistas con los que trabajan, un bloque Universo con el manifiesto (Est. 2024, Buenos Aires), talleres con formulario de inscripción y vías de contacto como hola@cardinalsur.com y redes. La experiencia está pensada para computadora, con mínimo sugerido de ancho y video en el hero.",
      "Técnicamente es una aplicación Next.js con App Router, React, TypeScript, Tailwind CSS, Framer Motion, scroll suavizado con Lenis cuando aplica, formularios validados y API para inscripciones a talleres; la estética refuerza marca, textura y motion alineados con el nivel de cuidado de los shows que diseñan.",
    ],
  },
  {
    slug: "diana-villabona-ceramica",
    name: "Diana Villabona Cerámica",
    desc: "Diana conecta una visión muy sincera y natural con una estética profesional y cuidada. Eso es lo que representamos en su sitio, con lugares donde plasmar esos dos mundos.",
    tech: "Next.js, TypeScript",
    img: "/images/diana-villabona-ceramica.png",
    url: "https://diana-villabona.vercel.app/",
    status: "En desarrollo",
    relato: [
      "Estado: el sitio público se considera en desarrollo; en su última fase, Diana debe agregar el material a su pagina y yo cargar algunos textos.",
      "Digo que diana tiene que agregar el material ya que para está pagina web cree un sistema CMS custom, en pocas palabras en un sistema de autogestión a medida en donde ella actualiza su blog, fotos de su portfolio, talleres y tienda!",
      "La estructura recorre lo esencial de su práctica: Portfolio con conjuntos de piezas, bitácora para los relatos de experiencias en su práctica, talleres con fechas y links y una tienda pequeña para concretar las ventas de piezas.",
      "La combinación de una bitácora, un amplio portfolio, una tienda y los talleres hacen de está web una conjunción hermosa de todo lo que necesita Diana.",
      "El trabajo en conjunto con Diana fue buenisimo desde el primer momento y en cada reunión que fuimos teniendo nos reíamos y charlabamos un poco más mientras íbamos diseñando lo que ella quería.",
      "Está web me gusto mucho por que me adentre en el mundo de la cerámica, y eso es algo que cada vez disfruto más, describir nuevos artes más haya de lo que yo hago (Música) es muy enriquecedor.",
    ],
  },
  {
    slug: "juan-tarraf",
    name: "Juan Tarraf",
    desc: "",
    tech: "Next.js, TypeScript",
    img: "/images/juan-tarraf.png",
    url: "https://juan-manuel-tarraf-seven.vercel.app/",
    status: "En desarrollo",
    relato: [],
  },
  {
    slug: "nathalia-lasso",
    name: "Nathalia Lasso",
    desc: "",
    tech: "Next.js, TypeScript",
    img: "/images/nathalia-lasso.png",
    url: "https://nathalia-lasso.vercel.app/",
    status: "En desarrollo",
    relato: [],
  },
  {
    slug: "ale-jimenez",
    name: "Ale Jimenez",
    desc: "",
    tech: "Next.js, TypeScript",
    img: "/images/ale-jimenez.png",
    url: "",
    status: "En desarrollo",
    relato: [],
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
      "Esté sitio me toca en particular ya que en la provincia en la que naci (Jujuy Argentina) no hay mucha música nueva, o lugares donde ir a escuchar música, y los organizadores de esté evento son gente que apunta a cambiar esa estructura y que desde jujuy llegaron a lugares que no cualquiera llega.",
      "A ellos los conocí en la movida artística de jujuy, y sucede que un día ellos le habrían el show a la mítica banda \"Las pastillas del abuelo\", cuando yo era más joven y sacaba fotos, entonces me anime a ir con ellos a sacarles fotos, fue super divertido, el camarín, el show, todos lo técnicos e instrumentos que había ahí al costados del escenario, me encantaba ver todo eso de cerca cuando yo estaba en mis primeros pasos en la música con una banda que tenía con mis amigos del colegio. Años después y con muchísimo crecimiento de cada parte, los \"Hollywood Bungalows\" armaron esté festival, y yo puse mi grano de arena en lo que es un comienzo para toda la movida artística de Jujuy!",
      "No hubo mucho tiempo para esté desarrollo, literalmente tuve una semana para tener la web lista. eso claramente marco limites a nivel de diseño, pero con lo que tenía considere esto: Un festival necesita una primera impresión que compita con el ruido de las redes: fecha, lineup y sensación tienen que leerse en segundos, con un diseño que invite a comprar o guardar el evento.",
      "Elegí Next.js para una landing ultrarrápida, buena SEO social al compartir y despliegue estable en cada pico de visitas antes del show.",
      "En los próximos meses empezaremos el desarrollo de la nueva pagina de Sun Salvador.",
    ],
  },
  {
    slug: "hilo-de-letras",
    name: "Hilo de Letras",
    desc: "",
    tech: "Next.js, TypeScript",
    img: "/images/hilo-de-letras.png",
    url: "",
    status: "En desarrollo",
    relato: [],
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
]

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug)
}
