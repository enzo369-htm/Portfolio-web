"use client"

import { useEffect, useState, type ComponentType } from "react"

export default function EarthGlobe() {
  const [Canvas, setCanvas] = useState<ComponentType | null>(null)

  useEffect(() => {
    import("./EarthGlobeCanvas").then((mod) => setCanvas(() => mod.default))
  }, [])

  return (
    <div className="earth-globe">
      {Canvas ? <Canvas /> : <div className="earth-globe-stage" aria-hidden />}
    </div>
  )
}
