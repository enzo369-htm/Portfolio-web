"use client"

import { useCallback, useEffect, useRef } from "react"

const STEPS = [
  "Me escribís por WhatsApp",
  "Me contás tu negocio y tus servicios",
  "Armo el diseño a medida",
  "Te muestro el avance",
  "Ajustamos detalles",
  "Publicamos tu Web",
  "Empezás a recibir consultas",
]

const SPREAD = 0.1

function conePoints(ox: number, oy: number, angle: number, length: number) {
  const a1 = angle - SPREAD
  const a2 = angle + SPREAD
  const x1 = ox + Math.cos(a1) * length
  const y1 = oy + Math.sin(a1) * length
  const x2 = ox + Math.cos(a2) * length
  const y2 = oy + Math.sin(a2) * length
  return `${ox},${oy} ${x1},${y1} ${x2},${y2}`
}

export default function ProcessSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const originRef = useRef<HTMLSpanElement>(null)
  const veilPolyRef = useRef<SVGPolygonElement>(null)
  const glowPolyRef = useRef<SVGPolygonElement>(null)
  const glowCoreRef = useRef<SVGCircleElement>(null)
  const glowFillRef = useRef<SVGRadialGradientElement>(null)
  const reducedRef = useRef(false)

  const aim = useCallback((clientX: number, clientY: number) => {
    const section = sectionRef.current
    const origin = originRef.current
    const veil = veilPolyRef.current
    const glow = glowPolyRef.current
    const core = glowCoreRef.current
    const fill = glowFillRef.current
    if (!section || !origin || !veil || !glow || !core || !fill) return

    const bounds = section.getBoundingClientRect()
    const originBox = origin.getBoundingClientRect()
    const ox = originBox.left + originBox.width / 2 - bounds.left
    const oy = originBox.top + originBox.height / 2 - bounds.top
    const px = clientX - bounds.left
    const py = clientY - bounds.top
    const angle = Math.atan2(py - oy, px - ox)
    const length = Math.hypot(bounds.width, bounds.height) * 1.15
    const points = conePoints(ox, oy, angle, length)

    veil.setAttribute("points", points)
    glow.setAttribute("points", points)
    core.setAttribute("cx", String(ox))
    core.setAttribute("cy", String(oy))
    fill.setAttribute("cx", String(ox))
    fill.setAttribute("cy", String(oy))
    fill.setAttribute("r", String(length * 0.72))
  }, [])

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    reducedRef.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reducedRef.current) {
      section.classList.add("is-static")
    }

    const paintDefault = () => {
      const bounds = section.getBoundingClientRect()
      aim(bounds.left + bounds.width * 0.28, bounds.top + bounds.height * 0.42)
    }

    const onPointer = (event: PointerEvent) => {
      aim(event.clientX, event.clientY)
    }

    paintDefault()
    const frame = requestAnimationFrame(paintDefault)
    section.addEventListener("pointermove", onPointer)
    window.addEventListener("resize", paintDefault)

    return () => {
      cancelAnimationFrame(frame)
      section.removeEventListener("pointermove", onPointer)
      window.removeEventListener("resize", paintDefault)
    }
  }, [aim])

  return (
    <section
      id="proceso"
      ref={sectionRef}
      className="page-section process-stage relative min-h-[100svh] overflow-hidden pt-24 pb-16 md:py-0"
    >
      <p className="process-kicker px-5 md:px-10 lg:px-14 text-[10px] md:text-[11px] uppercase tracking-[0.38em] text-cyan">
        Proceso
      </p>

      <div className="process-title-wrap w-full max-w-[1400px] mx-auto px-5 md:px-10 lg:px-14 pt-6 md:pt-10">
        <h2 className="font-heading font-normal uppercase leading-[0.86] tracking-[0.04em] text-[clamp(2.6rem,9vw,7.2rem)] text-bone">
          Proceso
        </h2>
        <p className="mt-4 max-w-[22rem] text-[11px] uppercase tracking-[0.22em] text-mute">
          Mové el haz para leer cada paso
        </p>
      </div>

      <ol className="process-steps relative z-[2]">
        {STEPS.map((step, index) => (
          <li key={step} className={`process-step process-step-${index + 1}`}>
            <span className="process-step-num">{String(index + 1).padStart(2, "0")}</span>
            <span className="process-step-copy">{step}</span>
          </li>
        ))}
      </ol>

      <span ref={originRef} className="process-origin" aria-hidden />

      <svg className="process-light" aria-hidden>
        <defs>
          <filter id="process-cone-blur" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="9" />
          </filter>
          <radialGradient ref={glowFillRef} id="process-glow" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#FFD56A" stopOpacity="0.42" />
            <stop offset="0.28" stopColor="#C9A8FF" stopOpacity="0.16" />
            <stop offset="1" stopColor="#FFD56A" stopOpacity="0" />
          </radialGradient>
          <mask id="process-hole">
            <rect width="100%" height="100%" fill="white" />
            <polygon ref={veilPolyRef} points="0,0 0,0 0,0" fill="black" filter="url(#process-cone-blur)" />
            <circle ref={glowCoreRef} cx="0" cy="0" r="4" fill="black" filter="url(#process-cone-blur)" />
          </mask>
        </defs>
        <polygon
          ref={glowPolyRef}
          className="process-beam"
          points="0,0 0,0 0,0"
          fill="url(#process-glow)"
          filter="url(#process-cone-blur)"
        />
        <rect className="process-veil" width="100%" height="100%" mask="url(#process-hole)" />
      </svg>
    </section>
  )
}
