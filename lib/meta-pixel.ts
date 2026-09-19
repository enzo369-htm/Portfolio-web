export const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID || "1384157073864235"

type Fbq = ((...args: unknown[]) => void) & {
  callMethod?: (...args: unknown[]) => void
  queue: unknown[]
  loaded: boolean
  version: string
  push: Fbq
}

declare global {
  interface Window {
    fbq?: Fbq
    _fbq?: Fbq
  }
}

export function trackMetaEvent(event: "PageView" | "Lead" | "Contact") {
  if (typeof window === "undefined") return
  window.fbq?.("track", event)
}
