"use client"

import { useState, useEffect } from "react"

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("inicio")
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)

      // Mismo orden que en el DOM (arriba → abajo) para marcar bien la sección actual
      const sections = ["inicio", "sobre-mi", "servicios", "socios", "portfolio", "contacto"]
      const scrollPosition = window.scrollY + 100

      let current = "inicio"
      for (const id of sections) {
        const section = document.getElementById(id)
        if (section && section.offsetTop <= scrollPosition) {
          current = id
        }
      }
      setActiveSection(current)
    }

    handleScroll()
    window.addEventListener("scroll", handleScroll)
    window.addEventListener("resize", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("resize", handleScroll)
    }
  }, [])

  const scrollToSection = (sectionId: string) => {
    setIsMenuOpen(false)
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
    { id: "socios", label: "Colaboraciones" },
    { id: "portfolio", label: "Proyectos" },
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
          isScrolled || isMenuOpen
            ? "bg-[#0A0A0A]/95 backdrop-blur-md border-b border-white/5"
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

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-white/60 hover:text-white transition-colors"
            aria-label="Menú"
          >
            {isMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile menu */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 ease-out ${isMenuOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="px-6 py-4 pb-6 bg-[#0A0A0A] border-t border-white/5 flex flex-col gap-4">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`text-left text-sm uppercase tracking-[0.15em] font-medium py-2 transition-colors duration-300 ${
                  activeSection === item.id
                    ? "text-[#FFC400]"
                    : "text-white/60 hover:text-white"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </nav>
    </>
  )
}
