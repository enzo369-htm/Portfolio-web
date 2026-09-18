"use client"

import { forwardRef, useEffect, useImperativeHandle, useRef } from "react"

export type LanternHandle = {
  aim: (x: number, y: number) => void
  paint: (x: number, y: number, on: boolean, fallback: boolean) => void
}

function radiusFor(on: boolean, fallback: boolean) {
  if (typeof window === "undefined") return on ? 250 : 20
  if (fallback) return Math.max(window.innerWidth, window.innerHeight) * 0.42
  return on ? 250 : 20
}

function darknessFor(fallback: boolean) {
  return fallback ? 0.36 : 0.94
}

export function paintLantern(
  el: HTMLDivElement,
  x: number,
  y: number,
  on: boolean,
  fallback: boolean
) {
  const radius = radiusFor(on, fallback)
  const fade = Math.max(radius * 0.28, 16)
  const inner = radius * 0.52
  const mid = radius * 0.8
  const gradient = `radial-gradient(circle at ${x}px ${y}px, transparent 0px, transparent ${inner}px, rgba(0,0,0,0.55) ${mid}px, #000 ${radius + fade}px)`
  el.style.webkitMaskImage = gradient
  el.style.maskImage = gradient
  el.style.backgroundColor = `rgba(4, 4, 4, ${darknessFor(fallback)})`
}

const LanternOverlay = forwardRef<LanternHandle, { on: boolean; fallback: boolean }>(
  function LanternOverlay({ on, fallback }, ref) {
    const nodeRef = useRef<HTMLDivElement>(null)
    const posRef = useRef({ x: 0, y: 0 })
    const stateRef = useRef({ on, fallback })
    stateRef.current = { on, fallback }

    useImperativeHandle(ref, () => ({
      aim(x: number, y: number) {
        posRef.current = { x, y }
        const el = nodeRef.current
        if (!el) return
        paintLantern(el, x, y, stateRef.current.on, stateRef.current.fallback)
      },
      paint(x: number, y: number, nextOn: boolean, nextFallback: boolean) {
        posRef.current = { x, y }
        const el = nodeRef.current
        if (!el) return
        paintLantern(el, x, y, nextOn, nextFallback)
      },
    }))

    useEffect(() => {
      const el = nodeRef.current
      if (!el) return
      if (posRef.current.x === 0 && posRef.current.y === 0) {
        posRef.current = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
      }
      const apply = () => {
        paintLantern(el, posRef.current.x, posRef.current.y, stateRef.current.on, stateRef.current.fallback)
      }
      apply()
      window.addEventListener("resize", apply)
      return () => window.removeEventListener("resize", apply)
    }, [on, fallback])

    return <div ref={nodeRef} className="lantern-veil" aria-hidden />
  }
)

export default LanternOverlay
