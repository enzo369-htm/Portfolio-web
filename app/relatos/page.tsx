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
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white overflow-x-hidden pt-24 md:pt-28 pb-20 px-6 md:px-16 lg:px-24">
      <div className="w-full max-w-[1400px] mx-auto">
        <p className="text-[10px] md:text-xs uppercase tracking-[0.4em] mb-8 md:mb-10" style={{ color: "#A78BFA" }}>
          Más allá del resultado
        </p>
        <h1 className="font-heading font-light text-[clamp(2.25rem,6vw,4.5rem)] text-white leading-[0.95] uppercase mb-4">
          Relatos
        </h1>
        <p className="text-sm md:text-base max-w-2xl mb-16 md:mb-20 leading-relaxed" style={{ color: "#B8ADCC" }}>
          Cada proyecto tiene una historia: el problema que lo originó, las decisiones de producto y lo que aprendimos en el camino.
          Elegí un trabajo para leer el relato completo.
        </p>

        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((project) => (
            <Link
              key={project.slug}
              href={`/relatos/${project.slug}`}
              className="group relative flex flex-col overflow-hidden rounded-lg border border-white/15 bg-white/[0.04] transition-colors hover:border-white/25"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-black">
                <Image
                  src={project.img}
                  alt={project.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background: "linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 55%)",
                  }}
                />
              </div>
              <div className="flex flex-1 flex-col p-5 md:p-6">
                <div className="mb-2 flex flex-wrap items-center gap-2">
                  <h2 className="font-heading font-medium text-xl text-white uppercase md:text-2xl">{project.name}</h2>
                  {project.status ? (
                    <span
                      className="text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-full"
                      style={{ color: "#FFC400", border: "1px solid rgba(255, 196, 0, 0.3)" }}
                    >
                      {project.status}
                    </span>
                  ) : null}
                </div>
                <p className="text-sm leading-relaxed flex-1" style={{ color: "#B8ADCC" }}>
                  {project.desc}
                </p>
                <span
                  className="mt-4 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-wider transition-all duration-300 group-hover:gap-3"
                  style={{ color: "#FFC400" }}
                >
                  Leer relato
                  <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-16 border-t border-white/10 pt-10">
          <Link
            href="/#portfolio"
            className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.15em] transition-opacity hover:opacity-80"
            style={{ color: "#A78BFA" }}
          >
            ← Volver a proyectos en el inicio
          </Link>
        </div>
      </div>
    </div>
  )
}
