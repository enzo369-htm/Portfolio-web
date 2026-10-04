export const presupuestoTitle = "Contame tu proyecto y te envío un presupuesto"

export const presupuestoPageLabel = "Cómo trabajo"

export type PresupuestoStage = {
  label: string
  paragraphs: string[]
  checklist: [string, string, string]
}

export const presupuestoStages: PresupuestoStage[] = [
  {
    label: "Primera etapa",
    paragraphs: [
      "El proceso es cercano, primero, en una reunion o por audios me compartis las ideas que tenes, que es lo que queres hacer, a veces esta todo claro desde un inicio, otras veces no. En esta primera etapa encontramos que queres transmitir y vamos ideando juntos con que pasamos eso a codigo. En esta etapa se realiza la hoja de ruta, que consta que secciones va atener el sitio, que van a tener esas secciones y luego como sera el diseño. Para eso hago algus preguntas.",
      "En esta etapa se pactan muchas bases de la web, y las ideas mas creativas tambien, por ejemplo en el caso de Juan Tarraf, el llego con una idea de \"no linealidad' en el hero (primer pantalla de la web), Juan pensaba en algo como un cielo con estrellas, o raices de un arbol. Mientras avanzaba esa charla de primera reunion, y tomando las ideas base de Juan, justo recorde que yo habia visto un video alguna vez.. que tenia cierto diseño acorde que encajaba un poco con lo que Juan queria lograr, lo encontre a eso, lo hablamos, lo perfeccionamos mucho, luego de unas semaanas y de probarlo, ese fue el diseño elegido.",
      "En esa primera estapa se entrega el preseupuesto y el contrato del sitio, que contempla lo que es un proceso creativo, es decir, un proceso que en sus ideas puede mutar, es decir que, hay cosas que podemos cambiar.",
    ],
    checklist: [
      "Reunión o audios para bajar ideas y qué querés transmitir",
      "Hoja de ruta: secciones, contenido de cada una y dirección de diseño",
      "Presupuesto y contrato (el proceso creativo puede mutar)",
    ],
  },
  {
    label: "Etapa dos",
    paragraphs: [
      "Luego de esta primera estapa inicia la etapa dos en la que yo empiezo el trabajo pesado, en donde configuro el backend de la web, (la base de datos, el admin CMS, guardado de archivos, hosting, etc..) y armo la estructura base de la web. A lo largo de las reuniones, (1 por semana) vamos puliendo lo que en la hoja de ruta pactamos, hay cosas que mejoramos, probamos, cambiamos etc..",
      "Estas son aproximadamente 3 semanas en donde yo mientras construyo el sitio, en las reuniones vamos perfeccionando todo lo que pactamos en la hoja de ruta, y sobre todo, en estas estapas nos encargamos mas del diseño.",
      "Ademas en esta etapa empezamos a probar el admin y te doy acceso, para que puedas ir subiendo el material y editando tu web.",
    ],
    checklist: [
      "Backend: base de datos, admin CMS, archivos y hosting",
      "Estructura base del sitio",
      "Reuniones semanales, pulido de diseño y acceso al admin",
    ],
  },
  {
    label: "Semana 4",
    paragraphs: [
      "Finalmente, llegada la semana 4, configuro el dominio y hago testeos grandes en tu web para que todo lo realizado este seguro y se mantenga en el tiempo, luego de esto, entramos en los 30 dias gratis de soporte, en donde corrijo los bugs que puedan surgir, asi, en ese mes de uso real de la web en el que pueden surgir cosas, nos aseguramos de el sitio esta realmente listo.",
    ],
    checklist: [
      "Configuración del dominio",
      "Testeos grandes de seguridad y estabilidad",
      "30 días de soporte gratis para bugs del uso real",
    ],
  },
]

export const JUAN_TARRAF_URL = "https://juan-manuel-tarraf-seven.vercel.app/"
