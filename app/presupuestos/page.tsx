import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import Navbar from "@/components/Navbar"
import ContactForm from "@/components/ContactForm"
import {
  JUAN_TARRAF_URL,
  presupuestoStages,
  presupuestoTitle,
} from "@/lib/presupuesto-text"

export const metadata: Metadata = {
  title: "Presupuestos | Enzo Federico",
  description: presupuestoTitle,
}

function withJuanLink(text: string) {
  const parts = text.split("Juan Tarraf")
  if (parts.length === 1) return text
  return parts.map((part, i) => (
    <span key={i}>
      {part}
      {i < parts.length - 1 ? (
        <a
          href={JUAN_TARRAF_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-cyan hover:text-bone transition-colors"
        >
          Juan Tarraf
        </a>
      ) : null}
    </span>
  ))
}

export default function PresupuestosPage() {
  return (
    <div className="min-h-screen bg-transparent text-bone overflow-x-hidden pt-24 md:pt-28 pb-20 px-5 md:px-10 lg:px-16">
      <Navbar />
      <div className="w-full max-w-[720px] md:ml-[12%] md:mr-auto">
        <Link
          href="/#contacto"
          className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] mb-12 text-cyan hover:text-bone transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver al inicio
        </Link>

        <h1 className="font-heading font-normal text-[clamp(1.8rem,5vw,3.2rem)] text-bone leading-[1.08] uppercase mb-10 md:mb-14">
          Cómo trabajo
        </h1>

        <div className="space-y-14 text-base md:text-[1.05rem] leading-[1.85] text-mute">
          {presupuestoStages.map((stage) => (
            <section key={stage.label}>
              <p className="text-[10px] md:text-[11px] uppercase tracking-[0.38em] mb-5 text-cyan">{stage.label}</p>
              <div className="space-y-6">
                {stage.paragraphs.map((paragraph) => (
                  <p key={paragraph.slice(0, 48)}>{withJuanLink(paragraph)}</p>
                ))}
              </div>
              <ul className="presupuesto-check mt-6">
                {stage.checklist.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        <div className="w-full max-w-[720px] mt-16 md:mt-20 pt-10 border-t border-[var(--rule)]">
          <p className="text-[10px] md:text-[11px] uppercase tracking-[0.38em] mb-6 text-cyan">Escribime</p>
          <ContactForm />
        </div>
      </div>
    </div>
  )
}
