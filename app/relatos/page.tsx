import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { projects } from "@/lib/projects"

export const metadata: Metadata = {
  title: "Relatos | Enzo Federico",
  description: "Historias detrás de cada proyecto: contexto, decisiones y proceso.",
}

export default function RelatosIndexPage() {
  const listed = projects.filter((project) => project.relato.length > 0)

  return (
    <div className="min-h-screen bg-transparent text-bone overflow-x-hidden pt-24 md:pt-28 pb-20 px-5 md:px-10 lg:px-14">
      <div className="w-full max-w-[1400px] mx-auto">
        <p className="text-[10.5px] md:text-[11.5px] uppercase tracking-[0.38em] mb-8 md:mb-10 text-cyan">
          Más allá del resultado
        </p>
        <h1 className="font-heading font-normal text-[clamp(2.6rem,8vw,6.5rem)] text-bone leading-[0.88] uppercase mb-5">
          Relatos
        </h1>
        <p className="text-sm md:text-base max-w-2xl mb-16 md:mb-24 leading-relaxed text-mute">
          Cada proyecto tiene una historia: el problema que lo originó, las decisiones de producto y lo que aprendimos en el camino.
          Elegí un trabajo para leer el relato completo.
        </p>

        <div className="flex flex-col gap-16 md:gap-24">
          {listed.map((project, i) => {
            const photoRight = i % 2 === 1
            return (
              <Link
                key={project.slug}
                href={`/relatos/${project.slug}`}
                className={`group flex flex-col md:flex-row md:items-center gap-6 md:gap-10 lg:gap-14 ${
                  photoRight ? "md:flex-row-reverse" : ""
                }`}
              >
                <div className="relative w-full md:w-1/2 shrink-0 aspect-[16/10] overflow-hidden bg-plate">
                  <Image
                    src={project.img}
                    alt={project.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <div className="w-full md:w-1/2 flex flex-col gap-3">
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
            )
          })}
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
