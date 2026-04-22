import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { notFound } from "next/navigation"
import { getProjectBySlug, projects } from "@/lib/projects"

type Props = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const project = getProjectBySlug(slug)
  if (!project) return { title: "Relato | Enzo Federico" }
  return {
    title: `${project.name} — Relato | Enzo Federico`,
    description: project.relato[0]?.slice(0, 155) ?? project.desc,
  }
}

export default async function RelatoPage({ params }: Props) {
  const { slug } = await params
  const project = getProjectBySlug(slug)
  if (!project) notFound()

  return (
    <article className="min-h-screen bg-[#0A0A0A] text-white overflow-x-hidden pt-24 md:pt-28 pb-20 px-6 md:px-16 lg:px-24">
      <div className="w-full max-w-[800px] mx-auto">
        <Link
          href="/relatos"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] mb-10 transition-opacity hover:opacity-80"
          style={{ color: "#A78BFA" }}
        >
          <ArrowLeft className="h-4 w-4" />
          Todos los relatos
        </Link>

        <p className="text-[10px] md:text-xs uppercase tracking-[0.4em] mb-6" style={{ color: "#A78BFA" }}>
          Relato
        </p>
        <h1 className="font-heading font-light text-[clamp(2rem,5vw,3.25rem)] text-white leading-[1.05] uppercase mb-4">
          {project.name}
        </h1>
        <p className="text-sm md:text-base mb-2" style={{ color: "#B8ADCC" }}>
          {project.desc}
        </p>
        <p className="text-[10px] uppercase tracking-wider mb-10" style={{ color: "#A78BFA" }}>
          {project.tech}
        </p>

        <div className="relative aspect-[21/11] w-full overflow-hidden rounded-lg mb-12 md:mb-14 bg-black">
          <Image
            src={project.img}
            alt={project.name}
            fill
            className="object-cover"
            sizes="(max-width: 800px) 100vw, 800px"
            priority
          />
        </div>

        <div className="space-y-6 text-base md:text-lg leading-relaxed" style={{ color: "#C4B8D6" }}>
          {project.relato.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>

        <div className="mt-14 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:gap-6 border-t border-white/10 pt-10">
          {project.url ? (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium transition-all duration-300 hover:gap-3"
              style={{ color: "#FFC400" }}
            >
              Ver proyecto
              <ArrowRight className="h-4 w-4" />
            </a>
          ) : null}
          <Link
            href="/#portfolio"
            className="inline-flex items-center gap-2 text-sm transition-opacity hover:opacity-80"
            style={{ color: "#A78BFA" }}
          >
            Volver al portfolio
          </Link>
        </div>
      </div>
    </article>
  )
}
