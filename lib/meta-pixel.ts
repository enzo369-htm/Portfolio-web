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

export function pageLabel(pathname: string) {
  if (pathname === "/") return "Inicio"
  if (pathname === "/quien-soy") return "Quién soy"
  if (pathname === "/colaboraciones") return "Colaboraciones"
  if (pathname === "/relatos") return "Relatos"
  if (pathname.startsWith("/relatos/")) return `Relato: ${pathname.replace("/relatos/", "")}`
  if (pathname === "/contacto") return "Contacto"
  return pathname
}

export function trackMetaEvent(
  event: "PageView" | "Lead" | "Contact",
  params?: Record<string, string>
) {
  if (typeof window === "undefined") return
  if (params) window.fbq?.("track", event, params)
  else window.fbq?.("track", event)
}

export function trackMetaCustom(event: string, params?: Record<string, string>) {
  if (typeof window === "undefined") return
  if (params) window.fbq?.("trackCustom", event, params)
  else window.fbq?.("trackCustom", event)
}
