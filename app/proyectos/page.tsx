import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import Navbar from "@/components/Navbar"
import ProjectDeck from "@/components/ProjectDeck"
import { projects } from "@/lib/projects"

export const metadata: Metadata = {
  title: "Proyectos | Enzo Federico",
  description: "Proyectos de desarrollo y diseño web.",
}

export default function ProyectosPage() {
  return (
    <div className="min-h-screen bg-transparent text-bone overflow-x-hidden pt-24 md:pt-28 pb-20 px-5 md:px-10 lg:px-14">
      <Navbar />
      <div className="w-full max-w-[1400px] mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-cyan hover:text-bone transition-colors mb-10"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver al inicio
        </Link>
        <h1 className="font-heading font-normal text-[clamp(1.7rem,4vw,3rem)] text-bone leading-[1.05] uppercase">
          Proyectos
        </h1>
        <p className="text-sm text-mute mt-3 mb-8 md:mb-12">De desarrollo y diseño web</p>
        <ProjectDeck projects={projects} />
      </div>
    </div>
  )
}
