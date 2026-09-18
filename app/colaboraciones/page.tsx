import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import Navbar from "@/components/Navbar"
import CollaborationsRail from "@/components/CollaborationsRail"

export const metadata: Metadata = {
  title: "Colaboraciones | Enzo Federico",
  description: "Creadores y marcas con los que he trabajado.",
}

export default function ColaboracionesPage() {
  return (
    <div className="min-h-screen bg-transparent text-bone overflow-x-hidden pt-24 md:pt-28 pb-20">
      <Navbar />
      <div className="w-full max-w-[1400px] mx-auto px-5 md:px-10 lg:px-14 mb-8">
        <Link
          href="/#inicio"
          className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-cyan hover:text-bone transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver al inicio
        </Link>
      </div>
      <CollaborationsRail />
    </div>
  )
}
