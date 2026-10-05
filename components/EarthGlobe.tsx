"use client"

import { Component, useEffect, useRef, useState, type ComponentType, type ReactNode } from "react"

class GlobeBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false }

  static getDerivedStateFromError() {
    return { failed: true }
  }

  render() {
    if (this.state.failed) return <div className="earth-globe-stage" aria-hidden />
    return this.props.children
  }
}

export default function EarthGlobe() {
  const hostRef = useRef<HTMLDivElement>(null)
  const [Canvas, setCanvas] = useState<ComponentType | null>(null)

  useEffect(() => {
    const host = hostRef.current
    if (!host) return

    let cancelled = false
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting || cancelled) return
        observer.disconnect()
        import("./EarthGlobeCanvas")
          .then((mod) => {
            if (!cancelled) setCanvas(() => mod.default)
          })
          .catch(() => {})
      },
      { rootMargin: "0px" }
    )
    observer.observe(host)
    return () => {
      cancelled = true
      observer.disconnect()
    }
  }, [])

  return (
    <div className="earth-globe" ref={hostRef}>
      {Canvas ? (
        <GlobeBoundary>
          <Canvas />
        </GlobeBoundary>
      ) : (
        <div className="earth-globe-stage" aria-hidden />
      )}
    </div>
  )
}
