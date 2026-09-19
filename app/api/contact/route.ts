import { NextResponse } from "next/server"
import { formatContactEmail, parseContactPayload, validateContact } from "@/lib/contact"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

const INBOX = "enzofede2004@gmail.com"

function env(name: string) {
  const bag = process.env
  const value = bag[name]
  return typeof value === "string" ? value.trim() : ""
}

async function sendWithResend(payload: ReturnType<typeof parseContactPayload>, apiKey: string, to: string) {
  const from = env("RESEND_FROM_EMAIL") || "Enzo Federico <hola@enzfederico.com>"
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: payload.email,
      subject: `Consulta de ${payload.name}`,
      text: formatContactEmail(payload),
    }),
  })
  if (!response.ok) {
    const detail = await response.text()
    console.error("Resend error", response.status, detail)
    return false
  }
  return true
}

async function sendWithFormSubmit(payload: ReturnType<typeof parseContactPayload>, to: string) {
  const response = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(to)}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      name: payload.name,
      email: payload.email,
      phone: payload.phone || "—",
      instagram: payload.instagram || "—",
      message: payload.message,
      _subject: `Consulta de ${payload.name}`,
      _replyto: payload.email,
      _template: "box",
      _captcha: "false",
    }),
  })
  if (!response.ok) {
    const detail = await response.text()
    console.error("FormSubmit error", response.status, detail)
    return false
  }
  return true
}

export async function POST(request: Request) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ ok: false, error: "Pedido inválido." }, { status: 400 })
  }

  const payload = parseContactPayload(body)
  if (payload.company) {
    return NextResponse.json({ ok: true })
  }

  const errors = validateContact(payload)
  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ ok: false, errors }, { status: 400 })
  }

  const apiKey = env("RESEND_API_KEY")
  const to = env("CONTACT_TO_EMAIL") || INBOX

  let sent = false
  if (apiKey) {
    sent = await sendWithResend(payload, apiKey, to)
  }
  if (!sent) {
    sent = await sendWithFormSubmit(payload, to)
  }

  if (!sent) {
    return NextResponse.json({ ok: false, error: "No se pudo enviar. Probá de nuevo o escribime por WhatsApp." }, { status: 502 })
  }

  return NextResponse.json({ ok: true })
}
