"use client"

import { useCallback, useEffect, useLayoutEffect, useRef, useState, type PointerEvent } from "react"
import Link from "next/link"
import type { Project } from "@/lib/projects"

const WHEEL_SCALE = 175
const FRICTION = 0.965
const IDLE_MS = 48
const SETTLE_MS = 460
const COAST_CUTOFF = 0.0014
const SNAP_BIAS = 0.36

function wrapSlot(delta: number, total: number) {
  const half = total / 2
  let d = delta
  while (d > half) d -= total
  while (d <= -half) d += total
  return d
}

function easeOutCubic(t: number) {
  const x = Math.min(1, Math.max(0, t))
  return 1 - (1 - x) ** 3
}

function wheelPixels(event: WheelEvent) {
  let x = event.deltaX
  let y = event.deltaY
  if (event.deltaMode === 1) {
    x *= 16
    y *= 16
  } else if (event.deltaMode === 2) {
    x *= 640
    y *= 640
  }
  if (event.shiftKey) return x || y
  if (Math.abs(x) >= Math.abs(y) * 0.38) return x
  return y
}

type Settle = { from: number; to: number; start: number }

export default function ProjectDeck({ projects }: { projects: Project[] }) {
  const total = projects.length
  const [front, setFront] = useState(0)
  const stageRef = useRef<HTMLDivElement>(null)
  const deckRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<(HTMLElement | null)[]>([])
  const offsetRef = useRef(0)
  const velocityRef = useRef(0)
  const inputRef = useRef(false)
  const settleRef = useRef<Settle | null>(null)
  const gestureDirRef = useRef(0)
  const lastWheelRef = useRef(0)
  const frontRef = useRef(0)
  const rafRef = useRef<number | null>(null)
  const startX = useRef(0)
  const startOffset = useRef(0)
  const moved = useRef(false)
  const totalRef = useRef(total)
  totalRef.current = total

  const paint = useCallback((offset: number) => {
    const count = totalRef.current
    if (!count) return
    const nextFront = ((Math.round(offset) % count) + count) % count
    cardRefs.current.forEach((el, i) => {
      if (!el) return
      const slot = wrapSlot(i - offset, count)
      const abs = Math.abs(slot)
      const x = slot * 176
      const y = abs * 12
      const z = -abs * 210
      el.style.opacity = abs > 2.4 ? "0" : String(Math.max(0.35, 1 - abs * 0.2))
      el.style.zIndex = String(Math.round(80 - abs * 10))
      el.style.visibility = abs > 3.2 ? "hidden" : "visible"
      const visual = el.querySelector<HTMLElement>(".project-photo")
      if (visual) {
        visual.style.transform = `translate3d(${x}px, ${y}px, ${z}px) rotateY(${slot * -15}deg) scale(${Math.max(0.7, 1 - abs * 0.13)})`
      }
    })
    if (frontRef.current !== nextFront) {
      frontRef.current = nextFront
      setFront(nextFront)
    }
  }, [])

  const tick = useCallback(() => {
    const now = performance.now()
    const wheelRecent = now - lastWheelRef.current < IDLE_MS

    if (inputRef.current) {
      // Pointer drag writes offset directly.
    } else if (settleRef.current && !wheelRecent) {
      const settle = settleRef.current
      const t = (now - settle.start) / SETTLE_MS
      offsetRef.current = settle.from + (settle.to - settle.from) * easeOutCubic(t)
      velocityRef.current = 0
      if (t >= 1) {
        offsetRef.current = settle.to
        settleRef.current = null
      }
    } else if (wheelRecent) {
      velocityRef.current *= 0.988
    } else {
      offsetRef.current += velocityRef.current
      velocityRef.current *= FRICTION
      if (Math.abs(velocityRef.current) < COAST_CUTOFF) {
        velocityRef.current = 0
        const to = Math.round(offsetRef.current + gestureDirRef.current * SNAP_BIAS)
        gestureDirRef.current = 0
        if (Math.abs(to - offsetRef.current) < 0.0012) {
          offsetRef.current = to
          settleRef.current = null
        } else {
          settleRef.current = { from: offsetRef.current, to, start: now }
        }
      }
    }

    paint(offsetRef.current)

    const unsettled = Math.abs(offsetRef.current - Math.round(offsetRef.current)) > 0.0012
    const moving =
      inputRef.current ||
      wheelRecent ||
      settleRef.current != null ||
      Math.abs(velocityRef.current) > 0.0008 ||
      unsettled
    rafRef.current = moving ? window.requestAnimationFrame(tick) : null
    if (!moving) {
      const count = totalRef.current
      const snapped = ((Math.round(offsetRef.current) % count) + count) % count
      offsetRef.current = snapped
      paint(snapped)
    }
  }, [paint])

  const kick = useCallback(() => {
    if (rafRef.current == null) rafRef.current = window.requestAnimationFrame(tick)
  }, [tick])

  const go = useCallback(
    (dir: number) => {
      if (!dir) return
      inputRef.current = false
      lastWheelRef.current = 0
      const from = offsetRef.current
      const to = Math.round(from) + dir
      settleRef.current = { from, to, start: performance.now() }
      velocityRef.current = 0
      kick()
    },
    [kick]
  )

  const paintRef = useRef(paint)
  const kickRef = useRef(kick)
  const goRef = useRef(go)
  paintRef.current = paint
  kickRef.current = kick
  goRef.current = go

  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    if (!(e.target as HTMLElement).closest("[data-project-swipe]")) return
    if ((e.target as HTMLElement).closest("a")) return
    if (e.button !== 0 && e.pointerType === "mouse") return
    try {
      e.currentTarget.setPointerCapture(e.pointerId)
    } catch {
      /* Safari */
    }
    inputRef.current = true
    settleRef.current = null
    lastWheelRef.current = 0
    startX.current = e.clientX
    startOffset.current = offsetRef.current
    velocityRef.current = 0
    moved.current = false
    kickRef.current()
  }

  useLayoutEffect(() => {
    paintRef.current(offsetRef.current)
  }, [front, paint, total])

  useEffect(() => {
    const onMove = (event: globalThis.PointerEvent) => {
      if (!inputRef.current) return
      if (event.buttons === 0 && event.pointerType !== "touch") return
      const width = stageRef.current?.querySelector<HTMLElement>("[data-project-card]")?.offsetWidth ?? 560
      const next = startOffset.current + (startX.current - event.clientX) / Math.max(160, width * 0.52)
      velocityRef.current = next - offsetRef.current
      if (Math.abs(velocityRef.current) > 0.0008) gestureDirRef.current = Math.sign(velocityRef.current)
      offsetRef.current = next
      if (Math.abs(startX.current - event.clientX) > 7) moved.current = true
      paintRef.current(offsetRef.current)
      kickRef.current()
    }

    const onUp = (event: globalThis.PointerEvent) => {
      if (!inputRef.current) return
      const hitLink = (event.target as HTMLElement | null)?.closest("a")
      if (hitLink) {
        inputRef.current = false
        moved.current = false
        return
      }
      if (!moved.current) {
        inputRef.current = false
        lastWheelRef.current = 0
        const from = offsetRef.current
        settleRef.current = { from, to: Math.round(from) + 1, start: performance.now() }
        velocityRef.current = 0
        kickRef.current()
        return
      }
      inputRef.current = false
      kickRef.current()
    }

    window.addEventListener("pointermove", onMove)
    window.addEventListener("pointerup", onUp)
    window.addEventListener("pointercancel", onUp)
    return () => {
      window.removeEventListener("pointermove", onMove)
      window.removeEventListener("pointerup", onUp)
      window.removeEventListener("pointercancel", onUp)
      if (rafRef.current != null) window.cancelAnimationFrame(rafRef.current)
    }
  }, [kick, paint])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") goRef.current(1)
      if (e.key === "ArrowLeft") goRef.current(-1)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [go])

  useEffect(() => {
    const deck = deckRef.current
    if (!deck) return

    const onWheel = (event: WheelEvent) => {
      if (event.ctrlKey) return
      const hit = (event.target as HTMLElement | null)?.closest(".project-deck-card.is-front")
      if (!hit) return
      const pixels = wheelPixels(event)
      if (Math.abs(pixels) < 0.6) return
      event.preventDefault()

      inputRef.current = false
      settleRef.current = null
      lastWheelRef.current = performance.now()
      const impulse = pixels / WHEEL_SCALE
      offsetRef.current += impulse
      velocityRef.current = velocityRef.current * 0.38 + impulse * 0.78
      if (Math.abs(impulse) > 0.0005) gestureDirRef.current = Math.sign(impulse)
      paintRef.current(offsetRef.current)
      kickRef.current()
    }

    deck.addEventListener("wheel", onWheel, { passive: false })
    return () => deck.removeEventListener("wheel", onWheel)
  }, [kick, paint])

  return (
    <div ref={deckRef} className="project-deck">
      <div ref={stageRef} className="project-deck-stage" onPointerDown={onPointerDown}>
        {projects.map((project, i) => {
          const isFront = i === front
          return (
            <article
              key={project.slug}
              ref={(node) => {
                cardRefs.current[i] = node
              }}
              data-project-card
              className={`project-deck-card is-live${isFront ? " is-front" : ""}`}
            >
              <div className="project-photo" {...(isFront ? { "data-project-swipe": true } : {})}>
                <img src={project.img} alt={project.name} draggable={false} />
              </div>
              {isFront ? (
                <div className="project-deck-meta">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-heading text-lg md:text-2xl text-bone uppercase leading-none">{project.name}</h3>
                    {project.status ? <span className="project-status">{project.status}</span> : null}
                  </div>
                  <p className="text-[10px] uppercase tracking-[0.16em] mt-2 text-cyan">{project.tech}</p>
                  <div
                    className="flex items-center gap-4 mt-3"
                    onPointerDown={(event) => {
                      event.stopPropagation()
                      moved.current = false
                      inputRef.current = false
                    }}
                  >
                    {project.relato.length > 0 && (
                      <Link
                        href={`/relatos/${project.slug}`}
                        className="project-deck-link"
                      >
                        Leer más
                      </Link>
                    )}
                    {project.url ? (
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-deck-link project-deck-link-out"
                      >
                        Ver →
                      </a>
                    ) : null}
                  </div>
                </div>
              ) : null}
            </article>
          )
        })}
      </div>
    </div>
  )
}
