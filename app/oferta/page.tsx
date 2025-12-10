"use client"

import { useEffect, useRef, useState } from "react"

export default function OfertaPage() {
  const whatsappNumber = "5493885246095"
  const whatsappMessage = encodeURIComponent("Hola! Me interesa la oferta de landing page a $100.000. ¿Podemos hablar?")

  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`

  const sectionsRef = useRef<(HTMLElement | null)[]>([])
  
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0 })

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date()
      // 15 de diciembre 2025, 18:00 (mes 11 = diciembre, ya que los meses van de 0-11)
      const targetDate = new Date(2025, 11, 15, 18, 0, 0)
      const difference = targetDate.getTime() - now.getTime()

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24))
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        setTimeLeft({ days, hours })
      } else {
        setTimeLeft({ days: 0, hours: 0 })
      }
    }

    calculateTimeLeft()
    const interval = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const animateSection = (section: HTMLElement) => {
      // Buscar el div con data-content="true" o que tenga max-w y opacity-0
      const contentDiv = section.querySelector('div[data-content="true"], div.opacity-0.max-w-5xl, div.opacity-0.max-w-4xl')
      if (contentDiv && !contentDiv.classList.contains('animate-fade-in')) {
        contentDiv.classList.add("animate-fade-in")
      } else {
        // Fallback: buscar cualquier div con opacity-0 que no sea absolute y tenga relative z-10
        const allDivs = section.querySelectorAll('div.opacity-0')
        allDivs.forEach((div) => {
          if (!div.classList.contains('absolute') && div.classList.contains('relative') && !div.classList.contains('animate-fade-in')) {
            div.classList.add("animate-fade-in")
          }
        })
      }
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateSection(entry.target as HTMLElement)
          }
        })
      },
      { threshold: 0.05, rootMargin: '0px 0px -100px 0px' }
    )

    sectionsRef.current.forEach((section, index) => {
      if (section) {
        observer.observe(section)
        // Fallback: mostrar sección después de un tiempo si no se ha animado
        setTimeout(() => {
          animateSection(section)
        }, 3000 + (index * 500)) // Delay escalonado para cada sección
      }
    })

    // Animar el hero inmediatamente
    if (sectionsRef.current[0]) {
      setTimeout(() => {
        animateSection(sectionsRef.current[0]!)
      }, 100)
    }

    return () => {
      sectionsRef.current.forEach((section) => {
        if (section) observer.unobserve(section)
      })
    }
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-pink-50/30 to-white font-body">
      {/* Hero Section */}
      <section 
        ref={(el) => { sectionsRef.current[0] = el }}
        className="min-h-screen flex items-center justify-center px-6 py-20 pt-20 relative overflow-hidden"
      >
        {/* Decorative background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-20 w-72 h-72 bg-pink-200/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-5xl mx-auto text-center space-y-8 opacity-0 relative z-10">
          <div className="inline-block px-5 py-2.5 bg-gradient-to-r from-pink-100 to-purple-100 rounded-full text-pink-700 text-sm font-semibold mb-6 shadow-sm border border-pink-200/50">
            ✨ Oferta por tiempo limitado
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold text-gray-900 leading-[1.1] tracking-tight">
            Landing page profesional para tu negocio de belleza por{" "}
            <span 
              className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-600 to-pink-500 animate-gradient"
              style={{
                backgroundSize: '200% auto',
                animation: 'shimmer 3s linear infinite'
              }}
            >
              $100.000 ARS
            </span>
          </h1>

          <p className="text-xl md:text-2xl lg:text-3xl text-gray-700 font-medium max-w-3xl mx-auto leading-relaxed">
            Diseño + estructura de ventas + WhatsApp integrado.
          </p>

          <p className="text-lg md:text-xl text-pink-600 font-bold tracking-wide">
            ⏰ Oferta válida solo hasta el lunes 15
          </p>

          <div className="grid md:grid-cols-2 gap-5 max-w-3xl mx-auto mt-16">
            <div className="flex items-start gap-4 text-left p-6 bg-white/80 backdrop-blur-md rounded-2xl shadow-md hover:shadow-xl border border-pink-100/50 transition-all duration-300 hover:-translate-y-1">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r from-pink-400 to-purple-400 flex items-center justify-center text-white font-bold text-lg shadow-sm">
                ✓
              </div>
              <span className="text-gray-800 font-medium text-base leading-relaxed">Convertí visitas de Instagram en consultas reales</span>
            </div>
            <div className="flex items-start gap-4 text-left p-6 bg-white/80 backdrop-blur-md rounded-2xl shadow-md hover:shadow-xl border border-pink-100/50 transition-all duration-300 hover:-translate-y-1">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r from-pink-400 to-purple-400 flex items-center justify-center text-white font-bold text-lg shadow-sm">
                ✓
              </div>
              <span className="text-gray-800 font-medium text-base leading-relaxed">Diseño femenino, limpio y profesional</span>
            </div>
            <div className="flex items-start gap-4 text-left p-6 bg-white/80 backdrop-blur-md rounded-2xl shadow-md hover:shadow-xl border border-pink-100/50 transition-all duration-300 hover:-translate-y-1">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r from-pink-400 to-purple-400 flex items-center justify-center text-white font-bold text-lg shadow-sm">
                ✓
              </div>
              <span className="text-gray-800 font-medium text-base leading-relaxed">Optimizada para celular</span>
            </div>
            <div className="flex items-start gap-4 text-left p-6 bg-white/80 backdrop-blur-md rounded-2xl shadow-md hover:shadow-xl border border-pink-100/50 transition-all duration-300 hover:-translate-y-1">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r from-pink-400 to-purple-400 flex items-center justify-center text-white font-bold text-lg shadow-sm">
                ✓
              </div>
              <span className="text-gray-800 font-medium text-base leading-relaxed">Lista para empezar a recibir clientas</span>
            </div>
          </div>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-16 px-10 py-5 bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 text-white text-lg md:text-xl font-bold rounded-full shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 hover:from-pink-600 hover:via-purple-600 hover:to-pink-600 relative overflow-hidden group"
          >
            <span className="relative z-10 flex items-center gap-2">
              👉 Quiero mi landing con descuento
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-pink-600 via-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </a>
        </div>
      </section>

      {/* Para quién es */}
      <section 
        ref={(el) => { sectionsRef.current[1] = el }}
        className="py-24 px-6 bg-gradient-to-b from-white/80 to-pink-50/40"
      >
        <div className="max-w-5xl mx-auto opacity-0">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-gray-900 text-center mb-6 tracking-tight">
            ¿Para quién es esta landing?
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 text-center mb-16 font-medium">
            Esta oferta está pensada especialmente para:
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              "Centros de estética",
              "Uñas y manicura",
              "Spa y masajes",
              "Cosmiatras",
              "Peluquerías",
              "Marcas de belleza y cuidado femenino"
            ].map((item, index) => (
              <div
                key={index}
                className="p-6 bg-white/90 backdrop-blur-sm rounded-2xl border border-pink-100/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 hover:border-pink-300/50"
              >
                <div className="flex items-center gap-4">
                  <div className="w-3 h-3 rounded-full bg-gradient-to-r from-pink-400 to-purple-400 shadow-sm"></div>
                  <span className="text-gray-800 font-semibold text-base">{item}</span>
                </div>
              </div>
            ))}
          </div>

          <p className="text-center text-lg md:text-xl text-gray-700 mt-16 max-w-3xl mx-auto font-medium leading-relaxed">
            Si hoy vendés solo por Instagram o WhatsApp, esta landing es el paso que te falta para verte más profesional y vender más. Tus conversaciones van a empezar en un nivel mucho más cercano a la reserva o la compra.
          </p>
        </div>
      </section>

      {/* Qué incluye */}
      <section 
        ref={(el) => { sectionsRef.current[2] = el }}
        className="py-24 px-6 bg-gradient-to-b from-pink-50/30 to-white"
      >
        <div className="max-w-5xl mx-auto opacity-0">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-gray-900 text-center mb-16 tracking-tight">
            ¿Qué incluye esta oferta?
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
            {[
              "Landing page completa (una sola página)",
              "Diseño 100% personalizado a tu marca",
              "Adaptada a celular y desktop",
              "Botón directo a WhatsApp",
              "Sección de servicios",
              "Presentación profesional del negocio",
              "Llamados a la acción estratégicos",
              "Entrega rápida",
              "Publicada online y lista para usar"
            ].map((item, index) => (
              <div
                key={index}
                className="flex items-start gap-4 p-6 bg-white/90 backdrop-blur-sm rounded-2xl shadow-md hover:shadow-xl border border-pink-100/50 transition-all duration-300 hover:-translate-y-1 hover:border-pink-300/50"
              >
                <div className="flex-shrink-0 w-7 h-7 rounded-full bg-gradient-to-r from-pink-400 to-purple-400 flex items-center justify-center text-white font-bold text-sm shadow-sm">
                  ✓
                </div>
                <span className="text-gray-800 font-medium text-base leading-relaxed">{item}</span>
              </div>
            ))}
          </div>

          <p className="text-center text-xl md:text-2xl text-gray-800 font-semibold max-w-3xl mx-auto p-8 bg-gradient-to-r from-pink-50/80 to-purple-50/80 backdrop-blur-sm rounded-2xl border border-pink-200/50 shadow-lg">
            No es solo una web linda: es una herramienta para generar más consultas y ventas.
          </p>
        </div>
      </section>

      {/* Precio y urgencia */}
      <section 
        ref={(el) => { sectionsRef.current[3] = el }}
        className="py-24 px-6 bg-gradient-to-br from-pink-500 via-purple-600 to-pink-500 text-white relative overflow-hidden"
      >
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}
        ></div>
        <div className="max-w-5xl mx-auto text-center opacity-0 relative z-10">
          <p className="text-xl md:text-2xl mb-6 opacity-95 font-medium">Antes: <span className="line-through">$230.000</span></p>
          <h2 className="text-6xl md:text-8xl lg:text-9xl font-display font-bold mb-10 tracking-tight drop-shadow-2xl">
            $100.000 ARS
          </h2>
          <p className="text-xl md:text-2xl lg:text-3xl mb-8 font-semibold">
            Esta promoción es por tiempo limitado y vence el <span className="font-bold underline decoration-2">lunes 15</span>.
          </p>
          
          {/* Contador regresivo */}
          <div className="mb-12 flex items-center justify-center gap-6">
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl px-6 py-4 border border-white/30 shadow-lg">
              <div className="text-center">
                <div className="text-4xl md:text-5xl lg:text-6xl font-bold mb-2">{timeLeft.days}</div>
                <div className="text-sm md:text-base font-medium opacity-90">Días</div>
              </div>
            </div>
            <div className="text-3xl md:text-4xl font-bold opacity-80">:</div>
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl px-6 py-4 border border-white/30 shadow-lg">
              <div className="text-center">
                <div className="text-4xl md:text-5xl lg:text-6xl font-bold mb-2">{timeLeft.hours}</div>
                <div className="text-sm md:text-base font-medium opacity-90">Horas</div>
              </div>
            </div>
          </div>

          <p className="text-lg md:text-xl mb-16 opacity-95 font-medium">
            Luego vuelve al valor normal.
          </p>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-12 py-6 bg-white text-pink-600 text-xl md:text-2xl font-bold rounded-full shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 hover:bg-pink-50 relative overflow-hidden group"
          >
            <span className="relative z-10">Reservar mi lugar ahora</span>
            <div className="absolute inset-0 bg-gradient-to-r from-pink-50 to-purple-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </a>
        </div>
      </section>

      {/* Cómo es el proceso */}
      <section 
        ref={(el) => { sectionsRef.current[4] = el }}
        className="py-24 px-6 bg-white"
      >
        <div className="max-w-5xl mx-auto opacity-0">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-gray-900 text-center mb-16 tracking-tight">
            ¿Cómo trabajamos?
          </h2>
          
          <div className="space-y-5">
            {[
              "Me escribís por WhatsApp",
              "Me contás tu negocio y tus servicios",
              "Armo el diseño a medida",
              "Te muestro el avance",
              "Ajustamos detalles",
              "Publicamos tu landing",
              "Empezás a recibir consultas"
            ].map((step, index) => (
              <div
                key={index}
                className="flex items-center gap-6 p-7 bg-white/90 backdrop-blur-sm rounded-2xl border border-pink-100/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 hover:border-pink-300/50"
              >
                <div className="flex-shrink-0 w-14 h-14 rounded-full bg-gradient-to-r from-pink-400 to-purple-400 flex items-center justify-center text-white font-bold text-xl shadow-lg">
                  {index + 1}
                </div>
                <span className="text-lg md:text-xl text-gray-800 font-semibold">{step}</span>
              </div>
            ))}
          </div>

          <p className="text-center text-xl md:text-2xl text-gray-600 mt-16 font-semibold">
            Simple, rápido y sin vueltas.
          </p>
        </div>
      </section>

      {/* Por qué una web vende mejor */}
      <section 
        ref={(el) => { sectionsRef.current[5] = el }}
        className="py-24 px-6 bg-white"
      >
        <div className="max-w-5xl mx-auto opacity-0">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-gray-900 text-center mb-16 tracking-tight">
            ¿Por qué una web vende mejor que solo responder mensajes?
          </h2>
          
          <div className="space-y-5 mb-12">
            {[
              "Te ahorrás responder siempre las mismas preguntas por WhatsApp.",
              "Los clientes llegan al chat ya informados y convencidos de comprar.",
              "Transmitís confianza, orden y profesionalismo.",
              "Podés mostrar servicios, precios, resultados y testimonios en un solo lugar.",
              "Vendés incluso mientras estás atendiendo clientes.",
              "No dependés solo del algoritmo de Instagram."
            ].map((item, index) => (
              <div
                key={index}
                className="flex items-start gap-5 p-7 bg-gradient-to-r from-pink-50/80 to-purple-50/80 backdrop-blur-sm rounded-2xl border border-pink-100/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 hover:border-pink-300/50"
              >
                <div className="flex-shrink-0 w-7 h-7 rounded-full bg-gradient-to-r from-pink-400 to-purple-400 flex items-center justify-center text-white font-bold text-sm shadow-sm mt-0.5">
                  ✓
                </div>
                <span className="text-lg md:text-xl text-gray-800 font-semibold leading-relaxed">{item}</span>
              </div>
            ))}
          </div>

          <p className="text-center text-xl md:text-2xl lg:text-3xl text-gray-800 font-bold max-w-4xl mx-auto p-8 bg-gradient-to-r from-pink-100/80 to-purple-100/80 backdrop-blur-sm rounded-2xl border border-pink-200/50 shadow-lg">
            Pasás de "responder mensajes" a tener un sistema que vende solo.
          </p>
        </div>
      </section>

      {/* Quién soy */}
      <section 
        ref={(el) => { sectionsRef.current[6] = el }}
        className="py-24 px-6 bg-gradient-to-b from-pink-50/30 to-white"
      >
        <div className="max-w-5xl mx-auto opacity-0">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-gray-900 text-center mb-12 tracking-tight">
            Sobre mí
          </h2>
          
          <p className="text-xl md:text-2xl text-gray-700 text-center mb-8 leading-relaxed max-w-4xl mx-auto font-medium">
            Soy desarrollador y estratega digital. Creo páginas web y landings enfocadas en conversión, no solo en diseño. Trabajo con marcas, emprendimientos y proyectos que quieren vender en serio por internet, no depender solo de redes sociales.
          </p>

          <div className="text-center mb-16">
            <a
              href="/"
              className="inline-block px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              Ver mi portfolio completo →
            </a>
          </div>

          <p className="text-lg md:text-xl text-gray-600 text-center mb-12 font-semibold">
            Mi enfoque combina:
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              "Diseño visual",
              "Estructura de ventas",
              "Marketing digital",
              "Experiencia de usuario"
            ].map((item, index) => (
              <div
                key={index}
                className="p-8 bg-white/90 backdrop-blur-sm rounded-2xl shadow-md border border-pink-100/50 text-center hover:shadow-xl hover:-translate-y-1 transition-all duration-300 hover:border-pink-300/50"
              >
                <span className="text-gray-800 font-bold text-lg">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section 
        ref={(el) => { sectionsRef.current[7] = el }}
        className="py-24 px-6 bg-gradient-to-br from-pink-500 via-purple-600 to-pink-500 text-white relative overflow-hidden"
      >
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}
        ></div>
        <div className="max-w-5xl mx-auto text-center opacity-0 relative z-10" data-content="true">
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold mb-10 tracking-tight drop-shadow-2xl">
            Aprovechá la oferta antes del lunes 15
          </h2>
          
          {/* Contador regresivo */}
          <div className="mb-12 flex items-center justify-center gap-6">
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl px-6 py-4 border border-white/30 shadow-lg">
              <div className="text-center">
                <div className="text-4xl md:text-5xl lg:text-6xl font-bold mb-2">{timeLeft.days}</div>
                <div className="text-sm md:text-base font-medium opacity-90">Días</div>
              </div>
            </div>
            <div className="text-3xl md:text-4xl font-bold opacity-80">:</div>
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl px-6 py-4 border border-white/30 shadow-lg">
              <div className="text-center">
                <div className="text-4xl md:text-5xl lg:text-6xl font-bold mb-2">{timeLeft.hours}</div>
                <div className="text-sm md:text-base font-medium opacity-90">Horas</div>
              </div>
            </div>
          </div>

          <p className="text-xl md:text-2xl lg:text-3xl mb-16 opacity-95 max-w-3xl mx-auto font-medium leading-relaxed">
            Si querés profesionalizar tu negocio y empezar a recibir más consultas desde Instagram, esta oferta es para vos.
          </p>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-14 py-7 bg-white text-pink-600 text-2xl md:text-3xl font-bold rounded-full shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 hover:bg-pink-50 relative overflow-hidden group"
          >
            <span className="relative z-10 flex items-center gap-3">
              👉 Hablar ahora por WhatsApp
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-pink-50 to-purple-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </a>
        </div>
      </section>
    </div>
  )
}

