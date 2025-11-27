# Syncode Portfolio

Portfolio web moderno y profesional para Syncode, construido con Next.js, TypeScript y Tailwind CSS.

## 🚀 Inicio Rápido

### Instalación

```bash
npm install
```

### Desarrollo

```bash
npm run dev
```

Abre [http://localhost:3001](http://localhost:3001) en tu navegador para ver el resultado.

**Nota:** Este proyecto usa el puerto 3001 para evitar conflictos con otros proyectos que puedan estar usando el puerto 3000.

### Producción

```bash
npm run build
npm start
```

## 📁 Estructura del Proyecto

```
Portfolio web/
├── app/
│   ├── globals.css      # Estilos globales
│   ├── layout.tsx       # Layout principal
│   └── page.tsx         # Página de inicio
├── components/
│   ├── Header.tsx       # Componente de navegación
│   └── EnzoHero.tsx     # Sección hero de Enzo
├── public/
│   └── images/          # Imágenes del portfolio
└── package.json
```

## 📸 Agregar tu Foto

1. Coloca tu foto en la carpeta `public/images/`
2. Nómbrala `enzo.jpg` o `enzo.png`
3. La imagen se mostrará automáticamente en la sección hero

## 🎨 Personalización

El diseño utiliza un tema oscuro con gradientes en púrpura, rosa y azul. Puedes personalizar los colores en:
- `tailwind.config.ts` - Configuración de Tailwind
- `app/globals.css` - Variables CSS globales
- Componentes individuales - Colores inline

## 📝 Próximos Pasos

- [ ] Agregar sección de servicios
- [ ] Agregar sección de portfolio/proyectos
- [ ] Agregar sección de socios
- [ ] Agregar formulario de contacto
- [ ] Agregar página de Marco

## 🛠️ Tecnologías

- **Next.js 14** - Framework React
- **TypeScript** - Tipado estático
- **Tailwind CSS** - Estilos utility-first
- **React 18** - Biblioteca UI

## 📄 Licencia

Este proyecto es privado.

