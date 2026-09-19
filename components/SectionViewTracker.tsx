"use client"

import { useEffect } from "react"
import { trackMetaCustom } from "@/lib/meta-pixel"

const HOME_SECTIONS = [
  { id: "portfolio", name: "Proyectos" },
  { id: "colaboraciones", name: "Colaboraciones" },
  { id: "contacto", name: "Contacto" },
] as const

export default function SectionViewTracker() {
  useEffect(() => {
    const seen = new Set<string>()
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          const name = entry.target.getAttribute("data-section-view")
          if (!name || seen.has(name)) continue
          seen.add(name)
          trackMetaCustom("ViewSection", { content_name: name })
        }
      },
      { threshold: 0.35 }
    )

    const observed: Element[] = []
    for (const section of HOME_SECTIONS) {
      const el = document.getElementById(section.id)
      if (!el) continue
      el.setAttribute("data-section-view", section.name)
      observer.observe(el)
      observed.push(el)
    }

    return () => {
      observer.disconnect()
      for (const el of observed) el.removeAttribute("data-section-view")
    }
  }, [])

  return null
}
