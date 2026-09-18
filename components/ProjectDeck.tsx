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
  return x + y
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
  const snapTimer = useRef<number | null>(null)
  const rafRef = useRef<number | null>(null)
  const velocityRef = useRef(0)
  const lastMoveAt = useRef(0)
  const lastDragAt = useRef(0)

  const paint = useCallback(() => {
    rafRef.current = null
    let nextIndex = indexRef.current
    let nextDrag = dragRef.current
    while (nextDrag >= 1) {
      nextDrag -= 1
      nextIndex = (nextIndex + 1) % total
    }
    while (nextDrag <= -1) {
      nextDrag += 1
      nextIndex = (nextIndex - 1 + total) % total
    }
    dragRef.current = nextDrag
    indexRef.current = nextIndex
    setIndex(nextIndex)
    setDrag(nextDrag)
  }, [total])

  const schedulePaint = useCallback(() => {
    if (rafRef.current != null) return
    rafRef.current = window.requestAnimationFrame(paint)
  }, [paint])

  const setLiveMode = (value: boolean) => {
    liveRef.current = value
    setLive(value)
  }

  const applyDrag = useCallback(
    (value: number) => {
      dragRef.current = value
      schedulePaint()
    },
    [schedulePaint]
  )

  const go = useCallback(
    (dir: number) => {
      if (!dir) return
      if (snapTimer.current) {
        window.clearTimeout(snapTimer.current)
        snapTimer.current = null
      }
      setLiveMode(false)
      const nextIndex = (indexRef.current + dir + total) % total
      indexRef.current = nextIndex
      dragRef.current = 0
      velocityRef.current = 0
      setIndex(nextIndex)
      setDrag(0)
    },
    [total]
  )

  const snapFromDrag = useCallback(() => {
    const d = dragRef.current
    const flick = Math.abs(velocityRef.current) > 0.55
    if (d > 0.18 || (flick && d > 0.06)) go(1)
    else if (d < -0.18 || (flick && d < -0.06)) go(-1)
    else {
      setLiveMode(false)
      dragRef.current = 0
      velocityRef.current = 0
      setDrag(0)
    }
  }, [go])

  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    const photo = (e.target as HTMLElement).closest("[data-project-swipe]")
    if (!photo) return
    if ((e.target as HTMLElement).closest("a")) return
    if (snapTimer.current) window.clearTimeout(snapTimer.current)
    try {
      photo.setPointerCapture(e.pointerId)
    } catch {
      /* Safari */
    }
    startX.current = e.clientX
    lastDragAt.current = dragRef.current
    lastMoveAt.current = performance.now()
    velocityRef.current = 0
    moved.current = false
    setLiveMode(true)
  }

  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!liveRef.current) return
    if (e.buttons === 0 && e.pointerType !== "touch") return
    const width = stageRef.current?.querySelector<HTMLElement>("[data-project-card]")?.offsetWidth ?? 560
    const next = (startX.current - e.clientX) / Math.max(160, width * 0.42)
    const now = performance.now()
    const dt = Math.max(8, now - lastMoveAt.current)
    velocityRef.current = (next - lastDragAt.current) / (dt / 16)
    lastDragAt.current = next
    lastMoveAt.current = now
    if (Math.abs(startX.current - e.clientX) > 4) moved.current = true
    applyDrag(next)
  }

  const onPointerUp = () => {
    if (!liveRef.current) return
    snapFromDrag()
  }

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(1)
      if (e.key === "ArrowLeft") go(-1)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [go])

  useEffect(() => {
    const el = stageRef.current
    if (!el) return

    const onWheel = (event: WheelEvent) => {
      if (event.ctrlKey) return
      const overPhoto = event.target instanceof Element && event.target.closest("[data-project-swipe]")
      if (!overPhoto) return

      const pixels = wheelPixels(event)
      if (Math.abs(pixels) < 14) return
      event.preventDefault()
      if (snapTimer.current) window.clearTimeout(snapTimer.current)

      const now = performance.now()
      const dt = Math.min(48, Math.max(8, now - lastMoveAt.current || 16))
      lastMoveAt.current = now
      const width = el.querySelector<HTMLElement>("[data-project-card]")?.offsetWidth ?? 560
      const step = pixels / Math.max(200, width * 0.5)
      velocityRef.current = step / (dt / 16)
      setLiveMode(true)
      applyDrag(dragRef.current + step)
      snapTimer.current = window.setTimeout(snapFromDrag, 150)
    }

    el.addEventListener("wheel", onWheel, { passive: false })
    return () => {
      el.removeEventListener("wheel", onWheel)
      if (snapTimer.current) window.clearTimeout(snapTimer.current)
      if (rafRef.current != null) window.cancelAnimationFrame(rafRef.current)
    }
  }, [applyDrag, snapFromDrag])

  return (
    <div className="project-deck">
      <div
        ref={stageRef}
        className="project-deck-stage"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
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
              className={`project-deck-card ${live ? "is-live" : "is-settling"}${isFront ? " is-front" : ""}`}
              style={{
                zIndex: Math.round(80 - abs * 10),
                opacity,
                transform: `translate3d(${x}px, ${y}px, ${z}px) rotateY(${rotY}deg) scale(${scale})`,
              }}
            >
              <div className="project-photo" {...(isFront ? { "data-project-swipe": true } : {})}>
                <img src={project.img} alt={project.name} draggable={false} />
              </div>
              {isFront ? (
                <div className="project-deck-meta">
                  <div className="flex flex-wrap items-baseline gap-2">
                    <h3 className="font-heading text-lg md:text-2xl text-bone uppercase leading-none">{project.name}</h3>
                    {project.status ? (
                      <span className="text-[9px] uppercase tracking-[0.16em] text-lake border border-lake/40 px-2 py-0.5">
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
