"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

type NavEntry =
  | { kind: "section"; id: string; label: string }
  | { kind: "route"; href: string; label: string; matchPrefix?: boolean }

const navEntries: NavEntry[] = [
  { kind: "section", id: "inicio", label: "Inicio" },
  { kind: "section", id: "sobre-mi", label: "Sobre Mí" },
  { kind: "section", id: "servicios", label: "Servicios" },
  { kind: "section", id: "socios", label: "Colaboraciones" },
  { kind: "section", id: "portfolio", label: "Proyectos" },
  { kind: "route", href: "/relatos", label: "Relatos", matchPrefix: true },
  { kind: "section", id: "contacto", label: "Contacto" },
]

export default function Navbar() {
  const pathname = usePathname()
  const isHome = pathname === "/"
  const [activeSection, setActiveSection] = useState("inicio")
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)

      if (!isHome) return

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
  }, [isHome])

  const SHOW_OFFER_BANNER = false

  const linkClassDesktop = (active: boolean) =>
    `text-xs uppercase tracking-[0.15em] font-medium transition-colors duration-300 ${
      active ? "text-[#FFC400]" : "text-white/40 hover:text-white/80"
    }`

  const linkClassMobile = (active: boolean) =>
    `text-left text-sm uppercase tracking-[0.15em] font-medium py-2 transition-colors duration-300 ${
      active ? "text-[#FFC400]" : "text-white/60 hover:text-white"
    }`

  const isRelatosActive = pathname === "/relatos" || pathname.startsWith("/relatos/")

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
        className={`fixed left-0 right-0 z-50 transition-all duration-500 ease-out ${SHOW_OFFER_BANNER ? "top-10" : "top-0"} ${
          isScrolled || isMenuOpen
            ? "bg-[#0A0A0A]/95 backdrop-blur-md border-b border-white/5"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-5 flex items-center justify-between">
          <Link href="/" className="group" onClick={() => setIsMenuOpen(false)}>
            <span
              className="font-heading font-light text-xl uppercase tracking-wider transition-opacity duration-300 hover:opacity-80"
              style={{ color: "#A78BFA" }}
            >
              Enzo Federico
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navEntries.map((entry) => {
              if (entry.kind === "section") {
                const active = isHome && activeSection === entry.id
                return (
                  <Link key={entry.id} href={`/#${entry.id}`} className={linkClassDesktop(active)}>
                    {entry.label}
                  </Link>
                )
              }
              const active = entry.matchPrefix ? isRelatosActive : pathname === entry.href
              return (
                <Link key={entry.href} href={entry.href} className={linkClassDesktop(active)}>
                  {entry.label}
                </Link>
              )
            })}
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

        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-out ${
            isMenuOpen ? "max-h-[28rem] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="px-6 py-4 pb-6 bg-[#0A0A0A] border-t border-white/5 flex flex-col gap-1">
            {navEntries.map((entry) => {
              if (entry.kind === "section") {
                const active = isHome && activeSection === entry.id
                return (
                  <Link
                    key={entry.id}
                    href={`/#${entry.id}`}
                    className={linkClassMobile(active)}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {entry.label}
                  </Link>
                )
              }
              const active = entry.matchPrefix ? isRelatosActive : pathname === entry.href
              return (
                <Link
                  key={entry.href}
                  href={entry.href}
                  className={linkClassMobile(active)}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {entry.label}
                </Link>
              )
            })}
          </div>
        </div>
      </nav>
    </>
  )
}
