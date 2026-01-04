"use client"

import { useState, useEffect } from "react"

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("inicio")
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)

      // Detectar sección activa
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
      const offset = 80 // Altura del navbar
      const elementPosition = section.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      })
    }
  }

  return (
    <>
      {/* Banner de oferta */}
      <div className="fixed top-0 left-0 right-0 z-[60] bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 text-white py-2 px-4">
        <div className="container mx-auto flex items-center justify-center">
          <a 
            href="/oferta"
            className="text-sm md:text-base font-medium hover:opacity-90 transition-opacity flex items-center gap-2"
          >
            <span>✨</span>
            <span>Oferta activa: Landing pages a $100.000 hasta el jueves 8 de enero</span>
            <span className="font-bold">→ Ver más</span>
          </a>
        </div>
      </div>

      <nav 
        className={`fixed top-10 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? "bg-[hsl(0,0%,4%)]/95 backdrop-blur-md border-b border-white/10 shadow-lg" 
            : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <button 
          onClick={() => scrollToSection("inicio")}
          className="flex items-center gap-2 group"
        >
          <span 
            className="text-xl font-semibold group-hover:opacity-80 transition-opacity relative inline-block"
            style={{
              backgroundImage: 'linear-gradient(to right, #7C3AED, #FFC400, #F97316, #8B5CF6, #FFC400)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: '0 0 20px rgba(124, 58, 237, 0.4), 0 0 40px rgba(255, 196, 0, 0.2)',
              filter: 'drop-shadow(0 0 8px rgba(124, 58, 237, 0.3))',
              animation: 'gradient-shift 3s ease infinite'
            }}
          >
            Enzo Federico Bruno
          </span>
        </button>

        {/* Navigation */}
        <div className="hidden md:flex items-center gap-6">
          <button
            onClick={() => scrollToSection("inicio")}
            className={`text-sm font-medium transition-colors ${
              activeSection === "inicio"
                ? "text-white"
                : "text-white/70 hover:text-white"
            }`}
          >
            Inicio
          </button>
          <button
            onClick={() => scrollToSection("sobre-mi")}
            className={`text-sm font-medium transition-colors ${
              activeSection === "sobre-mi"
                ? "text-white"
                : "text-white/70 hover:text-white"
            }`}
          >
            Sobre Mí
          </button>
          <button
            onClick={() => scrollToSection("servicios")}
            className={`text-sm font-medium transition-colors ${
              activeSection === "servicios"
                ? "text-white"
                : "text-white/70 hover:text-white"
            }`}
          >
            Servicios
          </button>
          <button
            onClick={() => scrollToSection("portfolio")}
            className={`text-sm font-medium transition-colors ${
              activeSection === "portfolio"
                ? "text-white"
                : "text-white/70 hover:text-white"
            }`}
          >
            Portfolio
          </button>
          <button
            onClick={() => scrollToSection("socios")}
            className={`text-sm font-medium transition-colors ${
              activeSection === "socios"
                ? "text-white"
                : "text-white/70 hover:text-white"
            }`}
          >
            Socios
          </button>
          <button
            onClick={() => scrollToSection("contacto")}
            className={`text-sm font-medium transition-colors ${
              activeSection === "contacto"
                ? "text-white"
                : "text-white/70 hover:text-white"
            }`}
          >
            Contacto
          </button>
        </div>

        {/* Mobile menu button */}
        <button className="md:hidden text-white/80 hover:text-white transition-colors">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        </div>
      </nav>
    </>
  )
}
