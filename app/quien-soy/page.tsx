import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import Navbar from "@/components/Navbar"
import { quienSoyParagraphs } from "@/lib/quien-soy-text"

export const metadata: Metadata = {
  title: "Quién soy | Enzo Federico",
  description: "Camino personal: lo digital, la comunicación, ventas, colaboraciones y lo que hoy construyo.",
}

export default function QuienSoyPage() {
  return (
    <div className="min-h-screen bg-transparent text-bone overflow-x-hidden pt-24 md:pt-28 pb-20 px-5 md:px-10 lg:px-16">
      <Navbar />
      <div className="w-full max-w-[720px] md:ml-[12%] md:mr-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] mb-12 text-cyan hover:text-bone transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver al inicio
        </Link>

        <p className="text-[10px] md:text-[11px] uppercase tracking-[0.38em] mb-6 text-cyan">Enzo Federico</p>
        <h1 className="font-heading font-normal text-[clamp(2.6rem,7vw,4.6rem)] text-bone leading-[1.02] mb-10 md:mb-14">
          Quién soy
        </h1>

        <div className="space-y-6 text-base md:text-[1.05rem] leading-[1.85] text-mute">
          {quienSoyParagraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>

        <div className="mt-14 border-t border-[var(--rule)] pt-10">
          <Link
            href="/proyectos"
            className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-lake hover:text-bone transition-colors"
          >
            Ver proyectos →
          </Link>
        </div>
      </div>
    </div>
  )
}
