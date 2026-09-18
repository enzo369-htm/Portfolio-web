"use client"

import BowArrowBackdrop from "./BowArrowBackdrop"

export default function SiteBackdrop() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden>
      <BowArrowBackdrop />
    </div>
  )
}
