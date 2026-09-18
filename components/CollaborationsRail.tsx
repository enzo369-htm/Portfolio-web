"use client"

import { useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { socios } from "@/lib/socios"
import { useReveal } from "@/hooks/useReveal"

function padIndex(index: number) {
  return String(index + 1).padStart(2, "0")
}

export default function CollaborationsRail() {
  const { ref: revealRef, visible } = useReveal<HTMLDivElement>()
  const scrollerRef = useRef<HTMLDivElement>(null)

  const scrollByCard = (direction: number) => {
    const el = scrollerRef.current
    if (!el) return
    const card = el.querySelector<HTMLElement>("[data-collab-card]")
    const step = (card?.offsetWidth ?? 280) + 20
    el.scrollBy({ left: direction * step, behavior: "smooth" })
  }

  return (
    <div ref={revealRef} className={visible ? "reveal-in" : "reveal-wait"}>
      <div className="w-full max-w-[1400px] mx-auto px-5 md:px-10 lg:px-14">
        <div className="flex items-end justify-between gap-6 mb-10 md:mb-12">
          <div>
            <h2 className="font-heading font-normal text-[clamp(1.7rem,4vw,3rem)] text-bone leading-[1.05] uppercase mb-3">
              Colaboraciones
            </h2>
            <p className="text-sm text-mute">Creadores y marcas con los que he trabajado.</p>
          </div>
          <div className="hidden md:flex items-center gap-2 pb-1">
            <button
              type="button"
              onClick={() => scrollByCard(-1)}
              className="w-10 h-10 border border-[var(--rule)] text-mute hover:text-bone hover:border-bone/40 transition-colors flex items-center justify-center"
              aria-label="Ver ficha anterior"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => scrollByCard(1)}
              className="w-10 h-10 border border-[var(--rule)] text-mute hover:text-bone hover:border-bone/40 transition-colors flex items-center justify-center"
              aria-label="Ver ficha siguiente"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <div ref={scrollerRef} className="collab-rail">
        {socios.map((socio, index) => (
          <article
            key={socio.name}
            data-collab-card
            className="collab-card"
          >
            <div className="collab-card-bar" />
            <div className="px-5 pt-5 pb-6 flex flex-col items-center text-center">
              <div className="relative w-full flex justify-center mb-4">
                <div className="collab-avatar">
                  <img src={`${socio.avatar}?v=6`} alt={socio.name} />
                </div>
                <span className="absolute top-0 right-0 font-heading text-[10px] tracking-[0.32em] text-bone pt-1">
                  {padIndex(index)}
                </span>
              </div>
              <h3 className="font-heading text-[1.15rem] md:text-[1.25rem] text-bone uppercase leading-[1.15] tracking-[0.02em]">
                {socio.name}
              </h3>
              <p className="text-[11px] uppercase tracking-[0.16em] mt-1.5 text-bone/70">
                {socio.role}
              </p>
              <p className="font-heading text-[clamp(1.41rem,3.8vw,1.82rem)] leading-none mt-4 text-bone">
                {socio.followers}
              </p>
              <p className="text-[10px] uppercase tracking-[0.22em] text-mute mt-1.5">{socio.unit}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
