"use client"

import type { ReactNode } from "react"
import { trackMetaEvent } from "@/lib/meta-pixel"

export default function WhatsAppLink({
  href = "https://wa.me/5493885246095",
  className,
  children,
}: {
  href?: string
  className?: string
  children: ReactNode
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      onClick={() => trackMetaEvent("Contact")}
    >
      {children}
    </a>
  )
}
