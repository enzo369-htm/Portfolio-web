import { NextResponse } from "next/server"
import { formatContactEmail, parseContactPayload, validateContact } from "@/lib/contact"

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

  const apiKey = process.env.RESEND_API_KEY?.trim()
  const to = process.env.CONTACT_TO_EMAIL?.trim() || "enzofede2004@gmail.com"
  if (!apiKey) {
    console.error("Contact form missing RESEND_API_KEY")
    return NextResponse.json({ ok: false, error: "El envío no está configurado todavía." }, { status: 503 })
  }

  const from = process.env.RESEND_FROM_EMAIL || "Enzo Federico <hola@enzfederico.com>"
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
    return NextResponse.json({ ok: false, error: "No se pudo enviar. Probá de nuevo." }, { status: 502 })
  }

  return NextResponse.json({ ok: true })
}
