"use client"

const linkStyle = {
  color: "#3f646d",
  letterSpacing: "0.18em",
  textTransform: "uppercase" as const,
  fontSize: "11px",
  textDecoration: "none",
  borderBottom: "1px solid #3f646d",
  paddingBottom: "4px",
}

export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html lang="es">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#ffffff",
          color: "#161513",
          fontFamily: "Georgia, serif",
          textAlign: "center",
          padding: "24px",
        }}
      >
        <p style={{ fontSize: "28px", letterSpacing: "0.04em", textTransform: "uppercase" }}>Esta página se detuvo</p>
        <p style={{ marginTop: "16px", maxWidth: "28rem", color: "#6a655c" }}>
          Podés ir al inicio, escribir por WhatsApp, o volver a intentar.
        </p>
        <div style={{ marginTop: "32px", display: "flex", flexWrap: "wrap", gap: "24px", justifyContent: "center" }}>
          <a href="/" style={linkStyle}>
            Inicio
          </a>
          <a href="/#contacto" style={linkStyle}>
            Contacto
          </a>
          <a href="https://wa.me/5493885246095" style={linkStyle}>
            WhatsApp
          </a>
          <button
            type="button"
            onClick={() => reset()}
            style={{ ...linkStyle, background: "transparent", borderLeft: 0, borderRight: 0, borderTop: 0, cursor: "pointer" }}
          >
            Reintentar
          </button>
        </div>
      </body>
    </html>
  )
}
