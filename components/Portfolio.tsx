"use client"

import type React from "react"

import { useState } from "react"
import { ArrowRight, Code, TrendingUp, Zap, Instagram } from "lucide-react"
import Navbar from "@/components/Navbar"

const SHOW_OFFER_LANDING = false

export default function Portfolio() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    projectType: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState("")

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitMessage("")

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (response.ok) {
        setSubmitMessage("¡Mensaje enviado correctamente! Te contactaré pronto.")
        setFormData({ name: "", email: "", projectType: "", message: "" })
      } else {
        setSubmitMessage(result.error || "Error al enviar el mensaje")
      }
    } catch (error) {
      setSubmitMessage("Error al enviar el mensaje. Inténtalo de nuevo.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const socios = [
    { name: 'Cresciente', desc: 'Teoría Musical & Composición', stats: '115 k suscriptores · 443 videos', img: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Captura%20de%20Pantalla%202025-08-18%20a%20la%28s%29%2000.36.03-WM8iB5C8DxacSUyMH46aBPCmqRTnq4.png' },
    { name: 'Ikigai Vivero Orgánico', desc: 'Viveros y jardinería, plantas nativas', stats: '7k+ seguidores', img: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Captura%20de%20Pantalla%202025-08-18%20a%20la%28s%29%2000.34.58-w0rBkAAqeFsIFswE7SrpAc6LXupbac.png' },
    { name: 'Maxi Sanchez', desc: 'Bioconstrucción y permacultura', stats: '275k+ seguidores', img: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Captura%20de%20Pantalla%202025-08-18%20a%20la%28s%29%2000.33.13-YD7yZMCUxQMSdlBMLXrO0dLzsfAJJO.png' },
    { name: 'Juan Pablo Francolini', desc: 'Mitología, simbología y arquitectura', stats: '154k+ seguidores', img: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Captura%20de%20Pantalla%202025-08-18%20a%20la%28s%29%2000.34.01-rV9CYkNS11faZBYsy2ypnvzEkEWy3N.png' }
  ]

  const projects = [
    { name: 'Cresciente', desc: 'Academia de composición musical online. Cursos, metodología propia y comunidad.', tech: 'WordPress, PHP', img: '/images/cresciente .png', url: 'https://cresciente.net/', status: '' },
    { name: 'Sun Salvador Festival', desc: 'Landing para festival de música. Evento, artistas y entradas.', tech: 'Next.js, TypeScript', img: '/images/Sun-Salvador-festival.png', url: 'https://sun-salvador.vercel.app/', status: '' },
    { name: 'Entramado', desc: 'Plataforma web para divulgadores de arte.', tech: 'Next.js, TypeScript', img: '/images/entramado.png', url: '', status: 'En desarrollo' },
    { name: 'DIPLEMM', desc: 'Sistema de planeación y estructuración metodológica para proyectos.', tech: 'Next.js, TypeScript', img: '/images/diplemm.png', url: '', status: 'En desarrollo' },
    { name: 'Turnos In', desc: 'Gestión de turnos y citas online.', tech: 'Next.js, TypeScript', img: '/images/Turnos In.png', url: '', status: 'En desarrollo' },
    { name: 'Magnificent Monstera', desc: 'Aplicación web con diseño responsivo.', tech: 'React, Tailwind', img: '/images/Magnificent Monstera.png', url: 'https://magnificent-monstera-92ea1e.netlify.app/', status: '' },
  ]

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white overflow-x-hidden">
      <Navbar />

      {/* ═══════════════════ HERO — full viewport, massive type ═══════════════════ */}
      <section id="inicio" className="relative min-h-screen flex flex-col justify-center px-6 md:px-16 lg:px-24">
        <div className="w-full max-w-[1400px] mx-auto">
          <p className="text-[10px] md:text-xs uppercase tracking-[0.4em] mb-12" style={{ color: '#A78BFA' }}>
            Enzo Federico — Growth & Development
          </p>
          <h1 className="leading-[0.9] tracking-[-0.03em]">
            <span className="font-heading font-light block text-[clamp(2.25rem,7vw,6.5rem)] uppercase mb-6">
              <span className="text-white">AI-Assisted </span>
              <span style={{ color: '#FFC400' }}>Fullstack Builder</span>
            </span>
            <span className="block text-[clamp(1rem,2.5vw,1.5rem)] font-heading font-light uppercase tracking-[0.2em] mb-6" style={{ color: '#A78BFA' }}>
              &mdash;&mdash;
            </span>
            <span className="font-heading font-medium block text-[clamp(1.5rem,4vw,3.5rem)] text-white/90 tracking-[-0.02em]">
              Growth Operator
            </span>
          </h1>
        </div>
        <div className="absolute bottom-10 left-6 md:left-16 lg:left-24">
          <a
            href="#sobre-mi"
            className="text-[10px] uppercase tracking-[0.3em] transition-opacity hover:opacity-100 animate-scroll-hint inline-block"
            style={{ color: '#A78BFA', opacity: 0.6 }}
          >
            Scroll
          </a>
        </div>
      </section>

      {/* ═══════════════════ ABOUT — photo + large statement ═══════════════════ */}
      <section id="sobre-mi" className="relative">
        <div className="grid lg:grid-cols-2 lg:min-h-[calc(100svh-5.5rem)] lg:items-stretch">
          {/* Photo side — full frame on desktop, no bottom clip */}
          <div className="relative h-[52vh] min-h-[240px] sm:min-h-[280px] md:h-[48vh] lg:h-full lg:min-h-0 overflow-hidden">
            <img
              src="/images/foto.jpg"
              alt="Enzo Federico"
              className="w-full h-full object-cover object-center"
              style={{ objectPosition: "center 28%" }}
            />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, transparent 60%, #0A0A0A 100%)' }} />
            <div className="absolute inset-0 lg:hidden" style={{ background: 'linear-gradient(to bottom, transparent 50%, #0A0A0A 100%)' }} />
          </div>
          {/* Text side — un solo párrafo continuo; centrado en la altura de la columna */}
          <div className="flex flex-col justify-center px-6 md:px-12 lg:px-14 xl:px-20 py-12 md:py-16 lg:h-full lg:min-h-0 lg:py-6 relative">
            <h2 className="font-heading font-light uppercase text-balance text-[clamp(1.65rem,calc(2.15vw+2dvh),3.75rem)] leading-[1.08]">
              <span style={{ color: '#C4B8D6' }}>Conecto creatividad </span>
              <span className="text-white">Sistemas robustos en desarrollo Full Stack y estrategias de crecimiento </span>
              <span style={{ color: '#FFC400' }}>para transformar ideas en Realidades</span>
            </h2>
          </div>
        </div>
      </section>

      {/* ═══════════════════ SERVICES — large type listing ═══════════════════ */}
      <section id="servicios" className="relative py-32 md:py-40 px-6 md:px-16 lg:px-24">
        <div className="w-full max-w-[1400px] mx-auto">
          <h2 className="font-heading font-light text-[clamp(2.5rem,6vw,5rem)] text-white leading-[0.95] uppercase mb-20">
            Servicios
          </h2>

          {/* Service rows — big serif titles like the reference */}
          <div className="space-y-0">
            {[
              { icon: Code, name: "Desarrollo Web", desc: "Aplicaciones web de alto nivel, desarrolladas con tecnología de vanguardia y diseño escalable.", color: "#A78BFA" },
              { icon: Zap, name: "Lanzamiento de productos", desc: "Planificación, creación y lanzamiento con mensaje claro y atractivo para tu audiencia.", color: "#FFC400" },
              { icon: TrendingUp, name: "Embudos de venta", desc: "Embudos que atraen, nutren y convierten. Cada paso fluido y efectivo.", color: "#A78BFA" },
            ].map((service, i) => {
              const Icon = service.icon
              return (
                <div key={i} className="group cursor-default">
                  <div className="h-px w-full" style={{ backgroundColor: 'rgba(255,255,255,0.08)' }} />
                  <div className="py-8 md:py-12 flex flex-col md:flex-row md:items-center gap-4 md:gap-12 transition-all duration-500 group-hover:pl-6">
                    <div className="flex items-center gap-5 md:w-[400px] shrink-0">
                      <Icon className="w-5 h-5 shrink-0 opacity-40 group-hover:opacity-100 transition-opacity duration-300" style={{ color: service.color }} />
                      <h3 className="font-heading font-light text-2xl md:text-3xl lg:text-4xl text-white/80 group-hover:text-white transition-colors duration-300 uppercase">
                        {service.name}
                      </h3>
                    </div>
                    <p className="text-sm md:text-base flex-1 leading-relaxed" style={{ color: '#B8ADCC' }}>
                      {service.desc}
                    </p>
                    <ArrowRight className="w-5 h-5 shrink-0 opacity-0 -translate-x-4 transition-all duration-500 group-hover:opacity-60 group-hover:translate-x-0 hidden md:block" style={{ color: service.color }} />
                  </div>
                </div>
              )
            })}
            <div className="h-px w-full" style={{ backgroundColor: 'rgba(255,255,255,0.08)' }} />
          </div>
        </div>
      </section>

      {/* ═══════════════════ SOCIOS — full-bleed image grid ═══════════════════ */}
      <section id="socios" className="relative py-32 md:py-40 px-6 md:px-16 lg:px-24">
        <div className="w-full max-w-[1400px] mx-auto">
          <h2 className="font-heading font-light text-[clamp(2.5rem,6vw,5rem)] text-white leading-[0.95] uppercase mb-4">
            Colaboraciones
          </h2>
          <p className="text-sm mb-16" style={{ color: '#B8ADCC' }}>Creadores y marcas con los que he trabajado.</p>
          <div className="grid md:grid-cols-2 gap-6">
            {socios.map((item, i) => (
              <div key={i} className="border border-white/15 rounded-lg overflow-hidden bg-white/[0.04] hover:border-white/20 transition-colors">
                <div className="bg-black overflow-hidden">
                  <img src={item.img} alt={item.name} className="w-full h-auto object-contain" />
                </div>
                <div className="p-5">
                  <h3 className="font-heading font-medium text-lg text-white uppercase">{item.name}</h3>
                  <p className="text-sm mt-1" style={{ color: '#B8ADCC' }}>{item.desc}</p>
                  {item.stats && (
                    <p className="text-xs mt-2" style={{ color: '#A78BFA' }}>{item.stats}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════ PROJECTS — editorial grid ═══════════════════ */}
      <section id="portfolio" className="relative py-32 md:py-40 px-6 md:px-16 lg:px-24">
        <div className="w-full max-w-[1400px] mx-auto">
          <h2 className="font-heading font-light text-[clamp(2.5rem,6vw,5rem)] text-white leading-[0.95] uppercase mb-16">
            Proyectos
          </h2>

          {/* Featured — full width hero project */}
          <div className="group relative mb-6 overflow-hidden cursor-default">
            <div className="aspect-video md:aspect-[21/9] overflow-hidden">
              <img src={projects[0].img} alt={projects[0].name} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" loading="lazy" />
            </div>
            <div className="absolute inset-0 flex flex-col justify-end p-5 md:p-12" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.3) 50%, transparent 100%)' }}>
              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3 md:gap-4">
                <div>
                  <h3 className="font-heading font-light text-2xl md:text-5xl text-white uppercase">{projects[0].name}</h3>
                  <p className="text-xs md:text-sm mt-1 md:mt-2 max-w-md" style={{ color: '#C4B8D6' }}>{projects[0].desc}</p>
                </div>
                {projects[0].url && (
                  <a href={projects[0].url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-medium shrink-0 transition-all duration-300 hover:gap-3 py-2" style={{ color: '#FFC400' }}>
                    Ver proyecto <ArrowRight className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Rest — 2+1 alternating */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {projects.slice(1).map((project, i) => (
              <div key={i} className="group relative overflow-hidden cursor-default">
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={project.img} alt={project.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
                </div>
                <div className="absolute inset-0 flex flex-col justify-end p-5" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 40%, transparent 60%)' }}>
                  <div className="flex items-center gap-2">
                    <h3 className="font-heading font-medium text-lg md:text-xl text-white uppercase">{project.name}</h3>
                    {project.status && (
                      <span className="text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-full" style={{ color: '#FFC400', border: '1px solid rgba(255, 196, 0, 0.3)' }}>
                        {project.status}
                      </span>
                    )}
                  </div>
                  <p className="text-xs mt-1" style={{ color: '#B8ADCC' }}>{project.desc}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-[10px] uppercase tracking-wider" style={{ color: '#A78BFA' }}>{project.tech}</span>
                    {project.url && (
                      <a href={project.url} target="_blank" rel="noopener noreferrer" className="text-xs transition-all duration-300 hover:underline" style={{ color: '#FFC400' }}>
                        Ver →
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════ CONTACT — hero style ═══════════════════ */}
      <section id="contacto" className="relative min-h-screen flex flex-col justify-center px-6 md:px-16 lg:px-24 py-24">
        <div className="w-full max-w-[1400px] mx-auto">
          <p className="text-[10px] md:text-xs uppercase tracking-[0.4em] mb-12" style={{ color: '#A78BFA' }}>
            Contacto
          </p>
          <h2 className="leading-[0.9] tracking-[-0.03em]">
            <span className="font-heading font-light block text-[clamp(2.14rem,6.65vw,6.175rem)] uppercase mb-6" style={{ color: '#FFC400' }}>
              ¿Hablamos?
            </span>
            <span className="block text-[clamp(1rem,2.5vw,1.5rem)] font-heading font-light uppercase tracking-[0.2em] mb-12" style={{ color: '#A78BFA' }}>
              &mdash;&mdash;
            </span>
          </h2>
          <div className="flex flex-wrap items-center gap-6">
            <a
              href="https://wa.me/5493885246095"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium transition-all duration-300 hover:gap-4 border-b pb-1"
              style={{ color: '#FFC400', borderColor: 'rgba(255, 196, 0, 0.4)' }}
            >
              WhatsApp
              <ArrowRight className="w-4 h-4" />
            </a>
            {SHOW_OFFER_LANDING && (
              <a
                href="/oferta"
                className="inline-flex items-center gap-2 text-sm font-medium text-white/60 hover:text-white/90 transition-colors"
              >
                Ver oferta
                <ArrowRight className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>
      </section>

      {/* ═══════════════════ FOOTER ═══════════════════ */}
      <footer className="px-6 md:px-16 lg:px-24 pb-8">
        <div className="w-full max-w-[1400px] mx-auto">
          <div className="h-px w-full mb-8" style={{ backgroundColor: 'rgba(255,255,255,0.08)' }} />
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <span className="font-heading font-light text-lg uppercase tracking-wider" style={{ color: '#A78BFA' }}>Enzo Federico</span>
            <p className="text-[10px] uppercase tracking-[0.2em]" style={{ color: '#B8ADCC' }}>&copy; 2024</p>
            <a
              href="https://www.instagram.com/enzo.z4?igsh=Mm05MnA0enB2eXlk&utm_source=qr"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-xs uppercase tracking-[0.15em] transition-opacity duration-300 hover:opacity-100"
              style={{ color: '#A78BFA', opacity: 0.7 }}
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
