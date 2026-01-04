# Tri-Training Programme

Aplicación web para visualizar un plan de entrenamiento de triatlón de 12 semanas.

## Requisitos

- Docker
- Docker Compose

## Ejecutar con Docker

1. Construir y levantar el contenedor:

```bash
docker-compose up
```

2. Abrir en el navegador:

```
http://localhost:5173
```

## Desarrollo local (sin Docker)

Si prefieres ejecutar sin Docker:

```bash
npm install
npm run dev
```

## Atajos de VSCode

Si usas VSCode, ya están configuradas las siguientes opciones:

### Tareas disponibles:
- **Dev: Start React App (localhost)** - Inicia el servidor de desarrollo (tarea por defecto)
- **Docker: Build and Start** - Construye y levanta Docker
- **Docker: Start** - Levanta Docker
- **Docker: Stop** - Detiene Docker
- **Install Dependencies** - Instala dependencias

### Cómo ejecutar las tareas:

**Opción 1: Atajo rápido (RECOMENDADO)**
- **Ctrl+Shift+T** - Ejecuta la tarea de test por defecto (Dev server en localhost - `npm run dev`)

**Opción 2: Menú de tareas**
1. Presiona **Ctrl+Shift+P**
2. Escribe "Tasks: Run Task"
3. Selecciona "Dev: Start React App (localhost)"

**Opción 3: Desde la terminal integrada**
```bash
npm run dev
```

### Debugging:
- **F5** - Inicia Chrome con debugging habilitado en localhost:5173

## Estructura del proyecto

```
tri-training-app/
├── src/
│   ├── App.jsx          # Componente principal
│   ├── App.css          # Estilos principales
│   └── main.jsx         # Punto de entrada
├── Dockerfile           # Configuración de Docker
├── docker-compose.yml   # Configuración de Docker Compose
└── vite.config.js       # Configuración de Vite
```
