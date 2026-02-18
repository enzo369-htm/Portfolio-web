# Portfolio Web - Enzo Federico

Portfolio personal con diseño moderno y oscuro, utilizando Next.js, TypeScript y Tailwind CSS.

## 🚀 Despliegue en Vercel

### Opción 1: Desde GitHub (Recomendado)

1. **Crear repositorio en GitHub:**
   - Ve a [github.com](https://github.com) y crea un nuevo repositorio
   - No inicialices con README, .gitignore o licencia (ya los tenemos)

2. **Subir el código a GitHub:**
   ```bash
   git remote add origin https://github.com/TU_USUARIO/TU_REPOSITORIO.git
   git branch -M main
   git push -u origin main
   ```

3. **Conectar con Vercel:**
   - Ve a [vercel.com](https://vercel.com)
   - Inicia sesión con tu cuenta de GitHub
   - Haz clic en "Add New Project"
   - Importa tu repositorio de GitHub
   - Vercel detectará automáticamente que es un proyecto Next.js
   - Haz clic en "Deploy"
   - ¡Listo! Tu sitio estará en línea en minutos

### Opción 2: Desde Vercel CLI

1. **Iniciar sesión:**
   ```bash
   npx vercel login
   ```

2. **Desplegar:**
   ```bash
   npx vercel
   ```

3. **Seguir las instrucciones en pantalla**

## 🛠️ Desarrollo Local

```bash
# Instalar dependencias
npm install

# Ejecutar servidor de desarrollo
npm run dev

# El sitio estará disponible en http://localhost:3001
```

## 📦 Build de Producción

```bash
npm run build
npm start
```

## 🎨 Características

- Diseño oscuro moderno
- Paleta de colores: Amarillo (#FFC400), Carbón (#212121), Azul petróleo (#004E64), Blanco (#FFFFFF)
- Efectos de gradiente y animaciones
- Responsive design
- Secciones: Hero, Sobre Mí, Servicios, Socios, Portfolio, Contacto

## 📝 Notas

- El proyecto está configurado para usar el puerto 3001 en desarrollo
- Las imágenes deben estar en la carpeta `public/images/`
- El proyecto usa Next.js 14 con App Router
