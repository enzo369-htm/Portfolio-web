import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { notFound } from "next/navigation"
import Navbar from "@/components/Navbar"
import { getProjectBySlug, projects } from "@/lib/projects"

type Props = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return projects.filter((p) => p.relato.length > 0).map((p) => ({ slug: p.slug }))
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
  if (!project || project.relato.length === 0) notFound()

  const detailSrc = project.relatoDetailImg ?? project.img

  return (
    <article className="relato-enter min-h-screen bg-transparent text-bone overflow-x-hidden pt-24 md:pt-28 pb-20 px-5 md:px-10 lg:px-16">
      <Navbar />
      <div className="w-full max-w-[780px] md:ml-[10%] md:mr-auto">
        <Link
          href="/relatos"
          className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] mb-10 text-cyan hover:text-bone transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Todos los relatos
        </Link>

        <p className="text-[10px] md:text-[11px] uppercase tracking-[0.38em] mb-6 text-cyan">Relato</p>
        <h1 className="font-heading font-normal text-[clamp(2.2rem,6vw,4.2rem)] text-bone leading-[1.02] uppercase mb-4">
          {project.name}
        </h1>
        {project.desc ? <p className="text-sm md:text-base mb-2 text-mute">{project.desc}</p> : null}
        <p className="text-[10px] uppercase tracking-[0.16em] mb-10 text-cyan">{project.tech}</p>

        <div
          className={
            project.relatoImageContain
              ? "relato-plate w-full mb-12 md:mb-14 overflow-hidden"
              : "relato-plate relative aspect-[21/11] w-full overflow-hidden mb-12 md:mb-14 bg-plate"
          }
          style={
            project.relatoImageContain
              ? { backgroundColor: project.relatoImageContainBg ?? "#e8e6e2" }
              : undefined
          }
        >
          {project.relatoImageContain ? (
            <Image
              src={detailSrc}
              alt={project.name}
              width={1920}
              height={1200}
              className="w-full h-auto object-contain"
              sizes="(max-width: 800px) 100vw, 800px"
              priority
            />
          ) : (
            <Image
              src={detailSrc}
              alt={project.name}
              fill
              className="object-cover"
              sizes="(max-width: 800px) 100vw, 800px"
              priority
            />
          )}
        </div>

        <div className="space-y-6 text-base md:text-lg leading-[1.8] text-mute">
          {project.relato.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>

        <div className="mt-14 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:gap-6 border-t border-[var(--rule)] pt-10">
          {project.url ? (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.16em] text-lake hover:text-bone transition-colors"
            >
              Ver proyecto
              <ArrowRight className="h-4 w-4" />
            </a>
          ) : null}
          <Link
            href="/#portfolio"
            className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.16em] text-cyan hover:text-bone transition-colors"
          >
            Volver al portfolio
          </Link>
        </div>
      </div>
    </article>
  )
}
