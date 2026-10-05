"use client"

import { Component, useEffect, useState, type ComponentType, type ReactNode } from "react"

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
  const [Canvas, setCanvas] = useState<ComponentType | null>(null)

  useEffect(() => {
    let cancelled = false
    import("./EarthGlobeCanvas")
      .then((mod) => {
        if (!cancelled) setCanvas(() => mod.default)
      })
      .catch(() => {})
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <div className="earth-globe">
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
