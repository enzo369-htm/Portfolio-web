export type ContactPayload = {
  name: string
  email: string
  phone: string
  instagram: string
  message: string
  company: string
}

export type ContactErrors = Partial<Record<"name" | "email" | "message", string>>

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function clip(value: unknown, max: number) {
  if (typeof value !== "string") return ""
  return value.replace(/\r\n/g, "\n").trim().slice(0, max)
}

export function parseContactPayload(input: unknown): ContactPayload {
  const data = input && typeof input === "object" ? (input as Record<string, unknown>) : {}
  return {
    name: clip(data.name, 80),
    email: clip(data.email, 120),
    phone: clip(data.phone, 40),
    instagram: clip(data.instagram, 60),
    message: clip(data.message, 4000),
    company: clip(data.company, 80),
  }
}

export function validateContact(payload: ContactPayload): ContactErrors {
  const errors: ContactErrors = {}
  if (payload.name.length < 2) errors.name = "Escribí tu nombre."
  if (!EMAIL_RE.test(payload.email)) errors.email = "Escribí un correo válido."
  if (payload.message.length < 8) errors.message = "Contame un poco más."
  return errors
}

export function formatContactEmail(payload: ContactPayload) {
  const instagram = payload.instagram.replace(/^@/, "")
  return [
    `Nombre: ${payload.name}`,
    `Correo: ${payload.email}`,
    `Celular: ${payload.phone || "—"}`,
    `Instagram: ${instagram ? `@${instagram}` : "—"}`,
    "",
    "¿Qué imaginás de tu sitio? ¿Tenés preguntas? ¿Qué querés crear?",
    payload.message,
  ].join("\n")
}
