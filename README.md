# Hook Generator — Growing Inmobiliario

Generador de hooks de Instagram para el equipo de Pol Morado y Growing Inmobiliario.

## Despliegue en Railway (5 minutos)

### Paso 1 — Sube el código a GitHub
1. Ve a github.com y crea un repositorio nuevo (nombre: `hook-generator-growing`)
2. Sube todos estos archivos al repositorio

### Paso 2 — Despliega en Railway
1. Ve a railway.app y crea una cuenta gratuita
2. Haz clic en "New Project"
3. Selecciona "Deploy from GitHub repo"
4. Elige el repositorio `hook-generator-growing`
5. Railway detecta automáticamente la configuración y despliega

### Paso 3 — Añade la clave API
1. En Railway, ve a tu proyecto → pestaña "Variables"
2. Añade la variable:
   - Nombre: `ANTHROPIC_API_KEY`
   - Valor: tu clave de Anthropic (la encuentras en console.anthropic.com)
3. Railway reinicia automáticamente el servidor

### Paso 4 — Comparte la URL
1. En Railway ve a "Settings" → "Domains" → "Generate Domain"
2. Copia la URL generada (ej. `hook-generator-growing.up.railway.app`)
3. Comparte esa URL con todo el equipo — ya pueden usarla sin cuenta ni instalación

## Uso local (para testear)

```bash
npm install
cp .env.example .env
# Edita .env y pon tu ANTHROPIC_API_KEY
node server.js
# Abre http://localhost:3000
```

## Estructura del proyecto

```
hook-generator-server/
├── server.js          # Servidor Express + llamada a API de Anthropic
├── package.json       # Dependencias
├── railway.toml       # Configuración de Railway
├── .env.example       # Variables de entorno de ejemplo
└── public/
    └── index.html     # Frontend de la aplicación
```
