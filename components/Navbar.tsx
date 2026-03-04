"use client"

import { useState, useEffect } from "react"

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("inicio")
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)

      const sections = ["inicio", "sobre-mi", "servicios", "portfolio", "socios", "contacto"]
      const scrollPosition = window.scrollY + 100

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i])
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i])
          break
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId)
    if (section) {
      const offset = 80
      const elementPosition = section.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      })
    }
  }

  const SHOW_OFFER_BANNER = false

  const navItems = [
    { id: "inicio", label: "Inicio" },
    { id: "sobre-mi", label: "Sobre Mí" },
    { id: "servicios", label: "Servicios" },
    { id: "portfolio", label: "Portfolio" },
    { id: "socios", label: "Socios" },
    { id: "contacto", label: "Contacto" },
  ]

  return (
    <>
      {SHOW_OFFER_BANNER && (
        <div className="fixed top-0 left-0 right-0 z-[60] bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 text-white py-2 px-4">
          <div className="container mx-auto flex items-center justify-center">
            <a
              href="/oferta"
              className="text-sm md:text-base font-medium hover:opacity-90 transition-opacity flex items-center gap-2"
            >
              <span>✨</span>
              <span>Oferta activa: Landing pages a $100.000 hasta el 22 de febrero</span>
              <span className="font-bold">→ Ver más</span>
            </a>
          </div>
        </div>
      )}

      <nav
        className={`fixed left-0 right-0 z-50 transition-all duration-500 ease-out ${SHOW_OFFER_BANNER ? 'top-10' : 'top-0'} ${
          isScrolled
            ? "bg-[#0A0A0A]/90 backdrop-blur-md border-b border-white/5"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-5 flex items-center justify-between">
          <button
            onClick={() => scrollToSection("inicio")}
            className="group"
          >
            <span className="font-heading font-light text-xl uppercase tracking-wider transition-opacity duration-300 hover:opacity-80" style={{ color: '#A78BFA' }}>
              Enzo Federico
            </span>
          </button>

          <div className="hidden md:flex items-center gap-8">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`text-xs uppercase tracking-[0.15em] font-medium transition-colors duration-300 ${
                  activeSection === item.id
                    ? "text-[#FFC400]"
                    : "text-white/40 hover:text-white/80"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <button className="md:hidden text-white/60 hover:text-white transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </nav>
    </>
  )
}
