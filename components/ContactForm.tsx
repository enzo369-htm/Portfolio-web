"use client"

import { useState, type ChangeEvent, type FormEvent } from "react"
import { parseContactPayload, validateContact, type ContactErrors } from "@/lib/contact"

const EMPTY = {
  name: "",
  email: "",
  phone: "",
  instagram: "",
  message: "",
  company: "",
}

export default function ContactForm() {
  const [values, setValues] = useState(EMPTY)
  const [errors, setErrors] = useState<ContactErrors>({})
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle")
  const [serverError, setServerError] = useState("")

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const payload = parseContactPayload(values)
    const nextErrors = validateContact(payload)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    setStatus("sending")
    setServerError("")
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
      const data = (await response.json()) as {
        ok?: boolean
        error?: string
        errors?: ContactErrors
      }
      if (!response.ok || !data.ok) {
        if (data.errors) setErrors(data.errors)
        setServerError(data.error || "No se pudo enviar. Probá de nuevo o escribime por WhatsApp.")
        setStatus("error")
        return
      }
      setValues(EMPTY)
      setStatus("sent")
    } catch {
      setServerError("No se pudo enviar. Probá de nuevo o escribime por WhatsApp.")
      setStatus("error")
    }
  }

  const field = (key: "name" | "email" | "phone" | "instagram") => ({
    value: values[key],
    onChange: (event: ChangeEvent<HTMLInputElement>) => {
      setValues((prev) => ({ ...prev, [key]: event.target.value }))
      if (key === "name" || key === "email") {
        setErrors((prev) => ({ ...prev, [key]: undefined }))
      }
    },
  })

  return (
    <form className="contact-form" onSubmit={onSubmit} noValidate>
      <div className="contact-grid">
        <label className="contact-item">
          <span className="contact-label">Nombre</span>
          <input className="contact-field" type="text" name="name" autoComplete="name" required {...field("name")} />
          {errors.name ? <span className="contact-error">{errors.name}</span> : null}
        </label>
        <label className="contact-item">
          <span className="contact-label">Correo</span>
          <input className="contact-field" type="email" name="email" autoComplete="email" required {...field("email")} />
          {errors.email ? <span className="contact-error">{errors.email}</span> : null}
        </label>
        <label className="contact-item">
          <span className="contact-label">
            Celular <em>opcional</em>
          </span>
          <input className="contact-field" type="tel" name="phone" autoComplete="tel" {...field("phone")} />
        </label>
        <label className="contact-item">
          <span className="contact-label">
            Instagram <em>opcional</em>
          </span>
          <input className="contact-field" type="text" name="instagram" autoComplete="off" {...field("instagram")} />
        </label>
      </div>

      <label className="contact-item contact-item-full">
        <span className="contact-prompt">
          ¿Qué imaginás de tu sitio?
          <br />
          ¿Tenés preguntas?
          <br />
          ¿Qué querés crear?
        </span>
        <textarea
          className="contact-field contact-area"
          name="message"
          rows={7}
          required
          value={values.message}
          onChange={(event) => {
            setValues((prev) => ({ ...prev, message: event.target.value }))
            setErrors((prev) => ({ ...prev, message: undefined }))
          }}
        />
        {errors.message ? <span className="contact-error">{errors.message}</span> : null}
      </label>

      <div className="contact-honeypot" aria-hidden="true">
        <input
          type="text"
          name="company"
          tabIndex={-1}
          autoComplete="off"
          value={values.company}
          onChange={(event) => setValues((prev) => ({ ...prev, company: event.target.value }))}
        />
      </div>

      <div className="contact-actions">
        <button className="contact-submit" type="submit" disabled={status === "sending"}>
          {status === "sending" ? "Enviando…" : "Enviar"}
        </button>
        {status === "sent" ? <p className="contact-note">Mensaje enviado.</p> : null}
        {status === "error" && serverError ? <p className="contact-error">{serverError}</p> : null}
      </div>
    </form>
  )
}
