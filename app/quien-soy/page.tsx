import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { quienSoyParagraphs } from "@/lib/quien-soy-text"

export const metadata: Metadata = {
  title: "Quién soy | Enzo Federico",
  description: "Camino personal: lo digital, la comunicación, ventas, colaboraciones y lo que hoy construyo.",
}

export default function QuienSoyPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white overflow-x-hidden pt-24 md:pt-28 pb-20 px-6 md:px-16 lg:px-24">
      <div className="w-full max-w-[720px] mx-auto">
        <Link
          href="/#sobre-mi"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] mb-10 transition-opacity hover:opacity-80"
          style={{ color: "#A78BFA" }}
        >
          <ArrowLeft className="h-4 w-4" />
          Volver a Sobre mí
        </Link>

        <p className="text-[10px] md:text-xs uppercase tracking-[0.4em] mb-6" style={{ color: "#A78BFA" }}>
          Enzo Federico
        </p>
        <h1 className="font-heading font-light text-[clamp(2rem,5vw,3.25rem)] text-white leading-[1.05] uppercase mb-10 md:mb-12">
          Quién soy
        </h1>

        <div className="space-y-6 text-base md:text-[1.05rem] leading-[1.75]" style={{ color: "#C4B8D6" }}>
          {quienSoyParagraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>

        <div className="mt-14 border-t border-white/10 pt-10">
          <Link
            href="/#portfolio"
            className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.15em] transition-opacity hover:opacity-80"
            style={{ color: "#FFC400" }}
          >
            Ver proyectos →
          </Link>
        </div>
      </div>
    </div>
  )
}
