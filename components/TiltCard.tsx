"use client"

import { useRef, type MouseEvent, type ReactNode } from "react"

type TiltCardProps = {
  children: ReactNode
  className?: string
}

export default function TiltCard({ children, className = "" }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null)

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const rect = el.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width
    const y = (e.clientY - rect.top) / rect.height
    const rotY = (x - 0.5) * 14
    const rotX = (0.5 - y) * 10
    el.style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg) translateZ(12px)`
  }

  const onLeave = () => {
    const el = ref.current
    if (!el) return
    el.style.transform = "rotateX(0deg) rotateY(0deg) translateZ(0)"
  }

  return (
    <div className="tilt-stage">
      <div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        className={`tilt-card ${className}`}
      >
        {children}
      </div>
    </div>
  )
}
