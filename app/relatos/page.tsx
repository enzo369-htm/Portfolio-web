import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import Navbar from "@/components/Navbar"
import { projects } from "@/lib/projects"

export const metadata: Metadata = {
  title: "Relatos | Enzo Federico",
  description: "Historias detrás de cada proyecto: contexto, decisiones y proceso.",
}

const frames = [
  "md:w-[78%] md:ml-0",
  "md:w-[62%] md:ml-[20%]",
  "md:w-[70%] md:ml-[6%]",
  "md:w-[54%] md:ml-[28%]",
  "md:w-[74%] md:ml-[10%]",
]

export default function RelatosIndexPage() {
  const listed = projects.filter((project) => project.relato.length > 0)

  return (
    <div className="min-h-screen bg-transparent text-bone overflow-x-hidden pt-24 md:pt-28 pb-20 px-5 md:px-10 lg:px-14">
      <Navbar />
      <div className="w-full max-w-[1600px] mx-auto">
        <p className="text-[10px] md:text-[11px] uppercase tracking-[0.38em] mb-8 md:mb-10 text-cyan">
          Más allá del resultado
        </p>
        <h1 className="font-heading font-normal text-[clamp(2.6rem,8vw,6.5rem)] text-bone leading-[0.88] uppercase mb-5">
          Relatos
        </h1>
        <p className="text-sm md:text-base max-w-2xl mb-16 md:mb-24 md:ml-[14%] leading-relaxed text-mute">
          Cada proyecto tiene una historia: el problema que lo originó, las decisiones de producto y lo que aprendimos en el camino.
          Elegí un trabajo para leer el relato completo.
        </p>

        <div className="flex flex-col gap-14 md:gap-16">
          {listed.map((project, i) => (
            <Link
              key={project.slug}
              href={`/relatos/${project.slug}`}
              className={`group relative flex flex-col w-full ${frames[i % frames.length]}`}
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-plate crop-shift">
                <Image
                  src={project.img}
                  alt={project.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 70vw"
                />
              </div>
              <div className="mt-4 flex flex-col gap-2">
                <div className="flex flex-wrap items-baseline gap-3">
                  <h2 className="font-heading text-xl text-bone uppercase md:text-3xl leading-none">{project.name}</h2>
                  {project.status ? (
                    <span className="text-[9px] uppercase tracking-[0.16em] text-lake border border-lake/40 px-2 py-0.5">
                      {project.status}
                    </span>
                  ) : null}
                </div>
                {project.desc ? <p className="text-sm leading-relaxed text-mute max-w-xl">{project.desc}</p> : null}
                <span className="mt-1 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.16em] text-lake group-hover:text-bone transition-colors">
                  Leer relato
                  <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-16 border-t border-[var(--rule)] pt-10">
          <Link
            href="/#portfolio"
            className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.16em] text-cyan hover:text-bone transition-colors"
          >
            ← Volver a proyectos en el inicio
          </Link>
        </div>
      </div>
    </div>
  )
}
