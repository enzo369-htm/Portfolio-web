export type Socio = {
  name: string
  role: string
  bio: string
  followers: string
  unit: string
  avatar: string
  color: string
}

export const socios: Socio[] = [
  {
    name: "Cresciente",
    role: "Teoría musical & composición",
    bio: "Academia online de música. Enseñan teoría, oficio y sensibilidad para formar músicos.",
    followers: "128K",
    unit: "suscriptores",
    avatar: "/images/socios/cresciente.jpg",
    color: "#E39B12",
  },
  {
    name: "Ikigai Vivero Orgánico",
    role: "Vivero y paisajismo",
    bio: "Plantas nativas, árboles, asesoramiento y diseño de jardines. Vivero orgánico.",
    followers: "8.160",
    unit: "seguidores",
    avatar: "/images/socios/ikigai.jpg",
    color: "#D4896A",
  },
  {
    name: "Maxi Sanchez",
    role: "Bioconstrucción & permacultura",
    bio: "Bioconstrucción, permacultura y recetas naturales. Contenido y formación con alcance masivo.",
    followers: "1,2M",
    unit: "seguidores",
    avatar: "/images/socios/maxianchez.jpg",
    color: "#E4572E",
  },
  {
    name: "Juan Pablo Francolini",
    role: "Mitología y arquitectura",
    bio: "Investigación en mitología, simbología, arquitectura, astronomía, ciencia y tecnología.",
    followers: "169K",
    unit: "seguidores",
    avatar: "/images/socios/francolini.jpg",
    color: "#5EC4D4",
  },
]
