"use client"

import { useCallback, useEffect, useRef, useState, type PointerEvent } from "react"
import Link from "next/link"
import type { Project } from "@/lib/projects"

function wrapSlot(delta: number, total: number) {
  const half = total / 2
  let d = delta
  while (d > half) d -= total
  while (d <= -half) d += total
  return d
}

function wheelDelta(event: WheelEvent) {
  let x = event.deltaX
  let y = event.deltaY
  if (event.deltaMode === 1) {
    x *= 16
    y *= 16
  } else if (event.deltaMode === 2) {
    x *= 640
    y *= 640
  }
  return { x, y }
}

export default function ProjectDeck({ projects }: { projects: Project[] }) {
  const total = projects.length
  const [index, setIndex] = useState(0)
  const [drag, setDrag] = useState(0)
  const [live, setLive] = useState(false)
  const stageRef = useRef<HTMLDivElement>(null)
  const startX = useRef(0)
  const dragRef = useRef(0)
  const indexRef = useRef(0)
  const moved = useRef(false)
  const liveRef = useRef(false)
  const rafRef = useRef<number | null>(null)
  const velocityRef = useRef(0)
  const lastMoveAt = useRef(0)
  const lastDragAt = useRef(0)
  const snapped = useRef(false)
  const wheelIgnoreUntil = useRef(0)

  const setLiveMode = (value: boolean) => {
    liveRef.current = value
    setLive(value)
  }

  const paint = useCallback(() => {
    rafRef.current = null
    const nextDrag = Math.max(-0.95, Math.min(0.95, dragRef.current))
    dragRef.current = nextDrag
    setDrag(nextDrag)
  }, [])

  const schedulePaint = useCallback(() => {
    if (rafRef.current != null) return
    rafRef.current = window.requestAnimationFrame(paint)
  }, [paint])

  const go = useCallback(
    (dir: number) => {
      if (!dir) return
      setLiveMode(false)
      const nextIndex = (indexRef.current + dir + total) % total
      indexRef.current = nextIndex
      dragRef.current = 0
      velocityRef.current = 0
      setIndex(nextIndex)
      setDrag(0)
      wheelIgnoreUntil.current = performance.now() + 240
    },
    [total]
  )

  const snapFromDrag = useCallback(() => {
    if (snapped.current) return
    snapped.current = true
    const d = dragRef.current
    const flick = Math.abs(velocityRef.current) > 0.18
    if (d > 0.05 || (flick && d > 0.02)) go(1)
    else if (d < -0.05 || (flick && d < -0.02)) go(-1)
    else if (!moved.current) {
      const card = stageRef.current?.querySelector<HTMLElement>("[data-project-swipe]")
      const rect = card?.getBoundingClientRect()
      const rel = rect ? (startX.current - rect.left) / rect.width : 0.5
      if (rel <= 0.32) go(-1)
      else if (rel >= 0.68) go(1)
      else {
        setLiveMode(false)
        dragRef.current = 0
        velocityRef.current = 0
        setDrag(0)
      }
    } else {
      setLiveMode(false)
      dragRef.current = 0
      velocityRef.current = 0
      setDrag(0)
    }
  }, [go])

  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest("a")) return
    if (e.button !== 0 && e.pointerType === "mouse") return
    try {
      e.currentTarget.setPointerCapture(e.pointerId)
    } catch {
      /* Safari */
    }
    if (e.pointerType !== "mouse") e.preventDefault()
    startX.current = e.clientX
    lastDragAt.current = 0
    lastMoveAt.current = performance.now()
    velocityRef.current = 0
    moved.current = false
    snapped.current = false
    dragRef.current = 0
    setDrag(0)
    setLiveMode(true)
  }

  useEffect(() => {
    const onMove = (event: globalThis.PointerEvent) => {
      if (!liveRef.current) return
      if (event.buttons === 0 && event.pointerType !== "touch") return
      event.preventDefault()
      const width = stageRef.current?.querySelector<HTMLElement>("[data-project-card]")?.offsetWidth ?? 560
      const next = Math.max(-0.95, Math.min(0.95, (startX.current - event.clientX) / Math.max(90, width * 0.28)))
      const now = performance.now()
      const dt = Math.max(8, now - lastMoveAt.current)
      velocityRef.current = (next - lastDragAt.current) / (dt / 16)
      lastDragAt.current = next
      lastMoveAt.current = now
      if (Math.abs(startX.current - event.clientX) > 3) moved.current = true
      dragRef.current = next
      schedulePaint()
    }

    const onUp = () => {
      if (!liveRef.current) return
      snapFromDrag()
    }

    window.addEventListener("pointermove", onMove, { passive: false })
    window.addEventListener("pointerup", onUp)
    window.addEventListener("pointercancel", onUp)
    window.addEventListener("blur", onUp)
    return () => {
      window.removeEventListener("pointermove", onMove)
      window.removeEventListener("pointerup", onUp)
      window.removeEventListener("pointercancel", onUp)
      window.removeEventListener("blur", onUp)
      if (rafRef.current != null) window.cancelAnimationFrame(rafRef.current)
    }
  }, [schedulePaint, snapFromDrag])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(1)
      if (e.key === "ArrowLeft") go(-1)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [go])

  useEffect(() => {
    const onWheel = (event: WheelEvent) => {
      if (event.ctrlKey) return
      const target = event.target
      if (!(target instanceof Element)) return
      const overDeck = Boolean(target.closest(".project-deck"))
      const overCard = Boolean(target.closest("[data-project-swipe]"))
      if (!overDeck) return

      const { x, y } = wheelDelta(event)
      const horizontal = Math.abs(x) >= Math.abs(y) * 0.65
      const delta = horizontal ? x : overCard ? y : 0

      if (overCard || horizontal) {
        event.preventDefault()
        event.stopPropagation()
      }

      if (liveRef.current) return
      if (delta === 0 || Math.abs(delta) < 8) return

      const now = performance.now()
      if (now < wheelIgnoreUntil.current) {
        if (Math.abs(delta) < 70) {
          wheelIgnoreUntil.current = Math.max(wheelIgnoreUntil.current, now + 90)
          return
        }
      }

      go(delta > 0 ? 1 : -1)
    }

    const onTouchMove = (event: TouchEvent) => {
      const target = event.target
      if (!(target instanceof Element)) return
      if (!target.closest(".project-deck")) return
      if (target.closest("[data-project-swipe]") || liveRef.current) {
        event.preventDefault()
      }
    }

    const wheelOpts: AddEventListenerOptions = { passive: false, capture: true }
    window.addEventListener("wheel", onWheel, wheelOpts)
    window.addEventListener("touchmove", onTouchMove, wheelOpts)
    return () => {
      window.removeEventListener("wheel", onWheel, wheelOpts)
      window.removeEventListener("touchmove", onTouchMove, wheelOpts)
    }
  }, [go])

  return (
    <div className="project-deck">
      <div ref={stageRef} className="project-deck-stage" onPointerDown={onPointerDown}>
        {projects.map((project, i) => {
          const slot = wrapSlot(i - index - drag, total)
          const abs = Math.abs(slot)
          if (abs > 4.2) return null

          const x = slot * 118
          const y = abs * 6
          const z = -abs * 280
          const rotY = slot * -9
          const scale = Math.max(0.72, 1 - abs * 0.09)
          const opacity = abs > 3.2 ? 0 : 1 - abs * 0.08
          const isFront = abs < 0.45

          return (
            <article
              key={project.slug}
              data-project-card
              {...(isFront ? { "data-project-swipe": true } : {})}
              className={`project-deck-card ${live ? "is-live" : "is-settling"}${isFront ? " is-front" : ""}`}
              style={{
                zIndex: Math.round(80 - abs * 10),
                opacity,
                transform: `translate3d(${x}px, ${y}px, ${z}px) rotateY(${rotY}deg) scale(${scale})`,
              }}
            >
              <div className="project-photo">
                <img src={project.img} alt={project.name} draggable={false} />
              </div>
              {isFront ? (
                <div className="project-deck-meta">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-heading text-lg md:text-2xl text-bone uppercase leading-none">{project.name}</h3>
                    {project.status ? (
                      <span className="project-status">
                        {project.status}
                      </span>
                    ) : null}
                  </div>
                  <p className="text-[10px] uppercase tracking-[0.16em] mt-2 text-cyan">{project.tech}</p>
                  <div
                    className="flex items-center gap-4 mt-3"
                    onPointerDown={(event) => event.stopPropagation()}
                  >
                    {project.relato.length > 0 && (
                      <Link
                        href={`/relatos/${project.slug}`}
                        className="text-[11px] uppercase tracking-[0.16em] text-cyan hover:text-bone transition-colors"
                        onClick={(event) => {
                          if (moved.current) event.preventDefault()
                        }}
                      >
                        Leer más
                      </Link>
                    )}
                    {project.url ? (
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[11px] uppercase tracking-[0.16em] text-lake hover:text-bone transition-colors"
                        onClick={(event) => {
                          if (moved.current) event.preventDefault()
                        }}
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
