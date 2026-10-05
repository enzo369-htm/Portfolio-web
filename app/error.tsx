"use client"

const linkClass = "text-[11px] uppercase tracking-[0.18em] text-cyan border-b border-cyan/40 pb-1"

export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <main className="min-h-screen bg-void text-bone flex flex-col items-center justify-center px-6 text-center">
      <p className="font-heading text-2xl md:text-3xl uppercase">Esta página se detuvo</p>
      <p className="mt-4 max-w-md text-mute">Podés seguir por otro lado, o volver a intentar esta página.</p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-6">
        <a href="/" className={linkClass}>
          Inicio
        </a>
        <a href="/#contacto" className={linkClass}>
          Contacto
        </a>
        <a href="https://wa.me/5493885246095" className={linkClass}>
          WhatsApp
        </a>
        <button type="button" onClick={() => reset()} className={linkClass}>
          Reintentar
        </button>
      </div>
    </main>
  )
}
