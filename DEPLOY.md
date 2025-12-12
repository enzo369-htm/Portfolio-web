# 🚀 Guía de Despliegue en Vercel

## Paso 1: Crear repositorio en GitHub

1. Ve a [github.com](https://github.com) e inicia sesión
2. Haz clic en el botón **"+"** (arriba a la derecha) → **"New repository"**
3. Nombre del repositorio: `portfolio-enzo` (o el que prefieras)
4. **NO marques** las opciones de README, .gitignore o licencia (ya los tenemos)
5. Haz clic en **"Create repository"**

## Paso 2: Subir el código a GitHub

Abre la terminal en la carpeta del proyecto y ejecuta:

```bash
cd "/Users/macbookpro/Desktop/Portfolio web"
git remote add origin https://github.com/TU_USUARIO/TU_REPOSITORIO.git
git branch -M main
git push -u origin main
```

**Nota:** Reemplaza `TU_USUARIO` y `TU_REPOSITORIO` con tu usuario de GitHub y el nombre del repositorio que creaste.

Si te pide autenticación, GitHub te dará instrucciones. Puedes usar:
- Token de acceso personal (recomendado)
- GitHub CLI

## Paso 3: Desplegar en Vercel

1. Ve a [vercel.com](https://vercel.com)
2. Haz clic en **"Sign Up"** o **"Log In"**
3. Elige **"Continue with GitHub"** para conectar tu cuenta
4. Una vez dentro, haz clic en **"Add New Project"**
5. Selecciona el repositorio que acabas de subir
6. Vercel detectará automáticamente que es Next.js
7. **No cambies ninguna configuración** (está todo listo)
8. Haz clic en **"Deploy"**
9. Espera 1-2 minutos mientras se construye
10. ¡Listo! Tu sitio estará en línea 🎉

## Paso 4: Configurar dominio personalizado (Opcional)

Si quieres un dominio personalizado:
1. En el dashboard de Vercel, ve a tu proyecto
2. Ve a **Settings** → **Domains**
3. Agrega tu dominio
4. Sigue las instrucciones para configurar DNS

## ✅ Verificación

Una vez desplegado, Vercel te dará una URL como:
- `https://portfolio-enzo.vercel.app`

Tu sitio estará en línea y accesible desde cualquier lugar del mundo.

## 🔄 Actualizaciones Futuras

Cada vez que hagas cambios:
1. Haz commit: `git add .` y `git commit -m "Descripción del cambio"`
2. Sube a GitHub: `git push`
3. Vercel desplegará automáticamente la nueva versión

¡Es así de fácil! 🚀










