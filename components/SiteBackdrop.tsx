"use client"

import dynamic from "next/dynamic"

const NodeFieldScene = dynamic(() => import("./NodeFieldScene"), { ssr: false })

export default function SiteBackdrop() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0" aria-hidden>
      <NodeFieldScene />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,rgba(10,10,10,0.72)_100%)]" />
    </div>
  )
}
