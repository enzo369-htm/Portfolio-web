"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Sparkles, Target, Rocket, Code, TrendingUp, Zap, Globe, Instagram } from "lucide-react"
import Navbar from "@/components/Navbar"

// Oferta especial: cambiar a true para mostrar de nuevo el botón de la landing de oferta
const SHOW_OFFER_LANDING = false

export default function Portfolio() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    projectType: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState("")

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitMessage("")

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (response.ok) {
        setSubmitMessage("¡Mensaje enviado correctamente! Te contactaré pronto.")
        setFormData({ name: "", email: "", projectType: "", message: "" })
      } else {
        setSubmitMessage(result.error || "Error al enviar el mensaje")
      }
    } catch (error) {
      setSubmitMessage("Error al enviar el mensaje. Inténtalo de nuevo.")
    } finally {
      setIsSubmitting(false)
    }
  }


  return (
    <div className="min-h-screen bg-background" style={{ backgroundColor: '#000000', color: '#FFFFFF' }}>
      <Navbar />
      {/* Hero Section */}
      <section id="inicio" className="relative overflow-hidden pt-40 pb-20 px-4 min-h-screen flex items-center" style={{ backgroundColor: '#000000' }}>
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-32 h-32 border rounded-lg opacity-30" style={{ borderColor: 'rgba(124, 58, 237, 0.2)' }}></div>
          <div className="absolute bottom-20 right-10 w-16 h-16 rounded-full blur-2xl" style={{ backgroundColor: 'rgba(124, 58, 237, 0.1)' }}></div>
          <div className="absolute bottom-10 right-20 w-4 h-4 rounded-full" style={{ backgroundColor: 'rgba(124, 58, 237, 0.4)' }}></div>
          <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full blur-3xl animate-pulse" style={{ background: 'linear-gradient(to bottom right, rgba(124, 58, 237, 0.1), rgba(255, 196, 0, 0.1))' }}></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl animate-pulse delay-1000" style={{ background: 'linear-gradient(to bottom right, rgba(255, 196, 0, 0.1), rgba(124, 58, 237, 0.1))' }}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full blur-3xl animate-pulse delay-500" style={{ background: 'linear-gradient(to bottom right, rgba(124, 58, 237, 0.05), rgba(255, 196, 0, 0.05))' }}></div>
          <div className="absolute top-10 right-20 w-2 h-2 rounded-full animate-ping" style={{ backgroundColor: '#FFC400' }}></div>
          <div className="absolute bottom-20 left-20 w-3 h-3 rounded-full animate-ping delay-1000" style={{ backgroundColor: '#7C3AED' }}></div>
          <div className="absolute top-1/3 right-1/3 w-1 h-1 rounded-full animate-ping delay-500" style={{ backgroundColor: '#FFC400' }}></div>
        </div>

        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="text-center space-y-6">
            {/* Badge pequeño arriba */}
            <div className="flex justify-center">
              <Badge variant="outline" className="text-xl md:text-2xl font-semibold px-8 py-4 border-white/30 bg-white/5 backdrop-blur-sm relative inline-block" style={{ 
                backgroundImage: 'linear-gradient(to right, #7C3AED, #FFC400, #F97316, #8B5CF6)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                borderColor: 'rgba(124, 58, 237, 0.3)',
                textShadow: '0 0 15px rgba(124, 58, 237, 0.3), 0 0 30px rgba(255, 196, 0, 0.2)',
                filter: 'drop-shadow(0 0 5px rgba(124, 58, 237, 0.2))'
              }}>
                Hola soy Enzo!
              </Badge>
            </div>

            {/* Headline principal */}
            <div className="space-y-4">
              <h1 className="font-montserrat font-bold text-3xl md:text-4xl lg:text-5xl xl:text-6xl leading-tight">
                <span className="relative inline-block" style={{ 
                  backgroundImage: 'linear-gradient(to right, #7C3AED, #FFC400, #F97316, #8B5CF6)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  textShadow: '0 0 20px rgba(124, 58, 237, 0.3), 0 0 40px rgba(255, 196, 0, 0.2)',
                  filter: 'drop-shadow(0 0 8px rgba(124, 58, 237, 0.25))'
                }}>
                  Growth Operator
                </span>
                <br />
                <span className="relative inline-block" style={{ 
                  backgroundImage: 'linear-gradient(to right, #FFC400, #7C3AED, #F97316, #8B5CF6)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  textShadow: '0 0 20px rgba(255, 196, 0, 0.3), 0 0 40px rgba(124, 58, 237, 0.2)',
                  filter: 'drop-shadow(0 0 8px rgba(255, 196, 0, 0.25))'
                }}>
                  AI-Assisted Fullstack Web Builder
                </span>
              </h1>
            </div>
          </div>
        </div>

        {/* Scroll indicator - Flecha */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="animate-bounce">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7 10L12 15L17 10" stroke="#FFC400" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="sobre-mi" className="py-20 px-4 relative overflow-hidden" style={{ backgroundColor: '#000000' }}>
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-32 h-32 rounded-full blur-xl animate-pulse" style={{ background: 'linear-gradient(to bottom right, rgba(124, 58, 237, 0.2), rgba(255, 196, 0, 0.2))' }}></div>
          <div className="absolute bottom-20 right-10 w-24 h-24 rounded-full blur-xl animate-pulse delay-1000" style={{ background: 'linear-gradient(to bottom right, rgba(255, 196, 0, 0.2), rgba(124, 58, 237, 0.2))' }}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full blur-2xl animate-pulse delay-500" style={{ background: 'linear-gradient(to bottom right, rgba(124, 58, 237, 0.1), rgba(255, 196, 0, 0.1))' }}></div>
        </div>

        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div className="flex justify-center">
              {/* Card con marco doble estilizado - más rectangular */}
              <div className="relative rounded-3xl p-[3px] bg-gradient-to-r from-[#FFC400] via-[#FFD700] to-[#FFC400] w-full max-w-2xl" style={{
                boxShadow: '0 0 30px rgba(255, 196, 0, 0.4), 0 0 60px rgba(255, 215, 0, 0.3)'
              }}>
                <div className="relative rounded-3xl p-[2px] bg-gradient-to-r from-[#FFD700] via-[#FFC400] to-[#FFD700]">
                  <Card className="rounded-3xl p-8 bg-gradient-to-br from-card/95 to-card/60 backdrop-blur-sm relative overflow-hidden border-0" style={{ 
                    backgroundColor: '#0a0a0a',
                  }}>
                    <div className="absolute inset-0 rounded-3xl" style={{ background: 'linear-gradient(to bottom right, rgba(255, 196, 0, 0.05), transparent, rgba(255, 215, 0, 0.05))', opacity: 0.5 }}></div>
                    <div className="relative z-10 space-y-6">
                      <h2 className="font-montserrat font-bold text-3xl md:text-4xl" style={{ color: '#FFFFFF', fontWeight: 700, letterSpacing: '-0.02em' }}>
                        <span style={{ color: '#FFFFFF' }}>¿Que </span>
                        <span style={{ backgroundImage: 'linear-gradient(to right, #FFC400, #FFD700)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>hago?</span>
                      </h2>
                      <p className="text-xl leading-relaxed" style={{ color: '#E0E0E0', fontWeight: 500, letterSpacing: '0.01em' }}>
                        Me gusta combinar visión creativa y solidez tecnológica. Tengo experiencia en desarrollo Full Stack + inteligencia artificial y estratégias de Growth Operator enfocado en transformar ideas en realidades. Desde la creación de sistemas robustos hasta el lanzamiento de productos, trabajo con un mismo propósito: construir soluciones innovadoras que generen impacto, creen el futuro y generen conexiones auténticas con las personas.
                      </p>
                      
                      {/* 4 marcos pequeños con los servicios - dentro del marco grande */}
                      <div className="grid grid-cols-2 gap-4 mt-6">
                        <div className="relative rounded-xl border p-5 hover:scale-105 transition-transform duration-300 flex items-center justify-center" style={{ 
                          backgroundColor: 'rgba(124, 58, 237, 0.15)',
                          borderColor: 'rgba(124, 58, 237, 0.5)',
                          minHeight: '80px',
                          boxShadow: '0 0 15px rgba(124, 58, 237, 0.2)'
                        }}>
                          <p className="text-base font-semibold text-center" style={{ 
                            color: '#FFFFFF', 
                            fontWeight: 600, 
                            letterSpacing: '0.01em',
                            backgroundImage: 'linear-gradient(to right, #A78BFA, #FFFFFF)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent'
                          }}>
                            AI-Assisted Fullstack Web Builder
                          </p>
                        </div>
                        <div className="relative rounded-xl border p-5 hover:scale-105 transition-transform duration-300 flex items-center justify-center" style={{ 
                          backgroundColor: 'rgba(255, 196, 0, 0.15)',
                          borderColor: 'rgba(255, 196, 0, 0.5)',
                          minHeight: '80px',
                          boxShadow: '0 0 15px rgba(255, 196, 0, 0.2)'
                        }}>
                          <p className="text-base font-semibold text-center" style={{ 
                            color: '#FFFFFF', 
                            fontWeight: 600, 
                            letterSpacing: '0.01em',
                            backgroundImage: 'linear-gradient(to right, #FFC400, #FFD700)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent'
                          }}>
                            Marketing digital
                          </p>
                        </div>
                        <div className="relative rounded-xl border p-5 hover:scale-105 transition-transform duration-300 flex items-center justify-center" style={{ 
                          backgroundColor: 'rgba(249, 115, 22, 0.15)',
                          borderColor: 'rgba(249, 115, 22, 0.5)',
                          minHeight: '80px',
                          boxShadow: '0 0 15px rgba(249, 115, 22, 0.2)'
                        }}>
                          <p className="text-base font-semibold text-center" style={{ 
                            color: '#FFFFFF', 
                            fontWeight: 600, 
                            letterSpacing: '0.01em',
                            backgroundImage: 'linear-gradient(to right, #F97316, #FB923C)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent'
                          }}>
                            Lanzamiento de productos
                          </p>
                        </div>
                        <div className="relative rounded-xl border p-5 hover:scale-105 transition-transform duration-300 flex items-center justify-center" style={{ 
                          backgroundColor: 'rgba(139, 92, 246, 0.15)',
                          borderColor: 'rgba(139, 92, 246, 0.5)',
                          minHeight: '80px',
                          boxShadow: '0 0 15px rgba(139, 92, 246, 0.2)'
                        }}>
                          <p className="text-base font-semibold text-center" style={{ 
                            color: '#FFFFFF', 
                            fontWeight: 600, 
                            letterSpacing: '0.01em',
                            backgroundImage: 'linear-gradient(to right, #8B5CF6, #A78BFA)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent'
                          }}>
                            Identidad de marca
                          </p>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
            </div>

            <div className="flex justify-center lg:justify-end">
              <div className="relative group">
                <div className="w-80 h-80 rounded-full overflow-hidden shadow-2xl group-hover:shadow-xl transition-all duration-300 group-hover:scale-102 ring-4" style={{ borderColor: 'rgba(124, 58, 237, 0.4)', boxShadow: '0 0 20px rgba(124, 58, 237, 0.3)' }}>
                  <img
                    src="/images/foto personal.JPG"
                    alt="Enzo - Creador de experiencias digitales"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                    style={{ objectPosition: 'center center' }}
                  />
                </div>
                <div className="absolute -top-6 -right-6 w-12 h-12 rounded-full opacity-60 animate-bounce delay-300" style={{ background: 'linear-gradient(to bottom right, #7C3AED, #FFC400)' }}></div>
                <div className="absolute -bottom-6 -left-6 w-8 h-8 rounded-full opacity-40 animate-bounce delay-700" style={{ background: 'linear-gradient(to bottom right, #FFC400, #F97316)' }}></div>
                <div className="absolute top-1/2 -left-8 w-6 h-6 rounded-full opacity-50 animate-bounce delay-500" style={{ background: 'linear-gradient(to bottom right, #7C3AED, #FFC400)' }}></div>
                <div className="absolute top-1/4 -right-4 w-4 h-4 rounded-full opacity-30 animate-pulse" style={{ background: 'linear-gradient(to bottom right, #F97316, #FFC400)' }}></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="servicios" className="py-20 px-4 relative overflow-hidden" style={{ backgroundColor: '#000000' }}>
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="text-center space-y-4 mb-16">
            <h2 className="font-montserrat font-bold text-3xl md:text-4xl relative inline-block" style={{ 
              backgroundImage: 'linear-gradient(to right, #7C3AED, #FFC400, #F97316, #8B5CF6, #FFC400)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: '0 0 30px rgba(124, 58, 237, 0.5), 0 0 60px rgba(255, 196, 0, 0.3)',
              filter: 'drop-shadow(0 0 10px rgba(124, 58, 237, 0.4))',
              animation: 'gradient-shift 3s ease infinite'
            }}>
              ✦ Soluciones
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Card 1: Desarrollo Web */}
            <Card className="relative border rounded-xl p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-2" style={{ 
              backgroundColor: '#0a0a0a',
              borderColor: '#1a1a1a'
            }}>
              <div className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold" style={{ 
                background: 'linear-gradient(135deg, #FFC400, #FFD700)'
              }}>
                01
              </div>
              <div className="mt-2 mb-4">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'rgba(255, 196, 0, 0.15)' }}>
                  <Code className="h-6 w-6" style={{ color: '#FFC400' }} />
                </div>
              </div>
              <h3 className="font-montserrat font-bold text-xl mb-3" style={{ color: '#FFFFFF' }}>
                Desarrollo Web
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: '#B0B0B0' }}>
                Aplicaciones web de alto nivel, desarrolladas con tecnología de vanguardia y diseño escalable.
              </p>
            </Card>

            {/* Card 2: Lanzamiento de productos */}
            <Card className="relative border rounded-xl p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-2" style={{ 
              backgroundColor: '#0a0a0a',
              borderColor: '#1a1a1a'
            }}>
              <div className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold" style={{ 
                background: 'linear-gradient(135deg, #FFC400, #FFD700)'
              }}>
                02
              </div>
              <div className="mt-2 mb-4">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'rgba(255, 196, 0, 0.15)' }}>
                  <Zap className="h-6 w-6" style={{ color: '#FFC400' }} />
                </div>
              </div>
              <h3 className="font-montserrat font-bold text-xl mb-3" style={{ color: '#FFFFFF' }}>
                Lanzamiento de productos
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: '#B0B0B0' }}>
                Trabajo en la planificación, creación y lanzamiento de productos o servicios, cuidando que cada etapa tenga un mensaje claro y atractivo para tu audiencia.
              </p>
            </Card>

            {/* Card 3: Embudos de venta */}
            <Card className="relative border rounded-xl p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-2" style={{ 
              backgroundColor: '#0a0a0a',
              borderColor: '#1a1a1a'
            }}>
              <div className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold" style={{ 
                background: 'linear-gradient(135deg, #FFC400, #FFD700)'
              }}>
                03
              </div>
              <div className="mt-2 mb-4">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'rgba(255, 196, 0, 0.15)' }}>
                  <TrendingUp className="h-6 w-6" style={{ color: '#FFC400' }} />
                </div>
              </div>
              <h3 className="font-montserrat font-bold text-xl mb-3" style={{ color: '#FFFFFF' }}>
                Embudos de venta
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: '#B0B0B0' }}>
                Diseño e implemento embudos que atraen, nutren y convierten clientes. Desde la primera impresión hasta la decisión de compra, cada paso debe ser fluido y efectivo.
              </p>
            </Card>

            {/* Card 4: Integración de AI */}
            <Card className="relative border rounded-xl p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-2" style={{ 
              backgroundColor: '#0a0a0a',
              borderColor: '#1a1a1a'
            }}>
              <div className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold" style={{ 
                background: 'linear-gradient(135deg, #FFC400, #FFD700)'
              }}>
                04
              </div>
              <div className="mt-2 mb-4">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'rgba(255, 196, 0, 0.15)' }}>
                  <Globe className="h-6 w-6" style={{ color: '#FFC400' }} />
                </div>
              </div>
              <h3 className="font-montserrat font-bold text-xl mb-3" style={{ color: '#FFFFFF' }}>
                Integración de AI
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: '#B0B0B0' }}>
                Implemento herramientas de IA en la creacion de web, avanzando en los procesos a una velocidad muy grande, añadiendo automatizaciones inteligentes, análisis predictivo y experiencias personalizadas que elevan la interacción con tus usuarios.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Clients Section */}
      <section id="socios" className="py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-20 h-20 rounded-full blur-xl animate-pulse delay-300" style={{ background: 'linear-gradient(to bottom right, rgba(255, 196, 0, 0.1), rgba(255, 215, 0, 0.1))' }}></div>
          <div className="absolute bottom-1/4 right-1/4 w-16 h-16 rounded-full blur-xl animate-pulse delay-700" style={{ background: 'linear-gradient(to bottom right, rgba(255, 196, 0, 0.1), rgba(255, 215, 0, 0.1))' }}></div>
        </div>

        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="text-center space-y-4 mb-16">
            <h2 className="font-montserrat font-bold text-3xl md:text-4xl relative inline-block" style={{ 
              backgroundImage: 'linear-gradient(to right, #7C3AED, #FFC400, #F97316, #8B5CF6, #FFC400)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: '0 0 30px rgba(124, 58, 237, 0.5), 0 0 60px rgba(255, 196, 0, 0.3)',
              filter: 'drop-shadow(0 0 10px rgba(124, 58, 237, 0.4))',
              animation: 'gradient-shift 3s ease infinite'
            }}>
              ✦ Socios
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto" style={{ color: '#A0A0A0' }}>
              He tenido el privilegio de colaborar con creadores, emprendedores y marcas que comparten la pasión por
              generar impacto real
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Cresciente - Teoría Musical */}
            <Card className="group hover:shadow-2xl transition-all duration-500 border-0 bg-card/50 backdrop-blur-sm overflow-hidden hover:-translate-y-1 hover:rotate-1">
              <div className="overflow-hidden bg-black">
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Captura%20de%20Pantalla%202025-08-18%20a%20la%28s%29%2000.36.03-WM8iB5C8DxacSUyMH46aBPCmqRTnq4.png"
                  alt="Cresciente - Teoría Musical & Composición"
                  className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <CardContent className="p-6">
                <div className="space-y-2">
                  <h3 className="font-montserrat font-semibold text-xl transition-colors duration-300" style={{ color: '#FFFFFF' }}>
                    Cresciente - Teoría Musical & Composición
                  </h3>
                  <p className="text-muted-foreground">
                    Canal de YouTube especializado en teoría musical y composición
                  </p>
                  <Badge
                    variant="secondary"
                    className="text-sm transition-colors duration-300"
                    style={{ backgroundColor: 'rgba(255, 196, 0, 0.1)', color: '#FFC400', borderColor: '#FFC400' }}
                  >
                    116k suscriptores • 443 videos
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Ikigai Vivero Orgánico */}
            <Card className="group hover:shadow-2xl transition-all duration-500 border-0 bg-card/50 backdrop-blur-sm overflow-hidden hover:-translate-y-1 hover:-rotate-1">
              <div className="overflow-hidden bg-black">
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Captura%20de%20Pantalla%202025-08-18%20a%20la%28s%29%2000.34.58-w0rBkAAqeFsIFswE7SrpAc6LXupbac.png"
                  alt="Ikigai Vivero Orgánico"
                  className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <CardContent className="p-6">
                <div className="space-y-2">
                  <h3 className="font-montserrat font-semibold text-xl transition-colors duration-300" style={{ color: '#FFFFFF' }}>
                    Ikigai Vivero Orgánico
                  </h3>
                  <p className="text-muted-foreground">
                    Tienda de viveros y jardinería especializada en plantas nativas
                  </p>
                  <Badge
                    variant="secondary"
                    className="text-sm transition-colors duration-300"
                    style={{ backgroundColor: 'rgba(255, 196, 0, 0.1)', color: '#FFC400', borderColor: '#FFC400' }}
                  >
                    7,025 seguidores • 770 seguidos
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Maxi Permacultura */}
            <Card className="group hover:shadow-2xl transition-all duration-500 border-0 bg-card/50 backdrop-blur-sm overflow-hidden hover:-translate-y-1 hover:rotate-1">
              <div className="overflow-hidden bg-black">
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Captura%20de%20Pantalla%202025-08-18%20a%20la%28s%29%2000.33.13-YD7yZMCUxQMSdlBMLXrO0dLzsfAJJO.png"
                  alt="Maxi Sanchez - Permacultura"
                  className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <CardContent className="p-6">
                <div className="space-y-2">
                  <h3 className="font-montserrat font-semibold text-xl transition-colors duration-300" style={{ color: '#FFFFFF' }}>
                    Maxi Sanchez
                  </h3>
                  <p className="text-muted-foreground">Gestor cultural en bioconstrucción y permacultura</p>
                  <Badge
                    variant="secondary"
                    className="text-sm transition-colors duration-300"
                    style={{ backgroundColor: 'rgba(255, 196, 0, 0.1)', color: '#FFC400', borderColor: '#FFC400' }}
                  >
                    275k seguidores • 658 publicaciones
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Juan Pablo Francolini */}
            <Card className="group hover:shadow-2xl transition-all duration-500 border-0 bg-card/50 backdrop-blur-sm overflow-hidden hover:-translate-y-1 hover:rotate-1">
              <div className="overflow-hidden bg-black">
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Captura%20de%20Pantalla%202025-08-18%20a%20la%28s%29%2000.34.01-rV9CYkNS11faZBYsy2ypnvzEkEWy3N.png"
                  alt="Juan Pablo Francolini"
                  className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <CardContent className="p-6">
                <div className="space-y-2">
                  <h3 className="font-montserrat font-semibold text-xl transition-colors duration-300" style={{ color: '#FFFFFF' }}>
                    Juan Pablo Francolini
                  </h3>
                  <p className="text-muted-foreground">Educador en mitología, simbología y arquitectura</p>
                  <Badge
                    variant="secondary"
                    className="text-sm transition-colors duration-300"
                    style={{ backgroundColor: 'rgba(255, 196, 0, 0.1)', color: '#FFC400', borderColor: '#FFC400' }}
                  >
                    154k seguidores • 2,863 publicaciones
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-20 px-4 relative overflow-hidden" style={{ backgroundColor: '#000000' }}>
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="text-center space-y-4 mb-16">
            <p className="text-sm uppercase tracking-wider" style={{ color: '#FFC400' }}>
              PORTFOLIO
            </p>
            <h2 className="font-montserrat font-bold text-3xl md:text-4xl relative inline-block" style={{ 
              backgroundImage: 'linear-gradient(to right, #7C3AED, #FFC400, #F97316, #8B5CF6, #FFC400)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: '0 0 30px rgba(124, 58, 237, 0.5), 0 0 60px rgba(255, 196, 0, 0.3)',
              filter: 'drop-shadow(0 0 10px rgba(124, 58, 237, 0.4))',
              animation: 'gradient-shift 3s ease infinite'
            }}>
              Proyectos
            </h2>
            <p className="text-lg max-w-3xl mx-auto leading-relaxed" style={{ color: '#FFFFFF' }}>
              Cada proyecto es una exploración de nuevas posibilidades tecnológicas
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Proyecto 1: Cresciente */}
            <Card className="group border rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2" style={{ 
              backgroundColor: '#0a0a0a',
              borderColor: '#1a1a1a'
            }}>
              <div className="relative">
                <div className="aspect-video bg-black overflow-hidden relative rounded-t-xl">
                  <img
                    src="/images/cresciente .png"
                    alt="Cresciente Preview"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <Badge className="absolute top-3 left-3 text-xs font-semibold px-2 py-1 z-10" style={{ 
                  backgroundColor: '#FFC400',
                  color: '#000000'
                }}>
                  Music Tech
                </Badge>
              </div>
              <CardContent className="p-6">
                <h3 className="font-montserrat font-bold text-xl mb-3" style={{ color: '#FFFFFF' }}>
                  Cresciente
                </h3>
                <p className="text-sm leading-relaxed mb-4" style={{ color: '#B0B0B0' }}>
                  Academia de composición musical online. Plataforma educativa con cursos estructurados, metodología propia y comunidad activa de estudiantes.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="text-xs" style={{ borderColor: '#FFC400', color: '#FFC400' }}>
                    WordPress
                  </Badge>
                  <Badge variant="outline" className="text-xs" style={{ borderColor: '#FFC400', color: '#FFC400' }}>
                    PHP
                  </Badge>
                  <Badge variant="outline" className="text-xs" style={{ borderColor: '#FFC400', color: '#FFC400' }}>
                    Education
                  </Badge>
                </div>
                <a 
                  href="https://cresciente.net/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="mt-4 inline-block text-sm font-medium hover:underline"
                  style={{ color: '#FFC400' }}
                >
                  Ver proyecto →
                </a>
              </CardContent>
            </Card>

            {/* Proyecto 2: Sun Salvador Festival */}
            <Card className="group border rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2" style={{ 
              backgroundColor: '#0a0a0a',
              borderColor: '#1a1a1a'
            }}>
              <div className="relative">
                <div className="aspect-video bg-black overflow-hidden relative rounded-t-xl">
                  <img
                    src="/images/Sun-Salvador-festival.png"
                    alt="Sun Salvador Festival Preview"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <Badge className="absolute top-3 left-3 text-xs font-semibold px-2 py-1 z-10" style={{ 
                  backgroundColor: '#FFC400',
                  color: '#FFFFFF'
                }}>
                  Festival
                </Badge>
              </div>
              <CardContent className="p-6">
                <h3 className="font-montserrat font-bold text-xl mb-3" style={{ color: '#FFFFFF' }}>
                  Sun Salvador Festival
                </h3>
                <p className="text-sm leading-relaxed mb-4" style={{ color: '#B0B0B0' }}>
                  Landing page para festival de música. Diseño moderno y atractivo con información del evento, artistas y venta de entradas.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="text-xs" style={{ borderColor: '#FFC400', color: '#FFC400' }}>
                    Next.js
                  </Badge>
                  <Badge variant="outline" className="text-xs" style={{ borderColor: '#FFC400', color: '#FFC400' }}>
                    TypeScript
                  </Badge>
                  <Badge variant="outline" className="text-xs" style={{ borderColor: '#FFC400', color: '#FFC400' }}>
                    Event
                  </Badge>
                </div>
                <a 
                  href="https://sun-salvador.vercel.app/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="mt-4 inline-block text-sm font-medium hover:underline"
                  style={{ color: '#FFC400' }}
                >
                  Ver proyecto →
                </a>
              </CardContent>
            </Card>

            {/* Proyecto 3: Entramado */}
            <Card className="group border rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2" style={{ 
              backgroundColor: '#0a0a0a',
              borderColor: '#1a1a1a'
            }}>
              <div className="relative">
                <div className="aspect-video bg-black overflow-hidden relative rounded-t-xl">
                  <img
                    src="/images/entramado.png"
                    alt="Entramado Preview"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <Badge className="absolute top-3 left-3 text-xs font-semibold px-2 py-1 z-10" style={{ 
                  backgroundColor: '#FFC400',
                  color: '#FFFFFF'
                }}>
                  Web Platform
                </Badge>
              </div>
              <CardContent className="p-6">
                <h3 className="font-montserrat font-bold text-xl mb-3" style={{ color: '#FFFFFF' }}>
                  Entramado
                </h3>
                <p className="text-sm leading-relaxed mb-4" style={{ color: '#B0B0B0' }}>
                  Plataforma web con arquitectura moderna y diseño intuitivo. Creada para divulgadores de Arte.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="text-xs" style={{ borderColor: '#FFC400', color: '#FFC400' }}>
                    Next.js
                  </Badge>
                  <Badge variant="outline" className="text-xs" style={{ borderColor: '#FFC400', color: '#FFC400' }}>
                    TypeScript
                  </Badge>
                </div>
                <p className="mt-4 text-sm font-medium" style={{ color: '#FFC400' }}>
                  Proyecto en desarrollo
                </p>
              </CardContent>
            </Card>

            {/* Proyecto 4: DIPLEMM */}
            <Card className="group border rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2" style={{ 
              backgroundColor: '#0a0a0a',
              borderColor: '#1a1a1a'
            }}>
              <div className="relative">
                <div className="aspect-video bg-black overflow-hidden relative rounded-t-xl">
                  <img
                    src="/images/diplemm.png"
                    alt="DIPLEMM Preview"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <Badge className="absolute top-3 left-3 text-xs font-semibold px-2 py-1 z-10" style={{ 
                  backgroundColor: '#FFC400',
                  color: '#FFFFFF'
                }}>
                  Productivity
                </Badge>
              </div>
              <CardContent className="p-6">
                <h3 className="font-montserrat font-bold text-xl mb-3" style={{ color: '#FFFFFF' }}>
                  DIPLEMM
                </h3>
                <p className="text-sm leading-relaxed mb-4" style={{ color: '#B0B0B0' }}>
                  Dispositivo de Planeación y Estructuración Metódica. Sistema metodológico para organizar y estructurar proyectos de forma sistemática.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="text-xs" style={{ borderColor: '#FFC400', color: '#FFC400' }}>
                    Next.js
                  </Badge>
                  <Badge variant="outline" className="text-xs" style={{ borderColor: '#FFC400', color: '#FFC400' }}>
                    TypeScript
                  </Badge>
                  <Badge variant="outline" className="text-xs" style={{ borderColor: '#FFC400', color: '#FFC400' }}>
                    Productivity
                  </Badge>
                </div>
                <p className="mt-4 text-sm font-medium" style={{ color: '#FFC400' }}>
                  Proyecto en desarrollo
                </p>
              </CardContent>
            </Card>

            {/* Proyecto 5: Turnos In */}
            <Card className="group border rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2" style={{ 
              backgroundColor: '#0a0a0a',
              borderColor: '#1a1a1a'
            }}>
              <div className="relative">
                <div className="aspect-video bg-black overflow-hidden relative rounded-t-xl">
                  <img
                    src="/images/Turnos In.png"
                    alt="Turnos In Preview"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <Badge className="absolute top-3 left-3 text-xs font-semibold px-2 py-1 z-10" style={{ 
                  backgroundColor: '#FFC400',
                  color: '#FFFFFF'
                }}>
                  Web App
                </Badge>
              </div>
              <CardContent className="p-6">
                <h3 className="font-montserrat font-bold text-xl mb-3" style={{ color: '#FFFFFF' }}>
                  Turnos In
                </h3>
                <p className="text-sm leading-relaxed mb-4" style={{ color: '#B0B0B0' }}>
                  Sistema de gestión de turnos online. Plataforma para agendar y administrar citas de forma eficiente y organizada.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="text-xs" style={{ borderColor: '#FFC400', color: '#FFC400' }}>
                    Next.js
                  </Badge>
                  <Badge variant="outline" className="text-xs" style={{ borderColor: '#FFC400', color: '#FFC400' }}>
                    TypeScript
                  </Badge>
                  <Badge variant="outline" className="text-xs" style={{ borderColor: '#FFC400', color: '#FFC400' }}>
                    Scheduling
                  </Badge>
                </div>
                <p className="mt-4 text-sm font-medium" style={{ color: '#FFC400' }}>
                  Proyecto en desarrollo
                </p>
              </CardContent>
            </Card>

            {/* Proyecto 6: Magnificent Monstera */}
            <Card className="group border rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2" style={{ 
              backgroundColor: '#0a0a0a',
              borderColor: '#1a1a1a'
            }}>
              <div className="relative">
                <div className="aspect-video bg-black overflow-hidden relative rounded-t-xl">
                  <img
                    src="/images/Magnificent Monstera.png"
                    alt="Magnificent Monstera Preview"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <Badge className="absolute top-3 left-3 text-xs font-semibold px-2 py-1 z-10" style={{ 
                  backgroundColor: '#FFC400',
                  color: '#FFFFFF'
                }}>
                  Web App
                </Badge>
              </div>
              <CardContent className="p-6">
                <h3 className="font-montserrat font-bold text-xl mb-3" style={{ color: '#FFFFFF' }}>
                  Magnificent Monstera
                </h3>
                <p className="text-sm leading-relaxed mb-4" style={{ color: '#B0B0B0' }}>
                  Aplicación web moderna con diseño responsivo y funcionalidades interactivas.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="text-xs" style={{ borderColor: '#FFC400', color: '#FFC400' }}>
                    React
                  </Badge>
                  <Badge variant="outline" className="text-xs" style={{ borderColor: '#FFC400', color: '#FFC400' }}>
                    Tailwind CSS
                  </Badge>
                </div>
                <a 
                  href="https://magnificent-monstera-92ea1e.netlify.app/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="mt-4 inline-block text-sm font-medium hover:underline"
                  style={{ color: '#FFC400' }}
                >
                  Ver proyecto →
                </a>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contacto" className="py-20 px-4 relative overflow-hidden" style={{ background: 'linear-gradient(to bottom right, rgba(124, 58, 237, 0.1), rgba(255, 196, 0, 0.1), rgba(249, 115, 22, 0.1), rgba(139, 92, 246, 0.1))' }}>
        {/* Efectos decorativos de fondo */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full blur-3xl opacity-30" style={{ background: 'linear-gradient(to bottom right, rgba(124, 58, 237, 0.2), rgba(255, 196, 0, 0.2))' }}></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full blur-3xl opacity-30" style={{ background: 'linear-gradient(to bottom right, rgba(249, 115, 22, 0.2), rgba(139, 92, 246, 0.2))' }}></div>
        </div>
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="text-center space-y-8">
            <div className="space-y-6">
              <h1 className="font-montserrat font-black text-4xl md:text-6xl lg:text-7xl leading-tight relative inline-block" style={{ 
                backgroundImage: 'linear-gradient(to right, #7C3AED, #FFC400, #F97316, #8B5CF6)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                filter: 'drop-shadow(0 0 15px rgba(124, 58, 237, 0.4))'
              }}>
                Resolvamos tus dudas
              </h1>
              <p className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed" style={{ 
                backgroundImage: 'linear-gradient(to right, #FFC400, #F97316, #8B5CF6)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                ¿Que queres lograr?
              </p>
            </div>

            <div className="pt-8 flex flex-col sm:flex-row gap-6 items-center justify-center">
              <Button
                asChild
                size="lg"
                className="text-xl px-12 py-6 hover:opacity-90 font-semibold shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105"
                style={{ background: 'linear-gradient(to right, #7C3AED, #FFC400, #F97316, #8B5CF6, #FFC400)', boxShadow: '0 0 30px rgba(124, 58, 237, 0.4), 0 0 60px rgba(255, 196, 0, 0.3)' }}
              >
                <a
                  href="https://wa.me/5493885246095"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center"
                >
                  Iniciar Contacto
                  <ArrowRight className="ml-3 h-6 w-6" />
                </a>
              </Button>
              
              {SHOW_OFFER_LANDING && (
                <Button
                  asChild
                  size="lg"
                  className="text-xl px-12 py-6 hover:opacity-90 font-semibold shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105"
                  style={{ 
                    background: 'linear-gradient(to right, #EC4899, #F97316, #EC4899)', 
                    boxShadow: '0 0 30px rgba(236, 72, 153, 0.5), 0 0 60px rgba(249, 115, 22, 0.3)',
                    border: '2px solid rgba(255, 196, 0, 0.3)'
                  }}
                >
                  <a
                    href="/oferta"
                    className="flex items-center justify-center"
                  >
                    ✨ Adquirir oferta limitada
                    <ArrowRight className="ml-3 h-6 w-6" />
                  </a>
                </Button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-muted/20">
        <div className="container mx-auto max-w-4xl">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-center md:text-left">
              <h3 className="font-montserrat font-bold text-xl" style={{ color: '#FFFFFF' }}>Enzo Federico Bruno</h3>
            </div>
            <div className="flex items-center gap-2">
              <a
                href="https://www.instagram.com/enzo.z4?igsh=Mm05MnA0enB2eXlk&utm_source=qr"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 hover:from-purple-700 hover:via-pink-700 hover:to-orange-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <Instagram className="w-5 h-5 text-white" />
                <span className="font-semibold text-white">Instagram</span>
              </a>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-border text-center text-muted-foreground" style={{ borderColor: '#1a1a1a', color: '#A0A0A0' }}>
            <p>&copy; 2024 Enzo Federico Bruno. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
