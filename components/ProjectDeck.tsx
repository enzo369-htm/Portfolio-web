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

export default function ProjectDeck({ projects }: { projects: Project[] }) {
  const total = projects.length
  const [index, setIndex] = useState(0)
  const [drag, setDrag] = useState(0)
  const [dragging, setDragging] = useState(false)
  const startX = useRef(0)
  const lastDrag = useRef(0)
  const moved = useRef(false)

  const go = useCallback(
    (dir: number) => {
      setIndex((current) => (current + dir + total) % total)
      setDrag(0)
    },
    [total]
  )

  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest("a")) return
    e.currentTarget.setPointerCapture(e.pointerId)
    startX.current = e.clientX
    lastDrag.current = 0
    moved.current = false
    setDragging(true)
  }

  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!dragging) return
    const delta = (startX.current - e.clientX) / 240
    if (Math.abs(startX.current - e.clientX) > 8) moved.current = true
    lastDrag.current = delta
    setDrag(Math.max(-1.15, Math.min(1.15, delta)))
  }

  const onPointerUp = () => {
    if (!dragging) return
    setDragging(false)
    const d = lastDrag.current
    if (d > 0.22) go(1)
    else if (d < -0.22) go(-1)
    else setDrag(0)
  }

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(1)
      if (e.key === "ArrowLeft") go(-1)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [go])

  return (
    <div className="project-deck">
      <div
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
              className={`project-deck-card ${dragging ? "is-dragging" : "is-settling"}`}
              style={{
                zIndex: Math.round(80 - abs * 10),
                opacity,
                transform: `translate3d(${x}px, ${y}px, ${z}px) rotateY(${rotY}deg) scale(${scale})`,
              }}
            >
              <div className="crt-shell">
                <div className="crt-bezel">
                  <div className="crt-screen">
                    <img src={project.img} alt={project.name} draggable={false} />
                    <span className="crt-glass" />
                  </div>
                </div>
                <div className="crt-chin">
                  <span className="crt-vent" />
                  <span className="crt-led" />
                </div>
              </div>
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
                {isFront ? (
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
                ) : null}
              </div>
            </article>
          )
        })}
      </div>
    </div>
  )
}
