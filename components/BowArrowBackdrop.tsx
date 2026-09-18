"use client"

import { useEffect, useRef } from "react"

const DRAW_END = 0.96
const RESET_AT = 0.86

export default function BowArrowBackdrop() {
  const stageRef = useRef<HTMLDivElement>(null)
  const stringRef = useRef<SVGPathElement>(null)
  const arrowRef = useRef<SVGGElement>(null)
  const draw = useRef(0)
  const fly = useRef(0)
  const launched = useRef(false)
  const reduce = useRef(false)

  useEffect(() => {
    reduce.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    const paint = () => {
      const string = stringRef.current
      const arrow = arrowRef.current
      if (!string || !arrow) return

      const pull = 118 + draw.current * 46
      string.setAttribute("d", `M 58 108 Q 100 ${pull} 142 108`)

      if (launched.current) {
        const t = fly.current
        const ease = 1 - Math.pow(1 - t, 3)
        const y = (pull - 118) * (1 - ease) - 220 * ease
        arrow.setAttribute("transform", `translate(0 ${y})`)
        arrow.style.opacity = String(Math.max(0, 1 - ease * 0.15))
        return
      }

      arrow.setAttribute("transform", `translate(0 ${pull - 118})`)
      arrow.style.opacity = "1"
    }

    const readScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      const t = max <= 0 ? 0 : Math.min(1, window.scrollY / max)
      draw.current = Math.min(1, t / DRAW_END)

      if (reduce.current) {
        launched.current = false
        fly.current = 0
        paint()
        return
      }

      if (t >= DRAW_END && !launched.current) {
        launched.current = true
        fly.current = 0
      }
      if (t < RESET_AT && launched.current && fly.current >= 1) {
        launched.current = false
        fly.current = 0
      }
      if (t < RESET_AT && !launched.current) {
        fly.current = 0
      }
      paint()
    }

    let raf = 0
    const tick = () => {
      if (launched.current && fly.current < 1 && !reduce.current) {
        fly.current = Math.min(1, fly.current + 0.018)
        paint()
      }
      raf = requestAnimationFrame(tick)
    }

    readScroll()
    window.addEventListener("scroll", readScroll, { passive: true })
    window.addEventListener("resize", readScroll)
    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("scroll", readScroll)
      window.removeEventListener("resize", readScroll)
    }
  }, [])

  return (
    <div ref={stageRef} className="bow-stage" aria-hidden>
      <svg className="bow-svg" viewBox="0 0 200 240" preserveAspectRatio="xMidYMax meet">
        <defs>
          <filter id="arrow-glow" x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur stdDeviation="2.4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <linearGradient id="bow-limb" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#e6e0d4" stopOpacity="0.22" />
            <stop offset="0.5" stopColor="#c9a8ff" stopOpacity="0.38" />
            <stop offset="1" stopColor="#e6e0d4" stopOpacity="0.22" />
          </linearGradient>
          <linearGradient id="arrow-shaft" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0" stopColor="#ffd56a" stopOpacity="0.35" />
            <stop offset="0.45" stopColor="#e6e0d4" stopOpacity="0.7" />
            <stop offset="1" stopColor="#ffd56a" stopOpacity="0.85" />
          </linearGradient>
        </defs>

        <path
          className="bow-limb"
          d="M 52 42 C 28 78 34 128 68 148 C 88 158 112 158 132 148 C 166 128 172 78 148 42"
          fill="none"
          stroke="url(#bow-limb)"
          strokeWidth="3.1"
          strokeLinecap="round"
        />
        <path
          className="bow-limb-inner"
          d="M 60 52 C 40 84 44 124 72 140 C 90 148 110 148 128 140 C 156 124 160 84 140 52"
          fill="none"
          stroke="#e6e0d4"
          strokeOpacity="0.16"
          strokeWidth="1"
        />
        <rect x="96.2" y="138" width="7.6" height="18" rx="1.2" fill="#e6e0d4" fillOpacity="0.28" />

        <path
          ref={stringRef}
          className="bow-string"
          d="M 58 108 Q 100 118 142 108"
          fill="none"
          stroke="#e6e0d4"
          strokeOpacity="0.55"
          strokeWidth="0.95"
        />

        <g ref={arrowRef} className="bow-arrow">
          <line x1="100" y1="118" x2="100" y2="36" stroke="url(#arrow-shaft)" strokeWidth="1.55" />
          <path d="M 100 24 L 95.2 40 L 100 36.6 L 104.8 40 Z" fill="#ffd56a" fillOpacity="0.92" filter="url(#arrow-glow)" />
          <path d="M 96.4 108 L 100 100 L 100 112 Z" fill="#c9a8ff" fillOpacity="0.45" />
          <path d="M 103.6 108 L 100 100 L 100 112 Z" fill="#c9a8ff" fillOpacity="0.45" />
          <circle className="bow-ember" cx="100" cy="30" r="3.2" fill="#ffd56a" />
        </g>
      </svg>
    </div>
  )
}
