"use client"

import { useEffect, useRef } from "react"

export function useParallax<T extends HTMLElement = HTMLDivElement>(factor = 0.14) {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    const onScroll = () => {
      const rect = el.getBoundingClientRect()
      const y = (rect.top - window.innerHeight * 0.45) * factor
      el.style.transform = `translate3d(0, ${y}px, 0) scale(1.08)`
    }

    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [factor])

  return ref
}
