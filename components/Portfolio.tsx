"use client"

import type { ReactNode } from "react"
import { useEffect } from "react"
import Link from "next/link"
import { ArrowRight, Instagram } from "lucide-react"
import Navbar from "@/components/Navbar"
import TiltCard from "@/components/TiltCard"
import ProjectDeck from "@/components/ProjectDeck"
import { projects } from "@/lib/projects"
import { useReveal } from "@/hooks/useReveal"

const SHOW_OFFER_LANDING = false

const socios = [
  { name: "Cresciente", desc: "Teoría Musical & Composición", stats: "128 k suscriptores · 508 videos", img: "/images/cresciente.jpg" },
  { name: "Ikigai Vivero Orgánico", desc: "Viveros y jardinería, plantas nativas", stats: "8.160 seguidores", img: "/images/ikigai.jpg" },
  { name: "Maxi Sanchez", desc: "Bioconstrucción y permacultura", stats: "1,2 mill. seguidores", img: "/images/maxianchez.jpg" },
  { name: "Juan Pablo Francolini", desc: "Mitología, simbología y arquitectura", stats: "169 mil seguidores", img: "/images/francolini.jpg" },
]

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
    <div className="min-h-screen bg-transparent text-bone overflow-x-clip">
      <Navbar />

      <section id="inicio" className="relative min-h-[100svh] grid lg:grid-cols-2">
        <div className="relative h-[46vh] min-h-[240px] lg:h-auto lg:min-h-[100svh] overflow-hidden">
          <img
            src="/images/fotocom.jpg"
            alt="Enzo Federico"
            className="w-full h-full object-cover object-center"
            style={{ objectPosition: "center 28%" }}
          />
        </div>
        <div className="relative flex flex-col justify-center px-6 md:px-12 lg:px-14 py-12 lg:py-0 min-h-[54vh] lg:min-h-[100svh]">
          <p className="hero-line text-[10px] md:text-[11px] uppercase tracking-[0.38em] mb-8 md:mb-12 text-cyan">
            Enzo Federico — Growth & Development
          </p>
          <h1 className="leading-[0.86] tracking-[0.02em]">
            <span className="hero-line font-heading font-medium block text-[clamp(2.4rem,6.5vw,5.4rem)] text-bone uppercase">
              Creador
            </span>
            <span className="hero-line hero-line-delay font-heading font-medium block text-[clamp(2.1rem,5.8vw,4.6rem)] uppercase mt-2 text-[#FFC400]">
              Desarrollador
            </span>
          </h1>
          <a
            href="#sobre-mi"
            className="mt-12 text-[10px] uppercase tracking-[0.32em] text-mute hover:text-bone transition-colors animate-scroll-hint inline-block w-fit"
          >
            Scroll
          </a>
        </div>
      </section>

      <section id="sobre-mi" className="relative py-24 md:py-32 px-6 md:px-12 lg:px-14">
        <div className="w-full max-w-[900px] mx-auto">
          <h2 className="font-heading font-medium uppercase text-[clamp(1.5rem,3.2vw,2.8rem)] leading-[1.15] tracking-[0.02em]">
            <span className="text-mute">Conecto creatividad y </span>
            <span className="text-bone">Metodos robustos en desarrollo Full Stack</span>
          </h2>
          <Link
            href="/quien-soy"
            className="mt-8 md:mt-10 inline-flex items-center text-[11px] font-medium uppercase tracking-[0.18em] text-cyan border-b border-cyan/40 pb-1 hover:text-bone hover:border-bone/50 transition-colors w-fit"
          >
            Leer mas
          </Link>
        </div>
      </section>

      <section id="socios" className="relative py-28 md:py-36 px-5 md:px-10 lg:px-14">
        <div className="w-full max-w-[1400px] mx-auto">
          <Reveal>
            <h2 className="font-heading font-normal text-[clamp(2.8rem,8vw,7rem)] text-bone leading-[0.88] uppercase mb-3">
              Colaboraciones
            </h2>
            <p className="text-sm mb-14 md:mb-16 text-mute">Creadores y marcas con los que he trabajado.</p>
          </Reveal>
          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            {socios.map((item) => (
              <Reveal key={item.name}>
                <TiltCard>
                  <div className="border border-[var(--rule)] bg-void/55 backdrop-blur-[2px] overflow-hidden">
                    <div className="bg-black overflow-hidden">
                      <img src={item.img} alt={item.name} className="w-full h-auto object-contain" />
                    </div>
                    <div className="p-5">
                      <h3 className="font-heading text-xl md:text-2xl text-bone uppercase">{item.name}</h3>
                      <p className="text-sm mt-1 text-mute">{item.desc}</p>
                      {item.stats && (
                        <p className="text-[11px] uppercase tracking-[0.14em] text-cyan mt-2">{item.stats}</p>
                      )}
                    </div>
                  </div>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="portfolio" className="relative pt-16 pb-20 md:py-36 px-5 md:px-10 lg:px-14">
        <div className="w-full max-w-[1400px] mx-auto">
          <Reveal>
            <h2 className="font-heading font-normal text-[clamp(2.8rem,8vw,7rem)] text-bone leading-[0.88] uppercase mb-8 md:mb-12">
              Proyectos
            </h2>
          </Reveal>
          <ProjectDeck projects={projects} />
        </div>
      </section>

      <section
        id="contacto"
        className="relative flex flex-col justify-start lg:min-h-[80svh] lg:justify-center px-5 md:px-10 lg:px-14 pt-10 pb-20 md:py-28"
      >
        <div className="w-full max-w-[1600px] mx-auto md:pl-[18%]">
          <p className="text-[10px] md:text-[11px] uppercase tracking-[0.38em] mb-8 md:mb-12 text-cyan">Contacto</p>
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
              className="inline-flex items-center gap-2 text-sm font-medium uppercase tracking-[0.14em] text-bone border-b border-lake/50 pb-1 hover:text-lake transition-colors"
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
      </section>

      <footer className="px-5 md:px-10 lg:px-14 pb-8">
        <div className="w-full max-w-[1600px] mx-auto">
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
        </div>
      </footer>
    </div>
  )
}
