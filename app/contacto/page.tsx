import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, ArrowRight, Instagram } from "lucide-react"
import Navbar from "@/components/Navbar"

export const metadata: Metadata = {
  title: "Contacto | Enzo Federico",
  description: "Hablemos por WhatsApp.",
}

export default function ContactoPage() {
  return (
    <div className="min-h-screen bg-transparent text-bone overflow-x-hidden pt-24 md:pt-28 px-5 md:px-10 lg:px-14 flex flex-col">
      <Navbar />
      <div className="w-full max-w-[1600px] mx-auto md:pl-[18%] flex-1 flex flex-col justify-center pb-16">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-cyan hover:text-bone transition-colors mb-10 w-fit"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver al inicio
        </Link>
        <p className="text-[10px] md:text-[11px] uppercase tracking-[0.38em] mb-8 md:mb-12 text-cyan">Contacto</p>
        <h1 className="leading-[0.84] tracking-[-0.04em]">
          <span className="font-heading font-normal block text-[clamp(3rem,10vw,8rem)] uppercase mb-6 text-lake">
            <span className="misregister misregister-lake" data-text="¿Hablamos?">
              ¿Hablamos?
            </span>
          </span>
          <span className="block text-[clamp(1rem,2.4vw,1.45rem)] font-heading uppercase tracking-[0.22em] mb-10 md:mb-14 text-cyan">
            &mdash;&mdash;
          </span>
        </h1>
        <a
          href="https://wa.me/5493885246095"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm font-medium uppercase tracking-[0.14em] text-bone border-b border-lake/50 pb-1 hover:text-lake transition-colors w-fit"
        >
          WhatsApp
          <ArrowRight className="w-4 h-4" />
        </a>
      </div>
      <footer className="w-full max-w-[1600px] mx-auto pb-8">
        <div className="hairline mb-8" />
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <span className="font-heading text-lg tracking-wide text-bone">Enzo Federico</span>
          <p className="text-[10px] uppercase tracking-[0.2em] text-mute">&copy; 2024</p>
          <a
            href="https://www.instagram.com/enzo.z4?igsh=Mm05MnA0enB2eXlk&utm_source=qr"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-[11px] uppercase tracking-[0.16em] text-cyan hover:text-bone transition-colors"
          >
            <Instagram className="w-4 h-4" />
            Instagram
          </a>
        </div>
      </footer>
    </div>
  )
}
