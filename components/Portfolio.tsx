"use client"

import type { ReactNode } from "react"
import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowRight, Instagram } from "lucide-react"
import Navbar from "@/components/Navbar"
import ProjectDeck from "@/components/ProjectDeck"
import { projects } from "@/lib/projects"
import { useReveal } from "@/hooks/useReveal"

const SHOW_OFFER_LANDING = false

const HERO_LINES = [
  "Creador",
  "Desarrollador",
  "Conecto creatividad y métodos robustos en desarrollo Full Stack",
]

function HeroTypewriter() {
  const [lines, setLines] = useState(["", "", ""])
  const [activeLine, setActiveLine] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    let cancelled = false
    let line = 0
    let index = 0
    let timer = 0

    const schedule = (fn: () => void, delay: number) => {
      timer = window.setTimeout(() => {
        if (!cancelled) fn()
      }, delay)
    }

    const type = () => {
      if (cancelled) return
      const full = HERO_LINES[line]
      index += 1
      setLines((prev) => {
        const next = [...prev]
        next[line] = full.slice(0, index)
        return next
      })

      if (index < full.length) {
        schedule(type, 70)
        return
      }

      if (line < HERO_LINES.length - 1) {
        line += 1
        index = 0
        setActiveLine(line)
        schedule(type, 450)
        return
      }

      setDone(true)
    }

    schedule(type, 600)
    return () => {
      cancelled = true
      window.clearTimeout(timer)
    }
  }, [])

  return (
    <div id="sobre-mi" className="mt-8 md:mt-10 w-full max-w-[42rem] min-h-[13.5rem] md:min-h-[14.5rem] text-bone">
      <h1 className="hero-desarrollador font-heading font-medium uppercase leading-[1.08]">
        <span className="block">
          {activeLine > 0 || done ? HERO_LINES[0] : lines[0]}
          {!done && activeLine === 0 ? <span className="hero-caret" aria-hidden /> : null}
        </span>
        <span className="block mt-1">
          {activeLine > 1 || done ? HERO_LINES[1] : lines[1]}
          {!done && activeLine === 1 ? <span className="hero-caret" aria-hidden /> : null}
        </span>
      </h1>
      <p className="font-heading font-medium uppercase mt-5 leading-[1.25] tracking-[0.02em] text-[clamp(0.95rem,2.4vw,1.35rem)]">
        {lines[2]}
        {!done && activeLine === 2 ? <span className="hero-caret" aria-hidden /> : null}
      </p>
      <Link
        href="/quien-soy"
        className="mt-7 md:mt-8 inline-flex items-center text-[11px] font-medium uppercase tracking-[0.18em] text-cyan border-b border-cyan/40 pb-1 hover:text-bone hover:border-bone/50 transition-colors"
      >
        Leer mas
      </Link>
    </div>
  )
}

function Reveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  const { ref, visible } = useReveal<HTMLDivElement>()
  return (
    <div ref={ref} className={`${visible ? "reveal-in" : "reveal-wait"} ${className}`}>
      {children}
    </div>
  )
}

export default function Portfolio() {
  useEffect(() => {
    const hash = typeof window !== "undefined" ? window.location.hash.replace("#", "") : ""
    if (!hash) return
    requestAnimationFrame(() => {
      const el = document.getElementById(hash)
      if (el) {
        const offset = 80
        const top = el.getBoundingClientRect().top + window.pageYOffset - offset
        window.scrollTo({ top, behavior: "smooth" })
      }
    })
  }, [])

  return (
    <div className="min-h-screen bg-transparent text-bone overflow-x-hidden">
      <Navbar />

      <section id="inicio" className="page-section relative min-h-[100svh] flex flex-col items-center justify-center px-6 md:px-12 text-center">
        <img
          src="/images/hero-enzo.jpg?v=4"
          alt="Enzo Federico"
          className="w-[218px] md:w-[276.5px] lg:w-[305.5px] h-auto"
        />
        <HeroTypewriter />
      </section>

      <section id="portfolio" className="page-section relative min-h-[100svh] flex flex-col justify-center pt-24 pb-16 md:py-28 px-5 md:px-10 lg:px-14">
        <div className="w-full max-w-[1400px] mx-auto">
          <Reveal>
            <h2 className="font-heading font-normal text-[clamp(1.7rem,4vw,3rem)] text-bone leading-[1.05] uppercase">
              Proyectos
            </h2>
            <p className="text-sm text-mute mt-3 mb-8 md:mb-12">De desarrollo y diseño web</p>
          </Reveal>
          <ProjectDeck projects={projects} />
        </div>
      </section>

      <section
        id="contacto"
        className="page-section relative min-h-[100svh] flex flex-col justify-between px-5 md:px-10 lg:px-14 pt-24 pb-10 md:pt-28"
      >
        <div className="w-full max-w-[1400px] mx-auto flex-1 flex flex-col justify-center">
          <p className="text-[11px] md:text-[12px] uppercase tracking-[0.38em] mb-8 md:mb-12 text-cyan">Contacto</p>
          <h2 className="leading-[0.84] tracking-[-0.04em]">
            <span className="font-heading font-normal block text-[clamp(3rem,10vw,8rem)] uppercase mb-6 text-lake">
              <span className="misregister misregister-lake" data-text="¿Hablamos?">
                ¿Hablamos?
              </span>
            </span>
            <span className="block text-[clamp(1rem,2.4vw,1.45rem)] font-heading uppercase tracking-[0.22em] mb-10 md:mb-14 text-cyan">
              &mdash;&mdash;
            </span>
          </h2>
          <div className="flex flex-wrap items-center gap-8">
            <a
              href="https://wa.me/5493885246095"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[15.4px] font-medium uppercase tracking-[0.14em] text-bone border-b border-lake/50 pb-1 hover:text-lake transition-colors"
            >
              WhatsApp
              <ArrowRight className="w-4 h-4" />
            </a>
            {SHOW_OFFER_LANDING && (
              <a
                href="/oferta"
                className="inline-flex items-center gap-2 text-sm font-medium text-mute hover:text-bone transition-colors"
              >
                Ver oferta
                <ArrowRight className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>

        <footer className="w-full max-w-[1600px] mx-auto pt-16">
          <div className="hairline mb-8" />
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <span className="font-heading text-[20.7px] tracking-wide text-bone">Enzo Federico</span>
            <p className="text-[11.5px] uppercase tracking-[0.2em] text-mute">&copy; 2024</p>
            <a
              href="https://www.instagram.com/enzo.z4?igsh=Mm05MnA0enB2eXlk&utm_source=qr"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-[12.65px] uppercase tracking-[0.16em] text-cyan hover:text-bone transition-colors"
            >
              <Instagram className="w-[18.4px] h-[18.4px]" />
              Instagram
            </a>
          </div>
        </footer>
      </section>
    </div>
  )
}
